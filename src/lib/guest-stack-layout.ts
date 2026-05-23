/** Смещение каждого следующего гостя вниз (vh) — ~25% перекрытие */
export const GUEST_LAYER_STEP_VH = 24

/** Хвост после последнего гостя */
export const GUEST_SECTION_TAIL_VH = 56

/** Высота мобильного слота — фигуры по центру экрана */
export const GUEST_MOBILE_SLOT_VH = 88

/** Высота холста со всеми слоями */
export function getGuestCanvasHeightVh(guestCount: number): number {
  const desktop = 100 + Math.max(0, guestCount - 1) * GUEST_LAYER_STEP_VH
  const mobile =
    getGuestNameTopMobileVh(Math.max(0, guestCount - 1)) + GUEST_MOBILE_SLOT_VH
  return Math.max(desktop, mobile)
}

export function getLayerTopVh(stackIndex: number): number {
  return stackIndex * GUEST_LAYER_STEP_VH
}

/** Dias — desktop */
export const GUEST_NAME_TOP_VH = 38

/** Первый гость на mobile — меньше воздуха после текстового блока */
export const GUEST_NAME_TOP_MOBILE_VH = 8

/** Шаг между надписями ниже Dias (+38% к шагу фигур: +20%, затем ещё +15%) */
const GUEST_NAME_STEP_VH = GUEST_LAYER_STEP_VH * 1.38

export function getGuestNameTopVh(index: number): number {
  if (index === 0) return GUEST_NAME_TOP_VH
  return GUEST_NAME_TOP_VH + index * GUEST_NAME_STEP_VH
}

export function getGuestNameTopMobileVh(index: number): number {
  if (index === 0) return GUEST_NAME_TOP_MOBILE_VH
  return GUEST_NAME_TOP_MOBILE_VH + index * GUEST_NAME_STEP_VH
}

/** top имени внутри слоя (vh) */
export function getGuestNameTopInLayerVh(index: number): number {
  return getGuestNameTopVh(index) - getLayerTopVh(index)
}
