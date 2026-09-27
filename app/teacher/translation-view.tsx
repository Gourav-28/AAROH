import { VoiceTranslator } from "@/components/translation/voice-translator";

export function TranslationView() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-ink">
          Talk &amp; Translate
        </h1>
        <p className="text-ink/55 mt-1">
          Hold the button and speak. AAROH shows what it heard, then plays it back in Santhali.
        </p>
      </div>
      <VoiceTranslator />
    </div>
  );
}