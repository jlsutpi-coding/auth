export type User = {
  id: number;
  username: string;
  email: string;
  display_name: string | null;
  avatar_url: string | null;
  created_at: string; // ISO date string
  updated_at: string;
  last_login_at: string | null;
  is_active: 0 | 1; // or boolean, depending on your DB
  is_verified: 0 | 1;
  role: "user" | "admin"; // adjust as needed
  facebook_id: string | null;
  google_id: string | null;
};
