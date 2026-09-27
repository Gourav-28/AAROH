"use client";

import { useRef, useState } from "react";
import { Mic, Volume2, ArrowLeftRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { speak, cn } from "@/lib/utils";

type Direction = "hi-to-sat" | "sat-to-hi";

// A tiny mock "translation memory" so the demo feels alive without a backend.
const phrasePairs: { hindi: string; santhaliRoman: string; santhaliOlChiki: string }[] = [
  { hindi: "आज मौसम अच्छा है", santhaliRoman: "Tehen'ge mausam bugi'kana", santhaliOlChiki: "ᱛᱮᱦᱮᱸᱜᱮ ᱢᱚᱥᱟᱢ ᱵᱩᱜᱤᱠᱟᱱᱟ" },
  { hindi: "मुझे स्कूल जाना है", santhaliRoman: "Am skul senoge lagit", santhaliOlChiki: "ᱟᱢ ᱥᱠᱩᱞ ᱥᱮᱱᱚᱜᱮ ᱞᱟᱹᱜᱤᱛ" },
  { hindi: "पानी पी लो", santhaliRoman: "Daᶜ nu me", santhaliOlChiki: "ᱫᱟᱜ ᱱᱩ ᱢᱮ" },
  { hindi: "यह पेड़ बहुत बड़ा है", santhaliRoman: "Nowa dare do maranaɡ tahen kana", santhaliOlChiki: "ᱱᱚᱶᱟ ᱫᱟᱨᱮ ᱫᱚ ᱢᱟᱨᱟᱶ ᱛᱟᱦᱮᱸ ᱠᱟᱱᱟ" },
];

export function VoiceTranslator() {
  const [direction, setDirection] = useState<Direction>("hi-to-sat");
  const [listening, setListening] = useState(false);
  const [result, setResult] = useState<typeof phrasePairs[number] | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function startHold() {
    setListening(true);
    setResult(null);
    timeoutRef.current = setTimeout(() => {
      const pick = phrasePairs[Math.floor(Math.random() * phrasePairs.length)];
      setResult(pick);
      setListening(false);
    }, 1400);
  }

  function endHold() {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setListening(false);
  }

  const sourceLabel = direction === "hi-to-sat" ? "Hindi / English" : "Santhali";
  const targetLabel = direction === "hi-to-sat" ? "Santhali" : "Hindi / English";

  return (
    <div className="space-y-6">
      {/* Direction toggle */}
      <div className="flex items-center justify-center gap-3">
        <Badge tone="slate">{sourceLabel}</Badge>
        <button
          onClick={() => {
            setDirection((d) => (d === "hi-to-sat" ? "sat-to-hi" : "hi-to-sat"));
            setResult(null);
          }}
          aria-label="Swap direction"
          className="w-9 h-9 rounded-full bg-white border border-ink/10 flex items-center justify-center hover:bg-ink/5"
        >
          <ArrowLeftRight className="w-4 h-4 text-ink/60" />
        </button>
        <Badge tone="emerald">{targetLabel}</Badge>
      </div>

      {/* Mic + waveform */}
      <div className="flex flex-col items-center gap-4 py-4">
        <button
          onMouseDown={startHold}
          onMouseUp={endHold}
          onMouseLeave={endHold}
          onTouchStart={startHold}
          onTouchEnd={endHold}
          className={cn(
            "w-28 h-28 rounded-full flex items-center justify-center shadow-lg transition-transform select-none",
            listening ? "bg-amber scale-110" : "bg-slateblue hover:scale-105"
          )}
        >
          <Mic className="w-11 h-11 text-white" />
        </button>
        <p className="text-sm font-semibold text-ink/50">
          {listening ? "Listening…" : "Hold to speak"}
        </p>

        {/* Waveform mock */}
        <div className="flex items-end gap-1 h-10">
          {Array.from({ length: 24 }).map((_, i) => (
            <span
              key={i}
              className={cn(
                "w-1.5 rounded-full bg-slateblue/70 transition-all duration-150",
                listening ? "animate-pulse" : ""
              )}
              style={{
                height: listening ? `${8 + ((i * 37) % 32)}px` : "6px",
                animationDelay: `${i * 40}ms`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Source / target preview */}
      <div className="grid sm:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-5 space-y-2 min-h-[120px]">
            <p className="text-xs font-semibold text-ink/40 uppercase tracking-wide">{sourceLabel} (heard)</p>
            <p className="font-display text-lg text-ink">
              {result ? (direction === "hi-to-sat" ? result.hindi : result.santhaliRoman) : "—"}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-emerald text-white">
          <CardContent className="p-5 space-y-2 min-h-[120px]">
            <p className="text-xs font-semibold text-emerald-light/80 uppercase tracking-wide">
              {targetLabel} (translated)
            </p>
            {result ? (
              <>
                {direction === "hi-to-sat" ? (
                  <>
                    <p className="olchiki text-2xl">{result.santhaliOlChiki}</p>
                    <p className="font-semibold text-emerald-light">{result.santhaliRoman}</p>
                  </>
                ) : (
                  <p className="font-display text-lg">{result.hindi}</p>
                )}
                <button
                  onClick={() => speak(result.santhaliRoman, "hi-IN")}
                  className="mt-2 inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 rounded-full px-4 py-1.5 text-sm font-semibold"
                >
                  <Volume2 className="w-4 h-4" /> Play audio
                </button>
              </>
            ) : (
              <p className="text-emerald-light/60">—</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
