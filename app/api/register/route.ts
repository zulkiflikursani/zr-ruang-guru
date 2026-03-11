import { NextResponse } from "next/server";
import { prisma, prisma as PrismaClient } from "../../lib/prisma";

export async function POST(request: Request) {
  try {
    // 1. Ambil data dari body request
    const body = await request.json();
    const { fullName, email, phone, level, subject } = body;

    // 2. Validasi: Pastikan semua field yang dikirim handleSubmit ada
    if (!fullName || !email || !phone || !level || !subject) {
      return NextResponse.json(
        { success: false, message: "Semua data wajib diisi." },
        { status: 400 },
      );
    }
    console.log("res");

    const result = await prisma.$transaction(async (tx: any) => {
      // Buat atau cari user
      const user = await tx.user.upsert({
        where: { email },
        update: {},
        create: { email },
      });

      // Simpan/update profil student
      const student = await tx.student.upsert({
        where: { userId: user.id },
        update: { fullName, phone, level },
        create: { userId: user.id, fullName, phone, level },
      });

      // Catat pendaftaran
      const enrollment = await tx.enrollment.create({
        data: {
          studentId: student.id,
          subjectName: subject,
          status: "pending",
        },
      });

      return { user, student, enrollment };
    });

    // 4. Kirim respon sukses (JSON)
    return NextResponse.json(
      { success: true, message: "Pendaftaran berhasil", data: result },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("Registration API Error:", error);

    // Kirim respon error dalam format JSON agar tidak memicu JSON.parse error di frontend
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Terjadi kesalahan pada server database.",
      },
      { status: 500 },
    );
  }
}
