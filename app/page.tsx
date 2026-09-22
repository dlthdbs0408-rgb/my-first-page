import InquiryForm from "./components/InquiryForm";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-emerald-50 px-6 py-16 text-center text-zinc-900">
      <p className="mb-4 text-sm font-semibold tracking-widest text-emerald-700">
        Dr.By · 반려동물 헬스케어
      </p>
      <h1 className="text-5xl font-bold text-emerald-900">닥터바이</h1>
      <p className="mt-8 max-w-xl text-xl leading-relaxed text-zinc-700">
        닥터바이는 반려견·반려묘와 보호자 모두 행복하고 건강한 라이프를
        누릴 수 있도록 도와주는 반려동물 헬스케어 브랜드입니다.
      </p>
      <InquiryForm />
      <p className="mt-16 text-sm text-zinc-500">에이앤바이오(ANBIO)</p>
    </main>
  );
}
