import { createClient } from 'src/shared/supabase/client/client';
import type { KeywordInsert, KeywordRow, KeywordUpdate } from 'src/shared/supabase/types';

const supabase = createClient();

/**
 * DB에서 특정 키워드를 조회합니다.
 * @param keyword - 조회할 검색어
 * @returns {Promise<KeywordRow | null>}
 */
export const selectKeyword = async (keyword: string): Promise<KeywordRow | null> => {
  const { data, error } = await supabase.from('keywords').select('*').eq('keyword', keyword).maybeSingle();

  if (error) {
    console.error('🚀 ~ selectKeyword ~ error:', error.message);
    throw new Error();
  }

  return data;
};

/**
 * 기존 키워드의 정보를 업데이트합니다.
 * @param keywordId - 업데이트할 키워드의 ID
 * @param updates - 업데이트할 필드 객체
 */
export const updateKeyword = async (keywordId: number, updates: KeywordUpdate) => {
  const { error } = await supabase.from('keywords').update(updates).eq('keyword_id', keywordId);

  if (error) {
    console.error('🚀 ~ updateKeyword ~ error:', error.message);
    throw new Error();
  }
};

/**
 * 새로운 키워드를 DB에 추가합니다.
 * @param keyword - 추가할 검색어
 */
export const insertKeyword = async (keyword: string) => {
  const newKeyword: KeywordInsert = { keyword, count: 1 };
  const { error } = await supabase.from('keywords').insert(newKeyword);

  if (error) {
    console.error('🚀 ~ insertKeyword ~ error:', error.message);
    throw new Error();
  }
};

/**
 * 인기 검색어 목록을 가져옵니다.
 * @param limit - 가져올 검색어 개수 (기본값: 10)
 * @returns count가 높은 순서대로 정렬된 KeywordRow 배열
 */
const DEFAULT_POPULAR_LIMIT = 10;
export const selectPopularKeywords = async (limit = DEFAULT_POPULAR_LIMIT) => {
  const { data, error } = await supabase
    .from('keywords')
    .select('keyword')
    .order('count', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('🚀 ~ insertKeyword ~ error:', error.message);
    throw new Error();
  }
  return data;
};
