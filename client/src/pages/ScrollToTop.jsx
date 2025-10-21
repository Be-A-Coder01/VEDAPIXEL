// pages/ScrollToTop.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // ✅ Scroll smoothly to top on route change
    window.scrollTo({
      top: 1,
      behavior: "instant",
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
