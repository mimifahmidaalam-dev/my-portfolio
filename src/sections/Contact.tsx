import { Mail, MapPin } from 'lucide-react'
import { ContactForm } from './ContactForm'
import { SectionHeading } from '../components/SectionHeading'
import { SocialLinks } from '../components/SocialLinks'
import { profile } from '../data/profile'

/** Contact — contact details, socials and the validated message form. */
export function Contact() {
  return (
    <section id="contact" data-section className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something together"
          description="Open to internships, junior developer roles, and friendly questions about my projects."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
          {/* Contact info */}
          <div className="flex flex-col gap-6">
            <div className="nb-card flex items-center gap-4 p-5">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center border-[3px] border-ink bg-brand-cyan text-black shadow-[4px_4px_0_0_var(--nb-shadow)]">
                <Mail className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs font-bold tracking-widest text-ink/50 uppercase">Email</p>
                <a
                  href={`mailto:${profile.contact.email}`}
                  className="text-sm font-bold text-ink hover:text-accent-600 dark:hover:text-accent-300"
                >
                  {profile.contact.email}
                </a>
              </div>
            </div>

            <div className="nb-card flex items-center gap-4 p-5">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center border-[3px] border-ink bg-brand-yellow text-black shadow-[4px_4px_0_0_var(--nb-shadow)]">
                <MapPin className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs font-bold tracking-widest text-ink/50 uppercase">Location</p>
                <p className="text-sm font-bold text-ink">{profile.contact.location}</p>
              </div>
            </div>

            <div className="nb-card flex flex-col gap-3 p-5">
              <p className="text-xs font-bold tracking-widest text-ink/50 uppercase">Follow me</p>
              <SocialLinks variant="row" />
            </div>

            <p className="text-sm leading-relaxed text-ink/70">
              Prefer direct email? Write to me at{' '}
              <a
                href={`mailto:${profile.contact.email}`}
                className="font-bold text-accent-600 hover:underline dark:text-accent-300"
              >
                {profile.contact.email}
              </a>{' '}
              — I usually reply within a couple of days.
            </p>
          </div>

          {/* Form */}
          <div className="nb-card p-6 sm:p-8">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}