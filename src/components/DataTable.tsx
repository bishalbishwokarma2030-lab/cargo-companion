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
}: {
  columns: Column<T>[];
  data: T[];
  empty?: string;
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card shadow-card">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/60 text-left">
              {columns.map((c) => (
                <th
                  key={c.key}
                  className={cn(
                    "px-4 py-3 font-semibold text-xs uppercase tracking-wider text-primary",
                    c.className
                  )}
                >
                  {c.header}
                </th>
              ))}
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
                  className="border-t border-border/60 transition-colors hover:bg-accent/30"
                >
                  {columns.map((c) => (
                    <td key={c.key} className={cn("px-4 py-3 align-middle", c.className)}>
                      {c.render ? c.render(row, i) : (row as any)[c.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
