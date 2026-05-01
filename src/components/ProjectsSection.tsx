import { ExternalLink } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const projects = [
  {
   title: "Customer Churn Prediction using Machine Learning",
description: "Predicts customer churn in a telecom company using Random Forest and XGBoost models, with a Streamlit dashboard for interactive exploration of churn insights.",
techStack: ["Python", "XGBoost", "Random Forest", "Streamlit", "Scikit-learn"],
features: ["EDA & data cleaning", "Feature engineering", "Model comparison (RF vs XGBoost)", "ROC AUC evaluation"],

  },
  {
    title: "Smart Electricity Bill Optimizer",
description: "A menu-driven C system that minimizes electricity bills using time-of-use tariff scheduling. Applies Greedy and DP Knapsack algorithms to reschedule flexible appliances to off-peak hours and maximize appliances within a daily budget.",
techStack: ["C/C++", "Greedy Algorithms", "Dynamic Programming", "Knapsack Optimization"],
features: ["Time-of-use tariff scheduling", "Greedy appliance rescheduler", "DP Knapsack budget optimizer", "Savings report with monthly/yearly projections"],
  },
  {
    title: "Face Recognition Attendance System",
description: "An automated attendance system using real-time face recognition. Collects student face samples via webcam, trains an LBPH model, and marks attendance with voice feedback — all without any manual input.",
techStack: ["Python", "OpenCV", "LBPH Face Recognizer", "pyttsx3", "Haar Cascade"],
features: ["Automated face data collection", "LBPH model training", "Real-time recognition & attendance marking", "Voice feedback & duplicate-entry prevention"],
  },
];

const ProjectsSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="projects" className="section-padding relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div ref={ref} className="container mx-auto max-w-6xl">
        <div className={`text-center mb-14 transition-all duration-700 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <p className="text-primary font-heading font-medium tracking-widest uppercase text-sm mb-3">My Work</p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold">
            Featured <span className="text-primary neon-text">Projects</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <div
              key={project.title}
              className={`glass-card gradient-border p-6 group hover:scale-[1.03] hover:neon-glow transition-all duration-500 ${
                isVisible ? "animate-fade-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${i * 150}ms` }}
            >
              <h3 className="font-heading font-bold text-lg mb-3 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.techStack.map((tech) => (
                  <span key={tech} className="text-xs font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">
                    {tech}
                  </span>
                ))}
              </div>

              <ul className="space-y-1 mb-5">
                {project.features.map((f) => (
                  <li key={f} className="text-xs text-muted-foreground flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-primary" />
                    {f}
                  </li>
                ))}
              </ul>

              <button className="inline-flex items-center gap-2 text-sm font-heading font-medium text-primary hover:underline">
                View Details <ExternalLink size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
