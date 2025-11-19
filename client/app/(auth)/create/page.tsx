import { CreateForm } from "@/app/(auth)/create/create-form"

export default async function SignupPage() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="w-full max-w-xs">
        <CreateForm />
      </div>
    </div>
  )
}
