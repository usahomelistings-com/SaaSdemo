import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[calc(100vh-40px)]">
      <Sidebar />
      <main className="flex-1 ml-60 p-6 lg:p-8">{children}</main>
    </div>
  );
}
