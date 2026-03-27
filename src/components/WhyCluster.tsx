"use client";

import { MapPin, Warehouse, Truck, Users } from "lucide-react";

const problemIconComponents = [MapPin, Warehouse, Truck, Users];

const problems = [
  {
    problem: "농지 확보가 어렵고, 단독 부지 매입 부담이 큼",
    support:
      "클러스터는 부지 및 온실 인프라를 공동 개발하여 개별 매입 부담을 줄입니다.",
  },
  {
    problem: "시설 구축비가 커서 초기 투자 부담이 과중함",
    support:
      "표준화된 설비 체계와 공동 개발 구조로 초기 투자 부담과 시행착오를 줄입니다.",
  },
  {
    problem: "유통처 확보가 안 되어 생산해도 판매가 불안함",
    support:
      "공동 판매, 계약재배, B2B 유통 연계를 통해 판로 확보의 출발점을 제공합니다.",
  },
  {
    problem: "혼자 시작하는 데 따른 심리적 부담과 실패 리스크가 큼",
    support:
      "지원체계와 커뮤니티 안에서 시작하여 초기 부담을 완화하고 상호 협력이 가능합니다.",
  },
];

export default function WhyCluster() {
  return (
    <section id="why-cluster" className="py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Label */}
        <div className="text-center mb-6">
          <span className="inline-block bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">
            후계농 지원 구조
          </span>
        </div>

        {/* Section Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-6">
          왜 후계농에게 스마트팜 클러스터가 필요한가
        </h2>

        {/* Lead Copy */}
        <div className="max-w-3xl mx-auto mb-16">
          <p className="text-base text-gray-600 leading-relaxed text-center">
            후계농의 가장 큰 어려움은 단순히 작물을 재배하는 기술만의 문제가
            아닙니다. 농지 확보, 시설 구축, 운영관리, 판로 개척, 생활 정착까지
            여러 과제를 동시에 감당해야 하기 때문에, 초기 진입과 안정적 정착의
            부담이 매우 큽니다.
          </p>
          <p className="text-base text-gray-600 leading-relaxed text-center mt-4">
            클러스터는 개별 후계농이 혼자 감당해야 할 부담을 공동 인프라와
            지원체계로 완화하는 구조입니다.
          </p>
          <p className="text-sm text-gray-500 leading-relaxed text-center mt-4">
            클러스터는 후계농이 더 나은 조건에서 영농을 시작할 수 있도록,
            시설·운영·유통을 하나의 구조 안에서 지원하는 환경입니다.
          </p>
        </div>

        {/* Block 1: Comparison Table - 4 items */}
        <div className="mb-16">
          <h3 className="text-lg md:text-xl font-bold text-gray-900 text-center mb-8">
            후계농의 문제와 스마트팜 클러스터의 지원 방향
          </h3>

          {/* Desktop: 2-column layout */}
          <div className="hidden md:block">
            <div className="grid grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-gray-200">
              {/* Header Row */}
              <div className="bg-gray-100 px-6 py-3 border-b border-gray-200">
                <p className="text-sm font-semibold text-gray-700">
                  후계농이 겪는 문제
                </p>
              </div>
              <div className="bg-green-50 px-6 py-3 border-b border-gray-200">
                <p className="text-sm font-semibold text-green-800">
                  클러스터의 지원 방향
                </p>
              </div>

              {/* Data Rows */}
              {problems.map((item, i) => (
                <div key={i} className="contents">
                  <div
                    className={`px-6 py-5 border-b border-gray-100 ${
                      i % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                    }`}
                  >
                    <div className="flex gap-3 items-start">
                      <span className="flex-shrink-0 mt-0.5 text-green-600">
                        {(() => {
                          const Icon = problemIconComponents[i];
                          return <Icon className="w-4 h-4" />;
                        })()}
                      </span>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {item.problem}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`px-6 py-5 border-b border-gray-100 ${
                      i % 2 === 0 ? "bg-green-50/30" : "bg-green-50/50"
                    }`}
                  >
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {item.support}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile: Stacked cards */}
          <div className="md:hidden space-y-4">
            {problems.map((item, i) => (
              <div
                key={i}
                className="rounded-xl border border-gray-200 overflow-hidden"
              >
                <div className="bg-gray-50 px-4 py-3">
                  <div className="flex gap-2 items-start">
                    <span className="flex-shrink-0 text-green-600 mt-0.5">
                      {(() => {
                        const Icon = problemIconComponents[i];
                        return <Icon className="w-4 h-4" />;
                      })()}
                    </span>
                    <div>
                      <p className="text-xs text-gray-400 mb-0.5">문제</p>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {item.problem}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-green-50/50 px-4 py-3 border-t border-gray-100">
                  <p className="text-xs text-green-700 mb-0.5">지원 방향</p>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {item.support}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Closing Statement */}
        <div className="max-w-3xl mx-auto mb-10">
          <div className="bg-green-600 rounded-2xl p-6 md:p-8 text-center">
            <p className="text-white text-base md:text-lg font-semibold leading-relaxed">
              후계농에게 필요한 것은 혼자 버티는 구조가 아니라,
              <br className="hidden md:block" />
              함께 시작할 수 있는 지원 체계입니다.
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-gray-400 text-center">
          본 내용은 입주 검토를 돕기 위한 안내이며, 실제 지원 범위와 조건은
          프로젝트별로 달라질 수 있습니다.
        </p>
      </div>
    </section>
  );
}
