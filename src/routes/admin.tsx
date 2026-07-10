import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { LogOut, Plus, Pencil, Trash2, Save, ArrowUp, ArrowDown, Star, Eye, EyeOff, Loader2, Upload, X, Settings } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuthUser, useIsAdmin } from "@/lib/use-admin";
import { useProducts, formatPrice, useSiteSettings, type ProductRow } from "@/lib/products-api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export const Route = createFileRoute("/admin")({
  ssr: false,
  head: () => ({ meta: [{ title: "Admin — Cheluve Creations" }, { name: "robots", content: "noindex" }] }),
  component: AdminPage,
});

function AdminPage() {
  const { user, loading } = useAuthUser();
  const { isAdmin, checking } = useIsAdmin(user?.id);

  if (loading || (user && checking)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-royal" />
      </div>
    );
  }
  if (!user) return <LoginCard />;
  if (!isAdmin) return <NotAuthorized email={user.email ?? ""} />;
  return <Dashboard />;
}

function LoginCard() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Signed in");
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        toast.success("Account created — check your email if confirmation is required.");
      }
    } catch (err: any) {
      toast.error(err.message ?? "Authentication failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[color:var(--ivory)] p-6">
      <Card className="w-full max-w-md p-8">
        <div className="text-center">
          <img src="/images/cheluve-logo.png" alt="" className="h-14 mx-auto mb-4" />
          <h1 className="font-display text-3xl">Cheluve Admin</h1>
          <p className="mt-2 text-sm text-foreground/60">
            {mode === "signin" ? "Sign in to manage the catalogue" : "Create your admin account"}
          </p>
        </div>
        <form onSubmit={submit} className="mt-8 space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} autoComplete={mode === "signin" ? "current-password" : "new-password"} />
          </div>
          <Button type="submit" disabled={busy} className="w-full">
            {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : mode === "signin" ? "Sign in" : "Sign up"}
          </Button>
        </form>
        <div className="mt-6 text-center text-sm">
          <button type="button" onClick={() => setMode(mode === "signin" ? "signup" : "signin")} className="text-royal hover:text-gold underline">
            {mode === "signin" ? "Need to create the admin account?" : "Already have an account? Sign in"}
          </button>
        </div>
        <div className="mt-4 text-center">
          <Link to="/" className="text-xs text-foreground/50 hover:text-foreground">← Back to site</Link>
        </div>
      </Card>
    </div>
  );
}

function NotAuthorized({ email }: { email: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <Card className="max-w-md p-8 text-center">
        <h1 className="font-display text-2xl">Not authorised</h1>
        <p className="mt-3 text-sm text-foreground/60">
          The account <strong>{email}</strong> is signed in but does not have admin access.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Button variant="outline" onClick={() => supabase.auth.signOut()}>Sign out</Button>
          <Link to="/" className="inline-flex items-center px-4 py-2 border border-border rounded-md text-sm">Home</Link>
        </div>
      </Card>
    </div>
  );
}

function Dashboard() {
  const { data: products = [], isLoading } = useProducts({ adminAll: true });
  const [editing, setEditing] = useState<ProductRow | "new" | null>(null);
  const [deleting, setDeleting] = useState<ProductRow | null>(null);
  const qc = useQueryClient();

  const signOut = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out");
  };

  const deleteMut = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product deleted");
      setDeleting(null);
    },
    onError: (e: any) => toast.error(e.message),
  });

  const quickUpdate = async (id: string, patch: Partial<ProductRow>) => {
    const { error } = await supabase.from("products").update(patch).eq("id", id);
    if (error) toast.error(error.message);
    else qc.invalidateQueries({ queryKey: ["products"] });
  };

  const move = async (p: ProductRow, direction: -1 | 1) => {
    const sorted = [...products].sort((a, b) => a.display_order - b.display_order);
    const idx = sorted.findIndex((x) => x.id === p.id);
    const swap = sorted[idx + direction];
    if (!swap) return;
    await Promise.all([
      supabase.from("products").update({ display_order: swap.display_order }).eq("id", p.id),
      supabase.from("products").update({ display_order: p.display_order }).eq("id", swap.id),
    ]);
    qc.invalidateQueries({ queryKey: ["products"] });
  };

  return (
    <div className="min-h-screen bg-[color:var(--ivory)]">
      <header className="border-b border-border bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/images/cheluve-logo.png" alt="" className="h-9" />
            <div>
              <h1 className="font-display text-xl">Cheluve Admin</h1>
              <p className="text-[10px] tracking-[0.3em] uppercase text-foreground/50">CMS Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/" className="text-sm text-foreground/70 hover:text-royal">View site</Link>
            <Button variant="ghost" size="sm" onClick={signOut}><LogOut className="w-4 h-4 mr-2" />Sign out</Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <Tabs defaultValue="products">
          <TabsList>
            <TabsTrigger value="products">Products ({products.length})</TabsTrigger>
            <TabsTrigger value="settings"><Settings className="w-4 h-4 mr-2" />Site Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm text-foreground/60">Manage your catalogue. Drag order with the arrows.</p>
              <Button onClick={() => setEditing("new")}><Plus className="w-4 h-4 mr-2" />New product</Button>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-16"><Loader2 className="w-6 h-6 animate-spin text-royal" /></div>
            ) : (
              <div className="grid gap-3">
                {products.map((p) => (
                  <Card key={p.id} className="p-4 flex items-center gap-4">
                    <img src={p.image_urls[0] || "/images/cheluve-logo.png"} alt="" className="w-16 h-20 object-cover bg-[color:var(--ivory)] border border-border" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-display text-lg truncate">{p.product_name}</h3>
                        {p.featured && <span className="text-[9px] tracking-[0.25em] uppercase bg-[color:var(--gold)]/15 text-gold px-2 py-0.5">Featured</span>}
                        {p.status === "hidden" && <span className="text-[9px] tracking-[0.25em] uppercase bg-foreground/10 text-foreground/60 px-2 py-0.5">Hidden</span>}
                      </div>
                      <p className="text-sm text-foreground/60">
                        {p.category ?? "Uncategorised"} · {formatPrice(Number(p.product_price))}
                        {p.rental_available && p.rental_price != null && ` · Rent ${formatPrice(Number(p.rental_price))}`}
                      </p>
                      <p className="text-[10px] text-foreground/40 mt-1">Order #{p.display_order}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button size="icon" variant="ghost" onClick={() => move(p, -1)} title="Move up"><ArrowUp className="w-4 h-4" /></Button>
                      <Button size="icon" variant="ghost" onClick={() => move(p, 1)} title="Move down"><ArrowDown className="w-4 h-4" /></Button>
                      <Button size="icon" variant="ghost" onClick={() => quickUpdate(p.id, { featured: !p.featured })} title="Toggle featured">
                        <Star className={`w-4 h-4 ${p.featured ? "fill-[color:var(--gold)] text-gold" : ""}`} />
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => quickUpdate(p.id, { status: p.status === "visible" ? "hidden" : "visible" })} title="Toggle visibility">
                        {p.status === "visible" ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4 text-foreground/40" />}
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => setEditing(p)}><Pencil className="w-4 h-4" /></Button>
                      <Button size="icon" variant="ghost" onClick={() => setDeleting(p)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                    </div>
                  </Card>
                ))}
                {products.length === 0 && (
                  <p className="text-center text-foreground/50 py-16">No products yet. Click "New product" to add your first piece.</p>
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="settings" className="mt-6">
            <SettingsPanel />
          </TabsContent>
        </Tabs>
      </main>

      {editing && (
        <ProductEditor
          product={editing === "new" ? null : editing}
          nextOrder={Math.max(0, ...products.map((p) => p.display_order)) + 1}
          onClose={() => setEditing(null)}
        />
      )}

      <AlertDialog open={!!deleting} onOpenChange={(o) => !o && setDeleting(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this product?</AlertDialogTitle>
            <AlertDialogDescription>
              "{deleting?.product_name}" will be permanently removed. Uploaded images stay in storage.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleting && deleteMut.mutate(deleting.id)}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function ProductEditor({
  product, nextOrder, onClose,
}: { product: ProductRow | null; nextOrder: number; onClose: () => void }) {
  const qc = useQueryClient();
  const [form, setForm] = useState({
    product_name: product?.product_name ?? "",
    slug: product?.slug ?? "",
    product_price: product?.product_price?.toString() ?? "0",
    rental_price: product?.rental_price?.toString() ?? "",
    sale_price: product?.sale_price?.toString() ?? "",
    category: product?.category ?? "",
    description: product?.description ?? "",
    sku: product?.sku ?? "",
    availability: product?.availability ?? "available",
    rental_available: product?.rental_available ?? false,
    featured: product?.featured ?? false,
    status: product?.status ?? "visible",
    display_order: product?.display_order ?? nextOrder,
    image_urls: product?.image_urls ?? [],
  });
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const update = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) => setForm((f) => ({ ...f, [k]: v }));

  const upload = async (files: FileList | null) => {
    if (!files?.length) return;
    setUploading(true);
    try {
      const urls: string[] = [];
      for (const file of Array.from(files)) {
        const path = `${Date.now()}-${slugify(file.name.replace(/\.[^.]+$/, ""))}.${file.name.split(".").pop()}`;
        const { error } = await supabase.storage.from("product-images").upload(path, file, { cacheControl: "31536000" });
        if (error) throw error;
        const { data } = supabase.storage.from("product-images").getPublicUrl(path);
        urls.push(data.publicUrl);
      }
      update("image_urls", [...form.image_urls, ...urls]);
      toast.success(`${urls.length} image(s) uploaded`);
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (i: number) => update("image_urls", form.image_urls.filter((_, j) => j !== i));

  const save = async () => {
    if (!form.product_name.trim()) return toast.error("Name is required");
    setSaving(true);
    try {
      const payload = {
        product_name: form.product_name.trim(),
        slug: form.slug.trim() || slugify(form.product_name),
        product_price: Number(form.product_price) || 0,
        rental_price: form.rental_price === "" ? null : Number(form.rental_price),
        sale_price: form.sale_price === "" ? null : Number(form.sale_price),
        category: form.category.trim() || null,
        description: form.description.trim() || null,
        sku: form.sku.trim() || null,
        availability: form.availability,
        rental_available: form.rental_available,
        featured: form.featured,
        status: form.status,
        display_order: Number(form.display_order) || 0,
        image_urls: form.image_urls,
      };
      if (product) {
        const { error } = await supabase.from("products").update(payload).eq("id", product.id);
        if (error) throw error;
        toast.success("Product updated");
      } else {
        const { error } = await supabase.from("products").insert(payload);
        if (error) throw error;
        toast.success("Product created");
      }
      qc.invalidateQueries({ queryKey: ["products"] });
      onClose();
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{product ? "Edit product" : "New product"}</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4">
          <div>
            <Label>Images</Label>
            <div className="mt-2 grid grid-cols-4 gap-2">
              {form.image_urls.map((src, i) => (
                <div key={i} className="relative aspect-square group">
                  <img src={src} alt="" className="w-full h-full object-cover border border-border" />
                  <button type="button" onClick={() => removeImage(i)} className="absolute top-1 right-1 bg-black/60 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <X className="w-3 h-3" />
                  </button>
                  {i === 0 && <div className="absolute bottom-1 left-1 text-[9px] tracking-widest uppercase bg-[color:var(--gold)]/95 text-white px-1.5 py-0.5">Cover</div>}
                </div>
              ))}
              <label className="aspect-square border-2 border-dashed border-border flex flex-col items-center justify-center cursor-pointer hover:border-[color:var(--gold)] text-foreground/50 hover:text-foreground text-xs">
                {uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Upload className="w-5 h-5 mb-1" /><span>Upload</span></>}
                <input type="file" accept="image/*" multiple hidden onChange={(e) => upload(e.target.files)} />
              </label>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Label>Name *</Label>
              <Input value={form.product_name} onChange={(e) => update("product_name", e.target.value)} onBlur={() => !form.slug && update("slug", slugify(form.product_name))} />
            </div>
            <div>
              <Label>Slug</Label>
              <Input value={form.slug} onChange={(e) => update("slug", e.target.value)} placeholder="auto from name" />
            </div>
            <div>
              <Label>Category</Label>
              <Input value={form.category} onChange={(e) => update("category", e.target.value)} placeholder="Necklaces, Bangles…" />
            </div>
            <div>
              <Label>Price (INR)</Label>
              <Input type="number" value={form.product_price} onChange={(e) => update("product_price", e.target.value)} />
            </div>
            <div>
              <Label>Sale price (optional)</Label>
              <Input type="number" value={form.sale_price} onChange={(e) => update("sale_price", e.target.value)} placeholder="—" />
            </div>
            <div>
              <Label>Rental price (optional)</Label>
              <Input type="number" value={form.rental_price} onChange={(e) => update("rental_price", e.target.value)} placeholder="—" />
            </div>
            <div>
              <Label>SKU</Label>
              <Input value={form.sku} onChange={(e) => update("sku", e.target.value)} />
            </div>
            <div>
              <Label>Display order</Label>
              <Input type="number" value={form.display_order} onChange={(e) => update("display_order", Number(e.target.value))} />
            </div>
            <div>
              <Label>Availability</Label>
              <select className="mt-2 w-full h-10 border border-input bg-background px-3 rounded-md text-sm" value={form.availability} onChange={(e) => update("availability", e.target.value)}>
                <option value="available">Available</option>
                <option value="out_of_stock">Out of stock</option>
                <option value="rental_only">Rental only</option>
              </select>
            </div>
            <div className="col-span-2">
              <Label>Description</Label>
              <Textarea rows={4} value={form.description} onChange={(e) => update("description", e.target.value)} />
            </div>
            <div className="flex items-center justify-between border border-border rounded-md px-4 py-3">
              <div><Label className="cursor-pointer">Featured</Label><p className="text-xs text-foreground/50">Show a badge on the card</p></div>
              <Switch checked={form.featured} onCheckedChange={(v) => update("featured", v)} />
            </div>
            <div className="flex items-center justify-between border border-border rounded-md px-4 py-3">
              <div><Label className="cursor-pointer">Available for rent</Label><p className="text-xs text-foreground/50">Show rental price</p></div>
              <Switch checked={form.rental_available} onCheckedChange={(v) => update("rental_available", v)} />
            </div>
            <div className="col-span-2 flex items-center justify-between border border-border rounded-md px-4 py-3">
              <div><Label className="cursor-pointer">Visible on site</Label><p className="text-xs text-foreground/50">Hidden products only show in admin</p></div>
              <Switch checked={form.status === "visible"} onCheckedChange={(v) => update("status", v ? "visible" : "hidden")} />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={save} disabled={saving}>
            {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function SettingsPanel() {
  const { data, isLoading } = useSiteSettings();
  const qc = useQueryClient();
  const [form, setForm] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => { if (data) setForm(data); }, [data]);

  if (isLoading || !form) return <Loader2 className="w-6 h-6 animate-spin text-royal" />;

  const save = async () => {
    setSaving(true);
    const { error } = await supabase.from("site_settings").update({
      business_name: form.business_name,
      logo_url: form.logo_url,
      whatsapp_number: form.whatsapp_number,
      instagram_url: form.instagram_url,
      facebook_url: form.facebook_url,
      contact_email: form.contact_email,
      contact_phone: form.contact_phone,
      contact_location: form.contact_location,
    }).eq("id", true);
    setSaving(false);
    if (error) toast.error(error.message);
    else { toast.success("Settings saved"); qc.invalidateQueries({ queryKey: ["site-settings"] }); }
  };

  const upd = (k: string, v: string) => setForm({ ...form, [k]: v });

  return (
    <Card className="p-6 max-w-2xl">
      <h2 className="font-display text-2xl mb-6">Site settings</h2>
      <div className="grid gap-4">
        <div><Label>Business name</Label><Input value={form.business_name ?? ""} onChange={(e) => upd("business_name", e.target.value)} /></div>
        <div><Label>Logo URL</Label><Input value={form.logo_url ?? ""} onChange={(e) => upd("logo_url", e.target.value)} placeholder="/images/cheluve-logo.png" /></div>
        <div className="grid grid-cols-2 gap-4">
          <div><Label>WhatsApp number</Label><Input value={form.whatsapp_number ?? ""} onChange={(e) => upd("whatsapp_number", e.target.value)} placeholder="919380637389" /></div>
          <div><Label>Contact phone</Label><Input value={form.contact_phone ?? ""} onChange={(e) => upd("contact_phone", e.target.value)} /></div>
        </div>
        <div><Label>Contact email</Label><Input value={form.contact_email ?? ""} onChange={(e) => upd("contact_email", e.target.value)} /></div>
        <div><Label>Contact location</Label><Input value={form.contact_location ?? ""} onChange={(e) => upd("contact_location", e.target.value)} /></div>
        <div><Label>Instagram URL</Label><Input value={form.instagram_url ?? ""} onChange={(e) => upd("instagram_url", e.target.value)} /></div>
        <div><Label>Facebook URL</Label><Input value={form.facebook_url ?? ""} onChange={(e) => upd("facebook_url", e.target.value)} /></div>
        <div className="pt-2">
          <Button onClick={save} disabled={saving}>
            {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />} Save changes
          </Button>
        </div>
      </div>
    </Card>
  );
}
