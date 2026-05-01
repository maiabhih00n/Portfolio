import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import profileImg from "@/assets/profile.png";

const AboutSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="about" className="section-padding relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div
        ref={ref}
        className={`container mx-auto max-w-4xl text-center transition-all duration-700 ${
          isVisible ? "animate-fade-up" : "opacity-0 translate-y-8"
        }`}
      >
        <p className="text-primary font-heading font-medium tracking-widest uppercase text-sm mb-3">
          Who I Am
        </p>
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-10">
          About <span className="text-primary neon-text">Me</span>
        </h2>

        <div className="flex flex-col items-center gap-8">
          <div className="w-36 h-36 rounded-full overflow-hidden border-2 border-primary/30 neon-glow">
            <img src={profileImg} alt="Raghav Upadhyay" loading="lazy" width={512} height={512} className="w-full h-full object-cover" />
          </div>

          <p className="text-muted-foreground leading-relaxed max-w-2xl">
            I am a dedicated and detail-oriented B.Tech student with a strong interest in Artificial Intelligence, Machine Learning, and software development. With a solid foundation in programming languages like C and Python, I enjoy building logical solutions and continuously improving my problem-solving skills. I have hands-on experience with data structures, algorithms, and beginner-level machine learning concepts, along with practical exposure to web development through projects like responsive website design.
          </p>
          
          <p className="text-muted-foreground leading-relaxed max-w-2xl">
            Beyond technical skills, I focus on consistency, self-improvement, and staying updated with emerging technologies. I believe in learning by doing, and I actively work towards strengthening both my technical expertise and practical implementation skills to grow as a future AI/ML engineer.
          </p>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-heading font-semibold px-8 py-3 rounded-lg neon-glow hover:scale-105 transition-transform duration-300 mt-4"
          >
            Hire Me
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
