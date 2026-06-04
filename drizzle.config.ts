import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "mysql",
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    url: process.env.DATABASE_URL || "mysql://root:@localhost:3306/belajar_vibe_coding",
  },
});

/**Berikut adalah pembedahan (breakdown) dari URL mysql://root:@localhost:3306/belajar_vibe_coding yang digunakan:

mysql:// = Protokol/Driver yang digunakan.
root = User database.
:@ = Bagian antara : dan @ adalah Password. Karena kosong, berarti kita login tanpa password (bawaan XAMPP/lokal). Jika password Anda rahasia123, maka menjadi mysql://root:rahasia123@....
localhost = Host / alamat server database.
3306 = Port (port bawaan MySQL).
/belajar_vibe_coding = Database (nama database target).*/
