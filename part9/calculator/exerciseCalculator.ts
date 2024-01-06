interface ExercisePeriodRating {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const getExercisePeriodRating = (target: number, days: number[]): ExercisePeriodRating => {
    
    const periodLength = days.length;
    const trainingDays = days.filter(h => h > 0).length;
    const totalTraining = days.reduce((acc, h) => (acc += h), 0)
    const average = totalTraining / periodLength;

    let rating;
    let ratingDescription;

    if(average < (target / 2)) {
        rating = 1;
        ratingDescription = "oh no"
    } else if(average >= target) {
        rating = 3
        ratingDescription = "awesome, you reached your target"
    } else {
        rating = 2;
        ratingDescription = "not too bad but could be better"
    }

    const success = average >= target;

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average,
    }
}

console.log(getExercisePeriodRating(2, [3, 0, 2, 4.5, 0, 3, 1]))