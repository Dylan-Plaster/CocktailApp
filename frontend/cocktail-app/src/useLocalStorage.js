import { useState, useEffect } from "react";

const useLocalStorage = (key, defaultVal, setLoading) => {
  const [state, setState] = useState(null);
  useEffect(() => {
    try {
      const val = window.localStorage.getItem(key);

      if (val) {
        setState((st) => val);
        setLoading(false);
      } else {
        setState(defaultVal);
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
      setState(defaultVal);
    }
  }, [defaultVal, key, setLoading]);

  useEffect(() => {
    if (state) {
      window.localStorage.setItem(key, state);
    }
  }, [key, state]);

  const updateState = (data) => {
    setState(() => {
      return data;
    });
  };

  return [state, updateState];
};

export default useLocalStorage;
