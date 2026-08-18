export interface Coach {
  id: string;
  name: string;
  role: string;
  avatar: string;
}

export interface StudentThumb {
  id: string;
  name: string;
  avatar: string;
}

export interface ChatMessage {
  id: string;
  sender: string;
  time: string;
  text: string;
  isYou: boolean;
  avatar?: string;
  isPromo?: boolean;
  promoTitle?: string;
  promoAvatars?: string[];
  promoCta?: string;
}

export interface NavItem {
  label: string;
  section: number;
}
