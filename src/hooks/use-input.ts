import { useState } from "react";

export const useInput = (defaultValue = "") => {
  const [value, setValue] = useState(defaultValue);
  const [error, setError] = useState<string | null>(null);

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setValue(event.target.value);
    setError(null);
  };

  const reset = () => {
    setValue(defaultValue);
    setError(null);
  };

  const register = {
    value,
    onChange,
    ["aria-invalid"]: error ? true : undefined,
  };

  return {
    value,
    error,
    setError,
    register,
    reset,
  };
};
