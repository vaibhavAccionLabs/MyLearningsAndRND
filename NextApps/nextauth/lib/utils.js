import { useCallback } from 'react';
import { useRouter } from 'next/router';

export const useRouterRefresh = () => {
  const router = useRouter();
  const { asPath } = router;
  const refresh = useCallback(() => router.replace(asPath), [asPath]);
  return refresh;
};
