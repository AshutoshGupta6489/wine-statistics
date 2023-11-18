import { WineData } from "../interface/wineInterface";

/**
 * Calculates the mean (average) of an array of numbers.
 * @param arr - The array of numbers.
 * @returns The mean of the array.
 */
export const calculateMean = (arr: number[]): number => {
    return arr.reduce((acc, num) => acc + num, 0) / arr.length;
};

/**
 * Calculates the median of an array of numbers.
 * @param arr - The array of numbers.
 * @returns The median of the array.
 */
export const calculateMedian = (arr: number[]): number => {
    const sortedArr = arr.slice().sort((a, b) => a - b);
    const mid = Math.floor(sortedArr.length / 2);
    return sortedArr.length % 2 === 0
        ? (sortedArr[mid - 1] + sortedArr[mid]) / 2
        : sortedArr[mid];
};

/**
 * Calculates the mode (most frequent value) of an array of numbers.
 * @param arr - The array of numbers.
 * @returns The mode of the array.
 */
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

/**
 * Converts a value to a number. If the value is already a number, it is returned as is.
 * If the value is a string, it is parsed to a floating-point number.
 * @param value - The value to convert.
 * @returns The converted number.
 */
export const convertToNumber = (value: string | number): number => {
    return typeof value === 'string' ? parseFloat(value) : value;
};

/**
 * Calculates the Gamma value based on the formula: (Ash * Hue) / Magnesium.
 * @param winePoint - The data point containing "Ash," "Hue," and "Magnesium" properties.
 * @returns The calculated Gamma value.
 */
export const calculateGamma = (winePoint: WineData): number => {
    const { Ash, Hue, Magnesium } = winePoint;
    return (Ash * Hue) / Magnesium;
};
