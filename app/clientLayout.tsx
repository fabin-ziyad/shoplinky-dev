// app/client-layout.tsx
"use client";

import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import AuthWrapper from "@/components/middlewares/authMiddleware";
import { initializeAuthStore } from "@/store/authStore";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    initializeAuthStore();
  }, []);
  return (
    <>
      <ProgressBar
        height="6px"
        color="#00008B"
        options={{ showSpinner: false }}
        shallowRouting
      />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <AuthWrapper>{children}</AuthWrapper>
    </>
  );
}
