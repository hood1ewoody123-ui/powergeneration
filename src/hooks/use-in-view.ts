'use client'

import { useEffect, useRef, useState } from 'react'

export interface UseInViewOptions extends IntersectionObserverInit {
  once?: boolean
}

export function useInView<T extends HTMLElement = HTMLElement>({
  once = false,
  root = null,
  rootMargin = '0px',
  threshold = 0.1,
}: UseInViewOptions = {}) {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setInView(false)
        }
      },
      { root, rootMargin, threshold },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [once, root, rootMargin, threshold])

  return { ref, inView }
}
