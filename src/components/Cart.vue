<template>
  <div class="cart-dropdown absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg z-30">
    <div class="p-4">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold">Carrito de Compras</h2>
        <button @click="clearCart" class="text-red-500 bg-transparent hover:bg-red-100 rounded-full p-1">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="w-5 h-5">
            <path fill="#e73636" d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/>
          </svg>
        </button>
      </div>
      <ul class="cart-items">
        <li v-for="item in cart" :key="item.product.name" class="mb-2 flex justify-between items-center">
          <div>
            <h3 class="font-semibold">{{ item.product.name }}</h3>
            <p class="text-gray-500">{{ item.product.price }} x {{ item.quantity }}</p>
          </div>
          <div class="flex items-center">
            <button @click="decrementQuantity(item.product)" class="px-2 py-1 bg-gray-300 rounded">-</button>
            <span class="mx-2">{{ item.quantity }}</span>
            <button @click="incrementQuantity(item.product)" class="px-2 py-1 bg-gray-300 rounded">+</button>
            <button @click="removeProduct(item.product)" class="ml-2 text-red-500">🗑️</button>
          </div>
        </li>
      </ul>
      <div class="mt-4">
        <p class="text-xl font-bold">Total: {{ totalPrice }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useCartStore } from './store/cart';

export default defineComponent({
  name: 'Cart',
  setup() {
    const cartStore = useCartStore();
    const cart = computed(() => cartStore.cart);
    const totalPrice = computed(() => cartStore.totalPrice);

    const incrementQuantity = (product) => {
      cartStore.incrementQuantity(product);
    };
    const decrementQuantity = (product) => {
      cartStore.decrementQuantity(product);
    };
    const removeProduct = (product) => {
      cartStore.removeProduct(product);
    };
    const clearCart = () => {
      cartStore.clearCart();
    };

    return {
      cart,
      totalPrice,
      incrementQuantity,
      decrementQuantity,
      removeProduct,
      clearCart,
    };
  },
});
</script>

<style scoped>
.cart-dropdown {
  max-height: calc(100vh - 10rem);
  overflow-y: auto;
}

.cart-items {
  max-height: 320px;
  overflow-y: auto;
}

.cart-items::-webkit-scrollbar {
  width: 8px;
}

.cart-items::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.cart-items::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

.cart-items::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>