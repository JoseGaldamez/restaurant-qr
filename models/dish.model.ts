export interface DishModel {
  id: string;
  name: string;
  description: string;
  price: number;
  picture_url: string;
  category_id: string;
  menu_id: string;
  user_id: string;
  created_at: Date;
}
