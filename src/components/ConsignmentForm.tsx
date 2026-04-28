import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";
import { api, Consignment, Station } from "@/lib/store";

const START_STATIONS = ["Guangzhou", "Yiwu", "Lhasa", "Nylam"];
const END_STATIONS = ["Tatopani", "Kerung", "Tatopani - Kerung", "Kerung - Tatopani", "Nylam (Khasa)"];

const initial = {
  bill_no: "", marka: "", start_station: "", end_station: "",
  start_date: new Date().toISOString().slice(0, 10), expected_delivery_date: "",
  client_name: "", client_phone: "",
  cbm: 0, weight: 0, quantity: 0, ctn_no: "", cartoon: 0,
  trade_mode: "", package_type: "", serial_prefix: "",
  description: "", remarks: "", image_url: "",
  packaging_fee: 0, tax: 0, freight: 0, local_freight: 0,
  bill_charge: 10, loading_fee: 0, payment_of_goods: 0,
  goods_advance: 0, unloading_fee: 0, value_of_goods: 0, payment_amount: 0,
  calculation_factor: "Select", calculation_rate: 0,
  payment_status: "Unpaid", current_station: "",
};

export function ConsignmentForm({ initialData, onSaved, onCancel }: { initialData?: Consignment | null; onSaved: () => void; onCancel: () => void }) {
  const [stations, setStations] = useState<Station[]>([]);
  const [tab, setTab] = useState("basic");
  const [form, setForm] = useState<any>(initialData ? { ...initialData, expected_delivery_date: initialData.expected_delivery_date || "" } : initial);
  const set = (k: string, v: any) => setForm((f: any) => ({ ...f, [k]: v }));

  useEffect(() => { api.stations.list().then(setStations).catch(() => {}); }, []);

  // Auto-calculate insurance = 0.03% of value of goods
  const insurance = useMemo(() => Number(form.value_of_goods || 0) * 0.0003, [form.value_of_goods]);

  // Find end station rates
  const endStationData = useMemo(
    () => stations.find((s) => s.name.toLowerCase() === String(form.end_station || "").toLowerCase()),
    [stations, form.end_station]
  );

  // Auto-calc freight from end station rate × CBM/Weight based on factor
  const autoFreight = useMemo(() => {
    if (!endStationData) return null;
    if (form.calculation_factor === "CBM") return Number(endStationData.cbm_rate || 0) * Number(form.cbm || 0);
    if (form.calculation_factor === "Weight") return Number(endStationData.weight_rate || 0) * Number(form.weight || 0);
    return null;
  }, [endStationData, form.calculation_factor, form.cbm, form.weight]);

  useEffect(() => {
    if (autoFreight !== null) {
      setForm((f: any) => ({ ...f, freight: autoFreight, calculation_rate: form.calculation_factor === "CBM" ? Number(endStationData?.cbm_rate || 0) : Number(endStationData?.weight_rate || 0) }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoFreight]);

  const calcAmount = 0; // freight already accounts for the rate × base

  const subTotal = useMemo(() => {
    return ["packaging_fee","tax","freight","local_freight","bill_charge","loading_fee","unloading_fee"]
      .reduce((s, k) => s + Number(form[k] || 0), 0) + insurance + calcAmount;
  }, [form, insurance]);

  const advanceAmount = Number(form.goods_advance || 0) + Number(form.payment_amount || 0);
  const grandTotal = subTotal - advanceAmount;

  const save = async () => {
    // Only bill_no is required (start_date defaults to today)
    if (!form.bill_no) {
      toast.error("Bill No. is required"); setTab("basic"); return;
    }
    const payload: any = {
      ...form,
      start_station: form.start_station || "",
      end_station: form.end_station || "",
      marka: form.marka || "",
      start_date: form.start_date || new Date().toISOString().slice(0, 10),
      expected_delivery_date: form.expected_delivery_date || null,
      cbm: Number(form.cbm || 0), weight: Number(form.weight || 0), quantity: Number(form.quantity || 0), cartoon: Number(form.cartoon || 0),
      packaging_fee: Number(form.packaging_fee || 0), tax: Number(form.tax || 0), freight: Number(form.freight || 0),
      local_freight: Number(form.local_freight || 0), bill_charge: Number(form.bill_charge || 0), loading_fee: Number(form.loading_fee || 0),
      payment_of_goods: Number(form.payment_of_goods || 0), goods_advance: Number(form.goods_advance || 0),
      unloading_fee: Number(form.unloading_fee || 0), value_of_goods: Number(form.value_of_goods || 0),
      payment_amount: Number(form.payment_amount || 0), calculation_rate: Number(form.calculation_rate || 0),
      calculation_factor: form.calculation_factor === "Select" ? null : form.calculation_factor,
      insurance, sub_total: subTotal, advance_amount: advanceAmount, grand_total: grandTotal,
      current_station: form.current_station || form.start_station || null,
    };
    try {
      if (initialData) { await api.consignments.update(initialData.id, payload); toast.success("Consignment updated"); }
      else { await api.consignments.create(payload); toast.success("Consignment created"); }
      onSaved();
    } catch (e: any) { toast.error(e.message); }
  };

  return (
    <Tabs value={tab} onValueChange={setTab} className="w-full">
      <div className="flex items-center justify-between border-b border-border px-1 pb-3">
        <TabsList>
          <TabsTrigger value="basic">Basic Details</TabsTrigger>
          <TabsTrigger value="charges">Charges</TabsTrigger>
        </TabsList>
        <Button onClick={save} className="bg-gradient-primary">Save</Button>
      </div>

      <TabsContent value="basic" className="mt-4">
        <div className="grid gap-6 lg:grid-cols-2">
          <Section title="Basic Details">
            <F label="Bill No. *"><Input value={form.bill_no} onChange={(e) => set("bill_no", e.target.value)} placeholder="eg. 23" /></F>
            <F label="Marka"><Input value={form.marka} onChange={(e) => set("marka", e.target.value)} placeholder="Consignment marka here…" /></F>
          </Section>
          <Section title="Client Details">
            <F label="Client"><Input value={form.client_name} onChange={(e) => set("client_name", e.target.value)} placeholder="Client name" /></F>
            <F label="Phone No."><Input value={form.client_phone} onChange={(e) => set("client_phone", e.target.value)} placeholder="eg. 9845508943" /></F>
          </Section>

          <Section title="Start Station">
            <F label="Station">
              <Select value={form.start_station} onValueChange={(v) => set("start_station", v)}>
                <SelectTrigger><SelectValue placeholder="Choose start station" /></SelectTrigger>
                <SelectContent>{START_STATIONS.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
              </Select>
            </F>
            <F label="Start Date"><Input type="date" value={form.start_date} onChange={(e) => set("start_date", e.target.value)} /></F>
          </Section>
          <Section title="End Station">
            <F label="Station">
              <Select value={form.end_station} onValueChange={(v) => set("end_station", v)}>
                <SelectTrigger><SelectValue placeholder="Choose end station" /></SelectTrigger>
                <SelectContent>{END_STATIONS.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
              </Select>
            </F>
            <F label="Expected Delivery Date"><Input type="date" value={form.expected_delivery_date} onChange={(e) => set("expected_delivery_date", e.target.value)} /></F>
          </Section>

          <Section title="Merchandise Details">
            <F label="CBM"><Input type="number" value={form.cbm} onChange={(e) => set("cbm", e.target.value)} /></F>
            <F label="Weight"><Input type="number" value={form.weight} onChange={(e) => set("weight", e.target.value)} /></F>
            <F label="CTN No."><Input value={form.ctn_no} onChange={(e) => set("ctn_no", e.target.value)} /></F>
            <F label="Cartoon"><Input type="number" value={form.cartoon} onChange={(e) => set("cartoon", e.target.value)} /></F>
          </Section>
          <Section title="Additional">
            <F label="Quantity"><Input type="number" value={form.quantity} onChange={(e) => set("quantity", e.target.value)} /></F>
            <F label="Trade Mode"><Input value={form.trade_mode} onChange={(e) => set("trade_mode", e.target.value)} /></F>
            <F label="Package Type"><Input value={form.package_type} onChange={(e) => set("package_type", e.target.value)} /></F>
            <F label="Serial No. Prefix"><Input value={form.serial_prefix} onChange={(e) => set("serial_prefix", e.target.value)} /></F>
          </Section>

          <Section title="Description & Remarks" full>
            <F label="Description"><Textarea value={form.description} onChange={(e) => set("description", e.target.value)} /></F>
            <F label="Remarks"><Textarea value={form.remarks} onChange={(e) => set("remarks", e.target.value)} /></F>
          </Section>
        </div>
        <div className="mt-6 flex justify-end"><Button onClick={() => setTab("charges")} className="bg-gradient-primary">Next</Button></div>
      </TabsContent>

      <TabsContent value="charges" className="mt-4">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-4">
            <F label="Calculation Factor">
              <Select value={form.calculation_factor} onValueChange={(v) => set("calculation_factor", v)}>
                <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Select">Select</SelectItem>
                  <SelectItem value="CBM">CBM</SelectItem>
                  <SelectItem value="Weight">Weight</SelectItem>
                </SelectContent>
              </Select>
            </F>
            <F label="Calculation Rate (auto from station)">
              <Input type="number" value={Number(form.calculation_rate || 0)} readOnly className="bg-muted" />
            </F>
            <F label="Freight (auto: rate × CBM/Weight)">
              <Input type="number" value={Number(form.freight || 0)} readOnly className="bg-muted" />
            </F>
            <F label="Packaging Fee"><Input type="number" value={form.packaging_fee} onChange={(e) => set("packaging_fee", e.target.value)} /></F>
            <F label="TAX"><Input type="number" value={form.tax} onChange={(e) => set("tax", e.target.value)} /></F>
            <F label="Local Freight"><Input type="number" value={form.local_freight} onChange={(e) => set("local_freight", e.target.value)} /></F>
          </div>
          <div className="space-y-4">
            <F label="Insurance (auto: 0.03% of Value of Goods)">
              <Input type="number" value={insurance.toFixed(2)} readOnly className="bg-muted" />
            </F>
            <F label="Bill Charge"><Input type="number" value={form.bill_charge} onChange={(e) => set("bill_charge", e.target.value)} /></F>
            <F label="Loading Fee"><Input type="number" value={form.loading_fee} onChange={(e) => set("loading_fee", e.target.value)} /></F>
            <F label="Unloading Fee"><Input type="number" value={form.unloading_fee} onChange={(e) => set("unloading_fee", e.target.value)} /></F>
            <F label="Payment of Goods"><Input type="number" value={form.payment_of_goods} onChange={(e) => set("payment_of_goods", e.target.value)} /></F>
            <F label="Value of Goods"><Input type="number" value={form.value_of_goods} onChange={(e) => set("value_of_goods", e.target.value)} /></F>
          </div>
          <div className="space-y-4">
            <F label="Goods Advance"><Input type="number" value={form.goods_advance} onChange={(e) => set("goods_advance", e.target.value)} /></F>
            <F label="Payment Amount"><Input type="number" value={form.payment_amount} onChange={(e) => set("payment_amount", e.target.value)} /></F>
            <F label="Payment Status">
              <Select value={form.payment_status} onValueChange={(v) => set("payment_status", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Unpaid">Unpaid</SelectItem>
                  <SelectItem value="Partial">Partial</SelectItem>
                  <SelectItem value="Paid">Paid</SelectItem>
                </SelectContent>
              </Select>
            </F>

            <div className="rounded-xl bg-gradient-primary p-5 text-primary-foreground shadow-elegant">
              <div className="text-lg font-bold">Summary</div>
              <Row label="Sub Total" value={`¥ ${subTotal.toFixed(2)}`} />
              <Row label="Advance Amount" value={`¥ ${advanceAmount.toFixed(2)}`} />
              <div className="my-2 border-t border-dashed border-primary-foreground/40" />
              <Row label="Grand Total" value={`¥ ${grandTotal.toFixed(2)}`} bold />
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-between">
          <Button variant="outline" onClick={() => setTab("basic")}>Previous</Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onCancel}>Cancel</Button>
            <Button onClick={save} className="bg-gradient-primary">Save</Button>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}

function Section({ title, children, full }: { title: string; children: React.ReactNode; full?: boolean }) {
  return (
    <div className={full ? "lg:col-span-2 rounded-lg border border-border bg-card p-4" : "rounded-lg border border-border bg-card p-4"}>
      <div className="mb-3 text-sm font-semibold text-primary">{title}</div>
      <div className="grid gap-3 sm:grid-cols-2">{children}</div>
    </div>
  );
}
function F({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><Label className="mb-1.5 block text-xs">{label}</Label>{children}</div>;
}
function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return <div className={`mt-2 flex items-center justify-between ${bold ? "text-base font-bold" : "text-sm"}`}><span>{label}</span><span>{value}</span></div>;
}
