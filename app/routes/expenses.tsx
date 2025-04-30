import { Outlet } from "@remix-run/react";
import ExpensesHeader from "~/components/navigation/ExpensesHeader";
import { getUserFromSession, requireSession } from "~/data/auth.server";
import "~/styles/expenses.css";

export default function Expenses() {
    return (
        <>
            < ExpensesHeader />
            < Outlet />
        </>
    );
}

export async function loader(request) {
    await requireSession(request.request);
    return await getUserFromSession(request.request);
}