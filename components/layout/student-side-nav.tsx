import { SideNavBase } from "@/components/layout/side-nav-base";

/**
 * Sidebar used on every student-facing page.
 * Links: My Learning, Flashcards, Talk & Translate, Worksheets.
 */
export function StudentSideNav() {
  return (
    <SideNavBase
      role="student"
      links={[
        { href: "/student/dashboard", label: "My Learning", icon: "home" },
        { href: "/flashcards", label: "Flashcards", icon: "layers" },
        { href: "/translation", label: "Talk & Translate", icon: "mic" },
        { href: "/mock-sheet", label: "Worksheets", icon: "fileText" },
      ]}
    />
  );
}
