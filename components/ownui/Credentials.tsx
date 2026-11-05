import { getSite } from "@/lib/content";

export async function Credentials({ className = "" }: { className?: string }) {
  const { credentials } = await getSite();
  return (
    <ul className={`grid gap-8 text-center text-charcoal sm:grid-cols-3 sm:gap-4 ${className}`}>
      {credentials.map((item) => (
        <li key={item.label} className="rise">
          <span className="block font-display text-[clamp(38px,4.8vw,60px)] leading-none tracking-[-0.018em]">{item.value}</span>
          <span className="mt-2 block text-[15px] text-charcoal/75">{item.label}</span>
        </li>
      ))}
    </ul>
  );
}
