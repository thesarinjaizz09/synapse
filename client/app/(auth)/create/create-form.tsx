'use client'

import { cn } from "@/lib/utils"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link"
import { toast } from "sonner";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/auth/client";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateValues, CreateSchema } from "./validate";
import { Spinner } from "@/components/ui/spinner";
import { LayoutDashboard, Mail, Lock, SquareUser } from "lucide-react"
import { useAuthSession } from "@/hooks/use-auth-session";

export function CreateForm({ className }: React.ComponentProps<"form">) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const form = useForm<CreateValues>({
    resolver: zodResolver(CreateSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(data: CreateValues) {
    try {
      startTransition(async () => {
        await signUp.email({
          name: data.name,
          email: data.email,
          password: data.password,
          callbackURL: process.env.NEXT_PUBLIC_AUTH_SUCCESS_REDIRECT_URL || "/boards",
        }, {
          onSuccess: () => {
            router.push(process.env.NEXT_PUBLIC_AUTH_SUCCESS_REDIRECT_URL || "/boards");
            toast.success("Credentials created successfully");
          },
          onError: (ctx) => {
            toast.error(ctx.error.message);
          },
        });
      });
    } catch (error) {
      toast.error("Internal client error");
    }
  }

  return (
    <Form {...form}>
      <form
        className={cn("flex flex-col gap-6", className)}
        onSubmit={form.handleSubmit(onSubmit)} // ✅ use form.handleSubmit, not handleSubmit
      >
        <FieldGroup>
          <div className="flex flex-col items-start gap-1 text-left">
            <h1 className="text-3xl font-bold">Create Credentials</h1>
            <p className="text-sm w-full">
              Create your credentials to access the AlphaFusion Dashboard
            </p>
          </div>

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div>
                    <FieldLabel htmlFor="name" className="mb-2">
                      <SquareUser className="size-3.5 text-primary" /> Name
                    </FieldLabel>
                    <Input
                      id="name"
                      type="text"
                      placeholder="James Simson"
                      className="peer"
                      disabled={isPending}
                      {...field}
                      required
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div>
                    <FieldLabel htmlFor="email" className="mb-2">
                      <Mail className="size-3.5 text-primary" /> Email
                    </FieldLabel>
                    <Input
                      id="email"
                      type="email"
                      placeholder="tmt@goldman.sachs"
                      className="peer"
                      disabled={isPending}
                      {...field}
                      required
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div>
                    <FieldLabel htmlFor="password" className="mb-2">
                      <Lock className="size-3.5 text-primary" /> Password
                    </FieldLabel>
                    <Input
                      id="password"
                      type="password"
                      className="pe-9"
                      placeholder="********"
                      disabled={isPending}
                      {...field}
                      required
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isPending} className="cursor-pointer">
            {
              isPending
                ? <Spinner />
                : <LayoutDashboard className="size-3" />
            }
            Dashboard
          </Button>

          <Field>
            <FieldDescription className="text-center text-xs">
              Already have credentials?{" "}
              <Link href="/auth" className="underline underline-offset-4">
                Sign in
              </Link>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </form>
    </Form>
  )
}
