import express, { Request, Response } from "express";
import { assertNumber } from "./utils";
import { calculateBmi } from "./bmiCalculator";

const app = express();

app.get('/hello', (_req: Request, res: Response) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi',(req: Request, res: Response) => {
  try {
    const height = assertNumber(req.query.height);
    const weight = assertNumber(req.query.weight);
    res.json({
      height, weight, bmi: calculateBmi(height, weight)
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error 
      ? error.message : "Unknown error";
    res.status(400).json({ error: errorMessage});
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
