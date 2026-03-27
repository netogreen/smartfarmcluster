import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChannelTalk from "@/components/ChannelTalk";
import MetaPixel from "@/components/MetaPixel";

export const metadata: Metadata = {
  title: "스마트팜 클러스터 입주 희망 신청",
  description:
    "후계농 확정자 대상 스마트팜 클러스터 입주 희망 신청 사이트입니다. 프로젝트 런칭 시 우선 공급안내를 드립니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="min-h-screen flex flex-col" style={{ fontFamily: "'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, sans-serif" }}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <ChannelTalk />
        <MetaPixel />
      </body>
    </html>
  );
}
