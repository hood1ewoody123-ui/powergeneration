/** Оптимизированные ассеты в `public/assets` */

export const ASSETS = {
  logo: '/assets/images/logo.svg',
  /** Широкий баннер Muta Born — full bleed под FAQ */
  mainMuta: '/assets/images/desk-muta.webp',
  deskMuta: '/assets/images/desk-muta.webp',
  guests: {
    dias: '/assets/images/guests/dias.webp',
    diasFreeze: '/assets/images/guests/dias-freeze.webp',
    explosion: '/assets/images/guests/explosion.webp',
    explosionFreeze: '/assets/images/guests/explosion-freeze.webp',
    gekkon: '/assets/images/guests/gekkon.webp',
    gekkonFreeze: '/assets/images/guests/gekkon-freeze.webp',
    joker: '/assets/images/guests/joker.webp',
    jokerFreeze: '/assets/images/guests/joker-freeze.webp',
    tiger: '/assets/images/guests/tiger.webp',
    tigerFreeze: '/assets/images/guests/tiger-freeze.webp',
  },
  archive: {
    photo01: '/assets/images/archive/photo-01.jpg',
    photo02: '/assets/images/archive/photo-02.jpg',
    photo03: '/assets/images/archive/photo-03.jpg',
    photo04: '/assets/images/archive/photo-04.jpg',
    photo05: '/assets/images/archive/photo-05.jpg',
  },
  video: {
    mainDesk: '/assets/video/main-desk.mp4',
    mainMob: '/assets/video/main-mob.mp4',
    battle: '/assets/video/video-battle.mp4',
    posters: {
      mainDesk: '/assets/video/posters/main-desk.webp',
      mainMob: '/assets/video/posters/main-mob.webp',
      battle: '/assets/video/posters/video-battle.webp',
    },
  },
} as const
