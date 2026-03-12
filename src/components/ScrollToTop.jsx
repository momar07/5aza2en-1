import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop
 * يُعيد الصفحة للأعلى فوراً عند كل تغيير في الـ route
 * يُستخدم داخل <BrowserRouter> مباشرةً في App.jsx
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // instant بدون animation عشان ما يحس المستخدم بأي تأخير
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null; // مكوّن غير مرئي
}
