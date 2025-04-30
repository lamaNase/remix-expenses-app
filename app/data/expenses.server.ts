import { Connect } from "vite";
import { prisma } from "./database.server";

export async function addExpense(expenseData, userId) {
    console.log(expenseData)
    debugger
    try {
        return await prisma.expense.create({
            data: {
                title: expenseData.title,
                amount: +expenseData.amount,
                date: new Date(expenseData.date),
                user: { connect: { id: userId } }
            },
        });
    } catch (error) {
        throw new Error("Failed to add this expense");
    }
}

export async function getExpenses(userId) {
    try {
        const expenses = await prisma.expense.findMany({
            where: {userId},
            orderBy: {date: 'desc'}
        });
        return expenses;
    } catch (error) {
        throw new Error("Failed to get these expenses");
    }
}

export async function getExpense(id) {
    try {
        const expense = await prisma.expense.findFirst({
            where: {id}
        });
        return expense;
    } catch (error){
        throw new Error("Failed to get this expense");
    }
}

export async function updateExpense(id, expenseData) {
    try {
        await prisma.expense.update({
            where: {id},
            data: {
                title: expenseData.title,
                amount: +expenseData.amount,
                date: new Date(expenseData.date)
            },
        });
    } catch (error) {
        throw new Error("Failed to update this expense");
    }
}

export async function deleteExpense(id) {
    try {
        await prisma.expense.delete({where: {id}});
    } catch (error) {
        throw new Error("Failed to delete this expense");
    }
}