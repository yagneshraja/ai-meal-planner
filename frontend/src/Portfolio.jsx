import React, { useEffect } from 'react';
import mermaid from 'mermaid';
import { FaArrowLeft, FaReact, FaJava, FaDatabase, FaRobot, FaCogs, FaTools } from 'react-icons/fa';

const Portfolio = ({ onBack }) => {
  
  useEffect(() => {
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
                { icon: <FaRobot />, title: 'AI Model', desc: 'Gemini 2.0', tag: 'Spring AI', color: 'text-emerald-400', bg: 'bg-emerald-900/20' },
                { icon: <FaTools />, title: 'Agent Tools', desc: 'Function Calling', tag: 'Agentic', color: 'text-yellow-400', bg: 'bg-yellow-900/20' },
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
        DB[(PostgreSQL + Vector)]
        AI[Gemini AI]
        Tools[Java Tools<br/>(Grocery Price Check)]
    end

    User -->|Click UI| React
    React -->|Axios Request| SpringBoot
    SpringBoot <-->|RAG Context| DB
    SpringBoot -->|Prompt| AI
    AI -.->|Function Call| Tools
    Tools -.->|Return Data| AI
    AI -->|Final JSON| SpringBoot
    
    Agent -.->|Every Sunday| SpringBoot

    style React fill:#1e293b,stroke:#3b82f6,stroke-width:2px
    style SpringBoot fill:#1e293b,stroke:#f97316,stroke-width:2px
    style DB fill:#1e293b,stroke:#a855f7,stroke-width:2px
    style AI fill:#1e293b,stroke:#10b981,stroke-width:2px
    style Tools fill:#334155,stroke:#eab308,stroke-dasharray: 5 5`}
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
                { step: 5, title: "Cloud Deployment", desc: "Dockerized the backend for Render and deployed the frontend to Vercel. Solved CORS, JDBC, and Environment Parity." },
                { step: 6, title: "RAG Memory", desc: "Upgraded database to PostgreSQL + PGVector. Implemented local embedding models to give the AI 'Long Term Memory'." },
                { step: 7, title: "Agentic Tools", desc: "Equipped the AI with 'Function Calling' capabilities. The Agent now autonomously checks grocery prices via Java code before suggesting meals." },
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

      {/* Troubleshooting Accordion */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            🛠️ Engineering "Battle Scars" <span class="text-sm font-normal text-slate-500 ml-auto">Click to expand</span>
        </h2>
        <div className="space-y-4">
            {/* Previous errors kept for history */}
            <details className="bg-slate-800 border border-slate-700 rounded-lg group">
                <summary className="flex justify-between items-center p-4 cursor-pointer font-medium text-slate-200 group-hover:text-emerald-400 transition">
                    <span>Error 500: JDBC URL Mismatch</span>
                    <span class="transition group-open:rotate-180">▼</span>
                </summary>
                <div class="p-4 border-t border-slate-700 text-slate-400 text-sm leading-relaxed">
                    <strong>Issue:</strong> Render provided `postgresql://` but Java requires `jdbc:postgresql://`.<br />
                    <strong>Fix:</strong> Manually constructed the URL in Environment Variables.
                </div>
            </details>
            
             <details className="bg-slate-800 border border-slate-700 rounded-lg group">
                <summary className="flex justify-between items-center p-4 cursor-pointer font-medium text-slate-200 group-hover:text-emerald-400 transition">
                    <span>Error: "No such file or directory" (Postgres Ghost)</span>
                    <span class="transition group-open:rotate-180">▼</span>
                </summary>
                <div class="p-4 border-t border-slate-700 text-slate-400 text-sm leading-relaxed">
                    <strong>Issue:</strong> A hidden PostgreSQL 14 process was blocking the new PostgreSQL 17 install, preventing `pgvector` from loading.<br />
                    <strong>Fix:</strong> Performed a "Nuclear Uninstall" of old versions, manually killed processes, and relinked the new Homebrew version.
                </div>
            </details>

            <details className="bg-slate-800 border border-emerald-500/30 rounded-lg group shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                <summary class="flex justify-between items-center p-4 cursor-pointer font-bold text-emerald-400 group-hover:text-emerald-300 transition">
                    <span>Final Boss: Malformed OpenAI Base URL</span>
                    <span class="transition group-open:rotate-180">▼</span>
                </summary>
                <div class="p-4 border-t border-slate-700 text-slate-300 text-sm leading-relaxed">
                    <strong>Issue:</strong> Spring AI's OpenAI Compatibility layer returned <code>404 Not Found (v1main)</code> when trying to reach Gemini 2.0. <br />
                    <strong>Diagnosis:</strong> A trailing slash in the Base URL (`.../openai/`) caused a double-slash issue (`//chat`), breaking the path on Google's server.<br />
                    <strong>Fix:</strong> Removed the trailing slash in <code>application.properties</code> and explicitly set the model to <code>gemini-2.0-flash-001</code>. Success!
                </div>
            </details>
        </div>
    </section>

    </div>
  );
};

export default Portfolio;