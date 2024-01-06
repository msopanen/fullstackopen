import { parseNumberArgs } from "./utils";

const calculateBmi = (height: number, weight: number) => {
    const bmi = weight / ((height * height)/ 10000)
    if(bmi < 25) {
        return "Normal (healthy weight)"
    } else {
        return "Overweight"
    }
}

try {
    const args = parseNumberArgs(process.argv, 4);
    console.log(calculateBmi(args[0], args[1]))
} catch (error: unknown) {
    console.log(error instanceof Error ? 
        `Error: ${error.message}` : "Unknown error"); 
}
