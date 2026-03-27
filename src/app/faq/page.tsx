"use client";

import { useState } from "react";
import Link from "next/link";

const faqs = [
  {
    q: "지금 바로 계약금을 내야 하나요?",
    a: "아닙니다. 현재는 입주 희망 신청 단계이며 비용이 발생하지 않습니다.",
  },
  {
    q: "누가 신청할 수 있나요?",
    a: "후계농 확정자를 대상으로 합니다.",
  },
  {
    q: "영농정착자금 활용 예정규모는 어떻게 입력하나요?",
    a: "숫자로 입력하며 단위는 억원입니다. 예: 2.5 / 3 / 5",
  },
  {
    q: "모듈 수는 어떻게 정해지나요?",
    a: "입력하신 영농정착자금 활용 예정규모를 기준으로 자동 계산됩니다. 실제 기준은 W8×L100×H6 연동 1동 242평이며, 화면에는 소수점 1자리까지 표시합니다.",
  },
  {
    q: "왜 250평과 242평이 같이 나오나요?",
    a: "신청 편의를 위해 1모듈을 약 250평으로 설명하고, 실제 계산은 기준 모듈 242평을 바탕으로 안내합니다.",
  },
  {
    q: "프로젝트가 런칭되면 어떻게 되나요?",
    a: "신청자에게 공급안내를 드리고, 희망자에 한해 우선 가계약 절차를 안내합니다.",
  },
  {
    q: "가계약금은 얼마인가요?",
    a: "현재 기준 예시로 총 기준금액의 1%를 안내합니다. 실제 조건은 프로젝트별로 달라질 수 있습니다.",
  },
  {
    q: "가계약을 하면 바로 본계약인가요?",
    a: "아닙니다. 가계약 후 본계약은 별도 절차로 진행됩니다.",
  },
  {
    q: "영농정착자금이 있으면 자동으로 입주가 확정되나요?",
    a: "아닙니다. 프로젝트별 공급 조건 및 별도 절차에 따라 진행됩니다.",
  },
  {
    q: "클러스터에 입주하면 수익이 보장되나요?",
    a: "스마트팜 클러스터는 수익을 보장하는 모델이 아닙니다. 다만 시설, 운영, 유통 지원을 통해 후계농이 보다 나은 조건에서 시작하고 안정적으로 운영할 수 있도록 돕는 환경을 제공합니다.",
  },
];

export default function FAQPage() {
  return (
    <>
      <section className="bg-green-50 py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            자주 묻는 질문
          </h1>
          <p className="mt-3 text-gray-600">
            입주 희망 신청에 관해 자주 묻는 질문을 모았습니다.
          </p>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FAQItem key={i} question={faq.q} answer={faq.a} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              추가 문의가 있으시면 신청 시 상담 희망을 선택해주세요.
            </p>
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

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="font-medium text-gray-900 text-sm md:text-base pr-4">
          Q. {question}
        </span>
        <svg
          className={`w-5 h-5 text-gray-400 shrink-0 transition-transform ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {open && (
        <div className="px-5 pb-4 border-t border-gray-100">
          <p className="text-sm text-gray-600 pt-3 leading-relaxed">
            A. {answer}
          </p>
        </div>
      )}
    </div>
  );
}
