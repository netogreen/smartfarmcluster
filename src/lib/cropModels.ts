export interface CropModel {
  key: string;
  name: string;
  standardPy: number;
  standardModules: number;
  spanType: "단동" | "연동";
  modulePy: number;
  moduleCostEok: number;
  standardEstimateEok?: number;
  sizeLabel: string;
  displayUnit: string;
  referenceBlock: string;
  referenceTotalModules: number;
  referenceAreaPy: number;
}

export const cropModels: Record<string, CropModel> = {
  salad: {
    key: "salad",
    name: "샐러드",
    standardPy: 100,
    standardModules: 1.0,
    spanType: "단동",
    modulePy: 100,
    moduleCostEok: 4.04,
    sizeLabel: "W10 x L33 x H6",
    displayUnit: "모듈(단동)",
    referenceBlock: "south-west",
    referenceTotalModules: 10.0,
    referenceAreaPy: 1000,
  },
  strawberry: {
    key: "strawberry",
    name: "딸기",
    standardPy: 1595,
    standardModules: 6.6,
    spanType: "연동",
    modulePy: 242,
    moduleCostEok: 2.42,
    standardEstimateEok: 16.0,
    sizeLabel: "W8 x L100 x H6",
    displayUnit: "모듈(연동)",
    referenceBlock: "east-top",
    referenceTotalModules: 8.0,
    referenceAreaPy: 1939,
  },
  paprika: {
    key: "paprika",
    name: "파프리카",
    standardPy: 2841,
    standardModules: 11.7,
    spanType: "연동",
    modulePy: 242,
    moduleCostEok: 2.42,
    standardEstimateEok: 28.4,
    sizeLabel: "W8 x L100 x H6",
    displayUnit: "모듈(연동)",
    referenceBlock: "west-top",
    referenceTotalModules: 13.0,
    referenceAreaPy: 3151,
  },
  cherryTomato: {
    key: "cherryTomato",
    name: "방울토마토",
    standardPy: 1421,
    standardModules: 5.9,
    spanType: "연동",
    modulePy: 242,
    moduleCostEok: 2.42,
    standardEstimateEok: 14.2,
    sizeLabel: "W8 x L100 x H6",
    displayUnit: "모듈(연동)",
    referenceBlock: "east-middle",
    referenceTotalModules: 7.0,
    referenceAreaPy: 1697,
  },
  cucumber: {
    key: "cucumber",
    name: "오이",
    standardPy: 1045,
    standardModules: 4.3,
    spanType: "연동",
    modulePy: 242,
    moduleCostEok: 2.42,
    standardEstimateEok: 10.5,
    sizeLabel: "W8 x L100 x H6",
    displayUnit: "모듈(연동)",
    referenceBlock: "west-middle",
    referenceTotalModules: 6.0,
    referenceAreaPy: 1454,
  },
};

export const cropList = Object.values(cropModels);

export function getCropByName(name: string): CropModel | undefined {
  return cropList.find((c) => c.name === name);
}
