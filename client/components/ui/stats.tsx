import React from "react";

export interface StatsProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  theme?: "green" | "blue" | "red" | "purple" | "ACTIVE" | "INACTIVE" | "FAILED" | "RUNNING";
}

const themeClasses: Record<NonNullable<StatsProps["theme"]>, string> = {
  green: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
  blue: "bg-blue-500/10 border-blue-500/20 text-blue-400",
  red: "bg-red-500/10 border-red-500/20 text-red-400",
  purple: "bg-purple-500/10 border-purple-500/20 text-purple-400",
  ACTIVE: "bg-green-500/10 border-green-500/20 text-green-400",
  INACTIVE: "bg-gray-500/10 border-gray-500/20 text-gray-400",
  FAILED: "bg-red-500/10 border-red-500/20 text-red-400",
  RUNNING: "bg-red-500/10 border-red-500/20 text-red-400",
};

const Stats = ({ label, value, icon, theme = "green" }: StatsProps) => {
  const classes = themeClasses[theme];

  return (
    <div className={`px-2 py-2 rounded-sm border ${classes} flex items-center justify-center gap-1`}>
      {icon && <span className="size-4 items-center flex justify-center">{icon}</span>}
      <span className="text-[12px] font-medium">{label} =</span>
      <span className="text-[12px] text-white">{value}</span>
    </div>
  );
};

export default Stats;
