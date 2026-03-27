import { CropModel } from "./cropModels";

export interface CropCalculationResult {
  cropName: string;
  sizeLabel: string;
  spanType: string;
  modulePy: number;
  displayUnit: string;
  budgetEok: number;
  rawModules: number;
  displayModules: number;
  areaPy: number;
  displayAreaPy: number;
  depositManwon: number;
  standardRatio: number;
  referenceRatio: number;
  referenceTotalModules: number;
  standardPy: number;
}

export function calculateCrop(
  budgetEok: number,
  crop: CropModel
): CropCalculationResult {
  const rawModules = budgetEok / crop.moduleCostEok;
  const displayModules = Math.round(rawModules * 10) / 10;
  const areaPy = rawModules * crop.modulePy;
  const displayAreaPy = Math.round(areaPy * 10) / 10;
  const depositManwon = Math.round(budgetEok * 100); // 1억 = 10000만, × 1% = 100만
  const standardRatio = Math.round((areaPy / crop.standardPy) * 1000) / 10;
  const referenceRatio =
    Math.round((rawModules / crop.referenceTotalModules) * 1000) / 10;

  return {
    cropName: crop.name,
    sizeLabel: crop.sizeLabel,
    spanType: crop.spanType,
    modulePy: crop.modulePy,
    displayUnit: crop.displayUnit,
    budgetEok,
    rawModules,
    displayModules,
    areaPy,
    displayAreaPy,
    depositManwon,
    standardRatio,
    referenceRatio,
    referenceTotalModules: crop.referenceTotalModules,
    standardPy: crop.standardPy,
  };
}

export function formatManWon(manWon: number): string {
  if (manWon >= 10000) {
    const eok = Math.floor(manWon / 10000);
    const rest = manWon % 10000;
    if (rest === 0) return `${eok}억원`;
    return `${eok}억 ${rest.toLocaleString()}만원`;
  }
  return `${manWon.toLocaleString()}만원`;
}
