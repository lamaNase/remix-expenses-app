import { redirect, useMatches, useNavigate, useParams } from "@remix-run/react";
import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";
import { deleteExpense, updateExpense } from "~/data/expenses.server";
import { validateExpenseInput } from "~/data/validation.server";

export default function ExpensesUpdatePage() {
    const navigate = useNavigate();
    function close() {
        navigate("..");
    }

    return (
        <Modal onClose={close}>
            < ExpenseForm />
        </Modal>
    );
}
export async function action(request) {
    const id = request.params.id;
    if (request.request.method === 'PATCH') {
        const formData = await request.request.formData();
        const expenseData = Object.fromEntries(formData);
        try {
            validateExpenseInput(expenseData);
        } catch (error) {
            console.log(error);
            return error;
        }

        await updateExpense(id, expenseData);
        return redirect("/expenses");
    } else {
        await deleteExpense(id);
        return { deletedId: id };
    }
}

export function meta() {
    const matches = useMatches();
    const params = useParams();
    const expenses = matches.find(match => match.id === "routes/expenses._layout").data;
    const expensesData = expenses.find(expense => expense.id === params.id);
    return [{
        title: expensesData.title,
        description: "Update your expense"
    }];
}  