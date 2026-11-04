"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { fieldClass, labelClass, useRequest } from "@/components/ownui/useRequest";
import { pillClass } from "@/components/ownui/Pill";
import { GIFT_AMOUNTS } from "@/lib/offers";
import { SITE, whatsappUrl } from "@/lib/site";

export function GiftBuilder() {
  const [amount, setAmount] = useState(100);
  const [recipient, setRecipient] = useState("");
  const [note, setNote] = useState("");
  const { status, send } = useRequest();

  const card = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const tiltX = useSpring(useMotionValue(0), { stiffness: 120, damping: 18 });
  const tiltY = useSpring(useMotionValue(0), { stiffness: 120, damping: 18 });

  const onMove = (event: React.PointerEvent) => {
    if (reduce || !card.current) return;
    const box = card.current.getBoundingClientRect();
    tiltY.set(((event.clientX - box.left) / box.width - 0.5) * 12);
    tiltX.set(((event.clientY - box.top) / box.height - 0.5) * -12);
  };
  const onLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    send({
      type: "gutschein",
      amount,
      recipient: recipient || undefined,
      note: note || undefined,
      name: form.get("name"),
      email: form.get("email"),
      website: form.get("website"),
    });
  };

  return (
    <section className="bg-cream px-5 pb-28 pt-24 md:pb-24 md:pt-32 lg:px-8">
      <div className="mx-auto max-w-[1136px]">
        <h1 className="text-balance text-center font-display text-[clamp(44px,7vw,92px)] leading-[0.98] tracking-[-0.022em] text-charcoal">
          Schenke einen Moment nur für sie.
        </h1>

        <div className="mt-12 grid items-center gap-10 md:mt-16 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <div className="[perspective:1200px]" onPointerMove={onMove} onPointerLeave={onLeave}>
            <motion.div
              ref={card}
              style={{ rotateX: tiltX, rotateY: tiltY }}
              className="mx-auto flex aspect-[8/5] w-full max-w-[620px] flex-col justify-between rounded-[24px] bg-charcoal p-[clamp(22px,4vw,40px)] text-cream shadow-[0_40px_80px_rgba(44,40,38,.32)]"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="font-display text-[clamp(20px,2.4vw,28px)]">GlamBySidorela</span>
                <span className="font-display text-[clamp(34px,5vw,60px)] leading-none text-gold">{amount} €</span>
              </div>
              <div>
                <p className="font-display text-[clamp(26px,3.6vw,44px)] leading-[1.05]">{recipient ? `Für ${recipient}` : "Für dich"}</p>
                <p className="mt-2 min-h-[1.4em] text-[clamp(13px,1.3vw,16px)] text-cream/75">{note || "Für deinen Wohlfühl-Moment"}</p>
              </div>
            </motion.div>
          </div>

          {status === "done" ? (
            <div aria-live="polite">
              <h2 className="font-display text-[44px] leading-[1.02] tracking-[-0.02em] text-charcoal">Danke, deine Bestellung ist da.</h2>
              <p className="mt-3 text-[17px] leading-snug text-charcoal/75">Sidorela meldet sich per E-Mail mit den nächsten Schritten.</p>
            </div>
          ) : (
            <form onSubmit={submit} className="flex flex-col gap-5">
              <fieldset>
                <legend className="mb-2 text-[14px] font-medium text-charcoal">Wert</legend>
                <div className="grid grid-cols-4 gap-2">
                  {GIFT_AMOUNTS.map((value) => (
                    <button
                      key={value}
                      type="button"
                      aria-pressed={value === amount}
                      onClick={() => setAmount(value)}
                      className={`min-h-12 rounded-xl text-[15px] font-medium transition-colors duration-300 ${value === amount ? "bg-charcoal text-cream" : "bg-white text-charcoal"}`}
                    >
                      {value} €
                    </button>
                  ))}
                </div>
              </fieldset>
              <label className={labelClass}>
                Für wen ist er? (optional)
                <input className={fieldClass} maxLength={40} value={recipient} onChange={(e) => setRecipient(e.target.value)} />
              </label>
              <label className={labelClass}>
                Deine Nachricht (optional)
                <input className={fieldClass} maxLength={70} value={note} onChange={(e) => setNote(e.target.value)} />
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className={labelClass}>
                  Dein Name
                  <input className={fieldClass} name="name" required minLength={2} autoComplete="name" />
                </label>
                <label className={labelClass}>
                  Deine E-Mail
                  <input className={fieldClass} name="email" type="email" required autoComplete="email" />
                </label>
              </div>
              <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
              <button type="submit" disabled={status === "sending"} className={pillClass("dark", "w-full disabled:opacity-60")}>
                {status === "sending" ? "Wird gesendet …" : `Gutschein für ${amount} € bestellen`}
              </button>
              <p className="text-[13px] leading-snug text-charcoal/75">Du bezahlst noch nichts. Sidorela schickt dir danach die Zahlungsinfos.</p>
              {status === "error" && (
                <p role="alert" className="text-[14px] text-rose-deep">
                  Das hat nicht geklappt. Schreib bitte an {SITE.email} oder per{" "}
                  <a className="underline" href={whatsappUrl(`Hallo Sidorela, ich möchte einen Gutschein über ${amount} € bestellen.`)}>WhatsApp</a>.
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
