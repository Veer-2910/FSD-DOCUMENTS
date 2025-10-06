import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    // Scroll instantly before paint
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
