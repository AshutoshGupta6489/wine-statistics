import React, { useEffect, useMemo, useState } from 'react';
import { WineData } from '../../interface/wineInterface';
import { calculateGamma, calculateMean, calculateMedian, calculateMode, convertToNumber } from '../../utilitis/utilities';
import './WineDisplay.css';
import WineTable from '../Tablecomponent/WineTable';

const WineDisplay: React.FC = () => {
  // State variables to store wine data and statistics maps for flavanoids and gamma
  const [wineData, setWineData] = useState<WineData[] | null>(null);
  const [flavanoidsMap, setFlavanoidsMap] = useState<Map<number, { data: number[]; mean: number; median: number; mode: number }>>(
    new Map()
  );
  const [gammaMap, setGammaMap] = useState<Map<number, { data: number[]; mean: number; median: number; mode: number }>>(
    new Map()
  );

  // Fetch wine data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/Wine-Data.json'); // Adjust the path based on your project structure
        const data: WineData[] | null = await response.json();
        setWineData(data);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };
    fetchData();
  }, []);

  // Calculate statistics using memoization when wineData changes
  useMemo(() => {
    if (wineData) {
      const newFlavanoidsMap = new Map<number, { data: number[]; mean: number; median: number; mode: number }>();
      const newGammaMap = new Map<number, { data: number[]; mean: number; median: number; mode: number }>();

      // Iterate over wine data to calculate statistics
      wineData.forEach((winePoint: WineData) => {
        const alcohol = winePoint.Alcohol;

        // Calculate normal statistics (mean, median, mode) for flavanoids
        const flavanoids = newFlavanoidsMap.get(alcohol)?.data || [];
        flavanoids.push(convertToNumber(winePoint.Flavanoids));
        const flavanoidsMean = calculateMean(flavanoids);
        const flavanoidsMedian = calculateMedian(flavanoids);
        const flavanoidsMode = calculateMode(flavanoids);
        newFlavanoidsMap.set(alcohol, { data: flavanoids, mean: flavanoidsMean, median: flavanoidsMedian, mode: flavanoidsMode });

        // Calculate Gamma and its statistics
        const gamma = calculateGamma(winePoint);
        const gammaData = newGammaMap.get(alcohol)?.data || [];
        gammaData.push(gamma);
        const gammaMean = calculateMean(gammaData);
        const gammaMedian = calculateMedian(gammaData);
        const gammaMode = calculateMode(gammaData);
        newGammaMap.set(alcohol, { data: gammaData, mean: gammaMean, median: gammaMedian, mode: gammaMode });
      });
      setFlavanoidsMap(newFlavanoidsMap);
      setGammaMap(newGammaMap);
    }
  }, [wineData]);

  // Render loading message while data is being fetched
  if (!wineData) {
    return <div>Loading...</div>;
  }

  // Render WineTable components for Flavanoids and Gamma
  return (
    <div>
      <WineTable measure="Flavanoids" dataMap={flavanoidsMap} />
      <WineTable measure="Gamma" dataMap={gammaMap} />
    </div>
  );
};

export default WineDisplay;
