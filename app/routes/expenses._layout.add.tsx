import ExpensesForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";
import { redirect, useNavigate } from "@remix-run/react";
import { addExpense } from "~/data/expenses.server";
import { validateExpenseInput } from "~/data/validation.server";
import { requireSession } from "~/data/auth.server";

export default function AddExpensesPage() {
    const navigate = useNavigate();
    function close() {
        navigate("..");
    }

    return (
        <Modal onClose={close}>
            <ExpensesForm/>
        </Modal>
    );
}

export async function action(request) {
    const userId = await requireSession(request.request);
    const formData = await request.request.formData();
    const expensesData = Object.fromEntries(formData);
    
    try {
        validateExpenseInput(expensesData);
    } catch (error) {
        return error;
    }
    
    await addExpense(expensesData, userId);
    return redirect("/expenses");
}

export function meta() {
    return [{
      title: "Add New Expense",
      description: "Fill out the form to add a new expense to your records."
    }];
}  