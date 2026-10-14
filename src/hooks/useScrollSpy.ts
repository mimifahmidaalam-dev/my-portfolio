import { useEffect, useState } from 'react'

/**
 * Highlights the navigation link of the section currently in view.
 * Any element with an `id` and the `data-section` attribute is tracked.
 */
export function useScrollSpy(ids: string[], offset = '-40% 0px -55% 0px') {
  const [activeId, setActiveId] = useState<string>(ids[0] ?? '')

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        }
      },
      { rootMargin: offset },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [ids, offset])

  return activeId
}