import { type EffectCallback, useEffect, useRef } from 'react';

/**
 * 初期化処理等をするための処理を簡単にするための util hooks
 *
 * React18 の Strict モードを有効化すると開発環境で2度レンダリングが走るため、開発環境でも1度しか呼ばれないようにしている
 *
 * @see {@link https://reactjs.org/docs/strict-mode.html#ensuring-reusable-state}
 * @see {@link https://github.com/facebook/react/issues/24502#issuecomment-1132877723}
 */
export const useMount = (effect: EffectCallback) => {
  const mounted = useRef(false);

  useEffect(() => {
    if (mounted.current) {
      return effect();
    }

    mounted.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted]);
};
