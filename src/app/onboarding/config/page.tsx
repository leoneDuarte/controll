"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash } from "lucide-react";

export default function CompanySetupForm() {
  const [sectors, setSectors] = useState([{ name: "" }]);
  const [employeeCount, setEmployeeCount] = useState(1);

  function addSector() {
    setSectors([...sectors, { name: "" }]);
  }

  function removeSector(index: number) {
    setSectors(sectors.filter((_, i) => i !== index));
  }

  function updateSector(index: number, value: string) {
    const updated = [...sectors];
    updated[index].name = value;
    setSectors(updated);
  }

  function onSubmit() {
    const payload = {
      employeeCount,
      sectors,
    };
    console.log("CONFIG EMPRESA =>", payload);
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <Card className="w-full max-w-2xl shadow-xl p-4">
        <CardHeader>
          <CardTitle>Configuração Inicial da Empresa</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Número de funcionários */}
          <div>
            <Label className="text-sm">Quantidade total de funcionários</Label>
            <Input
              type="number"
              min={1}
              value={employeeCount}
              onChange={(e) => setEmployeeCount(Number(e.target.value))}
              className="mt-1"
            />
          </div>

          {/* Setores da empresa */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm">Setores da empresa</Label>
              <Button variant="outline" size="sm" onClick={addSector}>
                <Plus className="h-4 w-4 mr-1" /> Adicionar setor
              </Button>
            </div>

            <div className="space-y-2">
              {sectors.map((sector, index) => (
                <div key={index} className="flex gap-3 items-center">
                  <Input
                    placeholder="Nome do setor"
                    value={sector.name}
                    onChange={(e) => updateSector(index, e.target.value)}
                  />
                  {sectors.length > 1 && (
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => removeSector(index)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Botão de avançar */}
          <div className="pt-4">
            <Button className="w-full" onClick={onSubmit}>
              Salvar configuração e avançar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
