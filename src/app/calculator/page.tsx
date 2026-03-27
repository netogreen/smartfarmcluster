"use client";

import { useState } from "react";
import { calculate, formatManWon } from "@/lib/calculate";
import Link from "next/link";

export default function CalculatorPage() {
  const [budget, setBudget] = useState<string>("");
  const budgetNum = parseFloat(budget);
  const result = !isNaN(budgetNum) && budgetNum > 0 ? calculate(budgetNum) : null;

  return (
    <>
      {/* Page Header */}
      <section className="bg-green-50 py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            기준 안내 및 예상 규모 계산
          </h1>
          <p className="mt-3 text-gray-600">
            평당 100만원(토지+시설온실 포함) 기준으로 예상 가능 평수와 모듈 수를 안내합니다.
          </p>
        </div>
      </section>

      {/* 기준 안내 */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-lg font-bold text-gray-900 mb-6">기준 안내</h2>
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 space-y-3">
            <InfoRow
              label="기준 단가"
              value="평당 100만원(토지+시설온실 포함)"
            />
            <InfoRow
              label="1모듈 안내 기준"
              value="약 250평 (신청 편의 기준)"
            />
            <InfoRow
              label="실제 기준 모듈"
              value="W8×L100×H6 연동 1동, 242평"
            />
            <InfoRow
              label="모듈 수 계산"
              value="기준 모듈(242평) 기준, 소수점 1자리까지 표시"
            />
          </div>
          <p className="text-xs text-gray-400 mt-4">
            신청 편의를 위해 1모듈은 약 250평 기준으로 안내합니다. 실제 기준
            모듈은 W8×L100×H6 연동 1동, 약 242평입니다. 표시되는 모듈 수는
            기준 모듈(242평) 기준 계산값이며 소수점 1자리까지 안내합니다.
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

            {result && (
              <div className="mt-8 bg-green-50 rounded-xl p-6 border border-green-100">
                <h3 className="text-sm font-semibold text-green-800 mb-4">
                  계산 결과
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <ResultItem
                    label="정책자금 활용 예정규모"
                    value={`${budgetNum}억원`}
                  />
                  <ResultItem
                    label="예상 가능 평수"
                    value={`${result.estimatedArea.toLocaleString()}평`}
                  />
                  <ResultItem
                    label="예상 모듈 수"
                    value={`${result.estimatedModules.toFixed(1)}모듈(연동)`}
                    highlight
                  />
                  <ResultItem
                    label="권장 신청 기준"
                    value={result.recommendedNote}
                  />
                  <ResultItem
                    label="우선 가계약금 예시"
                    value={formatManWon(result.depositExample)}
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

          {/* 예시 표 */}
          <div className="mt-10">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">
              계산 예시
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-3 text-left font-medium text-gray-600">
                      예정규모
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-gray-600">
                      예상 평수
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-gray-600">
                      예상 모듈 수
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-gray-600">
                      가계약금 예시
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[2.5, 3, 5].map((b) => {
                    const r = calculate(b);
                    return (
                      <tr key={b} className="border-t border-gray-100">
                        <td className="px-4 py-3 font-medium">{b}억원</td>
                        <td className="px-4 py-3">
                          {r.estimatedArea.toLocaleString()}평
                        </td>
                        <td className="px-4 py-3 text-green-700 font-semibold">
                          {r.estimatedModules.toFixed(1)}모듈(연동)
                        </td>
                        <td className="px-4 py-3">
                          {formatManWon(r.depositExample)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center px-8 py-4 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors"
            >
              입주 희망 신청하기
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
      <span className="text-sm text-gray-500 sm:w-36 shrink-0">{label}</span>
      <span className="text-sm font-medium text-gray-900">{value}</span>
    </div>
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
        className={`text-lg font-bold ${
          highlight ? "text-green-700" : "text-gray-900"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
