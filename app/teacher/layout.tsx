import { TeacherSideNav } from "@/components/layout/teacher-side-nav";

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen md:flex">
      <TeacherSideNav />
      <main className="flex-1 min-w-0 px-4 md:px-6 py-8 pb-24 md:pb-8">
        {children}
      </main>
    </div>
  );
}