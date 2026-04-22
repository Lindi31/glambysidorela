"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

type Props = {
  /** z.B. "lash-lifting" – Slug des Event Types */
  eventType?: string;
  /** Gesamter Kalender (alle Events) statt eines einzelnen */
  showAll?: boolean;
};

const CAL_USERNAME =
  process.env.NEXT_PUBLIC_CALCOM_USERNAME ?? "sidorelaisa";

export function CalEmbed({ eventType, showAll = false }: Props) {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi();
      cal("ui", {
  theme: "light",
  cssVarsPerTheme: {
    light: {
      "cal-brand": "#D4A5A5",
      "cal-text": "#2C2826",
      "cal-bg": "#FAF7F2",
      "cal-bg-muted": "#E8D5C4",
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
    })();
  }, []);

  const calLink = showAll || !eventType
    ? CAL_USERNAME
    : `${CAL_USERNAME}/${eventType}`;

  return (
    <div className="w-full bg-cream rounded-3xl overflow-hidden border border-nude/40">
      <Cal
        namespace={eventType ?? "all"}
        calLink={calLink}
        style={{ width: "100%", height: "100%", overflow: "scroll" }}
        config={{ layout: "month_view", theme: "light" }}
      />
    </div>
  );
}