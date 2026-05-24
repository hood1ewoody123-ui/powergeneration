import Link from 'next/link'
import { SECTION_SHELL } from '@/lib/constants'
import { LEGAL_LINKS, SITE_CONTACTS } from '@/lib/constants'
import { cn } from '@/lib/cn'

const linkClass =
  'text-t-low underline decoration-t-hint underline-offset-2 transition-colors hover:text-t-mid'

export function SiteFooter() {
  return (
    <footer className="border-t border-line/60 bg-bg-0 py-10 md:py-12">
      <div className={cn(SECTION_SHELL, 'flex flex-col gap-4 text-xs leading-relaxed text-t-low')}>
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          <Link href={LEGAL_LINKS.privacy.href} className={linkClass}>
            {LEGAL_LINKS.privacy.label}
          </Link>
          <span className="text-t-hint" aria-hidden>
            ·
          </span>
          <Link href={LEGAL_LINKS.offer.href} className={linkClass}>
            {LEGAL_LINKS.offer.label}
          </Link>
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-1 font-mono tracking-wide">
          <Link href={SITE_CONTACTS.phoneHref} className={linkClass}>
            {SITE_CONTACTS.phone}
          </Link>
          <Link
            href={SITE_CONTACTS.telegramHref}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            {SITE_CONTACTS.telegramHandle}
          </Link>
        </div>
      </div>
    </footer>
  )
}
