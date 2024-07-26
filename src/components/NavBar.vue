<template>
    <nav class="bg-yellow-400 p-4 relative z-20">
      <div class="container mx-auto flex justify-between items-center">
        <div class="flex items-center animate-fade-in">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-6 h-6 mr-2">
            <path fill="#ffffff" d="M176 24c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40c-35.3 0-64 28.7-64 64l-40 0c-13.3 0-24 10.7-24 24s10.7 24 24 24l40 0 0 56-40 0c-13.3 0-24 10.7-24 24s10.7 24 24 24l40 0 0 56-40 0c-13.3 0-24 10.7-24 24s10.7 24 24 24l40 0c0 35.3 28.7 64 64 64l0 40c0 13.3 10.7 24 24 24s24-10.7 24-24l0-40 56 0 0 40c0 13.3 10.7 24 24 24s24-10.7 24-24l0-40 56 0 0 40c0 13.3 10.7 24 24 24s24-10.7 24-24l0-40c35.3 0 64-28.7 64-64l40 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-40 0 0-56 40 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-40 0 0-56 40 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-40 0c0-35.3-28.7-64-64-64l0-40c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40-56 0 0-40c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40-56 0 0-40zM160 128l192 0c17.7 0 32 14.3 32 32l0 192c0 17.7-14.3 32-32 32l-192 0c-17.7 0-32-14.3-32-32l0-192c0-17.7 14.3-32 32-32zm192 32l-192 0 0 192 192 0 0-192z"/>
          </svg>
          <div class="text-2xl font-bold text-white">Hardware Store</div>
        </div>
        <div class="relative w-1/3 animate-fade-in">
          <input
            type="text"
            v-model="searchQuery"
            @input="handleSearch"
            class="w-full p-2 border rounded shadow-lg"
            placeholder="Buscar productos, categorias y más..."
          />
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="absolute top-0 right-0 mt-3 mr-3 w-4 h-4 text-gray-500">
            <path fill="currentColor" d="M500.3 481.7l-123.1-123.1c28.5-35.3 45.8-80.5 45.8-129.6C423 104.5 329.5 11 213 11S3 104.5 3 229.1s93.5 218.1 210 218.1c49.1 0 94.3-17.3 129.6-45.8l123.1 123.1c6.3 6.3 14.4 9.4 22.5 9.4s16.3-3.1 22.5-9.4c12.5-12.5 12.5-32.8 0-45.3zM213 370.2c-77.7 0-141-63.3-141-141S135.3 88.1 213 88.1s141 63.3 141 141-63.3 141-141 141z"/>
          </svg>
        </div>
        <div class="relative animate-fade-in">
          <button @click="toggleCart" class="relative flex items-center">
            <span class="text-2xl ml-2">🛒</span>
            <span v-if="totalItems > 0" class="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
              {{ totalItems > 10 ? '+10' : totalItems }}
            </span>
          </button>
          <Cart v-if="isCartVisible" />
        </div>
      </div>
      <div class="mt-4 text-center animate-fade-in">
        <ul class="inline-flex space-x-4">
          <li>
            <a href="#memorias" class="text-white hover:underline flex items-center" @click.prevent="selectCategory('Memorias')">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-6 h-6 mr-1">
                <path fill="#ffffff" d="M64 64C28.7 64 0 92.7 0 128l0 7.4c0 6.8 4.4 12.6 10.1 16.3C23.3 160.3 32 175.1 32 192s-8.7 31.7-21.9 40.3C4.4 236 0 241.8 0 248.6L0 320l576 0 0-71.4c0-6.8-4.4-12.6-10.1-16.3C552.7 223.7 544 208.9 544 192s8.7-31.7 21.9-40.3c5.7-3.7 10.1-9.5 10.1-16.3l0-7.4c0-35.3-28.7-64-64-64L64 64zM576 352L0 352l0 64c0 17.7 14.3 32 32 32l48 0 0-32c0-8.8 7.2-16 16-16s16 7.2 16 16l0 32 96 0 0-32c0-8.8 7.2-16 16-16s16 7.2 16 16l0 32 96 0 0-32c0-8.8 7.2-16 16-16s16 7.2 16 16l0 32 96 0 0-32c0-8.8 7.2-16 16-16s16 7.2 16 16l0 32 48 0c17.7 0 32-14.3 32-32l0-64zM192 160l0 64c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32s32 14.3 32 32zm128 0l0 64c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32s32 14.3 32 32zm128 0l0 64c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32s32 14.3 32 32z"/>
              </svg>
              Memorias
            </a>
          </li>
          <li>
            <a href="#coolers" class="text-white hover:underline flex items-center" @click.prevent="selectCategory('Coolers')">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-6 h-6 mr-1">
                <path fill="#ffffff" d="M258.6 0c-1.7 0-3.4 .1-5.1 .5C168 17 115.6 102.3 130.5 189.3c2.9 17 8.4 32.9 15.9 47.4L32 224l-2.6 0C13.2 224 0 237.2 0 253.4c0 1.7 .1 3.4 .5 5.1C17 344 102.3 396.4 189.3 381.5c17-2.9 32.9-8.4 47.4-15.9L224 480l0 2.6c0 16.2 13.2 29.4 29.4 29.4c1.7 0 3.4-.1 5.1-.5C344 495 396.4 409.7 381.5 322.7c-2.9-17-8.4-32.9-15.9-47.4L480 288l2.6 0c16.2 0 29.4-13.2 29.4-29.4c0-1.7-.1-3.4-.5-5.1C495 168 409.7 115.6 322.7 130.5c-17 2.9-32.9 8.4-47.4 15.9L288 32l0-2.6C288 13.2 274.8 0 258.6 0zM256 224a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/>
              </svg>
              Coolers
            </a>
          </li>
          <li>
            <a href="#gabinetes" class="text-white hover:underline flex items-center" @click.prevent="selectCategory('Gabinetes')">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 650 512" class="w-6 h-6 mr-2">
                <path fill="#ffffff" d="M384 96l0 224L64 320 64 96l320 0zM64 32C28.7 32 0 60.7 0 96L0 320c0 35.3 28.7 64 64 64l117.3 0-10.7 32L96 416c-17.7 0-32 14.3-32 32s14.3 32 32 32l256 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-74.7 0-10.7-32L384 384c35.3 0 64-28.7 64-64l0-224c0-35.3-28.7-64-64-64L64 32zm464 0c-26.5 0-48 21.5-48 48l0 352c0 26.5 21.5 48 48 48l64 0c26.5 0 48-21.5 48-48l0-352c0-26.5-21.5-48-48-48l-64 0zm16 64l32 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16s7.2-16 16-16zm-16 80c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16zm32 160a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/>
              </svg>
              Gabinetes
            </a>
          </li>
          <li>
            <a href="#impresoras" class="text-white hover:underline flex items-center" @click.prevent="selectCategory('Impresoras')">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-6 h-6 mr-1">
                <path fill="#ffffff" d="M128 0C92.7 0 64 28.7 64 64l0 96 64 0 0-96 226.7 0L384 93.3l0 66.7 64 0 0-66.7c0-17-6.7-33.3-18.7-45.3L400 18.7C388 6.7 371.7 0 354.7 0L128 0zM384 352l0 32 0 64-256 0 0-64 0-16 0-16 256 0zm64 32l32 0c17.7 0 32-14.3 32-32l0-96c0-35.3-28.7-64-64-64L64 192c-35.3 0-64 28.7-64 64l0 96c0 17.7 14.3 32 32 32l32 0 0 64c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-64zM432 248a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"/>
              </svg>
              Impresoras
            </a>
          </li>
          <li>
            <a href="#notebooks" class="text-white hover:underline flex items-center" @click.prevent="selectCategory('Notebooks')">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 590 512" class="w-6 h-6 mr-1">
                <path fill="#ffffff" d="M128 32C92.7 32 64 60.7 64 96l0 256 64 0 0-256 384 0 0 256 64 0 0-256c0-35.3-28.7-64-64-64L128 32zM19.2 384C8.6 384 0 392.6 0 403.2C0 445.6 34.4 480 76.8 480l486.4 0c42.4 0 76.8-34.4 76.8-76.8c0-10.6-8.6-19.2-19.2-19.2L19.2 384z"/>
              </svg>
              Notebooks
            </a>
          </li>
          <li>
            <a href="#mouses" class="text-white hover:underline flex items-center" @click.prevent="selectCategory('Mouses')">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-6 h-6 mr-1">
                <path fill="#ffffff" d="M0 192l176 0L176 0 160 0C71.6 0 0 71.6 0 160l0 32zm0 32L0 352c0 88.4 71.6 160 160 160l64 0c88.4 0 160-71.6 160-160l0-128-192 0L0 224zm384-32l0-32C384 71.6 312.4 0 224 0L208 0l0 192 176 0z"/>
              </svg>
              Mouses
            </a>
          </li>
          <li>
            <a href="#teclados" class="text-white hover:underline flex items-center" @click.prevent="selectCategory('Teclados')">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 580 512" class="w-6 h-6 mr-1">
                <path fill="#ffffff" d="M64 64C28.7 64 0 92.7 0 128L0 384c0 35.3 28.7 64 64 64l448 0c35.3 0 64-28.7 64-64l0-256c0-35.3-28.7-64-64-64L64 64zm16 64l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16zM64 240c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32zm16 80l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16zm80-176c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32zm16 80l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16zM160 336c0-8.8 7.2-16 16-16l224 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-224 0c-8.8 0-16-7.2-16-16l0-32zM272 128l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16zM256 240c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32zM368 128l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16zM352 240c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32zM464 128l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16zM448 240c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32zm16 80l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16z"/>
              </svg>
              Teclados
            </a>
          </li>
          <li>
            <a href="#monitores" class="text-white hover:underline flex items-center" @click.prevent="selectCategory('Monitores')">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 590 512" class="w-6 h-6 mr-1">
                <path fill="#ffffff" d="M64 0C28.7 0 0 28.7 0 64L0 352c0 35.3 28.7 64 64 64l176 0-10.7 32L160 448c-17.7 0-32 14.3-32 32s14.3 32 32 32l256 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-69.3 0L336 416l176 0c35.3 0 64-28.7 64-64l0-288c0-35.3-28.7-64-64-64L64 0zM512 64l0 224L64 288 64 64l448 0z"/>
              </svg>
              Monitores
            </a>
          </li>
          <li>
            <a href="#auriculares" class="text-white hover:underline flex items-center" @click.prevent="selectCategory('Auriculares')">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-6 h-6 mr-1">
                <path fill="#ffffff" d="M256 80C149.9 80 62.4 159.4 49.6 262c9.4-3.8 19.6-6 30.4-6c26.5 0 48 21.5 48 48l0 128c0 26.5-21.5 48-48 48c-44.2 0-80-35.8-80-80l0-16 0-48 0-48C0 146.6 114.6 32 256 32s256 114.6 256 256l0 48 0 48 0 16c0 44.2-35.8 80-80 80c-26.5 0-48-21.5-48-48l0-128c0-26.5 21.5-48 48-48c10.8 0 21 2.1 30.4 6C449.6 159.4 362.1 80 256 80z"/>
              </svg>
              Auriculares
            </a>
          </li>
          <li>
            <a href="#discos" class="text-white hover:underline flex items-center" @click.prevent="selectCategory('Discos Duros')">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-6 h-6 mr-1">
                <path fill="#ffffff" d="M0 96C0 60.7 28.7 32 64 32l384 0c35.3 0 64 28.7 64 64l0 184.4c-17-15.2-39.4-24.4-64-24.4L64 256c-24.6 0-47 9.2-64 24.4L0 96zM64 288l384 0c35.3 0 64 28.7 64 64l0 64c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64l0-64c0-35.3 28.7-64 64-64zM320 416a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm128-32a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"/>
              </svg>
              Discos Duros
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, computed } from 'vue';
  import { useCartStore } from './store/cart';
  import Cart from './Cart.vue';
  
  export default defineComponent({
    name: 'NavBar',
    components: {
      Cart,
    },
    emits: ['filterCategory', 'searchProducts'],
    setup(_, { emit }) {
      const cartStore = useCartStore();
      const isCartVisible = ref(false);
      const searchQuery = ref('');
  
      const toggleCart = () => {
        isCartVisible.value = !isCartVisible.value;
      };
  
      const totalItems = computed(() => cartStore.cart.length ? cartStore.cart.reduce((total, item) => total + item.quantity, 0) : 0);
  
      const selectCategory = (category: string) => {
        emit('filterCategory', category);
      };
  
      const handleSearch = () => {
        emit('searchProducts', searchQuery.value);
      };
  
      return {
        isCartVisible,
        toggleCart,
        totalItems,
        selectCategory,
        searchQuery,
        handleSearch,
      };
    },
  });
  </script>
  
  <style scoped>
  .shadow-lg {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .text-white {
    color: white;
  }
  
  .animate-fade-in {
    animation: fade-in 1s ease-in-out;
  }
  
  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  </style>