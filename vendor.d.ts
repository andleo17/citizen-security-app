import type { LoDashStatic } from "lodash";
import type ziggy from "ziggy-js";
import type { Axios } from "axios";
import Pusher from "pusher-js/types/src/core/pusher";
import Echo from "laravel-echo";

declare global {
  var route: typeof ziggy;
  var axios: Axios;
  var Pusher: typeof Pusher;
  var Echo: Echo;
}

enum UserRole {
  Citizen = "Citizen",
  Police = "Police",
  Admin = "Admin",
}

type User = {
  id: number;
  dni: string;
  name: string;
  lastname: string;
  fullname: string;
  email: string;
  phone?: string;
  email_verified_at?: string;
  has_criminal_record: boolean;
  password: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
  reports?: Report[];
};

type ReportCategory = {
  id: number;
  name: string;
  description?: string;
  created_at: string;
  updated_at: string;
  report_subcategories?: ReportSubCategory[];
};

type ReportSubCategory = {
  id: number;
  name: string;
  description?: string;
  created_at: string;
  updated_at: string;
  report_category_id: number;
  report_category: ReportCategory;
};

type Report = {
  id: number;
  description: string;
  location: any;
  images?: string[];
  emergency: boolean;
  state: boolean;
  created_at: string;
  updated_at: string;
  user_id: number;
  user: User;
  report_sub_category_id?: number;
  report_sub_category?: ReportSubCategory;
};
