import React, { useEffect, useState } from "react";
import {
  ArrowRight, Download, Moon, Sun, Palette, FileText,
  Shield, Zap
} from "lucide-react";

/* -------------------- CONFIG -------------------- */
const FORM_ENDPOINT = "https://formspree.io/f/xnnzyvev";
const FOREST_HEX = "#3c5531";

/* Update this to your exact asset URL from the GitHub release */
const LINUX_DOWNLOAD =
  "https://github.com/AlfredXavier17/moonreader/releases/download/v1.0.0/EclipsePDF-1.0.0-linux-x86_64.AppImage";

/* -------------------- Tiny hash router -------------------- */
function useHashRoute() {
  const [route, setRoute] = useState(window.location.hash.replace("#", "") || "home");
  useEffect(() => {
    const onHashChange = () => setRoute(window.location.hash.replace("#", "") || "home");
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);
  return [route, (r: string) => (window.location.hash = r)] as const;
}

/* -------------------- Shared UI -------------------- */
const Container: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
);

const SectionTitle = ({ overline, title, subtitle }: { overline?: string; title: string; subtitle?: string }) => (
  <div className="mx-auto max-w-3xl text-center">
    {overline && <p className="mb-2 tracking-widest text-xs uppercase text-white/70">{overline}</p>}
    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">{title}</h2>
    {subtitle && <p className="mt-4 text-white/80 text-base sm:text-lg">{subtitle}</p>}
  </div>
);

const FeatureCard = ({ icon: Icon, title, children }: { icon: any; title: string; children: React.ReactNode }) => (
  <div className="rounded-2xl p-6 bg-zinc-900/60 border border-white/10 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.6)]">
    <div className="flex items-center gap-3">
      <div className="rounded-xl p-2 bg-white/10 border border-white/10"><Icon className="h-5 w-5" /></div>
      <h3 className="font-semibold text-white text-lg">{title}</h3>
    </div>
    <p className="mt-3 text-sm leading-6 text-white/80">{children}</p>
  </div>
);

const NavLink = ({ onClick, children }: { onClick?: () => void; children: React.ReactNode }) => (
  <button onClick={onClick} className="text-sm font-medium text-white/80 hover:text-white transition">
    {children}
  </button>
);

const PrimaryButton = ({ href = "#", children }: { href?: string; children: React.ReactNode }) => (
  <a
    href={href}
    className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 font-semibold bg-white text-zinc-900 hover:bg-white/90 active:scale-[.99] transition shadow"
  >
    {children}
  </a>
);

/* tiny Windows logo */
const WindowsLogo: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 256 256" aria-hidden="true">
    <path fill="currentColor" d="M0 36l108-15v100H0V36zm116-16l140-20v136H116V20zM0 132h108v103L0 219V132zm116 0h140v124l-140-20V132z"/>
  </svg>
);

/* theme dots */
const ThemeDot = ({ label }: { label: "Dark" | "Sepia" | "Forest" | "Default" }) => {
  const style = label === "Forest" ? { backgroundColor: FOREST_HEX } : undefined;
  return (
    <div className="flex items-center gap-3">
      <span
        style={style}
        className={
          "h-8 w-8 rounded-full border border-white/10 shadow-inner " +
          (label === "Dark"
            ? "bg-zinc-800"
            : label === "Sepia"
            ? "bg-amber-200"
            : label === "Default"
            ? "bg-white"
            : "")
        }
      />
      <span className="text-sm text-white/80">{label}</span>
    </div>
  );
};

/* footer */
function SiteFooter() {
  return (
    <footer className="py-10 border-t border-white/10">
      <Container>
        <div className="flex flex-col sm:flex-row items-center gap-4 justify-between">
          <p className="text-white/60 text-sm">© {new Date().getFullYear()} Eclipse PDF. All rights reserved.</p>
          <div className="flex items-center gap-4 text-white/70">
            <a href="#support" className="hover:text-white">Support</a>
            <a href="#privacy" className="hover:text-white">Privacy</a>
          </div>
        </div>
      </Container>
    </footer>
  );
}

/* -------------------- Landing -------------------- */
function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-950 to-zinc-900 text-white">
      {/* NAV */}
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-zinc-950/50 border-b border-white/10">
        <Container>
          <div className="flex h-16 items-center justify-between">
            <a href="#home" className="flex items-center gap-3 group">
              <img src="/icon.png" alt="Eclipse PDF logo" className="h-8 w-8 rounded-xl" />
              <div>
                <div className="text-sm tracking-widest uppercase text-white/60 leading-none">Eclipse</div>
                <div className="font-bold -mt-0.5 leading-none">PDF</div>
              </div>
            </a>
            <nav className="hidden md:flex items-center gap-6">
              <NavLink onClick={() => (window.location.hash = "features")}>Features</NavLink>
              <NavLink onClick={() => (window.location.hash = "themes")}>Themes</NavLink>
              <NavLink onClick={() => (window.location.hash = "support")}>Support</NavLink>
              <PrimaryButton href="#download"><Download className="h-4 w-4" /> Download</PrimaryButton>
            </nav>
            <div className="md:hidden">
              <PrimaryButton href="#download"><Download className="h-4 w-4" /> Get</PrimaryButton>
            </div>
          </div>
        </Container>
      </header>

      {/* HERO */}
      <section id="home" className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-50 blur-3xl" aria-hidden>
          <div className="absolute left-1/2 top-[-10%] h-72 w-72 -translate-x-1/2 rounded-full bg-indigo-500/20" />
          <div className="absolute right-[10%] bottom-[-10%] h-72 w-72 rounded-full bg-fuchsia-500/10" />
        </div>
        <Container>
          <div className="py-16 sm:py-24 lg:py-28 grid lg:grid-cols-2 items-center gap-10">
            <div>
              {/* brand row */}
              <div className="flex items-center gap-5 mt-2">
                {/* bigger icon */}
                <img src="/icon.png" alt="Eclipse PDF logo" className="h-16 w-16 rounded-2xl" />
                <div>
                  <div className="text-2xl tracking-widest uppercase text-white/60 leading-none">Eclipse</div>
                  <div className="font-bold text-3xl -mt-0.5 leading-none">PDF</div>
                </div>
              </div>

              <p className="mt-4 text-lg sm:text-xl text-white/80">
                Read, edit, and annotate PDFs with customizable themes.
              </p>
              <p className="mt-3 text-white/70 max-w-2xl">
                Open local PDF files and work your way—highlight, comment, draw, add text or images, and switch
                between Dark, Sepia, Forest, or Default modes for comfortable viewing.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <PrimaryButton href="https://apps.microsoft.com/store/detail/YOUR_APP_ID">
                  <WindowsLogo className="h-4 w-4" />
                  Get on Microsoft Store (Windows)
                </PrimaryButton>
                <PrimaryButton href={LINUX_DOWNLOAD}>
                  <Download className="h-5 w-5" />
                  Download for Linux
                </PrimaryButton>
              </div>

              <p className="mt-3 text-xs text-white/60">
                No account. Local files only. Windows · Linux.
              </p>
            </div>

            {/* Demo */}
            <div className="relative">
              <div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-4 shadow-2xl">
                <div className="rounded-xl border border-white/10 bg-zinc-950 p-3">
                  <div className="flex gap-2 pb-3">
                    <span className="h-3 w-3 rounded-full bg-rose-400/80"></span>
                    <span className="h-3 w-3 rounded-full bg-amber-400/80"></span>
                    <span className="h-3 w-3 rounded-full bg-emerald-400/80"></span>
                  </div>
                  <div className="aspect-[16/10] rounded-lg border border-white/5 bg-black overflow-hidden">
                    <img src="/demo.gif" alt="Eclipse PDF demo" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-20 border-t border-white/10 bg-zinc-950/70">
        <Container>
          <SectionTitle
            overline="Powerful tools"
            title="Edit, annotate, and make PDFs yours"
            subtitle="Everything you need to study, review, or present documents without friction."
          />
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard icon={FileText} title="Editing toolkit">
              Highlight passages, add comments, draw freehand, insert text blocks or images, and rearrange pages.
            </FeatureCard>
            <FeatureCard icon={Palette} title="Custom themes">
              Dark, Sepia, Forest, or Default — switch instantly for eye comfort and focus.
            </FeatureCard>
            <FeatureCard icon={Sun} title="Brightness control">
            Fine-tune brightness and contrast so PDFs look perfect in any environment.
          </FeatureCard>
            <FeatureCard icon={Moon} title="Focus reading">
              Distraction-free view with clean controls and buttery-smooth scrolling.
            </FeatureCard>
            <FeatureCard icon={Shield} title="Private by design">
              Open local files. Your documents stay on your device. No cloud shenanigans.
            </FeatureCard>
            <FeatureCard icon={Zap} title="Fast & lightweight">
              Optimized rendering for big documents so you can navigate without lag.
            </FeatureCard>
          </div>
        </Container>
      </section>

      {/* THEMES */}
      <section id="themes" className="py-20 border-t border-white/10">
        <Container>
          <SectionTitle overline="Comfortable viewing" title="Four themes, zero eye strain" />
          <div className="mt-10 grid md:grid-cols-2 gap-8 items-center">
            <div className="grid gap-4">
              <ThemeDot label="Dark" />
              <ThemeDot label="Sepia" />
              <ThemeDot label="Forest" />
              <ThemeDot label="Default" />
            </div>
            <div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-5">
              <div className="grid grid-cols-2 gap-4">
                {(["Dark","Sepia","Forest","Default"] as const).map((t) => (
                  <div key={t} className="rounded-xl overflow-hidden border border-white/10">
                    <div className="px-3 py-2 text-xs text-white/70 border-b border-white/10">{t} mode</div>
                    <div
                      className={
                        "p-4 aspect-video " +
                        (t === "Dark"
                          ? "bg-zinc-900"
                          : t === "Sepia"
                          ? "bg-amber-100 text-zinc-900"
                          : t === "Default"
                          ? "bg-white text-zinc-900"
                          : "text-white")
                      }
                      style={t === "Forest" ? { backgroundColor: FOREST_HEX } : undefined}
                    >
                      <div className="h-2 w-3/5 rounded bg-current/20"/>
                      <div className="mt-2 h-2 w-2/5 rounded bg-current/20"/>
                      <div className="mt-4 space-y-2">
                        {Array.from({ length: 4 }).map((_, i) => (
                          <div key={i} className="h-2 rounded bg-current/20" />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section id="download" className="py-20 border-t border-white/10 bg-gradient-to-b from-zinc-950 via-zinc-950 to-zinc-900">
        <Container>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 md:p-12 text-center">
            <h3 className="text-2xl md:text-3xl font-bold">Ready to try Eclipse PDF?</h3>
            <p className="mt-2 text-white/80">Get it for Windows or Linux and start reading smarter today.</p>
            <div className="mt-6 flex flex-wrap gap-3 justify-center">
              <PrimaryButton href="https://apps.microsoft.com/store/detail/YOUR_APP_ID">
                <WindowsLogo className="h-4 w-4" />
                Get on Microsoft Store (Windows)
              </PrimaryButton>
              <PrimaryButton href={LINUX_DOWNLOAD}>
                <Download className="h-5 w-5"/> Download for Linux
              </PrimaryButton>
            </div>
            <p className="mt-3 text-xs text-white/60">No account required. Local files only. Your docs stay private.</p>
          </div>
        </Container>
      </section>

      <SiteFooter />
    </div>
  );
}

/* -------------------- Support form (Formspree) -------------------- */
function SupportForm() {
  const [status, setStatus] = React.useState<"idle" | "sending" | "ok" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (res.ok) {
        setStatus("ok");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl p-6 bg-zinc-900/60 border border-white/10">
      {/* honeypot anti-spam field (hidden) */}
      <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-white/80">Name</label>
          <input name="name" className="mt-1 w-full rounded-xl bg-zinc-950 border border-white/10 px-3 py-2 outline-none focus:border-white/30" placeholder="Your name" />
        </div>
        <div>
          <label className="text-sm text-white/80">Email</label>
          <input name="email" type="email" required className="mt-1 w-full rounded-xl bg-zinc-950 border border-white/10 px-3 py-2 outline-none focus:border-white/30" placeholder="you@example.com" />
        </div>
      </div>

      <div className="mt-4">
        <label className="text-sm text-white/80">Subject</label>
        <input name="subject" className="mt-1 w-full rounded-xl bg-zinc-950 border border-white/10 px-3 py-2 outline-none focus:border-white/30" placeholder="Bug report, feature idea, etc." />
      </div>

      <div className="mt-4">
        <label className="text-sm text-white/80">Message</label>
        <textarea name="message" rows={6} required className="mt-1 w-full rounded-xl bg-zinc-950 border border-white/10 px-3 py-2 outline-none focus:border-white/30" placeholder="Tell us what's up (steps to reproduce, screenshots, or your idea)." />
      </div>

      <div className="mt-6 flex items-center gap-3">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 font-semibold bg-white text-zinc-900 hover:bg-white/90 active:scale-[.99] transition disabled:opacity-60"
        >
          {status === "sending" ? "Sending..." : "Send message"}
          <ArrowRight className="h-4 w-4" />
        </button>
        {status === "ok" && <p className="text-sm text-emerald-400">Thanks! We got your message.</p>}
        {status === "error" && <p className="text-sm text-rose-400">Oops, something went wrong. Try again.</p>}
      </div>
    </form>
  );
}

/* -------------------- Support (clean + centered) -------------------- */
function Support() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 to-zinc-900 text-white">
      {/* NAV */}
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-zinc-950/50 border-b border-white/10">
        <Container>
          <div className="flex h-16 items-center justify-between">
            <a href="#home" className="flex items-center gap-3 group">
              <img src="/icon.png" alt="Eclipse PDF logo" className="h-8 w-8 rounded-xl" />
              <div>
                <div className="text-sm tracking-widest uppercase text-white/60 leading-none">Eclipse</div>
                <div className="font-bold -mt-0.5 leading-none">PDF</div>
              </div>
            </a>
            <a href="#home" className="text-sm font-medium text-white/80 hover:text-white">Back to site</a>
          </div>
        </Container>
      </header>

      {/* CONTENT */}
      <Container>
        <div className="py-16 sm:py-24">
          <SectionTitle
            title="Support & Feedback"
            subtitle="Need help or have an idea? Reach out below — you’ll hear back soon."
          />
          {/* centered, no empty side column */}
          <div className="mt-10 mx-auto w-full max-w-3xl">
            <SupportForm />
          </div>
        </div>
      </Container>

      <SiteFooter />
    </div>
  );
}

/* -------------------- Privacy -------------------- */
function Privacy() {
  useEffect(() => { document.title = "Eclipse PDF — Privacy"; }, []);
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 to-zinc-900 text-white">
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-zinc-950/50 border-b border-white/10">
        <Container>
          <div className="flex h-16 items-center justify-between">
            <a href="#home" className="flex items-center gap-3 group">
              <img src="/icon.png" alt="Eclipse PDF logo" className="h-8 w-8 rounded-xl" />
              <div>
                <div className="text-sm tracking-widest uppercase text-white/60 leading-none">Eclipse</div>
                <div className="font-bold -mt-0.5 leading-none">PDF</div>
              </div>
            </a>
            <a href="#home" className="text-sm font-medium text-white/80 hover:text-white">Back to site</a>
          </div>
        </Container>
      </header>

      <Container>
        <div className="py-16 sm:py-24 max-w-3xl">
          <h1 className="text-3xl sm:text-4xl font-extrabold">Privacy Policy</h1>
          <p className="mt-4 text-white/80">
            Eclipse PDF does not collect, store, or share your personal data. The app works offline and opens files
            directly from your device. Your PDFs never leave your computer. We don’t run accounts, analytics, ads,
            tracking, or cloud uploads.
          </p>
          <p className="mt-4 text-white/80">
            If you email us for support, we only use your email to reply to you. We don’t sell or share your messages.
          </p>
          <p className="mt-8 text-white/50 text-sm">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </Container>

      <SiteFooter />
    </div>
  );
}

/* -------------------- App root -------------------- */
export default function App() {
  const [route] = useHashRoute();

  useEffect(() => {
    if (route === "support") document.title = "Eclipse PDF — Support";
    else if (route === "privacy") document.title = "Eclipse PDF — Privacy";
    else document.title = "Eclipse PDF — Read, Edit, Annotate";
  }, [route]);

  useEffect(() => {
    // Smooth scroll for same-page anchors (features, themes, download).
    // Only prevent default if the target element exists.
    const handler = (e: any) => {
      const a = (e.target as HTMLElement).closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      const href = a?.getAttribute?.("href");
      if (!href || href.length <= 1) return;

      const id = href.slice(1);
      const el = document.getElementById(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      // if element doesn't exist, allow default so the hash changes
      // and the router shows Support/Privacy pages.
    };

    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  if (route === "support") return <Support />;
  if (route === "privacy") return <Privacy />;
  return <Landing />;
}
