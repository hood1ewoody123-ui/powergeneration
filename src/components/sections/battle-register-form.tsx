import { BattleRegisterFormClient } from '@/components/sections/battle-register-form-client'
import { CAMP_FORM } from '@/lib/camp-minimal'
import { cn } from '@/lib/cn'

export function BattleRegisterForm() {
  return (
    <section
      id="battle-register"
      className="relative z-20 scroll-mt-20 bg-bg-0 pb-16 md:pb-20"
      aria-labelledby="battle-register-heading"
    >
      <div className="mx-auto w-full max-w-[440px] px-4 sm:px-6 lg:px-10">
        <h2
          id="battle-register-heading"
          className={cn(CAMP_FORM.title, 'text-center')}
        >
          battle registration
        </h2>
        <div className="mt-10 w-full">
          <BattleRegisterFormClient />
        </div>
      </div>
    </section>
  )
}
