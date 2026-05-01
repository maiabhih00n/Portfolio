import { useState, useEffect, useCallback } from "react";
import { Upload, FileText, Download, Trash2, File } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface SharedFile {
  id: string;
  name: string;
  file_path: string;
  file_size: number;
  file_type: string | null;
  created_at: string;
}

const formatFileSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const ResourcesSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const { toast } = useToast();
  const [files, setFiles] = useState<SharedFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const fetchFiles = useCallback(async () => {
    const { data, error } = await supabase
      .from("shared_files")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) setFiles(data);
  }, []);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  const handleUpload = async (file: File) => {
    if (file.size > 10 * 1024 * 1024) {
      toast({ title: "File too large", description: "Maximum file size is 10MB.", variant: "destructive" });
      return;
    }

    setUploading(true);
    const filePath = `${Date.now()}-${file.name}`;

    const { error: uploadError } = await supabase.storage
      .from("shared-files")
      .upload(filePath, file);

    if (uploadError) {
      toast({ title: "Upload failed", description: uploadError.message, variant: "destructive" });
      setUploading(false);
      return;
    }

    const { error: dbError } = await supabase.from("shared_files").insert({
      name: file.name,
      file_path: filePath,
      file_size: file.size,
      file_type: file.type || "application/octet-stream",
    });

    if (dbError) {
      toast({ title: "Error saving file info", description: dbError.message, variant: "destructive" });
    } else {
      toast({ title: "File uploaded!", description: `${file.name} has been uploaded successfully.` });
      fetchFiles();
    }
    setUploading(false);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleUpload(file);
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleUpload(file);
  };

  const handleDownload = (fileRecord: SharedFile) => {
    const { data } = supabase.storage.from("shared-files").getPublicUrl(fileRecord.file_path);
    window.open(data.publicUrl, "_blank");
  };

  const handleDelete = async (fileRecord: SharedFile) => {
    await supabase.storage.from("shared-files").remove([fileRecord.file_path]);
    await supabase.from("shared_files").delete().eq("id", fileRecord.id);
    toast({ title: "File deleted", description: `${fileRecord.name} has been removed.` });
    fetchFiles();
  };

  return (
    <section id="resources" className="section-padding relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div ref={ref} className="container mx-auto max-w-4xl">
        <div className={`text-center mb-14 transition-all duration-700 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <p className="text-primary font-heading font-medium tracking-widest uppercase text-sm mb-3">Resources</p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold">
            Shared <span className="text-primary neon-text">Files</span>
          </h2>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
            Upload and share files with visitors. All files are publicly accessible.
          </p>
        </div>

        {/* Upload Area */}
        <label
          className={`block mb-10 cursor-pointer transition-all duration-700 ${isVisible ? "animate-fade-up" : "opacity-0"}`}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
        >
          <div
            className={`glass-card gradient-border p-10 flex flex-col items-center justify-center gap-3 transition-all duration-300 ${
              dragOver ? "border-primary/60 neon-glow scale-[1.01]" : ""
            } ${uploading ? "opacity-60 pointer-events-none" : "hover:border-primary/40"}`}
          >
            <Upload size={36} className="text-primary" />
            <p className="text-foreground font-medium">
              {uploading ? "Uploading…" : "Click to upload a file"}
            </p>
            <p className="text-muted-foreground text-sm">Maximum file size: 10MB</p>
          </div>
          <input type="file" className="hidden" onChange={handleFileInput} disabled={uploading} />
        </label>

        {/* File Grid */}
        {files.length > 0 && (
          <div className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-5 transition-all duration-700 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
            {files.map((f) => (
              <div key={f.id} className="glass-card gradient-border p-5 flex flex-col gap-3">
                <div className="flex items-start gap-3">
                  <FileText size={28} className="text-primary shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <p className="text-foreground font-medium text-sm truncate" title={f.name}>
                      {f.name}
                    </p>
                    <p className="text-muted-foreground text-xs">{formatFileSize(f.file_size)}</p>
                  </div>
                </div>
                <div className="flex gap-2 mt-auto">
                  <button
                    onClick={() => handleDownload(f)}
                    className="inline-flex items-center gap-2 text-sm font-heading font-medium text-primary bg-primary/10 hover:bg-primary/20 px-4 py-2 rounded-lg transition-colors"
                  >
                    <Download size={14} /> Download
                  </button>
                  <button
                    onClick={() => handleDelete(f)}
                    className="inline-flex items-center justify-center text-destructive bg-destructive/10 hover:bg-destructive/20 p-2 rounded-lg transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ResourcesSection;
