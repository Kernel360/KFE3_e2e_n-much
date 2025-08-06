import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postKeyword } from 'src/entities/search/api';

/*
제네릭 타입 파라미터
- useMutation<TData, TError, TVariables, TContext>({...})
  - TData: mutation이 반환하는 값의 타입 (ex. 서버 응답)
  - TError: 에러의 타입
  - TVariables: mutationFn에 넘기는 인자의 타입
  - TContext: onMutate에서 반환하는 값의 타입 → onError 등에 전달, 낙관적 업데이트 롤백용 context
*/
export const usePostKeywordMutation = (
  optimisticUpdate: (keyword: string) => string[],
  rollback: (previous: string[]) => void
) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<void, Error, { keyword: string }, { previous: string[] }>({
    mutationFn: async ({ keyword }) => {
      await postKeyword(keyword);
      return;
    },

    // 낙관적 업데이트
    onMutate: async ({ keyword }) => {
      const previous = optimisticUpdate(keyword);
      return { previous };
    },

    // 실패 시 롤백
    onError: (error, _, context) => {
      console.error(error.message);
      if (context?.previous) {
        rollback(context.previous);
      }
    },

    // 성공 시 캐시 무효화
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['popularKeywords'] });
    }
  });

  return mutation;
};
