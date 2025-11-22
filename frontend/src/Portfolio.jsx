import React, { useEffect } from 'react';
import mermaid from 'mermaid';
import { FaArrowLeft, FaReact, FaJava, FaDatabase, FaRobot, FaCogs } from 'react-icons/fa';

const Portfolio = ({ onBack }) => {
  
  useEffect(() => {
    // Initialize Mermaid for the diagrams
    mermaid.initialize({ 
      startOnLoad: true, 
      theme: 'dark',
      securityLevel: 'loose',
    });
    mermaid.contentLoaded();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans selection:bg-emerald-500 selection:text-white pb-12">
      
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 p-4">
        <div className="max-w-7xl mx-auto">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors font-bold"
          >
            <FaArrowLeft /> Back to Meal Planner
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative pt-12 pb-12 text-center px-4">
        <div className="inline-block px-4 py-1 rounded-full bg-slate-800 border border-slate-700 text-emerald-400 text-sm font-semibold mb-6 animate-pulse">
          🚀 Zero to Hero Journey
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-white">
          Architecture & <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">Engineering Journey</span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-slate-400">
          A deep dive into how this distributed cloud system was architected, from the React frontend to the Autonomous Spring Boot Agents.
        </p>
      </div>

      {/* Tech Stack */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-white text-center mb-8">The Tech Stack</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
                { icon: <FaReact />, title: 'Frontend', desc: 'React + Vite', tag: 'Vercel', color: 'text-blue-400', bg: 'bg-blue-900/20' },
                { icon: <FaJava />, title: 'Backend', desc: 'Spring Boot 3', tag: 'Render', color: 'text-orange-400', bg: 'bg-orange-900/20' },
                { icon: <FaDatabase />, title: 'Database', desc: 'PostgreSQL', tag: 'Cloud', color: 'text-purple-400', bg: 'bg-purple-900/20' },
                { icon: <FaRobot />, title: 'AI Model', desc: 'Gemini 2.0', tag: 'Google', color: 'text-emerald-400', bg: 'bg-emerald-900/20' },
                { icon: <FaCogs />, title: 'Agent', desc: 'Scheduler', tag: 'Autonomous', color: 'text-yellow-400', bg: 'bg-yellow-900/20' },
            ].map((item, idx) => (
                <div key={idx} className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl hover:transform hover:-translate-y-1 transition-all duration-300 shadow-lg">
                    <div className={`text-4xl mb-4 ${item.color}`}>{item.icon}</div>
                    <h3 className="font-bold text-white">{item.title}</h3>
                    <p className="text-sm text-slate-400 mt-1">{item.desc}</p>
                    <div className={`mt-3 inline-block ${item.bg} ${item.color} text-xs px-2 py-1 rounded`}>{item.tag}</div>
                </div>
            ))}
        </div>
      </section>

      {/* Diagram Section */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-slate-800/40 p-8 rounded-2xl border border-slate-700 shadow-2xl overflow-x-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-8">System Architecture</h2>
          <div className="mermaid flex justify-center">
{`graph LR
    subgraph Client Side
        User[User / Browser]
        React[React Frontend<br/>(Vercel)]
    end

    subgraph Cloud Backend
        SpringBoot[Spring Boot API<br/>(Render)]
        Agent[Autonomous Agent<br/>(Scheduler)]
    end

    subgraph Data & External
        DB[(PostgreSQL)]
        AI[Gemini AI]
        Email[Gmail SMTP]
    end

    User -->|Click UI| React
    React -->|Axios Request| SpringBoot
    SpringBoot -->|JPA| DB
    SpringBoot -->|REST API| AI
    
    Agent -.->|Every Sunday| SpringBoot
    Agent -->|Send List| Email
    Email -.->|Deliver| User

    style React fill:#1e293b,stroke:#3b82f6,stroke-width:2px
    style SpringBoot fill:#1e293b,stroke:#f97316,stroke-width:2px
    style DB fill:#1e293b,stroke:#a855f7,stroke-width:2px
    style AI fill:#1e293b,stroke:#10b981,stroke-width:2px
    style Agent fill:#334155,stroke:#eab308,stroke-dasharray: 5 5`}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-white text-center mb-12">The Development Timeline</h2>
        <div className="space-y-8 border-l-2 border-slate-700 ml-4 md:ml-0 pl-8 md:pl-0">
            {[
                { step: 1, title: "Prompt Engineering", desc: "Designed strict PRDs to force AI to generate production-grade SQL schemas and API contracts." },
                { step: 2, title: "Local Environment", desc: "Configured the 'Builder's Toolkit': Java 17, Node.js, MySQL, and Maven on macOS Silicon." },
                { step: 3, title: "Full Stack Core", desc: "Built the Spring Boot REST API and connected it to React via Axios using the Service Pattern." },
                { step: 4, title: "AI Integration", desc: "Implemented the 'Proxy Pattern' to securely route requests to Gemini 2.0 Flash." },
                { step: 5, title: "Cloud Deployment", desc: "Dockerized the backend for Render and deployed the frontend to Vercel (Solved CORS & JDBC errors)." },
                { step: 6, title: "Autonomous Agents", desc: "Created a 'Sunday Agent' that wakes up, plans meals, and emails the user automatically." },
            ].map((item) => (
                <div key={item.step} className="relative md:flex items-center justify-between md:odd:flex-row-reverse group">
                    <div className="absolute -left-[41px] md:static flex items-center justify-center w-10 h-10 rounded-full border border-slate-700 bg-slate-800 text-emerald-400 font-bold z-10 group-hover:bg-emerald-500 group-hover:text-white transition-colors shadow-lg">
                        {item.step}
                    </div>
                    <div className="w-full md:w-[45%] bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-emerald-500/50 transition-all">
                        <h3 className="font-bold text-white text-lg mb-2">{item.title}</h3>
                        <p className="text-slate-400">{item.desc}</p>
                    </div>
                </div>
            ))}
        </div>
      </section>

    </div>
  );
};

export default Portfolio;