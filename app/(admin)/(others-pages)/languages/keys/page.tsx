import type { Metadata } from "next";
import LanguageKeysComponent from "@/components/languages/keys/LanguageKeysComponent";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin Dashboard",
};

export default function KeysPage() {
  return (
    <section className="space-y-6">
      <LanguageKeysComponent />
    </section>
  );
}
