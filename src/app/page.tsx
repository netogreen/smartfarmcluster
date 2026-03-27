import Link from "next/link";
import WhyCluster from "@/components/WhyCluster";
import ServiceMark from "@/components/ServiceMark";
import {
  Warehouse,
  Leaf,
  ClipboardCheck,
  Send,
  FileCheck,
  FileSignature,
  Sprout,
  LayoutGrid,
} from "lucide-react";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-green-50 to-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <ServiceMark size={48} />
          </div>
          <div className="inline-block bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full mb-6">
            후계농 확정자 대상
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            스마트팜 클러스터
            <br />
            입주 희망 신청
          </h1>
          <p className="mt-6 text-base md:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
            희망 지역, 작목, 영농정착자금 활용 예정규모를 등록해두시면
            <br className="hidden md:block" />
            프로젝트 런칭 시 우선 공급안내를 드립니다.
            <br />
            희망자에 한해 우선 가계약이 진행됩니다.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors text-base"
            >
              <ClipboardCheck className="w-5 h-5" />
              입주 희망 신청하기
            </Link>
            <Link
              href="/process"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-green-700 font-semibold rounded-xl border-2 border-green-200 hover:border-green-300 hover:bg-green-50 transition-colors text-base"
            >
              <FileCheck className="w-5 h-5" />
              가계약 방식 보기
            </Link>
          </div>
        </div>
      </section>

      {/* Cluster Layout Image */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-6">
            <span className="inline-block bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full mb-3">
              클러스터 구성 예시
            </span>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">
              10,000평 기준 작물별 배치 예시
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              5개 작목, 44모듈 규모의 스마트팜 클러스터 구성 예시입니다
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
            <img
              src="/cluster-layout.png"
              alt="스마트팜 클러스터 10,000평 기준 작물별 배치 예시 - 파프리카 13모듈, 딸기 8모듈, 방울토마토 7모듈, 오이 6모듈, 샐러드 10모듈"
              className="w-full h-auto"
            />
          </div>
          <p className="text-xs text-gray-400 text-center mt-4">
            위 배치도는 10,000평 기준 참고 예시입니다. 실제 배치와 공급 조건은 프로젝트별로 달라질 수 있습니다.
          </p>
        </div>
      </section>

      {/* Why Cluster Section */}
      <WhyCluster />

      {/* Summary Cards */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-xl font-bold text-gray-900 text-center mb-8">
            핵심 안내
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <SummaryCard
              icon={<Warehouse className="w-5 h-5 text-green-600" />}
              title="과채 모듈 단가"
              value="1모듈 2.4억원"
              desc="W8×L100×H6 연동 1동 = 242평 (토지+시설온실 포함)"
            />
            <SummaryCard
              icon={<Sprout className="w-5 h-5 text-green-600" />}
              title="샐러드 모듈 단가"
              value="1모듈 4.0억원"
              desc="수직농장 30평 6단 2Unit 배치, 실 재배평수 360평 (토지+시설온실 포함)"
            />
            <SummaryCard
              icon={<Leaf className="w-5 h-5 text-green-600" />}
              title="대상 작물"
              value="5개 작목 + 기타"
              desc="샐러드 · 딸기 · 파프리카 · 방울토마토 · 오이 · 기타"
            />
            <SummaryCard
              icon={<FileSignature className="w-5 h-5 text-green-600" />}
              title="가계약금 예시"
              value="총 기준금액의 1%"
              desc="프로젝트 런칭 후 별도 안내"
            />
          </div>
          <p className="text-xs text-gray-400 text-center mt-6">
            위 단가는 작물별 모듈 기준이며, 실제 공급 조건과 일정은
            프로젝트별로 달라질 수 있습니다.
          </p>
        </div>
      </section>

      {/* Process Flow */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-xl font-bold text-gray-900 text-center mb-10">
            진행 절차
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StepCard
              step="1"
              icon={<ClipboardCheck className="w-5 h-5" />}
              title="입주 희망 신청"
              items={["무료 신청", "후계농 확정자 대상", "결제 없음"]}
              highlight
            />
            <StepCard
              step="2"
              icon={<Send className="w-5 h-5" />}
              title="공급안내"
              items={[
                "프로젝트 런칭 시",
                "위치 · 일정 · 작목 안내",
                "신청자 우선 안내",
              ]}
            />
            <StepCard
              step="3"
              icon={<FileSignature className="w-5 h-5" />}
              title="우선 가계약"
              items={[
                "희망자 대상",
                "선택 규모 기준 1%",
                "가계약자 우선 검토",
              ]}
            />
            <StepCard
              step="4"
              icon={<FileCheck className="w-5 h-5" />}
              title="본계약"
              items={["별도 안내", "개별 절차 진행"]}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            지금 입주 희망을 등록하세요
          </h2>
          <p className="text-gray-600 mb-8">
            현재는 입주 희망 신청 단계이며 비용이 발생하지 않습니다.
            <br />
            프로젝트 런칭 시 신청자에게 우선 공급안내를 드립니다.
          </p>
          <Link
            href="/apply"
            className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors text-base"
          >
            <ClipboardCheck className="w-5 h-5" />
            입주 희망 신청하기
          </Link>
        </div>
      </section>
    </>
  );
}

function SummaryCard({
  icon,
  title,
  value,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  desc: string;
}) {
  return (
    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <p className="text-sm text-gray-500">{title}</p>
      </div>
      <p className="text-xl font-bold text-green-700">{value}</p>
      <p className="text-xs text-gray-400 mt-2">{desc}</p>
    </div>
  );
}

function StepCard({
  step,
  icon,
  title,
  items,
  highlight,
}: {
  step: string;
  icon: React.ReactNode;
  title: string;
  items: string[];
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl p-5 border ${
        highlight
          ? "bg-green-50 border-green-200"
          : "bg-white border-gray-100"
      }`}
    >
      <div className="flex items-center gap-2 mb-3">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
            highlight
              ? "bg-green-600 text-white"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          {step}
        </div>
        <div className={highlight ? "text-green-600" : "text-gray-400"}>
          {icon}
        </div>
      </div>
      <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
      <ul className="space-y-1">
        {items.map((item, i) => (
          <li key={i} className="text-sm text-gray-600">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
