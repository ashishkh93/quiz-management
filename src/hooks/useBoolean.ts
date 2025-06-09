import { useCallback, useState } from "react";

export const useBoolean = () => {
  const [state, setState] = useState<boolean>(false);

  const onTrue = useCallback(() => {
    setState(true);
  }, []);

  const onFalse = useCallback(() => {
    setState(false);
  }, [setState]);

  return {
    state,
    onTrue,
    onFalse,
    setState,
  };
};
