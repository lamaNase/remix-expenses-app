import { Link, Outlet, useLoaderData } from "@remix-run/react";
import  "~/styles/expenses.css";
import ExpensesList from "~/components/expenses/ExpensesList";
import { getExpenses } from "~/data/expenses.server";
import { FaDownload, FaPlus } from "react-icons/fa";
import Error from "~/components/util/Error";
import { requireSession } from "~/data/auth.server";

export default function Expenses() {
  const expenses = useLoaderData();
  const hasExpenses = expenses && expenses.length > 0;
  return (
    <div>
      <section id="expenses-actions">
        <Link to="add">
          < FaPlus />
          <span>Add expense</span>
        </Link>
        <Link to="raw">
          < FaDownload />
          <span>Load raw expenses</span>
        </Link>
      </section>
      <Outlet/>
      {hasExpenses && <ExpensesList expenses={expenses}/>}
      {!hasExpenses && <Error title="No Expenses exist"><Link to="add">Start Adding Expenses</Link></Error>}
    </div>
  );
}

export async function loader(request) {
  const userId = await requireSession(request.request);
  return await getExpenses(userId);
}