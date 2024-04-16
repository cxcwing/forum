<template>

 <div class="body"><router-view/></div>
</template>

<style lang="scss">
  *{
    margin: 0;
    padding:0  ;
    
  }
  .body{
    background-color: #f2f3f5;
    min-height: 100vh;
  }
  .ck-editor__editable_inline:not(.ck-comment__input *) {
    /* width: 80%; */
    top:30vh;
    min-height: 400px;
    overflow-y: auto;
    max-height: 600px;
}
</style>
