"use client";

import { useState, useEffect, useCallback } from "react";
import type { Application } from "@/lib/db";

const STATUS_OPTIONS = [
  "신규",
  "확인 완료",
  "공급안내 발송",
  "가계약 안내",
  "가계약 완료",
  "개별 시공 검토",
  "개별 시공 진행",
  "보류",
];

const CUSTOMER_TYPES = [
  "클러스터 입주 희망",
  "개별 시공 검토",
  "클러스터 + 개별 시공 모두 검토",
];

const LAND_STATUS_OPTIONS = ["없음", "보유", "알아보는 중"];

const ADMIN_KEY = "cluster2026";

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [apps, setApps] = useState<Application[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState({ region: "", crop: "", status: "" });
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [detailApp, setDetailApp] = useState<Application | null>(null);

  const fetchApps = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/applications?key=${ADMIN_KEY}`);
      if (res.ok) {
        const data = await res.json();
        setApps(data);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (loggedIn) fetchApps();
  }, [loggedIn, fetchApps]);

  async function updateField(id: string, fields: Record<string, string>) {
    await fetch(`/api/applications?key=${ADMIN_KEY}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...fields }),
    });
    fetchApps();
    // 상세 패널도 업데이트
    if (detailApp && detailApp.id === id) {
      setDetailApp((prev) => prev ? { ...prev, ...fields } : null);
    }
  }

  async function deleteApp(id: string, name: string) {
    if (!confirm(`"${name}" 신청을 삭제하시겠습니까?`)) return;
    const res = await fetch(`/api/applications?key=${ADMIN_KEY}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (!res.ok) alert("삭제에 실패했습니다. Supabase RLS 정책을 확인해주세요.");
    setSelected((prev) => { const next = new Set(prev); next.delete(id); return next; });
    if (detailApp?.id === id) setDetailApp(null);
    fetchApps();
  }

  async function deleteSelected() {
    if (selected.size === 0) return;
    if (!confirm(`선택된 ${selected.size}건을 삭제하시겠습니까?`)) return;
    const res = await fetch(`/api/applications?key=${ADMIN_KEY}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: Array.from(selected) }),
    });
    if (!res.ok) alert("삭제에 실패했습니다. Supabase RLS 정책을 확인해주세요.");
    setSelected(new Set());
    setDetailApp(null);
    fetchApps();
  }

  function toggleSelect(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }

  function toggleSelectAll() {
    if (selected.size === filteredApps.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(filteredApps.map((a) => a.id)));
    }
  }

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (password === ADMIN_KEY) {
      setLoggedIn(true);
    } else {
      alert("비밀번호가 틀렸습니다.");
    }
  }

  function downloadCSV() {
    const headers = [
      "ID", "이름", "연락처", "이메일", "후계농확정", "지역", "작목",
      "예정규모(억원)", "예상평수", "예상모듈수", "권장기준", "가계약금예시(만원)",
      "희망시기", "상담희망", "상태", "고객유형", "토지보유", "토지정보", "상담메모", "등록일시",
    ];
    const rows = filteredApps.map((a) => [
      a.id, a.name, a.phone, a.email || "", a.is_successor_farmer,
      a.region, a.crop, a.budget_eok, a.estimated_area, a.estimated_modules,
      a.recommended_note, a.deposit_example, a.timing,
      a.wants_consultation ? "예" : "아니오", a.status,
      a.customer_type || "", a.land_status || "", a.land_info || "", a.memo || "",
      a.created_at,
    ]);

    const bom = "\uFEFF";
    const csv = bom + [headers.join(","), ...rows.map((r) => r.map((v) => `"${v}"`).join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `신청자_목록_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const filteredApps = apps.filter((a) => {
    if (filter.region && a.region !== filter.region) return false;
    if (filter.crop && a.crop !== filter.crop) return false;
    if (filter.status && a.status !== filter.status) return false;
    return true;
  });

  const stats = {
    total: apps.length,
    byRegion: groupBy(apps, "region"),
    byCrop: groupBy(apps, "crop"),
    byStatus: groupBy(apps, "status"),
    byCustomerType: groupBy(apps, "customer_type"),
    consultationCount: apps.filter((a) => a.wants_consultation).length,
    landOwners: apps.filter((a) => a.land_status === "보유").length,
    totalArea: apps.reduce((s, a) => s + a.estimated_area, 0),
    totalModules: apps.reduce((s, a) => s + a.estimated_modules, 0),
    budgetRanges: getBudgetRanges(apps),
  };

  if (!loggedIn) {
    return (
      <section className="min-h-[70vh] flex items-center justify-center bg-gray-50">
        <form onSubmit={handleLogin} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 w-full max-w-sm">
          <h1 className="text-xl font-bold text-gray-900 mb-6 text-center">관리자 로그인</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button type="submit" className="w-full py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700">
            로그인
          </button>
        </form>
      </section>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">관리자 대시보드</h1>
          <button onClick={downloadCSV} className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
            CSV 다운로드
          </button>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <StatCard label="총 신청자" value={`${stats.total}명`} />
          <StatCard label="상담 희망자" value={`${stats.consultationCount}명`} />
          <StatCard label="토지 보유" value={`${stats.landOwners}명`} />
          <StatCard label="총 예상 평수" value={`${stats.totalArea.toLocaleString()}평`} />
          <StatCard label="총 예상 모듈" value={`${stats.totalModules.toFixed(1)}모듈`} />
          <StatCard label="개별시공 검토" value={`${(stats.byCustomerType["개별 시공 검토"] || 0) + (stats.byCustomerType["클러스터 + 개별 시공 모두 검토"] || 0)}명`} />
        </div>

        {/* 분류 통계 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <GroupCard title="지역별" data={stats.byRegion} />
          <GroupCard title="작목별" data={stats.byCrop} />
          <GroupCard title="상태별" data={stats.byStatus} />
          <GroupCard title="고객유형별" data={stats.byCustomerType} />
        </div>

        {/* 예산 구간 */}
        <div className="bg-white rounded-xl p-5 border border-gray-200 mb-8">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">예산 구간별</h3>
          <div className="flex flex-wrap gap-3">
            {stats.budgetRanges.map((r) => (
              <span key={r.label} className="text-sm bg-gray-50 px-3 py-1.5 rounded-lg">
                {r.label}: <strong>{r.count}명</strong>
              </span>
            ))}
          </div>
        </div>

        {/* 필터 */}
        <div className="bg-white rounded-xl p-5 border border-gray-200 mb-6">
          <div className="flex flex-wrap gap-4">
            <FilterSelect label="지역" value={filter.region} onChange={(v) => setFilter((f) => ({ ...f, region: v }))} options={[...new Set(apps.map((a) => a.region))]} />
            <FilterSelect label="작목" value={filter.crop} onChange={(v) => setFilter((f) => ({ ...f, crop: v }))} options={[...new Set(apps.map((a) => a.crop))]} />
            <FilterSelect label="상태" value={filter.status} onChange={(v) => setFilter((f) => ({ ...f, status: v }))} options={STATUS_OPTIONS} />
            <button onClick={() => setFilter({ region: "", crop: "", status: "" })} className="text-sm text-gray-500 hover:text-gray-700">필터 초기화</button>
          </div>
        </div>

        {/* 선택 삭제 */}
        {selected.size > 0 && (
          <div className="flex items-center gap-3 mb-4">
            <span className="text-sm text-gray-600">{selected.size}건 선택됨</span>
            <button onClick={deleteSelected} className="px-4 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600">선택 삭제</button>
            <button onClick={() => setSelected(new Set())} className="px-4 py-2 bg-white border border-gray-300 text-sm rounded-lg hover:bg-gray-50">선택 해제</button>
          </div>
        )}

        <div className="flex gap-6">
          {/* 신청자 목록 */}
          <div className={`bg-white rounded-xl border border-gray-200 overflow-hidden ${detailApp ? "flex-1" : "w-full"}`}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-3 py-3"><input type="checkbox" checked={filteredApps.length > 0 && selected.size === filteredApps.length} onChange={toggleSelectAll} className="w-4 h-4 rounded border-gray-300 text-green-600" /></th>
                    <th className="px-3 py-3 text-left font-medium text-gray-600">이름</th>
                    <th className="px-3 py-3 text-left font-medium text-gray-600">연락처</th>
                    <th className="px-3 py-3 text-left font-medium text-gray-600">지역</th>
                    <th className="px-3 py-3 text-left font-medium text-gray-600">작목</th>
                    <th className="px-3 py-3 text-left font-medium text-gray-600">예정규모</th>
                    <th className="px-3 py-3 text-left font-medium text-gray-600">상태</th>
                    <th className="px-3 py-3 text-left font-medium text-gray-600">등록일</th>
                    <th className="px-3 py-3 text-left font-medium text-gray-600">삭제</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan={9} className="px-4 py-8 text-center text-gray-500">불러오는 중...</td></tr>
                  ) : filteredApps.length === 0 ? (
                    <tr><td colSpan={9} className="px-4 py-8 text-center text-gray-400">신청자가 없습니다.</td></tr>
                  ) : (
                    filteredApps.map((app) => (
                      <tr key={app.id} className={`border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${detailApp?.id === app.id ? "bg-green-50" : ""}`} onClick={() => setDetailApp(app)}>
                        <td className="px-3 py-3" onClick={(e) => e.stopPropagation()}>
                          <input type="checkbox" checked={selected.has(app.id)} onChange={() => toggleSelect(app.id)} className="w-4 h-4 rounded border-gray-300 text-green-600" />
                        </td>
                        <td className="px-3 py-3 font-medium">{app.name}</td>
                        <td className="px-3 py-3">{app.phone}</td>
                        <td className="px-3 py-3">{app.region}</td>
                        <td className="px-3 py-3">{app.crop}</td>
                        <td className="px-3 py-3">{app.budget_eok}억원</td>
                        <td className="px-3 py-3">
                          <select value={app.status} onChange={(e) => { e.stopPropagation(); updateField(app.id, { status: e.target.value }); }} onClick={(e) => e.stopPropagation()} className="text-xs border border-gray-200 rounded-lg px-2 py-1 bg-white">
                            {STATUS_OPTIONS.map((s) => (<option key={s} value={s}>{s}</option>))}
                          </select>
                        </td>
                        <td className="px-3 py-3 text-xs text-gray-400">{new Date(app.created_at).toLocaleDateString("ko-KR")}</td>
                        <td className="px-3 py-3" onClick={(e) => e.stopPropagation()}>
                          <button onClick={() => deleteApp(app.id, app.name)} className="text-xs text-red-500 hover:text-red-700">삭제</button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* 상세 패널 */}
          {detailApp && (
            <DetailPanel
              app={detailApp}
              onUpdate={(fields) => updateField(detailApp.id, fields)}
              onClose={() => setDetailApp(null)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function DetailPanel({
  app,
  onUpdate,
  onClose,
}: {
  app: Application;
  onUpdate: (fields: Record<string, string>) => void;
  onClose: () => void;
}) {
  const [memo, setMemo] = useState(app.memo || "");
  const [landInfo, setLandInfo] = useState(app.land_info || "");

  useEffect(() => {
    setMemo(app.memo || "");
    setLandInfo(app.land_info || "");
  }, [app.id, app.memo, app.land_info]);

  return (
    <div className="w-96 bg-white rounded-xl border border-gray-200 p-5 space-y-5 flex-shrink-0 self-start sticky top-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900">{app.name}</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl">&times;</button>
      </div>

      <div className="space-y-3 text-sm">
        <InfoRow label="연락처" value={app.phone} />
        <InfoRow label="이메일" value={app.email || "-"} />
        <InfoRow label="후계농" value={app.is_successor_farmer} />
        <InfoRow label="지역" value={app.region} />
        <InfoRow label="작목" value={app.crop} />
        <InfoRow label="예정규모" value={`${app.budget_eok}억원`} />
        <InfoRow label="예상 면적" value={`${app.estimated_area?.toLocaleString()}평`} />
        <InfoRow label="예상 모듈" value={`${app.estimated_modules?.toFixed(1)}`} />
        <InfoRow label="가계약금 예시" value={`${(app.deposit_example || 0).toLocaleString()}만원`} />
        <InfoRow label="희망 시기" value={app.timing} />
        <InfoRow label="상담 희망" value={app.wants_consultation ? "예" : "아니오"} />
        <InfoRow label="등록일" value={new Date(app.created_at).toLocaleString("ko-KR")} />
      </div>

      <hr className="border-gray-100" />

      {/* 상태 */}
      <div>
        <label className="block text-xs font-medium text-gray-500 mb-1">상태</label>
        <select
          value={app.status}
          onChange={(e) => onUpdate({ status: e.target.value })}
          className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white"
        >
          {STATUS_OPTIONS.map((s) => (<option key={s} value={s}>{s}</option>))}
        </select>
      </div>

      {/* 고객 유형 */}
      <div>
        <label className="block text-xs font-medium text-gray-500 mb-1">고객 유형</label>
        <select
          value={app.customer_type || "클러스터 입주 희망"}
          onChange={(e) => onUpdate({ customer_type: e.target.value })}
          className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white"
        >
          {CUSTOMER_TYPES.map((t) => (<option key={t} value={t}>{t}</option>))}
        </select>
      </div>

      {/* 토지 보유 여부 */}
      <div>
        <label className="block text-xs font-medium text-gray-500 mb-1">토지 보유 여부</label>
        <select
          value={app.land_status || "없음"}
          onChange={(e) => onUpdate({ land_status: e.target.value })}
          className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white"
        >
          {LAND_STATUS_OPTIONS.map((s) => (<option key={s} value={s}>{s}</option>))}
        </select>
      </div>

      {/* 토지 정보 */}
      <div>
        <label className="block text-xs font-medium text-gray-500 mb-1">토지 정보</label>
        <input
          type="text"
          value={landInfo}
          onChange={(e) => setLandInfo(e.target.value)}
          onBlur={() => { if (landInfo !== (app.land_info || "")) onUpdate({ land_info: landInfo }); }}
          placeholder="지역, 면적, 평당 가격 등"
          className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2"
        />
      </div>

      {/* 상담 메모 */}
      <div>
        <label className="block text-xs font-medium text-gray-500 mb-1">상담 메모</label>
        <textarea
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          onBlur={() => { if (memo !== (app.memo || "")) onUpdate({ memo }); }}
          rows={4}
          placeholder="상담 내용을 기록해주세요"
          className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 resize-none"
        />
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium text-gray-900">{value}</span>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white rounded-xl p-5 border border-gray-200">
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className="text-xl font-bold text-gray-900">{value}</p>
    </div>
  );
}

function GroupCard({ title, data }: { title: string; data: Record<string, number> }) {
  return (
    <div className="bg-white rounded-xl p-5 border border-gray-200">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">{title}</h3>
      <div className="space-y-2">
        {Object.entries(data).map(([key, count]) => (
          <div key={key} className="flex justify-between text-sm">
            <span className="text-gray-600">{key || "(미설정)"}</span>
            <span className="font-medium">{count}명</span>
          </div>
        ))}
        {Object.keys(data).length === 0 && <p className="text-xs text-gray-400">데이터 없음</p>}
      </div>
    </div>
  );
}

function FilterSelect({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-gray-500">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white">
        <option value="">전체</option>
        {options.map((o) => (<option key={o} value={o}>{o}</option>))}
      </select>
    </div>
  );
}

function groupBy(apps: Application[], key: keyof Application): Record<string, number> {
  const result: Record<string, number> = {};
  for (const app of apps) {
    const val = String(app[key] || "");
    result[val] = (result[val] || 0) + 1;
  }
  return result;
}

function getBudgetRanges(apps: Application[]) {
  const ranges = [
    { label: "2억 미만", min: 0, max: 2, count: 0 },
    { label: "2~3억", min: 2, max: 3, count: 0 },
    { label: "3~5억", min: 3, max: 5, count: 0 },
    { label: "5억 이상", min: 5, max: Infinity, count: 0 },
  ];
  for (const app of apps) {
    for (const r of ranges) {
      if (app.budget_eok >= r.min && app.budget_eok < r.max) {
        r.count++;
        break;
      }
    }
  }
  return ranges;
}
