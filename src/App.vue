<template>
  <div class="min-h-screen">
    <div class="p-4 border-b bg-white sticky top-0 z-10">
      <div class="max-w-4xl mx-auto flex items-center gap-3">
        <div class="font-semibold">Phiếu nhận xét</div>
        <div class="flex items-center gap-2">
          <RouterLink
            to="/form1"
            class="px-3 py-1.5 rounded border text-sm hover:bg-gray-50"
            active-class="bg-pink-500 text-white border-pink-500"
          >
            Form 1
          </RouterLink>
          <RouterLink
            to="/form2"
            class="px-3 py-1.5 rounded border text-sm hover:bg-gray-50"
            active-class="bg-pink-500 text-white border-pink-500"
          >
            Form 2
          </RouterLink>
        </div>
      </div>
    </div>

    <RouterView />
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<style lang="scss">
</style>
   