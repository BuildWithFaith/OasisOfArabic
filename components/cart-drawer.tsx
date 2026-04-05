"use client";

import * as React from 'react';
import { Drawer } from '@base-ui/react/drawer';
import { useCartStore } from '@/lib/store/cart-store';
import { ShoppingCart, X, Trash2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, clearCart } = useCartStore();
  
  const totalPrice = items.reduce((sum, item) => sum + Number(item.price), 0);
  const currency = items.length > 0 ? items[0].currency : 'USD';

  return (
    <Drawer.Root open={isOpen} onOpenChange={setIsOpen}>
      <Drawer.Portal>
        <Drawer.Backdrop className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 transition-opacity duration-300 data-[state=closed]:opacity-0" />
        <Drawer.Popup className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col transition-transform duration-300 ease-out data-[state=closed]:translate-x-full">
          <div className="flex items-center justify-between p-6 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 text-emerald-700 rounded-xl">
                <ShoppingCart className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Your Cart</h2>
              <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full text-xs font-bold">
                {items.length}
              </span>
            </div>
            <Drawer.Close className="p-2 hover:bg-slate-100 rounded-full transition-colors">
              <X className="w-5 h-5 text-slate-400" />
            </Drawer.Close>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center">
                  <ShoppingCart className="w-8 h-8 text-slate-200" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Your cart is empty</h3>
                  <p className="text-slate-500 max-w-[240px] mt-1">
                    Looks like you haven't added any courses to your cart yet.
                  </p>
                </div>
                <Drawer.Close className="text-emerald-600 font-bold hover:text-emerald-500 transition-colors">
                  Continue Browsing
                </Drawer.Close>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex gap-4 group">
                  <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-slate-100 shrink-0">
                    {item.imageUrl && (
                      <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-slate-900 leading-tight line-clamp-2">
                        {item.title}
                      </h4>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="p-1 text-slate-300 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="mt-auto flex justify-between items-end">
                      <span className="text-emerald-600 font-bold">
                        {item.currency} {item.price}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {items.length > 0 && (
            <div className="p-6 border-t border-slate-100 bg-slate-50/50">
              <div className="flex justify-between items-center mb-6">
                <span className="text-slate-500 font-medium">Total Amount</span>
                <span className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  {currency} {totalPrice.toFixed(2)}
                </span>
              </div>
              
              <div className="space-y-3">
                <Link 
                  href="/checkout" 
                  onClick={() => setIsOpen(false)}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-sm active:scale-[0.98]"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <button 
                  onClick={clearCart}
                  className="w-full text-slate-400 hover:text-slate-600 font-medium text-sm transition-colors py-2"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          )}
        </Drawer.Popup>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
