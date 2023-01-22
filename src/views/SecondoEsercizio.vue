<script setup lang="ts">
  import { descriptor } from '@/store'
  import MultiStepper from '@/components/MultiStepper.vue'

</script>

<template>
  <main class="container">
    <MultiStepper :form=descriptor />
  </main>
</template>

<style scoped>
  main.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
</style>