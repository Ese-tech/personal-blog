"use client";

import { ReactNode } from "react";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { ToastProvider, ToastContainer } from "@/contexts/ToastContext";

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <AuthProvider>
        <ToastProvider>
          {children}
          <ToastContainer />
        </ToastProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}