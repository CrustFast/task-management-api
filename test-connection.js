/**
 * @file A utility script for manually testing the database connection and creating a sample task.
 * This script is for development purposes only and is not part of the main application.
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * The main function to run the database test.
 */
async function main() {
  console.log('Attempting to create a new task...');
  
  const newTask = await prisma.task.create({
    data: {
      title: 'Complete Backend API',
      description: 'Implement all CRUD endpoints.',
      category: 'Development',
      priority: 'High',
      deadline: new Date('2025-09-30T00:00:00.000Z'),
    },
  });
  
  console.log('New task created successfully:', newTask);

  const allTasks = await prisma.task.findMany();
  console.log('All tasks:', allTasks);
}

// Execute the main function and handle potential errors.
main()
  .catch((e) => {
    console.error('An error occurred:', e);
    process.exit(1);
  })
  .finally(async () => {
    // Ensure the database connection is closed when the script finishes.
    await prisma.$disconnect();
  });
