"use client";

import { useMemo, useState } from "react";
import { Volume2, CheckCircle2, RotateCcw, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { flashcards, type Flashcard } from "@/lib/mock-data";
import { speak, cn } from "@/lib/utils";

const categories = ["All", "Vocabulary", "Science", "Math"] as const;

export function FlashcardDeck() {
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [results, setResults] = useState<Record<string, "right" | "practice">>({});

  const deck = useMemo(
    () => (category === "All" ? flashcards : flashcards.filter((c) => c.category === category)),
    [category]
  );
  const card: Flashcard | undefined = deck[index % deck.length];

  function next() {
    setFlipped(false);
    setIndex((i) => (i + 1) % deck.length);
  }

  function mark(result: "right" | "practice") {
    if (!card) return;
    setResults((r) => ({ ...r, [card.id]: result }));
    setTimeout(next, 250);
  }

  if (!card) return null;

  const doneCount = Object.keys(results).filter((id) => deck.some((c) => c.id === id)).length;

  return (
    <div className="space-y-6">
      {/* Category filter */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => {
                setCategory(c);
                setIndex(0);
                setFlipped(false);
              }}
              className={cn(
                "px-4 py-1.5 rounded-full text-sm font-semibold border-2 transition-colors",
                category === c ? "border-amber bg-amber-light text-amber-dark" : "border-ink/10 text-ink/55"
              )}
            >
              {c}
            </button>
          ))}
        </div>
        <p className="text-sm text-ink/45">
          Card {index + 1} of {deck.length} · {doneCount} reviewed this session
        </p>
      </div>

      {/* Card */}
      <div className="mx-auto max-w-md" style={{ perspective: "1200px" }}>
        <button
          onClick={() => setFlipped((f) => !f)}
          aria-label="Flip flashcard"
          className="relative w-full aspect-[4/5] block"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div
            className="absolute inset-0 transition-transform duration-500"
            style={{
              transformStyle: "preserve-3d",
              transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
            }}
          >
            {/* Front */}
            <div
              className="absolute inset-0 rounded-blob bg-white border-2 border-ink/8 shadow-[0_8px_24px_rgba(38,35,25,0.10)] flex flex-col items-center justify-center gap-4 p-8"
              style={{ backfaceVisibility: "hidden" }}
            >
              <Badge tone="amber">{card.category}</Badge>
              <span className="text-7xl">{card.imageEmoji}</span>
              <div className="text-center">
                <p className="font-display text-2xl font-bold text-ink">{card.front.hindi}</p>
                <p className="text-ink/50">{card.front.english}</p>
              </div>
              <p className="text-xs text-ink/35 mt-2">Tap card to reveal Santhali</p>
            </div>

            {/* Back */}
            <div
              className="absolute inset-0 rounded-blob bg-emerald text-white shadow-[0_8px_24px_rgba(38,35,25,0.10)] flex flex-col items-center justify-center gap-4 p-8"
              style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
            >
              <Badge tone="neutral" className="bg-white/15 text-white">
                Santhali
              </Badge>
              <p className="olchiki text-5xl">{card.back.santhaliOlChiki}</p>
              <p className="text-xl font-semibold text-emerald-light">{card.back.santhaliRoman}</p>
              <span
                role="button"
                tabIndex={0}
                onClick={(e) => {
                  e.stopPropagation();
                  speak(card.back.santhaliRoman, "hi-IN");
                }}
                className="flex items-center gap-2 bg-white/15 hover:bg-white/25 rounded-full px-4 py-2 text-sm font-semibold"
              >
                <Volume2 className="w-4 h-4" /> Play audio
              </span>
            </div>
          </div>
        </button>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-center gap-3">
        <Button variant="outline" onClick={() => mark("practice")} className="border-amber/40 text-amber-dark">
          <RotateCcw className="w-4 h-4" /> Needs practice
        </Button>
        <Button variant="primary" onClick={() => mark("right")}>
          <CheckCircle2 className="w-4 h-4" /> Got it right
        </Button>
        <Button variant="ghost" onClick={next} aria-label="Skip card">
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
