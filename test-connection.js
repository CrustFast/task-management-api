// Mengimpor PrismaClient dari paket @prisma/client
const { PrismaClient } = require('@prisma/client');
// Membuat instance baru dari PrismaClient
const prisma = new PrismaClient();

// Fungsi utama async untuk menjalankan operasi database
async function main() {
  // Menampilkan log bahwa proses pembuatan task dimulai
  console.log('Attempting to create a new task...');
  
  // Membuat task baru di database menggunakan prisma.task.create
  const newTask = await prisma.task.create({
    data: {
      title: 'Complete Backend API',
      description: 'Implement all CRUD endpoints.',
      category: 'Development',
      priority: 'High',
      deadline: new Date('2025-09-30T00:00:00.000Z'),
    },
  });
  
  // Menampilkan task yang baru saja dibuat
  console.log('New task created successfully:', newTask);

  // Mengambil semua task dari database
  const allTasks = await prisma.task.findMany();
  // Menampilkan semua task yang ada
  console.log('All tasks:', allTasks);
}

// Memanggil fungsi main
main()
  .catch((e) => {
    // Menangkap dan melempar error jika terjadi
    throw e;
  })
  .finally(async () => {
    // Memastikan koneksi ke database ditutup setelah selesai
    await prisma.$disconnect();
  });
