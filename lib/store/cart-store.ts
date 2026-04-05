import { create } from 'zustand';
import { Course } from '../types';
import Cookies from 'js-cookie';

interface CartStore {
  items: Course[];
  isOpen: boolean;
  addItem: (course: Course) => void;
  removeItem: (courseId: string) => void;
  clearCart: () => void;
  setIsOpen: (isOpen: boolean) => void;
  toggleCart: () => void;
}

const CART_COOKIE_NAME = 'cart_items';

// Helper to get initial items from cookies
const getInitialItems = (): Course[] => {
  if (typeof window === 'undefined') return [];
  const savedCart = Cookies.get(CART_COOKIE_NAME);
  try {
    return savedCart ? JSON.parse(savedCart) : [];
  } catch (e) {
    return [];
  }
};

export const useCartStore = create<CartStore>((set, get) => ({
  items: getInitialItems(),
  isOpen: false,
  
  addItem: (course: Course) => {
    const { items } = get();
    const exists = items.find((item) => item.id === course.id);
    
    if (!exists) {
      const newItems = [...items, course];
      set({ items: newItems });
      Cookies.set(CART_COOKIE_NAME, JSON.stringify(newItems), { expires: 7 });
    }
    
    // Open drawer when adding items
    set({ isOpen: true });
  },
  
  removeItem: (courseId: string) => {
    const { items } = get();
    const newItems = items.filter((item) => item.id !== courseId);
    set({ items: newItems });
    Cookies.set(CART_COOKIE_NAME, JSON.stringify(newItems), { expires: 7 });
  },
  
  clearCart: () => {
    set({ items: [] });
    Cookies.remove(CART_COOKIE_NAME);
  },
  
  setIsOpen: (isOpen: boolean) => set({ isOpen }),
  
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
}));
