"use client";

import { useState } from "react";
import { Pill } from "@/components/ownui/Pill";
import { BERATUNG_HREF, QUIZ_QUESTIONS as BASE, quizResult } from "@/lib/offers";
import type { PageTexts } from "@/lib/texts";

type QuizServices = Record<string, { title: string; from: number; why: string }>;

export function BeautyCheck({ t, services }: { t: PageTexts["beautyCheck"]; services: QuizServices }) {
  const [answers, setAnswers] = useState<string[]>([]);
  const copy = [t.q1, t.q2, t.q3] as Record<string, string>[];
  const QUIZ_QUESTIONS = BASE.map((entry, index) => ({
    key: entry.key,
    question: copy[index].question,
    answers: entry.answers.map((answer, answerIndex) => ({ value: answer.value, label: copy[index][`a${answerIndex + 1}`] })),
  }));
  const step = answers.length;
  const question = QUIZ_QUESTIONS[step];
  const slug = step === QUIZ_QUESTIONS.length ? quizResult(answers[0], answers[1], answers[2]) : null;
  const result = slug && services[slug] ? { slug, ...services[slug] } : null;

  return (
    <section className="flex min-h-svh flex-col justify-center bg-cream px-5 pb-28 pt-24 md:pb-16">
      <div className="mx-auto w-full max-w-[860px]">
          {question ? (
            <div key={question.key} className="step-in">
              <div className="flex gap-1.5" role="progressbar" aria-valuemin={1} aria-valuemax={3} aria-valuenow={step + 1} aria-label="Fortschritt">
                {QUIZ_QUESTIONS.map((q, i) => (
                  <span key={q.key} className={`h-[3px] flex-1 rounded-full transition-colors duration-500 ${i <= step ? "bg-charcoal" : "bg-charcoal/15"}`} />
                ))}
              </div>
              <h1 className="mt-10 text-balance font-display text-[clamp(40px,6vw,76px)] leading-[1] tracking-[-0.022em] text-charcoal">{question.question}</h1>
              <div className="mt-9 flex flex-col gap-2">
                {question.answers.map((answer) => (
                  <button
                    key={answer.value}
                    type="button"
                    onClick={() => setAnswers([...answers, answer.value])}
                    className="min-h-16 rounded-2xl bg-white px-6 text-left text-[17px] text-charcoal transition-colors duration-300 hover:bg-charcoal hover:text-cream"
                  >
                    {answer.label}
                  </button>
                ))}
              </div>
              {step > 0 && (
                <button type="button" onClick={() => setAnswers(answers.slice(0, -1))} className="mt-4 min-h-11 text-[15px] text-charcoal/75 underline underline-offset-4">
                  Zurück
                </button>
              )}
            </div>
          ) : result ? (
            <div key="result" className="step-in" aria-live="polite">
              <p className="text-[17px] text-charcoal/75">{t.resultLead}</p>
              <h1 className="mt-2 text-balance font-display text-[clamp(52px,9vw,112px)] leading-[0.96] tracking-[-0.025em] text-charcoal">{result.title}</h1>
              <p className="mt-6 max-w-[32em] text-[19px] leading-snug text-charcoal/75">{result.why}</p>
              <p className="mt-4 text-[17px] font-medium text-charcoal">ab {result.from} €</p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Pill href={`/termin?behandlung=${result.slug}`}>Termin buchen</Pill>
                <Pill href={BERATUNG_HREF} variant="outline">Kostenlose Beratung</Pill>
                <button type="button" onClick={() => setAnswers([])} className="min-h-11 px-3 text-[15px] text-charcoal/75 underline underline-offset-4">
                  Neu starten
                </button>
              </div>
            </div>
          ) : null}
      </div>
    </section>
  );
}
