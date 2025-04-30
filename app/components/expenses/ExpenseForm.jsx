import { Form, Link, useActionData, useMatches, useNavigation, useParams } from "@remix-run/react";

function ExpenseForm() {
  const today = new Date().toISOString().slice(0, 10); // yields something like 2023-09-10
  const error = useActionData();
  const navigation = useNavigation();
  const isSubmiting = navigation.state !== 'idle';
  
  //extract the data loaded from the expenses loader function
  const matches = useMatches();
  const params = useParams();
  const expenses = matches.find(match => match.id === "routes/expenses._layout").data;
  const expensesData = expenses.find(expense => expense.id === params.id);

  if(params.id && !expensesData){
    return (
      <maiin>
        <h1>Invalid Expense ID</h1>
        <p>The requested expense does not exist</p>
      </maiin>
    );
  }

  const defaultData = expensesData? {
    title: expensesData.title,
    amount: expensesData.amount,
    date: expensesData.date
  }: {
    title: '',
    amount: '',
    date: ''
  };

  return (
    <Form method={expensesData? "patch": "post"} className="form" id="expense-form">
      <p>
        <label htmlFor="title">Expense Title</label>
        <input type="text" id="title" name="title" defaultValue={defaultData.title}/>
      </p>

      <div className="form-row">
        <p>
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            step="any"
            id="amount"
            name="amount"
            defaultValue={defaultData.amount}
          />
        </p>
        <p>
          <label htmlFor="date">Date</label>
          <input type="date" id="date" name="date" defaultValue={defaultData.date? defaultData.date.slice(0,10): ''} max={today} />
        </p>
      </div>
      {error && <ul>
        {Object.values(error).map(err => <li key={err}>
          {err}
        </li>)}  
      </ul>}
      <div className="form-actions">
        <button disabled={isSubmiting} >
          {isSubmiting? "Submitting...": "Save Expense"}
        </button>
        <Link to="..">Cancel</Link>
      </div>
    </Form>
  );
}

export default ExpenseForm;