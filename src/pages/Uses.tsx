import { motion } from 'framer-motion'
import { Bot, Code2, Coffee, Cpu, Keyboard, Laptop, Layers, Server, Sparkles, Terminal, Wrench, type LucideIcon } from 'lucide-react'
import type { IconType } from 'react-icons'
import { FaAws } from 'react-icons/fa'
import { RiOpenaiFill } from 'react-icons/ri'
import { TbBrandVscode } from 'react-icons/tb'
import {
  SiAnthropic, SiApachekafka, SiApple, SiCplusplus, SiDocker, SiFastapi, SiFramer, SiGit, SiGithub, SiGo, SiGrafana, SiGraphql,
  SiHuggingface, SiJavascript, SiJetbrains, SiKubernetes, SiLangchain, SiLinux, SiMongodb, SiNeovim, SiNextdotjs, SiNginx,
  SiNodedotjs, SiNvidia, SiOllama, SiPostgresql, SiPrometheus, SiPython, SiPytorch, SiReact, SiRedis, SiRust, SiSqlite,
  SiStarship, SiTailwindcss, SiTerraform, SiTmux, SiTypescript, SiVercel, SiVite, SiVllm, SiWezterm, SiZsh,
} from 'react-icons/si'
import { uses } from '../content/pages'
import { Label, Page, Reveal, SplitReveal, TiltCard, ease } from '../components/anim'

const icons: Record<string, LucideIcon> = { 'Editor & Terminal': Terminal, Hardware: Laptop, 'AI & Models': Bot, 'Backend Stack': Server, Coffee }

type Tech = [name: string, Icon: IconType, color: string]

// Brand colors from simpleicons.org; near-black marks use currentColor so they stay visible in dark mode.
const stack: { group: string; Icon: LucideIcon; blurb: string; items: Tech[] }[] = [
  { group: 'Languages', Icon: Code2, blurb: 'What I think in', items: [
    ['Go', SiGo, '#00ADD8'], ['Python', SiPython, '#3776AB'], ['Rust', SiRust, '#DEA584'], ['TypeScript', SiTypescript, '#3178C6'],
    ['JavaScript', SiJavascript, '#F7DF1E'], ['Node.js', SiNodedotjs, '#5FA04E'], ['C++', SiCplusplus, '#00599C'], ['SQL', SiPostgresql, '#4169E1'],
  ]},
  { group: 'AI / LLM', Icon: Sparkles, blurb: 'Models, serving, evals', items: [
    ['Anthropic', SiAnthropic, 'currentColor'], ['OpenAI', RiOpenaiFill, 'currentColor'], ['Ollama', SiOllama, 'currentColor'], ['vLLM', SiVllm, '#30A2FF'],
    ['LangChain', SiLangchain, 'currentColor'], ['Hugging Face', SiHuggingface, '#FFD21E'], ['PyTorch', SiPytorch, '#EE4C2C'], ['CUDA', SiNvidia, '#76B900'],
  ]},
  { group: 'Backend & Infra', Icon: Cpu, blurb: 'Where the work runs', items: [
    ['PostgreSQL', SiPostgresql, '#4169E1'], ['Redis', SiRedis, '#FF4438'], ['Kafka', SiApachekafka, 'currentColor'], ['MongoDB', SiMongodb, '#47A248'],
    ['SQLite', SiSqlite, '#4FA6D8'], ['FastAPI', SiFastapi, '#009688'], ['GraphQL', SiGraphql, '#E10098'], ['Docker', SiDocker, '#2496ED'],
    ['Kubernetes', SiKubernetes, '#326CE5'], ['AWS', FaAws, '#FF9900'], ['Terraform', SiTerraform, '#844FBA'], ['Nginx', SiNginx, '#009639'],
    ['Prometheus', SiPrometheus, '#E6522C'], ['Grafana', SiGrafana, '#F46800'],
  ]},
  { group: 'Frontend', Icon: Layers, blurb: 'The visible layer', items: [
    ['React', SiReact, '#61DAFB'], ['Next.js', SiNextdotjs, 'currentColor'], ['Tailwind', SiTailwindcss, '#06B6D4'],
    ['Framer Motion', SiFramer, '#0055FF'], ['Vite', SiVite, '#646CFF'], ['Vercel', SiVercel, 'currentColor'],
  ]},
  { group: 'Tools', Icon: Wrench, blurb: 'Daily drivers', items: [
    ['Neovim', SiNeovim, '#57A143'], ['VS Code', TbBrandVscode, '#007ACC'], ['JetBrains Mono', SiJetbrains, 'currentColor'], ['WezTerm', SiWezterm, '#4E49EE'],
    ['tmux', SiTmux, '#1BB91F'], ['zsh', SiZsh, '#F15A24'], ['Starship', SiStarship, '#DD0B78'], ['Git', SiGit, '#F05032'],
    ['GitHub', SiGithub, 'currentColor'], ['Linux', SiLinux, '#FCC624'], ['macOS', SiApple, 'currentColor'],
  ]},
]

const all = stack.flatMap((g) => g.items).filter(([n], i, a) => a.findIndex(([m]) => m === n) === i)
const total = stack.reduce((n, g) => n + g.items.length, 0)

function Marquee({ items, reverse = false }: { items: Tech[]; reverse?: boolean }) {
  const row = [...items, ...items]
  return (
    <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
      <motion.div
        className="flex w-max gap-3 py-2"
        animate={{ x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
        transition={{ duration: 60, ease: 'linear', repeat: Infinity }}
      >
        {row.map(([name, Icon, color], i) => (
          <span key={i} className="flex items-center gap-2.5 rounded-full border border-line bg-panel/70 px-4 py-2 text-sm text-mute backdrop-blur">
            <Icon className="h-4 w-4" style={{ color }} aria-hidden />
            {name}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

export default function Uses() {
  const half = Math.ceil(all.length / 2)
  return (
    <Page>
      <section className="px-6 pt-40 md:px-10">
        <Label>Uses</Label>
        <h1 className="mt-4 max-w-6xl font-display text-6xl leading-[0.95] md:text-9xl">
          <SplitReveal text="The kit behind" now /> <span className="italic text-accent"><SplitReveal text="the work." now delay={0.2} /></span>
        </h1>
        <p className="mt-8 max-w-2xl text-xl text-mute">Software, hardware and the coffee setup that gets me through on-call weeks.</p>
      </section>

      <section className="mt-20 space-y-1" aria-hidden>
        <Marquee items={all.slice(0, half)} />
        <Marquee items={all.slice(half)} reverse />
      </section>

      <section className="px-6 pt-24 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Label>Stack</Label>
            <h2 className="mt-3 font-display text-5xl md:text-6xl">
              Languages & <span className="italic text-accent">tooling</span>
            </h2>
          </div>
          <div className="flex gap-8 font-mono text-xs uppercase tracking-widest text-mute">
            <span><span className="block font-display text-4xl normal-case tracking-normal text-fg">{total}</span>technologies</span>
            <span><span className="block font-display text-4xl normal-case tracking-normal text-fg">{stack.length}</span>categories</span>
          </div>
        </div>

        <div className="mt-14 space-y-6">
          {stack.map((g, gi) => (
            <Reveal key={g.group} delay={gi * 0.05}>
              <div className="relative overflow-hidden rounded-3xl border border-line bg-panel/60 p-6 md:p-8">
                <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
                <div className="relative flex items-center gap-4">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl border border-accent/30 bg-accent/10 text-accent">
                    <g.Icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <div>
                    <h3 className="font-display text-3xl leading-none">{g.group}</h3>
                    <p className="mt-1 text-sm text-mute">{g.blurb}</p>
                  </div>
                  <span className="ml-auto rounded-full border border-line px-3 py-1 font-mono text-xs text-mute">{String(g.items.length).padStart(2, '0')}</span>
                </div>

                <ul className="relative mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                  {g.items.map(([name, Icon, color], i) => (
                    <motion.li
                      key={name}
                      initial={{ opacity: 0, y: 14, scale: 0.96 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.45, ease, delay: i * 0.035 }}
                      whileHover={{ y: -4 }}
                      style={{ '--brand': color } as React.CSSProperties}
                      className="group relative isolate flex flex-col items-center gap-3 overflow-hidden rounded-2xl border border-line bg-bg/50 px-3 py-5 text-center transition-colors duration-300 hover:border-[color-mix(in_srgb,var(--brand)_60%,transparent)]"
                    >
                      <span className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100 [background:radial-gradient(120%_80%_at_50%_0%,color-mix(in_srgb,var(--brand)_18%,transparent),transparent_70%)]" />
                      <span className="grid h-14 w-14 place-items-center rounded-2xl bg-[color-mix(in_srgb,var(--brand)_10%,transparent)] ring-1 ring-line transition duration-300 group-hover:scale-110 group-hover:ring-[color-mix(in_srgb,var(--brand)_50%,transparent)] group-hover:[filter:drop-shadow(0_0_14px_color-mix(in_srgb,var(--brand)_45%,transparent))]">
                        <Icon className="h-7 w-7" style={{ color }} aria-hidden />
                      </span>
                      <span className="text-sm text-mute transition-colors group-hover:text-fg">{name}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-6 pt-24 md:px-10">
        <Label>Kit</Label>
      </section>
      <section className="grid gap-6 px-6 pb-24 pt-8 md:grid-cols-2 md:px-10">
        {uses.map((g, gi) => {
          const Icon = icons[g.group] ?? Keyboard
          return (
            <Reveal key={g.group} delay={(gi % 2) * 0.1} className={gi === uses.length - 1 && uses.length % 2 ? 'md:col-span-2' : ''}>
              <TiltCard className="group relative h-full overflow-hidden rounded-3xl border border-line bg-panel p-8 transition-colors hover:border-accent">
                <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-accent/10 blur-3xl" />
                <div className="relative flex items-center gap-4">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl border border-accent/30 bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-bg">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <h2 className="font-display text-3xl">{g.group}</h2>
                  <span className="ml-auto font-mono text-xs text-mute">{String(g.items.length).padStart(2, '0')}</span>
                </div>
                <ul className="relative mt-8 divide-y divide-line">
                  {g.items.map((it, i) => (
                    <motion.li
                      key={it.name}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, ease, delay: i * 0.06 }}
                      className="flex items-baseline justify-between gap-6 py-4"
                    >
                      <span className="text-lg">{it.name}</span>
                      <span className="text-right text-sm text-mute">{it.note}</span>
                    </motion.li>
                  ))}
                </ul>
              </TiltCard>
            </Reveal>
          )
        })}
      </section>
    </Page>
  )
}
