import { Mail } from 'lucide-react'
import { socialLinks } from '../data/profile'
import type { SocialLinkItem } from '../types/profile'
import { cn } from '../utils/cn'
import { GitHubIcon, LinkedInIcon } from './BrandIcons'

interface SocialLinksProps {
  links?: SocialLinkItem[]
  className?: string
  /** 'icon' (square icon buttons) or 'row' (text + icon). */
  variant?: 'icon' | 'row'
  size?: 'sm' | 'md'
}

const iconMap: Record<string, typeof Mail> = {
  github: GitHubIcon as typeof Mail,
  linkedin: LinkedInIcon as typeof Mail,
  email: Mail,
}

function matchUrl(kind: string, href: string) {
  if (kind === 'email') return href.startsWith('mailto:') ? href : `mailto:${href}`
  return href
}

/** Social buttons (GitHub, LinkedIn, Email) used in the hero and footer. */
export function SocialLinks({ links = socialLinks, className, variant = 'icon', size = 'md' }: SocialLinksProps) {
  const isIcon = variant === 'icon'
  const box = size === 'sm' ? 'h-10 w-10' : 'h-12 w-12'
  const icon = size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'

  return (
    <ul className={cn('flex items-center gap-3', className)}>
      {links.map((link) => {
        const Icon = iconMap[link.id] ?? Mail
        return (
          <li key={link.id}>
            <a
              href={matchUrl(link.id, link.href)}
              target={link.id === 'email' ? undefined : '_blank'}
              rel={link.id === 'email' ? undefined : 'noopener noreferrer'}
              aria-label={link.label}
              title={link.label}
              className={cn(
                isIcon
                  ? cn(box, 'nb-btn p-0')
                  : 'nb-tag gap-2 bg-surface px-3 py-1.5 text-sm text-ink transition hover:bg-brand-yellow hover:text-black',
              )}
            >
              <Icon className={cn(isIcon ? icon : 'h-4 w-4')} />
              {!isIcon ? <span>{link.label}</span> : null}
            </a>
          </li>
        )
      })}
    </ul>
  )
}