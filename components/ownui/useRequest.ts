"use client";

import { useState } from "react";

export type RequestStatus = "idle" | "sending" | "done" | "error";

export function useRequest() {
  const [status, setStatus] = useState<RequestStatus>("idle");

  const send = async (payload: Record<string, unknown>) => {
    setStatus("sending");
    try {
      const res = await fetch("/api/anfrage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  };

  return { status, send };
}

export const fieldClass =
  "min-h-12 w-full min-w-0 rounded-xl border border-charcoal/25 bg-white px-4 text-[16px] text-charcoal outline-none transition-colors focus:border-charcoal";
export const labelClass = "flex min-w-0 flex-col gap-1.5 text-[14px] font-medium text-charcoal";
