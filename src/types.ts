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
  price: number;
  status: AdStatus;
  preview_image_url: string | null;
  channel_message_id: number | null;
  channel_username: string | null;
  discussion_group_id: number | null;
  discussion_group_username: string | null;
  discussion_group_message_id: number | null;
  created_at: string;
  updated_at: string;
}

export interface AdWithRelations extends Ad {
  user: User;
  category: Category;
  city: City;
}

