import { RegisterFormClient } from '@/components/sections/register-form-client'
import { CAMP_FORM } from '@/lib/camp-minimal'
import { cn } from '@/lib/cn'
import { REGISTER_META, SECTION_TITLES } from '@/lib/constants'

const guestMetaClass =
  'mt-6 font-display text-[clamp(0.7rem,2.2vw,1rem)] font-extrabold leading-tight tracking-[0.08em] text-brand uppercase'

export function RegisterForm() {
  return (
    <section
      id="register"
      className="relative z-20 scroll-mt-20 overflow-visible bg-bg-0 py-20 md:py-28"
      aria-labelledby="register-heading"
    >
      <div className="mx-auto flex w-full max-w-[440px] flex-col items-center px-4 text-center sm:px-6">
        <h2 id="register-heading" className={CAMP_FORM.title}>
          {SECTION_TITLES.registration}
        </h2>
        <p className={guestMetaClass}>{REGISTER_META}</p>
        <div className={cn('mt-10 w-full text-left')}>
          <RegisterFormClient />
        </div>
      </div>
    </section>
  )
}
