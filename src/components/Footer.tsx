export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-8">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p className="text-xs text-gray-500 leading-relaxed">
          본 사이트는 후계농 확정자 대상 스마트팜 클러스터 입주 희망 신청을
          위한 안내 페이지입니다.
        </p>
        <p className="text-xs text-gray-400 mt-2">
          본 신청은 입주 희망 등록이며 계약이 아닙니다. 실제 공급 조건과
          일정은 프로젝트별로 달라질 수 있습니다.
        </p>
        <div className="mt-4 space-y-1 text-xs text-gray-500">
          <p>🏢 운영사 (주)네토그린 | 사업자등록번호 661-86-02563</p>
          <p>📞 문의 <a href="tel:01082578007" className="text-green-700">010-8257-8007</a></p>
          <p>🎥 유튜브 <a href="https://www.youtube.com/@NETOGREENKR" target="_blank" rel="noopener noreferrer" className="text-green-700 hover:underline">@NETOGREENKR</a></p>
        </div>
        <p className="text-xs text-gray-400 mt-4">
          &copy; {new Date().getFullYear()} 스마트팜 클러스터 입주 신청
        </p>
      </div>
    </footer>
  );
}
