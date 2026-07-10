import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type ProductRow = {
  id: string;
  slug: string;
  product_name: string;
  product_price: number;
  rental_price: number | null;
  sale_price: number | null;
  category: string | null;
  description: string | null;
  sku: string | null;
  availability: string;
  rental_available: boolean;
  featured: boolean;
  status: string;
  display_order: number;
  image_urls: string[];
  created_at: string;
  updated_at: string;
};

export const formatPrice = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

export function useProducts(opts?: { adminAll?: boolean }) {
  return useQuery({
    queryKey: ["products", opts?.adminAll ? "all" : "visible"],
    queryFn: async () => {
      let q = supabase.from("products").select("*").order("display_order", { ascending: true });
      if (!opts?.adminAll) q = q.eq("status", "visible");
      const { data, error } = await q;
      if (error) throw error;
      return (data ?? []) as ProductRow[];
    },
  });
}

export function useProduct(slug: string | undefined) {
  return useQuery({
    queryKey: ["product", slug],
    enabled: !!slug,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("slug", slug!)
        .maybeSingle();
      if (error) throw error;
      return data as ProductRow | null;
    },
  });
}

export function useFeaturedProducts() {
  return useQuery({
    queryKey: ["featured-products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("status", "visible")
        .eq("featured", true)
        .order("display_order", { ascending: true });
      if (error) throw error;
      return (data ?? []) as ProductRow[];
    },
  });
}

export function useSiteSettings() {
  return useQuery({
    queryKey: ["site-settings"],
    queryFn: async () => {
      const { data, error } = await supabase.from("site_settings").select("*").maybeSingle();
      if (error) throw error;
      return data;
    },
  });
}
