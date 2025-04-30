import { Link, useLoaderData } from "@remix-run/react";
import Chart from "~/components/expenses/Chart";
import ExpenseStatistics from "~/components/expenses/ExpenseStatistics";
import { getExpenses } from "~/data/expenses.server";
import Error from "~/components/util/Error";
import { requireSession } from "~/data/auth.server";

export default function ExpensesAnalysisPage() {
    const expenses = useLoaderData();
    const hasExpenses = expenses && expenses.length > 0;

    return (
        <div>
            {
                hasExpenses &&
                <main>
                    <Chart expenses={expenses} />
                    <ExpenseStatistics expenses={expenses} />
                </main>
            }
            {!hasExpenses &&
                <Error title="No Expenses Exist">
                    <Link to="/expenses/add">Start Adding Expenses</Link>
                </Error>
            }
        </div>
    );
}

export async function loader(request) {
    const userId = await requireSession(request.request);
    try {
        return await getExpenses(userId);
    } catch (error) {
        throw error;
    }
}

export function meta() {
    return [{
      title: "Analysis of Your Expenses",
      description: "See chart and statistical analysis of your expenses."
    }];
}