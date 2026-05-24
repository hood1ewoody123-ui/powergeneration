import { CAMP_FORM } from '@/lib/camp-minimal'
import { cn } from '@/lib/cn'
import { SECTION_SHELL } from '@/lib/constants'

export function BattleInfo() {
  return (
    <section
      className="relative z-20 bg-bg-0 pb-10 md:pb-14"
      aria-labelledby="battle-info-heading"
    >
      <div className={cn(SECTION_SHELL, 'max-w-2xl')}>
        <p
          id="battle-info-heading"
          className={cn(CAMP_FORM.monoBright, 'text-base md:text-lg')}
        >
          Участие в любой номинации — 1&nbsp;500&nbsp;₽
        </p>

        <p className={cn(CAMP_FORM.consent, 'mt-6 normal-case')}>
          Крутые призы от организаторов. Главный приз в номинации 2×2 — путёвка
          на баттл во Францию,{' '}
          <span className="text-t-high">Pessac Battle Arena</span>.
        </p>

        <p className={cn(CAMP_FORM.consent, 'mt-4 normal-case')}>
          Судья — легендарный b-boy{' '}
          <span className="font-medium text-t-high">Dias Predatorz</span>,
          прямиком из Казахстана.
        </p>
      </div>
    </section>
  )
}
