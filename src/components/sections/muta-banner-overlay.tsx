import { ASSETS } from '@/lib/assets'

const MUTA_WIDTH = 5160
const MUTA_HEIGHT = 1853

/**
 * Декоративный баннер: фон на всю ширину viewport, без обрезки layout-ом.
 * Высота слота = пропорции файла; картинка чуть крупнее слота (−4% inset), чтобы края не «съедались».
 */
export function MutaBannerOverlay() {
  const aspectPercent = (MUTA_HEIGHT / MUTA_WIDTH) * 100

  return (
    <div
      className="pointer-events-none relative z-[1] w-full overflow-visible select-none"
      aria-label="Muta Born Battle"
      role="img"
    >
      <div
        className="relative left-1/2 w-screen -translate-x-1/2 overflow-visible"
        style={{ width: '100vw' }}
      >
        <div
          className="relative w-full overflow-visible"
          style={{ paddingTop: `${aspectPercent}%` }}
        >
          <div
            className="absolute inset-0 overflow-visible"
            style={{
              top: '-5%',
              right: 0,
              bottom: '-5%',
              left: 0,
              height: '110%',
            }}
          >
            <img
              src={ASSETS.mainMuta}
              alt=""
              width={MUTA_WIDTH}
              height={MUTA_HEIGHT}
              className="block h-full w-full object-contain object-center"
              decoding="async"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
