<template>
    <div>
      <NavBar @filterCategory="handleFilterCategory" @searchProducts="handleSearchProducts" />
      <main class="container mx-auto mt-8">
        <h1 class="text-3xl font-bold">Productos Destacados</h1>
        <div v-if="filteredCategory" class="inline-flex items-center bg-gray-200 rounded-full px-4 py-2 mt-4">
          <span class="text-gray-700 font-semibold">{{ filteredCategory }}</span>
          <button @click="clearFilter" class="ml-2 text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          <ProductCard
            v-for="product in filteredProducts"
            :key="product.id"
            :product="product"
          />
        </div>
      </main>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue';
  import NavBar from '../components/NavBar.vue';
  import ProductCard from '../components/ProductCard.vue';
  import products from '../components/store/products.json';
  
  const filteredCategory = ref('');
  const searchQuery = ref('');
  
  const filteredProducts = computed(() => {
    return products.filter(product => {
      const matchesCategory = filteredCategory.value ? product.category === filteredCategory.value : true;
      const matchesSearch = searchQuery.value ? product.name.toLowerCase().includes(searchQuery.value.toLowerCase()) || product.category.toLowerCase().includes(searchQuery.value.toLowerCase()) : true;
      return matchesCategory && matchesSearch;
    });
  });
  
  function handleFilterCategory(category) {
    filteredCategory.value = category;
  }
  
  function handleSearchProducts(query) {
    searchQuery.value = query;
  }
  
  function clearFilter() {
    filteredCategory.value = '';
  }
  </script>