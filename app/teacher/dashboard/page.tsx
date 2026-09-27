"use client";

import { useState } from "react";
import Link from "next/link";
import { UploadCloud, FileText, AlertTriangle, TrendingUp, Users, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { conceptGaps, classPerformance, students } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const recommendationTone: Record<string, "emerald" | "amber" | "slate"> = {
  "On Track": "emerald",
  Watch: "slate",
  "Remedial Needed": "amber",
};

export default function TeacherDashboardPage() {
  const [uploaded, setUploaded] = useState<string[]>([]);

  return (
    <div className="min-h-screen md:flex">

      <main className="flex-1 min-w-0 max-w-6xl mx-auto px-4 md:px-6 py-8 pb-24 md:pb-8 space-y-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-ink">Class 4 — Overview</h1>
          <p className="text-ink/55 mt-1">32 students · Santhali medium bridge programme</p>
        </div>

        {/* Top metrics */}
        <section className="grid sm:grid-cols-4 gap-4">
          <MetricCard
            icon={<TrendingUp className="w-5 h-5 text-slateblue-dark" />}
            label="Overall mastery"
            value={`${classPerformance.overallMastery}%`}
          />
          <MetricCard
            icon={<Users className="w-5 h-5 text-slateblue-dark" />}
            label="Students needing remediation"
            value={students.filter((s) => s.weakConcepts.length > 0).length}
          />
          <MetricCard
            icon={<AlertTriangle className="w-5 h-5 text-amber-dark" />}
            label="Concepts flagged"
            value={conceptGaps.filter((c) => c.recommendation !== "On Track").length}
          />
          <MetricCard
            icon={<FileText className="w-5 h-5 text-slateblue-dark" />}
            label="Worksheets translated"
            value={12}
          />
        </section>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Class performance chart */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Concept mastery by subject</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {classPerformance.bySubject.map((s) => (
                <div key={s.subject}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-semibold text-ink/70">{s.subject}</span>
                    <span className="text-ink/45">{s.mastery}%</span>
                  </div>
                  <Progress value={s.mastery} tone="slate" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Learning gap analytics table */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Learning-gap analytics</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-ink/40 border-b border-ink/8">
                      <th className="font-semibold py-2 px-5">Concept</th>
                      <th className="font-semibold py-2 px-3">Attempts</th>
                      <th className="font-semibold py-2 px-3">Accuracy</th>
                      <th className="font-semibold py-2 px-5">System recommendation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {conceptGaps.map((c) => (
                      <tr key={c.concept} className="border-b border-ink/5 last:border-0">
                        <td className="py-3 px-5 font-semibold text-ink">{c.concept}</td>
                        <td className="py-3 px-3 text-ink/60">{c.attempts}</td>
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-2 w-28">
                            <Progress
                              value={c.accuracy}
                              tone={c.accuracy < 50 ? "amber" : "emerald"}
                              className="flex-1"
                            />
                            <span className="text-ink/50 text-xs w-8">{c.accuracy}%</span>
                          </div>
                        </td>
                        <td className="py-3 px-5">
                          <Badge tone={recommendationTone[c.recommendation]}>{c.recommendation}</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Student roster */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Student roster</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-ink/40 border-b border-ink/8">
                      <th className="font-semibold py-2 px-5">Student</th>
                      <th className="font-semibold py-2 px-3">Badges</th>
                      <th className="font-semibold py-2 px-3">Accuracy</th>
                      <th className="font-semibold py-2 px-5">Weak concepts</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((s) => (
                      <tr key={s.id} className="border-b border-ink/5 last:border-0">
                        <td className="py-3 px-5 font-semibold text-ink">{s.name}</td>
                        <td className="py-3 px-3 text-ink/60">{s.badges}</td>
                        <td className="py-3 px-3 text-ink/60">{s.accuracy}%</td>
                        <td className="py-3 px-5">
                          <div className="flex flex-wrap gap-1.5">
                            {s.weakConcepts.length === 0 ? (
                              <Badge tone="emerald">On track</Badge>
                            ) : (
                              s.weakConcepts.map((w) => (
                                <Badge key={w} tone="amber">
                                  {w}
                                </Badge>
                              ))
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Upload area */}
          <Card>
            <CardHeader>
              <CardTitle>Upload content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <label
                className={cn(
                  "flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-slateblue/30 bg-slateblue-light/40 p-6 cursor-pointer hover:bg-slateblue-light/70 transition-colors text-center"
                )}
              >
                <UploadCloud className="w-8 h-8 text-slateblue-dark" />
                <span className="text-sm font-semibold text-slateblue-dark">
                  Drop a textbook page or PDF
                </span>
                <span className="text-xs text-ink/40">AAROH will suggest a Santhali translation</span>
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    const name = e.target.files?.[0]?.name;
                    if (name) setUploaded((u) => [name, ...u]);
                  }}
                />
              </label>
              {uploaded.length > 0 && (
                <ul className="space-y-2">
                  {uploaded.map((name, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-sm bg-white border border-ink/8 rounded-xl px-3 py-2"
                    >
                      <FileText className="w-4 h-4 text-slateblue-dark shrink-0" />
                      <span className="truncate flex-1">{name}</span>
                      <Badge tone="slate">Processing</Badge>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>

        <Link
          href="/teacher/flashcard-report"
          className="flex items-center justify-between rounded-2xl bg-slateblue text-white p-6 hover:bg-slateblue-dark transition-colors"
        >
          <div>
            <p className="font-display font-bold text-lg">Flashcard mastery report</p>
            <p className="text-slateblue-light/80 text-sm mt-0.5">
              See which Santhali words the class is struggling with
            </p>
          </div>
          <ArrowRight className="w-5 h-5" />
        </Link>
      </main>
    </div>
  );
}

function MetricCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: React.ReactNode }) {
  return (
    <Card>
      <CardContent className="p-5 space-y-2">
        <div className="w-9 h-9 rounded-xl bg-slateblue-light flex items-center justify-center">{icon}</div>
        <p className="font-display text-2xl font-bold text-ink">{value}</p>
        <p className="text-xs font-semibold text-ink/45">{label}</p>
      </CardContent>
    </Card>
  );
}
