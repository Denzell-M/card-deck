import { useState } from "react";
import { Card } from "./components/Card";
import { Deck } from "./components/Deck";
import {
  drawNRandom,
  drawOneRandom,
  makeStandardDeck,
  shuffleArray,
} from "./game/deckUtils";

export default function App() {
  // Lazy init so we only create the initial deck once.
  const [deck, setDeck] = useState(() => makeStandardDeck());
  const [hand, setHand] = useState([]);
  const [pickedIndex, setPickedIndex] = useState(null);

  const remaining = deck.length;

  function clearPicked() {
    setPickedIndex(null);
  }

  function deal(n) {
    setDeck((prevDeck) => {
      const toReturn = hand.filter(
        (card) => !String(card.id).startsWith("WILD-"),
      );
      const restoreDeck = [...prevDeck, ...toReturn];

      const { drawn, nextDeck } = drawNRandom(restoreDeck, n);

      setHand(drawn);
      clearPicked();

      return nextDeck;
    });
  }

  // function returnHandToDeck() {
  //   setHand((prevHand) => {
  //     const toReturn = prevHand.filter(
  //       (card) => !String(card.id).startsWith("WILD-"),
  //     );
  //     setDeck((prevDeck) => [...prevDeck, ...toReturn]);
  //     return [];
  //   });
  //   setPickedIndex(null);
  // }

  function reset() {
    // brand new deck, empty hand, nothing picked.
    setDeck(makeStandardDeck());
    setHand([]);
    setPickedIndex(null);
  }

  function tossPicked() {}

  // Not working yet
  function wildcard() {
    setHand((prev) => shuffleArray(prev));
    clearPicked();
  }
  function regroup() {}

  function onClickDeck() {
    setDeck((prevDeck) => {
      const { card, nextDeck } = drawOneRandom(prevDeck);
      if (!card) return prevDeck;

      setHand((prevHand) => [...prevHand, card]);
      clearPicked();

      return nextDeck;
    });
  }

  function onCardClick() {}

  const btnBase =
    "rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-sm font-medium text-white/90 shadow-md shadow-black/20 transition hover:-translate-y-0.5 hover:bg-white/15 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50";
  const btnDanger = "border-red-400/30 bg-red-500/15 hover:bg-red-500/20";

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div
        className={[
          "mx-auto max-w-6xl px-4 py-8",
          "bg-[radial-gradient(1100px_700px_at_20%_10%,rgba(124,92,255,.22),transparent_55%),radial-gradient(900px_600px_at_75%_10%,rgba(45,212,191,.18),transparent_60%),radial-gradient(900px_700px_at_50%_90%,rgba(255,255,255,.06),transparent_60%)]",
        ].join(" ")}
      >
        <header className="mb-5 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight">
              Deck Manipulator
            </h1>
            <p className="mt-1 max-w-2xl text-sm text-white/70">
              Click the deck to draw. Pick a card to swap or toss it.
            </p>
          </div>

          <div className="flex flex-wrap justify-end gap-2">
            <button className={btnBase} onClick={() => deal(5)} type="button">
              Deal 5
            </button>
            <button className={btnBase} onClick={() => deal(7)} type="button">
              Deal 7
            </button>
            <button className={btnBase} onClick={reset} type="button">
              Reset
            </button>
            <button
              className={[btnBase, btnDanger].join(" ")}
              onClick={tossPicked}
              type="button"
              disabled={pickedIndex == null}
              title={
                pickedIndex == null ? "Pick a card first" : "Delete picked card"
              }
            >
              Toss
            </button>
            <button className={btnBase} onClick={wildcard} type="button">
              Wildcard
            </button>
            <button className={btnBase} onClick={regroup} type="button">
              Regroup
            </button>
          </div>
        </header>

        <main className="grid items-start gap-4 md:grid-cols-[320px_1fr]">
          <section className="grid gap-4">
            <Deck remaining={remaining} onClick={onClickDeck} />

            <div className="grid grid-cols-3 gap-2.5">
              <div className="rounded-2xl border border-white/15 bg-white/5 p-3">
                <div className="text-xs text-white/70">In hand</div>
                <div className="mt-1 text-lg font-extrabold">{hand.length}</div>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/5 p-3">
                <div className="text-xs text-white/70">In deck</div>
                <div className="mt-1 text-lg font-extrabold">{remaining}</div>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/5 p-3">
                <div className="text-xs text-white/70">Picked</div>
                <div className="mt-1 text-lg font-extrabold">
                  {pickedIndex == null ? "—" : `#${pickedIndex + 1}`}
                </div>
              </div>
            </div>
          </section>

          <section className="min-h-65 rounded-2xl border border-white/15 bg-white/5 p-4 shadow-xl shadow-black/30">
            <div className="flex flex-wrap gap-3">
              {hand.length === 0 ? (
                <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/75">
                  No cards selected. Click the deck or Deal.
                </div>
              ) : (
                hand.map((card, i) => (
                  <Card
                    key={card.id}
                    suit={card.suit}
                    value={card.value}
                    isPicked={pickedIndex === i}
                    onClick={() => onCardClick(i)}
                    indexLabel={i + 1}
                  />
                ))
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
