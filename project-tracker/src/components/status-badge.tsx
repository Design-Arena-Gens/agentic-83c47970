export type ProjectStatus = "On Track" | "At Risk" | "Stalled" | "Completed";

const statusStyles: Record<
  ProjectStatus,
  {
    wrapper: string;
    dot: string;
  }
> = {
  "On Track": {
    wrapper:
      "bg-emerald-500/15 text-emerald-200 ring-1 ring-inset ring-emerald-400/40",
    dot: "bg-emerald-400",
  },
  "At Risk": {
    wrapper:
      "bg-amber-500/15 text-amber-200 ring-1 ring-inset ring-amber-400/40",
    dot: "bg-amber-400",
  },
  Stalled: {
    wrapper: "bg-rose-500/15 text-rose-200 ring-1 ring-inset ring-rose-400/40",
    dot: "bg-rose-400",
  },
  Completed: {
    wrapper:
      "bg-slate-500/20 text-slate-200 ring-1 ring-inset ring-slate-400/30",
    dot: "bg-slate-200",
  },
};

export function StatusBadge({ status }: { status: ProjectStatus }) {
  const style = statusStyles[status];
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium tracking-tight ${style.wrapper}`}
    >
      <span className={`h-2.5 w-2.5 rounded-full ${style.dot}`} />
      {status}
    </span>
  );
}
