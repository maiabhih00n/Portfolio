import { useState } from "react";
import { Send, Github, Linkedin, Mail } from "lucide-react";
import emailjs from "@emailjs/browser";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useToast } from "@/hooks/use-toast";


// 🔑 Paste your EmailJS credentials here
const SERVICE_ID  = "service_gb1oakn";
const TEMPLATE_ID = "template_nyjfgsi";
const PUBLIC_KEY  = "T9Osqyth86g35nLIO";

const ContactSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name:    form.name,
          from_email:   form.email,
          message:      form.message,
          reply_to:     form.email,
        },
        PUBLIC_KEY
      );

      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
      });
      setForm({ name: "", email: "", message: "" });

    } catch (err) {
      toast({
        title: "Failed to send",
        description: "Something went wrong. Please try emailing me directly.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section-padding relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div ref={ref} className="container mx-auto max-w-2xl">
        <div className={`text-center mb-14 transition-all duration-700 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <p className="text-primary font-heading font-medium tracking-widest uppercase text-sm mb-3">Get In Touch</p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold">
            Contact <span className="text-primary neon-text">Me</span>
          </h2>
        </div>

        <form
          onSubmit={handleSubmit}
          className={`glass-card gradient-border p-8 space-y-5 transition-all duration-700 ${
            isVisible ? "animate-fade-up" : "opacity-0"
          }`}
        >
          <input
            type="text"
            placeholder="Your Name"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full bg-secondary/50 border border-border/50 rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
          <input
            type="email"
            placeholder="Your Email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full bg-secondary/50 border border-border/50 rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
          <textarea
            placeholder="Your Message"
            required
            rows={5}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full bg-secondary/50 border border-border/50 rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-heading font-semibold px-8 py-3 rounded-lg neon-glow hover:scale-105 transition-transform duration-300 w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            <Send size={16} />
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>

        <div className="flex justify-center gap-6 mt-10">
          <a href="https://github.com/maiabhih00n" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors duration-300">
            <Github size={24} />
          </a>
          <a href="https://www.linkedin.com/in/abhijeet-dabral/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors duration-300">
            <Linkedin size={24} />
          </a>
          <a href="mailto:abhijeetdabral66@gmail.com" className="text-muted-foreground hover:text-primary transition-colors duration-300">
            <Mail size={24} />
          </a>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-10">
          © 2026 Abhijeet Dabral. All rights reserved.
        </p>
      </div>
    </section>
  );
};

export default ContactSection;