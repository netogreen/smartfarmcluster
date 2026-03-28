"use client";

import { useState, useEffect, useCallback } from "react";
import type { Application } from "@/lib/db";

const STATUS_OPTIONS = [
  "신규",
  "확인 완료",
  "공급안내 발송",
  "가계약 안내",
  "가계약 완료",
  "보류",
];

const ADMIN_KEY = "cluster2026";

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [apps, setApps] = useState<Application[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState({ region: "", crop: "", status: "" });

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

  async function updateStatus(id: string, status: string) {
    await fetch(`/api/applications?key=${ADMIN_KEY}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    fetchApps();
  }

  async function deleteApp(id: string, name: string) {
    if (!confirm(`"${name}" 신청을 삭제하시겠습니까?`)) return;
    await fetch(`/api/applications?key=${ADMIN_KEY}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchApps();
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
      "ID",
      "이름",
      "연락처",
      "이메일",
      "후계농확정",
      "지역",
      "작목",
      "예정규모(억원)",
      "예상평수",
      "예상모듈수",
      "권장기준",
      "가계약금예시(만원)",
      "희망시기",
      "상담희망",
      "상태",
      "등록일시",
    ];
    const rows = filteredApps.map((a) => [
      a.id,
      a.name,
      a.phone,
      a.email || "",
      a.is_successor_farmer,
      a.region,
      a.crop,
      a.budget_eok,
      a.estimated_area,
      a.estimated_modules,
      a.recommended_note,
      a.deposit_example,
      a.timing,
      a.wants_consultation ? "예" : "아니오",
      a.status,
      a.created_at,
    ]);

    const bom = "\uFEFF";
    const csv =
      bom +
      [headers.join(","), ...rows.map((r) => r.map((v) => `"${v}"`).join(","))].join(
        "\n"
      );
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `신청자_목록_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // 필터링
  const filteredApps = apps.filter((a) => {
    if (filter.region && a.region !== filter.region) return false;
    if (filter.crop && a.crop !== filter.crop) return false;
    if (filter.status && a.status !== filter.status) return false;
    return true;
  });

  // 통계
  const stats = {
    total: apps.length,
    byRegion: groupBy(apps, "region"),
    byCrop: groupBy(apps, "crop"),
    byStatus: groupBy(apps, "status"),
    consultationCount: apps.filter((a) => a.wants_consultation).length,
    totalArea: apps.reduce((s, a) => s + a.estimated_area, 0),
    totalModules: apps.reduce((s, a) => s + a.estimated_modules, 0),
    budgetRanges: getBudgetRanges(apps),
  };

  if (!loggedIn) {
    return (
      <section className="min-h-[70vh] flex items-center justify-center bg-gray-50">
        <form
          onSubmit={handleLogin}
          className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 w-full max-w-sm"
        >
          <h1 className="text-xl font-bold text-gray-900 mb-6 text-center">
            관리자 로그인
          </h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            className="w-full py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700"
          >
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
          <h1 className="text-2xl font-bold text-gray-900">
            관리자 대시보드
          </h1>
          <button
            onClick={downloadCSV}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:bg-gray-50"
          >
            CSV 다운로드
          </button>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard label="총 신청자" value={`${stats.total}명`} />
          <StatCard
            label="상담 희망자"
            value={`${stats.consultationCount}명`}
          />
          <StatCard
            label="총 예상 평수"
            value={`${stats.totalArea.toLocaleString()}평`}
          />
          <StatCard
            label="총 예상 모듈"
            value={`${stats.totalModules.toFixed(1)}모듈`}
          />
        </div>

        {/* 분류 통계 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <GroupCard title="지역별" data={stats.byRegion} />
          <GroupCard title="작목별" data={stats.byCrop} />
          <GroupCard title="상태별" data={stats.byStatus} />
        </div>

        {/* 예산 구간 */}
        <div className="bg-white rounded-xl p-5 border border-gray-200 mb-8">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            예산 구간별
          </h3>
          <div className="flex flex-wrap gap-3">
            {stats.budgetRanges.map((r) => (
              <span
                key={r.label}
                className="text-sm bg-gray-50 px-3 py-1.5 rounded-lg"
              >
                {r.label}: <strong>{r.count}명</strong>
              </span>
            ))}
          </div>
        </div>

        {/* 필터 */}
        <div className="bg-white rounded-xl p-5 border border-gray-200 mb-6">
          <div className="flex flex-wrap gap-4">
            <FilterSelect
              label="지역"
              value={filter.region}
              onChange={(v) => setFilter((f) => ({ ...f, region: v }))}
              options={[...new Set(apps.map((a) => a.region))]}
            />
            <FilterSelect
              label="작목"
              value={filter.crop}
              onChange={(v) => setFilter((f) => ({ ...f, crop: v }))}
              options={[...new Set(apps.map((a) => a.crop))]}
            />
            <FilterSelect
              label="상태"
              value={filter.status}
              onChange={(v) => setFilter((f) => ({ ...f, status: v }))}
              options={STATUS_OPTIONS}
            />
            <button
              onClick={() => setFilter({ region: "", crop: "", status: "" })}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              필터 초기화
            </button>
          </div>
        </div>

        {/* 신청자 목록 */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-4 py-3 text-left font-medium text-gray-600">
                    이름
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">
                    연락처
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">
                    후계농
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">
                    지역
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">
                    작목
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">
                    예정규모
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">
                    예상모듈
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">
                    시기
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">
                    상담
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">
                    상태
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">
                    등록일
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">
                    삭제
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={12} className="px-4 py-8 text-center text-gray-500">
                      불러오는 중...
                    </td>
                  </tr>
                ) : filteredApps.length === 0 ? (
                  <tr>
                    <td colSpan={12} className="px-4 py-8 text-center text-gray-400">
                      신청자가 없습니다.
                    </td>
                  </tr>
                ) : (
                  filteredApps.map((app) => (
                    <tr
                      key={app.id}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="px-4 py-3 font-medium">{app.name}</td>
                      <td className="px-4 py-3">{app.phone}</td>
                      <td className="px-4 py-3">{app.is_successor_farmer}</td>
                      <td className="px-4 py-3">{app.region}</td>
                      <td className="px-4 py-3">{app.crop}</td>
                      <td className="px-4 py-3">{app.budget_eok}억원</td>
                      <td className="px-4 py-3 text-green-700 font-semibold">
                        {app.estimated_modules.toFixed(1)}
                      </td>
                      <td className="px-4 py-3">{app.timing}</td>
                      <td className="px-4 py-3">
                        {app.wants_consultation ? "O" : "-"}
                      </td>
                      <td className="px-4 py-3">
                        <select
                          value={app.status}
                          onChange={(e) =>
                            updateStatus(app.id, e.target.value)
                          }
                          className="text-xs border border-gray-200 rounded-lg px-2 py-1 bg-white"
                        >
                          {STATUS_OPTIONS.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-400">
                        {new Date(app.created_at).toLocaleDateString("ko-KR")}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => deleteApp(app.id, app.name)}
                          className="text-xs text-red-500 hover:text-red-700"
                        >
                          삭제
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
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

function GroupCard({
  title,
  data,
}: {
  title: string;
  data: Record<string, number>;
}) {
  return (
    <div className="bg-white rounded-xl p-5 border border-gray-200">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">{title}</h3>
      <div className="space-y-2">
        {Object.entries(data).map(([key, count]) => (
          <div key={key} className="flex justify-between text-sm">
            <span className="text-gray-600">{key}</span>
            <span className="font-medium">{count}명</span>
          </div>
        ))}
        {Object.keys(data).length === 0 && (
          <p className="text-xs text-gray-400">데이터 없음</p>
        )}
      </div>
    </div>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-gray-500">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white"
      >
        <option value="">전체</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

function groupBy(
  apps: Application[],
  key: keyof Application
): Record<string, number> {
  const result: Record<string, number> = {};
  for (const app of apps) {
    const val = String(app[key]);
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
