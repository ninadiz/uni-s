import type { ReactNode } from 'react'

type LegalPageProps = {
  title: string
  intro?: ReactNode
  children: ReactNode
}

/** Shared layout for the text-heavy legal pages (privacy policy, consent). */
function LegalPage({ title, intro, children }: LegalPageProps) {
  return (
    <>
      <section className="bg-menu px-16 md:px-24 pt-24 md:pt-64 pb-24 flex flex-col md:flex-row md:items-end md:justify-between gap-20">
        <h1 className="text-4xl">{title}</h1>
        {intro ? <p className="text-xl-wide max-w-[600px]">{intro}</p> : null}
      </section>

      <section className="mt-60 md:mt-100 mb-100 px-16 md:px-20 lg:px-40">
        <div className="reveal flex flex-col gap-32 md:gap-40 max-w-[860px]">{children}</div>
      </section>
    </>
  )
}

type LegalSectionProps = {
  heading?: string
  children: ReactNode
}

/** A titled block of paragraphs / lists inside a LegalPage. */
export function LegalSection({ heading, children }: LegalSectionProps) {
  return (
    <div className="flex flex-col gap-12 md:gap-15">
      {heading ? <h2 className="text-2xl-7-wide md:text-3xl">{heading}</h2> : null}
      {children}
    </div>
  )
}

/** A body paragraph with the reading-optimised measure used across legal pages. */
export function LegalText({ children }: { children: ReactNode }) {
  return <p className="text-base-wide">{children}</p>
}

/** Muted stacked block for operator contact details / requisites. */
export function LegalContacts({ lines }: { lines: string[] }) {
  return (
    <div className="flex flex-col gap-4 text-base-wide text-black/50">
      {lines.map((line) => (
        <span key={line}>{line}</span>
      ))}
    </div>
  )
}

/** A bulleted list of plain-text items. */
export function LegalList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="text-base-wide flex flex-col gap-8 list-disc pl-20">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  )
}

export default LegalPage
