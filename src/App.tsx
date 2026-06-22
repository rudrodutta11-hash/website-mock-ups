import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'motion/react'
import {
  ChevronRight, Menu, Sparkles, FileSpreadsheet, Users, BarChart3, Shield, Play,
} from 'lucide-react'

/* ─────────────────────────────────────────────────────────────
   VIDEO SLOTS — paste Higgsfield output URLs here when ready
   Hero ambient:   Higgsfield job df692f3a-6c52-4f74-932b-2e7c8d811a47
   Gradebook demo: Higgsfield job b7e3b60a-5bd9-4d22-850d-779a924bd848
───────────────────────────────────────────────────────────── */
const HERO_VIDEO_SRC = 'https://d8j0ntlcm91z4.cloudfront.net/user_3FMa3cCSAif4KRSbwmQBJ5w0oIN/hf_20260622_220629_df692f3a-6c52-4f74-932b-2e7c8d811a47.mp4'
const DEMO_VIDEO_SRC = 'https://d8j0ntlcm91z4.cloudfront.net/user_3FMa3cCSAif4KRSbwmQBJ5w0oIN/hf_20260622_220631_b7e3b60a-5bd9-4d22-850d-779a924bd848.mp4'

/* ─── Count-up hook ─── */
function useCountUp(end: number, duration = 1800, trigger = false) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!trigger) return
    let t0 = 0
    const tick = (ts: number) => {
      if (!t0) t0 = ts
      const p = Math.min((ts - t0) / duration, 1)
      setVal(Math.round((1 - Math.pow(1 - p, 3)) * end))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [trigger, end, duration])
  return val
}

/* ─── Spotlight card (light-theme glow on hover) ─── */
function SpotlightCard({ children, className = '', style }: {
  children: React.ReactNode; className?: string; style?: React.CSSProperties
}) {
  const ref = useRef<HTMLDivElement>(null)
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const r = ref.current.getBoundingClientRect()
    ref.current.style.setProperty('--mx', `${e.clientX - r.left}px`)
    ref.current.style.setProperty('--my', `${e.clientY - r.top}px`)
  }
  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      className={`studyo-card ${className}`}
      style={style}
      whileHover={{ y: -4, transition: { duration: 0.2, ease: 'easeOut' } }}
    >
      {children}
    </motion.div>
  )
}

/* ─── SVG Book illustrations ─── */
function OpenBook({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 150" className={className} fill="none">
      <path d="M100 25 C80 15 40 18 15 28 L15 118 C40 108 80 106 100 118"
        stroke="#b0bac8" strokeWidth="2" fill="#eef0f4" strokeLinecap="round"/>
      <path d="M100 25 C120 15 160 18 185 28 L185 118 C160 108 120 106 100 118"
        stroke="#b0bac8" strokeWidth="2" fill="#eef0f4" strokeLinecap="round"/>
      <line x1="28" y1="50" x2="90" y2="47" stroke="#cdd2db" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="28" y1="62" x2="90" y2="59" stroke="#cdd2db" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="28" y1="74" x2="88" y2="72" stroke="#cdd2db" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="28" y1="86" x2="86" y2="85" stroke="#cdd2db" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="110" y1="47" x2="172" y2="50" stroke="#cdd2db" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="110" y1="59" x2="172" y2="62" stroke="#cdd2db" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="112" y1="72" x2="172" y2="74" stroke="#cdd2db" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="114" y1="85" x2="172" y2="86" stroke="#cdd2db" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M100 25 L100 118" stroke="#b0bac8" strokeWidth="1.5"/>
    </svg>
  )
}

function SpiralNotebook({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 155" className={className} fill="none">
      <rect x="22" y="8" width="90" height="135" rx="5" fill="#eef0f4" stroke="#b0bac8" strokeWidth="2"/>
      <path d="M92 8 L92 36 L84 28 L76 36 L76 8 Z" fill="#cdd2db"/>
      <line x1="36" y1="52" x2="98" y2="52" stroke="#dde1e9" strokeWidth="1.5"/>
      <line x1="36" y1="65" x2="98" y2="65" stroke="#dde1e9" strokeWidth="1.5"/>
      <line x1="36" y1="78" x2="98" y2="78" stroke="#dde1e9" strokeWidth="1.5"/>
      <line x1="36" y1="91" x2="98" y2="91" stroke="#dde1e9" strokeWidth="1.5"/>
      <line x1="36" y1="104" x2="98" y2="104" stroke="#dde1e9" strokeWidth="1.5"/>
      <line x1="36" y1="117" x2="84" y2="117" stroke="#dde1e9" strokeWidth="1.5"/>
      {[16, 27, 38, 49, 60, 71, 82, 93, 104, 115, 126, 133].map((y, i) => (
        <circle key={i} cx="19" cy={y} r="3.5" fill="#dde1e9" stroke="#b0bac8" strokeWidth="1"/>
      ))}
    </svg>
  )
}

/* ─── Studyo Logo ─── */
function StudyoLogo() {
  return (
    <div className="flex items-center gap-2">
      <svg width="34" height="34" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="9" r="6" fill="#10b981"/>
        <circle cx="10" cy="19" r="5" fill="#4f6ef7"/>
        <circle cx="38" cy="19" r="5" fill="#8b5cf6"/>
        <path d="M3 41 C3 31 17 31 17 41" stroke="#4f6ef7" strokeWidth="2.8" fill="none" strokeLinecap="round"/>
        <path d="M31 41 C31 31 45 31 45 41" stroke="#8b5cf6" strokeWidth="2.8" fill="none" strokeLinecap="round"/>
        <path d="M14 41 C14 28 34 28 34 41" stroke="#10b981" strokeWidth="2.8" fill="none" strokeLinecap="round"/>
      </svg>
      <span className="font-semibold text-[#1a1f36] text-lg tracking-tight">studyo</span>
    </div>
  )
}

/* ─── Navbar ─── */
function Navbar() {
  const links = ['Features', 'For Educators', 'Pricing', 'Contact']
  return (
    <motion.nav
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="sticky top-0 z-30 w-full py-4 bg-white/85 backdrop-blur-md border-b border-gray-200/60"
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <StudyoLogo />
        <div className="hidden md:flex items-center gap-8">
          {links.map((l, i) => (
            <motion.a
              key={l} href="#"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 + i * 0.05 }}
              className="text-gray-600 text-sm font-medium hover:text-[#1a1f36] transition-colors"
            >{l}</motion.a>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-3">
          <a href="#" className="text-gray-600 text-sm font-medium hover:text-[#1a1f36] transition-colors">Sign In</a>
          <motion.button
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            className="inline-flex items-center gap-1.5 rounded-full bg-[#1a1f36] text-white text-sm font-semibold px-5 py-2.5 hover:bg-[#1a1f36]/90 transition-colors active:scale-[0.98]"
          >
            Get Started <ChevronRight className="w-3.5 h-3.5"/>
          </motion.button>
        </div>
        <button className="md:hidden w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
          <Menu className="w-4 h-4 text-gray-600"/>
        </button>
      </div>
    </motion.nav>
  )
}

/* ─── Hero ─── */
const heroWords = ['Grading.', 'Simplified.', 'Beautifully.']

function Hero() {
  return (
    <section className="relative z-10 overflow-hidden">
      {/* Ambient video background — very subtle, multiply blend */}
      {HERO_VIDEO_SRC && (
        <div className="absolute inset-0 pointer-events-none">
          <video autoPlay loop muted playsInline
            className="w-full h-full object-cover"
            style={{ opacity: 0.07, mixBlendMode: 'multiply' }}
            src={HERO_VIDEO_SRC}
          />
        </div>
      )}

      {/* Floating books */}
      <div className="absolute left-2 md:left-10 top-16 animate-float-slow pointer-events-none hidden md:block">
        <SpiralNotebook className="w-28 h-32 opacity-65"/>
      </div>
      <div className="absolute right-6 md:right-14 top-20 animate-float-medium pointer-events-none hidden md:block">
        <OpenBook className="w-44 h-32 opacity-50"/>
      </div>
      <div className="absolute right-20 bottom-8 animate-float-fast pointer-events-none hidden lg:block">
        <SpiralNotebook className="w-20 h-24 opacity-40"/>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-28 text-center flex flex-col items-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 8, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="mb-10 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm text-xs text-gray-500 font-medium"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#4f6ef7]"/>
          Built for private tuition teachers in India
        </motion.div>

        {/* Headline — word by word */}
        <h1 className="mb-8 leading-[1.05] tracking-tight text-[#1a1f36]">
          {heroWords.map((word, i) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.14, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block text-5xl md:text-7xl font-bold mr-3 md:mr-4 last:mr-0"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.6 }}
          className="text-gray-500 max-w-lg text-base md:text-lg leading-relaxed"
        >
          The LMS for private tutors who teach on their own. Manage your students,
          share materials, grade work, and keep every batch organised — all in one place.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.92, duration: 0.5 }}
          className="mt-9 flex flex-col sm:flex-row items-center gap-4"
        >
          <button className="group inline-flex items-center gap-2 rounded-full bg-[#1a1f36] text-white font-semibold text-sm px-7 py-3.5 hover:bg-[#1a1f36]/90 transition-all active:scale-[0.98]">
            Start for Free
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"/>
          </button>
          <button className="group inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#1a1f36] transition-colors font-medium">
            See how it works
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"/>
          </button>
        </motion.div>
      </div>
    </section>
  )
}

/* ─── Gradebook Mockup ─── */
const students = [
  { name: 'Aarav Sharma',  hw1: 92, hw2: 88, mid: 85, fin: 91, overall: 89 },
  { name: 'Priya Patel',   hw1: 95, hw2: 94, mid: 91, fin: 93, overall: 93 },
  { name: 'Rohan Iyer',    hw1: 78, hw2: 82, mid: 80, fin: 85, overall: 81 },
  { name: 'Ananya Reddy',  hw1: 88, hw2: 90, mid: 87, fin: 89, overall: 89 },
  { name: 'Vikram Nair',   hw1: 91, hw2: 85, mid: 88, fin: 90, overall: 88 },
]

function GradebookMockup() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <div ref={ref} className="relative z-10 max-w-5xl mx-auto px-6 py-8 pb-16">
      {/* Floating books around the gradebook */}
      <div className="absolute -left-6 top-12 animate-float-medium hidden lg:block pointer-events-none">
        <OpenBook className="w-32 h-24 opacity-45"/>
      </div>
      <div className="absolute -right-4 bottom-8 animate-float-slow hidden lg:block pointer-events-none">
        <SpiralNotebook className="w-22 h-26 opacity-50"/>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 44 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden"
      >
        {/* macOS chrome */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50/80">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57]"/>
            <span className="w-3 h-3 rounded-full bg-[#febc2e]"/>
            <span className="w-3 h-3 rounded-full bg-[#28c840]"/>
          </div>
          <span className="text-xs text-gray-400 tracking-tight">Gradebook — Class 10A</span>
          <div className="w-14"/>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left text-xs font-medium text-gray-400 px-6 py-3.5 uppercase tracking-wider">Student</th>
                {['HW1', 'HW2', 'Midterm', 'Final', 'Overall'].map(h => (
                  <th key={h} className="text-xs font-medium text-gray-400 px-5 py-3.5 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {students.map((s, i) => (
                <motion.tr
                  key={s.name}
                  initial={{ opacity: 0, x: -14 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.15 + i * 0.1, duration: 0.45, ease: 'easeOut' }}
                  className="border-b border-gray-50 last:border-0 hover:bg-blue-50/25 transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-[#1a1f36]">{s.name}</td>
                  <td className="px-5 py-4 text-center text-gray-500">{s.hw1}</td>
                  <td className="px-5 py-4 text-center text-gray-500">{s.hw2}</td>
                  <td className="px-5 py-4 text-center text-gray-500">{s.mid}</td>
                  <td className="px-5 py-4 text-center text-gray-500">{s.fin}</td>
                  <td className="px-5 py-4 text-center font-bold text-[#1a1f36]">{s.overall}%</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}

/* ─── Features ─── */
const features = [
  {
    Icon: FileSpreadsheet,
    title: 'Spreadsheet-Style Gradebook',
    desc: 'Grade exactly how you already do — in rows and columns. Add assignments, set weights, and watch final grades calculate instantly.',
  },
  {
    Icon: Users,
    title: 'Built for Private Tutors',
    desc: 'Designed for tuition teachers in India: manage batches, track each student, and give learners one place for every class they take with you.',
  },
  {
    Icon: BarChart3,
    title: 'Insights at a Glance',
    desc: 'From attendance patterns to performance curves. See who needs help before the exam results arrive.',
  },
  {
    Icon: Shield,
    title: 'Private by Default',
    desc: 'Every grade, every record, every conversation — scoped strictly to the people who need to see it. Read our Privacy & Data Policy for full details.',
  },
]

function Features() {
  return (
    <section className="relative z-10 max-w-6xl mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-[#1a1f36] tracking-tight leading-[1.05]">
          Everything you need.<br/>Nothing you don't.
        </h2>
        <p className="mt-4 text-gray-500 text-base max-w-md mx-auto leading-relaxed">
          We studied how teachers grade, then built the tool they wish they always had.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {features.map(({ Icon, title, desc }, i) => (
          <motion.div key={title}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.09, duration: 0.5 }}
          >
            <SpotlightCard className="bg-white rounded-2xl border border-gray-200 p-6 h-full flex flex-col">
              <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-gray-600"/>
              </div>
              <h3 className="font-semibold text-[#1a1f36] text-sm leading-snug mb-3">{title}</h3>
              <p className="text-xs text-gray-500 leading-[1.75] mt-auto">{desc}</p>
            </SpotlightCard>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        className="text-center"
      >
        <button className="group inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#1a1f36] transition-colors font-medium">
          See all features <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"/>
        </button>
      </motion.div>
    </section>
  )
}

/* ─── Stats ─── */
function StatItem({ end, format, label, duration = 1800 }: {
  end: number; format: (n: number) => string; label: string; duration?: number
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const val = useCountUp(end, duration, inView)
  return (
    <div ref={ref} className="text-center md:text-left">
      <p className="text-5xl md:text-6xl font-black text-[#1a1f36] tabular-nums tracking-tight leading-none">
        {format(val)}
      </p>
      <p className="mt-3 text-sm text-gray-500 leading-[1.4] max-w-[10rem] mx-auto md:mx-0">{label}</p>
    </div>
  )
}

function Stats() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative z-10 max-w-6xl mx-auto px-6 py-16 border-t border-gray-200"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-6">
        <StatItem end={300} format={n => `${n}+`} label="Students Managed"/>
        <StatItem end={50} format={n => `${n}+`} label="Tutors Onboarded"/>
        <StatItem end={999} format={n => `${(n / 10).toFixed(1)}%`} label="Uptime" duration={2200}/>
        <StatItem end={0} format={n => `${n}`} label="Data Leaks"/>
      </div>
    </motion.section>
  )
}

/* ─── Demo Video Section ─── */
function DemoVideo() {
  return (
    <section className="relative z-10 max-w-6xl mx-auto px-6 py-16 md:py-24">
      {/* Floating books */}
      <div className="absolute -left-4 top-20 animate-float-slow pointer-events-none hidden lg:block">
        <OpenBook className="w-36 h-28 opacity-40"/>
      </div>
      <div className="absolute -right-4 bottom-12 animate-float-medium pointer-events-none hidden lg:block">
        <SpiralNotebook className="w-24 h-28 opacity-45"/>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-[#1a1f36] tracking-tight">
          See it in action.
        </h2>
        <p className="mt-4 text-gray-500 text-base max-w-sm mx-auto">
          Watch how grading feels when the tool actually gets out of your way.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden"
      >
        {/* macOS chrome */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50/80">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57]"/>
            <span className="w-3 h-3 rounded-full bg-[#febc2e]"/>
            <span className="w-3 h-3 rounded-full bg-[#28c840]"/>
          </div>
          <span className="text-xs text-gray-400">studyo — Demo</span>
          <div className="w-14"/>
        </div>

        {/* Video or placeholder */}
        <div className="relative bg-gray-50 aspect-video flex items-center justify-center">
          {DEMO_VIDEO_SRC ? (
            <video
              autoPlay loop muted playsInline
              className="w-full h-full object-cover"
              src={DEMO_VIDEO_SRC}
            />
          ) : (
            <div className="flex flex-col items-center gap-4 text-gray-300">
              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                <Play className="w-7 h-7 text-gray-400 ml-1"/>
              </div>
              <p className="text-sm text-gray-400 font-medium">Demo video coming soon</p>
            </div>
          )}
        </div>
      </motion.div>
    </section>
  )
}

/* ─── CTA ─── */
function CTA() {
  return (
    <section className="relative z-10 max-w-6xl mx-auto px-6 py-16 md:py-24">
      {/* Floating books */}
      <div className="absolute left-2 top-12 animate-float-medium pointer-events-none hidden md:block">
        <OpenBook className="w-36 h-28 opacity-40"/>
      </div>
      <div className="absolute right-2 bottom-8 animate-float-slow pointer-events-none hidden md:block">
        <SpiralNotebook className="w-28 h-32 opacity-50"/>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-[#1a1f36] tracking-tight leading-[1.05]">
          Ready to grade smarter?
        </h2>
        <p className="mt-5 text-gray-500 text-base max-w-md mx-auto leading-relaxed">
          Join teachers who have already replaced their Excel sheets with something built for them.
        </p>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.18 }}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#1a1f36] text-white font-semibold text-sm px-8 py-4 hover:bg-[#1a1f36]/90 transition-colors"
        >
          Get Started — It's Free
          <ChevronRight className="w-4 h-4"/>
        </motion.button>
      </motion.div>
    </section>
  )
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer className="relative z-10 border-t border-gray-200 bg-white/60">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-3">
        <StudyoLogo/>
        <div className="flex items-center gap-6 text-sm text-gray-500">
          <a href="#" className="hover:text-[#1a1f36] transition-colors">Privacy &amp; Data Policy</a>
          <span className="text-gray-300">·</span>
          <span>Made for India's private tuition teachers.</span>
        </div>
      </div>
    </footer>
  )
}

/* ─── App ─── */
export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden grid-bg text-[#1a1f36]">
      <Navbar/>
      <Hero/>
      <GradebookMockup/>
      <Features/>
      <Stats/>
      <DemoVideo/>
      <CTA/>
      <Footer/>
    </div>
  )
}
