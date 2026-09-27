"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { GraduationCap, KeyRound, Mail, Lock, Hash, Sprout } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Role = "student" | "teacher";

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<Role>("student");
  const [rollNo, setRollNo] = useState("");
  const [pin, setPin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push(role === "student" ? "/student/dashboard" : "/teacher/dashboard");
  }

  return (
    <main className="min-h-screen flex flex-col md:flex-row">
      {/* Left panel: brand */}
      <div className="md:w-5/12 bg-emerald text-white flex flex-col justify-between p-8 md:p-12">
        <div className="flex items-center gap-2">
          <Sprout className="w-7 h-7" />
          <span className="font-display text-xl font-bold tracking-tight">AAROH</span>
        </div>
        <div className="space-y-4 max-w-sm">
          <h1 className="font-display text-4xl font-bold leading-tight">
            Learn it in Hindi.
            <br />
            Understand it in Santhali.
          </h1>
          <p className="text-emerald-light/90 text-base">
            AAROH connects your school lessons with the words you already know at home —
            for students and teachers across Santhali-speaking villages.
          </p>
        </div>
        <p className="text-sm text-emerald-light/70">A prototype for rural &amp; tribal primary education.</p>
      </div>

      {/* Right panel: form */}
      <div className="md:w-7/12 flex items-center justify-center p-6 md:p-12 bg-cream">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h2 className="font-display text-2xl font-bold text-ink">Welcome back</h2>
            <p className="text-ink/60 mt-1">Choose how you sign in.</p>
          </div>

          {/* Role toggle */}
          <div className="grid grid-cols-2 gap-3 mb-8" role="tablist" aria-label="Choose role">
            <button
              type="button"
              role="tab"
              aria-selected={role === "student"}
              onClick={() => setRole("student")}
              className={cn(
                "flex flex-col items-center gap-2 rounded-2xl border-2 p-4 transition-colors",
                role === "student"
                  ? "border-emerald bg-emerald-light"
                  : "border-ink/10 bg-white hover:border-ink/20"
              )}
            >
              <GraduationCap className={cn("w-6 h-6", role === "student" ? "text-emerald-dark" : "text-ink/50")} />
              <span className={cn("font-semibold", role === "student" ? "text-emerald-dark" : "text-ink/70")}>
                Student Login
              </span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={role === "teacher"}
              onClick={() => setRole("teacher")}
              className={cn(
                "flex flex-col items-center gap-2 rounded-2xl border-2 p-4 transition-colors",
                role === "teacher"
                  ? "border-slateblue bg-slateblue-light"
                  : "border-ink/10 bg-white hover:border-ink/20"
              )}
            >
              <KeyRound className={cn("w-6 h-6", role === "teacher" ? "text-slateblue-dark" : "text-ink/50")} />
              <span className={cn("font-semibold", role === "teacher" ? "text-slateblue-dark" : "text-ink/70")}>
                Teacher Login
              </span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {role === "student" ? (
              <>
                <Field icon={<Hash className="w-4 h-4" />} label="Roll number">
                  <input
                    value={rollNo}
                    onChange={(e) => setRollNo(e.target.value)}
                    placeholder="e.g. 24"
                    className="w-full bg-transparent outline-none text-ink placeholder:text-ink/30"
                    required
                  />
                </Field>
                <Field icon={<KeyRound className="w-4 h-4" />} label="PIN">
                  <input
                    type="password"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    placeholder="4-digit PIN"
                    className="w-full bg-transparent outline-none text-ink placeholder:text-ink/30"
                    required
                  />
                </Field>
              </>
            ) : (
              <>
                <Field icon={<Mail className="w-4 h-4" />} label="Email">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="teacher@school.in"
                    className="w-full bg-transparent outline-none text-ink placeholder:text-ink/30"
                    required
                  />
                </Field>
                <Field icon={<Lock className="w-4 h-4" />} label="Password">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-transparent outline-none text-ink placeholder:text-ink/30"
                    required
                  />
                </Field>
              </>
            )}

            <Button type="submit" size="lg" className="w-full mt-2" variant={role === "student" ? "primary" : "secondary"}>
              {role === "student" ? "Start learning" : "Go to dashboard"}
            </Button>
          </form>

          <p className="text-xs text-ink/40 mt-6">
            This is a mock sign-in for the prototype — any values will work.
          </p>
        </div>
      </div>
    </main>
  );
}

function Field({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-ink/70 mb-1.5 block">{label}</span>
      <div className="flex items-center gap-2 rounded-xl border-2 border-ink/10 bg-white px-4 py-3 focus-within:border-emerald transition-colors">
        <span className="text-ink/40">{icon}</span>
        {children}
      </div>
    </label>
  );
}
