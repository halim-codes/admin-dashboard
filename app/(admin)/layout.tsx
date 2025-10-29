"use client";

import React, { useEffect } from "react";
import AppHeader from "@/layout/AppHeader";
import AppSidebar from "@/layout/AppSidebar";
import Backdrop from "@/layout/Backdrop";
import { useSidebar } from "@/context/SidebarContext";
import { useLocale, LocaleProvider } from "@/context/LocaleContext";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LocaleProvider>
      <InnerAdminLayout>{children}</InnerAdminLayout>
    </LocaleProvider>
  );
}

function InnerAdminLayout({ children }: { children: React.ReactNode }) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();
  const { locale, isHydrated } = useLocale();

  const isRtl = locale === "ar";

  useEffect(() => {
    if (isHydrated) {
      document.documentElement.lang = locale;
      document.documentElement.dir = isRtl ? "rtl" : "ltr";
    }
  }, [locale, isHydrated]);

  const sidebarMarginClass = isMobileOpen
    ? ""
    : isExpanded || isHovered
      ? isRtl
        ? "lg:mr-[280px]"
        : "lg:ml-[280px]"
      : isRtl
        ? "lg:mr-[90px]"
        : "lg:ml-[90px]";

  if (!isHydrated) return null;

  return (
    <div className="min-h-screen xl:flex">
      <AppSidebar />
      <Backdrop />
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${sidebarMarginClass}`}
      >
        <AppHeader />
        <div className="p-4 mx-auto max-w-[--breakpoint-2xl] md:p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
