import { useState, type FormEvent } from 'react';
import { CheckCircle2, AlertCircle, Send } from 'lucide-react';

interface SubmittedIdea {
  id: string;
  author: string;
  category: string;
  content: string;
  createdAt: string;
}

export function FeedbackSection() {
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('공간·동선 개선');
  const [content, setContent] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [submittedNotice, setSubmittedNotice] = useState('');
  const [ideas, setIdeas] = useState<SubmittedIdea[]>([
    {
      id: 'sample-1',
      author: '프로젝트 팀 메모',
      category: '콘텐츠·홍보',
      content: '향후 실제 방문객 및 시민의 축제 개선 제안을 수집해 이 영역에 아카이빙할 수 있습니다.',
      createdAt: '예시 슬롯',
    },
  ]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSubmittedNotice('');

    if (!author.trim()) {
      setErrorMsg('이름 또는 소속을 입력해 주세요.');
      return;
    }
    if (content.trim().length < 5) {
      setErrorMsg('개선 아이디어는 5자 이상 작성해 주세요.');
      return;
    }

    const newIdea: SubmittedIdea = {
      id: `idea-${Date.now()}`,
      author: author.trim(),
      category,
      content: content.trim(),
      createdAt: '방금 전',
    };

    setIdeas((prev) => [newIdea, ...prev]);
    setAuthor('');
    setContent('');
    setSubmittedNotice('의견이 임시 보드에 등록되었습니다.');
  };

  return (
    <section id="participate" className="bg-white py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Form */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <p className="text-xs font-medium text-zinc-500">
                <span className="font-mono-tabular font-bold text-red-600">05</span>
                <span className="mx-2" aria-hidden="true">·</span>
                <span>시민·방문객 의견 수렴</span>
              </p>
              <h2 className="font-display text-3xl font-bold tracking-tight text-zinc-950 text-balance">
                닭갈비 왕국을 위한 아이디어를 보태주세요
              </h2>
              <p className="text-sm leading-relaxed text-zinc-600">
                춘천 막국수 닭갈비 축제에서 겪었던 불편이나 새로운 퀘스트 아이디어가 있다면 자유롭게 남겨주세요.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 pt-2" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="idea-author" className="block text-xs font-semibold text-zinc-800">
                    이름 또는 소속
                  </label>
                  <input
                    id="idea-author"
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="예: 춘천시민 / 방문객"
                    className="w-full px-3.5 py-2.5 text-sm bg-zinc-50 border border-zinc-300 rounded-lg text-zinc-950 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-950 focus:bg-white transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="idea-category" className="block text-xs font-semibold text-zinc-800">
                    제안 영역
                  </label>
                  <select
                    id="idea-category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-zinc-50 border border-zinc-300 rounded-lg text-zinc-950 focus:outline-none focus:border-zinc-950 focus:bg-white transition-colors"
                  >
                    <option value="공간·동선 개선">공간·동선 개선</option>
                    <option value="가격·운영 투명화">가격·운영 투명화</option>
                    <option value="콘텐츠·홍보">콘텐츠·홍보</option>
                    <option value="기타 의견">기타 의견</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="idea-content" className="block text-xs font-semibold text-zinc-800">
                  개선 제안 내용
                </label>
                <textarea
                  id="idea-content"
                  rows={4}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="예: 1인 방문객도 닭갈비와 막국수를 함께 맛볼 수 있는 세트 메뉴가 있으면 좋겠습니다."
                  className="w-full px-3.5 py-2.5 text-sm bg-zinc-50 border border-zinc-300 rounded-lg text-zinc-950 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-950 focus:bg-white transition-colors resize-y"
                />
              </div>

              {errorMsg && (
                <div
                  role="alert"
                  className="flex items-center gap-2 text-xs font-medium text-red-700 bg-red-50 border border-red-200 px-3.5 py-2.5 rounded-lg"
                >
                  <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {submittedNotice && (
                <div
                  role="status"
                  className="flex items-center gap-2 text-xs font-medium text-emerald-800 bg-emerald-50 border border-emerald-200 px-3.5 py-2.5 rounded-lg"
                >
                  <CheckCircle2 className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>{submittedNotice}</span>
                </div>
              )}

              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2"
              >
                <Send className="w-4 h-4" aria-hidden="true" />
                <span>제안 등록하기</span>
              </button>
            </form>
          </div>

          {/* Right: Submitted Ideas Feed */}
          <div className="lg:col-span-6 rounded-2xl border border-zinc-200 bg-zinc-50 p-6 md:p-8 space-y-5">
            <div className="flex items-center justify-between gap-4 pb-4 border-b border-zinc-200">
              <h3 className="text-base font-bold text-zinc-950">접수된 개선 의견 보드</h3>
              <span className="font-mono-tabular text-xs font-semibold text-zinc-500">
                총 {ideas.length}건
              </span>
            </div>

            <div className="space-y-3">
              {ideas.map((idea) => (
                <div
                  key={idea.id}
                  className="rounded-xl border border-zinc-200 bg-white p-4 space-y-2"
                >
                  <div className="flex items-center justify-between gap-2 text-xs text-zinc-500">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-zinc-900">{idea.author}</span>
                      <span aria-hidden="true">·</span>
                      <span>{idea.category}</span>
                    </div>
                    <span>{idea.createdAt}</span>
                  </div>
                  <p className="text-sm text-zinc-700 leading-relaxed">{idea.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
