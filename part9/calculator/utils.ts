export const parseNumberArgs = (args: string[], argsCount: number): number[] => {
    const numbers: number[] = [];
    for(let i=2; i < argsCount; i++) {
        if(isNaN(Number(args[i]))) {
            throw new Error(`Argument ${args[i]} not number!`);
        } else {
            numbers.push(Number(args[i]));
        }
    }
    return numbers;
};

export const assertNumber = (arg: unknown): number => {
    const num = Number(arg);
    
    if(arg === "") {
        throw new Error("parameters missing");
    }
    
    if(isNaN(num)) {
        throw new Error("malformatted parameters");
    }

    return num;
};

export const assertNumberArray = (args: number[]): number[] => {
    if(!args) {
        throw new Error('parameters missing');
    }

    const numbers: number[] = [];
    for(let i=0; i < args.length; i++) {
        if(isNaN(Number(args[i]))) {
            throw new Error('malformatted parameters');
        } else {
            numbers.push(Number(args[i]));
        }
    }
    return numbers;
};
