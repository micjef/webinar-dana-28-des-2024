import { FC, FormEvent, useState } from "react";

interface FinancialData {
  income: number;
  expenses: number;
  savingsGoal: number;
}

interface FinancialFormProps {
  onSubmit: (data: FinancialData) => void;
}

const FinancialForm: FC<FinancialFormProps> = ({ onSubmit }) => {
  const [income, setIncome] = useState<number>(0);
  const [expenses, setExpenses] = useState<number>(0);
  const [savingsGoal, setSavingsGoal] = useState<number>(0);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({ income, expenses, savingsGoal });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Income:</label>
        <input type="text" value={income} onChange={(e) => setIncome(Number(e.target.value))} />
      </div>
      <div>
        <label>Expenses:</label>
        <input type="text" value={expenses} onChange={(e) => setExpenses(Number(e.target.value))} />
      </div>
      <div>
        <label>Savings Goal:</label>
        <input type="text" value={savingsGoal} onChange={(e) => setSavingsGoal(Number(e.target.value))} />
      </div>
      <button type="submit">Analyze</button>
    </form>
  );
};

export default FinancialForm;
