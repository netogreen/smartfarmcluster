import { supabase, isSupabaseConfigured } from "./supabase";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";

const DB_PATH = join(process.cwd(), "data", "applications.json");

export interface Application {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  is_successor_farmer: string;
  region: string;
  crop: string;
  budget_eok: number;
  estimated_area: number;
  estimated_modules: number;
  recommended_note: string;
  deposit_example: number;
  timing: string;
  wants_consultation: boolean;
  status: string;
  created_at: string;
}

// ── 로컬 파일 DB (Supabase 미설정 시 fallback) ──

function ensureLocalDb(): Application[] {
  if (!existsSync(DB_PATH)) {
    const dir = join(process.cwd(), "data");
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
    writeFileSync(DB_PATH, "[]", "utf-8");
    return [];
  }
  try {
    return JSON.parse(readFileSync(DB_PATH, "utf-8"));
  } catch {
    return [];
  }
}

// ── 통합 함수 (Supabase 있으면 Supabase, 없으면 로컬) ──

export async function getApplications(): Promise<Application[]> {
  if (isSupabaseConfigured() && supabase) {
    const { data, error } = await supabase
      .from("applications")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data || [];
  }
  return ensureLocalDb();
}

export async function addApplication(
  data: Omit<Application, "id" | "status" | "created_at">
): Promise<Application> {
  const newApp: Application = {
    ...data,
    id: `APP-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    status: "신규",
    created_at: new Date().toISOString(),
  };

  if (isSupabaseConfigured() && supabase) {
    const { error } = await supabase.from("applications").insert(newApp);
    if (error) throw new Error(error.message);
    return newApp;
  }

  const apps = ensureLocalDb();
  apps.push(newApp);
  writeFileSync(DB_PATH, JSON.stringify(apps, null, 2), "utf-8");
  return newApp;
}

export async function updateApplicationStatus(
  id: string,
  status: string
): Promise<Application | null> {
  if (isSupabaseConfigured() && supabase) {
    const { data, error } = await supabase
      .from("applications")
      .update({ status })
      .eq("id", id)
      .select()
      .single();
    if (error) return null;
    return data;
  }

  const apps = ensureLocalDb();
  const idx = apps.findIndex((a) => a.id === id);
  if (idx === -1) return null;
  apps[idx].status = status;
  writeFileSync(DB_PATH, JSON.stringify(apps, null, 2), "utf-8");
  return apps[idx];
}

export async function deleteApplication(id: string): Promise<boolean> {
  if (isSupabaseConfigured() && supabase) {
    const { error } = await supabase.from("applications").delete().eq("id", id);
    if (error) console.error("[DB] 삭제 실패:", error.message);
    return !error;
  }

  const apps = ensureLocalDb();
  const filtered = apps.filter((a) => a.id !== id);
  if (filtered.length === apps.length) return false;
  writeFileSync(DB_PATH, JSON.stringify(filtered, null, 2), "utf-8");
  return true;
}

export async function deleteApplications(ids: string[]): Promise<boolean> {
  if (isSupabaseConfigured() && supabase) {
    const { error } = await supabase.from("applications").delete().in("id", ids);
    if (error) console.error("[DB] 일괄 삭제 실패:", error.message);
    return !error;
  }

  const apps = ensureLocalDb();
  const filtered = apps.filter((a) => !ids.includes(a.id));
  writeFileSync(DB_PATH, JSON.stringify(filtered, null, 2), "utf-8");
  return true;
}
