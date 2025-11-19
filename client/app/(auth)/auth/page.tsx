import { AuthForm } from "@/app/(auth)/auth/auth-form"

export default function LoginPage() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="w-full max-w-xs">
        <AuthForm />
      </div>
    </div>
  )
}
