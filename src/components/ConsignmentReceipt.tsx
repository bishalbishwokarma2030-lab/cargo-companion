import { Consignment } from "@/lib/store";

export function ConsignmentReceipt({ c }: { c: Consignment }) {
  const isGuangzhou = (c.start_station || "").toLowerCase().includes("guangzhou");
  const isYiwu = (c.start_station || "").toLowerCase().includes("yiwu");
  const stationLabel = isGuangzhou ? "Guangzhou" : isYiwu ? "Yiwu" : c.start_station;
  const receivedBy = isGuangzhou ? "Ken Guangzhou" : isYiwu ? "Yiwu Su" : "";

  // Border style for every cell
  const b = "border border-slate-400";
  // Header (Chinese) cell — small text
  const cn = "text-[10px] text-slate-800 leading-tight";
  // English label
  const en = "text-[11px] font-bold text-slate-900 tracking-wide leading-tight";
  // value
  const val = "text-sm text-slate-900";

  return (
    <div className="bg-[#cfe6f3] p-4 text-slate-900 print:bg-white font-sans" style={{ minWidth: 900 }}>
      {/* HEADER */}
      <div className="grid grid-cols-12 gap-0 items-start mb-2">
        {/* Logo */}
        <div className="col-span-2 flex items-start">
          <div className="bg-[#1f4e8a] text-white px-3 py-2 flex items-center gap-1 rounded-sm">
            <div className="text-[10px] leading-tight">
              <div>阿</div>
              <div>卓</div>
            </div>
            <div className="text-2xl font-extrabold">ADO</div>
            <div className="text-[10px] leading-tight">
              <div>迈</div>
              <div>达</div>
            </div>
          </div>
        </div>

        {/* Center company info */}
        <div className="col-span-7 text-center">
          <div className="text-[12px] font-semibold">义乌市阿卓国际供应链管理有限公司</div>
          <div className="text-[13px] font-bold">ADO INTERNATIONAL SUPPLY CHAIN MANAGEMENT CO LTD</div>
          <div className="text-[11px]">广东省广州市白云区石井镇凤岗村领龙国际1F001档</div>
          <div className="text-[11px]"><b>Chinese Speaking Mobile:</b> +8613322519322</div>
          <div className="text-[11px]"><b>Nepali Speaking Mobile:</b> +8619908916803</div>
          <div className="text-[11px]"><b>Email:</b> 1973459072@qq.com</div>
          <div className="text-[13px] font-bold text-emerald-600 mt-0.5">{stationLabel}</div>
        </div>

        {/* Right contacts */}
        <div className="col-span-3 text-[11px] leading-tight">
          <div><b>NEPAL :</b> +977 9851067385</div>
          <div><b>KERUNG :</b> +8613890217131</div>
          <div><b>TATOPANI :</b> 9846207176</div>
          <div><b>LHASA :</b> +8613728961850</div>
        </div>
      </div>

      {/* TOP META BLOCK — 4 columns: label/value | (blank) | label | value */}
      <div className="grid grid-cols-12">
        {/* Row 1 */}
        <div className={`${b} col-span-2 p-1.5`}>
          <div className={cn}>托运号</div>
          <div className={en}>CONSIGNMENT NO</div>
        </div>
        <div className={`${b} col-span-4 p-1.5 ${val}`}>{c.bill_no}</div>
        <div className={`${b} col-span-2 p-1.5`}>
          <div className={cn}>起运站</div>
          <div className={en}>STARTING STATION</div>
        </div>
        <div className={`${b} col-span-4 p-1.5 text-emerald-600 font-bold`}>{stationLabel}</div>

        {/* Row 2 */}
        <div className={`${b} col-span-2 p-1.5`}>
          <div className={cn}>托运日期</div>
          <div className={en}>CONSIGNMENT DATE</div>
        </div>
        <div className={`${b} col-span-4 p-1.5 ${val}`}>{c.start_date}</div>
        <div className={`${b} col-span-2 p-1.5`}>
          <div className={cn}>到达站</div>
          <div className={en}>DESTINATION</div>
        </div>
        <div className={`${b} col-span-4 p-1.5 ${val}`}>{c.end_station}</div>

        {/* Row 3 */}
        <div className={`${b} col-span-2 p-1.5`}>
          <div className={cn}>收货人</div>
          <div className={en}>CONSIGNMENT MARK</div>
        </div>
        <div className={`${b} col-span-4 p-1.5 ${val}`}>{c.marka}</div>
        <div className={`${b} col-span-2 p-1.5`}>
          <div className={cn}>收货人电话</div>
          <div className={en}>TELEPHONE</div>
        </div>
        <div className={`${b} col-span-4 p-1.5 ${val}`}>{c.client_phone}</div>
      </div>

      {/* GOODS TABLE — 11 columns to match image */}
      <div className="grid grid-cols-11">
        {/* Headers */}
        <HeaderCell cn="货物名称" en="DESCRIPTION" />
        <HeaderCell cn="包装" en="PACKAGE" />
        <HeaderCell cn="件数" en="QUANTITY" />
        <HeaderCell cn="箱号" en="CTN NO" />
        <HeaderCell cn="包装费" en="PACKAGING FEE" />
        <HeaderCell cn="" en="LOAD" topCn="体积" />
        <HeaderCell cn="" en="UNLOAD" />
        <HeaderCell cn="" en="CBM" />
        <HeaderCell cn="重量" en="WEIGHT" />
        <HeaderCell cn="税款" en="TAX" />
        <HeaderCell cn="货运" en="FREIGHT" />

        {/* Values */}
        <ValueCell v={c.description} />
        <ValueCell v={c.package_type} />
        <ValueCell v={c.quantity} />
        <ValueCell v={c.ctn_no} />
        <ValueCell v={c.packaging_fee} />
        <ValueCell v={c.loading_fee} />
        <ValueCell v={c.unloading_fee} />
        <ValueCell v={c.cbm} />
        <ValueCell v={c.weight} />
        <ValueCell v={c.tax} />
        <ValueCell v={c.freight} />
      </div>

      {/* BOTTOM CHARGES TABLE — 6 columns. Image shows LOCAL FREIGHT in top-row pos but layout uses 6: VALUE | INSURANCE | BILL CHARGE | ADVANCE | TOTAL | TRADE MODE. Image second row label says FREIGHT ON DELIVERY for col 5 — keep it. */}
      <div className="grid grid-cols-6">
        <HeaderCell cn="价值" en="VALUE OF GOODS" />
        <HeaderCell cn="保险" en="INSURANCE" />
        <HeaderCell cn="账单费运" en="BILL CHARGE" />
        <HeaderCell cn="预付款" en="ADVANCE" />
        <HeaderCell cn="合计金额" en="TOTAL AMOUNT" red />
        <HeaderCell cn="贸易模式" en="TRADE MODE" />

        <ValueCell v={c.value_of_goods} />
        <ValueCell v={Number(c.insurance || 0).toFixed(2)} />
        <ValueCell v={c.bill_charge} />
        <ValueCell v={c.advance_amount} />
        <ValueCell v={c.grand_total} bold />
        <ValueCell v={c.trade_mode} />
      </div>

      {/* TOTAL IN WORDS */}
      <div className={`${b} p-1.5 text-[11px]`}>
        <b>TOTAL AMOUNT IN WORDS/ 元整</b>
      </div>

      {/* Remarks + signature */}
      <div className="grid grid-cols-12">
        <div className={`${b} col-span-8 p-1.5`}>
          <div className={cn}>备注</div>
          <div className={en}>REMARKS</div>
          <div className={`${val} mt-1`}>{c.remarks}</div>
        </div>
        <div className={`${b} col-span-2 p-1.5`}>
          <div className={cn}>收货人签字</div>
          <div className={en}>SIGNATURE</div>
        </div>
        <div className={`${b} col-span-2 p-1.5 ${val} text-center`}>{receivedBy}</div>
      </div>

      {/* NOTES */}
      <div className="mt-3 text-[10.5px] leading-snug text-slate-800">
        <div className="font-bold">注意事项 (NOTES):</div>
        <ol className="ml-5 list-decimal space-y-0.5 mt-1">
          <li>In order to file a claim for any type of loss or damage, the customer must specify the true value of the items and have them insured.</li>
          <li>The customer or supplier must provide us with an actual description and quantity of the goods.</li>
          <li>False item descriptions and secret carriage of prohibited goods by the Chinese government, like dangerous, flammable, counterfeit goods of brands, etc., are strictly prohibited. If found, the consignor must bear all the fines, and transport will not be held responsible for the seizure of the goods.</li>
          <li>The customer must provide all the necessary documents that are necessary for China's customs clearance.</li>
          <li>The transport company will not be liable for goods after they are taken by the customer or picked up on the customer's behalf by a third party.</li>
          <li>Damage or leakage of fragile items, liquids, seized goods, etc., is not the responsibility of the transportation company.</li>
          <li>If goods are not collected within one month of arrival, 2RMB per day will be charged after that date.</li>
          <li>The above terms and conditions have been agreed to by both parties.</li>
        </ol>
        <div className="mt-3 text-right text-[11px] space-y-0.5">
          <div><b>Received By :</b> {receivedBy}</div>
          <div><b>Contact No :</b></div>
          <div><b>Signature :</b></div>
        </div>
      </div>
    </div>
  );
}

function HeaderCell({ cn, en, topCn, red }: { cn: string; en: string; topCn?: string; red?: boolean }) {
  return (
    <div className="border border-slate-400 p-1 text-center">
      {topCn && <div className="text-[9px] text-slate-700 leading-tight">{topCn}</div>}
      <div className="text-[9.5px] text-slate-700 leading-tight">{cn}</div>
      <div className={`text-[10.5px] font-bold leading-tight ${red ? "text-red-600" : "text-slate-900"}`}>{en}</div>
    </div>
  );
}

function ValueCell({ v, bold }: { v: any; bold?: boolean }) {
  return (
    <div className={`border border-slate-400 p-1.5 text-center text-sm min-h-[36px] ${bold ? "font-bold" : ""}`}>
      {v === null || v === undefined || v === "" ? "" : String(v)}
    </div>
  );
}
