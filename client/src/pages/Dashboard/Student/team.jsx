export function Team() {
  return (
    <div className="p-6">
      <div className="rounded-lg border p-8">
        <h2 className="text-lg font-semibold mb-4">Team Members</h2>
        <p>Manage your team and permissions here.</p>

        <div className="mt-6 space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center p-3 border rounded-lg">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mr-3">
                <span className="text-sm font-medium">U{i}</span>
              </div>
              <div>
                <h4 className="font-medium">Team Member {i}</h4>
                <p className="text-sm text-muted-foreground">team{i}@example.com</p>
              </div>
              <div className="ml-auto">
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                  {i === 1 ? "Admin" : "Member"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
