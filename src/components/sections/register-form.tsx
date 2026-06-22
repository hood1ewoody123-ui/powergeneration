import { RegisterFormClient } from '@/components/sections/register-form-client'
import { CAMP_FORM, CAMP_PANEL, CampPanel } from '@/lib/camp-minimal'
import { cn } from '@/lib/cn'
import { REGISTER_META, SECTION_SHELL, SECTION_TITLES } from '@/lib/constants'

const guestMetaClass =
  'mt-4 font-display text-[clamp(0.7rem,2.2vw,1rem)] font-extrabold leading-tight tracking-[0.08em] text-brand uppercase'

export function RegisterForm() {
  return (
    <section
      id="register"
      className={cn(
        'relative z-20 scroll-mt-20 overflow-visible bg-bg-0',
        CAMP_PANEL.section,
      )}
      aria-labelledby="register-heading"
    >
      <div className={cn(SECTION_SHELL, 'flex justify-center')}>
        <CampPanel variant="brand" className="w-full max-w-[520px]">
          <div className={cn(CAMP_PANEL.inner, 'text-center')}>
            <h2 id="register-heading" className={CAMP_FORM.title}>
              {SECTION_TITLES.registration}
            </h2>
            <p className={guestMetaClass}>{REGISTER_META}</p>
            <div className="mt-8 w-full text-left">
              <RegisterFormClient />
            </div>
          </div>
        </CampPanel>
      </div>
    </section>
  )
}
