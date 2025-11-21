// Типы для фронтенда (совпадают с бэкендом)

export interface User {
  id: number;
  telegram_id: number;
  first_name: string | null;
  last_name: string | null;
  username: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface City {
  id: number;
  name: string;
  created_at: string;
}

export interface Category {
  id: number;
  name: string;
  created_at: string;
}

export type AdStatus = 'active' | 'sold' | 'deleted';

export interface Ad {
  id: number;
  user_id: number;
  category_id: number;
  city_id: number;
  title: string;
  description: string | null;
  price: number;
  status: AdStatus;
  channel_message_id: number | null;
  channel_username: string | null;
  discussion_group_id: number | null;
  created_at: string;
  updated_at: string;
}

export interface AdImage {
  id: number;
  ad_id: number;
  image_url: string;
  image_order: number;
  created_at: string;
}

export interface AdWithRelations extends Ad {
  user: User;
  category: Category;
  city: City;
  images: AdImage[];
}

