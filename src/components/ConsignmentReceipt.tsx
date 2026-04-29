import { forwardRef } from "react";
import receiptTemplate from "@/assets/consignment-receipt-template-blank.jpg";
import { Consignment } from "@/lib/store";

export const ConsignmentReceipt = forwardRef<HTMLDivElement, { c: Consignment }>(function ConsignmentReceipt({ c }, ref) {
  const isGuangzhou = (c.start_station || "").toLowerCase().includes("guangzhou");
  const isYiwu = (c.start_station || "").toLowerCase().includes("yiwu");
  const stationLabel = isGuangzhou ? "Guangzhou" : isYiwu ? "Yiwu" : c.start_station;
  const receivedBy = isGuangzhou ? "Ken Guangzhou" : isYiwu ? "Yiwu Su" : "";

  const totalAmountNum = Math.trunc(Number(c.grand_total || 0));
  const totalInWords = numberToWords(totalAmountNum);

  const text = {
    billNo: c.bill_no || "",
    startDate: c.start_date || "",
    marka: c.marka || "",
    phone: c.client_phone || "",
    description: c.description || "",
    packageType: c.package_type || "",
    quantity: String(c.quantity ?? ""),
    ctnNo: c.ctn_no || "",
    packagingFee: formatAmount(c.packaging_fee),
    loadingFee: formatAmount(c.loading_fee),
    unloadingFee: formatAmount(c.unloading_fee),
    cbm: formatAmount(c.cbm),
    weight: formatAmount(c.weight),
    tax: formatAmount(c.tax),
    freight: formatAmount(c.freight),
    localFreight: formatAmount(c.local_freight),
    valueOfGoods: formatAmount(c.value_of_goods),
    insurance: formatAmount(c.insurance),
    billCharge: formatAmount(c.bill_charge),
    advance: formatAmount(c.advance_amount),
    total: String(Math.trunc(Number(c.grand_total || 0)) || ""),
    totalWords: totalInWords,
    freightOnDelivery: formatAmount(c.payment_of_goods),
    tradeMode: c.trade_mode || "",
    remarks: c.remarks || "",
    destination: c.end_station || "",
    station: stationLabel || "",
    signature: receivedBy,
  };

  // Render at native 1578×997, then scale down to fit container width (max 900px).
  const NATIVE_W = 1578;
  const NATIVE_H = 997;
  const TARGET_W = 900;
  const scale = TARGET_W / NATIVE_W;

  return (
    <div className="overflow-auto">
      <div
        className="relative mx-auto font-sans text-black"
        style={{ width: `${TARGET_W}px`, height: `${NATIVE_H * scale}px` }}
      >
        <div
          className="absolute left-0 top-0 origin-top-left"
          style={{
            width: `${NATIVE_W}px`,
            height: `${NATIVE_H}px`,
            transform: `scale(${scale})`,
          }}
        >
          <img
            src={receiptTemplate}
            alt="Consignment receipt template"
            className="absolute inset-0 h-full w-full select-none"
            draggable={false}
          />

          <FillText className="left-[288px] top-[210px] w-[460px] text-[17px] font-semibold tracking-[0.2px]" value={text.billNo} />
          <FillText className="left-[284px] top-[290px] w-[464px] text-[17px] font-semibold" value={text.startDate} />
          <FillText className="left-[286px] top-[369px] w-[463px] text-[17px] font-semibold" value={text.marka} />

          {/* Starting station — green */}
          <FillText className="left-[1062px] top-[210px] w-[493px] text-[24px] font-bold text-[#2ea24f]" value={text.station} />
          {/* Destination — red */}
          <FillText className="left-[1061px] top-[290px] w-[495px] text-[20px] font-bold text-[#e11d1d]" value={text.destination} />
          <FillText className="left-[1061px] top-[369px] w-[495px] text-[18px] font-semibold" value={text.phone} />

          {/* Goods row */}
          <FillText className="left-[4px] top-[522px] w-[274px] text-[17px] font-semibold" value={text.description} />
          <FillText className="left-[278px] top-[522px] w-[101px] text-[17px] font-semibold" value={text.packageType} />
          <FillText className="left-[379px] top-[522px] w-[110px] text-[17px] font-semibold" value={text.quantity} />
          <FillText className="left-[489px] top-[522px] w-[107px] text-[17px] font-semibold" value={text.ctnNo} />
          <FillText className="left-[596px] top-[522px] w-[158px] text-[17px] font-semibold" value={text.packagingFee} />
          <FillText className="left-[754px] top-[522px] w-[87px] text-[17px] font-semibold" value={text.loadingFee} />
          <FillText className="left-[841px] top-[522px] w-[113px] text-[17px] font-semibold" value={text.unloadingFee} />
          <FillText className="left-[954px] top-[522px] w-[102px] text-[17px] font-semibold" value={text.cbm} />
          <FillText className="left-[1056px] top-[522px] w-[153px] text-[17px] font-semibold" value={text.weight} />
          <FillText className="left-[1209px] top-[522px] w-[112px] text-[17px] font-semibold" value={text.tax} />
          <FillText className="left-[1321px] top-[522px] w-[99px] text-[17px] font-semibold" value={text.freight} />
          <FillText className="left-[1420px] top-[522px] w-[157px] text-[17px] font-semibold" value={text.localFreight} />

          {/* Money row — column boundaries: 0,277,488,752,1055,1206,1421,1576. Values sit just under headers (~605px) */}
          <FillText className="left-[0px] top-[608px] w-[277px] text-[17px] font-semibold" value={text.valueOfGoods} />
          <FillText className="left-[277px] top-[608px] w-[211px] text-[17px] font-semibold" value={text.insurance} />
          <FillText className="left-[488px] top-[608px] w-[264px] text-[17px] font-semibold" value={text.billCharge} />
          <FillText className="left-[752px] top-[608px] w-[303px] text-[17px] font-semibold" value={text.advance} />
          {/* TOTAL AMOUNT — red */}
          <FillText className="left-[1055px] top-[608px] w-[151px] text-[18px] font-bold text-[#e11d1d]" value={text.total} />
          <FillText className="left-[1206px] top-[608px] w-[215px] text-[17px] font-semibold" value={text.freightOnDelivery} />
          <FillText className="left-[1421px] top-[608px] w-[155px] text-[17px] font-semibold" value={text.tradeMode} />

          {/* Total amount in words — sits inside the box, below the "TOTAL AMOUNT IN WORDS" label */}
          {text.totalWords && (
            <div className="absolute left-[10px] top-[700px] w-[760px] text-[16px] font-semibold text-center leading-[1.1]">
              {text.totalWords}
            </div>
          )}

          {/* REMARKS field — sits inside the REMARKS box (label is at ~left 0-200, box continues to ~770) */}
          <FillText className="left-[10px] top-[760px] w-[760px] text-[15px] font-medium leading-[1.15]" value={text.remarks} />

          {/* Signature — placed in the bottom-right stamp area, near the round seal */}
          <FillText className="left-[1310px] top-[720px] w-[230px] text-[18px] font-bold text-[#000]" value={text.signature} />

          {/* Starting station name — top middle, below the email line, larger */}
          {text.station && (
            <div className="absolute left-[560px] top-[155px] w-[460px] text-[28px] font-extrabold text-[#2ea24f] text-center leading-none">
              {text.station}
            </div>
          )}

          {/* Missing right-side bottom border under signature box (template ends at x=1204) */}
          <div className="absolute left-[1204px] top-[736px] h-[2px] w-[374px] bg-black" />
          {/* Right-edge vertical border continuation for the signature box */}
          <div className="absolute left-[1576px] top-[684px] h-[54px] w-[2px] bg-black" />
        </div>
      </div>
    </div>
  );
}

function FillText({ className, value }: { className: string; value: string }) {
  if (!value) return null;
  return <div className={`absolute text-center leading-none ${className}`}>{value}</div>;
}

function formatAmount(value: number | string | null | undefined) {
  if (value === null || value === undefined || value === "") return "";
  const numericValue = Number(value);
  if (Number.isNaN(numericValue)) return String(value);
  return Number.isInteger(numericValue) ? String(numericValue) : numericValue.toFixed(2);
}

// Convert a number to English words (supports decimals as "and XX/100").
function numberToWords(num: number): string {
  if (!isFinite(num) || num === 0) return "";
  const negative = num < 0;
  const n = Math.abs(num);
  const whole = Math.floor(n);
  const cents = Math.round((n - whole) * 100);

  const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
    "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
  const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

  function under1000(x: number): string {
    let s = "";
    if (x >= 100) {
      s += ones[Math.floor(x / 100)] + " Hundred";
      x %= 100;
      if (x) s += " ";
    }
    if (x >= 20) {
      s += tens[Math.floor(x / 10)];
      if (x % 10) s += "-" + ones[x % 10];
    } else if (x > 0) {
      s += ones[x];
    }
    return s;
  }

  function toWords(x: number): string {
    if (x === 0) return "Zero";
    const units = ["", "Thousand", "Million", "Billion"];
    let i = 0;
    let result = "";
    while (x > 0) {
      const chunk = x % 1000;
      if (chunk) {
        result = under1000(chunk) + (units[i] ? " " + units[i] : "") + (result ? " " + result : "");
      }
      x = Math.floor(x / 1000);
      i++;
    }
    return result;
  }

  let words = toWords(whole);
  // integer-only totals: no fractional suffix
  words += " Only";
  return (negative ? "Negative " : "") + words;
}
