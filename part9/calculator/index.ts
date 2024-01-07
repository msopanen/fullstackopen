import express, { Request, Response } from "express";
import { assertNumber, assertNumberArray } from "./utils";
import { calculateBmi } from "./bmiCalculator";
import { getExercisePeriodRating } from "./exerciseCalculator";

const app = express();
app.use(express.json());

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

// Way to type express req with custom body
/*interface ExercisesBody {
  daily_exercises: number[],
  target: number
}

interface ExercisesRequest extends Request {
  body: ExercisesBody;
}

app.post('/exercises',(req: ExercisesRequest, res: Response) => {
  try {
    const target = assertNumber(req.body.target);
    const dailyExecrices = assertNumberArray(req.body.daily_exercises);

    res.json(getExercisePeriodRating(target, dailyExecrices));
  } catch (error: unknown) {
    const errorMessage = error instanceof Error 
      ? error.message : "Unknown error";
    res.status(400).json({ error: errorMessage});
  }
});*/

app.post('/exercises',(req: Request, res: Response) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const target = assertNumber(req.body.target);
    
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    const dailyExecrices = assertNumberArray(req.body.daily_exercises);

    res.json(getExercisePeriodRating(target, dailyExecrices));
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
