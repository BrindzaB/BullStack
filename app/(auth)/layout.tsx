
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-200 bg-auth-pattern">
      {children}
    </div>
  )
}