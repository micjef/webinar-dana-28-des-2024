import React, { useState } from "react";
import FinancialForm from "./components/FinancialForm";
import AnalysisResult from "./components/AnalysisResult";
import { analyzeFinancialData } from "./utils/geminiHelper";

const App: React.FC = () => {
  const [analysisResult, setAnalysisResult] = useState<string>("");

  const handleFormSubmit = async (data: { income: number, expenses: number, savingsGoal: number }) => {
    try {
      const result = await analyzeFinancialData(data);
      setAnalysisResult(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Financial Planning with AI</h1>
      <FinancialForm onSubmit={handleFormSubmit} />
      {analysisResult && <AnalysisResult result={analysisResult} />}
    </div>
  );
};

export default App;
