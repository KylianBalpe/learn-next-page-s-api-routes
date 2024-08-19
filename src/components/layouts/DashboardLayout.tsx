import Layout from "@/components/layouts/Layout";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Layout>
      <div className="sticky top-0 h-12 w-full border-b bg-white" />
      {children}
    </Layout>
  );
}
