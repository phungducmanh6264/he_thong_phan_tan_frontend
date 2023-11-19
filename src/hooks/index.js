import { useEffect, useState } from "react";
import { useContext } from "react";
import GlobalContext from "@global/context/GlobalContext";

function useDebounces(value, delay) {
  const [debounce, setDebounce] = useState(value);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebounce(value);
    }, delay);

    return () => {
      clearTimeout(timerId);
    };
  }, [value]);

  return debounce;
}

function useGlobal() {
  const [state, dispath] = useContext(GlobalContext);
  return [state, dispath];
}

export { useDebounces, useGlobal };
