import { useState, useRef } from 'react'
import { motion } from 'motion/react'
import {
  ChevronRight, Menu, Sparkles, Rss, Video, Send,
  TrendingUp, Link2, Mic, Edit3, Star,
} from 'lucide-react'

/* ── Spotlight card: mouse-following glow ── */
function SpotlightCard({ children, className = '', style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const r = ref.current.getBoundingClientRect()
    ref.current.style.setProperty('--mx', `${e.clientX - r.left}px`)
    ref.current.style.setProperty('--my', `${e.clientY - r.top}px`)
  }
  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={`spotlight-card ${className}`}
      style={style}
      whileHover={{
        rotate: [0, 0.5, -0.4, 0.25, 0],
        scale: 1.012,
        transition: {
          rotate: { duration: 0.35, ease: 'easeOut' },
          scale: { duration: 0.2, ease: 'easeOut' },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

/* ── Primitives ── */

function MemoirLogo({ className = 'w-8 h-8' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none">
      <rect width="32" height="32" rx="7" fill="#E8572A" />
      <path d="M7 22V10l5.5 8 5.5-8v12M19 10h6M19 16h5M19 22h6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function SectionEyebrow({ label, tag }: { label: string; tag?: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-1.5 h-1.5 rounded-full bg-white" />
      <span className="text-xs font-medium text-white/60 uppercase tracking-widest">{label}</span>
      {tag && (
        <span className="px-2 py-0.5 rounded-full border border-white/10 text-white/50 text-xs">{tag}</span>
      )}
    </div>
  )
}

function BookDemoButton({ label = 'Book a 20-min demo', full = false }: { label?: string; full?: boolean }) {
  return (
    <button
      className={`group inline-flex items-center justify-center gap-2 rounded-full bg-brand text-white font-semibold text-sm px-5 py-3 transition-all hover:bg-brand/90 active:scale-[0.98] ${full ? 'w-full' : ''}`}
    >
      {label}
      <ChevronRight className="w-4 h-4 translate-x-0 group-hover:translate-x-[2px] transition-transform" />
    </button>
  )
}

const attentionGradient: React.CSSProperties = {
  backgroundImage: 'linear-gradient(to right, #5a1500 0%, #a32910 12.5%, #f4a87c 32.5%, #E8572A 50%, #a32910 67.5%, #5a1500 87.5%, #5a1500 100%)',
  backgroundSize: '200% auto',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
  WebkitTextFillColor: 'transparent',
  filter: 'url(#c3-noise)',
}

/* ── Section: Navbar ── */
function Navbar() {
  const links = ['Product', 'Customers', 'Blog', 'Pricing']
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="relative z-20 w-full py-4"
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <MemoirLogo />
          <span className="font-semibold text-sm tracking-tight text-white">Memoir</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {links.map((link, i) => (
            <motion.a
              key={link}
              href="#"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
              className="text-white/70 text-sm font-medium hover:text-white transition-colors"
            >
              {link}
            </motion.a>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-3">
          <a href="#" className="text-white/70 text-sm font-medium hover:text-white transition-colors">Sign in</a>
          <BookDemoButton label="Book a demo" />
        </div>
        <button className="md:hidden w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center">
          <Menu className="w-4 h-4 text-white/70" />
        </button>
      </div>
    </motion.nav>
  )
}

/* ── Section: Hero ── */
function Hero() {
  return (
    <section className="relative z-10 pt-12 md:pt-20 pb-20 text-center flex flex-col items-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mb-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs text-white/60"
      >
        <Star className="w-3 h-3 text-brand" />
        Backed by Y Combinator Spring '26
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.0] max-w-3xl"
      >
        Shipping isn't<br />the bottleneck.
        <br />
        <em
          className="animate-shiny not-italic font-bold"
          style={attentionGradient}
        >
          Attention
        </em>{' '}
        is.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="mt-8 text-white/60 max-w-md text-base leading-[1.6]"
      >
        Memoir turns every update into content, demo videos, and posts —
        so the internet actually notices what your team ships.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="mt-8 flex flex-col sm:flex-row items-center gap-3"
      >
        <BookDemoButton />
        <button className="group inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors">
          See how it works
          <ChevronRight className="w-4 h-4 group-hover:translate-x-[2px] transition-transform" />
        </button>
      </motion.div>
    </section>
  )
}

/* ── Section: macOS menu bar ── */
function MenuBar() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.9, duration: 0.5 }}
      className="relative z-10 w-full h-10 bg-black/30 backdrop-blur-md"
    >
      <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between text-xs">
        <div className="flex items-center gap-4">
          <MemoirLogo className="w-3.5 h-3.5" />
          <span className="font-bold text-white text-xs">Memoir</span>
          {['File', 'Edit', 'View', 'Publish', 'Window', 'Help'].map((item, i) => (
            <span
              key={item}
              className={`text-white/60 hover:text-white cursor-default transition-colors ${i > 2 ? 'hidden sm:inline' : ''} ${i > 3 ? 'hidden md:inline' : ''}`}
            >
              {item}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2 text-white/50">
          <span>Sun Jun 22 9:41 AM</span>
        </div>
      </div>
    </motion.div>
  )
}

/* ── Section: Dashboard mockup ── */
function DashboardMockup() {
  const updates = [
    { tag: 'ENGINEERING SHIP', color: '#E8572A', title: 'Schema diff viewer', preview: '"Is Postgres schema diff this actually ready" — A. Gil', time: 'JUN 10 · 9:41', comments: '14 comments' },
    { tag: 'MERGED TO MAIN', color: '#10b981', title: 'Branched schemas', preview: '"Ship an on-demand one-in-one click — worth."', time: 'JUN 12 · 2:34', comments: '5 comments' },
    { tag: 'POSTING NOW', color: '#E8572A', title: 'Customer interview', preview: 'How a Series B infra team consolidated their 3', time: 'JUN 14 · 11:02', comments: '' },
  ]

  const published = [
    { platform: 'LinkedIn', type: 'Founder', preview: 'Most schema diff tools dump 400 lines of churn at you. Ours reads top-to-bottom like a code review. Link in comments.', stats: '497 · 28 · 27' },
    { platform: 'X (Twitter)', type: 'Thread', preview: 'we shipped a postgres schema diff that reads top-to-bottom like a code review 1/ the problem with every other diff tool →', stats: '60 · 1.2k · 500' },
  ]

  return (
    <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#0e1014]/90 backdrop-blur-2xl"
      >
        {/* Title bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-black/30">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <span className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          <span className="text-xs text-white/50">Memoir — Content Engine</span>
          <div className="w-16" />
        </div>

        <div className="grid grid-cols-12 h-[520px]">
          {/* Left: update feed */}
          <div className="col-span-5 border-r border-white/10 flex flex-col">
            <div className="px-4 py-3 border-b border-white/10">
              <span className="text-xs font-semibold text-white/40 uppercase tracking-wider">Incoming Signals</span>
            </div>
            <div className="flex-1 overflow-hidden divide-y divide-white/5">
              {updates.map((u, i) => (
                <div key={i} className={`px-4 py-3 hover:bg-white/5 transition-colors cursor-default ${i === 0 ? 'bg-white/[0.04]' : ''}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: u.color }} />
                    <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: u.color }}>{u.tag}</span>
                    <span className="ml-auto text-[10px] text-white/30">{u.time}</span>
                  </div>
                  <p className="text-sm font-semibold text-white mb-0.5">{u.title}</p>
                  <p className="text-xs text-white/50 truncate">{u.preview}</p>
                  {u.comments && <p className="text-[10px] text-white/30 mt-1">{u.comments}</p>}
                </div>
              ))}
              {/* Stats bar */}
              <div className="px-4 py-3 bg-black/40 mt-auto">
                <div className="flex items-center justify-between text-[10px] text-white/40">
                  <span>24 days</span>
                  <span>5 assets</span>
                  <span>1 test publishing week</span>
                  <span>1000 founder-days</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: published content */}
          <div className="col-span-7 flex flex-col">
            <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
              <span className="text-xs font-semibold text-white/40 uppercase tracking-wider">Published Now</span>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-brand animate-pulse" />
                <span className="text-[10px] text-brand font-semibold">LIVE</span>
              </div>
            </div>
            <div className="flex-1 overflow-hidden divide-y divide-white/5 p-4 space-y-3">
              {published.map((p, i) => (
                <div key={i} className="liquid-glass rounded-xl p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold text-white/60 px-1.5 py-0.5 rounded bg-white/10">{p.platform}</span>
                    <span className="text-[10px] text-white/40">{p.type}</span>
                    <span className="ml-auto text-[10px] text-white/30">{p.stats}</span>
                  </div>
                  <p className="text-xs text-white/80 leading-[1.5] line-clamp-3">{p.preview}</p>
                </div>
              ))}

              {/* AI summary card */}
              <div className="liquid-glass rounded-xl p-3 border border-brand/20">
                <div className="flex items-center gap-1.5 mb-2">
                  <Sparkles className="w-3 h-3 text-brand" />
                  <span className="text-[10px] font-semibold text-brand">Summary by Memoir</span>
                </div>
                <p className="text-xs text-white/70 leading-[1.5]">
                  3 signals processed this week. Generated 6 assets across LinkedIn, X, and blog.
                  Top post: schema diff thread — 1.2k impressions. No action needed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

/* ── Section: Logo cloud (scrolling ticker) ── */
function LogoCloud() {
  const logos = ['Datost', 'Stage', 'TraceRoot.ai', 'BOND', 'smol machines', 'zatanna']

  return (
    <div className="relative z-10 py-16 md:py-20 overflow-hidden">
      <p className="text-center text-xs uppercase tracking-widest text-white/40 mb-10">
        Trusted by top engineering teams
      </p>
      <div className="relative flex overflow-hidden">
        {/* fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #0c0c0c, transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #0c0c0c, transparent)' }} />

        {/* duplicated list for seamless loop */}
        <div className="flex animate-ticker whitespace-nowrap">
          {[...logos, ...logos].map((name, i) => (
            <span
              key={i}
              className="inline-flex items-center mx-10 text-sm font-semibold tracking-tight text-white/40 hover:text-white/70 transition-colors cursor-default"
            >
              <span className="mr-10 text-white/15">·</span>
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── Section: How it works (bento pillars) ── */
function HowItWorks() {
  return (
    <section className="relative z-10 max-w-6xl mx-auto px-6 py-20 md:py-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center mb-16"
      >
        <SectionEyebrow label="What Memoir does" />
        <h2 className="mt-5 text-4xl md:text-6xl font-bold tracking-tight leading-[1.02]">
          You build the product.
          <br />
          We help the world{' '}
          <em className="not-italic animate-shiny" style={attentionGradient}>notice.</em>
        </h2>
      </motion.div>

      {/* Bento grid: [Reads] [Writes - 2×wide featured] / [Records - 2×wide] [Publishes] */}
      <div className="grid grid-cols-3 gap-4">

        {/* Reads — tall narrow pill */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0, duration: 0.6 }}>
          <SpotlightCard className="liquid-glass h-full p-6 flex flex-col" style={{ borderRadius: '2rem 2rem 0.5rem 2rem' }}>
            <span className="text-[10px] font-semibold text-white/25 mb-4">01</span>
            <Rss className="w-5 h-5 text-white/50 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-3">Reads</h3>
            <p className="text-xs text-white/50 leading-[1.7] mt-auto">
              Memoir watches your PRs, releases, and customer calls — surfacing what your audience actually cares about.
            </p>
          </SpotlightCard>
        </motion.div>

        {/* Writes — wide featured, 2 columns, brand-tinted */}
        <motion.div className="col-span-2" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1, duration: 0.6 }}>
          <SpotlightCard
            className="liquid-glass h-full p-6 flex flex-col"
            style={{ borderRadius: '2rem 2rem 2rem 0.5rem', background: 'rgba(232,87,42,0.08)', border: '1px solid rgba(232,87,42,0.2)' }}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-semibold text-brand/60">02 · Featured</span>
              <span className="text-[10px] px-2 py-1 rounded-full bg-brand/20 text-brand font-semibold">Active now</span>
            </div>
            <Edit3 className="w-6 h-6 text-brand mb-4" />
            <h3 className="text-2xl font-bold text-white mb-3">Writes</h3>
            <p className="text-sm text-white/60 leading-[1.7] max-w-sm">
              Turns every shipped feature into a polished post, thread, or story — in your founder's voice, not a generic AI one.
            </p>
          </SpotlightCard>
        </motion.div>

        {/* Records — 2 columns wide */}
        <motion.div className="col-span-2" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.6 }}>
          <SpotlightCard className="liquid-glass p-6 flex flex-col sm:flex-row sm:items-center gap-6" style={{ borderRadius: '0.5rem 2rem 2rem 2rem' }}>
            <Video className="w-5 h-5 text-white/50 flex-shrink-0" />
            <div>
              <span className="text-[10px] font-semibold text-white/25 block mb-1">03</span>
              <h3 className="text-lg font-semibold text-white mb-1">Records</h3>
              <p className="text-xs text-white/50 leading-[1.7]">
                Auto-generates short product demo videos for every launch. No Loom fatigue, no screen-record anxiety.
              </p>
            </div>
          </SpotlightCard>
        </motion.div>

        {/* Publishes — narrow tall pill */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.6 }}>
          <SpotlightCard className="liquid-glass h-full p-6 flex flex-col" style={{ borderRadius: '0.5rem 2rem 2rem 2rem' }}>
            <span className="text-[10px] font-semibold text-white/25 mb-4">04</span>
            <Send className="w-5 h-5 text-white/50 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-3">Publishes</h3>
            <p className="text-xs text-white/50 leading-[1.7] mt-auto">
              Ships when your audience is awake. Routes finished content back to your founders automatically.
            </p>
          </SpotlightCard>
        </motion.div>

      </div>
    </section>
  )
}

/* ── Section: Real artifacts ── */
function RealArtifacts() {
  const posts = [
    {
      platform: 'X',
      badge: 'ENGINEERING SHIP',
      badgeColor: '#E8572A',
      title: 'What we learned shipping schema diff to 800 teams',
      preview: 'Most diff tools make migrations feel hard. They aren\'t — they\'re statements about intent.',
      stats: '1,440 views · 38 shares',
    },
    {
      platform: 'X',
      badge: 'STAGED WITH MEMOIR',
      badgeColor: '#10b981',
      title: 'How $6M ARR Postgres teams run zero-downtime migrations',
      preview: 'We shipped a postgres schema diff that reads top-to-bottom like a code review.',
      stats: '820 · 9 · 31',
    },
    {
      platform: 'LinkedIn',
      badge: 'FOUNDER',
      badgeColor: '#3b82f6',
      preview: 'Most schema diff tools dump 400 lines of churn at you. Ours reads top-to-bottom like a code review. Link in comments.',
      stats: '497 · 28 · 27',
    },
    {
      platform: 'X',
      badge: 'THREAD',
      badgeColor: '#8b5cf6',
      preview: 'we shipped a postgres schema diff that reads top-to-bottom like a code review\n1/ the problem with every other diff tool →',
      stats: '60 · 1.2k · 500',
    },
  ]

  return (
    <section className="relative z-10 max-w-6xl mx-auto px-6 py-20 md:py-28">
      <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <SectionEyebrow label="Receipts" />
          <h2 className="mt-5 text-4xl md:text-5xl font-bold tracking-tight leading-[1.02]">
            Real artifacts.
            <br />
            <em className="not-italic animate-shiny" style={attentionGradient}>Real</em>{' '}distribution.
          </h2>
          <p className="mt-6 text-white/60 text-base leading-[1.6] max-w-md">
            Memoir doesn't just draft copy. It generates polished posts,
            demo videos, and threads that are actually ready to ship — tied
            back to the code your team wrote.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {['LinkedIn posts', 'X threads', 'Demo videos', 'Blog drafts', 'Release notes'].map(chip => (
              <span key={chip} className="text-xs text-white/70 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03]">
                {chip}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.7 }}
          className="flex flex-col gap-3"
        >
          {/* Featured wide card — pill shape */}
          <SpotlightCard
            className="liquid-glass p-4"
            style={{ borderRadius: '1.5rem 1.5rem 0.75rem 1.5rem' }}
          >
            <div className="flex items-start gap-4">
              <div className="flex-1 min-w-0">
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded mb-2 inline-block" style={{ color: posts[0].badgeColor, background: `${posts[0].badgeColor}20` }}>
                  {posts[0].badge}
                </span>
                <p className="text-sm font-semibold text-white mb-1 leading-[1.3]">{posts[0].title}</p>
                <p className="text-[11px] text-white/60 leading-[1.5]">{posts[0].preview}</p>
              </div>
              <span className="text-[10px] text-white/25 whitespace-nowrap pt-1">{posts[0].stats}</span>
            </div>
          </SpotlightCard>

          {/* Two smaller cards side by side */}
          <div className="grid grid-cols-2 gap-3">
            {posts.slice(1, 3).map((post, i) => (
              <SpotlightCard
                key={i}
                className="liquid-glass p-3"
                style={{ borderRadius: i === 0 ? '0.75rem 1.5rem 1.5rem 0.75rem' : '1.5rem 0.75rem 0.75rem 1.5rem' }}
              >
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded mb-2 inline-block" style={{ color: post.badgeColor, background: `${post.badgeColor}20` }}>
                  {post.badge}
                </span>
                {post.title && <p className="text-xs font-semibold text-white mb-1 leading-[1.3]">{post.title}</p>}
                <p className="text-[11px] text-white/60 leading-[1.5] line-clamp-3">{post.preview}</p>
                <p className="text-[10px] text-white/30 mt-2">{post.stats}</p>
              </SpotlightCard>
            ))}
          </div>

          {/* Last card — wide pill */}
          <SpotlightCard
            className="liquid-glass p-3"
            style={{ borderRadius: '0.75rem 1.5rem 1.5rem 1.5rem' }}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded flex-shrink-0" style={{ color: posts[3].badgeColor, background: `${posts[3].badgeColor}20` }}>
                  {posts[3].badge}
                </span>
                <p className="text-[11px] text-white/60 leading-[1.5] truncate">{posts[3].preview}</p>
              </div>
              <span className="text-[10px] text-white/25 flex-shrink-0">{posts[3].stats}</span>
            </div>
          </SpotlightCard>
        </motion.div>
      </div>
    </section>
  )
}

/* ── Section: Stats bar ── */
function StatsBar() {
  const stats = [
    { value: '+38%', label: 'inbound traffic within 30 days' },
    { value: '14×', label: 'faster time to first published read' },
    { value: '6×', label: 'more launches that reach the right audience' },
    { value: '~14h', label: 'founder time saved every week' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="relative z-10 max-w-6xl mx-auto px-6 py-8"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-6 md:gap-x-0">
        {stats.map((s, i) => (
          <div key={i} className="px-4 md:px-8">
            <p className="text-5xl md:text-6xl font-black text-white tracking-tight leading-none">{s.value}</p>
            <p className="mt-3 text-sm text-white/40 leading-[1.4] max-w-[12rem]">{s.label}</p>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

/* ── Section: The mechanism (3 feature cards) ── */
function TheMechanism() {
  return (
    <section className="relative z-10 max-w-6xl mx-auto px-6 py-20 md:py-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mb-16"
      >
        <SectionEyebrow label="The mechanism" />
        <h2 className="mt-5 text-4xl md:text-6xl font-bold tracking-tight leading-[1.02] max-w-2xl">
          More than a writer.
          <br />
          A{' '}
          <em className="not-italic animate-shiny" style={attentionGradient}>system</em>{' '}
          that gets smarter every week.
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-5">
        {/* Feature 1 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
        <SpotlightCard className="liquid-glass p-6 h-full" style={{ borderRadius: '2rem 0.5rem 2rem 2rem' }}>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[10px] font-semibold text-white/30 uppercase tracking-wider">01 · Dual purpose</span>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-5 h-5 text-brand" />
            <h3 className="text-lg font-semibold text-white">We watch what's spiking.</h3>
          </div>
          <p className="text-sm text-white/60 leading-[1.6] mb-5">
            Memoir scans HN, X, LinkedIn, and surfaces sales in real-time for posts
            going viral. We surface only the ones your audience actually cares about.
          </p>
          <div className="space-y-2">
            {[
              { query: '"Why Postgres migrations are still painful"', bar: 72 },
              { query: '"Show me a schema diff"', bar: 58 },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-xs text-white/50 truncate flex-1">{item.query}</span>
                <div className="w-24 h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full bg-brand rounded-full" style={{ width: `${item.bar}%` }} />
                </div>
              </div>
            ))}
            <div className="text-xs text-brand mt-1">relevance 0.72</div>
          </div>
        </SpotlightCard>
        </motion.div>

        {/* Feature 2 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
        <SpotlightCard className="liquid-glass p-6 h-full" style={{ borderRadius: '0.5rem 2rem 2rem 2rem', background: 'rgba(255,255,255,0.02)' }}>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[10px] font-semibold text-white/30 uppercase tracking-wider">02 · Audience attribution</span>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <Link2 className="w-5 h-5 text-white/70" />
            <h3 className="text-lg font-semibold text-white">Tied back to your product, naturally.</h3>
          </div>
          <p className="text-sm text-white/60 leading-[1.6] mb-5">
            Every post links back to a specific product moment — a merged PR,
            a shipped feature, a live changelog entry.
          </p>
          <div className="space-y-2">
            <div className="h-2 rounded-full bg-white/10 w-3/4" />
            <div className="h-2 rounded-full bg-white/10 w-full" />
            <div className="h-2 rounded-full bg-white/10 w-1/2" />
            <button className="mt-3 text-xs px-4 py-2 rounded-full bg-brand/20 border border-brand/30 text-brand font-medium">
              → your product — answer this
            </button>
          </div>
        </SpotlightCard>
        </motion.div>

        {/* Feature 3 — full width, angled shape */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="md:col-span-2"
        >
        <SpotlightCard className="liquid-glass p-6" style={{ borderRadius: '0.5rem 2rem 2rem 0.5rem' }}>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[10px] font-semibold text-white/30 uppercase tracking-wider">03 · AI-native · Learns rapidly</span>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <Mic className="w-5 h-5 text-brand" />
            <h3 className="text-lg font-semibold text-white">
              Becomes <em className="not-italic text-brand">your</em> voice, not a generic one.
            </h3>
          </div>
          <p className="text-sm text-white/60 leading-[1.6] max-w-2xl mb-6">
            Every post, every reply, every approval teaches the system. Over time, Memoir
            stops sounding like an assistant and starts sounding like your founder —
            your engineering shipping turning into your marketing voice, automatically.
          </p>
          <div className="grid grid-cols-4 gap-3">
            {[
              { label: 'Note 1', width: '40%' },
              { label: 'Note 2', width: '70%' },
              { label: 'After 1 mo', width: '85%' },
              { label: 'Now', width: '97%', highlight: true },
            ].map((item) => (
              <div key={item.label} className="space-y-1">
                <span className="text-[10px] text-white/30">{item.label}</span>
                <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${item.highlight ? 'bg-brand' : 'bg-white/30'}`}
                    style={{ width: item.width }}
                  />
                </div>
              </div>
            ))}
          </div>
        </SpotlightCard>
        </motion.div>
      </div>
    </section>
  )
}

/* ── Section: Pricing ── */
function Pricing() {
  const [yearly, setYearly] = useState(false)

  const plans = [
    {
      tier: 'Starter',
      price: yearly ? '$0/y' : 'Free',
      desc: 'For solo founders and small teams testing the waters with product marketing.',
      features: [
        'Up to 3 connected repos',
        '5 AI-generated posts/month',
        'LinkedIn + X publishing',
        'Basic voice training',
        'Access via web',
      ],
    },
    {
      tier: 'Growth',
      price: yearly ? '$990/y' : '$99/m',
      desc: 'For scaling startups who ship often and want the internet to notice every launch.',
      features: [
        'Up to 10 connected repos',
        'Unlimited posts per month',
        'Demo video generation',
        'Advanced voice learning',
        'Team collaboration (5 seats)',
        'Priority support',
      ],
    },
    {
      tier: 'Scale',
      price: yearly ? '$2,990/y' : '$299/m',
      isProCard: true,
      desc: 'For Series A+ teams with dedicated marketing infra and brand requirements.',
      features: [
        'Unlimited repos',
        'Unlimited posts + videos',
        'Custom brand voice profiles',
        'Unlimited team seats',
        'Dedicated Slack channel',
        'SLA + enterprise support',
      ],
    },
  ]

  return (
    <section className="c3-pricing-section">
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <filter id="c3-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="2" stitchTiles="stitch" />
            <feComponentTransfer><feFuncA type="linear" slope="0.075" /></feComponentTransfer>
            <feComposite in2="SourceGraphic" operator="in" result="noise" />
            <feBlend in="SourceGraphic" in2="noise" mode="overlay" />
          </filter>
        </defs>
      </svg>

      <SectionEyebrow label="Pricing" tag="Simple, transparent" />

      <div className="c3-watermark-container">
        <div className="c3-watermark-main">
          <span className="c3-watermark-line-1">Ship more.</span>
          <span className="c3-watermark-line-2">Reach more.</span>
        </div>
      </div>

      <div className="c3-toggle-wrap">
        <span className="text-sm text-white/60">Yearly</span>
        <button
          className={`c3-toggle ${yearly ? 'active' : ''}`}
          onClick={() => setYearly(y => !y)}
        >
          <span className="c3-toggle-knob" />
        </button>
        <span className="text-xs text-brand font-semibold">Save 20%</span>
      </div>

      <div className="c3-grid">
        {plans.map((plan) => (
          <div key={plan.tier} className={`c3-card ${plan.isProCard ? 'c3-card-pro' : ''}`}>
            <div className="c3-tier-small">{plan.tier}</div>
            <div className="c3-tier-large">{plan.price}</div>
            <p className="c3-desc">{plan.desc}</p>
            <ul className="c3-list">
              {plan.features.map((f) => (
                <li key={f}>
                  <span className="c3-check">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {f}
                </li>
              ))}
            </ul>
            <button className="c3-btn">Choose Plan</button>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ── Section: Final CTA ── */
function FinalCTA() {
  return (
    <section className="relative z-10 max-w-6xl mx-auto px-6 py-20 md:py-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="spotlight-card liquid-glass relative overflow-hidden rounded-3xl px-8 py-16 md:py-24 text-center"
      >
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{ background: 'radial-gradient(600px circle at 50% 0%, rgba(232,87,42,0.25), transparent 70%)' }}
        />
        <h2 className="relative text-4xl md:text-6xl font-bold tracking-tight leading-[1.02]">
          Build the product.
          <br />
          Let{' '}
          <em className="not-italic animate-shiny" style={attentionGradient}>Memoir</em>{' '}
          do the rest.
        </h2>
        <p className="relative mt-6 text-white/60 max-w-md mx-auto text-sm leading-[1.6]">
          Join engineering teams who ship fast and finally get noticed.
          Autonomous product marketing for every sprint.
        </p>
        <div className="relative mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <BookDemoButton label="Book a 20-min demo" />
          <button className="group inline-flex items-center gap-2 rounded-full border border-white/15 text-white text-sm font-medium px-5 py-3 hover:bg-white/5 transition-colors">
            See how it works
            <ChevronRight className="w-4 h-4 group-hover:translate-x-[2px] transition-transform" />
          </button>
        </div>
        <p className="relative mt-5 text-xs text-white/30">
          It's talking to 4 teams · 4 more.
        </p>
      </motion.div>
    </section>
  )
}

/* ── Footer ── */
function Footer() {
  return (
    <footer className="relative z-10 max-w-6xl mx-auto px-6 py-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <MemoirLogo className="w-6 h-6" />
            <span className="text-sm font-semibold">Memoir</span>
          </div>
          <p className="text-xs text-white/40 leading-[1.6]">
            Autonomous product marketing for every shipping team.
            Backed by Y Combinator Spring '26.
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-3">Product</p>
          {['How it works', 'Writes', 'Records', 'Publishes'].map(l => (
            <a key={l} href="#" className="block text-sm text-white/40 hover:text-white/70 transition-colors mb-1.5">{l}</a>
          ))}
        </div>
        <div>
          <p className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-3">Company</p>
          {['Blog', 'Docs', 'Customers', 'About', 'Contact'].map(l => (
            <a key={l} href="#" className="block text-sm text-white/40 hover:text-white/70 transition-colors mb-1.5">{l}</a>
          ))}
        </div>
        <div>
          <p className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-3">Connect</p>
          {['Twitter / X', 'LinkedIn', 'GitHub'].map(l => (
            <a key={l} href="#" className="block text-sm text-white/40 hover:text-white/70 transition-colors mb-1.5">{l}</a>
          ))}
        </div>
      </div>
      <div className="mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-white/30">
        <span>© 2024 Memoir AI, Inc. All rights reserved.</span>
        <div className="flex gap-4">
          <a href="#" className="hover:text-white/60 transition-colors">Privacy</a>
          <a href="#" className="hover:text-white/60 transition-colors">Terms</a>
        </div>
      </div>
    </footer>
  )
}

/* ── Root SVG noise filter ── */
function NoiseFilter() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute', pointerEvents: 'none' }}>
      <defs>
        <filter id="c3-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.35 0" />
          <feComposite in2="SourceGraphic" operator="in" result="noise" />
          <feBlend in="SourceGraphic" in2="noise" mode="multiply" />
        </filter>
      </defs>
    </svg>
  )
}

/* ── App ── */
export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#0c0c0c] text-white">
      <NoiseFilter />

      {/* Background video */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover pointer-events-none opacity-30"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_064122_c4750c0e-7476-4b44-94a2-a85a65c63bf2.mp4"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0c0c]/60 via-transparent to-[#0c0c0c]/80" />
      </div>

      {/* Sections */}
      <Navbar />
      <Hero />
      <MenuBar />
      <DashboardMockup />
      <LogoCloud />
      <HowItWorks />
      <RealArtifacts />
      <StatsBar />
      <TheMechanism />
      <Pricing />
      <FinalCTA />
      <Footer />
    </div>
  )
}
