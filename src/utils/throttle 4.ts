export const throttle = (fn: (...args: any[]) => void, ms = 150) => {
  let last = 0;
  let timer: number | undefined;
  return (...args: any[]) => {
    const now = Date.now();
    if (now - last >= ms) {
      last = now;
      fn(...args);
    } else {
      clearTimeout(timer);
      timer = window.setTimeout(() => {
        last = Date.now();
        fn(...args);
      }, ms);
    }
  };
};
