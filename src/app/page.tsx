import Link from "next/link";
import WhyCluster from "@/components/WhyCluster";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-green-50 to-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-block bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full mb-6">
            후계농 확정자 대상
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            스마트팜 클러스터
            <br />
            입주 희망 신청
          </h1>
          <p className="mt-6 text-base md:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
            희망 지역, 작목, 정책자금 활용 예정규모를 등록해두시면
            <br className="hidden md:block" />
            프로젝트 런칭 시 우선 공급안내를 드립니다.
            <br />
            희망자에 한해 우선 가계약이 진행됩니다.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center px-8 py-4 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors text-base"
            >
              입주 희망 신청하기
            </Link>
            <Link
              href="/process"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-green-700 font-semibold rounded-xl border-2 border-green-200 hover:border-green-300 hover:bg-green-50 transition-colors text-base"
            >
              가계약 방식 보기
            </Link>
          </div>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <SummaryCard
              title="기준 단가"
              value="평당 100만원"
              desc="신청 편의를 위한 기준값입니다"
            />
            <SummaryCard
              title="1모듈 기준"
              value="약 250평"
              desc="실제 기준 모듈: W8×L100×H6 연동 1동 = 242평"
            />
            <SummaryCard
              title="가계약금 예시"
              value="총 기준금액의 1%"
              desc="프로젝트 런칭 후 별도 안내"
            />
          </div>
          <p className="text-xs text-gray-400 text-center mt-6">
            본 금액과 면적은 신청 편의를 위한 기준값이며, 실제 공급 조건과
            일정은 프로젝트별로 달라질 수 있습니다.
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
              title="입주 희망 신청"
              items={["무료 · 비구속", "후계농 확정자 대상", "결제 없음"]}
              highlight
            />
            <StepCard
              step="2"
              title="공급안내"
              items={[
                "프로젝트 런칭 시",
                "위치 · 일정 · 작목 안내",
                "신청자 우선 안내",
              ]}
            />
            <StepCard
              step="3"
              title="우선 가계약"
              items={[
                "희망자 대상",
                "선택 규모 기준 1%",
                "가계약자 우선 검토",
              ]}
            />
            <StepCard
              step="4"
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
            className="inline-flex items-center justify-center px-10 py-4 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors text-base"
          >
            입주 희망 신청하기
          </Link>
        </div>
      </section>
    </>
  );
}

function SummaryCard({
  title,
  value,
  desc,
}: {
  title: string;
  value: string;
  desc: string;
}) {
  return (
    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
      <p className="text-sm text-gray-500 mb-1">{title}</p>
      <p className="text-xl font-bold text-green-700">{value}</p>
      <p className="text-xs text-gray-400 mt-2">{desc}</p>
    </div>
  );
}

function StepCard({
  step,
  title,
  items,
  highlight,
}: {
  step: string;
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
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mb-3 ${
          highlight
            ? "bg-green-600 text-white"
            : "bg-gray-200 text-gray-600"
        }`}
      >
        {step}
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
