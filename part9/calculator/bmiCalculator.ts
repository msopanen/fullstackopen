export const calculateBmi = (height: number, weight: number) => {
    const bmi = weight / ((height * height)/ 10000);
    if(bmi < 25) {
        return "Normal (healthy weight)";
    } else {
        return "Overweight";
    }
};
