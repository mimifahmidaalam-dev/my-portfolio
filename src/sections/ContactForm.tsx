import { zodResolver } from '@hookform/resolvers/zod'
import { AlertCircle, CheckCircle2, Info, Loader2, Send } from 'lucide-react'
import { useState } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { profile } from '../data/profile'
import { sendContactMessage } from '../lib/email'
import { cn } from '../utils/cn'

const contactSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your full name.'),
  email: z.email('Please enter a valid email address.'),
  subject: z.string().trim().min(3, 'The subject must be at least 3 characters.'),
  message: z.string().trim().min(10, 'The message must be at least 10 characters.'),
})

type ContactFormValues = z.infer<typeof contactSchema>

type SendStatus =
  | { kind: 'idle' }
  | { kind: 'success' }
  | { kind: 'error'; message: string }
  | { kind: 'not-configured'; message: string }

const inputClasses = (hasError: boolean) =>
  cn('nb-input', hasError && 'border-red-600 dark:border-red-400')

interface FieldProps {
  id: string
  label: string
  error?: string
  children: React.ReactNode
}

function Field({ id, label, error, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-bold text-ink">
        {label}
      </label>
      {children}
      {error ? (
        <p role="alert" className="text-xs font-bold text-red-600 dark:text-red-400">
          {error}
        </p>
      ) : null}
    </div>
  )
}

/** Contact form with client-side validation, wired to EmailJS. */
export function ContactForm() {
  const [status, setStatus] = useState<SendStatus>({ kind: 'idle' })
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({ resolver: zodResolver(contactSchema), mode: 'onBlur' })

  const onSubmit: SubmitHandler<ContactFormValues> = async (values) => {
    const result = await sendContactMessage({
      from_name: values.name,
      reply_to: values.email,
      subject: values.subject,
      message: values.message,
    })

    if (result.ok) {
      setStatus({ kind: 'success' })
      reset()
    } else if (result.code === 'not-configured') {
      setStatus({ kind: 'not-configured', message: result.message })
    } else {
      setStatus({ kind: 'error', message: result.message })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Full Name" error={errors.name?.message}>
          <input
            id="name"
            type="text"
            autoComplete="name"
            placeholder="Your full name"
            className={inputClasses(Boolean(errors.name))}
            aria-invalid={Boolean(errors.name)}
            {...register('name')}
          />
        </Field>
        <Field id="email" label="Email Address" error={errors.email?.message}>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            className={inputClasses(Boolean(errors.email))}
            aria-invalid={Boolean(errors.email)}
            {...register('email')}
          />
        </Field>
      </div>

      <Field id="subject" label="Subject" error={errors.subject?.message}>
        <input
          id="subject"
          type="text"
          placeholder="What is this about?"
          className={inputClasses(Boolean(errors.subject))}
          aria-invalid={Boolean(errors.subject)}
          {...register('subject')}
        />
      </Field>

      <Field id="message" label="Message" error={errors.message?.message}>
        <textarea
          id="message"
          rows={5}
          placeholder="Write your message — I'd love to hear from you."
          className={cn(inputClasses(Boolean(errors.message)), 'resize-y')}
          aria-invalid={Boolean(errors.message)}
          {...register('message')}
        />
      </Field>

      <button type="submit" disabled={isSubmitting} className="nb-btn w-fit bg-accent-500 px-6 py-3 text-sm text-white">
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Sending…
          </>
        ) : (
          <>
            <Send className="h-4 w-4" aria-hidden="true" />
            Send Message
          </>
        )}
      </button>

      {/* Live status feedback */}
      <div aria-live="polite" className="flex flex-col gap-3">
        {status.kind === 'success' ? (
          <p className="flex items-start gap-2.5 border-[3px] border-ink bg-brand-green px-4 py-3 text-sm font-bold text-black shadow-[4px_4px_0_0_var(--nb-shadow)]">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            Message sent successfully! Thanks for reaching out — I'll get back to you soon.
          </p>
        ) : null}

        {status.kind === 'error' ? (
          <p className="flex items-start gap-2.5 border-[3px] border-ink bg-brand-red px-4 py-3 text-sm font-bold text-black shadow-[4px_4px_0_0_var(--nb-shadow)]">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            {status.message}{' '}
            <a className="underline" href={`mailto:${profile.contact.email}`}>
              Email me directly instead.
            </a>
          </p>
        ) : null}

        {status.kind === 'not-configured' ? (
          <div className="border-[3px] border-ink bg-brand-yellow px-4 py-3 text-sm text-black shadow-[4px_4px_0_0_var(--nb-shadow)]">
            <p className="flex items-start gap-2.5 font-bold">
              <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              {status.message}
            </p>
            <p className="mt-2 pl-6">
              Until then, reach me directly at{' '}
              <a className="underline" href={`mailto:${profile.contact.email}`}>
                {profile.contact.email}
              </a>
              .
            </p>
          </div>
        ) : null}
      </div>
    </form>
  )
}