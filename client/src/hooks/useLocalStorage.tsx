import { useCallback, useState, useEffect } from "react";

export function useLocalStorage<T>(
  key: string,
  defaultValue: T
): [T | undefined, (newValue: T) => void, () => void] {
  const [value, setValue] = useState<T | undefined>(() => {
    const jsonValue = localStorage.getItem(key);
    if (jsonValue !== null) return JSON.parse(jsonValue);

    if (typeof defaultValue === "function") {
      return defaultValue();
    } else {
      return defaultValue;
    }
  });

  useEffect(() => {
    if (value === undefined) return localStorage.removeItem(key);
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  const remove = useCallback(() => {
    setValue(undefined);
  }, []);

  const updateValue = useCallback(
    (newValue: T) => {
      if (typeof newValue === "function") {
        setValue((prevValue) => {
          const updatedValue = newValue(prevValue);
          localStorage.setItem(key, JSON.stringify(updatedValue));
          return updatedValue;
        });
      } else {
        setValue(newValue);
        localStorage.setItem(key, JSON.stringify(newValue));
      }
    },
    [key]
  );

  return [value, updateValue, remove];
}
