import { useId } from "react";
import { requireSession } from "~/data/auth.server";
import { getExpenses } from "~/data/expenses.server";

export async function loader(request) {
    const userId = await requireSession(request.request);
    return getExpenses(userId);
}

export function meta() {
    return [{
      title: "Load Your Expenses",
      description: "Load all your recorded expenses here"
    }];
}