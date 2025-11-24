import { CreateForm } from "@/app/(auth)/create/create-form"
import { getSession } from "@/lib/auth/utils";
import { redirect } from "next/navigation";

export default async function SignupPage() {
  const session = await getSession();

  if (session) redirect(process.env.NEXT_PUBLIC_AUTH_SUCCESS_REDIRECT_URL || "/boards");
  
  return <CreateForm />
}
