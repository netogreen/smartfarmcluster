"use client";

import { useState } from "react";
import { cropModels, cropList, CropModel } from "@/lib/cropModels";
import { calculateCrop, formatManWon } from "@/lib/calculate";
import Link from "next/link";


export default function CalculatorPage() {
  const [selectedCropKey, setSelectedCropKey] = useState<string>("");
  const [budget, setBudget] = useState<string>("");

  const selectedCrop = selectedCropKey ? cropModels[selectedCropKey] : null;
  const budgetNum = parseFloat(budget);
  const result =
    selectedCrop && !isNaN(budgetNum) && budgetNum > 0
      ? calculateCrop(budgetNum, selectedCrop)
      : null;

  return (
    <>
      {/* Page Header */}
      <section className="bg-green-50 py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            모듈 계산기
          </h1>
          <p className="mt-3 text-gray-600">
            작물별 모듈 단가 기준으로 예상 가능 평수와 모듈 수를 안내합니다.
          </p>
        </div>
      </section>

      {/* 작물별 모듈 기준 */}
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-lg font-bold text-gray-900 mb-6">
            작물별 모듈 기준
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-3 text-left font-medium text-gray-600">작물</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">규격</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">스팬</th>
                  <th className="px-4 py-3 text-right font-medium text-gray-600">1모듈 면적</th>
                  <th className="px-4 py-3 text-right font-medium text-gray-600">1모듈 단가</th>
                </tr>
              </thead>
              <tbody>
                {cropList.map((crop) => (
                  <tr key={crop.key} className="border-t border-gray-100">
                    <td className="px-4 py-3 font-medium text-gray-900">{crop.name}</td>
                    <td className="px-4 py-3 text-gray-600 text-xs">{crop.sizeLabel}</td>
                    <td className="px-4 py-3 text-gray-600">{crop.spanType}</td>
                    <td className="px-4 py-3 text-right text-gray-900">{crop.modulePy}평</td>
                    <td className="px-4 py-3 text-right font-semibold text-green-700">{crop.moduleCostEok}억원</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-4">
            위 단가는 토지+시설온실 포함 기준입니다. 실제 공급 조건은 프로젝트별로 달라질 수 있습니다.
          </p>
        </div>
      </section>

      {/* 계산기 */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-lg font-bold text-gray-900 mb-6">
            예상 규모 계산
          </h2>

          <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200 shadow-sm">
            {/* 작물 선택 */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                희망 작물 선택
              </label>
              <div className="flex flex-wrap gap-3">
                {cropList.map((crop) => (
                  <button
                    key={crop.key}
                    type="button"
                    onClick={() => setSelectedCropKey(crop.key)}
                    className={`px-4 py-2.5 rounded-lg border text-sm transition-colors ${
                      selectedCropKey === crop.key
                        ? "bg-green-50 border-green-500 text-green-700 font-medium"
                        : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    {crop.name}
                  </button>
                ))}
              </div>
            </div>

            {/* 선택된 작물 기준 표시 */}
            {selectedCrop && (
              <div className="mb-6 bg-gray-50 rounded-xl p-4 border border-gray-100">
                <p className="text-xs text-gray-500 mb-1">선택된 작물 기준</p>
                <p className="text-sm font-medium text-gray-900">
                  {selectedCrop.name} · {selectedCrop.sizeLabel} · {selectedCrop.modulePy}평 · {selectedCrop.spanType} · 1모듈 {selectedCrop.moduleCostEok}억원
                </p>
              </div>
            )}

            {/* 예산 입력 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                정책자금 활용 예정규모
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  placeholder="예: 2.5"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-40 px-4 py-3 border border-gray-300 rounded-xl text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <span className="text-gray-600 font-medium">억원</span>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                소수점 입력 가능 (예: 2.5 / 3 / 5)
              </p>
            </div>

            {/* 결과 카드 */}
            {result && (
              <div className="mt-8 bg-green-50 rounded-xl p-6 border border-green-100">
                <h3 className="text-sm font-semibold text-green-800 mb-4">
                  입력 예산 기준 예상 결과
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <ResultItem label="선택 작물" value={result.cropName} />
                  <ResultItem
                    label="적용 모듈 규격"
                    value={`${result.sizeLabel} / ${result.modulePy}평 / ${result.spanType}`}
                  />
                  <ResultItem label="입력 예산" value={`${result.budgetEok}억원`} />
                  <ResultItem
                    label="예상 모듈 수"
                    value={`${result.displayModules.toFixed(1)}${selectedCrop!.displayUnit}`}
                    highlight
                  />
                  <ResultItem
                    label="선택 작물 기준 예상 가능 면적"
                    value={`약 ${result.displayAreaPy.toLocaleString()}평`}
                  />
                  <ResultItem
                    label="표준모델 대비 수준"
                    value={`${selectedCrop!.name} 표준모델(${selectedCrop!.standardPy.toLocaleString()}평) 대비 약 ${result.standardRatio}%`}
                  />
                  <ResultItem
                    label="우선 가계약금 예시"
                    value={formatManWon(result.depositManwon)}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 bg-yellow-50 border border-yellow-100 rounded-xl p-4">
            <p className="text-xs text-yellow-800 leading-relaxed">
              본 계산은 신청 편의를 위한 기준값입니다. 실제 공급 조건, 면적,
              일정, 가계약 조건은 프로젝트별로 달라질 수 있습니다.
            </p>
          </div>

          {/* 작물별 예시 표 */}
          <div className="mt-10">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">
              작물별 계산 예시
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-3 py-3 text-left font-medium text-gray-600">작물</th>
                    <th className="px-3 py-3 text-right font-medium text-gray-600">예산</th>
                    <th className="px-3 py-3 text-right font-medium text-gray-600">예상 모듈</th>
                    <th className="px-3 py-3 text-right font-medium text-gray-600">예상 평수</th>
                    <th className="px-3 py-3 text-right font-medium text-gray-600">가계약금 예시</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { cropKey: "salad", budget: 4 },
                    { cropKey: "strawberry", budget: 5 },
                    { cropKey: "paprika", budget: 10 },
                    { cropKey: "cherryTomato", budget: 5 },
                    { cropKey: "cucumber", budget: 5 },
                  ].map(({ cropKey, budget: b }) => {
                    const crop = cropModels[cropKey];
                    const r = calculateCrop(b, crop);
                    return (
                      <tr key={cropKey} className="border-t border-gray-100">
                        <td className="px-3 py-3 font-medium">{crop.name}</td>
                        <td className="px-3 py-3 text-right">{b}억원</td>
                        <td className="px-3 py-3 text-right text-green-700 font-semibold">
                          {r.displayModules.toFixed(1)}{crop.displayUnit}
                        </td>
                        <td className="px-3 py-3 text-right">
                          약 {r.displayAreaPy.toLocaleString()}평
                        </td>
                        <td className="px-3 py-3 text-right">
                          {formatManWon(r.depositManwon)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* 1만평 배치 예시 */}
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-lg font-bold text-gray-900 mb-2">
            1만평 기준 참고 배치 예시
          </h2>
          <p className="text-sm text-gray-500 mb-8">
            아래 배치도는 1만평 기준 참고 예시입니다. 실제 공급 배치와 조건은 프로젝트별로 달라질 수 있습니다.
          </p>

          {/* Schematic Block View - 면적 비례 배치 */}
          <div className="bg-gray-50 rounded-2xl p-4 md:p-6 border border-gray-200">
            <div className="max-w-2xl mx-auto">
              {/* Block Headers */}
              <div className="grid grid-cols-[1fr_40px_1fr] mb-2">
                <p className="text-xs font-medium text-gray-500 text-center">WEST BLOCK</p>
                <div />
                <p className="text-xs font-medium text-gray-500 text-center">EAST BLOCK</p>
              </div>

              {/* Main Layout - 과채 4종 면적 비례 */}
              <div className="grid grid-cols-[1fr_40px_1fr] gap-0">
                {/* West Column: 파프리카(13) + 오이(6) = 19 modules */}
                <div className="flex flex-col gap-2">
                  <LayoutBlock
                    label="파프리카"
                    modules={13}
                    areaPy={3146}
                    color="bg-green-100 border-green-300"
                    selectedCropKey={selectedCropKey}
                    cropKey="paprika"
                    result={result}
                    heightModules={13}
                    maxModules={19}
                  />
                  <LayoutBlock
                    label="오이"
                    modules={6}
                    areaPy={1452}
                    color="bg-blue-100 border-blue-300"
                    selectedCropKey={selectedCropKey}
                    cropKey="cucumber"
                    result={result}
                    heightModules={6}
                    maxModules={19}
                  />
                </div>

                {/* Center Road */}
                <div className="flex items-center justify-center">
                  <div className="h-full w-px bg-gray-300 relative">
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[9px] text-gray-400 whitespace-nowrap -rotate-90 bg-gray-50 px-1">
                      물류도로 10m
                    </span>
                  </div>
                </div>

                {/* East Column: 딸기(8) + 방울토마토(7) = 15 modules */}
                <div className="flex flex-col gap-2">
                  <LayoutBlock
                    label="딸기"
                    modules={8}
                    areaPy={1936}
                    color="bg-pink-100 border-pink-300"
                    selectedCropKey={selectedCropKey}
                    cropKey="strawberry"
                    result={result}
                    heightModules={8}
                    maxModules={15}
                  />
                  <LayoutBlock
                    label="방울토마토"
                    modules={7}
                    areaPy={1694}
                    color="bg-red-100 border-red-300"
                    selectedCropKey={selectedCropKey}
                    cropKey="cherryTomato"
                    result={result}
                    heightModules={7}
                    maxModules={15}
                  />
                </div>
              </div>

              {/* Bottom Row: 샐러드 + 제반시설 (고정 높이) */}
              <div className="grid grid-cols-2 gap-2 mt-2">
                <LayoutBlock
                  label="샐러드"
                  modules={10}
                  areaPy={1000}
                  color="bg-yellow-100 border-yellow-300"
                  selectedCropKey={selectedCropKey}
                  cropKey="salad"
                  result={result}
                  fixedHeight={80}
                />
                <div className="border border-gray-300 bg-gray-200 rounded-lg p-3 md:p-4 text-center flex flex-col items-center justify-center" style={{ height: "80px" }}>
                  <p className="text-xs font-medium text-gray-600">제반시설</p>
                  <p className="text-xs text-gray-500">1,000평</p>
                </div>
              </div>

              <p className="text-center text-[10px] text-gray-400 mt-2">MAIN GATE ▼</p>
            </div>
          </div>

          {/* 선택 작물 기준 블록 비교 */}
          {result && selectedCrop && (
            <div className="mt-6 bg-green-50 rounded-xl p-5 border border-green-100">
              <p className="text-sm text-gray-700">
                1만평 예시 배치 기준, <span className="font-semibold text-green-700">{selectedCrop.name}</span> 존{" "}
                <span className="font-semibold">{selectedCrop.referenceTotalModules.toFixed(1)}{selectedCrop.displayUnit}</span> 중 약{" "}
                <span className="font-semibold text-green-700">{result.displayModules.toFixed(1)}{selectedCrop.displayUnit}</span> 수준입니다.
              </p>
              <p className="text-sm text-gray-600 mt-1">
                예시 블록 대비 약 <span className="font-semibold">{result.referenceRatio}%</span> 규모입니다.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Link
            href="/apply"
            className="inline-flex items-center justify-center px-8 py-4 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors"
          >
            입주 희망 신청하기
          </Link>
        </div>
      </section>
    </>
  );
}

function ResultItem({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div>
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p
        className={`text-base font-bold ${
          highlight ? "text-green-700" : "text-gray-900"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function LayoutBlock({
  label,
  modules,
  areaPy,
  color,
  selectedCropKey,
  cropKey,
  result,
  heightModules,
  maxModules,
  fixedHeight,
}: {
  label: string;
  modules: number;
  areaPy: number;
  color: string;
  selectedCropKey: string;
  cropKey: string;
  result: ReturnType<typeof calculateCrop> | null;
  heightModules?: number;
  maxModules?: number;
  fixedHeight?: number;
}) {
  const isSelected = selectedCropKey === cropKey;
  const userAreaPy = result && isSelected ? result.displayAreaPy : null;
  const fillPercent = userAreaPy !== null ? Math.min((userAreaPy / areaPy) * 100, 100) : 0;
  const unitLabel = cropKey === "salad" ? "모듈(단동)" : "모듈(연동)";

  const style: React.CSSProperties = fixedHeight
    ? { height: `${fixedHeight}px` }
    : heightModules && maxModules
      ? { height: `${Math.round((heightModules / maxModules) * 380)}px`, minHeight: "70px" }
      : { minHeight: "80px" };

  return (
    <div
      className={`relative border rounded-lg p-2 md:p-3 text-center overflow-hidden transition-all flex flex-col items-center justify-center ${
        isSelected ? `${color} ring-2 ring-green-500` : `${color}`
      }`}
      style={style}
    >
      {/* User area fill overlay */}
      {isSelected && fillPercent > 0 && (
        <div
          className="absolute bottom-0 left-0 right-0 bg-green-500/25 border-t-2 border-green-500 transition-all duration-500"
          style={{ height: `${fillPercent}%` }}
        />
      )}
      <div className="relative z-10">
        <p className="text-xs md:text-sm font-semibold text-gray-800">{label}</p>
        <p className="text-[10px] md:text-xs text-gray-600">
          {modules}{unitLabel} / {areaPy.toLocaleString()}평
        </p>
        {isSelected && userAreaPy !== null && (
          <div className="mt-1 bg-white/80 rounded px-1.5 py-0.5 inline-block">
            <p className="text-[10px] md:text-xs font-bold text-green-700">
              내 예상: {userAreaPy.toLocaleString()}평
              ({result!.displayModules.toFixed(1)}{unitLabel})
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
