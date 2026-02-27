import React from "react";

const RED_SUITS = new Set(["♥", "♦"]);

export function Card({ suit, value, isPicked, onClick, indexLabel }) {
  const isRed = RED_SUITS.has(suit);

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isPicked}
      aria-label={`Card ${value}${suit}${
        indexLabel ? ` position ${indexLabel}` : ""
      }`}
      className={[
        "relative h-40 w-27.5 select-none rounded-xl border",
        "bg-linear-to-b from-white to-slate-50 text-slate-900",
        "shadow-md shadow-black/20 transition",
        "hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/25",
        "active:translate-y-0",
        isPicked
          ? "ring-4 ring-violet-500/80 ring-offset-2 ring-offset-slate-950"
          : "ring-0",
      ].join(" ")}
    >
      {/* top-left corner */}
      <div className="absolute left-2.5 top-2.5 grid gap-0.5 text-left font-extrabold leading-none">
        <div className="text-[16px]">{value}</div>
        <div className={isRed ? "text-[16px] text-red-600" : "text-[16px]"}>
          {suit}
        </div>
      </div>

      {/* center */}
      <div className="absolute inset-0 grid place-content-center">
        <div
          className={[
            "text-[44px] font-semibold opacity-95",
            isRed ? "text-red-600" : "text-slate-900",
          ].join(" ")}
        >
          {suit}
        </div>
      </div>

      {/* bottom-right corner (rotated) */}
      <div className="absolute bottom-2.5 right-2.5 grid rotate-180 gap-0.5 text-right font-extrabold leading-none">
        <div className="text-[16px]">{value}</div>
        <div className={isRed ? "text-[16px] text-red-600" : "text-[16px]"}>
          {suit}
        </div>
      </div>
    </button>
  );
}
