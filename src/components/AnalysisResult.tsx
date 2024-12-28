import { FC, useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from "chart.js";
import { Pie, Line } from "react-chartjs-2";

ChartJS.register(ArcElement, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

interface AnalysisResultProps {
  result: string;
}

const AnalysisResult: FC<AnalysisResultProps> = ({ result }) => {
  const [summary, setSummary] = useState<string>("");
  const [pieData, setPieData] = useState<{ labels: string[]; values: string[]; colors: string[]; } | null>(null);
  const [lineData, setLineData] = useState<{ labels: string[]; values: string[]; } | null>(null);
  const [recommendations, setRecommendations] = useState<string[]>([]);

  const sanitizeAndParseJSON = (rawResult: string) => {
    try {
      const sanitizedResult = rawResult.split("json")[1].split("```")[0]
      return JSON.parse(sanitizedResult);
    } catch (error) {
      console.error("Failed to parse result. Returning raw result.", error);
      return null;
    }
  };

  useEffect(() => {
    console.log("Raw result:", result);
    const consumeResult = async () => {
      try {
        const parsedResult = sanitizeAndParseJSON(result);
        console.log("parsedResult ->", parsedResult);

        setSummary(parsedResult.summary || "No summary available.");
        setPieData(parsedResult.pieChart || null);
        setLineData(parsedResult.lineChart || null);
        setRecommendations(parsedResult.recommendations || []);
      } catch (error) {
        console.error("Error parsing result:", error);
        setSummary(result);
      }
    };

    consumeResult();
  }, [result]);

  return (
    <div>
      <h2>Analysis Result</h2>
      <section>
        <h3>Summary</h3>
        <p>{summary}</p>
      </section>

      {pieData && (
        <section>
          <h3>Income vs. Expenses Pie Chart</h3>
          <Pie
            data={{
              labels: pieData.labels,
              datasets: [
                {
                  label: "Income vs. Expenses",
                  data: pieData.values,
                  backgroundColor: pieData.colors || ["#4caf50", "#f44336", "#2196f3"],
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                tooltip: { enabled: true },
                legend: { position: "top" },
              },
            }}
          />
        </section>
      )}

      {lineData && (
        <section>
          <h3>Savings Goal Progress</h3>
          <Line
            data={{
              labels: lineData.labels,
              datasets: [
                {
                  label: "Savings Progress",
                  data: lineData.values,
                  borderColor: "#4caf50",
                  backgroundColor: "rgba(76, 175, 80, 0.2)",
                  pointBackgroundColor: "#4caf50",
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                tooltip: { enabled: true },
                legend: { position: "top" },
              },
              scales: {
                x: { title: { display: true, text: "Months" } },
                y: { title: { display: true, text: "Savings (IDR)" } },
              },
            }}
          />
        </section>
      )}

      {recommendations.length > 0 && (
        <section>
          <h3>Recommendations</h3>
          <ul>
            {recommendations.map((rec, index) => (
              <li key={index}>{rec}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default AnalysisResult;