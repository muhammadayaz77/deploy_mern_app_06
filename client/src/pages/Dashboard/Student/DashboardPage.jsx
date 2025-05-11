export function DashboardPage() {
  return (
    <div className="p-6">
      <div className="rounded-lg border p-8">
        <h2 className="text-lg font-semibold mb-4">Dashboard</h2>
        <p>Welcome to your dashboard. This is the main content area.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="border rounded-lg p-4 bg-card">
            <h3 className="font-medium mb-2">Total Users</h3>
            <p className="text-2xl font-bold">1,234</p>
          </div>
          <div className="border rounded-lg p-4 bg-card">
            <h3 className="font-medium mb-2">Revenue</h3>
            <p className="text-2xl font-bold">$12,345</p>
          </div>
          <div className="border rounded-lg p-4 bg-card">
            <h3 className="font-medium mb-2">Active Projects</h3>
            <p className="text-2xl font-bold">42</p>
          </div>
        </div>
      </div>
    </div>
  )
}
