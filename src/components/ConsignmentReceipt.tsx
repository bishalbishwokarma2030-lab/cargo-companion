import receiptTemplate from "@/assets/consignment-receipt-template-blank.jpg";
import { Consignment } from "@/lib/store";

export function ConsignmentReceipt({ c }: { c: Consignment }) {
  const isGuangzhou = (c.start_station || "").toLowerCase().includes("guangzhou");
  const isYiwu = (c.start_station || "").toLowerCase().includes("yiwu");
  const stationLabel = isGuangzhou ? "Guangzhou" : isYiwu ? "Yiwu" : c.start_station;
  const receivedBy = isGuangzhou ? "Ken Guangzhou" : isYiwu ? "Yiwu Su" : "";
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
    total: formatAmount(c.grand_total),
    freightOnDelivery: formatAmount(c.payment_of_goods),
    tradeMode: c.trade_mode || "",
    remarks: c.remarks || "",
    destination: c.end_station || "",
    station: stationLabel || "",
    signature: receivedBy,
  };

  return (
    <div className="overflow-auto">
      <div
        className="relative mx-auto font-sans text-black"
        style={{
          width: "min(100%, 900px)",
          aspectRatio: "1578 / 997",
        }}
      >
        <div
          className="absolute left-0 top-0 origin-top-left"
          style={{
            width: "1578px",
            height: "997px",
            transform: "scale(calc(min(100%, 900px) / 1578px))",
          }}
        >
        <img src={receiptTemplate} alt="Consignment receipt template" className="absolute inset-0 h-full w-full select-none object-contain" draggable={false} />

        <FillText className="left-[288px] top-[198px] w-[460px] text-[17px] font-semibold tracking-[0.2px]" value={text.billNo} />
        <FillText className="left-[284px] top-[278px] w-[464px] text-[17px] font-semibold" value={text.startDate} />
        <FillText className="left-[286px] top-[357px] w-[463px] text-[17px] font-semibold" value={text.marka} />

        <FillText className="left-[755px] top-[156px] w-[300px] text-center text-[24px] font-bold text-[#2ea24f]" value={text.station} />
        <FillText className="left-[1062px] top-[198px] w-[493px] text-center text-[24px] font-bold text-[#2ea24f]" value={text.station} />
        <FillText className="left-[1061px] top-[278px] w-[495px] text-center text-[19px] font-semibold" value={text.destination} />
        <FillText className="left-[1061px] top-[357px] w-[495px] text-center text-[18px] font-semibold" value={text.phone} />

        <FillText className="left-[4px] top-[510px] w-[274px] px-[6px] text-center text-[17px] font-semibold" value={text.description} />
        <FillText className="left-[278px] top-[510px] w-[101px] text-center text-[17px] font-semibold" value={text.packageType} />
        <FillText className="left-[379px] top-[510px] w-[110px] text-center text-[17px] font-semibold" value={text.quantity} />
        <FillText className="left-[489px] top-[510px] w-[107px] text-center text-[17px] font-semibold" value={text.ctnNo} />
        <FillText className="left-[596px] top-[510px] w-[158px] text-center text-[17px] font-semibold" value={text.packagingFee} />
        <FillText className="left-[754px] top-[510px] w-[87px] text-center text-[17px] font-semibold" value={text.loadingFee} />
        <FillText className="left-[841px] top-[510px] w-[113px] text-center text-[17px] font-semibold" value={text.unloadingFee} />
        <FillText className="left-[954px] top-[510px] w-[102px] text-center text-[17px] font-semibold" value={text.cbm} />
        <FillText className="left-[1056px] top-[510px] w-[153px] text-center text-[17px] font-semibold" value={text.weight} />
        <FillText className="left-[1209px] top-[510px] w-[112px] text-center text-[17px] font-semibold" value={text.tax} />
        <FillText className="left-[1321px] top-[510px] w-[99px] text-center text-[17px] font-semibold" value={text.freight} />
        <FillText className="left-[1420px] top-[510px] w-[157px] text-center text-[17px] font-semibold" value={text.localFreight} />

        <FillText className="left-[0px] top-[620px] w-[278px] text-center text-[17px] font-semibold" value={text.valueOfGoods} />
        <FillText className="left-[278px] top-[620px] w-[212px] text-center text-[17px] font-semibold" value={text.insurance} />
        <FillText className="left-[490px] top-[620px] w-[264px] text-center text-[17px] font-semibold" value={text.billCharge} />
        <FillText className="left-[754px] top-[620px] w-[301px] text-center text-[17px] font-semibold" value={text.advance} />
        <FillText className="left-[1055px] top-[620px] w-[152px] text-center text-[18px] font-bold" value={text.total} />
        <FillText className="left-[1207px] top-[620px] w-[214px] text-center text-[17px] font-semibold" value={text.freightOnDelivery} />
        <FillText className="left-[1421px] top-[620px] w-[157px] text-center text-[17px] font-semibold" value={text.tradeMode} />

        <FillText className="left-[279px] top-[701px] w-[777px] px-[12px] text-[16px] font-semibold leading-[1.15]" value={text.remarks} />
        <FillText className="left-[1205px] top-[701px] w-[373px] text-center text-[18px] font-medium" value={text.signature} />
      </div>
    </div>
  );
}

function FillText({ className, value }: { className: string; value: string }) {
  if (!value) return null;

  return <div className={`absolute leading-none ${className}`}>{value}</div>;
}

function formatAmount(value: number | string | null | undefined) {
  if (value === null || value === undefined || value === "") return "";
  const numericValue = Number(value);
  if (Number.isNaN(numericValue)) return String(value);
  return Number.isInteger(numericValue) ? String(numericValue) : numericValue.toFixed(2);
}
