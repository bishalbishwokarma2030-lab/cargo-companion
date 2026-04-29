import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type Column<T> = {
  key: string;
  header: string;
  render?: (row: T, index: number) => ReactNode;
  className?: string;
};

export function DataTable<T extends { id: string }>({
  columns,
  data,
  empty = "No data found",
  stickyLastColumn = true,
  maxHeight = "70vh",
}: {
  columns: Column<T>[];
  data: T[];
  empty?: string;
  stickyLastColumn?: boolean;
  maxHeight?: string;
}) {
  const lastIdx = columns.length - 1;
  const stickyKey = stickyLastColumn && columns[lastIdx]?.key === "actions";

  return (
    <div className="rounded-lg border border-border bg-card shadow-card">
      <div className="overflow-auto relative" style={{ maxHeight }}>
        <table className="w-full text-sm border-separate border-spacing-0">
          <thead className="sticky top-0 z-30">
            <tr className="text-left">
              {columns.map((c, idx) => {
                const isSticky = stickyKey && idx === lastIdx;
                return (
                  <th
                    key={c.key}
                    className={cn(
                      "bg-muted px-4 py-3 font-semibold text-xs uppercase tracking-wider text-primary border-b border-border",
                      isSticky && "sticky right-0 z-40 shadow-[-4px_0_8px_-4px_rgba(0,0,0,0.1)]",
                      c.className
                    )}
                  >
                    {c.header}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-12 text-center text-muted-foreground">
                  {empty}
                </td>
              </tr>
            ) : (
              data.map((row, i) => (
                <tr
                  key={row.id}
                  className="group transition-colors"
                >
                  {columns.map((c, idx) => {
                    const isSticky = stickyKey && idx === lastIdx;
                    return (
                      <td
                        key={c.key}
                        className={cn(
                          "px-4 py-3 align-middle border-t border-border/60 bg-card group-hover:bg-accent/30",
                          isSticky && "sticky right-0 z-20 shadow-[-4px_0_8px_-4px_rgba(0,0,0,0.1)]",
                          c.className
                        )}
                      >
                        {c.render ? c.render(row, i) : (row as any)[c.key]}
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
