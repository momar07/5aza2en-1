import { createContext, useContext, useState, useEffect } from "react";
import { initialProducts } from "@/data/initialProducts";
import { initialAds }      from "@/data/initialAds";
import { initialBlog }     from "@/data/initialBlog";

const DataContext = createContext(null);

// ── helper: load from localStorage or fall back to seed data ──
function loadOrSeed(key, seedData) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return seedData;          // ← first visit: use seed
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) return seedData;
    return parsed;
  } catch {
    return seedData;
  }
}

// ── helper: persist to localStorage ──────────────────────────
function persist(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
}

export function DataProvider({ children }) {
  const [products, setProducts] = useState(() => loadOrSeed("kh_products", initialProducts));
  const [ads,      setAds]      = useState(() => loadOrSeed("kh_ads",      initialAds));
  const [blogs,    setBlogs]    = useState(() => loadOrSeed("kh_blogs",    initialBlog));

  // ── sync to localStorage whenever state changes ─────────────
  useEffect(() => { persist("kh_products", products); }, [products]);
  useEffect(() => { persist("kh_ads",      ads);      }, [ads]);
  useEffect(() => { persist("kh_blogs",    blogs);    }, [blogs]);

  // ══════════════ PRODUCTS ══════════════
  const addProduct = (data) => {
    const item = { ...data, id: Date.now(), createdAt: new Date().toISOString() };
    setProducts(prev => [item, ...prev]);
  };
  const updateProduct = (id, data) =>
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...data } : p));
  const deleteProduct = (id) =>
    setProducts(prev => prev.filter(p => p.id !== id));

  // ══════════════ ADS ══════════════════
  const addAd = (data) => {
    const item = { ...data, id: Date.now(), createdAt: new Date().toISOString() };
    setAds(prev => [item, ...prev]);
  };
  const updateAd = (id, data) =>
    setAds(prev => prev.map(a => a.id === id ? { ...a, ...data } : a));
  const deleteAd = (id) =>
    setAds(prev => prev.filter(a => a.id !== id));
  const toggleAd = (id) =>
    setAds(prev => prev.map(a => a.id === id ? { ...a, isActive: !a.isActive, active: !a.isActive } : a));

  // ══════════════ BLOGS ════════════════
  const addBlog = (data) => {
    const item = { ...data, id: Date.now(), createdAt: new Date().toISOString() };
    setBlogs(prev => [item, ...prev]);
  };
  const updateBlog = (id, data) =>
    setBlogs(prev => prev.map(b => b.id === id ? { ...b, ...data } : b));
  const deleteBlog = (id) =>
    setBlogs(prev => prev.filter(b => b.id !== id));

  return (
    <DataContext.Provider value={{
      products, addProduct, updateProduct, deleteProduct,
      ads,      addAd,      updateAd,      deleteAd,      toggleAd,
      blogs,    addBlog,    updateBlog,    deleteBlog,
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used inside DataProvider");
  return ctx;
}
