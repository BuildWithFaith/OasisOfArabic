import { create } from 'zustand';
import { Customer } from '../types-improved';
import { authClient } from '../auth-client';

// Define permission levels for admin access
export enum AdminPermission {
  NONE = 'none',
  READ_ONLY = 'readonly',
  FULL_ACCESS = 'admin'
}

interface User {
  $id?: string;
  id?: string;
  name: string;
  email: string;
  phone?: string;
  labels?: string[];
  role?: string;
  [key: string]: any;
}

interface AuthStore {
  user: User | null;
  customer: Customer | null;
  isAdmin: boolean;
  isReadOnly: boolean;
  adminPermission: AdminPermission;
  loading: boolean;
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
  setCustomer: (customer: Customer | null) => void;
  hasWritePermission: () => boolean;
  hasReadPermission: () => boolean;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  customer: null,
  isAdmin: false,
  isReadOnly: false,
  adminPermission: AdminPermission.NONE,
  loading: true,
  
  checkAuth: async () => {
    try {
      const { data } = await authClient.getSession();
      
      if (!data || !data.user) {
        throw new Error('No active session found.');
      }
      
      const user = data.user as unknown as User;
      
      // Map Better Auth role or user properties to permissions
      const hasAdminLabel = user.role === 'admin' || (user.labels && user.labels.includes('admin'));
      const hasReadOnlyLabel = user.role === 'readonly' || (user.labels && user.labels.includes('readonly'));
      
      let adminPermission = AdminPermission.NONE;
      if (hasAdminLabel) {
        adminPermission = AdminPermission.FULL_ACCESS;
      } else if (hasReadOnlyLabel) {
        adminPermission = AdminPermission.READ_ONLY;
      }
      
      set({ 
        user, 
        customer: null, // Depending on if customer is still needed or retrieved from DB
        isAdmin: !!hasAdminLabel,
        isReadOnly: !!hasReadOnlyLabel,
        adminPermission,
        loading: false 
      });
    } catch (error) {
      set({ 
        user: null, 
        customer: null, 
        isAdmin: false, 
        isReadOnly: false,
        adminPermission: AdminPermission.NONE,
        loading: false 
      });
    }
  },
  
  logout: async () => {
    try {
      await authClient.signOut();
      
      set({ 
        user: null, 
        customer: null, 
        isAdmin: false,
        isReadOnly: false,
        adminPermission: AdminPermission.NONE,
        loading: false 
      });
      window.location.href = '/';
    } catch (error) {
      console.error('Error logging out:', error);
    }
  },
  
  setCustomer: (customer: Customer | null) => {
    set({ customer });
  },
  
  // Utility methods for permission checking
  hasWritePermission: () => get().adminPermission === AdminPermission.FULL_ACCESS,
  hasReadPermission: () => get().adminPermission !== AdminPermission.NONE,
}));
