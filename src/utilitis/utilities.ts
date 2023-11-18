import { WineData } from "../interface/wineInterface";

export const calculateMean = (arr: number[]): number => {
    return arr.reduce((acc, num) => acc + num, 0) / arr.length;
};

// Helper function to calculate median
export const calculateMedian = (arr: number[]): number => {
    const sortedArr = arr.slice().sort((a, b) => a - b);
    const mid = Math.floor(sortedArr.length / 2);
    return sortedArr.length % 2 === 0
        ? (sortedArr[mid - 1] + sortedArr[mid]) / 2
        : sortedArr[mid];
};


// Helper function to calculate mode
export const calculateMode = (arr: number[]): number => {
    const frequencyMap: Record<number, number> = {};
    let maxFrequency = 0;
    let mode: number | undefined;

    arr.forEach((num) => {
        frequencyMap[num] = (frequencyMap[num] || 0) + 1;
        if (frequencyMap[num] > maxFrequency) {
            maxFrequency = frequencyMap[num];
            mode = num;
        }
    });

    return mode || 0;
};
export const convertToNumber = (value: string | number): number => {
    return typeof value === 'string' ? parseFloat(value) : value;
};
export const calculateGamma = (winePoint: WineData): number => {
    const { Ash, Hue, Magnesium } = winePoint;
    return (Ash * Hue) / Magnesium;
};
