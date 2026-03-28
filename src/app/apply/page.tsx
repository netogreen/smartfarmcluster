"use client";

import { useState, useEffect, FormEvent } from "react";
import { cropList, getCropByName } from "@/lib/cropModels";
import { calculateCrop, formatManWon } from "@/lib/calculate";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

const REGIONS = ["경북", "경남", "전북", "전남", "기타"];
const CROPS = [...cropList.map((c) => c.name), "기타"];
const TIMINGS = [
  "2026년 하반기",
  "2027년 상반기",
  "2027년 하반기",
  "2028년 이후",
  "미정",
];

export default function ApplyPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    isSuccessorFarmer: "",
    region: "",
    regionOther: "",
    crop: "",
    cropOther: "",
    budget: "",
    timing: "",
    wantsConsultation: "",
    agreePrivacy: false,
    agreeNotContract: false,
    agreeProcess: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // ViewContent 이벤트 - 신청 페이지 진입 시
  useEffect(() => {
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "ViewContent", {
        content_name: "입주 희망 신청 폼",
        content_category: "smartfarm-cluster",
      });
    }
  }, []);

  const budgetNum = parseFloat(form.budget);
  const selectedCropModel = form.crop && form.crop !== "기타" ? getCropByName(form.crop) : null;
  const result =
    selectedCropModel && !isNaN(budgetNum) && budgetNum > 0
      ? calculateCrop(budgetNum, selectedCropModel)
      : null;

  function updateForm(field: string, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (!form.name || !form.phone || !form.isSuccessorFarmer || !form.region || !form.crop || !form.budget || !form.timing || !form.wantsConsultation) {
      setError("필수 항목을 모두 입력해주세요.");
      return;
    }
    if (!form.agreePrivacy || !form.agreeNotContract || !form.agreeProcess) {
      setError("모든 동의 항목에 체크해주세요.");
      return;
    }
    if (!result && form.crop !== "기타") {
      setError("영농정착자금 활용 예정규모를 올바르게 입력해주세요.");
      return;
    }
    if (form.crop === "기타" && (!budgetNum || budgetNum <= 0)) {
      setError("영농정착자금 활용 예정규모를 올바르게 입력해주세요.");
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        name: form.name,
        phone: form.phone,
        email: form.email || null,
        is_successor_farmer: form.isSuccessorFarmer,
        region: form.region === "기타" ? form.regionOther : form.region,
        crop: form.crop === "기타" ? form.cropOther : form.crop,
        budget_eok: budgetNum,
        estimated_area: result ? result.displayAreaPy : budgetNum * 100,
        estimated_modules: result ? result.displayModules : 0,
        recommended_note: result ? `${result.displayModules.toFixed(1)}${selectedCropModel?.displayUnit || "모듈"}` : "별도 상담",
        deposit_example: result ? result.depositManwon : Math.round(budgetNum * 100),
        timing: form.timing,
        wants_consultation: form.wantsConsultation === "예",
      };

      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("신청 제출 중 오류가 발생했습니다.");

      // Lead 이벤트 - 프론트 + 서버 동일 event_id로 중복 제거
      const eventId = `lead_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
      const eventTime = Math.floor(Date.now() / 1000);

      // 프론트: fbq Lead
      if (typeof window !== "undefined" && window.fbq) {
        window.fbq("track", "Lead", { event_id: eventId });
      }

      // 서버: Conversions API Lead
      fetch("/api/meta-capi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event_name: "Lead",
          event_id: eventId,
          event_time: eventTime,
          event_source_url: window.location.href,
          user_data: {
            ph: form.phone ? [form.phone.replace(/[^0-9]/g, "")] : undefined,
            em: form.email ? [form.email.toLowerCase()] : undefined,
          },
          custom_data: {
            content_name: "입주 희망 신청",
            content_category: form.crop,
            value: budgetNum,
            currency: "KRW",
          },
        }),
      }).catch(() => {});

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "오류가 발생했습니다.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <section className="py-20 bg-green-50 min-h-[60vh] flex items-center">
        <div className="max-w-lg mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            입주 희망 신청이 접수되었습니다
          </h1>
          <p className="text-gray-600 leading-relaxed">
            프로젝트 런칭 시 등록하신 연락처로
            <br />
            우선 공급안내를 드리겠습니다.
          </p>
          <p className="text-sm text-gray-400 mt-6">
            본 신청은 입주 희망 등록이며 계약이 아닙니다.
          </p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="bg-green-50 py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            입주 희망 신청
          </h1>
          <p className="mt-3 text-gray-600">
            아래 정보를 입력해주시면 프로젝트 런칭 시 우선 공급안내를 드립니다.
          </p>
          <p className="mt-1 text-sm text-gray-400">
            현재는 입주 희망 신청 단계이며 비용이 발생하지 않습니다.
          </p>
        </div>
      </section>

      <section className="py-10 bg-white">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto px-4 space-y-8">
          {/* 기본 정보 */}
          <fieldset className="space-y-5">
            <legend className="text-lg font-bold text-gray-900 mb-2">
              기본 정보
            </legend>

            <FormField label="이름" required>
              <input
                type="text"
                value={form.name}
                onChange={(e) => updateForm("name", e.target.value)}
                placeholder="홍길동"
                className="form-input"
              />
            </FormField>

            <FormField label="연락처" required>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => updateForm("phone", e.target.value)}
                placeholder="010-0000-0000"
                className="form-input"
              />
            </FormField>

            <FormField label="이메일" hint="선택">
              <input
                type="email"
                value={form.email}
                onChange={(e) => updateForm("email", e.target.value)}
                placeholder="example@email.com"
                className="form-input"
              />
            </FormField>

            <FormField label="후계농 확정 여부" required>
              <RadioGroup
                name="isSuccessorFarmer"
                options={["확정", "신청 중", "미신청"]}
                value={form.isSuccessorFarmer}
                onChange={(v) => updateForm("isSuccessorFarmer", v)}
              />
            </FormField>
          </fieldset>

          {/* 희망 조건 */}
          <fieldset className="space-y-5">
            <legend className="text-lg font-bold text-gray-900 mb-2">
              희망 조건
            </legend>

            <FormField label="희망 지역" required>
              <RadioGroup
                name="region"
                options={REGIONS}
                value={form.region}
                onChange={(v) => updateForm("region", v)}
              />
              {form.region === "기타" && (
                <input
                  type="text"
                  value={form.regionOther}
                  onChange={(e) => updateForm("regionOther", e.target.value)}
                  placeholder="희망 지역을 입력해주세요"
                  className="form-input mt-2"
                />
              )}
            </FormField>

            <FormField label="희망 작목" required>
              <RadioGroup
                name="crop"
                options={CROPS}
                value={form.crop}
                onChange={(v) => updateForm("crop", v)}
              />
              {form.crop === "기타" && (
                <input
                  type="text"
                  value={form.cropOther}
                  onChange={(e) => updateForm("cropOther", e.target.value)}
                  placeholder="희망 작목을 입력해주세요"
                  className="form-input mt-2"
                />
              )}
            </FormField>
          </fieldset>

          {/* 영농정착자금 및 계산 */}
          <fieldset className="space-y-5">
            <legend className="text-lg font-bold text-gray-900 mb-2">
              영농정착자금 활용 예정규모
            </legend>

            <FormField label="예정규모" required hint="숫자 입력, 단위: 억원">
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  value={form.budget}
                  onChange={(e) => updateForm("budget", e.target.value)}
                  placeholder="예: 2.5"
                  className="form-input w-40"
                />
                <span className="text-gray-600">억원</span>
              </div>
            </FormField>

            {!selectedCropModel && form.crop && form.crop !== "기타" && (
              <p className="text-xs text-gray-400">작물을 선택하면 계산 결과가 표시됩니다.</p>
            )}
            {form.crop === "기타" && form.budget && (
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <p className="text-sm text-gray-600">
                  기타 작물은 별도 상담을 통해 안내드립니다. 예산 {budgetNum}억원이 등록됩니다.
                </p>
              </div>
            )}
            {result && selectedCropModel && (
              <div className="bg-green-50 rounded-xl p-5 border border-green-100">
                <h3 className="text-sm font-semibold text-green-800 mb-3">
                  {selectedCropModel.name} 기준 자동 계산 결과
                </h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-gray-500 text-xs">적용 모듈 규격</p>
                    <p className="font-semibold text-gray-900 text-xs">
                      {selectedCropModel.sizeLabel} / {selectedCropModel.modulePy}평 / {selectedCropModel.spanType}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">선택 작물 기준 예상 면적</p>
                    <p className="font-semibold text-gray-900">
                      약 {result.displayAreaPy.toLocaleString()}평
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">예상 모듈 수</p>
                    <p className="font-bold text-green-700">
                      {result.displayModules.toFixed(1)}{selectedCropModel.displayUnit}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">우선 가계약금 예시</p>
                    <p className="font-semibold text-gray-900">
                      {formatManWon(result.depositManwon)}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-3">
                  본 금액과 면적은 신청 편의를 위한 기준값이며, 실제 공급 조건과
                  일정은 프로젝트별로 달라질 수 있습니다.
                </p>
              </div>
            )}
          </fieldset>

          {/* 추가 정보 */}
          <fieldset className="space-y-5">
            <legend className="text-lg font-bold text-gray-900 mb-2">
              추가 정보
            </legend>

            <FormField label="희망 입주 시기" required>
              <RadioGroup
                name="timing"
                options={TIMINGS}
                value={form.timing}
                onChange={(v) => updateForm("timing", v)}
              />
            </FormField>

            <FormField label="상담 희망 여부" required>
              <RadioGroup
                name="wantsConsultation"
                options={["예", "아니오"]}
                value={form.wantsConsultation}
                onChange={(v) => updateForm("wantsConsultation", v)}
              />
            </FormField>
          </fieldset>

          {/* 동의 항목 */}
          <fieldset className="space-y-3">
            <legend className="text-lg font-bold text-gray-900 mb-2">
              동의 항목
            </legend>

            <CheckboxItem
              checked={form.agreePrivacy}
              onChange={(v) => updateForm("agreePrivacy", v)}
              label="개인정보 수집 및 이용에 동의합니다."
              required
            />
            <CheckboxItem
              checked={form.agreeNotContract}
              onChange={(v) => updateForm("agreeNotContract", v)}
              label="본 신청은 입주 희망 등록이며 계약이 아님을 확인합니다."
              required
            />
            <CheckboxItem
              checked={form.agreeProcess}
              onChange={(v) => updateForm("agreeProcess", v)}
              label="프로젝트 런칭 후 별도 공급안내 및 가계약 절차가 진행될 수 있음을 확인합니다."
              required
            />
          </fieldset>

          {error && (
            <div className="bg-red-50 text-red-700 text-sm rounded-xl p-4 border border-red-100">
              {error}
            </div>
          )}

          <div className="pt-4">
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-base"
            >
              {submitting ? "제출 중..." : "입주 희망 신청 제출"}
            </button>
          </div>
        </form>
      </section>

      <style jsx global>{`
        .form-input {
          display: block;
          width: 100%;
          padding: 0.75rem 1rem;
          border: 1px solid #d1d5db;
          border-radius: 0.75rem;
          font-size: 0.9375rem;
          outline: none;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .form-input:focus {
          border-color: #16a34a;
          box-shadow: 0 0 0 3px rgba(22, 163, 74, 0.1);
        }
      `}</style>
    </>
  );
}

function FormField({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
        {hint && (
          <span className="text-xs text-gray-400 font-normal ml-2">
            ({hint})
          </span>
        )}
      </label>
      {children}
    </div>
  );
}

function RadioGroup({
  name,
  options,
  value,
  onChange,
}: {
  name: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-3">
      {options.map((opt) => (
        <label
          key={opt}
          className={`px-4 py-2.5 rounded-lg border text-sm cursor-pointer transition-colors ${
            value === opt
              ? "bg-green-50 border-green-500 text-green-700 font-medium"
              : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
          }`}
        >
          <input
            type="radio"
            name={name}
            value={opt}
            checked={value === opt}
            onChange={() => onChange(opt)}
            className="sr-only"
          />
          {opt}
        </label>
      ))}
    </div>
  );
}

function CheckboxItem({
  checked,
  onChange,
  label,
  required,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  required?: boolean;
}) {
  return (
    <label className="flex items-start gap-3 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1 w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
      />
      <span className="text-sm text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </span>
    </label>
  );
}
