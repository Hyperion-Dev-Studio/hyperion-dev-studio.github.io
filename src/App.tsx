import { motion } from "framer-motion";
import { useState } from "react";
import type { ReactNode, MouseEventHandler } from "react";
import {
  ArrowRight,
  Mail,
  Github,
  Settings,
  GraduationCap,
  BarChart2,
  Trophy,
} from "lucide-react";
import logo from "./assets/Hyperion Dev Studio.png";

// ----------------------------
// UI primitives
// ----------------------------
type ButtonVariant = "solid" | "secondary";
type ButtonSize = "sm" | "md" | "lg";
interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  type?: "button" | "submit" | "reset";
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  className?: string;
}
function Button({ children, variant = "solid", size = "md", href, type, onClick, className = "" }: ButtonProps) {
  const Comp = (href ? "a" : "button") as any;
  return (
    <Comp href={href} type={type} onClick={onClick} className={`btn btn-${variant} btn-${size} ${className}`}>
      {children}
    </Comp>
  );
}


interface CardProps { children: ReactNode; className?: string }
function Card({ children, className = "" }: CardProps) { return <div className={`card ${className}`}>{children}</div>; }
interface SimpleProps { children: ReactNode; className?: string }
function CardHeader({ children, className = "" }: SimpleProps) { return <div className={`card-header ${className}`}>{children}</div>; }
function CardTitle({ children, className = "" }: SimpleProps) { return <div className={`card-title ${className}`}>{children}</div>; }
function CardDescription({ children, className = "" }: SimpleProps) { return <div className={`card-description ${className}`}>{children}</div>; }
function CardContent({ children, className = "" }: SimpleProps) { return <div className={`card-content ${className}`}>{children}</div>; }

interface BadgeProps { children: ReactNode; variant?: "primary" | "secondary"; className?: string }
function Badge({ children, variant = "primary", className = "" }: BadgeProps) {
  return <span className={`badge badge-${variant} ${className}`}>{children}</span>;
}

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & { className?: string };
function Input(props: InputProps) { return <input {...props} className={`input ${props.className || ""}`} />; }

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & { className?: string };
function Textarea(props: TextareaProps) { return <textarea {...props} className={`textarea ${props.className || ""}`} />; }

// ----------------------------
// Phone mock — matches your screenshot
// ----------------------------
function PhoneMock() {
  return (
    <div className="phone-wrap">
      <div className="phone-body">
        <div className="phone-notch" />
        <div className="appbar">
          <div className="title" title="CertQuiz – CPIM & CSCP Practice">CertQuiz – CPIM & CSCP Prac…</div>
          <button className="icon-btn" aria-label="settings"><Settings size={18} /></button>
        </div>
        <div className="hearts" aria-label="lives">
          <span className="heart full">♥</span>
          <span className="heart full">♥</span>
          <span className="heart full">♥</span>
          <span className="heart full">♥</span>
          <span className="heart empty">♡</span>
        </div>
        <div className="pill-list">
          {['CPIM Training','CSCP Training','CSCT Training','CLTD Training'].map((label) => (
            <button key={label} className="pill-btn">{label}</button>
          ))}
        </div>
        <div className="ad-banner">
          <div className="ad-label">Test Ad</div>
          <div className="ad-body">This is a 468x60 test ad.</div>
          <div className="ad-dot" aria-hidden />
        </div>
        <nav className="tabbar" aria-label="bottom navigation">
          <a className="tab-item active">
            <GraduationCap size={18} />
            <span>Training</span>
          </a>
          <a className="tab-item">
            <BarChart2 size={18} />
            <span>Progress</span>
          </a>
          <a className="tab-item">
            <Trophy size={18} />
            <span>Achievements</span>
          </a>
        </nav>
      </div>
    </div>
  );
}

// ----------------------------
// Data
// ----------------------------
const nav: { label: string; href: string }[] = [
  { label: "Home", href: "#home" },
  { label: "Our Apps", href: "#apps" },
  { label: "Contact", href: "#contact" },
];

const stacks: string[] = [
  "React Native",
  "Swift",
  "Kotlin",
  "TypeScript",
  "GraphQL",
  "Firebase",
  "Supabase",
  "AWS",
  "Vercel",
];

// ----------------------------
// Page
// ----------------------------
export default function HyperionDevStudio() {
  const [showBeta, setShowBeta] = useState(false);
  return (
    <div className="site" id="home">
      <StyleTag />
      {/* Navbar */}
      <header className="nav">
        <div className="container nav-inner">
          <a href="#home" className="brand">
            <img src={logo} alt="Hyperion Dev Studio" className="brand-logo" />
            <span className="brand-text">Hyperion <span className="muted">Dev Studio</span></span>
          </a>
          <nav className="nav-links">
            {nav.map((n: { label: string; href: string }) => (
              <a key={n.label} href={n.href} className="nav-link">{n.label}</a>
            ))}
          </nav>
          <div className="nav-cta">
            <Button href="#contact" className="rounded-xl">Get in touch</Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="section">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Badge>Building premium mobile experiences</Badge>
            <h1 className="h1">Modern apps. <span className="grad-text">Elegant experiences.</span></h1>
            <p className="lead">Hyperion Dev Studio crafts polished, performant mobile applications for teams who care about detail.</p>
            <div className="btn-row">
              <Button href="#contact" size="lg" className="rounded-xl">
                <span className="icon-gap">Start a project <ArrowRight size={16} /></span>
              </Button>
              <Button href="#apps" variant="secondary" size="lg" className="rounded-xl">See our apps</Button>
            </div>
            <div className="chip-row">
              {stacks.map((s: string) => (
                <div key={s} className="chip">{s}</div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Apps */}
      <section id="apps" className="section">
        <div className="container fullwidth">
          <div className="grid-2 v-center gap-lg">
            <div>
              <Badge>Flagship App</Badge>
              <h2 className="h2 mt">Logiquiz — logic that plays beautifully</h2>
              <p className="muted-p">
                LogiQuiz helps you prepare for your APICS CPIM and CSCP certifications with stimulating, exam-style quizzes.
                Designed for supply chain professionals and students, LogiQuiz streamlines your learning through thematic
                exercises and instant feedback.
              </p>
              <ul className="checklist">
                {[
                  "Thematic exercises: CPIM Parts 1 & 2, CSCP Modules 1–3",
                  "Instant feedback and detailed explanations",
                  "Track your scores and quiz history",
                  "Works offline — no internet connection required",
                  "Distraction-free interface",
                ].map((li, i) => (
                  <li key={i}>• {li}</li>
                ))}
              </ul>
              <p className="muted-p">
                Whether you’re preparing for your first certification or refreshing your knowledge, LogiQuiz makes supply chain
                exam prep simple and effective.
              </p>
              <p className="muted-p">
                Download it now and master APICS exam content — anytime, anywhere.
              </p>
              <div className="btn-row">
                <Button className="rounded-xl" onClick={() => setShowBeta(true)}>Join the Beta</Button>
                <Button variant="secondary" href="#contact" className="rounded-xl">Partner with us</Button>
                <Badge variant="secondary">Android • Tablet</Badge>
              </div>
            </div>
            <div className="center">
              <PhoneMock />
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="section">
        <div className="container grid-2 v-center gap-lg">
          <div>
            <Badge>Under development</Badge>
            <h2 className="h2 mt">Citoyenneté France — Quiz & Test</h2>
            <p className="muted-p">Préparez l'épreuve de citoyenneté française avec des quiz modernes, des explications claires et des séries thématiques.</p>
            <ul className="checklist">
              {[
                "Entraînements chronométrés et mode révision",
                "Statistiques de progression et séries ciblées",
                "Interface claire et accessible",
              ].map((li, i) => (
                <li key={i}>• {li}</li>
              ))}
            </ul>
            <div className="btn-row">
              <Badge variant="secondary">Android • Tablet</Badge>
            </div>
          </div>
          <div className="center">
            <div className="placeholder-shot">Preview coming soon</div>
          </div>
        </div>
      </section>

      <section id="contact" className="section">
        <div className="container fullwidth">
          <div className="grid-2 gap-lg">
            <div>
              <h2 className="h2">Let’s build something exceptional</h2>
              <p className="muted-p">Tell us about your product, timeline, and budget. We’ll get back within one business day.</p>
              <div className="contact-list">
                <div className="contact-item"><Mail size={16} /> hyperion.dev.studio@gmail.com</div>
                <div className="contact-item"><Github size={16} /> <a href="https://github.com/Hyperion-Dev-Studio" target="_blank" rel="noreferrer">github.com/Hyperion-Dev-Studio</a></div>
              </div>
            </div>
            <Card>
              <CardHeader>
                <CardTitle className="card-title-text">Project inquiry</CardTitle>
                <CardDescription>Give us a few details and we’ll follow up with a short plan and estimate.</CardDescription>
              </CardHeader>
              <CardContent>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const f = e.currentTarget.elements as any;
                    const name = f.namedItem("name").value;
                    const email = f.namedItem("email").value;
                    const message = f.namedItem("message").value;
                    const body = encodeURIComponent(`New project inquiry\nName: ${name}\nEmail: ${email}\nMessage: ${message}`);
                    window.location.href = `mailto:hyperion.dev.studio@gmail.com?subject=Project%20Inquiry&body=${body}`;
                  }}
                  className="form-col"
                >
                  <Input name="name" placeholder="Your name" required />
                  <Input name="email" type="email" placeholder="Email" required />
                  <Textarea name="message" placeholder="What are you building?" required />
                  <Button type="submit" className="rounded-xl icon-gap">Send inquiry</Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-inner">
          <div className="brand">
            <img src={logo} alt="Hyperion Dev Studio" className="brand-logo" />
            <span className="brand-text">Hyperion Dev Studio</span>
          </div>
          <p className="copyright">© {new Date().getFullYear()} Hyperion Dev Studio. All rights reserved.</p>
          <div className="footer-links">
            <a href="#apps">Our Apps</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </footer>

      {showBeta && (
        <div className="modal-overlay" role="dialog" aria-modal="true" onClick={() => setShowBeta(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3 className="modal-title">Join the Beta</h3>
            <p className="modal-sub">Choose where you want to join:</p>
            <div className="modal-actions">
              <a className="btn btn-lg" href="https://groups.google.com/g/hyperion-logiquiz-beta" target="_blank" rel="noreferrer">Google Groups</a>
              <a className="btn btn-secondary btn-lg" href="https://play.google.com/store/apps/details?id=com.hyperion.logiquiz" target="_blank" rel="noreferrer">Google Play</a>
            </div>
            <button className="modal-close" onClick={() => setShowBeta(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ----------------------------
// Styles adjustments
// ----------------------------
function StyleTag() {
  const css = `
/* ====== Tokens ====== */
:root{
  --main:#3080E5;
  --main-2:#1e5fb4;
  --text:#0f172a;
  --muted:#475569;
  --bg-edge:#E7EEF9;                 /* solid edge color to kill right strip */
  --glass: rgba(255,255,255,0.6);
  --border-soft: rgba(0,0,0,.06);
  --shadow: 0 10px 30px rgba(0,0,0,0.12);
  --radius: 16px;
  --gutter: clamp(16px, 5vw, 56px);  /* responsive side padding */
  --sectionY: clamp(72px, 12vh, 128px);
}

/* ====== Base & overflow fixes ====== */
*{ box-sizing:border-box }
html, body, #root, .site{ width:100% }
html, body, .site{ overflow-x: clip }     /* prevent 1–2px horizontal spill */
body{
  margin:0;
  font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial;
  background-color: var(--bg-edge);       /* matches gradient tail */
  color: var(--text);
}
.site{
  min-height:100%;
  background-color: var(--bg-edge);
  /* Gradients fade into the SAME solid color, not transparent */
  background-image:
    radial-gradient(60% 60% at 70% 10%, rgba(48,128,229,0.16) 0%, var(--bg-edge) 75%),
    radial-gradient(40% 40% at 0% 90%,  rgba(48,128,229,0.12) 0%, var(--bg-edge) 80%);
  background-repeat:no-repeat;
  background-size: cover;
  /* Chrome zoom-edge safety */
  border-right: 0.01px solid transparent;
}

/* ====== Full-width sections, centered content with gutters ====== */
.container,
.nav-inner,
.footer-inner{
  width: 100%;
  max-width: 1400px;                  /* cap content, not the section bg */
  padding-inline: var(--gutter);
  margin-inline: auto;
}
.section{
  padding-block: var(--sectionY);
  position: relative;
}
.section + .section{
  border-top: 1px solid rgba(0,0,0,.04); /* visual separation */
}

/* ====== Navbar ====== */
.nav{
  position:sticky; top:0; z-index:50;
  background: rgba(255,255,255,0.3); backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0,0,0,.08);
}
.nav-inner{ height:64px; display:flex; align-items:center; justify-content:space-between }
.brand{ display:flex; align-items:center; gap:.5rem; text-decoration:none; color:inherit }
.brand-logo{ width:36px; height:36px; border-radius:14px; object-fit:cover; box-shadow: var(--shadow); background:#fff }
.brand-text{ font-weight:700; letter-spacing:.2px }
.muted{ color:#64748b }
.nav-links{ display:none; gap:1.25rem }
.nav-link{ font-size:.9rem; color: rgba(15,23,42,.8); text-decoration:none }
.nav-link:hover{ color:#0f172a }
.nav-cta{ display:flex; gap:.6rem }
@media (min-width:768px){ .nav-links{ display:flex } }

/* ====== Buttons & badges ====== */
.btn{
  border:none; border-radius:12px; padding:.6rem 1rem; font-weight:600; cursor:pointer; text-decoration:none;
  display:inline-flex; align-items:center; justify-content:center;
  background:linear-gradient(135deg,var(--main),var(--main-2)); color:#fff; box-shadow: var(--shadow);
}
.btn-secondary{ background:#fff; color:#111; border:1px solid var(--border-soft) }
.btn-sm{ padding:.4rem .7rem; font-size:.85rem }
.btn-lg{ padding:.8rem 1.2rem; font-size:1rem }
.icon-gap{ display:inline-flex; align-items:center; gap:.5rem }
.badge{
  display:inline-flex; align-items:center; padding:.35rem .7rem; border-radius:999px; font-size:.8rem; font-weight:700;
  background: linear-gradient(90deg, var(--main), var(--main-2)); color:#fff;
}
.badge-secondary{ background:rgba(255,255,255,.85); color:#111; border:1px solid var(--border-soft) }

/* ====== Typography ====== */
.h1{ font-size: clamp(2.2rem, 4vw, 3.5rem); line-height:1.1; margin:.3rem 0 0 }
.h2{ font-size: clamp(1.6rem, 2.5vw, 2.2rem); margin:0 }
.lead{ margin-top:1rem; max-width:46ch; color:#334155 }
.muted-p{ margin-top:.5rem; max-width:60ch; color: var(--muted) }
.grad-text{ background:linear-gradient(90deg,var(--main),var(--main-2)); -webkit-background-clip:text; background-clip:text; color:transparent }

/* ====== Helpers ====== */
.chip-row{ display:flex; flex-wrap:wrap; gap:.5rem; margin-top:1.2rem }
.chip{ border:1px solid var(--border-soft); background:#fff; padding:.35rem .8rem; border-radius:999px; font-size:.8rem }
.grid-2{ display:grid; gap:2rem }
@media (min-width:1024px){ .grid-2{ grid-template-columns: 1fr 1fr } }
.v-center{ align-items:center }
.gap-lg{ gap:2.5rem }
.center{ display:grid; place-items:center }
.placeholder-shot{
  width:100%; max-width:320px; height:560px; border-radius:24px; border:1px dashed rgba(0,0,0,.2);
  display:grid; place-items:center; color:#64748b; background:rgba(255,255,255,.6);
}

/* ====== Cards & forms ====== */
.card{ border:1px solid rgba(255,255,255,.3); background: var(--glass); backdrop-filter: blur(6px);
  border-radius: var(--radius); box-shadow: var(--shadow) }
.card-header{ padding:1.1rem 1.1rem 1rem }
.card-title{ font-weight:700 }
.card-description{ color: var(--muted); margin-top:.35rem }
.card-content{ padding: 0 1.1rem 1.1rem }
.form-col{ display:grid; gap:.6rem }
.input,.textarea{ width:100%; border:1px solid var(--border-soft); background:#fff; border-radius:12px; padding:.7rem .9rem; font-size:.95rem }
.textarea{ min-height:120px; resize:vertical }

/* ====== Phone mock ====== */
.phone-wrap{
  max-width:320px; width:100%; aspect-ratio:9/19.5; border-radius:36px; border:1px solid rgba(255,255,255,0.2);
  padding:12px; background: linear-gradient(180deg,rgba(255,255,255,.6),rgba(255,255,255,.1));
  box-shadow: 0 10px 30px rgba(0,0,0,.2); backdrop-filter: blur(8px);
}
.phone-body{
  position:relative; height:100%; border-radius:28px; overflow:hidden;
  background: linear-gradient(180deg, rgba(55,90,110,.85), rgba(55,90,110,.65)); box-shadow: inset 0 0 0 1px rgba(255,255,255,.06);
}
.phone-notch{ width:96px; height:24px; border-radius:999px; background: rgba(255,255,255,.08); margin:12px auto 8px }
.appbar{ height:44px; display:flex; align-items:center; justify-content:space-between; padding: 0 14px; color:#e8eef2 }
.title{ font-size:16px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:80% }
.icon-btn{ background:transparent; border:0; color:inherit; display:inline-flex; align-items:center; justify-content:center }
.hearts{ display:flex; justify-content:center; gap:8px; margin:28px 0 16px }
.heart{ font-size:28px; line-height:1 }
.heart.full{ color:#ff4d4d } .heart.empty{ color:#ff4d4d; opacity:.6 }
.pill-list{ display:grid; gap:16px; padding:0 16px }
.pill-btn{ width:100%; padding:16px 22px; border-radius:999px; border:0; background:#0b0b0b; color:#8fb4c3; box-shadow: 0 8px 22px rgba(0,0,0,.35); font-size:16px; font-weight:600; text-align:center }
.pill-btn:active{ transform: translateY(1px) }
.ad-banner{ position:absolute; left:16px; right:16px; bottom:72px; background:#fff; color:#222; border-radius:10px; box-shadow: 0 8px 22px rgba(0,0,0,.35);
  padding:10px 14px; display:flex; align-items:center; gap:10px }
.ad-label{ position:absolute; top:-14px; left:50%; transform:translateX(-50%); background:#333; color:#fff; border-radius:6px; padding:2px 8px; font-size:12px }
.ad-body{ flex:1; font-size:14px }
.ad-dot{ width:16px; height:16px; border-radius:50%; background: linear-gradient(135deg, var(--main), var(--main-2)) }
.tabbar{ position:absolute; left:0; right:0; bottom:0; height:64px; background: rgba(0,0,0,.55); backdrop-filter: blur(6px);
  display:flex; align-items:center; justify-content:space-around; padding:6px 18px; color:#9fb7c4; border-top-left-radius:24px; border-top-right-radius:24px }
.tab-item{ display:flex; flex-direction:column; align-items:center; gap:6px; font-size:12px; text-decoration:none; color:inherit; opacity:.7 }
.tab-item.active{ opacity:1 }

/* ====== Modal ====== */
.modal-overlay{ position:fixed; inset:0; background:rgba(0,0,0,.45); display:grid; place-items:center; z-index:100 }
.modal{ background:#fff; border-radius:16px; box-shadow: var(--shadow); padding:24px; max-width:520px; width:min(92vw,520px) }
.modal-title{ margin:0 0 6px; font-size:1.25rem; font-weight:700 }
.modal-sub{ margin:0 0 16px; color:#475569 }
.modal-actions{ display:flex; gap:.6rem; flex-wrap:wrap }
.modal-close{ margin-top:14px; background:transparent; border:0; color:#0f172a; opacity:.7; cursor:pointer }

/* ====== Footer ====== */
.footer{ border-top:1px solid rgba(0,0,0,.08); padding:2rem 0 }
.footer-inner{ display:flex; flex-direction:column; align-items:center; gap:1rem }
.footer-links{ display:flex; gap:1rem }
.footer a{ text-decoration:none; color:inherit }
.footer a:hover{ text-decoration:underline }
@media (min-width:768px){ .footer-inner{ flex-direction:row; justify-content:space-between } }
  `;
  return <style>{css}</style>;
}
