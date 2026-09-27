import { StudentSideNav } from "@/components/layout/student-side-nav";
import { FlashcardDeck } from "@/components/flashcards/flashcard-deck";

export default function FlashcardsPage() {
  return (
    <div className="min-h-screen md:flex">
      <StudentSideNav />
      <main className="flex-1 min-w-0 max-w-4xl mx-auto px-4 md:px-6 py-8 pb-24 md:pb-8 space-y-6">
        <div>
          <h1 className="font-display text-3xl font-bold text-ink">Santhali Flashcards</h1>
          <p className="text-ink/55 mt-1">
            Hindi/English on the front, Santhali — in Ol Chiki script and Roman letters — on the back.
          </p>
        </div>
        <FlashcardDeck />
      </main>
    </div>
  );
}
