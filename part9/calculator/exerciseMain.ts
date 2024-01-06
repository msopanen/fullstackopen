import { getExercisePeriodRating } from "./exerciseCalculator";
import { parseNumberArgs } from "./utils";

try {
    const args = parseNumberArgs(process.argv, process.argv.length);
    const target = args.shift() || 0;
    console.log(getExercisePeriodRating(target, args));
} catch (error: unknown) {
    console.log(error instanceof Error ? 
        `Error: ${error.message}` : "Unknown error"); 
}