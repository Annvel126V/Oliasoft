import { useEffect, useState } from "react";

export const useDelayedLoader = (loading: boolean, delay = 300) => {
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (loading) {
      setShowSpinner(true);
    } else {
      timer = setTimeout(() => setShowSpinner(false), delay);
    }
    return () => clearTimeout(timer);
  }, [loading, delay]);

  return showSpinner;
};
