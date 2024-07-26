import { reactive, computed } from 'vue';
import { currency } from './filters/currency';

interface Product {
  name: string;
  price: number;
  image: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

const state = reactive<{ cart: CartItem[] }>({
  cart: []
});

const addProduct = (product: Product) => {
  const existingItem = state.cart.find(item => item.product.name === product.name);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    state.cart.push({ product, quantity: 1 });
  }
};

const incrementQuantity = (product: Product) => {
  const item = state.cart.find(item => item.product.name === product.name);
  if (item) {
    item.quantity += 1;
  }
};

const decrementQuantity = (product: Product) => {
  const item = state.cart.find(item => item.product.name === product.name);
  if (item) {
    item.quantity -= 1;
    if (item.quantity === 0) {
      removeProduct(product);
    }
  }
};

const removeProduct = (product: Product) => {
  const index = state.cart.findIndex(item => item.product.name === product.name);
  if (index !== -1) {
    state.cart.splice(index, 1);
  }
};

const clearCart = () => {
  state.cart.length = 0;
};

const totalPrice = computed(() => {
  const total = state.cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  return currency(total);
});

export const useCartStore = () => {
  return {
    cart: state.cart,
    addProduct,
    incrementQuantity,
    decrementQuantity,
    removeProduct,
    clearCart,
    totalPrice
  };
};