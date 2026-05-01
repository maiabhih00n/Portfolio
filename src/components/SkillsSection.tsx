import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const skills = [
  { name: "C / C++", percentage: 75, category: "Programming" },
  { name: "Python", percentage: 80, category: "Programming" },
  { name: "Data Structures & Algorithms", percentage: 60, category: "Programming" },
  { name: "Machine Learning Basics", percentage: 65, category: "AI & ML" },
  { name: "Deep Learing Basics", percentage: 50, category: "AI & ML" },
  { name: "Model Training & Fine-tuning", percentage: 60, category: "AI & ML" },
];

const tools = ["Python", "TensorFlow", "NumPy", "Pandas", "Git"];
const softSkills = ["Leadership", "Public Speaking", "Teamwork", "Adaptability", "Communication", "Problem Solving"];

const SkillBar = ({ name, percentage, delay, isVisible }: { name: string; percentage: number; delay: number; isVisible: boolean }) => (
  <div className="space-y-2">
    <div className="flex justify-between text-sm">
      <span className="font-heading font-medium">{name}</span>
      <span className="text-primary font-heading font-semibold">{percentage}%</span>
    </div>
    <div className="h-2.5 bg-secondary rounded-full overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full transition-all duration-1000 ease-out"
        style={{
          width: isVisible ? `${percentage}%` : "0%",
          transitionDelay: `${delay}ms`,
          boxShadow: isVisible ? "0 0 12px hsl(18 100% 56% / 0.5)" : "none",
        }}
      />
    </div>
  </div>
);

const SkillsSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="skills" className="section-padding relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div ref={ref} className="container mx-auto max-w-5xl">
        <div className={`text-center mb-14 transition-all duration-700 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <p className="text-primary font-heading font-medium tracking-widest uppercase text-sm mb-3">What I Do</p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold">
            My <span className="text-primary neon-text">Skills</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Progress bars */}
          <div className="space-y-5">
            {skills.map((skill, i) => (
              <SkillBar key={skill.name} {...skill} delay={i * 100} isVisible={isVisible} />
            ))}
          </div>

          {/* Tools & soft skills */}
          <div className="space-y-10">
            <div>
              <h3 className="font-heading font-semibold text-lg mb-4">Tools & Technologies</h3>
              <div className="flex flex-wrap gap-3">
                {tools.map((tool) => (
                  <span key={tool} className="glass-card gradient-border px-4 py-2 text-sm font-medium text-foreground">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-heading font-semibold text-lg mb-4">Soft Skills</h3>
              <div className="flex flex-wrap gap-3">
                {softSkills.map((skill) => (
                  <span key={skill} className="glass-card gradient-border px-4 py-2 text-sm font-medium text-foreground">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
