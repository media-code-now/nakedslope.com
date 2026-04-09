'use client';

export default function NewsletterCTA() {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-16">
      <div className="relative rounded-3xl overflow-hidden bg-[var(--accent)] px-6 md:px-16 py-10 md:py-14">
        {/* Background pattern — large faint text */}
        <div
          aria-hidden
          className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none"
        >
          <span
            className="text-[18vw] font-black leading-none text-black/5 whitespace-nowrap"
          >
            NO FLUFF.
          </span>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-black/60 mb-3">
            Weekly gear drop
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-black leading-tight mb-3">
            One email a week.<br />Zero filler.
          </h2>
          <p className="text-black/70 mb-8 text-sm leading-relaxed">
            Best gear finds, honest reviews, and condition alerts for your sport.
            No sponsored content, no daily blasts.
          </p>

          {/* Form — static, wire to Mailchimp/ConvertKit later */}
          <form
            className="flex gap-2 flex-col sm:flex-row"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 bg-black/10 border border-black/20 rounded-xl px-4 py-3 text-sm text-black placeholder:text-black/40 focus:outline-none focus:border-black/40"
            />
            <button
              type="submit"
              className="bg-black text-[var(--accent)] font-bold text-sm px-6 py-3 rounded-xl hover:bg-black/80 transition-colors whitespace-nowrap"
            >
              Subscribe →
            </button>
          </form>

          <p className="text-[10px] text-black/40 mt-3">
            Unsubscribe anytime. No spam. Ever.
          </p>
        </div>
      </div>
    </section>
  );
}
