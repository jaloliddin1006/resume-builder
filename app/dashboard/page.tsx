"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function DashboardPage() {
  return (
    <div className="flex-1 overflow-auto">
      <div className="p-6 md:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground"> Defonic toolda mavjud loyihalar</p>
        </div>

        {/* Information Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Resume haqida</CardTitle>
              <CardDescription>Qisqa va maqsadli ish hujjati</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2 text-sm">Resume nima?</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Resume - bu muayyan ish o'rni uchun tayyorlangan qisqa va ixcham hujjat bo'lib, unda sizning eng muhim
                  ta'lim, ish tajribasi, ko'nikmalar va yutuqlar joylashtiriladi. Odatda 1-2 sahifadan iborat bo'ladi.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-sm">Resume ga kiritilishi kerak bo'lgan ma'lumotlar:</h4>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Shaxsiy ma'lumotlar (F.I.Sh, telefon, email)</li>
                  <li>Professional xulosa yoki maqsad</li>
                  <li>Ish tajribasi (eng so'nggi 5-10 yil)</li>
                  <li>Ta'lim va sertifikatlar</li>
                  <li>Asosiy ko'nikmalar va kompetensiyalar</li>
                  <li>Tillar va texnik ko'nikmalar</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-sm">Resume qachon kerak?</h4>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Korporativ ish o'rinlari uchun</li>
                  <li>Startup va texnologiya kompaniyalari</li>
                  <li>Barcha ish bozorlari</li>
                  <li>Vaqt cheklangan ariza jarayoni</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2 text-sm">Resume</h4>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Qisqa va ixcham (1-2 sahifa)</li>
                  <li>Muayyan ish o'rni uchun tayyorlangan</li>
                  <li>Eng muhim tajribalar va ko'nikmalar</li>
                  <li>Ish o'rinlari uchun ko'proq ishlatiladigan</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>CV (Curriculum Vitae) haqida</CardTitle>
              <CardDescription>To'liq va batafsil ish hujjati</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2 text-sm">CV nima?</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  CV (Curriculum Vitae) - bu sizning barcha ta'lim, ish tajribasi, nashrlar, tadqiqotlar va boshqa
                  yutuqlarning to'liq va batafsil hujjati. Odatda 2 yoki undan ko'p sahifadan iborat bo'ladi va akademik
                  hamda xalqaro ish bozorlari uchun ishlatiladigan standart hujjatdir.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-sm">CV ga kiritilishi kerak bo'lgan ma'lumotlar:</h4>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Shaxsiy ma'lumotlar va aloqa ma'lumotlari</li>
                  <li>Professional xulosa</li>
                  <li>Barcha ish tajribasi va lavozimlar</li>
                  <li>To'liq ta'lim tarixi</li>
                  <li>Nashrlar va tadqiqot ishlari</li>
                  <li>Sertifikatlar va kurslar</li>
                  <li>Tillar va kasb ko'nikmalar</li>
                  <li>Referenslar va tavsiyalar</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-sm">CV qachon kerak?</h4>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Akademik pozitsiyalar uchun</li>
                  <li>Xalqaro ish o'rinlari</li>
                  <li>Tadqiqot va ilmiy lavozimlar</li>
                  <li>Yevropa va Britaniya ish bozorlari</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2 text-sm">CV (Curriculum Vitae)</h4>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Batafsil va to'liq (2+ sahifa)</li>
                  <li>Barcha ta'lim va tajribalar</li>
                  <li>Nashrlar va tadqiqotlar</li>
                  <li>Akademik pozitsiyalar uchun</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Ma'lumotnoma (Obektivka) haqida</CardTitle>
              <CardDescription>Shaxs va oila azolari haqidagi ma'lumotnoma</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2 text-sm">Ma'lumotnoma nima?</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Ma'lumotnoma - bu shaxs va uning oila azolari haqidagi rasmiy ma'lumotnoma bo'lib, unda shaxsning
                  shaxsiy ma'lumotlari, ta'limi, ish tajribasi va oila a'zolari (ota-ona, turmush o'rtog'i, bolalar)
                  haqidagi to'liq ma'lumotlar joylashtiriladi. Bu hujjat rasmiy va yuridik maqsadlar uchun
                  ishlatiladigan muhim hujjatdir.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-sm">Ma'lumotnomaga kiritilishi kerak bo'lgan ma'lumotlar:</h4>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Shaxsiy ma'lumotlar (F.I.Sh, tug'ilgan sana, millati, fuqaroligi)</li>
                  <li>Ta'lim haqida ma'lumotlar (maktab, kollej, universitet)</li>
                  <li>Ish tajribasi va lavozimlar</li>
                  <li>Oila a'zolari haqida ma'lumotlar (ota-ona, turmush o'rtog'i, bolalar)</li>
                  <li>Har bir oila a'zosining F.I.Sh, tug'ilgan yili va joylashgan joyini ko'rsatish</li>
                  <li>Tillar va kasb ko'nikmalar</li>
                  <li>Davlat va xalqaro deputatlik tajribasi (agar bo'lsa)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-sm">Ma'lumotnoma qachon kerak?</h4>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Davlat muassasalariga ariza berish vaqtida</li>
                  <li>Xalqaro tashkilotlarga murojaat qilish uchun</li>
                  <li>Rasmiy hujjatlar talab qiladigan joylar uchun</li>
                  <li>Visa va migratsion jarayonlarda</li>
                </ul>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  )
}
