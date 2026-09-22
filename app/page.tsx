export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-white px-6 text-center text-zinc-900">
      <h1 className="text-4xl font-bold">안녕하세요, 소윤님의 첫 페이지입니다</h1>
      <p className="max-w-md text-lg text-zinc-600">
        Next.js로 만들어 GitHub에 올리고 Vercel로 배포한 한 장짜리 페이지입니다.
      </p>
      <p className="text-sm text-zinc-400">에이앤바이오(ANBIO) · 닥터바이 · 바이랩</p>
    </main>
  );
}
