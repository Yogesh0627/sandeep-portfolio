'use client'

import * as React from 'react'
import { toast } from 'sonner'
import { Mail, MapPin, Send, CheckCircle2 } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Label } from '../ui/label'
import { profile } from '@/lib/data'
import { cn } from '@/lib/utils'

type Errors = { name?: string; email?: string; message?: string }

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(values: { name: string; email: string; message: string }): Errors {
  const errors: Errors = {}
  if (!values.name.trim()) errors.name = 'Please enter your name.'
  else if (values.name.trim().length < 2) errors.name = 'Name looks too short.'

  if (!values.email.trim()) errors.email = 'Please enter your email.'
  else if (!EMAIL_RE.test(values.email.trim())) errors.email = 'Enter a valid email address.'

  if (!values.message.trim()) errors.message = 'Please write a message.'
  else if (values.message.trim().length < 10)
    errors.message = 'Message should be at least 10 characters.'

  return errors
}

export function Contact() {
  const [sent, setSent] = React.useState(false)
  const [errors, setErrors] = React.useState<Errors>({})

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const values = {
      name: String(data.get('name') || ''),
      email: String(data.get('email') || ''),
      message: String(data.get('message') || ''),
    }

    const found = validate(values)
    setErrors(found)

    if (Object.keys(found).length > 0) {
      toast.error('Please fix the highlighted fields', {
        description: 'A few details are missing or invalid.',
      })
      return
    }

    // Compose a prefilled email to Sandeep (no backend / secrets required).
    const subject = encodeURIComponent(`Portfolio enquiry from ${values.name}`)
    const body = encodeURIComponent(
      `${values.message}\n\n— ${values.name}\nReply-to: ${values.email}`
    )
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`

    toast.success('Opening your email app…', {
      description: `Your message to ${profile.name} is ready to send.`,
    })
    setSent(true)
    form.reset()
  }

  function clearError(field: keyof Errors) {
    setErrors((prev) => {
      if (!prev[field]) return prev
      const next = { ...prev }
      delete next[field]
      return next
    })
  }

  return (
    <section id="contact" className="section">
      <div className="container-tight">
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
          <div className="grid md:grid-cols-[1fr_1.2fr]">
            {/* left: info */}
            <div className="relative bg-primary p-8 text-primary-foreground md:p-10">
              <div className="grid-bg pointer-events-none absolute inset-0 opacity-20" />
              <div className="relative">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-on-primary-accent">
                  Let&rsquo;s connect
                </span>
                <h2 className="mt-3 font-serif text-3xl font-semibold">
                  Ready to discuss your next opportunity
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-primary-foreground/80">
                  Whether it&rsquo;s a finance leadership role, a dealer partnership, or a quick
                  question — I&rsquo;d be glad to hear from you.
                </p>

                <div className="mt-8 space-y-4">
                  <a
                    href={`mailto:${profile.email}`}
                    className="flex items-center gap-3 text-sm transition-opacity hover:opacity-80"
                  >
                    <span className="grid h-10 w-10 place-items-center rounded-md bg-white/10">
                      <Mail className="size-5" />
                    </span>
                    <span>
                      <span className="block text-xs text-primary-foreground/60">Email</span>
                      {profile.email}
                    </span>
                  </a>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="grid h-10 w-10 place-items-center rounded-md bg-white/10">
                      <MapPin className="size-5" />
                    </span>
                    <span>
                      <span className="block text-xs text-primary-foreground/60">Location</span>
                      {profile.location}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* right: form */}
            <div className="p-8 md:p-10">
              {sent ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <CheckCircle2 className="size-12 text-accent" />
                  <h3 className="mt-4 font-serif text-xl font-semibold">
                    Your email is ready to send
                  </h3>
                  <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                    We&rsquo;ve opened your mail app with the message pre-filled. If it didn&rsquo;t
                    open, email directly at{' '}
                    <a
                      href={`mailto:${profile.email}`}
                      className="font-medium text-accent underline-offset-4 hover:underline"
                    >
                      {profile.email}
                    </a>
                    .
                  </p>
                  <Button variant="outline" className="mt-6" onClick={() => setSent(false)}>
                    Send another message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <Field
                    id="name"
                    label="Name"
                    error={errors.name}
                    onInput={() => clearError('name')}
                    placeholder="Your name"
                  />
                  <Field
                    id="email"
                    label="Email"
                    type="email"
                    error={errors.email}
                    onInput={() => clearError('email')}
                    placeholder="you@example.com"
                  />
                  <div className="space-y-1.5">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      aria-invalid={!!errors.message}
                      onInput={() => clearError('message')}
                      className={cn(errors.message && 'border-red-500 focus-visible:ring-red-500')}
                      placeholder="How can I help?"
                    />
                    {errors.message && (
                      <p className="text-xs font-medium text-red-500">{errors.message}</p>
                    )}
                  </div>
                  <Button type="submit" className="w-full" size="lg">
                    <Send className="size-4" /> Send message
                  </Button>
                  <p className="text-center text-xs text-muted-foreground">
                    Opens your email app — no data is stored on this site.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Field({
  id,
  label,
  error,
  type = 'text',
  placeholder,
  onInput,
}: {
  id: string
  label: string
  error?: string
  type?: string
  placeholder?: string
  onInput?: () => void
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        aria-invalid={!!error}
        onInput={onInput}
        className={cn(error && 'border-red-500 focus-visible:ring-red-500')}
      />
      {error && <p className="text-xs font-medium text-red-500">{error}</p>}
    </div>
  )
}
