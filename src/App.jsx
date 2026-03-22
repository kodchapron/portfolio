import { useState, useEffect, useRef } from "react";

// ── Tourism screenshots ──────────────────────────────────────────
// 1. Copy your screenshots to src/assets/
// 2. Uncomment the two import lines below
// 3. Delete the two const lines below them
//
import tourismImg1 from "./assets/tourism-1.png";
import tourismImg2 from "./assets/tourism-2.png";
// const tourismImg1 = "/assets/tourism-1.png";   // ← replace with import above
// const tourismImg2 = "/assets/tourism-2.png";   // ← replace with import above

/* ─── DESIGN TOKENS ─────────────────────────────────────────── */
const T = {
  blue:      "#1B6CA8",
  blueMid:   "#2D8DD6",
  blueLight: "#E8F3FB",
  blueGhost: "#F0F7FC",
  slate900:  "#0F1923",
  slate700:  "#2C3E50",
  slate500:  "#64748B",
  slate300:  "#94A3B8",
  slate100:  "#F1F5F9",
  slate50:   "#F8FAFC",
  white:     "#FFFFFF",
  border:    "#E2E8F0",
  borderBlue:"#BFDBEE",
};

/* ─── DATA ───────────────────────────────────────────────────── */
const PROJECTS = [
  {
    id: 1,
    num: "01",
    slug: "lastly",
    title: "Lastly",
    subtitle: "Funeral Management App",
    category: "uxui",
    tags: ["User Research", "Figma Prototyping", "UX Psychology"],
    desc: "Empathy-driven app ที่ช่วยจัดการงานศพในช่วงเวลาที่ยากลำบาก ออกแบบโดยเน้น User Research เพื่อลด Cognitive Load",
    link: "https://www.figma.com/proto/tbqRAYqs7I6ZzwMNQk8Fra/LASTLY?node-id=0-1&p=f&viewport=213%2C257%2C0.04&t=l56uePgmQcLE50Tn-0&scaling=scale-down&content-scaling=fixed&starting-point-node-id=104%3A7&show-proto-sidebar=1",
    cta: "View Detail →",
  },
  {
    id: 2,
    num: "02",
    slug: "tourism",
    title: "Tourism Data",
    subtitle: "Analysis Dashboard",
    category: "uxui",
    tags: ["ETL Process", "SQL / Python", "Data Viz"],
    desc: "Data Pipeline และ Dashboard สำหรับวิเคราะห์ข้อมูลการท่องเที่ยว ให้ Insights สำหรับการตัดสินใจ",
    link: "https://tourism-data-analysis.vercel.app/dashboard",
    cta: "View Detail →",
  },
  {
    id: 3,
    num: "03",
    slug: "ai-kids",
    title: "AI Kids Song",
    subtitle: "YouTube Channel",
    category: "ai",
    tags: ["Prompt Engineering", "Content Strategy", "Video Production"],
    desc: "ช่องเพลงเด็กที่สร้างด้วย AI 100% — แสดงทักษะ GenAI Workflow และ Content Automation",
    link: "https://www.youtube.com/channel/UCAzdtG0CSEdeQagliM6K1wA",
    cta: "View Detail →",
  },
  {
    id: 4,
    num: "04",
    slug: "face-label",
    title: "Face Attribute Labeling",
    subtitle: "Research Assistant · CMU",
    category: "data",
    tags: ["Google Sheets", "Race / Gender / Age", "Dropdown Validation", "QC Workflow"],
    desc: "Label face attributes (race, gender, age range) สำหรับ face recognition research — ใช้ Google Sheets + dropdown validation พร้อม QC column",
    link: "https://docs.google.com/spreadsheets/d/1sHZsyez2q49xVyA8hLA-2EJPlQ84YHlPt3T5da8TFlc/edit?usp=sharing",
    cta: "View Detail →",
    comingSoon: false,
  },
  {
    id: 5,
    num: "05",
    slug: "person-reid",
    title: "Person Re-ID Dataset",
    subtitle: "Research Assistant · CMU",
    category: "data",
    tags: ["YOLOv10", "CCTV Footage", "24+ Persons", "Image Classification"],
    desc: "จัด Dataset รูปภาพ CCTV หลายหมื่นรูป แยก folder ตาม person_id 24 คน + junk — ใช้กับ YOLOv10 confidence 90% สำหรับ Person Re-identification",
    link: null,
    cta: "View Detail →",
  },
  {
    id: 6,
    num: "06",
    slug: "cfdna",
    title: "cfTrack",
    subtitle: "Medical Research Web App · CMUTEAM × CAMT",
    category: "uxui",
    tags: ["Frontend Dev", "UI Design", "Data Preparation", "Medical Research", "Python/Flask"],
    desc: "Web platform สำหรับ cell-free DNA fragment analysis ให้คณะแพทย์ มช. — รวมข้อมูล 2,357 samples, 23 disease types อ้างอิงจาก Nature / PNAS / Cell",
    link: "https://iviieww.pythonanywhere.com/home",
    cta: "View Detail →",
  },
];


/* ─── PROJECT DETAILS ────────────────────────────────────────── */
const PROJECT_DETAILS = {
  tourism: {
    overview: "ระบบวิเคราะห์ข้อมูลนักท่องเที่ยวเชิงลึก ดึงข้อมูลจากกล้อง CCTV หลายจุดในเชียงใหม่ แสดงผลแบบ real-time dashboard",
    role: "ออกแบบ UX/UI และทำ frontend — ใช้ AI ช่วยเขียนโค้ด ส่วน ETL pipeline และ backend ทำโดยทีม",
    problem: "ผู้บริหารต้องการดูข้อมูลนักท่องเที่ยว (จำนวน, เพศ, วัย, ชาติ) แบบ real-time แต่ยังไม่มี dashboard ที่ใช้งานง่าย",
    solution: "ออกแบบ UI ให้ดูข้อมูลได้ทันที กรองตามวัน/เดือน/ปี และ drill-down รายกล้องได้ — เขียนโค้ด frontend ด้วยความช่วยเหลือของ AI",
    stack: ["Figma", "HTML / CSS / JS", "AI-assisted Coding", "Vercel"],
    images: [tourismImg1, tourismImg2],
    link: "https://tourism-data-analysis.vercel.app/dashboard",
    linkLabel: "View Live Dashboard",
  },
  lastly: {
    overview: "Empathy-driven funeral management app — ออกแบบเพื่อลด cognitive load ในช่วงเวลาที่ยากลำบาก",
    role: "UX Research, Wireframing, Figma Prototyping",
    problem: "การจัดงานศพมีขั้นตอนซับซ้อนมาก ผู้ใช้ต้องตัดสินใจหลายอย่างในช่วงที่เครียดที่สุด",
    solution: "ออกแบบ flow ที่แบ่งขั้นตอนชัดเจน ใช้ UX Psychology ลด decision fatigue และ emotional friction",
    stack: ["Figma", "User Research", "Prototyping"],
    images: [],
    link: "https://www.figma.com/proto/tbqRAYqs7I6ZzwMNQk8Fra/LASTLY?node-id=0-1&p=f&viewport=213%2C257%2C0.04&t=l56uePgmQcLE50Tn-0&scaling=scale-down&content-scaling=fixed&starting-point-node-id=104%3A7&show-proto-sidebar=1",
    linkLabel: "View Figma Prototype",
  },
  cfdna: {
    overview: "Web platform สำหรับ cell-free DNA fragment analysis ให้คณะแพทย์ มช. รวม 2,357 samples จาก 23 disease types อ้างอิงจาก 5 publications ระดับ Nature/PNAS/Cell",
    role: "เตรียมและ clean ข้อมูล DNA, ออกแบบ UI, เขียน frontend ทั้งหมด",
    problem: "นักวิจัยต้องการ platform กลางสำหรับเปรียบเทียบ cfDNA fragment profiles ข้าม disease types แต่ยังไม่มี tool ที่ใช้งานง่าย",
    solution: "สร้างเว็บ Python/Flask รวมข้อมูล dataset หลายแหล่ง พร้อม visualization และ multi-case comparison",
    stack: ["Python", "Flask", "HTML / CSS / JS", "PythonAnywhere"],
    images: [],
    link: "https://iviieww.pythonanywhere.com/home",
    linkLabel: "View Live Site",
  },
  "ai-kids": {
    overview: "ช่องเพลงเด็กที่ผลิตด้วย AI ทั้งกระบวนการ — ตั้งแต่เนื้อเพลง เสียงร้อง ภาพ MV จนถึงการอัปโหลดและดูแลช่อง ทำโดยคนคนเดียว",
    role: "ดูแลทุกขั้นตอนเองทั้งหมด — เขียน prompt, ควบคุม AI tools แต่ละตัว, ตัดต่อ และบริหารจัดการช่อง YouTube",
    problem: "การผลิตเพลงเด็กคุณภาพดีต้องใช้ทีมและต้นทุนสูง — นักแต่งเพลง, นักร้อง, ทีม animation และ production",
    solution: "ออกแบบ AI workflow แบบ end-to-end: เจนเนื้อเพลงด้วย ChatGPT → ให้ Suno ร้อง → เจน concept ภาพ MV ด้วย ChatGPT / Gemini → เอา prompt ไปเจนภาพเคลื่อนไหวด้วย Kling, Hailuo, Vidu และ AI video อื่นๆ → อัปโหลดและดูแลช่องเอง",
    stack: ["ChatGPT", "Gemini", "Suno AI", "Kling", "Hailuo", "Prompt Engineering", "YouTube"],
    images: [],
    link: "https://www.youtube.com/channel/UCAzdtG0CSEdeQagliM6K1wA",
    linkLabel: "View YouTube Channel",
  },
  "face-label": {
    overview: "สร้างและ label dataset ภาพใบหน้าสำหรับ face recognition research — แต่ละภาพถูก annotate ด้วย race, gender, age range พร้อม QC workflow",
    role: "ออกแบบ labeling schema, สร้าง dropdown validation ใน Google Sheets, ทำ QC ทุก batch",
    problem: "งานวิจัยต้องการ dataset ภาพใบหน้าที่มี attribute ครบถ้วนและมีคุณภาพสูง แต่ไม่มี tool annotation ที่ใช้งานง่าย",
    solution: "ใช้ Google Sheets + dropdown validation เป็น annotation tool — ง่าย ไม่ต้อง setup, มี QC column ตรวจสอบทุกแถว",
    stack: ["Google Sheets", "Data Annotation", "QC Workflow"],
    images: [],
    link: "https://docs.google.com/spreadsheets/d/1sHZsyez2q49xVyA8hLA-2EJPlQ84YHlPt3T5da8TFlc/edit?usp=sharing",
    linkLabel: "View Google Sheet",
  },
  "person-reid": {
    overview: "จัด dataset ภาพจากกล้องวงจรปิดหลายหมื่นรูปสำหรับงาน Person Re-identification — แยก folder ตาม person แต่ละคน เพื่อให้ทีมนำไป train กับหลายโมเดล",
    role: "ดู และแยกภาพทีละรูปด้วยตัวเอง — จัดเข้า folder person_1 ถึง person_24 และ junk ตาม identity ของแต่ละคน",
    problem: "ภาพจากกล้องวงจรปิดมีคนหลายคนปะปนกัน และมี false detection จาก model — ต้องแยก identity ให้ถูกต้องก่อนนำไป train",
    solution: "manual review ภาพทีละรูป แยกเข้า folder ตาม person_id พร้อมแยก junk (ภาพที่ใช้ไม่ได้) ออก — dataset ที่ได้นำไปใช้กับ YOLOv8, YOLOv10 และ RetinaNet",
    stack: ["YOLOv8", "YOLOv10", "RetinaNet", "Data Labeling", "Image Curation"],
    images: [],
    link: null,
    linkLabel: null,
  },
};

const SKILLS_GROUPS = [
  { label: "Design", items: ["Figma", "UX Research", "Wireframing", "Prototyping"] },
  { label: "Code", items: ["Python", "SQL", "HTML / CSS", "PHP"] },
  { label: "Data", items: ["Dataset Labeling", "ETL Process", "Data Viz", "Prompt Engineering"] },
];

const EXPERIENCE = [
  {
    role: "University Research Assistant",
    org: "Chiang Mai University",
    period: "Aug 2024 – Present",
    bullets: [
      "Ran code, prepared datasets, and labeled data for research",
      "Built simple web tools for project use",
      "Managed an AI-generated kids' music YouTube channel",
    ],
  },
  {
    role: "Teaching Assistant (TA)",
    org: "Chiang Mai University",
    period: "May 2025 – Sep 2025",
    bullets: [
      "Assisted in teaching Python and basic system design",
      "Helped students debug and understand class materials",
      "Supported instructors with materials and grading",
    ],
  },
];

/* ─── HOOKS ──────────────────────────────────────────────────── */
function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

/* ─── ANIMATION WRAPPER ──────────────────────────────────────── */
function Reveal({ children, delay = 0, y = 24, style = {} }) {
  const [ref, v] = useInView();
  return (
    <div ref={ref} style={{
      opacity: v ? 1 : 0,
      transform: v ? "none" : `translateY(${y}px)`,
      transition: `opacity .65s cubic-bezier(.4,0,.2,1) ${delay}ms, transform .65s cubic-bezier(.4,0,.2,1) ${delay}ms`,
      ...style,
    }}>
      {children}
    </div>
  );
}

/* ─── SECTION LABEL ──────────────────────────────────────────── */
function Label({ children }) {
  return (
    <span style={{
      display: "inline-block",
      fontSize: "10px", fontWeight: 700, letterSpacing: "0.18em",
      textTransform: "uppercase", color: T.blue,
      borderLeft: `2px solid ${T.blue}`, paddingLeft: "10px",
      marginBottom: "20px",
    }}>{children}</span>
  );
}

/* ─── NAV ────────────────────────────────────────────────────── */
function Nav({ scrolled }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = ["About", "Work", "Contact"];

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
      background: scrolled ? "rgba(248,250,252,.94)" : "transparent",
      backdropFilter: scrolled ? "blur(16px)" : "none",
      borderBottom: scrolled ? `1px solid ${T.border}` : "1px solid transparent",
      transition: "all .35s ease",
    }}>
      <div style={{ maxWidth: "1160px", margin: "0 auto", padding: "0 clamp(20px,5vw,48px)", display: "flex", alignItems: "center", justifyContent: "space-between", height: "64px" }}>
        {/* Logo */}
        <a href="#top" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "28px", height: "28px", borderRadius: "7px", background: T.blue, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#fff", fontSize: "11px", fontWeight: 800, letterSpacing: "-0.02em", fontFamily: "'DM Sans', sans-serif" }}>KT</span>
          </div>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "14px", color: T.slate900, letterSpacing: "-0.02em" }}>Kodchapron</span>
        </a>

        {/* Desktop links */}
        <div style={{ display: "flex", gap: "4px", alignItems: "center" }} className="nav-desktop">
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} style={{
              padding: "7px 14px", borderRadius: "8px", fontSize: "13.5px",
              fontWeight: 600, color: T.slate700, textDecoration: "none",
              transition: "all .2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = T.blueLight; e.currentTarget.style.color = T.blue; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = T.slate700; }}
            >{l}</a>
          ))}
          <a href="mailto:kodchapron.tangw@gmail.com" style={{
            marginLeft: "8px", padding: "8px 20px", background: T.blue, color: "#fff",
            borderRadius: "100px", fontSize: "13px", fontWeight: 700, textDecoration: "none",
            boxShadow: `0 2px 12px ${T.blue}44`, transition: "all .2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "#145A8C"; e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = T.blue; e.currentTarget.style.transform = "none"; }}
          >Hire me</a>
        </div>

        {/* Mobile burger */}
        <button onClick={() => setMenuOpen(o => !o)} className="nav-burger" style={{
          display: "none", background: "none", border: `1px solid ${T.border}`,
          borderRadius: "8px", padding: "8px 10px", cursor: "pointer", color: T.slate700,
        }}>
          <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
            {menuOpen
              ? <><path d="M1 1L17 13M17 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></>
              : <><rect y="0" width="18" height="2" rx="1" fill="currentColor"/><rect y="6" width="14" height="2" rx="1" fill="currentColor"/><rect y="12" width="18" height="2" rx="1" fill="currentColor"/></>
            }
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ background: T.white, borderTop: `1px solid ${T.border}`, padding: "12px 24px 20px" }}>
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setMenuOpen(false)} style={{
              display: "block", padding: "12px 0", fontSize: "15px", fontWeight: 600,
              color: T.slate700, textDecoration: "none", borderBottom: `1px solid ${T.border}`,
            }}>{l}</a>
          ))}
          <a href="mailto:kodchapron.tangw@gmail.com" style={{
            display: "inline-block", marginTop: "16px", padding: "10px 28px",
            background: T.blue, color: "#fff", borderRadius: "100px",
            fontSize: "14px", fontWeight: 700, textDecoration: "none",
          }}>Hire me</a>
        </div>
      )}
    </nav>
  );
}

/* ─── HERO ───────────────────────────────────────────────────── */
function Hero() {
  const [word, setWord] = useState(0);
  const words = ["UX Designer", "UI Designer", "Problem Solver", "Data Explorer"];
  useEffect(() => {
    const id = setInterval(() => setWord(w => (w + 1) % words.length), 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="top" style={{ paddingTop: "120px", paddingBottom: "80px", padding: "120px clamp(20px,5vw,48px) 80px", maxWidth: "1160px", margin: "0 auto" }}>
      {/* Available badge */}
      <div style={{ animation: "fadeUp .7s ease both", marginBottom: "32px", display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 14px 6px 8px", background: T.blueGhost, border: `1px solid ${T.borderBlue}`, borderRadius: "100px" }}>
        <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#22C55E", display: "inline-block", animation: "pulse 2s infinite" }}></span>
        <span style={{ fontSize: "12px", fontWeight: 600, color: T.blue, letterSpacing: "0.04em" }}>Open to UX/UI internship & opportunities</span>
      </div>

      {/* Name + Title */}
      <div style={{ animation: "fadeUp .7s ease .08s both" }}>
        <h1 style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "clamp(2.4rem, 6.5vw, 5rem)",
          fontWeight: 800,
          letterSpacing: "-0.04em",
          lineHeight: 1.05,
          color: T.slate900,
          margin: "0 0 18px",
        }}>
          Kodchapron<br />
          <span style={{ color: T.blue }}>Tangwiwattanakul</span>
        </h1>
      </div>

      {/* Animated role */}
      <div style={{ animation: "fadeUp .7s ease .15s both", display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
        <div style={{ width: "32px", height: "1.5px", background: T.blue }}></div>
        <span style={{
          fontSize: "clamp(.95rem, 2.5vw, 1.15rem)",
          fontWeight: 600,
          color: T.slate500,
          letterSpacing: "-0.01em",
          transition: "opacity .4s",
          fontFamily: "'DM Sans', sans-serif",
        }}>{words[word]}</span>
      </div>

      {/* Bio */}
      <div style={{ animation: "fadeUp .7s ease .22s both" }}>
        <p style={{ fontSize: "clamp(.9rem, 2vw, 1.05rem)", color: T.slate500, lineHeight: 1.8, maxWidth: "520px", margin: "0 0 40px" }}>
          นักศึกษา Modern Management and IT, CAMT มช. — ถนัดหลายด้าน ทั้ง UX/UI, Data และ AI Tools ชอบเรียนรู้ด้วยการลงมือทำ และสนุกกับการแก้ปัญหาจริง
        </p>
      </div>

      {/* CTAs */}
      <div style={{ animation: "fadeUp .7s ease .3s both", display: "flex", flexWrap: "wrap", gap: "12px" }}>
        <a href="#work" style={{
          padding: "13px 28px", background: T.blue, color: "#fff",
          borderRadius: "12px", fontWeight: 700, fontSize: "14px", textDecoration: "none",
          boxShadow: `0 4px 20px ${T.blue}38`, display: "inline-flex", alignItems: "center", gap: "6px",
          transition: "all .2s",
        }}
          onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 8px 24px ${T.blue}48`; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = `0 4px 20px ${T.blue}38`; }}
        >
          View My Work
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7H11M7 3L11 7L7 11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </a>
        <a href="https://github.com/kodchapron" target="_blank" rel="noopener noreferrer" style={{
          padding: "13px 24px", background: T.white, color: T.slate700,
          border: `1.5px solid ${T.border}`, borderRadius: "12px",
          fontWeight: 600, fontSize: "14px", textDecoration: "none",
          display: "inline-flex", alignItems: "center", gap: "7px", transition: "all .2s",
        }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = T.blue; e.currentTarget.style.color = T.blue; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.color = T.slate700; }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.54-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.13 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12.01 12.01 0 0 0 24 12C24 5.37 18.63 0 12 0z"/></svg>
          GitHub
        </a>
      </div>

      {/* Stats row */}
      <div style={{ animation: "fadeUp .7s ease .38s both", marginTop: "56px", display: "flex", flexWrap: "wrap", gap: "0", borderTop: `1px solid ${T.border}`, paddingTop: "28px" }}>
        {[["6", "Projects"], ["2", "Roles"], ["CAMT CMU", "Education"]].map(([n, l], i) => (
          <div key={l} style={{ paddingRight: "32px", marginRight: "32px", borderRight: i < 2 ? `1px solid ${T.border}` : "none" }}>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.5rem", fontWeight: 800, color: T.slate900, letterSpacing: "-0.04em" }}>{n}</div>
            <div style={{ fontSize: "12px", color: T.slate300, fontWeight: 600, letterSpacing: "0.04em" }}>{l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}


/* ─── CFDNA PREVIEW ─────────────────────────────────────────── */

/* ─── PROJECT CARD ───────────────────────────────────────────── */
function ProjectCard({ p, i, onOpen }) {
  const [hover, setHover] = useState(false);
  const cs = p.comingSoon;

  const inner = (
    <div
      onMouseEnter={() => !cs && setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: cs ? T.slate50 : hover ? T.blueGhost : T.white,
        border: cs ? `1.5px solid ${T.borderBlue}` : `1.5px solid ${hover ? T.borderBlue : T.border}`,
        borderRadius: "20px",
        padding: "clamp(20px, 3vw, 28px)",
        transition: "all .3s cubic-bezier(.4,0,.2,1)",
        transform: (!cs && hover) ? "translateY(-4px)" : "none",
        boxShadow: hover ? `0 16px 40px ${T.blue}14` : "0 2px 8px rgba(0,0,0,0.04)",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
        cursor: cs ? "default" : "pointer",
      }}
    >
      {/* Number watermark */}
      <div style={{
        position: "absolute", top: "0px", right: "16px",
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "80px", fontWeight: 900,
        color: cs ? T.borderBlue : hover ? T.borderBlue : T.blueLight,
        letterSpacing: "-0.08em", userSelect: "none", lineHeight: 1,
        transition: "color .3s", zIndex: 0,
      }}>{p.num}</div>

      {/* Category pill row */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px", position: "relative", zIndex: 1, flexWrap: "wrap" }}>
        <span style={{
          fontSize: "10px", fontWeight: 800, letterSpacing: "0.14em",
          textTransform: "uppercase", color: T.blue, background: T.blueLight,
          padding: "5px 12px", borderRadius: "100px",
        }}>
          {p.category === "uxui" ? "UX / UI" : p.category === "data" ? "Data Eng" : p.category === "web" ? "Web App" : "Gen AI"}
        </span>
        {cs && (
          <span style={{
            fontSize: "10px", fontWeight: 700, color: T.slate300,
            background: T.slate50, border: `1px solid ${T.border}`,
            padding: "5px 11px", borderRadius: "100px",
            letterSpacing: "0.06em", textTransform: "uppercase", whiteSpace: "nowrap",
          }}>Internal</span>
        )}
      </div>

      {/* Preview mockup for internal projects */}

      <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(1.1rem, 2.5vw, 1.35rem)", fontWeight: 800, color: T.slate900, letterSpacing: "-0.03em", margin: "0 0 4px", position:"relative", zIndex:1 }}>{p.title}</h3>
      <p style={{ fontSize: "13px", color: T.slate300, fontWeight: 600, margin: "0 0 12px" }}>{p.subtitle}</p>
      <p style={{ fontSize: "13.5px", color: T.slate500, lineHeight: 1.75, margin: "0 0 18px", flex: 1 }}>{p.desc}</p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "16px" }}>
        {p.tags.map(tag => (
          <span key={tag} style={{
            fontSize: "11px", fontWeight: 600, color: T.slate500,
            background: T.slate50, border: `1px solid ${T.border}`,
            padding: "4px 10px", borderRadius: "6px",
          }}>{tag}</span>
        ))}
      </div>

      <span style={{ fontSize: "13px", fontWeight: 700, color: cs ? T.slate300 : hover ? T.blue : T.slate300, transition: "color .25s" }}>
        {p.cta}
      </span>
    </div>
  );

  return (
    <Reveal delay={i * 100}>
      <div onClick={() => !cs && onOpen && onOpen(p.slug)} style={{ height: "100%", cursor: cs ? "default" : "pointer" }}>
        {inner}
      </div>
    </Reveal>
  );
}
/* ─── WORK SECTION ───────────────────────────────────────────── */
function Work({ onOpen }) {
  const [filter, setFilter] = useState("all");
  const cats = [["all", "All Work"], ["uxui", "UX / UI"], ["data", "Data"], ["ai", "AI"]];
  const shown = filter === "all" ? PROJECTS : PROJECTS.filter(p => p.category === filter);

  return (
    <section id="work" style={{ background: T.slate50, padding: "clamp(60px,8vw,100px) clamp(20px,5vw,48px)", borderTop: `1px solid ${T.border}` }}>
      <div style={{ maxWidth: "1160px", margin: "0 auto" }}>
        <Reveal>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: "20px", marginBottom: "48px" }}>
            <div>
              <Label>Selected Work</Label>
              <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 800, color: T.slate900, letterSpacing: "-0.04em", margin: 0 }}>Projects</h2>
            </div>
            <div style={{ display: "flex", gap: "4px", background: T.white, border: `1px solid ${T.border}`, borderRadius: "12px", padding: "4px" }}>
              {cats.map(([v, l]) => (
                <button key={v} onClick={() => setFilter(v)} style={{
                  padding: "7px 16px", border: "none", borderRadius: "8px", cursor: "pointer",
                  fontWeight: 700, fontSize: "12px", letterSpacing: "0.02em", transition: "all .2s",
                  background: filter === v ? T.blue : "transparent",
                  color: filter === v ? "#fff" : T.slate500,
                  boxShadow: filter === v ? `0 2px 8px ${T.blue}30` : "none",
                }}>{l}</button>
              ))}
            </div>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: "20px" }}>
          {shown.map((p, i) => <ProjectCard key={p.id} p={p} i={i} onOpen={onOpen} />)}
        </div>
      </div>
    </section>
  );
}

/* ─── ABOUT / SKILLS / EXPERIENCE ───────────────────────────── */
function About() {
  return (
    <section id="about" style={{ padding: "clamp(60px,8vw,100px) clamp(20px,5vw,48px)", maxWidth: "1160px", margin: "0 auto" }}>
      <Reveal>
        <Label>About Me</Label>
        <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(1.8rem,4vw,2.6rem)", fontWeight: 800, color: T.slate900, letterSpacing: "-0.04em", margin: "0 0 56px" }}>
          Experience & Skills
        </h2>
      </Reveal>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,480px),1fr))", gap: "clamp(32px,5vw,72px)" }}>
        {/* Left — Experience timeline */}
        <div>
          <Reveal>
            <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", color: T.slate300, textTransform: "uppercase", marginBottom: "24px" }}>Experience</p>
          </Reveal>
          {EXPERIENCE.map((e, i) => (
            <Reveal key={e.role} delay={i * 80}>
              <div style={{ display: "flex", gap: "20px", marginBottom: i < EXPERIENCE.length - 1 ? "36px" : 0 }}>
                {/* Timeline dot + line */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "4px" }}>
                  <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: T.blue, border: `2px solid ${T.blueLight}`, flexShrink: 0 }}></div>
                  {i < EXPERIENCE.length - 1 && <div style={{ width: "1.5px", flex: 1, background: T.border, marginTop: "8px" }}></div>}
                </div>
                <div style={{ paddingBottom: "8px" }}>
                  <h4 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "15px", fontWeight: 700, color: T.slate900, margin: "0 0 3px", letterSpacing: "-0.01em" }}>{e.role}</h4>
                  <p style={{ fontSize: "12px", color: T.blue, fontWeight: 600, margin: "0 0 12px", display: "flex", gap: "8px", alignItems: "center" }}>
                    {e.org}
                    <span style={{ color: T.slate300, fontWeight: 400 }}>·</span>
                    {e.period}
                  </p>
                  <ul style={{ margin: 0, padding: "0 0 0 16px", display: "flex", flexDirection: "column", gap: "5px" }}>
                    {e.bullets.map(b => <li key={b} style={{ fontSize: "13.5px", color: T.slate500, lineHeight: 1.65 }}>{b}</li>)}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}

          {/* Education card */}
          <Reveal delay={160}>
            <div style={{ marginTop: "36px", background: T.blueGhost, border: `1px solid ${T.borderBlue}`, borderRadius: "16px", padding: "20px 24px", display: "flex", gap: "16px", alignItems: "flex-start" }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: T.blue, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 1.66 2.69 3 6 3s6-1.34 6-3v-5"/></svg>
              </div>
              <div>
                <p style={{ margin: "0 0 3px", fontWeight: 700, fontSize: "14px", color: T.slate900 }}>College of Arts, Media and Technology</p>
                <p style={{ margin: "0 0 2px", fontSize: "13px", color: T.blue, fontWeight: 600 }}>Chiang Mai University</p>
                <p style={{ margin: 0, fontSize: "12px", color: T.slate300 }}>Bachelor's Degree · 2023 – Present</p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right — Skills + Quote */}
        <div>
          <Reveal>
            <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", color: T.slate300, textTransform: "uppercase", marginBottom: "24px" }}>Skills</p>
          </Reveal>
          {SKILLS_GROUPS.map((g, gi) => (
            <Reveal key={g.label} delay={gi * 80}>
              <div style={{ marginBottom: "24px" }}>
                <p style={{ fontSize: "11px", fontWeight: 700, color: T.slate300, margin: "0 0 10px", letterSpacing: "0.06em" }}>{g.label.toUpperCase()}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
                  {g.items.map(s => (
                    <span key={s} style={{
                      padding: "7px 14px", fontSize: "12.5px", fontWeight: 600,
                      color: T.slate700, background: T.white,
                      border: `1.5px solid ${T.border}`, borderRadius: "9px",
                      transition: "all .2s", cursor: "default",
                    }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = T.blue; e.currentTarget.style.color = T.blue; e.currentTarget.style.background = T.blueGhost; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.color = T.slate700; e.currentTarget.style.background = T.white; }}
                    >{s}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}

          {/* Languages */}
          <Reveal delay={240}>
            <div style={{ marginTop: "8px", display: "flex", gap: "10px" }}>
              {[["TH", "Thai", "Native"], ["EN", "English", "Intermediate"]].map(([code, lang, lvl]) => (
                <div key={lang} style={{ flex: 1, background: T.white, border: `1.5px solid ${T.border}`, borderRadius: "12px", padding: "14px 16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                    <span style={{ fontSize: "10px", fontWeight: 800, color: T.blue, background: T.blueLight, padding: "3px 7px", borderRadius: "5px" }}>{code}</span>
                    <span style={{ fontSize: "14px", fontWeight: 700, color: T.slate900 }}>{lang}</span>
                  </div>
                  <p style={{ margin: 0, fontSize: "11px", color: T.slate300, fontWeight: 600 }}>{lvl}</p>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Quote */}
          <Reveal delay={300}>
            <blockquote style={{
              marginTop: "20px", marginLeft: 0, marginRight: 0,
              padding: "20px 24px", borderLeft: `3px solid ${T.blue}`,
              background: T.blueGhost, borderRadius: "0 12px 12px 0",
            }}>
              <p style={{ margin: 0, fontSize: "13.5px", color: T.slate700, lineHeight: 1.75, fontStyle: "italic" }}>
                "เป็นคนชอบลองของใหม่ เรียนรู้เร็วด้วยการลงมือทำจริง — ทำได้หลายอย่าง และมีความสุขที่สุดตอนออกแบบ prototype ใน Figma"
              </p>
            </blockquote>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─── CONTACT ────────────────────────────────────────────────── */
function Contact() {
  return (
    <section id="contact" style={{ background: T.slate900, padding: "clamp(60px,8vw,100px) clamp(20px,5vw,48px)" }}>
      <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
        <Reveal>
          <span style={{ display: "inline-block", fontSize: "10px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: T.blueMid, borderLeft: `2px solid ${T.blueMid}`, paddingLeft: "10px", marginBottom: "24px" }}>Get In Touch</span>
          <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(2rem,5vw,3.2rem)", fontWeight: 800, color: T.white, letterSpacing: "-0.04em", lineHeight: 1.1, margin: "0 0 20px" }}>
            Let's build something<br />
            <span style={{ color: T.blueMid }}>together.</span>
          </h2>
          <p style={{ fontSize: "15px", color: "#94A3B8", lineHeight: 1.75, margin: "0 0 40px" }}>
            นักศึกษาสาย Modern Management & IT ที่หลงรัก UX/UI<br />เปิดรับโอกาส internship ด้าน UX/UI Design ติดต่อได้เลย ✉️
          </p>

          <a href="mailto:kodchapron.tangw@gmail.com" style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "15px 36px", background: T.blue, color: "#fff",
            borderRadius: "14px", fontWeight: 700, fontSize: "15px",
            textDecoration: "none", boxShadow: `0 4px 24px ${T.blue}60`,
            transition: "all .2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 10px 32px ${T.blue}70`; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = `0 4px 24px ${T.blue}60`; }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            kodchapron.tangw@gmail.com
          </a>

          <div style={{ marginTop: "48px", paddingTop: "32px", borderTop: "1px solid #1E293B", display: "flex", justifyContent: "center", gap: "32px", flexWrap: "wrap" }}>
            {[
              { label: "GitHub", href: "https://github.com/kodchapron" },
              { label: "Email", href: "mailto:kodchapron.tangw@gmail.com" },
            ].map(l => (
              <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" style={{ fontSize: "13px", fontWeight: 600, color: "#64748B", textDecoration: "none", transition: "color .2s" }}
                onMouseEnter={e => e.currentTarget.style.color = T.blueMid}
                onMouseLeave={e => e.currentTarget.style.color = "#64748B"}
              >{l.label}</a>
            ))}
          </div>

          <p style={{ marginTop: "24px", fontSize: "12px", color: "#334155" }}>© 2025 Kodchapron Tangwiwattanakul · Chiang Mai, Thailand</p>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── SLIDE PANEL ───────────────────────────────────────────── */
function SlidePanel({ slug, onClose }) {
  const project = PROJECTS.find(p => p.slug === slug);
  const details = PROJECT_DETAILS[slug];
  const [visible, setVisible] = useState(false);
  const [imgIdx, setImgIdx] = useState(0);

  useEffect(() => {
    if (slug) {
      setImgIdx(0);
      requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
      document.body.style.overflow = "hidden";
    } else {
      setVisible(false);
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [slug]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 320);
  };

  if (!slug) return null;
  const imgs = details?.images || [];

  return (
    <>
      <div onClick={handleClose} style={{
        position:"fixed",inset:0,zIndex:300,
        background:"rgba(15,25,35,0.45)",backdropFilter:"blur(4px)",
        opacity:visible?1:0,transition:"opacity .32s ease",
      }}/>
      <div style={{
        position:"fixed",top:0,right:0,bottom:0,zIndex:301,
        width:"min(640px,100vw)",background:T.white,
        boxShadow:"-8px 0 48px rgba(0,0,0,0.12)",
        transform:visible?"translateX(0)":"translateX(100%)",
        transition:"transform .32s cubic-bezier(.4,0,.2,1)",
        display:"flex",flexDirection:"column",overflowY:"auto",
      }}>
        {/* Header */}
        <div style={{
          position:"sticky",top:0,zIndex:10,
          background:"rgba(255,255,255,.95)",backdropFilter:"blur(12px)",
          borderBottom:`1px solid ${T.border}`,
          padding:"0 clamp(20px,4vw,36px)",
          height:"60px",display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0,
        }}>
          <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
            <span style={{fontSize:"10px",fontWeight:800,letterSpacing:"0.14em",textTransform:"uppercase",color:T.blue,background:T.blueLight,padding:"4px 10px",borderRadius:"100px"}}>
              {project?.category==="uxui"?"UX / UI":project?.category==="data"?"Data Eng":"Gen AI"}
            </span>
            <span style={{fontSize:"13px",fontWeight:700,color:T.slate900}}>{project?.title}</span>
          </div>
          <button onClick={handleClose} style={{
            width:"32px",height:"32px",borderRadius:"50%",
            background:T.slate100,border:"none",cursor:"pointer",
            display:"flex",alignItems:"center",justifyContent:"center",
            color:T.slate500,transition:"all .2s",
          }}
            onMouseEnter={e=>{e.currentTarget.style.background=T.slate900;e.currentTarget.style.color="#fff";}}
            onMouseLeave={e=>{e.currentTarget.style.background=T.slate100;e.currentTarget.style.color=T.slate500;}}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 2L12 12M12 2L2 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>
        </div>

        {/* Body */}
        <div style={{padding:"clamp(20px,4vw,36px)",display:"flex",flexDirection:"column",gap:"20px"}}>
          {/* Title */}
          <div>
            <h2 style={{fontFamily:"'DM Sans',sans-serif",fontSize:"clamp(1.5rem,4vw,2rem)",fontWeight:800,color:T.slate900,letterSpacing:"-0.04em",margin:"0 0 4px"}}>{project?.title}</h2>
            <p style={{fontSize:"13px",color:T.slate300,fontWeight:600,margin:"0 0 14px"}}>{project?.subtitle}</p>
            <div style={{display:"flex",flexWrap:"wrap",gap:"6px"}}>
              {project?.tags.map(t=>(
                <span key={t} style={{fontSize:"11px",fontWeight:600,color:T.slate500,background:T.slate50,border:`1px solid ${T.border}`,padding:"4px 10px",borderRadius:"6px"}}>{t}</span>
              ))}
            </div>
          </div>

          {/* Screenshots */}
          {imgs.length>0&&(
            <div>
              <img src={imgs[imgIdx]} alt={`screenshot ${imgIdx+1}`} style={{width:"100%",borderRadius:"12px",border:`1px solid ${T.border}`,objectFit:"cover",display:"block"}}/>
              {imgs.length>1&&(
                <div style={{display:"flex",gap:"8px",marginTop:"10px"}}>
                  {imgs.map((src,i)=>(
                    <button key={i} onClick={()=>setImgIdx(i)} style={{
                      flex:1,height:"52px",borderRadius:"8px",overflow:"hidden",
                      border:`2px solid ${imgIdx===i?T.blue:T.border}`,
                      cursor:"pointer",padding:0,background:"none",transition:"border-color .2s",
                    }}>
                      <img src={src} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {details&&(
            <>
              <div style={{background:T.blueGhost,border:`1.5px solid ${T.borderBlue}`,borderRadius:"14px",padding:"20px"}}>
                <p style={{fontSize:"10px",fontWeight:800,letterSpacing:"0.14em",color:T.blue,textTransform:"uppercase",marginBottom:"8px"}}>Overview</p>
                <p style={{fontSize:"14px",color:T.slate700,lineHeight:1.8,margin:0}}>{details.overview}</p>
              </div>
              <div style={{background:T.white,border:`1.5px solid ${T.border}`,borderRadius:"14px",padding:"20px"}}>
                <p style={{fontSize:"10px",fontWeight:800,letterSpacing:"0.14em",color:T.blue,textTransform:"uppercase",marginBottom:"8px"}}>My Role</p>
                <p style={{fontSize:"14px",color:T.slate700,lineHeight:1.8,margin:0}}>{details.role}</p>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:"12px"}}>
                <div style={{background:"#fffbeb",border:"1.5px solid #fde68a",borderRadius:"14px",padding:"20px"}}>
                  <p style={{fontSize:"10px",fontWeight:800,letterSpacing:"0.14em",color:"#b45309",textTransform:"uppercase",marginBottom:"8px"}}>Problem</p>
                  <p style={{fontSize:"13.5px",color:T.slate700,lineHeight:1.8,margin:0}}>{details.problem}</p>
                </div>
                <div style={{background:"#f0fdf4",border:"1.5px solid #bbf7d0",borderRadius:"14px",padding:"20px"}}>
                  <p style={{fontSize:"10px",fontWeight:800,letterSpacing:"0.14em",color:"#15803d",textTransform:"uppercase",marginBottom:"8px"}}>Solution</p>
                  <p style={{fontSize:"13.5px",color:T.slate700,lineHeight:1.8,margin:0}}>{details.solution}</p>
                </div>
              </div>
              <div style={{background:T.white,border:`1.5px solid ${T.border}`,borderRadius:"14px",padding:"20px"}}>
                <p style={{fontSize:"10px",fontWeight:800,letterSpacing:"0.14em",color:T.blue,textTransform:"uppercase",marginBottom:"12px"}}>Tech Stack</p>
                <div style={{display:"flex",flexWrap:"wrap",gap:"7px",marginBottom:details.link?"20px":0}}>
                  {details.stack.map(s=>(
                    <span key={s} style={{fontSize:"12px",fontWeight:700,color:T.blue,background:T.blueLight,padding:"5px 12px",borderRadius:"8px"}}>{s}</span>
                  ))}
                </div>
                {details.link&&(
                  <a href={details.link} target="_blank" rel="noopener noreferrer" style={{
                    display:"inline-flex",alignItems:"center",gap:"7px",
                    padding:"11px 22px",background:T.blue,color:"#fff",
                    borderRadius:"10px",fontWeight:700,fontSize:"14px",
                    textDecoration:"none",boxShadow:`0 4px 16px ${T.blue}38`,transition:"all .2s",
                  }}
                    onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";}}
                    onMouseLeave={e=>{e.currentTarget.style.transform="none";}}
                  >
                    {details.linkLabel}
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2 11L11 2M11 2H5M11 2V8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </a>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

/* ─── ROOT APP ───────────────────────────────────────────────── */
export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSlug, setActiveSlug] = useState(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 64);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const fn = (e) => { if (e.key === "Escape") setActiveSlug(null); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #F8FAFC; font-family: 'DM Sans', system-ui, sans-serif; -webkit-font-smoothing: antialiased; }
        ::selection { background: #BFDBEE; color: #1B6CA8; }
        @keyframes fadeUp  { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:none; } }
        @keyframes pulse   { 0%,100% { opacity:1; } 50% { opacity:.35; } }
        @media (max-width: 680px) {
          .nav-desktop { display: none !important; }
          .nav-burger  { display: flex !important; }
        }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 3px; }
      `}</style>
      <Nav scrolled={scrolled} />
      <main>
        <Hero />
        <Work onOpen={setActiveSlug} />
        <About />
        <Contact />
      </main>
      <SlidePanel slug={activeSlug} onClose={() => setActiveSlug(null)} />
    </>
  );
}