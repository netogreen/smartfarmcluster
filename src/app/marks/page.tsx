"use client";

function downloadSvg(id: string, filename: string) {
  const svg = document.getElementById(id);
  if (!svg) return;
  const data = new XMLSerializer().serializeToString(svg);
  const blob = new Blob([data], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export default function MarksPage() {
  return (
    <section className="py-12 bg-white min-h-screen">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">서비스 마크 시안</h1>
        <p className="text-sm text-gray-500 mb-10">각 시안을 클릭하면 SVG 파일로 다운로드됩니다.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* Option A: 현재 적용 중 - 3연동 온실 + 모듈그리드 + leaf */}
          <MarkCard
            title="A. 3연동 온실 + 모듈그리드"
            desc="현재 적용 중. 연동 온실 3동 지붕 + 하부 모듈 그리드 + leaf 포인트"
            id="mark-a"
            filename="mark-a-greenhouse-grid.svg"
            current
          >
            <svg id="mark-a" width="120" height="120" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 28L12 16L20 28" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="#dcfce7"/>
              <path d="M16 28L24 16L32 28" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="#dcfce7"/>
              <path d="M28 28L36 16L44 28" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="#dcfce7"/>
              <line x1="3" y1="28" x2="45" y2="28" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round"/>
              <rect x="8" y="30" width="7" height="5" rx="1" fill="#bbf7d0" stroke="#16a34a" strokeWidth="1.5"/>
              <rect x="17" y="30" width="7" height="5" rx="1" fill="#bbf7d0" stroke="#16a34a" strokeWidth="1.5"/>
              <rect x="26" y="30" width="7" height="5" rx="1" fill="#bbf7d0" stroke="#16a34a" strokeWidth="1.5"/>
              <rect x="35" y="30" width="7" height="5" rx="1" fill="#bbf7d0" stroke="#16a34a" strokeWidth="1.5"/>
              <rect x="8" y="37" width="7" height="5" rx="1" fill="#bbf7d0" stroke="#16a34a" strokeWidth="1.5"/>
              <rect x="17" y="37" width="7" height="5" rx="1" fill="#bbf7d0" stroke="#16a34a" strokeWidth="1.5"/>
              <rect x="26" y="37" width="7" height="5" rx="1" fill="#bbf7d0" stroke="#16a34a" strokeWidth="1.5"/>
              <rect x="35" y="37" width="7" height="5" rx="1" fill="#bbf7d0" stroke="#16a34a" strokeWidth="1.5"/>
              <path d="M37 12C37 6 43 4 43 4C43 4 45 10 41 14C39 16 37 12 37 12Z" fill="#16a34a"/>
              <path d="M43 4C40 8 38 11 37 12" stroke="#dcfce7" strokeWidth="0.8" strokeLinecap="round"/>
              <path d="M40 7L39 9" stroke="#dcfce7" strokeWidth="0.5" strokeLinecap="round"/>
              <path d="M42 7L40.5 10" stroke="#dcfce7" strokeWidth="0.5" strokeLinecap="round"/>
            </svg>
          </MarkCard>

          {/* Option B: 미니멀 온실 아치 + 새싹 */}
          <MarkCard
            title="B. 아치형 온실 + 새싹"
            desc="둥근 아치형 온실 실루엣 안에 새싹이 자라는 형태. 심플하고 부드러운 인상."
            id="mark-b"
            filename="mark-b-arch-sprout.svg"
          >
            <svg id="mark-b" width="120" height="120" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 38V24C8 14.06 15.16 6 24 6C32.84 6 40 14.06 40 24V38" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" fill="#f0fdf4"/>
              <line x1="8" y1="38" x2="40" y2="38" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round"/>
              <line x1="24" y1="38" x2="24" y2="26" stroke="#16a34a" strokeWidth="2" strokeLinecap="round"/>
              <path d="M24 26C24 26 18 22 18 18C18 14 24 16 24 16" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" fill="#bbf7d0"/>
              <path d="M24 26C24 26 30 22 30 18C30 14 24 16 24 16" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" fill="#bbf7d0"/>
              <line x1="16" y1="38" x2="16" y2="28" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" opacity="0.3"/>
              <line x1="32" y1="38" x2="32" y2="28" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" opacity="0.3"/>
            </svg>
          </MarkCard>

          {/* Option C: 원형 뱃지 + 온실 라인 */}
          <MarkCard
            title="C. 원형 뱃지 + 온실"
            desc="원형 테두리 안에 온실 지붕 2동 + 하단 SF 텍스트. 뱃지/스탬프 느낌."
            id="mark-c"
            filename="mark-c-circle-badge.svg"
          >
            <svg id="mark-c" width="120" height="120" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="24" cy="24" r="22" stroke="#16a34a" strokeWidth="2" fill="#f0fdf4"/>
              <path d="M10 28L18 18L26 28" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="#dcfce7"/>
              <path d="M22 28L30 18L38 28" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="#dcfce7"/>
              <line x1="9" y1="28" x2="39" y2="28" stroke="#16a34a" strokeWidth="2" strokeLinecap="round"/>
              <rect x="13" y="30" width="5" height="3.5" rx="0.5" fill="#bbf7d0" stroke="#16a34a" strokeWidth="1"/>
              <rect x="21" y="30" width="5" height="3.5" rx="0.5" fill="#bbf7d0" stroke="#16a34a" strokeWidth="1"/>
              <rect x="29" y="30" width="5" height="3.5" rx="0.5" fill="#bbf7d0" stroke="#16a34a" strokeWidth="1"/>
              <text x="24" y="42" textAnchor="middle" fill="#16a34a" fontSize="6" fontWeight="700" fontFamily="sans-serif">CLUSTER</text>
            </svg>
          </MarkCard>

          {/* Option D: 모듈 4칸 그리드 + leaf */}
          <MarkCard
            title="D. 모듈 그리드 + leaf"
            desc="2x2 모듈 그리드가 핵심. 우상단에 leaf 포인트. 클러스터의 모듈 구조를 강조."
            id="mark-d"
            filename="mark-d-grid-leaf.svg"
          >
            <svg id="mark-d" width="120" height="120" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="6" y="14" width="16" height="12" rx="2" fill="#dcfce7" stroke="#16a34a" strokeWidth="2"/>
              <rect x="6" y="28" width="16" height="12" rx="2" fill="#bbf7d0" stroke="#16a34a" strokeWidth="2"/>
              <rect x="24" y="14" width="16" height="12" rx="2" fill="#bbf7d0" stroke="#16a34a" strokeWidth="2"/>
              <rect x="24" y="28" width="16" height="12" rx="2" fill="#dcfce7" stroke="#16a34a" strokeWidth="2"/>
              <path d="M33 10C33 4 39 2 39 2C39 2 41 8 37 12C35 14 33 10 33 10Z" fill="#16a34a"/>
              <path d="M39 2C36 6 34 9 33 10" stroke="#f0fdf4" strokeWidth="0.8" strokeLinecap="round"/>
              <path d="M36 5L35 7" stroke="#f0fdf4" strokeWidth="0.5" strokeLinecap="round"/>
              <path d="M38 5L36.5 8" stroke="#f0fdf4" strokeWidth="0.5" strokeLinecap="round"/>
              <circle cx="14" cy="20" r="1.5" fill="#16a34a" opacity="0.3"/>
              <circle cx="14" cy="34" r="1.5" fill="#16a34a" opacity="0.3"/>
              <circle cx="32" cy="20" r="1.5" fill="#16a34a" opacity="0.3"/>
              <circle cx="32" cy="34" r="1.5" fill="#16a34a" opacity="0.3"/>
            </svg>
          </MarkCard>

          {/* Option E: 연동 온실 정면 + 문 */}
          <MarkCard
            title="E. 온실 정면뷰"
            desc="정면에서 본 연동 온실. 아치형 지붕 + 입구. 시설 입주의 직관적 이미지."
            id="mark-e"
            filename="mark-e-front-view.svg"
          >
            <svg id="mark-e" width="120" height="120" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 36V18C4 18 4 10 14 10" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" fill="none"/>
              <path d="M14 10C14 10 24 6 34 10" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" fill="#dcfce7"/>
              <path d="M34 10C44 10 44 18 44 18V36" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" fill="none"/>
              <path d="M4 18C4 18 14 14 24 14C34 14 44 18 44 18" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
              <line x1="4" y1="36" x2="44" y2="36" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round"/>
              <rect x="18" y="24" width="12" height="12" rx="1" fill="#bbf7d0" stroke="#16a34a" strokeWidth="1.5"/>
              <line x1="24" y1="24" x2="24" y2="36" stroke="#16a34a" strokeWidth="1" opacity="0.5"/>
              <path d="M22 10C22 5 27 3 27 3C27 3 29 8 26 11C24.5 13 22 10 22 10Z" fill="#16a34a" opacity="0.8"/>
              <path d="M27 3C25 6 23 9 22 10" stroke="#dcfce7" strokeWidth="0.6" strokeLinecap="round"/>
              <line x1="14" y1="36" x2="14" y2="18" stroke="#16a34a" strokeWidth="1" opacity="0.2"/>
              <line x1="34" y1="36" x2="34" y2="18" stroke="#16a34a" strokeWidth="1" opacity="0.2"/>
            </svg>
          </MarkCard>

          {/* Option F: 육각형 + 새싹 + 모듈라인 */}
          <MarkCard
            title="F. 육각형 프레임 + 새싹"
            desc="육각형 안에 새싹과 수평 모듈 라인. 체계적/구조화된 느낌. 테크 기업형."
            id="mark-f"
            filename="mark-f-hex-sprout.svg"
          >
            <svg id="mark-f" width="120" height="120" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 4L42 14V34L24 44L6 34V14L24 4Z" stroke="#16a34a" strokeWidth="2" fill="#f0fdf4"/>
              <line x1="24" y1="38" x2="24" y2="22" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round"/>
              <path d="M24 22C20 19 17 14 19 12C21 10 24 14 24 14" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" fill="#bbf7d0"/>
              <path d="M24 22C28 19 31 14 29 12C27 10 24 14 24 14" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" fill="#bbf7d0"/>
              <line x1="12" y1="32" x2="36" y2="32" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" opacity="0.3"/>
              <line x1="14" y1="36" x2="34" y2="36" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" opacity="0.3"/>
            </svg>
          </MarkCard>

        </div>
      </div>
    </section>
  );
}

function MarkCard({
  title,
  desc,
  id,
  filename,
  current,
  children,
}: {
  title: string;
  desc: string;
  id: string;
  filename: string;
  current?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={`rounded-2xl border p-6 text-center ${current ? "border-green-500 bg-green-50/50" : "border-gray-200 bg-white"}`}>
      {current && (
        <span className="inline-block bg-green-600 text-white text-[10px] font-medium px-2 py-0.5 rounded-full mb-3">
          현재 적용 중
        </span>
      )}
      <div className="flex justify-center mb-4">
        {children}
      </div>
      <h3 className="text-sm font-bold text-gray-900 mb-1">{title}</h3>
      <p className="text-xs text-gray-500 mb-4 leading-relaxed">{desc}</p>
      <button
        onClick={() => downloadSvg(id, filename)}
        className="inline-flex items-center gap-1 px-4 py-2 bg-green-600 text-white text-xs font-medium rounded-lg hover:bg-green-700 transition-colors"
      >
        SVG 다운로드
      </button>
    </div>
  );
}
