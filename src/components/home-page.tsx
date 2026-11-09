import { useMemo, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Atelier } from "@/components/atelier";
import { faqs, inr, lines, projects, studio, type Line } from "@/data/studio";

const nav = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#pricing", label: "Pricing" },
  { href: "#studio", label: "Studio" },
];

const ribbon = [
  "Shopify",
  "WooCommerce",
  "Custom code",
  "Hybrid apps",
  "UPI & COD",
  "GST invoices",
  "Founder-led",
  "Raipur",
];

function currentTier(line: Line, platformId: string, tierId: string) {
  const platform = line.platforms.find((p) => p.id === platformId) ?? line.platforms[0];
  const tier = platform.tiers.find((t) => t.id === tierId) ?? platform.tiers[0];
  return { platform, tier };
}

export function HomePage() {
  const [open, setOpen] = useState(false);
  const [lineId, setLineId] = useState(lines[0].id);
  const [platformId, setPlatformId] = useState(lines[0].platforms[0].id);
  const [tierId, setTierId] = useState<"basic" | "advanced">("basic");
  const [name, setName] = useState("");
  const [business, setBusiness] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");

  const line = lines.find((item) => item.id === lineId) ?? lines[0];
  const selection = useMemo(
    () => currentTier(line, platformId, tierId),
    [line, platformId, tierId],
  );

  function pickLine(next: Line) {
    setLineId(next.id);
    setPlatformId(next.platforms[0].id);
    setTierId("basic");
    setError("");
  }

  function brief() {
    return [
      `Hello Rahul, I'm ${name.trim() || "a visitor"}`,
      business.trim() ? `from ${business.trim()}` : "",
      `. I'd like a quote for ${line.title} — ${selection.platform.label}, ${selection.tier.label} (${inr(selection.tier.price)}, ${selection.tier.delivery}).`,
      note.trim() ? ` Note: ${note.trim()}` : "",
    ].join("");
  }

  function send(kind: "whatsapp" | "email") {
    if (name.trim().length < 2) {
      setError("Add your name so Rahul knows who to reply to.");
      return;
    }
    setError("");
    const text = brief();
    if (kind === "whatsapp") {
      window.open(`https://wa.me/${studio.whatsapp}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
      return;
    }
    window.location.href = `mailto:${studio.email}?subject=${encodeURIComponent(`Quote: ${line.title} · ${selection.tier.label}`)}&body=${encodeURIComponent(text)}`;
  }

  return (
    <div className="bg-ink text-fg">
      <header className="fixed inset-x-0 top-0 z-30 border-b border-line/80 bg-ink/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <a href="#top" className="flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-full border border-copper text-copper">
              <span className="display text-lg leading-none">D</span>
            </span>
            <span className="leading-tight">
              <span className="block text-sm font-medium tracking-wide">Dadsena</span>
              <span className="block text-xs text-muted">Technologies</span>
            </span>
          </a>
          <nav className="hidden items-center gap-7 md:flex">
            {nav.map((item) => (
              <a key={item.href} href={item.href} className="text-sm text-muted transition-colors hover:text-fg">
                {item.label}
              </a>
            ))}
            <a
              href="#pricing"
              className="rounded-full bg-copper px-4 py-2 text-sm font-medium text-ink transition-transform duration-150 ease-out active:scale-[0.96]"
            >
              Start a project
            </a>
          </nav>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-full border border-line md:hidden"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
        {open ? (
          <div className="border-t border-line px-5 py-4 md:hidden">
            <div className="flex flex-col gap-1">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-3 text-base"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#pricing"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-full bg-copper px-4 py-3 text-center text-sm font-medium text-ink"
              >
                Start a project
              </a>
            </div>
          </div>
        ) : null}
      </header>

      <main id="top">
        <section className="grid min-h-svh md:grid-cols-2">
          <div className="order-2 flex flex-col justify-center bg-ink px-5 pt-10 pb-14 md:order-1 md:px-10 md:pt-28">
            <p className="reveal text-xs font-medium tracking-widest text-copper uppercase">
              Raipur studio · Est. 2025
            </p>
            <h1 className="display reveal mt-4 max-w-xl text-5xl text-paper sm:text-6xl">
              Stores and studio sites, built to be kept.
            </h1>
            <p className="reveal mt-6 max-w-md text-lg text-sand">
              Managed Shopify and WordPress from {inr(15000)}. Custom-coded sites from {inr(25000)}. Hybrid apps from {inr(35000)}. You work with {studio.founder}, not a handoff chain.
            </p>
            <div className="reveal mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#pricing"
                className="rounded-full bg-copper px-6 py-3 text-center text-sm font-medium text-ink transition-transform duration-150 ease-out active:scale-[0.96]"
              >
                Price a project
              </a>
              <a
                href="#work"
                className="rounded-full border border-line px-6 py-3 text-center text-sm text-paper"
              >
                See the work
              </a>
            </div>
            <dl className="reveal mt-10 grid grid-cols-3 gap-4 border-t border-line pt-5 text-sm">
              <div>
                <dt className="text-muted">To start</dt>
                <dd className="mt-1 font-medium">40%</dd>
              </div>
              <div>
                <dt className="text-muted">Before live</dt>
                <dd className="mt-1 font-medium">30%</dd>
              </div>
              <div>
                <dt className="text-muted">After changes</dt>
                <dd className="mt-1 font-medium">30%</dd>
              </div>
            </dl>
          </div>
          <div className="relative order-1 h-96 md:order-2 md:h-auto md:min-h-svh">
            <Atelier />
          </div>
        </section>

        <div className="overflow-hidden border-y border-line bg-ink-2">
          <div className="marquee-track flex w-max gap-10 py-4">
            {[...ribbon, ...ribbon].map((item, i) => (
              <span key={`${item}-${i}`} className="text-sm tracking-wide text-muted">
                {item}
              </span>
            ))}
          </div>
        </div>

        <section id="services" className="scroll-mt-24 bg-paper text-ink">
          <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="text-xs font-medium tracking-widest text-copper uppercase">Services</p>
                <h2 className="display mt-3 max-w-xl text-4xl md:text-6xl">Four ways to commission a build.</h2>
              </div>
              <p className="max-w-sm text-base text-ink/70">
                Fees below are the project price before GST. 18% GST is added on the invoice, and registered businesses can claim it back.
              </p>
            </div>
            <div className="mt-14 divide-y divide-ink/10 border-y border-ink/10">
              {lines.map((item) => (
                <article key={item.id} className="grid gap-6 py-10 md:grid-cols-12 md:gap-10">
                  <p className="display text-3xl text-copper md:col-span-1">{item.index}</p>
                  <div className="md:col-span-5">
                    <h3 className="display text-3xl md:text-4xl">{item.title}</h3>
                    <p className="mt-4 max-w-md text-base leading-relaxed text-ink/70">{item.lede}</p>
                  </div>
                  <ul className="flex flex-col gap-3 md:col-span-6">
                    {item.platforms.flatMap((platform) =>
                      platform.tiers.map((tier) => (
                        <li
                          key={`${platform.id}-${tier.id}`}
                          className="flex items-baseline justify-between gap-4 border-b border-ink/10 pb-3"
                        >
                          <span>
                            <span className="font-medium">{platform.label}</span>
                            <span className="text-ink/60"> · {tier.label}</span>
                          </span>
                          <span className="shrink-0 text-right">
                            <span className="block font-medium tabular-nums">{inr(tier.price)}</span>
                            <span className="block text-sm text-ink/60">{tier.delivery}</span>
                          </span>
                        </li>
                      )),
                    )}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="scroll-mt-24">
          <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 md:grid-cols-12 md:py-28">
            <div className="md:col-span-5">
              <p className="text-xs font-medium tracking-widest text-copper uppercase">Quote</p>
              <h2 className="display mt-3 text-4xl md:text-6xl">Pick a scope. Send it to Rahul.</h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-muted">
                Choose the line of work, the platform, and the tier. The brief opens in WhatsApp or email with the price already written in.
              </p>
              <div className="mt-8 flex flex-col gap-2">
                {lines.map((item) => {
                  const active = item.id === line.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => pickLine(item)}
                      className={`rounded-2xl border px-4 py-4 text-left transition-colors ${
                        active ? "border-copper bg-ink-2" : "border-line hover:border-muted"
                      }`}
                    >
                      <span className="text-xs text-copper">{item.index}</span>
                      <span className="mt-1 block text-lg font-medium">{item.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="rounded-3xl border border-line bg-ink-2 p-5 md:col-span-7 md:p-8">
              <div className="flex flex-wrap gap-2">
                {line.platforms.map((platform) => (
                  <button
                    key={platform.id}
                    type="button"
                    onClick={() => setPlatformId(platform.id)}
                    className={`rounded-full px-4 py-2 text-sm transition-colors ${
                      selection.platform.id === platform.id ? "bg-paper text-ink" : "border border-line text-muted"
                    }`}
                  >
                    {platform.label}
                  </button>
                ))}
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {selection.platform.tiers.map((tier) => (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => setTierId(tier.id)}
                    className={`rounded-2xl border px-4 py-4 text-left ${
                      selection.tier.id === tier.id ? "border-copper" : "border-line"
                    }`}
                  >
                    <span className="block text-sm text-muted">{tier.label}</span>
                    <span className="display mt-1 block text-2xl md:text-3xl">{inr(tier.price)}</span>
                    <span className="mt-1 block text-sm text-sand">{tier.delivery}</span>
                  </button>
                ))}
              </div>
              <p className="mt-5 text-base text-sand">{selection.tier.blurb}</p>
              <ul className="mt-4 flex flex-col gap-2 text-sm text-muted">
                {selection.tier.points.map((point) => (
                  <li key={point} className="flex gap-3">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-copper" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <form
                className="mt-8 grid gap-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  send("whatsapp");
                }}
              >
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="grid gap-1 text-sm">
                    <span className="text-muted">Name</span>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="rounded-xl border border-line bg-ink px-3 py-3 text-fg outline-none focus:border-copper"
                      autoComplete="name"
                    />
                  </label>
                  <label className="grid gap-1 text-sm">
                    <span className="text-muted">Business</span>
                    <input
                      value={business}
                      onChange={(e) => setBusiness(e.target.value)}
                      className="rounded-xl border border-line bg-ink px-3 py-3 text-fg outline-none focus:border-copper"
                    />
                  </label>
                </div>
                <label className="grid gap-1 text-sm">
                  <span className="text-muted">What should the site do?</span>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows={3}
                    className="resize-none rounded-xl border border-line bg-ink px-3 py-3 text-fg outline-none focus:border-copper"
                  />
                </label>
                {error ? <p className="text-sm text-copper">{error}</p> : null}
                <div className="flex flex-col gap-2 sm:flex-row">
                  <button
                    type="submit"
                    className="rounded-full bg-copper px-5 py-3 text-sm font-medium text-ink transition-transform duration-150 ease-out active:scale-[0.96]"
                  >
                    Send on WhatsApp
                  </button>
                  <button
                    type="button"
                    onClick={() => send("email")}
                    className="rounded-full border border-line px-5 py-3 text-sm text-paper"
                  >
                    Email the brief
                  </button>
                </div>
                <p className="text-xs text-muted">
                  {inr(selection.tier.price)} before GST · {selection.tier.delivery}. 40% to start, 30% before live, 30% after the follow-up changes. Nothing is charged from this page.
                </p>
              </form>
            </div>
          </div>
        </section>

        <section id="work" className="scroll-mt-24 border-t border-line">
          <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
            <p className="text-xs font-medium tracking-widest text-copper uppercase">Selected work</p>
            <h2 className="display mt-3 max-w-xl text-4xl md:text-6xl">Sites already in the wild.</h2>
            <div className="mt-12 grid gap-4 md:grid-cols-2">
              {projects.map((project) => (
                <article
                  key={project.name}
                  className={`flex flex-col justify-between rounded-3xl border border-line bg-ink-2 p-6 md:p-8 ${
                    project.featured ? "md:col-span-2 md:min-h-80" : "min-h-72"
                  }`}
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-2 text-xs tracking-wide text-copper uppercase">
                      <span>{project.kind}</span>
                      <span className="text-line">/</span>
                      <span>{project.tier}</span>
                      <span className="text-line">/</span>
                      <span>{project.place}</span>
                    </div>
                    <h3 className={`display mt-4 ${project.featured ? "text-4xl md:text-6xl" : "text-3xl"}`}>
                      {project.name}
                    </h3>
                    <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">{project.summary}</p>
                  </div>
                  <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                    <ul className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <li key={tag} className="rounded-full border border-line px-3 py-1 text-xs text-sand">
                          {tag}
                        </li>
                      ))}
                    </ul>
                    {project.href ? (
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-sm font-medium text-paper"
                      >
                        Visit site
                        <ArrowUpRight className="size-4" />
                      </a>
                    ) : (
                      <span className="text-sm text-muted">Studio case</span>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="studio" className="scroll-mt-24 bg-paper text-ink">
          <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 md:grid-cols-12 md:py-28">
            <div className="md:col-span-6">
              <p className="text-xs font-medium tracking-widest text-copper uppercase">Studio</p>
              <h2 className="display mt-3 text-4xl md:text-6xl">One engineer. A registered company.</h2>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-ink/75">
                {studio.legalName} is led by {studio.founder}. Briefs, builds, and launch calls stay with him. The studio is in Raipur, and the work ships across India and abroad.
              </p>
              <ol className="mt-10 flex flex-col gap-6">
                {[
                  ["01", "Start", "Scope and price are fixed on a short call. 40% starts the build."],
                  ["02", "Final preview", "You review the finished site before it goes live. 30% is due here."],
                  ["03", "Live, then changes", "The last 30% is due after the site is live and the follow-up changes are done."],
                ].map(([n, title, copy]) => (
                  <li key={n} className="grid grid-cols-[auto_1fr] gap-4">
                    <span className="display text-2xl text-copper">{n}</span>
                    <div>
                      <h3 className="text-lg font-medium">{title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-ink/70">{copy}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div className="flex flex-col justify-between rounded-3xl bg-ink p-6 text-fg md:col-span-6 md:p-8">
              <div>
                <p className="text-xs tracking-widest text-copper uppercase">{studio.role}</p>
                <p className="display mt-3 text-4xl">{studio.founder}</p>
                <dl className="mt-8 grid gap-4 text-sm">
                  <div>
                    <dt className="text-muted">Studio</dt>
                    <dd className="mt-1">{studio.address}</dd>
                    <dd>{studio.region}</dd>
                  </div>
                  <div>
                    <dt className="text-muted">Hours</dt>
                    <dd className="mt-1">{studio.hours}</dd>
                  </div>
                  <div>
                    <dt className="text-muted">GSTIN</dt>
                    <dd className="mt-1 tabular-nums">{studio.gstin}</dd>
                  </div>
                  <div>
                    <dt className="text-muted">CIN</dt>
                    <dd className="mt-1">{studio.cin}</dd>
                  </div>
                </dl>
              </div>
              <div className="mt-10 flex flex-col gap-2 sm:flex-row">
                <a href={`tel:${studio.phoneHref}`} className="rounded-full bg-copper px-5 py-3 text-center text-sm font-medium text-ink">
                  {studio.phone}
                </a>
                <a href={`mailto:${studio.email}`} className="rounded-full border border-line px-5 py-3 text-center text-sm">
                  {studio.email}
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="questions" className="scroll-mt-24">
          <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
            <h2 className="display text-4xl md:text-5xl">Before you write.</h2>
            <div className="mt-8 divide-y divide-line border-y border-line">
              {faqs.map((item) => (
                <details key={item.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-medium">
                    {item.q}
                    <span className="text-copper transition-transform duration-200 group-open:rotate-45">+</span>
                  </summary>
                  <p className="max-w-2xl pt-3 text-base leading-relaxed text-muted">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer id="contact" className="scroll-mt-24 border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-12 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="display text-3xl">Let’s build the site.</p>
            <p className="mt-3 max-w-md text-sm text-muted">
              {studio.legalName}. SAC {studio.sac}. WhatsApp, phone, or the quote above.
            </p>
          </div>
          <a
            href={`https://wa.me/${studio.whatsapp}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-copper"
          >
            Message on WhatsApp
            <ArrowUpRight className="size-4" />
          </a>
        </div>
      </footer>
    </div>
  );
}
