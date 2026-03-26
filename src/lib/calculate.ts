// 기준 모듈: W8xL100xH6 연동 1동 = 242평
export const MODULE_AREA = 242; // 평
export const PRICE_PER_PYEONG = 100; // 만원 (= 100만원/평)

export interface CalculationResult {
  budgetWon: number; // 총 기준금액 (만원)
  estimatedArea: number; // 예상 가능 평수
  estimatedModules: number; // 예상 모듈 수 (소수점 1자리)
  depositExample: number; // 우선 가계약금 예시 (만원, 1%)
  recommendedNote: string; // 권장 신청 기준 설명
}

export function calculate(budgetEok: number): CalculationResult {
  const budgetManWon = budgetEok * 10000; // 억 → 만원
  const estimatedArea = budgetManWon / PRICE_PER_PYEONG; // 평수
  const rawModules = estimatedArea / MODULE_AREA;
  const estimatedModules = Math.round(rawModules * 10) / 10; // 소수점 1자리 반올림
  const depositExample = Math.round(budgetManWon * 0.01); // 1%

  let recommendedNote: string;
  if (rawModules >= 1 && rawModules < 1.5) {
    recommendedNote = `약 ${Math.round(rawModules)}모듈(연동)`;
  } else if (rawModules >= 1.5) {
    recommendedNote = `약 ${Math.round(rawModules)}모듈(연동)`;
  } else {
    recommendedNote = "별도 상담";
  }

  return {
    budgetWon: budgetManWon,
    estimatedArea,
    estimatedModules,
    depositExample,
    recommendedNote,
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
