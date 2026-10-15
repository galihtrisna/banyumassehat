import React from "react";
import { KPIMetric } from "@/types";
import { Card } from "../ui/Card";
import { Icon } from "../ui/Icon";

interface KPIMetricsSectionProps {
  metrics: KPIMetric[];
  onMetricClick?: (id: string) => void;
}

const accentMap = {
  primary: {
    bg: "bg-primary-fixed",
    text: "text-primary",
  },
  secondary: {
    bg: "bg-secondary-fixed",
    text: "text-secondary",
  },
  error: {
    bg: "bg-error-container",
    text: "text-error",
  },
  tertiary: {
    bg: "bg-tertiary-fixed",
    text: "text-tertiary",
  },
};

export function KPIMetricsSection({
  metrics,
  onMetricClick,
}: KPIMetricsSectionProps) {
  return (
    <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pb-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {metrics.map((metric) => {
          const accent = accentMap[metric.accent];
          return (
            <Card
              key={metric.id}
              elevation={1}
              rounded="3xl"
              onClick={() => onMetricClick && onMetricClick(metric.id)}
              className="p-6 flex flex-col justify-between cursor-pointer group hover:-translate-y-0.5 transition-transform"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-12 h-12 rounded-2xl ${accent.bg} flex items-center justify-center ${accent.text} group-hover:scale-110 transition-transform`}
                >
                  <Icon name={metric.icon} size={26} />
                </div>
                <span className="text-xs font-semibold text-outline group-hover:text-primary transition-colors flex items-center gap-0.5">
                  Live <Icon name="chevron_right" size={16} />
                </span>
              </div>

              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-extrabold text-on-surface tracking-tight tabular-nums">
                    {metric.value}
                  </span>
                  <span className="text-sm font-semibold text-on-surface-variant">
                    {metric.label}
                  </span>
                </div>
                <p className="text-xs text-outline mt-1.5 leading-snug">
                  {metric.subtitle}
                </p>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
