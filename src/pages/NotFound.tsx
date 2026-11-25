import { Link } from 'react-router-dom'
import { Page, SplitReveal } from '../components/anim'

export default function NotFound() {
  return (
    <Page>
      <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <h1 className="font-display text-[30vw] leading-none text-accent md:text-[20vw]"><SplitReveal text="404" now /></h1>
        <p className="font-mono text-sm text-mute">segfault: page not found</p>
        <Link to="/" className="link-u mt-8 font-mono text-xs uppercase tracking-widest">← Back home</Link>
      </section>
    </Page>
  )
}
