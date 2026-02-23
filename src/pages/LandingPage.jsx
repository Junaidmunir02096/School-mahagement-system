import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const useInView = (threshold = 0.15) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, inView];
};

const FadeIn = ({ children, delay = 0, className = "" }) => {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
};

const stats = [
  { value: "50K+", label: "Students Enrolled" },
  { value: "1,200+", label: "Schools Using" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "24/7", label: "Support Available" },
];

const features = [
  {
    icon: "🎓",
    title: "Student Management",
    desc: "Track admissions, attendance, academic progress, and student profiles all in one centralized dashboard.",
  },
  {
    icon: "📅",
    title: "Smart Scheduling",
    desc: "AI-powered timetable generation that avoids conflicts and optimizes teacher and room allocation.",
  },
  {
    icon: "📊",
    title: "Analytics & Reports",
    desc: "Real-time insights on school performance, student outcomes, and financial metrics with beautiful charts.",
  },
  {
    icon: "💬",
    title: "Communication Hub",
    desc: "Built-in messaging between teachers, parents, and admin. Announcements, alerts, and newsletters.",
  },
  {
    icon: "💰",
    title: "Fee Management",
    desc: "Automate fee collection, send reminders, generate receipts and track payment history effortlessly.",
  },
  {
    icon: "📚",
    title: "Library System",
    desc: "Manage book inventory, track borrowing, set due dates, and automate overdue notifications.",
  },
  {
    icon: "🚌",
    title: "Transport Tracking",
    desc: "Real-time GPS tracking of school buses with parent notifications on pickup and drop-off.",
  },
  {
    icon: "🏅",
    title: "Exam & Grades",
    desc: "Create exams, auto-grade quizzes, publish results and generate report cards in minutes.",
  },
  {
    icon: "👥",
    title: "Staff & HR",
    desc: "Manage teacher profiles, payroll, leave requests, and performance evaluations in one place.",
  },
];

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Principal, Lakewood Academy",
    avatar: "SM",
    quote: "EduCore transformed the way we manage our school. Admin work that took hours now takes minutes. Truly remarkable.",
  },
  {
    name: "David Chen",
    role: "IT Director, Sunrise Public School",
    avatar: "DC",
    quote: "The analytics dashboard alone is worth every penny. We can now make data-driven decisions that actually improve student outcomes.",
  },
  {
    name: "Priya Sharma",
    role: "Head of Academics, Green Valley School",
    avatar: "PS",
    quote: "Parent engagement has shot up 60% since we started using EduCore's communication tools. Parents love the transparency.",
  },
];

const plans = [
  {
    name: "Starter",
    price: "$49",
    period: "/month",
    desc: "Perfect for small schools getting started",
    features: ["Up to 300 students", "Core management tools", "Email support", "Basic reports", "Mobile app access"],
    highlight: false,
  },
  {
    name: "Professional",
    price: "$129",
    period: "/month",
    desc: "For growing schools needing more power",
    features: ["Up to 1,500 students", "All Starter features", "Advanced analytics", "Fee & payroll module", "Priority support", "Custom branding"],
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "For large institutions & school groups",
    features: ["Unlimited students", "All Pro features", "Dedicated account manager", "API access", "On-premise option", "SLA guarantee"],
    highlight: false,
  },
];

const navLinks = ["Features", "How It Works", "Testimonials", "Pricing", "Contact"];

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [count, setCount] = useState({ s: 0, sc: 0, sat: 0 });
  const navigate = useNavigate();
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Animated counter
  const [statsRef, statsInView] = useInView(0.3);
  useEffect(() => {
    if (!statsInView) return;
    const duration = 1800;
    const start = Date.now();
    const tick = () => {
      const progress = Math.min((Date.now() - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount({ s: Math.floor(50000 * ease), sc: Math.floor(1200 * ease), sat: Math.floor(98 * ease) });
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [statsInView]);

  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap');
        * { font-family: 'Plus Jakarta Sans', sans-serif; }
        h1,h2,h3,.display { font-family: 'Sora', sans-serif; }
        .hero-blob { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; animation: morph 8s ease-in-out infinite; }
        @keyframes morph { 0%,100%{border-radius:60% 40% 30% 70%/60% 30% 70% 40%} 50%{border-radius:30% 60% 70% 40%/50% 60% 30% 60%} }
        .float { animation: float 6s ease-in-out infinite; }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-18px)} }
        .float2 { animation: float 7s ease-in-out infinite 1s; }
        .float3 { animation: float 5s ease-in-out infinite 2s; }
        .card-hover { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .card-hover:hover { transform: translateY(-6px); box-shadow: 0 20px 60px rgba(77,68,181,0.15); }
        .plan-hover { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .plan-hover:hover { transform: scale(1.03); }
        .gradient-text { background: linear-gradient(135deg, #4D44B5, #7C74D8, #B8B4E8); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .nav-link { position: relative; }
        .nav-link::after { content:''; position:absolute; bottom:-2px; left:0; width:0; height:2px; background:#4D44B5; transition:width .3s; }
        .nav-link:hover::after { width:100%; }
        .pulse-ring { animation: pulse-ring 2s ease-out infinite; }
        @keyframes pulse-ring { 0%{transform:scale(0.8);opacity:1} 100%{transform:scale(1.5);opacity:0} }
        .step-line::after { content:''; position:absolute; top:28px; left:50%; width:100%; height:2px; background: linear-gradient(90deg, #4D44B5, #B8B4E8); }
        .particles { position:absolute; inset:0; overflow:hidden; pointer-events:none; }
        .particle { position:absolute; border-radius:50%; opacity:0.12; animation: drift linear infinite; }
        @keyframes drift { from{transform:translateY(100vh) rotate(0deg)} to{transform:translateY(-100px) rotate(360deg)} }
        .shine::after { content:''; position:absolute; inset:0; background:linear-gradient(105deg,transparent 40%,rgba(255,255,255,0.15) 50%,transparent 60%); background-size:200%; animation:shine 3s ease-in-out infinite; }
        @keyframes shine { 0%{background-position:200%} 100%{background-position:-200%} }
      `}</style>

      {/* NAV */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur shadow-sm" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-lg font-bold relative overflow-hidden shine" style={{ background: "linear-gradient(135deg, #4D44B5, #7C74D8)" }}>E</div>
            <span className="text-xl font-bold" style={{ fontFamily: "Sora, sans-serif", color: "#4D44B5" }}>EduCore</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <a key={link} href={`#${link.toLowerCase().replace(" ", "-")}`} className={`nav-link text-sm font-medium transition-colors ${scrolled ? "text-gray-700 hover:text-[#4D44B5]" : "text-gray-700 hover:text-[#4D44B5]"}`}>{link}</a>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-3">
            <button  onClick={() => navigate("/login")} className="text-sm font-medium text-[#4D44B5] hover:opacity-80 transition-opacity px-4 py-2">Log In</button>
            <button className="text-sm font-semibold text-white px-5 py-2.5 rounded-xl transition-all hover:shadow-lg hover:scale-105" style={{ background: "linear-gradient(135deg, #4D44B5, #7C74D8)" }}>Get Started Free</button>
          </div>
          <button className="md:hidden text-gray-700" onClick={() => setMobileOpen(!mobileOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} /></svg>
          </button>
        </div>
        {mobileOpen && (
          <div className="md:hidden bg-white border-t px-6 py-4 flex flex-col gap-4">
            {navLinks.map(link => <a key={link} href={`#${link.toLowerCase()}`} className="text-gray-700 font-medium">{link}</a>)}
            <button className="text-white py-2.5 rounded-xl font-semibold" style={{ background: "#4D44B5" }}>Get Started Free</button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: "linear-gradient(150deg, #f8f7ff 0%, #edeaff 40%, #f0f4ff 100%)" }}>
        <div className="particles">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="particle" style={{
              width: `${Math.random() * 30 + 8}px`, height: `${Math.random() * 30 + 8}px`,
              left: `${Math.random() * 100}%`, background: "#4D44B5",
              animationDuration: `${Math.random() * 15 + 10}s`,
              animationDelay: `${Math.random() * 10}s`
            }} />
          ))}
        </div>
        <div className="absolute top-20 right-10 w-96 h-96 rounded-full opacity-20 blur-3xl" style={{ background: "linear-gradient(135deg, #4D44B5, #B8B4E8)" }} />
        <div className="absolute bottom-10 left-10 w-72 h-72 rounded-full opacity-15 blur-3xl" style={{ background: "#7C74D8" }} />

        <div className="max-w-7xl mx-auto px-6 pt-28 pb-16 grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-6" style={{ background: "rgba(77,68,181,0.1)", color: "#4D44B5" }}>
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#4D44B5" }} />
              Trusted by 1,200+ Schools Worldwide
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6" style={{ fontFamily: "Sora, sans-serif", color: "#1a1040" }}>
              The Smartest Way to<br />
              <span className="gradient-text">Manage Your School</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-lg">
              EduCore brings together every aspect of school administration — from admissions to alumni — into one powerful, easy-to-use platform built for modern education.
            </p>
            <div className="flex flex-wrap gap-4 mb-10">
              <button className="relative overflow-hidden text-white font-semibold px-7 py-3.5 rounded-2xl text-base transition-all hover:shadow-xl hover:scale-105 shine" style={{ background: "linear-gradient(135deg, #4D44B5, #7C74D8)" }}>
                Start Free Trial
              </button>
              <button className="flex items-center gap-2 font-semibold px-7 py-3.5 rounded-2xl text-base border-2 transition-all hover:border-[#4D44B5] hover:text-[#4D44B5]" style={{ borderColor: "#c5c0f0", color: "#4D44B5" }}>
                <span className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "rgba(77,68,181,0.1)" }}>▶</span>
                Watch Demo
              </button>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {["#4D44B5", "#7C74D8", "#B8B4E8", "#9d96e0"].map((c, i) => (
                  <div key={i} className="w-9 h-9 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold" style={{ background: c }}>
                    {["J", "A", "M", "S"][i]}
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-600">
                <span className="font-bold text-gray-800">4,000+</span> happy administrators this month
              </p>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="hero-blob w-80 h-80 md:w-96 md:h-96 absolute opacity-20" style={{ background: "linear-gradient(135deg, #4D44B5, #B8B4E8)" }} />
            {/* Dashboard mock */}
            <div className="relative z-10 float">
              <div className="bg-white rounded-2xl shadow-2xl p-5 w-72 md:w-80" style={{ border: "1px solid rgba(77,68,181,0.1)" }}>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-bold text-gray-800" style={{ fontFamily: "Sora" }}>School Dashboard</span>
                  <span className="text-xs px-2 py-1 rounded-full font-medium" style={{ background: "rgba(77,68,181,0.1)", color: "#4D44B5" }}>Live</span>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {[["Students", "1,248", "🎓", "#edeaff"], ["Teachers", "84", "👨‍🏫", "#e8f4ff"], ["Classes", "42", "📚", "#e8fff0"], ["Revenue", "$24K", "💰", "#fff4e8"]].map(([l, v, ic, bg]) => (
                    <div key={l} className="rounded-xl p-3" style={{ background: bg }}>
                      <div className="text-lg">{ic}</div>
                      <div className="font-bold text-gray-800 text-lg">{v}</div>
                      <div className="text-xs text-gray-500">{l}</div>
                    </div>
                  ))}
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <div className="text-xs font-semibold text-gray-500 mb-2">Attendance This Week</div>
                  <div className="flex items-end gap-1 h-12">
                    {[70, 85, 60, 90, 78, 88, 95].map((h, i) => (
                      <div key={i} className="flex-1 rounded-t-sm transition-all" style={{ height: `${h}%`, background: i === 6 ? "#4D44B5" : "rgba(77,68,181,0.2)" }} />
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    {["M","T","W","T","F","S","S"].map(d => <span key={d}>{d}</span>)}
                  </div>
                </div>
              </div>
              {/* Floating cards */}
              <div className="absolute -top-6 -right-8 bg-white rounded-2xl shadow-lg px-4 py-3 float2" style={{ border: "1px solid rgba(77,68,181,0.12)" }}>
                <div className="text-xs text-gray-500">New Admission</div>
                <div className="font-bold text-gray-800 text-sm">Emma Watson ✓</div>
              </div>
              <div className="absolute -bottom-4 -left-8 bg-white rounded-2xl shadow-lg px-4 py-3 float3" style={{ border: "1px solid rgba(77,68,181,0.12)" }}>
                <div className="text-xs text-gray-500">Fee Collected</div>
                <div className="font-bold text-[#4D44B5] text-sm">$4,200 Today 🎉</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section ref={statsRef} className="py-16" style={{ background: "linear-gradient(135deg, #4D44B5, #6B64CC)" }}>
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
          {[
            { val: `${count.s.toLocaleString()}+`, label: "Students Enrolled" },
            { val: `${count.sc.toLocaleString()}+`, label: "Schools Using" },
            { val: `${count.sat}%`, label: "Satisfaction Rate" },
            { val: "24/7", label: "Support Available" },
          ].map(({ val, label }) => (
            <div key={label}>
              <div className="text-4xl md:text-5xl font-extrabold mb-1" style={{ fontFamily: "Sora" }}>{val}</div>
              <div className="text-sm opacity-80 font-medium">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-24 px-6" style={{ background: "#fafaf9" }}>
        <div className="max-w-7xl mx-auto">
          <FadeIn className="text-center mb-16">
            <div className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4" style={{ background: "rgba(77,68,181,0.1)", color: "#4D44B5" }}>Everything You Need</div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4" style={{ fontFamily: "Sora" }}>Powerful Features for<br /><span className="gradient-text">Modern Schools</span></h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">From the first day of school to graduation, EduCore covers every step of the journey.</p>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <FadeIn key={f.title} delay={i * 0.07}>
                <div className="card-hover bg-white rounded-2xl p-6 border" style={{ borderColor: "rgba(77,68,181,0.08)" }}>
                  <div className="text-3xl mb-4 w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: "rgba(77,68,181,0.08)" }}>{f.icon}</div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2" style={{ fontFamily: "Sora" }}>{f.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <FadeIn className="text-center mb-16">
            <div className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4" style={{ background: "rgba(77,68,181,0.1)", color: "#4D44B5" }}>Simple Onboarding</div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4" style={{ fontFamily: "Sora" }}>Up and Running<br /><span className="gradient-text">in 3 Easy Steps</span></h2>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-10 relative">
            {[
              { step: "01", title: "Create Your School", desc: "Sign up and configure your school profile — name, grades, departments, and academic year — in minutes." },
              { step: "02", title: "Import Your Data", desc: "Bulk-upload students, staff, and schedules from Excel or connect your existing student information system." },
              { step: "03", title: "Go Live Instantly", desc: "Share access with teachers, parents, and staff. Everyone logs in and starts collaborating on day one." },
            ].map((s, i) => (
              <FadeIn key={s.step} delay={i * 0.15}>
                <div className="text-center">
                  <div className="relative inline-flex items-center justify-center mb-6">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center text-white font-extrabold text-xl z-10 relative" style={{ background: "linear-gradient(135deg, #4D44B5, #7C74D8)", fontFamily: "Sora" }}>{s.step}</div>
                    <div className="absolute inset-0 rounded-full pulse-ring opacity-30" style={{ background: "#4D44B5" }} />
                  </div>
                  <h3 className="font-bold text-xl text-gray-900 mb-3" style={{ fontFamily: "Sora" }}>{s.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{s.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* HIGHLIGHT BANNER */}
      <section className="py-20 px-6 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #3730a3, #4D44B5, #6B64CC)" }}>
        <div className="absolute inset-0 opacity-10">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="absolute rounded-full" style={{
              width: `${Math.random() * 100 + 20}px`, height: `${Math.random() * 100 + 20}px`,
              top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`,
              border: "1px solid white", opacity: Math.random()
            }} />
          ))}
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10 text-white">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-5" style={{ fontFamily: "Sora" }}>Join 50,000+ Students Already Learning Smarter</h2>
            <p className="text-lg opacity-85 mb-8">Start your 30-day free trial. No credit card required. Cancel anytime.</p>
            <button className="bg-white font-bold px-8 py-4 rounded-2xl text-base transition-all hover:shadow-2xl hover:scale-105" style={{ color: "#4D44B5" }}>
              Get Started for Free →
            </button>
          </FadeIn>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="py-24 px-6" style={{ background: "#fafaf9" }}>
        <div className="max-w-7xl mx-auto">
          <FadeIn className="text-center mb-16">
            <div className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4" style={{ background: "rgba(77,68,181,0.1)", color: "#4D44B5" }}>Success Stories</div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4" style={{ fontFamily: "Sora" }}>Loved by School<br /><span className="gradient-text">Leaders Everywhere</span></h2>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <FadeIn key={t.name} delay={i * 0.1}>
                <div className="card-hover bg-white rounded-2xl p-7 border" style={{ borderColor: "rgba(77,68,181,0.08)" }}>
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, j) => <span key={j} style={{ color: "#4D44B5" }}>★</span>)}
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-6 text-sm italic">"{t.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-sm" style={{ background: "linear-gradient(135deg, #4D44B5, #7C74D8)" }}>{t.avatar}</div>
                    <div>
                      <div className="font-bold text-gray-900 text-sm">{t.name}</div>
                      <div className="text-xs text-gray-400">{t.role}</div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <FadeIn className="text-center mb-16">
            <div className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4" style={{ background: "rgba(77,68,181,0.1)", color: "#4D44B5" }}>Transparent Pricing</div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4" style={{ fontFamily: "Sora" }}>Simple Plans for<br /><span className="gradient-text">Every School Size</span></h2>
            <p className="text-gray-500 text-lg">All plans include a 30-day free trial. No setup fees.</p>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((p, i) => (
              <FadeIn key={p.name} delay={i * 0.1}>
                <div className={`plan-hover rounded-2xl p-7 relative ${p.highlight ? "text-white shadow-2xl" : "bg-white border"}`}
                  style={p.highlight ? { background: "linear-gradient(135deg, #4D44B5, #7C74D8)", borderColor: "transparent" } : { borderColor: "rgba(77,68,181,0.1)" }}>
                  {p.highlight && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold bg-yellow-400 text-yellow-900">Most Popular</div>}
                  <div className={`font-bold text-sm mb-2 ${p.highlight ? "text-white/80" : "text-gray-500"}`}>{p.name}</div>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-4xl font-extrabold" style={{ fontFamily: "Sora" }}>{p.price}</span>
                    <span className={`text-sm ${p.highlight ? "text-white/70" : "text-gray-400"}`}>{p.period}</span>
                  </div>
                  <p className={`text-sm mb-6 ${p.highlight ? "text-white/80" : "text-gray-500"}`}>{p.desc}</p>
                  <button className={`w-full py-3 rounded-xl font-semibold text-sm mb-6 transition-all hover:scale-105 ${p.highlight ? "bg-white text-[#4D44B5]" : "text-white"}`}
                    style={!p.highlight ? { background: "linear-gradient(135deg, #4D44B5, #7C74D8)" } : {}}>
                    Get Started
                  </button>
                  <ul className="space-y-3">
                    {p.features.map(f => (
                      <li key={f} className={`flex items-center gap-2 text-sm ${p.highlight ? "text-white/90" : "text-gray-600"}`}>
                        <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0" style={{ background: p.highlight ? "rgba(255,255,255,0.2)" : "rgba(77,68,181,0.1)", color: p.highlight ? "white" : "#4D44B5" }}>✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6" style={{ background: "#fafaf9" }}>
        <div className="max-w-3xl mx-auto">
          <FadeIn className="text-center mb-14">
            <div className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4" style={{ background: "rgba(77,68,181,0.1)", color: "#4D44B5" }}>FAQ</div>
            <h2 className="text-4xl font-extrabold text-gray-900" style={{ fontFamily: "Sora" }}>Frequently Asked <span className="gradient-text">Questions</span></h2>
          </FadeIn>
          {[
            { q: "Is EduCore suitable for private and government schools?", a: "Yes! EduCore is flexible and configures to the needs of both private and public schools, from kindergartens to high schools." },
            { q: "Can parents access EduCore?", a: "Absolutely. Parents get a dedicated portal and mobile app to track their child's attendance, grades, fees, and communicate with teachers." },
            { q: "Is my school's data secure?", a: "We use bank-level 256-bit encryption, daily backups, and are GDPR compliant. Your data is hosted on AWS with 99.9% uptime SLA." },
            { q: "Can I import our existing student data?", a: "Yes. We support bulk import via Excel/CSV and can integrate with most existing Student Information Systems (SIS)." },
            { q: "How long does setup take?", a: "Most schools are fully set up within 1–3 days. Our onboarding team provides live guidance throughout the process." },
          ].map((item, i) => (
            <FadeIn key={i} delay={i * 0.06}>
              <div className="bg-white rounded-2xl p-6 mb-4 border" style={{ borderColor: "rgba(77,68,181,0.08)" }}>
                <div className="font-semibold text-gray-900 mb-2" style={{ fontFamily: "Sora" }}>{item.q}</div>
                <div className="text-gray-500 text-sm leading-relaxed">{item.a}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <FadeIn className="text-center mb-14">
            <div className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4" style={{ background: "rgba(77,68,181,0.1)", color: "#4D44B5" }}>Contact Us</div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4" style={{ fontFamily: "Sora" }}>Ready to Transform<br /><span className="gradient-text">Your School?</span></h2>
            <p className="text-gray-500 text-lg">Talk to our education specialists and get a personalized demo.</p>
          </FadeIn>
          <FadeIn>
            <div className="rounded-3xl p-8 md:p-12 grid md:grid-cols-2 gap-10" style={{ background: "linear-gradient(150deg, #f8f7ff, #edeaff)" }}>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "Sora" }}>Get in Touch</h3>
                <p className="text-gray-500 mb-6 text-sm leading-relaxed">Fill out the form and one of our school success managers will reach out within 24 hours.</p>
                {[["📍", "123 Education Lane, Knowledge City, KN 10001"], ["📧", "hello@educore.school"], ["📞", "+1 (800) EDU-CORE"]].map(([icon, text]) => (
                  <div key={text} className="flex items-center gap-3 mb-4">
                    <span className="text-xl">{icon}</span>
                    <span className="text-gray-600 text-sm">{text}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input placeholder="First Name" className="bg-white rounded-xl px-4 py-3 text-sm border outline-none focus:ring-2 focus:ring-[#4D44B5] transition-all" style={{ borderColor: "rgba(77,68,181,0.15)" }} />
                  <input placeholder="Last Name" className="bg-white rounded-xl px-4 py-3 text-sm border outline-none focus:ring-2 focus:ring-[#4D44B5] transition-all" style={{ borderColor: "rgba(77,68,181,0.15)" }} />
                </div>
                <input placeholder="School Email" className="w-full bg-white rounded-xl px-4 py-3 text-sm border outline-none focus:ring-2 focus:ring-[#4D44B5] transition-all" style={{ borderColor: "rgba(77,68,181,0.15)" }} />
                <input placeholder="School Name" className="w-full bg-white rounded-xl px-4 py-3 text-sm border outline-none focus:ring-2 focus:ring-[#4D44B5] transition-all" style={{ borderColor: "rgba(77,68,181,0.15)" }} />
                <textarea rows={3} placeholder="Tell us about your school..." className="w-full bg-white rounded-xl px-4 py-3 text-sm border outline-none focus:ring-2 focus:ring-[#4D44B5] transition-all resize-none" style={{ borderColor: "rgba(77,68,181,0.15)" }} />
                <button className="w-full text-white font-semibold py-3.5 rounded-xl text-sm transition-all hover:shadow-lg hover:scale-[1.02] shine relative overflow-hidden" style={{ background: "linear-gradient(135deg, #4D44B5, #7C74D8)" }}>
                  Request a Free Demo
                </button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#0f0b2e" }} className="text-white py-16 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold" style={{ background: "linear-gradient(135deg, #4D44B5, #7C74D8)" }}>E</div>
              <span className="text-xl font-bold" style={{ fontFamily: "Sora", color: "#B8B4E8" }}>EduCore</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">The all-in-one school management platform trusted by over 1,200 institutions globally.</p>
          </div>
          {[
            { title: "Product", links: ["Features", "Pricing", "Roadmap", "Changelog", "API"] },
            { title: "Company", links: ["About", "Blog", "Careers", "Press", "Contact"] },
            { title: "Legal", links: ["Privacy Policy", "Terms of Service", "Cookie Policy", "GDPR"] },
          ].map(col => (
            <div key={col.title}>
              <h4 className="font-bold text-sm mb-4" style={{ fontFamily: "Sora", color: "#B8B4E8" }}>{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map(l => <li key={l}><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">{l}</a></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">© 2025 EduCore. All rights reserved.</p>
          <div className="flex gap-4">
            {["𝕏", "in", "f", "▶"].map((icon, i) => (
              <div key={i} className="w-9 h-9 rounded-xl flex items-center justify-center text-sm cursor-pointer transition-all hover:scale-110" style={{ background: "rgba(255,255,255,0.06)", color: "#B8B4E8" }}>{icon}</div>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

 {/* ================= Landing Page 2 ================= */}

// import React from "react";
// import { motion } from "framer-motion";

// const LandingPage = () => {
//   return (
//     <div className="font-sans text-gray-800 overflow-hidden">

//       {/* ================= NAVBAR ================= */}
//       <nav className="fixed w-full bg-white shadow-md z-50">
//         <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
//           <h1 className="text-2xl font-bold text-[#4D44B5]">
//             SchoolMS
//           </h1>

//           <div className="hidden md:flex ce-x-8 font-medium">
//             <a href="#features" className="hover:text-[#4D44B5]">Features</a>
//             <a href="#about" className="hover:text-[#4D44B5]">About</a>
//             <a href="#pricing" className="hover:text-[#4D44B5]">Pricing</a>
//             <a href="#contact" className="hover:text-[#4D44B5]">Contact</a>
//           </div>

//           <button className="bg-[#4D44B5] text-white px-5 py-2 rounded-lg hover:opacity-90 transition">
//             Get Started
//           </button>
//         </div>
//       </nav>

//       {/* ================= HERO SECTION ================= */}
//       <section className="min-h-screen flex items-center bg-gradient-to-r from-[#4D44B5] to-indigo-600 text-white pt-24">
//         <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">

//           <motion.div
//             initial={{ opacity: 0, x: -80 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8 }}
//           >
//             <h2 className="text-5xl font-bold leading-tight mb-6">
//               Modern School Management System
//             </h2>
//             <p className="text-lg mb-8 text-gray-200">
//               Manage students, teachers, attendance, exams and results
//               in one powerful and easy-to-use platform.
//             </p>

//             <div className="flex space-x-4">
//               <button className="bg-white text-[#4D44B5] px-6 py-3 rounded-lg font-semibold">
//                 Request Demo
//               </button>
//               <button className="border border-white px-6 py-3 rounded-lg">
//                 Learn More
//               </button>
//             </div>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, x: 80 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8 }}
//             className="bg-white p-8 rounded-2xl shadow-2xl"
//           >
//             <div className="h-72 bg-gray-100 rounded-xl flex items-center justify-center">
//               <span className="text-[#4D44B5] font-semibold">
//                 Dashboard Preview
//               </span>
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       {/* ================= FEATURES SECTION ================= */}
//       <section id="features" className="py-24 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-6 text-center">

//           <motion.h3
//             initial={{ opacity: 0, y: 50 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="text-4xl font-bold mb-16 text-[#4D44B5]"
//           >
//             Powerful Features
//           </motion.h3>

//           <div className="grid md:grid-cols-3 gap-10">
//             {[
//               "Student Management",
//               "Attendance Tracking",
//               "Exam & Result System",
//               "Teacher Management",
//               "Fee Management",
//               "Parent Portal",
//             ].map((feature, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 60 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, delay: index * 0.1 }}
//                 className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition"
//               >
//                 <div className="w-16 h-16 bg-[#4D44B5]/10 rounded-full flex items-center justify-center mx-auto mb-6">
//                   <div className="w-8 h-8 bg-[#4D44B5] rounded-full"></div>
//                 </div>
//                 <h4 className="text-xl font-semibold mb-4">{feature}</h4>
//                 <p className="text-gray-600">
//                   Efficiently manage all your school operations with our
//                   advanced and user-friendly modules.
//                 </p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ================= ABOUT SECTION ================= */}
//       <section id="about" className="py-24">
//         <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

//           <motion.div
//             initial={{ opacity: 0, x: -60 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.6 }}
//           >
//             <h3 className="text-4xl font-bold text-[#4D44B5] mb-6">
//               Why Choose Our System?
//             </h3>
//             <p className="text-gray-600 mb-6">
//               Our School Management System simplifies daily operations
//               and improves communication between teachers, students,
//               and parents.
//             </p>

//             <ul className="space-y-4">
//               <li>✔ Secure & Cloud Based</li>
//               <li>✔ Real-time Reports</li>
//               <li>✔ Easy Integration</li>
//               <li>✔ User Friendly Interface</li>
//             </ul>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, x: 60 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.6 }}
//             className="bg-[#4D44B5] h-80 rounded-2xl shadow-xl"
//           ></motion.div>
//         </div>
//       </section>

//       {/* ================= PRICING SECTION ================= */}
//       <section id="pricing" className="py-24 bg-gray-50 text-center">
//         <h3 className="text-4xl font-bold text-[#4D44B5] mb-16">
//           Flexible Pricing Plans
//         </h3>

//         <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 px-6">
//           {["Basic", "Standard", "Premium"].map((plan, index) => (
//             <motion.div
//               key={index}
//               whileHover={{ scale: 1.05 }}
//               className="bg-white p-10 rounded-2xl shadow-lg"
//             >
//               <h4 className="text-2xl font-semibold mb-4">{plan}</h4>
//               <p className="text-4xl font-bold text-[#4D44B5] mb-6">
//                 ${index === 0 ? "29" : index === 1 ? "59" : "99"}
//               </p>
//               <button className="bg-[#4D44B5] text-white px-6 py-3 rounded-lg w-full">
//                 Choose Plan
//               </button>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* ================= CTA SECTION ================= */}
//       <section className="py-20 bg-[#4D44B5] text-white text-center">
//         <h3 className="text-4xl font-bold mb-6">
//           Ready to Transform Your School?
//         </h3>
//         <p className="mb-8">
//           Join hundreds of institutions already using our system.
//         </p>
//         <button className="bg-white text-[#4D44B5] px-8 py-4 rounded-xl font-semibold">
//           Start Free Trial
//         </button>
//       </section>

//       {/* ================= FOOTER ================= */}
//       <footer id="contact" className="bg-gray-900 text-gray-300 py-12">
//         <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10">
//           <div>
//             <h4 className="text-xl font-semibold text-white mb-4">
//               SchoolMS
//             </h4>
//             <p>
//               A complete solution for modern educational institutions.
//             </p>
//           </div>

//           <div>
//             <h4 className="text-white mb-4">Quick Links</h4>
//             <ul className="space-y-2">
//               <li>Features</li>
//               <li>Pricing</li>
//               <li>About</li>
//             </ul>
//           </div>

//           <div>
//             <h4 className="text-white mb-4">Contact</h4>
//             <p>Email: support@schoolms.com</p>
//             <p>Phone: +92 300 0000000</p>
//           </div>
//         </div>

//         <div className="text-center mt-10 text-sm">
//           © 2026 SchoolMS. All rights reserved.
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default LandingPage;
