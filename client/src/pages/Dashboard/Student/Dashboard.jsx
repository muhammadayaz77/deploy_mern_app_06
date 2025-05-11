import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "../../../components/shared/Sidbar"

  function Dashboard() {
    return (
      <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 items-center gap-4 border-b px-6">
          <SidebarTrigger />
          <h1 className="text-xl font-semibold">Dashboard</h1>
        </header>
        <main className="flex-1 p-6">
          <div className="rounded-lg border p-8">
            <h2 className="text-lg font-semibold mb-4">Welcome to your dashboard</h2>
            <p>This is the main content area. Your dashboard content goes here.</p>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
    )
  }

  export default Dashboard

