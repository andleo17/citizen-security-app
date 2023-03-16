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

interface PaginationLink {
  url: string;
  label: string;
  active: boolean;
}

interface Paginable<T = any> {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: PaginationLink[];
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: string;
  to: number;
  total: number;
}

type Polygon = {
  type: "Polygon";
  coordinates: number[][];
};

type LineString = {
  type: "LineString";
  coordinates: number[];
};

type Point = {
  type: "Point";
  coodinates: number[];
};

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
  remember_token?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
  reports?: Report[];
  patrols?: Patrol[];
};

type ReportCategory = {
  id: number;
  name: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
  sub_categories?: ReportSubCategory[];
};

type ReportSubCategory = {
  id: number;
  name: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
  report_category_id: number;
  report_category?: ReportCategory;
  reports?: Report[];
};

type Report = {
  id: number;
  description: string;
  location: Point;
  images?: string[];
  emergency: boolean;
  state: boolean;
  created_at?: string;
  updated_at?: string;
  user_id: number;
  report_sub_category_id?: number;
  user: User;
  report_sub_category?: ReportSubCategory;
};

type Zone = {
  id: number;
  name: string;
  area: Polygon;
  created_at?: string;
  updated_at?: string;
  patrols?: Patrol[];
};

type Car = {
  id: number;
  licensePlate: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
  patrols?: Patrol[];
};

type Patrol = {
  id: number;
  rounds: number;
  distance: number;
  start_at: string;
  end_at: string;
  route?: LineString;
  location?: Point;
  started_at?: string;
  finished_at?: string;
  started: boolean;
  finished: boolean;
  is_current: boolean;
  created_at?: string;
  updated_at?: string;
  user_id: number;
  car_id: number;
  zone_id: number;
  user?: User;
  car?: Car;
  zone?: Zone;
};
