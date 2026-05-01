import { Github, Linkedin, Mail, ArrowDown } from "lucide-react";
import profileImg from "@/assets/profile.png";

const HeroSection = () => {
  return (
    <section id="home" className="min-h-screen flex items-center section-padding pt-28 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-primary/3 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left */}
        <div className="space-y-6 animate-fade-up">
          <p className="text-primary font-heading font-medium tracking-widest uppercase text-sm">
            Hello 👋
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold leading-tight">
            I'm <span className="text-primary neon-text">Abhijeet</span>
            <br />
            <span className="text-primary neon-text">Dabral</span>
          </h1>
          <p className="text-lg font-heading font-medium text-muted-foreground">
            AI & ML Enthusiast | Computer Science Student
          </p>
          <p className="text-muted-foreground max-w-md leading-relaxed">
            Passionate about building practical and efficient solutions by applying programming and problem-solving skills to real-world challenges. Currently pursuing a B.Tech in Artificial Intelligence & Machine Learning at Graphic Era Hill University, with hands-on experience in C, Python, and a growing foundation in data structures and algorithms.
          </p>
          <div className="flex items-center gap-4 pt-2">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-heading font-semibold px-7 py-3 rounded-lg neon-glow hover:scale-105 transition-transform duration-300"
            >
              Let's Talk
            </a>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 border border-primary/40 text-primary font-heading font-medium px-7 py-3 rounded-lg hover:bg-primary/10 transition-all duration-300"
            >
              My Work
            </a>
          </div>
          <div className="flex items-center gap-5 pt-4">
            <a href="https://github.com/maiabhih00n/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors duration-300">
              <Github size={22} />
            </a>
            <a href="https://www.linkedin.com/in/abhijeet-dabral/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors duration-300">
              <Linkedin size={22} />
            </a>
            <a href="mailto:abhijeetdabral66@gmail.com" className="text-muted-foreground hover:text-primary transition-colors duration-300">
              <Mail size={22} />
            </a>
          </div>
        </div>

        {/* Right - Profile Image */}
        <div className="flex justify-center md:justify-end">
          <div className="relative">
            <div className="w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-primary/30 animate-glow-pulse">
              <img
                src={profileImg}
                alt="Raghav Upadhyay"
                width={512}
                height={512}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative ring */}
            <div className="absolute inset-0 rounded-full border-2 border-primary/10 scale-[1.15] animate-[spin_20s_linear_infinite]" />
            <div className="absolute inset-0 rounded-full border border-dashed border-primary/20 scale-[1.3]" />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a href="#about" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground animate-bounce">
        <ArrowDown size={20} />
      </a>
    </section>
  );
};

export default HeroSection;
