import Link from "next/link";

export default function ProcessPage() {
  return (
    <>
      <section className="bg-green-50 py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            프로젝트 런칭 후 우선 가계약은
            <br className="md:hidden" /> 어떻게 진행되나요?
          </h1>
          <p className="mt-3 text-gray-600">
            입주 희망 신청 후 진행되는 절차를 안내합니다.
          </p>
        </div>
      </section>

      {/* 절차 타임라인 */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="space-y-0">
            <TimelineStep
              num="1"
              title="입주 희망 신청 접수"
              desc="희망 지역, 작목, 영농정착자금 활용 예정규모를 등록합니다."
              note="무료 신청"
              active
            />
            <TimelineStep
              num="2"
              title="프로젝트 런칭 시 공급안내"
              desc="프로젝트가 런칭되면 신청자에게 위치, 일정, 작목 구성, 예상 공급 조건을 안내합니다."
              note="신청자 대상 우선 안내"
            />
            <TimelineStep
              num="3"
              title="희망자 대상 우선 가계약 안내"
              desc="공급안내 후 입주를 희망하시는 분께 가계약 절차를 안내합니다. 선택하신 규모 기준 총 기준금액의 1%를 가계약금으로 안내합니다."
              note="예: 3억원 기준 → 가계약금 예시 300만원"
            />
            <TimelineStep
              num="4"
              title="가계약 완료자 우선 검토"
              desc="가계약을 완료하신 분은 프로젝트 내 배치 및 구성에서 우선 검토됩니다."
              note=""
            />
            <TimelineStep
              num="5"
              title="본계약 별도 진행"
              desc="가계약 후 본계약은 별도 절차로 진행되며, 상세 조건은 개별 안내됩니다."
              note=""
              last
            />
          </div>
        </div>
      </section>

      {/* 참고 사항 */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-lg font-bold text-gray-900 mb-6">참고 사항</h2>
          <div className="space-y-4">
            <NoteCard text="입력하신 영농정착자금 활용 예정규모를 기준으로 예상 면적과 가계약금 예시가 안내됩니다." />
            <NoteCard text="예상 모듈 수는 W8×L100×H6 연동 1동, 242평 기준으로 계산됩니다." />
            <NoteCard text="프로젝트 런칭 후 실제 공급 조건이 확정되면 별도 공급안내가 진행됩니다." />
            <NoteCard text="희망자에 한해 우선 가계약 절차가 안내됩니다." />
            <NoteCard text="1단계 신청 시에는 비용이 발생하지 않습니다." />
          </div>

          <div className="mt-8 bg-yellow-50 border border-yellow-100 rounded-xl p-5">
            <p className="text-sm text-yellow-800 leading-relaxed">
              가계약 조건, 일정, 금액, 환불 및 해제 조건은 프로젝트 런칭 후
              별도 안내될 수 있습니다.
            </p>
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

function TimelineStep({
  num,
  title,
  desc,
  note,
  active,
  last,
}: {
  num: string;
  title: string;
  desc: string;
  note: string;
  active?: boolean;
  last?: boolean;
}) {
  return (
    <div className="flex gap-4">
      {/* 타임라인 라인 */}
      <div className="flex flex-col items-center">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
            active
              ? "bg-green-600 text-white"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          {num}
        </div>
        {!last && <div className="w-0.5 bg-gray-200 flex-1 min-h-8" />}
      </div>

      {/* 내용 */}
      <div className={`pb-8 ${last ? "" : ""}`}>
        <h3 className="font-semibold text-gray-900 text-base">{title}</h3>
        <p className="text-sm text-gray-600 mt-1">{desc}</p>
        {note && (
          <span className="inline-block mt-2 text-xs bg-green-50 text-green-700 px-3 py-1 rounded-full">
            {note}
          </span>
        )}
      </div>
    </div>
  );
}

function NoteCard({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3 bg-white rounded-xl p-4 border border-gray-100">
      <svg
        className="w-5 h-5 text-green-500 mt-0.5 shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 13l4 4L19 7"
        />
      </svg>
      <p className="text-sm text-gray-700">{text}</p>
    </div>
  );
}
