import Link from "next/link";
import {
  BookOpen,
  FlaskConical,
  Calculator,
  Globe2,
  ClipboardCheck,
  Star,
  Award,
  Volume2,
  ArrowRight,
} from "lucide-react";
import { StudentSideNav } from "@/components/layout/student-side-nav";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { currentLessons, students } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const icons = { book: BookOpen, flask: FlaskConical, calculator: Calculator, globe: Globe2 };

const me = students[0]; // Sona Murmu, our mock logged-in student

export default function StudentDashboardPage() {
  return (
    <div className="min-h-screen md:flex">
      <StudentSideNav />

      <main className="flex-1 min-w-0 max-w-6xl mx-auto px-4 md:px-6 py-8 pb-24 md:pb-8 space-y-10">
        {/* Greeting */}
        <section className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-ink/50 flex items-center gap-2">
              <Volume2 className="w-4 h-4" /> Johar, {me.name.split(" ")[0]}!
            </p>
            <h1 className="font-display text-3xl font-bold text-ink mt-1">
              What do you want to learn today?
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Stat icon={<Award className="w-5 h-5 text-amber-dark" />} value={me.badges} label="badges" />
            <Stat icon={<Star className="w-5 h-5 text-emerald-dark" />} value={`${me.accuracy}%`} label="accuracy" />
          </div>
        </section>

        {/* Big nav cards */}
        <section className="grid sm:grid-cols-3 gap-5">
          <NavCard
            href="/flashcards"
            title="Santhali Flashcards"
            desc="Flip cards, hear the words, practice."
            emoji="🗂️"
            tone="amber"
          />
          <NavCard
            href="#assessment"
            title="Mock Test"
            desc="Try Chapter 4: Plants Around Us."
            emoji="📝"
            tone="emerald"
          />
          <NavCard
            href="/translation"
            title="Talk & Translate"
            desc="Speak in Hindi, hear it in Santhali."
            emoji="🎙️"
            tone="slate"
          />
        </section>

        {/* Current lessons */}
        <section>
          <h2 className="font-display text-xl font-bold text-ink mb-4">Continue learning</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {currentLessons.map((lesson) => {
              const Icon = icons[lesson.icon];
              return (
                <Card key={lesson.id} className="rounded-blob">
                  <CardContent className="flex items-center gap-4 p-5">
                    <div className="w-14 h-14 shrink-0 rounded-2xl bg-emerald-light flex items-center justify-center">
                      <Icon className="w-7 h-7 text-emerald-dark" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-ink/45 uppercase">{lesson.subject}</p>
                      <p className="font-display font-semibold text-ink truncate">{lesson.title}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Progress value={lesson.progress} className="flex-1" />
                        <span className="text-xs font-semibold text-ink/50 w-9 text-right">
                          {lesson.progress}%
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Assessment sheet */}
        <section id="assessment">
          <h2 className="font-display text-xl font-bold text-ink mb-4">Mock test</h2>
          <Card className="rounded-blob bg-emerald text-white overflow-hidden">
            <CardContent className="p-6 flex flex-col sm:flex-row items-center gap-6">
              <div className="w-20 h-20 rounded-2xl bg-white/15 flex items-center justify-center shrink-0">
                <ClipboardCheck className="w-10 h-10" />
              </div>
              <div className="flex-1">
                <h3 className="font-display text-xl font-bold">Chapter 4: Plants Around Us</h3>
                <p className="text-emerald-light/90 mt-1">
                  3 questions · Santhali hints included · ~5 minutes
                </p>
              </div>
              <Link
                href="/mock-sheet"
                className="inline-flex items-center gap-2 bg-white text-emerald-dark font-semibold px-5 py-2.5 rounded-xl hover:bg-cream shrink-0"
              >
                Start test <ArrowRight className="w-4 h-4" />
              </Link>
            </CardContent>
          </Card>
        </section>

        {/* Progress summary */}
        <section>
          <h2 className="font-display text-xl font-bold text-ink mb-4">Your progress</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-5 space-y-2">
                <p className="text-sm font-semibold text-ink/50">Overall accuracy</p>
                <p className="font-display text-3xl font-bold text-emerald-dark">{me.accuracy}%</p>
                <Progress value={me.accuracy} />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5 space-y-2">
                <p className="text-sm font-semibold text-ink/50">Badges earned</p>
                <div className="flex items-center gap-1 flex-wrap">
                  {Array.from({ length: me.badges }).map((_, i) => (
                    <Award key={i} className="w-6 h-6 text-amber" />
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5 space-y-2">
                <p className="text-sm font-semibold text-ink/50">Needs a little more practice</p>
                <div className="flex flex-wrap gap-2">
                  {me.weakConcepts.length === 0 ? (
                    <Badge tone="emerald">All caught up!</Badge>
                  ) : (
                    me.weakConcepts.map((c) => (
                      <Badge key={c} tone="amber">
                        {c}
                      </Badge>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}

function Stat({ icon, value, label }: { icon: React.ReactNode; value: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-2.5 border border-ink/8">
      {icon}
      <div className="leading-tight">
        <p className="font-display font-bold text-ink">{value}</p>
        <p className="text-[11px] text-ink/45 -mt-0.5">{label}</p>
      </div>
    </div>
  );
}

function NavCard({
  href,
  title,
  desc,
  emoji,
  tone,
}: {
  href: string;
  title: string;
  desc: string;
  emoji: string;
  tone: "amber" | "emerald" | "slate";
}) {
  const bg = { amber: "bg-amber-light", emerald: "bg-emerald-light", slate: "bg-slateblue-light" }[tone];
  const hoverText = {
    amber: "group-hover:text-amber-dark",
    emerald: "group-hover:text-emerald-dark",
    slate: "group-hover:text-slateblue-dark",
  }[tone];
  return (
    <Link href={href} className="group">
      <Card className={cn_rounded()}>
        <CardContent className="p-6 space-y-3">
          <div className={`w-14 h-14 rounded-2xl ${bg} flex items-center justify-center text-3xl`}>{emoji}</div>
          <h3 className={cn("font-display font-bold text-lg text-ink", hoverText)}>{title}</h3>
          <p className="text-sm text-ink/55">{desc}</p>
        </CardContent>
      </Card>
    </Link>
  );
}

function cn_rounded() {
  return "rounded-blob transition-transform group-hover:-translate-y-1";
}
