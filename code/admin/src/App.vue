<template>
  <router-view/>
</template>

<style>
*{
  margin: 0;
  padding: 0;
}
::-webkit-scrollbar{
  width:5px;
  height: 5px;
  position:absolute;
}

::-webkit-scrollbar-track{
  background:#ddd;
}

::-webkit-scrollbar-thumb{
  background:#1890ff;
}
.ck-editor__editable_inline:not(.ck-comment__input *) {
    /* width: 80%; */
    min-height: 400px;
    overflow-y: auto;
    max-height: 600px;
}
</style>