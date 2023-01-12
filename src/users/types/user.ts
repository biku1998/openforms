export interface User {
  id: number;
  email: string;
  password: string;
  avatar_url?: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}
