"use client";

import { useState, useEffect } from "react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export interface Setor {
  id: string;
  nome: string;
}

export interface Funcionario {
  id: string;
  nome: string;
  cargo: string;
}

export interface Empresa {
  id: string;
  nome: string;
  cnpj: string;
  descricao?: string;
  setores: Setor[];
  funcionarios: Funcionario[];
}

export default function EmpresaPanel({ empresa }: { empresa?: Empresa }) {
  // GARANTE QUE SEMPRE TEM UM OBJETO VÁLIDO
  const safeEmpresa: Empresa = empresa || {
    id: "",
    nome: "",
    cnpj: "",
    descricao: "",
    setores: [],
    funcionarios: [],
  };

  const [dados, setDados] = useState({
    nome: safeEmpresa.nome,
    cnpj: safeEmpresa.cnpj,
    descricao: safeEmpresa.descricao || "",
  });

  // SE EMPRESA CHEGAR DEPOIS, SINCRONIZA
  useEffect(() => {
    if (empresa) {
      setDados({
        nome: empresa.nome,
        cnpj: empresa.cnpj,
        descricao: empresa.descricao || "",
      });
    }
  }, [empresa]);

  // ENQUANTO NÃO CHEGA EMPRESA REAL, RENDER SEGURO
  if (!empresa) {
    return (
      <Card className="w-full p-6">
        <p className="text-center text-muted-foreground text-sm">
          Carregando dados da empresa...
        </p>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{dados.nome || "Empresa"}</CardTitle>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="dados" className="w-full">
          <TabsList>
            <TabsTrigger value="dados">Dados básicos</TabsTrigger>
            <TabsTrigger value="setores">Setores</TabsTrigger>
            <TabsTrigger value="funcionarios">Funcionários</TabsTrigger>
          </TabsList>

          {/* -------- DADOS -------- */}
          <TabsContent value="dados" className="mt-4 space-y-4">
            <div className="space-y-2">
              <label>Nome</label>
              <Input
                value={dados.nome}
                onChange={(e) =>
                  setDados((d) => ({ ...d, nome: e.target.value }))
                }
              />
            </div>

            <div className="space-y-2">
              <label>CNPJ</label>
              <Input
                value={dados.cnpj}
                onChange={(e) =>
                  setDados((d) => ({ ...d, cnpj: e.target.value }))
                }
              />
            </div>

            <div className="space-y-2">
              <label>Descrição</label>
              <Input
                value={dados.descricao}
                onChange={(e) =>
                  setDados((d) => ({ ...d, descricao: e.target.value }))
                }
              />
            </div>

            <Button>Salvar</Button>
          </TabsContent>

          {/* -------- SETORES -------- */}
          <TabsContent value="setores" className="mt-4">
            {safeEmpresa.setores.length === 0 && (
              <p className="text-sm text-muted-foreground">
                Nenhum setor cadastrado.
              </p>
            )}

            <div className="space-y-2">
              {safeEmpresa.setores.map((s) => (
                <div
                  key={s.id}
                  className="flex items-center justify-between border p-3 rounded-lg"
                >
                  <span>{s.nome}</span>
                  <Badge variant="secondary">{s.id}</Badge>
                </div>
              ))}
            </div>

            <Button className="mt-4">Adicionar setor</Button>
          </TabsContent>

          {/* -------- FUNCIONÁRIOS -------- */}
          <TabsContent value="funcionarios" className="mt-4">
            {safeEmpresa.funcionarios.length === 0 && (
              <p className="text-sm text-muted-foreground">
                Nenhum funcionário cadastrado.
              </p>
            )}

            <div className="space-y-2">
              {safeEmpresa.funcionarios.map((f) => (
                <div
                  key={f.id}
                  className="flex items-center justify-between border p-3 rounded-lg"
                >
                  <div>
                    <p className="font-medium">{f.nome}</p>
                    <p className="text-sm text-muted-foreground">
                      {f.cargo}
                    </p>
                  </div>

                  <Badge>{f.id}</Badge>
                </div>
              ))}
            </div>

            <Button className="mt-4">Adicionar funcionário</Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
