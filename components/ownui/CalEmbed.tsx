"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect, useState } from "react";

type Props = {
  eventType?: string;
  showAll?: boolean;
};

const CAL_USERNAME = process.env.NEXT_PUBLIC_CALCOM_USERNAME ?? "sidorelaisa";

export function CalEmbed({ eventType, showAll = false }: Props) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const cal = await getCalApi();
      cal("ui", {
        theme: "light",
        cssVarsPerTheme: {
          light: {
            "cal-brand": "#2C2826",
            "cal-text": "#2C2826",
            "cal-bg": "#FFFFFF",
            "cal-bg-muted": "#F3EEE7",
            "cal-border": "#E8D5C4",
          },
          dark: {
            "cal-brand": "#D4A5A5",
            "cal-text": "#FAF7F2",
            "cal-bg": "#2C2826",
            "cal-bg-muted": "#3A3330",
            "cal-border": "#3A3330",
          },
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
      cal("on", { action: "linkReady", callback: () => setLoading(false) });
      setTimeout(() => setLoading(false), 4000);
    })();
  }, []);

  const calLink = showAll || !eventType ? CAL_USERNAME : `${CAL_USERNAME}/${eventType}`;

  return (
    <div className="relative min-h-[720px] w-full overflow-hidden rounded-[24px] bg-white md:rounded-[28px]">
      {loading && (
        <div className="absolute inset-0 z-10 bg-white flex flex-col gap-4 p-8 animate-pulse">
          <div className="h-8 w-48 rounded-xl bg-nude/60" />
          <div className="grid grid-cols-7 gap-2 mt-4">
            {[...Array(35)].map((_, i) => (
              <div key={i} className="h-10 rounded-lg bg-nude/40" />
            ))}
          </div>
        </div>
      )}
      <Cal
        namespace={eventType ?? "all"}
        calLink={calLink}
        style={{ width: "100%", minHeight: 720, overflow: "auto" }}
        config={{ layout: "month_view", theme: "light" }}
      />
    </div>
  );
}
