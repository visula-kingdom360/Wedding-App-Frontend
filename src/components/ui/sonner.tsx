"use client";

import { useTheme } from "next-themes@0.4.6";
import { Toaster as Sonner, ToasterProps } from "sonner@2.0.3";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        style: {
          fontSize: '15px',
          fontWeight: '500',
          padding: '16px',
          color: '#0C3B2E',
        },
        descriptionStyle: {
          color: '#0C3B2E',
          opacity: 1,
          fontWeight: '600',
          fontSize: '14px',
        },
        classNames: {
          toast: 'group toast group-[.toaster]:bg-white group-[.toaster]:text-[#0C3B2E] group-[.toaster]:border-gray-200 group-[.toaster]:shadow-lg [&_*]:!text-[#0C3B2E]',
          description: '!text-[#0C3B2E] !opacity-100',
          actionButton: 'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
          cancelButton: 'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
          success: 'group-[.toaster]:border-l-4 group-[.toaster]:border-l-[#00FF88] group-[.toaster]:text-[#0C3B2E] [&_*]:!text-[#0C3B2E]',
          error: 'group-[.toaster]:border-l-4 group-[.toaster]:border-l-red-500',
          warning: 'group-[.toaster]:border-l-4 group-[.toaster]:border-l-yellow-500',
          info: 'group-[.toaster]:border-l-4 group-[.toaster]:border-l-blue-500 group-[.toaster]:text-[#0C3B2E] [&_*]:!text-[#0C3B2E]',
        },
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };