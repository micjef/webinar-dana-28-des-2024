import { GoogleGenerativeAI } from "@google/generative-ai";

interface DataInputInterface {
  income: number;
  expenses: number;
  savingsGoal: number;
}

export const analyzeFinancialData = async (data: DataInputInterface): Promise<string> => {
  try {
    const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_KEY);

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"})

    const prompt = `
      Analisis keuangan berikut dalam format JSON yang sudah ditentukan:
      - Rekomendasi tentang bagaimana investasi yang sesuai supaya dapat mencapai target tabungan dalam waktu 12 bulan.
      - Grafik pie yang menunjukkan distribusi pendapatan, pengeluaran, dan tabungan. 
        Gunakan properti:
        "labels": ["Pendapatan", "Pengeluaran", "Tabungan"],
        "values": [<income>, <expenses>, <income - expenses>],
        "colors": ["#4caf50", "#f44336", "#2196f3"].
      - Grafik garis untuk menunjukkan progres tabungan dari waktu ke waktu. Properti:
        "labels": ["Bulan 1", "Bulan 2", "Bulan 3", "Bulan 4", "Bulan 5", "Bulan 6", "Bulan 7", "Bulan 8", "Bulan 9", "Bulan 10", "Bulan 11", "Bulan 12"],
        "values": [<cumulative savings per month>].
      - Gunakan format berikut:

      {
        "summary": "<strategi investasi yang kamu sarankan supaya dapat mencapai target tabungan dalam waktu 12 bulan>",
        "pieChart": {
          "labels": ["Pendapatan", "Pengeluaran", "Tabungan"],
          "values": [<pendapatan>, <pengeluaran>, <tabungan>],
          "colors": ["#4caf50", "#f44336", "#2196f3"]
        },
        "lineChart": {
          "labels": ["Bulan 1", "Bulan 2", "Bulan 3", "Bulan 4", "Bulan 5", "Bulan 6", "Bulan 7", "Bulan 8", "Bulan 9", "Bulan 10", "Bulan 11", "Bulan 12"],
          "values": [<tabungan bulan ke-1>, <tabungan bulan ke-2>, <tabungan bulan ke-3>, <tabungan bulan ke-4>, <tabungan bulan ke-5>, <tabungan bulan ke-6>, <tabungan bulan ke-7>, <tabungan bulan ke-8>, <tabungan bulan ke-9>, <tabungan bulan ke-10>, <tabungan bulan ke-11>, <tabungan bulan ke-12>]
        }
      }

      Data Keuangan:
      {
        "Pendapatan": "Rp ${data.income.toLocaleString()}",
        "Pengeluaran": "Rp ${data.expenses.toLocaleString()}",
        "Target Tabungan": "Rp ${data.savingsGoal.toLocaleString()}"
      }
    `;

    const result = await model.generateContent(prompt);

    const response = await result.response
    const text = response.text()

    return text
  } catch (error) {
      console.error("Error analyzing financial data:", error);
      throw new Error("Analysis failed. Please try again.");
  }
};