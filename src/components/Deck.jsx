import React from "react";

export function Deck({ remaining, onClick }) {
  const isEmpty = remaining === 0;

  return (
    <button
      type="button"
      onClick={isEmpty ? undefined : onClick}
      disabled={isEmpty}
      aria-label={isEmpty ? "No cards remaining" : "Deck of cards"}
      className={[
        "relative h-47.5 w-full overflow-hidden rounded-2xl border",
        "border-white/15 bg-white/5 shadow-xl shadow-black/30",
        "transition",
        isEmpty
          ? "cursor-default opacity-90"
          : "cursor-pointer hover:-translate-y-0.5 hover:bg-white/10",
      ].join(" ")}
    >
      {!isEmpty ? (
        <>
          {/* pattern */}
          <div className="absolute inset-0 opacity-95">
            <div className="absolute inset-0 bg-linear-to-br from-violet-500/30 to-teal-400/15" />
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 25% 30%, rgba(255,255,255,.14) 0 2px, transparent 3px), radial-gradient(circle at 65% 60%, rgba(255,255,255,.12) 0 2px, transparent 3px)",
              }}
            />
          </div>

          {/* inset borders */}
          <div className="pointer-events-none absolute inset-2.5 rounded-[14px] border border-white/25" />
          <div className="pointer-events-none absolute inset-4.5 rounded-[14px] border border-white/15" />

          {/* label */}
          <div className="absolute inset-0 grid place-content-center gap-1 text-center">
            <div className="text-sm font-extrabold tracking-[0.22em]">DECK</div>
            <div className="text-sm text-white/75">{remaining} remaining</div>
            <div className="text-xs text-white/60">Click to draw</div>
          </div>
        </>
      ) : (
        <div className="absolute inset-0 grid place-content-center px-6 text-center">
          <div className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 font-semibold tracking-wide text-white/80">
            no cards remaining
          </div>
        </div>
      )}
    </button>
  );
}
