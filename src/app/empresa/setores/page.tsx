"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

type Sector = {
  id?: string;
  name: string;
};

export default function SectorList({ sectors }: { sectors?: Sector[] }) {
  // Garante um array seguro mesmo se undefined
  const safeSectors = sectors ?? [];

  return (
    <div className="w-full flex justify-center pt-10">
      <Card className="w-full max-w-2xl shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Setores cadastrados</CardTitle>
        </CardHeader>

        <CardContent>
          {(safeSectors.length === 0) ? (
            <p className="text-sm text-muted-foreground text-center py-6">
              Nenhum setor cadastrado ainda.
            </p>
          ) : (
            <ul className="space-y-3">
              {safeSectors.map((sector, index) => (
                <li
                  key={sector.id || index}
                  className="flex items-center justify-between p-4 rounded-xl border bg-card"
                >
                  <span className="font-medium text-base">{sector.name}</span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
