import { calculateBmi } from "./bmiCalculator";
import { parseNumberArgs } from "./utils";
try {
    const args = parseNumberArgs(process.argv, 4);
    console.log(calculateBmi(args[0], args[1]));
} catch (error: unknown) {
    console.log(error instanceof Error ? 
        `Error: ${error.message}` : "Unknown error"); 
}