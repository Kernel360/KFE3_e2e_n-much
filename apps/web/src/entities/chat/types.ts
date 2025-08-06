export interface User {
  id: string;
  nick_name: string;
  user_avatar?: string | null;
}

export interface Auction {
  auction_id: string;
  title: string;
  image_urls?: string[];
}

export interface Message {
  id: string;
  chat_room_id: string;
  sender_id: string;
  content: string;
  created_at: string;
  is_read: boolean;
  read_at?: string | null;
  sender?: User;
}

export interface ChatRoom {
  id: string;
  auction_id: string;
  seller_id: string;
  buyer_id: string;
  created_at: string;
  updated_at: string;
  seller?: User;
  buyer?: User;
  auctions?: Auction;
  last_message?: Message[];
  unread_count: number;
}
