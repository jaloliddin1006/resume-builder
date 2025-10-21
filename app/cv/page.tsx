"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function CVPage() {
  return (
    <div className="flex-1 overflow-auto">
      <div className="p-6 md:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">CV Builder</h1>
          <p className="text-muted-foreground">Sizning professional CV ni yarating</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>CV Builder</CardTitle>
            <CardDescription>Bu bo'lim tez orada tayyor bo'ladi</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              CV builder xususiyati hozirda ishlanmoqda. Iltimos, keyinroq qayta urinib ko'ring.
            </p>
            <Button disabled>Tez orada</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
