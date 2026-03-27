import Link from "next/link";

export default function GuidePage() {
  return (
    <>
      {/* Page Header */}
      <section className="bg-green-50 py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            신청 대상 및 신청 방법
          </h1>
          <p className="mt-3 text-gray-600">
            후계농 확정자 대상 스마트팜 클러스터 입주 희망 신청 방법입니다.
          </p>
        </div>
      </section>

      {/* 신청 대상 */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-xl font-bold text-gray-900 mb-6">신청 대상</h2>
          <div className="space-y-4">
            <TargetCard
              title="후계농 확정자"
              desc="후계농업경영인으로 확정된 분"
            />
            <TargetCard
              title="스마트팜 클러스터 입주 희망자"
              desc="스마트팜 시설 기반 영농을 계획하시는 분"
            />
            <TargetCard
              title="정책자금 활용 예정자"
              desc="정책자금을 활용해 시설 구축을 검토하시는 분"
            />
          </div>
        </div>
      </section>

      {/* 신청 방법 */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-xl font-bold text-gray-900 mb-8">신청 방법</h2>
          <div className="space-y-6">
            <StepItem
              num="1"
              title="희망 지역 선택"
              desc="입주를 희망하는 지역을 선택합니다."
            />
            <StepItem
              num="2"
              title="희망 작목 선택"
              desc="재배를 희망하는 작목을 선택합니다."
            />
            <StepItem
              num="3"
              title="정책자금 활용 예정규모 입력"
              desc="활용 예정인 정책자금 규모를 억원 단위로 입력합니다."
            />
            <StepItem
              num="4"
              title="자동 계산 결과 확인"
              desc="예상 평수, 예상 모듈 수, 가계약금 예시가 자동으로 계산됩니다."
            />
            <StepItem
              num="5"
              title="연락처 제출"
              desc="이름, 연락처 등 기본 정보를 입력하고 신청을 제출합니다."
            />
            <StepItem
              num="6"
              title="프로젝트 런칭 시 공급안내 수신"
              desc="프로젝트가 런칭되면 신청자에게 우선적으로 공급안내를 드립니다."
            />
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

function TargetCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="flex items-start gap-4 bg-gray-50 rounded-xl p-5 border border-gray-100">
      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 shrink-0" />
      <div>
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600 mt-1">{desc}</p>
      </div>
    </div>
  );
}

function StepItem({
  num,
  title,
  desc,
}: {
  num: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">
        {num}
      </div>
      <div>
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600 mt-1">{desc}</p>
      </div>
    </div>
  );
}
