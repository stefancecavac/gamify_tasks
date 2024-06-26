import cron from 'node-cron';
import { PrismaClient, users } from "@prisma/client"
import { Request, Response } from 'express';
const prisma = new PrismaClient()



cron.schedule('0 0 * * *', async () => {
    try {
        // Find all habits that are currently marked as not completed (status: false)   '*/10 * * * * *'  '0 0 * * *'
        const failedHabbits = await prisma.habit.findMany({
            where: { status: false }
        });

        // Group habits by user ID and calculate currency earned per user
        const currencyEarnedPerUser: { [userId: number]: number } = failedHabbits.reduce((accumulator, habit) => {
            const userId = habit.userId;
            if (!accumulator[userId]) {
                accumulator[userId] = 0;
            }
            accumulator[userId]++;
            return accumulator;
        }, {} as { [userId: number]: number }); // Specify the initial type for accumulator

        // Update each user's currency based on their completed habits
        for (const userId in currencyEarnedPerUser) {
            const currencyEarned = currencyEarnedPerUser[parseInt(userId)];

            const user: users | null = await prisma.users.findUnique({
                where: { id: parseInt(userId) }
            });

            if (user) {
                await prisma.users.update({
                    where: { id: parseInt(userId) },
                    data: {
                        currency: user.currency - currencyEarned
                    }
                });
            }
        }

        // Reset all habits' status to false after updating currency
        await prisma.habit.updateMany({
            where: { status: false },
            data: { streak:0}
        });

        await prisma.habit.updateMany({
            where: { status: true },
            data: { status: false }
        });
    } catch (error) {
        console.error('Error resetting habits status:', error);
    } finally {
        await prisma.$disconnect();
    }
});
