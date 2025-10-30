"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLocale } from "@/context/LocaleContext";
import { useLogin } from "@/hooks/useAuth";
import LanguageSwitcher from "@/components/header/LanguageSwitcher";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Checkbox from "@/components/form/input/Checkbox";
import Button from "@/components/ui/button/Button";
import { EyeIcon, EyeCloseIcon } from "@/icons";

export default function SignInForm() {
  const { messages, locale } = useLocale();
  const isRtl = locale === "ar";

  const { mutate: login, isPending, error, data } = useLogin();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(
      { email, password },
      {
        onSuccess: () => {
          setSuccessMessage(messages["signin_success"] || "Login successful, redirecting...");
          setTimeout(() => router.push("/"), 1000);
        },
      }
    );
  };

  const errorMessage =
    error instanceof Error
      ? error.message
      : typeof error === "string"
        ? error
        : undefined;

  return (
    <div className="flex flex-col flex-1 w-full lg:w-1/2">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div className="flex justify-end mb-4">
          <LanguageSwitcher />
        </div>

        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              {messages["signin_title"] || "Sign In"}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {messages["signin_description"] || "Enter your email and password to sign in!"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label>
                {messages["signin_email"] || "Email"} <span className="text-error-500">*</span>
              </Label>
              <Input
                type="email"
                placeholder="info@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <Label>
                {messages["signin_password"] || "Password"} <span className="text-error-500">*</span>
              </Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder={messages["signin_password_placeholder"] || "Enter your password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute top-1/2 -translate-y-1/2 z-10 ${isRtl ? "left-4" : "right-4"}`}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                  ) : (
                    <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Checkbox checked={keepLoggedIn} onChange={setKeepLoggedIn} />
                <span className="text-gray-700 text-theme-sm dark:text-gray-400">
                  {messages["signin_remember"] || "Keep me logged in"}
                </span>
              </div>
              <Link
                href="/reset-password"
                className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
              >
                {messages["signin_forgot_password"] || "Forgot password?"}
              </Link>
            </div>

            <div>
              <Button className="w-full" size="sm" type="submit" disabled={isPending}>
                {isPending ? messages["signin_loading"] || "Loading..." : messages["signin_button"] || "Sign In"}
              </Button>

              {errorMessage && (
                <p className="mt-2 text-sm text-red-500">
                  {errorMessage === "Email or password is incorrect"
                    ? messages["signin_error_invalid"] || "Invalid email or password"
                    : errorMessage}
                </p>
              )}

              {successMessage && (
                <p className="mt-2 text-sm text-green-600 dark:text-green-400">{successMessage}</p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
