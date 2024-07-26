<template>
  <div
    ref="cardRef"
    :class="['product-card border p-4 rounded-lg shadow-md transition-transform transform hover:shadow-lg hover:-translate-y-2 relative flex flex-col', { 'opacity-0': !visible, 'opacity-100': visible }]"
  >
    <img :src="product.image" :alt="product.name" class="w-full h-32 object-contain rounded-t-lg" />
    <div class="p-4 flex-grow">
      <h2 class="text-xl font-semibold">{{ product.name }}</h2>
      <p class="mt-2 text-black font-bold text-3xl">{{ formatCurrency(product.price) }}</p>
      <p class="text-green-500">Envío gratis</p>
    </div>
    <button
      @click="addToCart(product)"
      class="mt-4 w-full h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg px-2"
    >
      <div class="text-black text-sm mr-2 text-center">
        Agregar
      </div>
      <span class="text-black text-lg">+</span>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue';
import { useCartStore } from './store/cart';
import { currency } from './store/filters/currency';

export default defineComponent({
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const cartStore = useCartStore();
    const visible = ref(false);
    const cardRef = ref(null);

    const addToCart = (product) => {
      cartStore.addProduct(product);
    };

    const formatCurrency = (value: number) => {
      return currency(value);
    };

    let observer;
    if (typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visible.value = true;
            observer.unobserve(entry.target);
          }
        });
      });
    }

    onMounted(() => {
      if (cardRef.value && observer) {
        observer.observe(cardRef.value);
      } else {
        visible.value = true;
      }
    });

    onBeforeUnmount(() => {
      if (cardRef.value && observer) {
        observer.unobserve(cardRef.value);
      }
    });

    return { addToCart, formatCurrency, visible, cardRef };
  },
});
</script>

<style scoped>
.product-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease, opacity 0.5s ease;
}

.opacity-0 {
  opacity: 0;
}

.opacity-100 {
  opacity: 1;
}
</style>