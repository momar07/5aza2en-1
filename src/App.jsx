import { Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import ScrollToTop        from "@/components/ScrollToTop";
import MainLayout         from "@/components/layout/MainLayout";
import ProtectedRoute     from "@/components/layout/ProtectedRoute";

// Public pages
import Home               from "@/pages/Home";
import Services           from "@/pages/Services";
import Products           from "@/pages/Products";
import Ads                from "@/pages/Ads";
import Blog               from "@/pages/Blog";
import BlogPost           from "@/pages/BlogPost";
import Contact            from "@/pages/Contact";
import NotFound           from "@/pages/NotFound";

// Dashboard pages
import Login              from "@/pages/dashboard/Login";
import DashboardLayout    from "@/pages/dashboard/DashboardLayout";
import ManageProducts     from "@/pages/dashboard/ManageProducts";
import ManageAds          from "@/pages/dashboard/ManageAds";
import ManageBlog         from "@/pages/dashboard/ManageBlog";

export default function App() {
  return (
    <>
      {/* ✅ يُعيد الصفحة للأعلى عند كل انتقال */}
      <ScrollToTop />

      <AnimatePresence mode="wait">
        <Routes>

          {/* ── Public Routes ───────────────────────── */}
          <Route element={<MainLayout />}>
            <Route path="/"        element={<Home />}     />
            <Route path="/services" element={<Services />} />
            <Route path="/products" element={<Products />} />
            <Route path="/ads"      element={<Ads />}      />
            <Route path="/blog"     element={<Blog />}     />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/contact"  element={<Contact />}  />
          </Route>

          {/* ── Dashboard Routes ────────────────────── */}
          <Route path="/dashboard/login" element={<Login />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index                element={<Navigate to="/dashboard/products" replace />} />
            <Route path="products"      element={<ManageProducts />} />
            <Route path="ads"           element={<ManageAds />}      />
            <Route path="blog"          element={<ManageBlog />}     />
          </Route>

          {/* ── 404 ─────────────────────────────────── */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </AnimatePresence>
    </>
  );
}
