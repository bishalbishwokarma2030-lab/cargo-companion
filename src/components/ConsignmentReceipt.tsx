import { Consignment } from "@/lib/store";

export function ConsignmentReceipt({ c }: { c: Consignment }) {
  const isGuangzhou = c.start_station.toLowerCase().includes("guangzhou");
  const stationLabel = isGuangzhou ? "Guangzhou" : c.start_station;
  const receivedBy = isGuangzhou ? "Ken Guangzhou" : c.start_station.toLowerCase().includes("yiwu") ? "Yiwu Su" : "—";

  const Cell = ({ label, value, sub }: { label: string; value?: string | number | null; sub?: string }) => (
    <div className="border border-sky-300 p-2 min-h-[52px]">
      <div className="text-[10px] font-semibold text-slate-700">{sub}</div>
      <div className="text-[10px] font-bold uppercase text-slate-700 tracking-wide">{label}</div>
      <div className="mt-1 text-sm font-medium text-slate-900">{value ?? ""}</div>
    </div>
  );

  return (
    <div className="bg-sky-50 p-4 text-slate-900 print:bg-white">
      <div className="flex items-start justify-between gap-4">
        <div className="rounded bg-sky-700 px-3 py-2 text-center text-white">
          <div className="text-xs">阿卓</div>
          <div className="text-xl font-bold">ADO</div>
          <div className="text-[10px]">迈达</div>
        </div>
        <div className="flex-1 text-center">
          <div className="text-sm font-bold">义乌市阿卓国际供应链管理有限公司</div>
          <div className="text-base font-bold text-slate-800">ADO INTERNATIONAL SUPPLY CHAIN MANAGEMENT CO LTD</div>
          <div className="text-xs">广东省广州市白云区石井镇凤岗村领龙国际1F001档</div>
          <div className="mt-1 text-xs"><b>Chinese Speaking Mobile:</b> +8613322519322</div>
          <div className="text-xs"><b>Nepali Speaking Mobile:</b> +8619908916803</div>
          <div className="text-xs"><b>Email:</b> 1973459072@qq.com</div>
          <div className="mt-1 text-base font-bold text-emerald-600">{stationLabel}</div>
        </div>
        <div className="w-32 text-[10px]">
          <div><b>NEPAL :</b> +977 9851067385</div>
          <div><b>KERUNG :</b> +8613890217131</div>
          <div><b>TATOPANI :</b> 9846207176</div>
          <div><b>LHASA :</b> +8613728961850</div>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-4 gap-0">
        <Cell label="CONSIGNMENT NO" sub="托运号" value={c.bill_no} />
        <div className="col-span-2 border border-sky-300 p-2 min-h-[52px]"></div>
        <Cell label="STARTING STATION" sub="起运站" value={<span className="text-emerald-600 font-bold">{stationLabel}</span> as any} />

        <Cell label="CONSIGNMENT DATE" sub="托运日期" value={c.start_date} />
        <div className="col-span-2 border border-sky-300 p-2 min-h-[52px]"></div>
        <Cell label="DESTINATION" sub="到达站" value={c.end_station} />

        <Cell label="CONSIGNMENT MARK" sub="收货人" value={c.marka} />
        <div className="col-span-2 border border-sky-300 p-2 min-h-[52px]">
          <div className="text-[10px] font-bold uppercase text-slate-700">收货人 / Consignee</div>
          <div className="mt-1 text-sm font-medium">{c.client_name || ""}</div>
        </div>
        <Cell label="TELEPHONE" sub="收货人电话" value={c.client_phone} />
      </div>

      <div className="mt-0 grid grid-cols-11 gap-0">
        <div className="border border-sky-300 p-2 text-center text-[10px] font-bold">DESCRIPTION<div className="text-[9px]">货物名称</div><div className="mt-1 font-normal">{c.description || ""}</div></div>
        <div className="border border-sky-300 p-2 text-center text-[10px] font-bold">PACKAGE<div className="text-[9px]">包装</div><div className="mt-1 font-normal">{c.package_type || ""}</div></div>
        <div className="border border-sky-300 p-2 text-center text-[10px] font-bold">QUANTITY<div className="text-[9px]">件数</div><div className="mt-1 font-normal">{c.quantity}</div></div>
        <div className="border border-sky-300 p-2 text-center text-[10px] font-bold">CTN NO<div className="text-[9px]">箱号</div><div className="mt-1 font-normal">{c.ctn_no || ""}</div></div>
        <div className="border border-sky-300 p-2 text-center text-[10px] font-bold">PACKAGING FEE<div className="text-[9px]">包装费</div><div className="mt-1 font-normal">{c.packaging_fee}</div></div>
        <div className="col-span-3 grid grid-cols-3 border border-sky-300">
          <div className="p-2 text-center text-[10px] font-bold border-r border-sky-300">LOAD<div className="text-[9px]">体积</div><div className="mt-1 font-normal">{c.loading_fee}</div></div>
          <div className="p-2 text-center text-[10px] font-bold border-r border-sky-300">UNLOAD<div className="text-[9px]"></div><div className="mt-1 font-normal">{c.unloading_fee}</div></div>
          <div className="p-2 text-center text-[10px] font-bold">CBM<div className="text-[9px]"></div><div className="mt-1 font-normal">{c.cbm}</div></div>
        </div>
        <div className="border border-sky-300 p-2 text-center text-[10px] font-bold">WEIGHT<div className="text-[9px]">重量</div><div className="mt-1 font-normal">{c.weight}</div></div>
        <div className="border border-sky-300 p-2 text-center text-[10px] font-bold">TAX<div className="text-[9px]">税款</div><div className="mt-1 font-normal">{c.tax}</div></div>
        <div className="border border-sky-300 p-2 text-center text-[10px] font-bold">FREIGHT<div className="text-[9px]">货运</div><div className="mt-1 font-normal">{c.freight}</div></div>
      </div>

      <div className="grid grid-cols-6 gap-0">
        <div className="border border-sky-300 p-2 text-center text-[10px] font-bold">VALUE OF GOODS<div className="text-[9px]">价值</div><div className="mt-1 font-normal">{c.value_of_goods}</div></div>
        <div className="border border-sky-300 p-2 text-center text-[10px] font-bold">INSURANCE<div className="text-[9px]">保险</div><div className="mt-1 font-normal">{Number(c.insurance).toFixed(2)}</div></div>
        <div className="border border-sky-300 p-2 text-center text-[10px] font-bold">BILL CHARGE<div className="text-[9px]">账单费运</div><div className="mt-1 font-normal">{c.bill_charge}</div></div>
        <div className="border border-sky-300 p-2 text-center text-[10px] font-bold">ADVANCE<div className="text-[9px]">预付款</div><div className="mt-1 font-normal">{c.advance_amount}</div></div>
        <div className="border border-sky-300 p-2 text-center text-[10px] font-bold text-red-600">TOTAL AMOUNT<div className="text-[9px] text-slate-700">合计金额</div><div className="mt-1 font-bold text-slate-900">{c.grand_total}</div></div>
        <div className="border border-sky-300 p-2 text-center text-[10px] font-bold">TRADE MODE<div className="text-[9px]">贸易模式</div><div className="mt-1 font-normal">{c.trade_mode || ""}</div></div>
      </div>

      <div className="grid grid-cols-2 gap-0">
        <div className="border border-sky-300 p-2 text-[10px]"><b>TOTAL AMOUNT IN WORDS / 元整:</b></div>
        <div className="border border-sky-300 p-2 text-right text-[10px]">Received By: <b>{receivedBy}</b></div>
      </div>
      <div className="border border-sky-300 p-2 text-[10px]"><b>REMARKS / 备注:</b> {c.remarks || ""}</div>

      <div className="mt-3 text-[10px] leading-snug text-slate-700">
        <div className="font-bold">注意事项 (NOTES):</div>
        <ol className="ml-5 list-decimal space-y-0.5">
          <li>In order to file a claim for any type of loss or damage, the customer must specify the true value of the items and have them insured.</li>
          <li>The customer or supplier must provide us with an actual description and quantity of the goods.</li>
          <li>False item descriptions and secret carriage of prohibited goods by the Chinese government are strictly prohibited.</li>
          <li>The customer must provide all the necessary documents that are necessary for China's customs clearance.</li>
          <li>The transport company will not be liable for goods after they are taken by the customer.</li>
          <li>Damage or leakage of fragile items, liquids, seized goods, etc., is not the responsibility of the transportation company.</li>
          <li>If goods are not collected within one month of arrival, 2RMB per day will be charged after that date.</li>
          <li>The above terms and conditions have been agreed to by both parties.</li>
        </ol>
      </div>
    </div>
  );
}
