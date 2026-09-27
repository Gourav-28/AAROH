import { TeacherSideNav } from "@/components/layout/teacher-side-nav";
import { VoiceTranslator } from "@/components/translation/voice-translator";

export default function TranslationPage() {
  return (
    <div className="min-h-screen md:flex">
      <TeacherSideNav />
      <main className="flex-1 min-w-0 max-w-3xl mx-auto px-4 md:px-6 py-8 pb-24 md:pb-8 space-y-6">
        <div>
          <h1 className="font-display text-3xl font-bold text-ink">Talk &amp; Translate</h1>
          <p className="text-ink/55 mt-1">
            Hold the button and speak. AAROH shows what it heard, then plays it back in Santhali.
          </p>
        </div>
        <VoiceTranslator />
      </main>
    </div>
  );
}
