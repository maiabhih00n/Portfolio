import { Briefcase, GraduationCap } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const experience = [
  {
    type: "work" as const,
title: "Software Development & Machine Learning Projects",
org: "Self-Initiated",
date: "Experience",
description:
  "Worked on multiple academic and personal projects involving machine learning and software development. Built applications using Python and implemented concepts like data preprocessing, model building, and problem-solving. Gained practical experience through hands-on project development and continuous learning.",
  },
];

const education = [
  {
    type: "education" as const,
    title: "B.Tech in AI & Machine Learning",
    org: "Graphic Era Hill University, Dehradun",
    date: "2024 – 2028",
    description: "Specializing in AI/ML with focus on deep learning, computer vision, and natural language processing.",
  },
  {
    type: "education" as const,
    title: "Senior Secondary (Class XII)",
    org: "Bhagirathi Vidyalaya, Dehradun",
    date: "2022 – 2023",
    description: "Completed higher secondary education with focus on Science stream (PCM with Computer Science).",
  },
  {
    type: "education" as const,
    title: "Secondary (Class X)",
    org: "A.N.D public school, Dehradun",
    date: "2020 – 2021",
    description: "Completed secondary education with strong foundation in Mathematics and Science.",
  },
];

const timeline = [...experience, ...education];

const ExperienceSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="experience" className="section-padding relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div ref={ref} className="container mx-auto max-w-3xl">
        <div className={`text-center mb-14 transition-all duration-700 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <p className="text-primary font-heading font-medium tracking-widest uppercase text-sm mb-3">My Journey</p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold">
            Experience & <span className="text-primary neon-text">Education</span>
          </h2>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-primary/20 to-transparent" />

          <div className="space-y-10">
            {timeline.map((item, i) => (
              <div
                key={i}
                className={`relative flex items-start gap-6 md:gap-0 transition-all duration-700 ${
                  isVisible ? "animate-fade-up" : "opacity-0"
                } ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                style={{ animationDelay: `${i * 150}ms` }}
              >
                {/* Icon dot */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-background border-2 border-primary/40 flex items-center justify-center z-10 neon-glow">
                  {item.type === "work" ? (
                    <Briefcase size={18} className="text-primary" />
                  ) : (
                    <GraduationCap size={18} className="text-primary" />
                  )}
                </div>

                {/* Card */}
                <div className={`ml-16 md:ml-0 md:w-[45%] ${i % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                  <div className="glass-card gradient-border p-5">
                    <span className="text-xs text-primary font-heading font-medium">{item.date}</span>
                    <h3 className="font-heading font-bold mt-1">{item.title}</h3>
                    <p className="text-sm text-primary/80 font-medium">{item.org}</p>
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
