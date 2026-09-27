import { SideNavBase } from "@/components/layout/side-nav-base";

/**
 * Sidebar used on every teacher-facing page.
 * Links: Overview, Flashcard Report, Talk & Translate.
 */
export function TeacherSideNav() {
  return (
    <SideNavBase
      role="teacher"
      links={[
        { href: "/teacher/dashboard", label: "Overview", icon: "home" },
        { href: "/teacher/flashcard-report", label: "Flashcard Report", icon: "barChart3" },
        { href: "/translation", label: "Talk & Translate", icon: "mic" },
      ]}
    />
  );
}
