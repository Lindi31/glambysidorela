type Testimonial = {
  _id: string;
  name: string | null;
  text: string | null;
  rating: number | null;
  serviceCategory: string | null;
};

// Erscheint erst, wenn in Sanity echte Stimmen eingetragen sind.
export function TestimonialsSlider({ testimonials }: { testimonials: Testimonial[] }) {
  if (!testimonials.length) return null;

  return (
    <section className="overflow-hidden bg-cream pb-24 md:pb-36">
      <div className="mx-auto max-w-[1200px] px-5 lg:px-8">
        <h2 className="font-display text-[clamp(38px,5vw,64px)] leading-[1.02] tracking-[-0.02em] text-charcoal">Das sagen meine Kundinnen.</h2>
      </div>
      <ul className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] lg:px-[max(2rem,calc((100vw-1200px)/2+2rem))] [&::-webkit-scrollbar]:hidden">
        {testimonials.map((testimonial) => (
          <li key={testimonial._id} className="flex w-[82vw] max-w-[420px] flex-none snap-start scroll-ml-5 flex-col justify-between gap-8 rounded-[28px] bg-white p-7">
            <blockquote className="font-display text-[26px] leading-[1.15] tracking-[-0.012em] text-charcoal">„{testimonial.text}“</blockquote>
            <p className="text-[15px] text-charcoal/75">
              <span className="font-medium text-charcoal">{testimonial.name}</span>
              {testimonial.rating ? <span className="sr-only">, {testimonial.rating} von 5 Sternen</span> : null}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
