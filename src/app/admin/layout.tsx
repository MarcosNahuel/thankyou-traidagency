import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | Thank You Page - TRAID",
  description: "Panel de administración para la Thank You Page de TRAID",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black">
      {children}
    </div>
  );
}
