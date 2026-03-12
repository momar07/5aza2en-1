import { createContext, useContext, useState, useCallback } from "react";

const AuthContext = createContext(null);

/**
 * بيانات المستخدمين تُقرأ من .env فقط
 * لا توجد كلمات سر hardcoded في الكود
 * أنشئ ملف .env وضع فيه:
 *   VITE_ADMIN_USER1=admin
 *   VITE_ADMIN_PASS1=YourStrongPassword1
 *   VITE_ADMIN_USER2=manager
 *   VITE_ADMIN_PASS2=YourStrongPassword2
 */
function getUsers() {
  const u1 = import.meta.env.VITE_ADMIN_USER1;
  const p1 = import.meta.env.VITE_ADMIN_PASS1;
  const u2 = import.meta.env.VITE_ADMIN_USER2;
  const p2 = import.meta.env.VITE_ADMIN_PASS2;

  // إذا لم تُعرَّف المتغيرات — ارفض تسجيل الدخول تماماً
  if (!u1 || !p1 || !u2 || !p2) {
    console.error("⚠️ متغيرات البيئة VITE_ADMIN_* غير معرّفة في ملف .env");
    return [];
  }

  return [
    { username: u1, password: p1, role: "admin",   name: "مدير النظام"   },
    { username: u2, password: p2, role: "manager",  name: "مدير المحتوى" },
  ];
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("kk_auth_user");
      return saved ? JSON.parse(saved) : null;
    } catch { return null; }
  });

  const login = useCallback((username, password) => {
    const USERS = getUsers();
    if (USERS.length === 0) {
      return { success: false, message: "خطأ في إعداد النظام — تواصل مع المسؤول" };
    }
    const found = USERS.find(
      u => u.username === username && u.password === password
    );
    if (found) {
      const userData = { username: found.username, role: found.role, name: found.name };
      setUser(userData);
      localStorage.setItem("kk_auth_user", JSON.stringify(userData));
      return { success: true };
    }
    return { success: false, message: "اسم المستخدم أو كلمة المرور غير صحيحة" };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("kk_auth_user");
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuth: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
