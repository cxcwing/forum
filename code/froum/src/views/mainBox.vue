<template>
  <div @scroll="mainBoxScroll" class="mainBox">
        <navbar>
    
        </navbar>   
        <router-view></router-view>
  </div>
</template>
<script setup>

import navbar from '@/components/navbar.vue'

</script>

<style>

.mainBox{
    background-color: #f2f3f5;
}

</style>