"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";

type LocaleContextType = {
  locale: string;
  messages: Record<string, string>;
  setLocale: (locale: string) => void;
  isHydrated: boolean;
};

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export const LocaleProvider = ({ children }: { children: React.ReactNode }) => {
  const [locale, setLocale] = useState<"ar" | "en">("ar");
  const [messages, setMessages] = useState<Record<string, string>>({});
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        if (user?.lang) {
          setLocale(user.lang);
        }
      } catch (error) {
        console.warn("⚠️ Failed to parse user language:", error);
      }
    }
    setIsHydrated(true);
  }, []);

  const loadMessages = useCallback(async (lang: string) => {
    try {
      const mod = await import(`@/locales/${lang}.json`);
      setMessages(mod.default);
    } catch (error) {
      console.error(`Failed to load locale file (${lang}):`, error);
      const fallback = await import("@/locales/en.json");
      setMessages(fallback.default);
    }
  }, []);

  useEffect(() => {
    if (isHydrated) loadMessages(locale);
  }, [locale, isHydrated, loadMessages]);

  useEffect(() => {
    if (isHydrated) {
      const userData = localStorage.getItem("user");
      const user = userData ? JSON.parse(userData) : {};
      user.lang = locale;
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [locale, isHydrated]);

  return (
    <LocaleContext.Provider value={{ locale, setLocale, messages, isHydrated }}>
      {isHydrated ? children : null}
    </LocaleContext.Provider>
  );
};

export const useLocale = () => {
  const context = useContext(LocaleContext);
  if (!context) throw new Error("useLocale must be used inside LocaleProvider");
  return context;
};
