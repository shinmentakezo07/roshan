import { FaGithub, FaLinkedin, FaXTwitter } from 'react-icons/fa6'

const icons = { GitHub: FaGithub, LinkedIn: FaLinkedin, 'X / Twitter': FaXTwitter } as Record<string, typeof FaGithub>

export function SocialIcon({ label, size = 18 }: { label: string; size?: number }) {
  const Icon = icons[label]
  return Icon ? <Icon size={size} /> : null
}
