"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// shadcn/ui components (assume your project already has shadcn components scaffolded)
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff } from "lucide-react";

// Small helper to render field errors
function FieldError({ message }: { message?: string | null }) {
  if (!message) return null;
  return <p className="mt-1 text-sm text-red-600">{message}</p>;
}

const registerSchema = z.object({
  email: z.string().min(1, "Email é obrigatório").email("Formato de email inválido"),
  companyName: z.string().min(2, "Nome da empresa muito curto"),
  password: z.string().min(8, "Senha deve ter ao menos 8 caracteres"),
  acceptTerms: z.boolean().refine((v) => v === true, "Você deve aceitar os termos"),
});

type RegisterValues = z.infer<typeof registerSchema>;

export default function RegisterCompanyForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { email: "", companyName: "", password: "", acceptTerms: false },
  });

  async function onSubmit(data: RegisterValues) {
    setFormError(null);
    setIsSubmitting(true);
    try {
      // Ajuste a rota da API conforme sua aplicação (ex: /api/auth/register-company)
      const res = await fetch("/api/auth/register-company", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email, companyName: data.companyName, password: data.password }),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => null);
        const message = json?.error || `Erro: ${res.status}`;
        setFormError(message);
        setIsSubmitting(false);
        return;
      }

      // sucesso: redireciona para o dashboard ou próxima página
      router.push("/dashboard");
    } catch (err) {
      setFormError("Erro de rede. Tente novamente mais tarde.");
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle>Cadastro de Empresa</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="companyName">Nome da empresa</Label>
              <Input id="companyName" placeholder="Ex: ACME Ltda" {...register("companyName")} />
              <FieldError message={errors.companyName?.message as string | undefined} />
            </div>

            <div>
              <Label htmlFor="email">E‑mail</Label>
              <Input id="email" type="email" placeholder="contato@empresa.com" {...register("email")} />
              <FieldError message={errors.email?.message as string | undefined} />
            </div>

            <div>
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Crie uma senha segura"
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded px-2 py-1 text-sm"
                  aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              <FieldError message={errors.password?.message as string | undefined} />
            </div>

            <div className="flex items-center gap-2">
              <Checkbox id="terms" {...register("acceptTerms")} />
              <Label htmlFor="terms" className="text-sm">
                Eu concordo com os termos de uso
              </Label>
            </div>
            <FieldError message={errors.acceptTerms?.message as string | undefined} />

            {formError && <p className="text-sm text-red-600">{formError}</p>}

            <CardFooter className="pt-2">
              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? "Cadastrando..." : "Criar conta da empresa"}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
