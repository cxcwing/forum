<template>
    <div>
        home{{ a }}
        <button @click="back">{{ a }}</button>
    </div>
</template>
<script setup>

import { ref } from 'vue'
let a = ref('a')
const back =()=>{

    a.value === 'a'?a.value = 'b':a.value = 'a' 
    console.log(a.value)
}


</script>