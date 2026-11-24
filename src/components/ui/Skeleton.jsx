import React from 'react';

export function Skeleton({ className = '', ...props }) {
  return (
    <div
      aria-hidden="true"
      className={`rounded-md skeleton-shimmer ${className}`}
      {...props}
    />
  );
}

export function KpiCardSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="bg-[#1c1c1e] border border-white/10 rounded-xl p-5 shadow-md space-y-3"
    >
      <div className="flex items-center justify-between">
        <Skeleton className="w-10 h-10 rounded-lg" />
        <Skeleton className="h-4 w-20 rounded-full" />
      </div>
      <Skeleton className="h-3 w-32" />
      <div className="flex items-baseline gap-2">
        <Skeleton className="h-7 w-16" />
        <Skeleton className="h-3 w-20" />
      </div>
      <Skeleton className="h-3 w-44" />
    </div>
  );
}

export function TalentCardSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="bg-[#1c1c1e] border border-white/10 rounded-xl overflow-hidden flex min-h-[152px]"
    >
      <div className="w-[76px] sm:w-[82px] shrink-0 bg-[#161617] p-2 border-r border-white/10 flex items-center justify-center">
        <Skeleton className="w-full h-full min-h-[132px] rounded-lg" />
      </div>

      <div className="flex-1 min-w-0 p-3 flex flex-col justify-between gap-2">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between gap-2">
            <Skeleton className="h-3.5 w-24" />
            <Skeleton className="h-3.5 w-4 rounded" />
          </div>
          <Skeleton className="h-2.5 w-20" />
        </div>

        <div className="space-y-1.5">
          <Skeleton className="h-4 w-16 rounded-full" />
          <div className="flex items-center gap-1.5">
            <Skeleton className="h-4 w-14 rounded-md" />
            <Skeleton className="h-4 w-12 rounded-md" />
          </div>
        </div>

        <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-2">
          <Skeleton className="h-3 w-11" />
          <Skeleton className="h-3 w-10" />
          <Skeleton className="h-3 w-10" />
        </div>
      </div>
    </div>
  );
}

const CELL_WIDTHS = ['w-8', 'w-28', 'w-20', 'w-24', 'w-16'];

export function TableRowSkeleton({ columns = 4, rows = 5 }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, rowIdx) => (
        <tr
          key={rowIdx}
          aria-hidden="true"
          className="border-b border-white/10 bg-[#161617]"
        >
          {Array.from({ length: columns }).map((__, colIdx) => {
            const widthClass = CELL_WIDTHS[(rowIdx + colIdx) % CELL_WIDTHS.length];
            return (
              <td key={colIdx} className="py-3 px-3">
                <Skeleton className={`h-3.5 ${widthClass}`} />
              </td>
            );
          })}
        </tr>
      ))}
    </>
  );
}

export function AgendaItemSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="p-3 rounded-lg bg-[#161617] border border-white/10 flex items-start gap-3"
    >
      <div className="w-10 shrink-0 space-y-1.5 pt-0.5 flex flex-col items-center">
        <Skeleton className="h-3.5 w-9" />
        <Skeleton className="h-2.5 w-7" />
      </div>
      <div className="flex-1 min-w-0 space-y-2">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-16 rounded" />
          <Skeleton className="h-3.5 w-28" />
        </div>
        <Skeleton className="h-3 w-44" />
        <Skeleton className="h-2.5 w-36" />
      </div>
    </div>
  );
}

export default Skeleton;
