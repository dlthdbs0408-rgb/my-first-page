"use client";

import { useState } from "react";

export default function InquiryForm() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [errorText, setErrorText] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setErrorText("");
    const res = await fetch("/api/inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, message }),
    });
    if (res.ok) {
      setStatus("done");
      setName("");
      setMessage("");
    } else {
      const data = await res.json().catch(() => ({}));
      setErrorText(data.error ?? "오류가 발생했습니다.");
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-12 w-full max-w-md text-left">
      <h2 className="mb-4 text-center text-2xl font-bold text-emerald-900">문의 남기기</h2>
      <label className="block text-sm font-medium text-zinc-700">
        이름
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-zinc-900 focus:border-emerald-600 focus:outline-none"
        />
      </label>
      <label className="mt-4 block text-sm font-medium text-zinc-700">
        내용
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={4}
          className="mt-1 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-zinc-900 focus:border-emerald-600 focus:outline-none"
        />
      </label>
      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 w-full rounded-md bg-emerald-700 px-4 py-2 font-semibold text-white hover:bg-emerald-800 disabled:opacity-50"
      >
        {status === "sending" ? "보내는 중…" : "보내기"}
      </button>
      {status === "done" && <p className="mt-3 text-center text-sm text-emerald-700">문의가 접수되었습니다. 감사합니다.</p>}
      {status === "error" && <p className="mt-3 text-center text-sm text-red-600">{errorText}</p>}
    </form>
  );
}
