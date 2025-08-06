import { NextResponse } from 'next/server';
import { selectKeyword, selectPopularKeywords, insertKeyword, updateKeyword } from 'src/entities/search/supabase';
import type { NextRequest } from 'next/server';

export async function GET() {
  try {
    const res = await selectPopularKeywords();
    return NextResponse.json(res, { status: 200 });
  } catch {
    NextResponse.json({ error: '500: 서버 처리 중 오류가 발생했습니다.' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { keyword } = await request.json();

    if (!keyword || keyword.trim().length === 0) {
      return NextResponse.json({ error: '400: 유효하지 않은 키워드입니다.' }, { status: 400 });
    }

    const trimmedKeyword = keyword.trim();
    const existingKeyword = await selectKeyword(trimmedKeyword);

    if (existingKeyword) {
      // 키워드가 존재하면 count를 1 증가
      await updateKeyword(existingKeyword.keyword_id, {
        count: (existingKeyword.count || 0) + 1
      });
    } else {
      // 키워드가 없으면 추가
      await insertKeyword(trimmedKeyword);
    }

    return NextResponse.json({ message: 'success' }, { status: 200 });
  } catch {
    return NextResponse.json({ error: '500: 서버 처리 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
