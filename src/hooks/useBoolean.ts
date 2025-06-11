import { useCallback, useState } from "react";

export const useBoolean = () => {
  const [bool, setBool] = useState<boolean>(false);

  const onTrue = useCallback(() => {
    setBool(true);
  }, []);

  const onFalse = useCallback(() => {
    setBool(false);
  }, [setBool]);

  return {
    bool,
    onTrue,
    onFalse,
    setBool,
  };
};
