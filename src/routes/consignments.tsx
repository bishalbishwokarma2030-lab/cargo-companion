import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Plus, Search, Printer } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/PageHeader";
import { DataTable } from "@/components/DataTable";
import { ActionButtons } from "@/components/ActionButtons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ConsignmentForm } from "@/components/ConsignmentForm";
import { ConsignmentReceipt } from "@/components/ConsignmentReceipt";
import { api, Consignment } from "@/lib/store";

export const Route = createFileRoute("/consignments")({ component: ConsignmentsPage });

function ConsignmentsPage() {
  const [items, setItems] = useState<Consignment[]>([]);
  const [search, setSearch] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Consignment | null>(null);
  const [viewing, setViewing] = useState<Consignment | null>(null);

  const load = () => api.consignments.list().then(setItems).catch((e) => toast.error(e.message));
  useEffect(() => { load(); }, []);

  const filtered = items.filter((c) => [c.bill_no, c.marka, c.start_station, c.end_station, c.client_name].filter(Boolean).join(" ").toLowerCase().includes(search.toLowerCase()));

  const remove = async (c: Consignment) => {
    if (!confirm(`Delete consignment "${c.bill_no}"?`)) return;
    try { await api.consignments.remove(c.id); toast.success("Deleted"); load(); } catch (e: any) { toast.error(e.message); }
  };

  return (
    <div>
      <PageHeader
        title="Consignments"
        breadcrumbs={[{ label: "Home" }, { label: "Consignments" }]}
        actions={
          <>
            <div className="relative"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search…" className="pl-9 w-64" /></div>
            <Button onClick={() => { setEditing(null); setFormOpen(true); }} className="bg-gradient-primary"><Plus className="mr-1 h-4 w-4" />Create Consignment</Button>
          </>
        }
      />
      <div className="p-6">
        <div className="mb-3 text-xs text-muted-foreground">Showing {filtered.length} of {items.length}</div>
        <DataTable<Consignment>
          data={filtered}
          columns={[
            { key: "#", header: "#", render: (_r, i) => <span className="text-muted-foreground">{i + 1}</span> },
            { key: "bill_no", header: "Bill No.", render: (r) => <Badge variant="secondary" className="bg-primary/10 text-primary">{r.bill_no}</Badge> },
            { key: "marka", header: "Marka", render: (r) => <span className="font-medium">{r.marka}</span> },
            { key: "client", header: "Client", render: (r) => r.client_name || "—" },
            { key: "route", header: "Route", render: (r) => <span className="text-xs"><Badge variant="outline">{r.start_station}</Badge> → <Badge variant="outline">{r.end_station}</Badge></span> },
            { key: "cbm", header: "CBM" },
            { key: "weight", header: "Weight" },
            { key: "grand_total", header: "Total", render: (r) => <span className="font-semibold">¥ {Number(r.grand_total).toFixed(2)}</span> },
            { key: "created_at", header: "Created", render: (r) => <span className="text-xs text-muted-foreground">{new Date(r.created_at).toLocaleDateString()}</span> },
            { key: "actions", header: "Actions", render: (r) => <ActionButtons onView={() => setViewing(r)} onEdit={() => { setEditing(r); setFormOpen(true); }} onDelete={() => remove(r)} /> },
          ]}
        />
      </div>

      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editing ? "Edit Consignment" : "Create Consignment"}</DialogTitle></DialogHeader>
          <ConsignmentForm initialData={editing} onSaved={() => { setFormOpen(false); load(); }} onCancel={() => setFormOpen(false)} />
        </DialogContent>
      </Dialog>

      <Dialog open={!!viewing} onOpenChange={(o) => !o && setViewing(null)}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center justify-between pr-6">
              <DialogTitle>Consignment Receipt</DialogTitle>
              <Button size="sm" variant="outline" onClick={() => window.print()}><Printer className="mr-1 h-4 w-4" />Print</Button>
            </div>
          </DialogHeader>
          {viewing && <ConsignmentReceipt c={viewing} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}
