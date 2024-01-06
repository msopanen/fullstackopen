export const parseNumberArgs = (args: string[], argsCount: number): number[] => {
    const numbers: number[] = []
    for(let i=2; i < argsCount; i++) {
        if(isNaN(Number(args[i]))) {
            throw new Error(`Argument ${args[i]} not number!`)
        } else {
            numbers.push(Number(args[i]))
        }
    }
    return numbers;
}