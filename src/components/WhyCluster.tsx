"use client";

import {
  MapPin,
  Warehouse,
  TrendingUp,
  BookOpen,
  Truck,
  Wrench,
  Home,
  Users,
} from "lucide-react";

const problemIconComponents = [
  MapPin, Warehouse, TrendingUp, BookOpen, Truck, Wrench, Home, Users,
];

const problems = [
  {
    problem: "농지 확보가 어렵고, 단독 부지 매입 부담이 큼",
    support:
      "클러스터는 부지 및 온실 인프라 확보 부담을 완화할 수 있는 구조를 지향합니다. 이를 통해 후계농이 토지 매입과 부지 개발의 전 과정을 단독으로 감당해야 하는 부담을 줄이는 데 도움을 줄 수 있습니다.",
  },
  {
    problem: "시설 구축비가 커서 초기 투자 부담이 과중함",
    support:
      "클러스터형 공동 개발과 표준화된 설비 체계는 개별 구축 대비 초기 투자 부담과 시행착오를 줄이는 방향으로 작동할 수 있습니다.",
  },
  {
    problem: "초기 몇 년간 수익과 현금흐름이 불안정함",
    support:
      "생산시설, 운영 지원, 유통 연계가 함께 작동하면 후계농이 재배 외 변수로 인한 불확실성을 줄이는 데 도움을 받을 수 있으며, 보다 안정적으로 사업을 운영할 기반을 마련할 수 있습니다.",
  },
  {
    problem: "재배 외 경영·판로·구매·운영 경험이 부족함",
    support:
      "클러스터는 재배 매뉴얼, 운영 기준, 자재 공동구매, 교육·컨설팅, 판로 연계 등 실질적인 지원을 통해 후계농이 생산자이자 운영 주체로 성장할 수 있도록 돕는 역할을 할 수 있습니다.",
  },
  {
    problem: "유통처 확보가 안 되어 생산해도 판매가 불안함",
    support:
      "공동 판매, 계약재배, B2B 유통 연계와 같은 구조는 개별 후계농의 영업 부담을 낮추고, 판로 설계의 출발점을 제공하는 지원이 될 수 있습니다.",
  },
  {
    problem: "유지보수·기술 문제를 혼자 해결하기 어려움",
    support:
      "설비 대응, 유지보수, 재배 데이터 관리, 운영 지원 조직 등은 후계농이 기술 문제를 혼자 감당해야 하는 부담을 줄이고, 보다 안정적으로 운영할 수 있도록 지원할 수 있습니다.",
  },
  {
    problem: "주거·정착 환경이 부족해 장기 정착이 어려움",
    support:
      "주거, 커뮤니티, 교육, 생활지원 기능이 함께 설계될 경우, 클러스터는 단순한 생산시설이 아니라 정착을 지원하는 생활 기반으로 기능할 수 있습니다.",
  },
  {
    problem: "혼자 시작하는 데 따른 심리적 부담과 실패 리스크가 큼",
    support:
      "클러스터 입주 모델은 완전한 단독 창업보다 지원체계와 커뮤니티 안에서 시작하는 방식에 가깝기 때문에, 초기 부담을 완화하고 상호 협력과 정보 공유의 이점을 기대할 수 있습니다.",
  },
];

// Icons rendered from lucide-react components

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
            스마트팜 클러스터는 이러한 부담을 개별 후계농이 혼자 떠안는 구조가
            아니라, 공동체 기반의 인프라와 지원체계 안에서 완화할 수 있도록 돕는
            플랫폼입니다.
          </p>
          <p className="text-sm text-gray-500 leading-relaxed text-center mt-4">
            클러스터는 후계농이 더 나은 조건에서 영농을 시작할 수 있도록,
            시설·운영·유통을 하나의 구조 안에서 지원하는 환경입니다.
          </p>
        </div>

        {/* Block 1: Comparison Table */}
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
                        {(() => { const Icon = problemIconComponents[i]; return <Icon className="w-4 h-4" />; })()}
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
                      {(() => { const Icon = problemIconComponents[i]; return <Icon className="w-4 h-4" />; })()}
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

        {/* Block 2 */}
        <div className="max-w-3xl mx-auto mb-16">
          <h3 className="text-lg md:text-xl font-bold text-gray-900 text-center mb-6">
            후계농이 혼자 시작하지 않도록
          </h3>
          <p className="text-base text-gray-600 leading-relaxed text-center">
            후계농이 농업에 진입하는 과정은 생각보다 복합적입니다. 농지, 시설,
            자금, 기술, 유통, 생활 정착까지 한 번에 준비해야 하기 때문입니다.
          </p>
          <p className="text-base text-gray-600 leading-relaxed text-center mt-4">
            스마트팜 클러스터는 이러한 과제를 후계농 개인이 모두 단독으로
            감당하는 대신, 공동 인프라와 지원 체계, 그리고 커뮤니티 내 시너지를
            통해 부담을 완화할 수 있도록 돕는 구조를 지향합니다.
          </p>
        </div>

        {/* Block 3: Highlight Box */}
        <div className="max-w-3xl mx-auto mb-16">
          <h3 className="text-lg md:text-xl font-bold text-gray-900 text-center mb-6">
            클러스터는 &lsquo;보장&rsquo;이 아니라 &lsquo;지원&rsquo;입니다
          </h3>
          <div className="bg-green-50 border border-green-200 rounded-2xl p-6 md:p-8">
            <p className="text-base text-gray-700 leading-relaxed text-center">
              스마트팜 클러스터는 후계농의 성과를 보장하는 플랫폼이 아닙니다.
              <br className="hidden md:block" />
              다만 보다 나은 조건에서 시작하고, 더 적은 시행착오로 운영하고,
              <br className="hidden md:block" />
              혼자가 아닌 환경 안에서 성장할 수 있도록 지원하는 역할을 합니다.
            </p>
            <p className="text-sm text-green-800 font-semibold text-center mt-4">
              클러스터의 가치는 독립된 영농 경영체의 성장을 돕는 지원
              플랫폼이라는 데 있습니다.
            </p>
          </div>
        </div>

        {/* Block 4 */}
        <div className="max-w-3xl mx-auto mb-12">
          <h3 className="text-lg md:text-xl font-bold text-gray-900 text-center mb-6">
            함께할 때 더 나은 시작이 가능합니다
          </h3>
          <p className="text-base text-gray-600 leading-relaxed text-center">
            스마트팜 클러스터 안에서는 부지·시설·운영·유통·정착 지원이 유기적으로
            연결될 수 있습니다. 또한 입주자 간 경험 공유, 공동 대응, 정보 교류가
            가능해지며, 이는 개별 후계농이 혼자 시작할 때보다 더 나은 출발
            조건이 될 수 있습니다.
          </p>
        </div>

        {/* Green Highlight Banner */}
        <div className="max-w-3xl mx-auto mb-10">
          <div className="bg-green-600 rounded-2xl p-6 md:p-8 text-center">
            <p className="text-white text-base md:text-lg font-semibold leading-relaxed">
              스마트팜 클러스터는 후계농의 성공을 보장하는 모델이 아니라,
              <br className="hidden md:block" />더 나은 시작과 안정적인 운영을
              지원하는 플랫폼입니다.
            </p>
            <p className="text-green-100 text-sm mt-3 hidden md:block">
              부지, 시설, 운영, 유통, 커뮤니티가 연결된 지원 환경은 후계농의
              초기 부담을 줄이고 정착 가능성을 높이는 기반이 될 수 있습니다.
            </p>
            <p className="text-green-100 text-sm mt-3 md:hidden">
              후계농에게 필요한 것은 &lsquo;혼자 버티는 구조&rsquo;가 아니라,
              함께 시작할 수 있는 지원 체계입니다.
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-gray-400 text-center">
          본 내용은 후계농의 입주 검토를 돕기 위한 안내입니다. 실제 공급 조건,
          일정, 지원 범위는 프로젝트별로 달라질 수 있습니다.
        </p>
      </div>
    </section>
  );
}
