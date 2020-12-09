import * as React from 'react';
import * as ApplicationUtils from '~client/application/utils';

const useIsomorphicEffect =
  typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect;

type UseKeypressParams = {
  keyCode: ApplicationUtils.KeyCode.KeyCode;
  callback: (event: React.KeyboardEvent) => void;
};
export const useKeypress = (params: UseKeypressParams) => {
  useIsomorphicEffect(() => {
    const handleKeyDown = (event: React.KeyboardEvent) => {
      if (event.keyCode === params.keyCode) params.callback(event);
    };
    document.addEventListener('keydown', handleKeyDown as any);
    return () => document.removeEventListener('keydown', handleKeyDown as any);
  }, [params]);
};
