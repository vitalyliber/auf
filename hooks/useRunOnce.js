import { useEffect, useRef } from "react";

export default function useRunOnce(func, deps = []) {
  const ref = useRef(0);
  const execute = useRef(false);

  useEffect(() => {
    if (execute.current) return;

    clearTimeout(ref.current);
    ref.current = setTimeout(() => {
      func();
      execute.current = true;
    }, 500);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [func, ...deps]);
}
