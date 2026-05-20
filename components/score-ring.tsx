"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type Props = {
  value: number; // 0–100
  label: string;
  size?: number;
  className?: string;
};

export function ScoreRing({ value, label, size = 96, className }: Props) {
  const stroke = 8;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (Math.min(100, Math.max(0, value)) / 100) * circumference;

  const color =
    value >= 80
      ? "text-success"
      : value >= 60
        ? "text-primary"
        : value >= 40
          ? "text-warning"
          : "text-destructive";

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={stroke}
            stroke="currentColor"
            className="text-muted opacity-30"
            fill="transparent"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={stroke}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            stroke="currentColor"
            className={cn("transition-all duration-700 ease-out", color)}
            fill="transparent"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={cn("text-2xl font-bold tabular-nums", color)}>{Math.round(value)}</span>
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground">/100</span>
        </div>
      </div>
      <span className="text-xs font-medium text-center">{label}</span>
    </div>
  );
}
