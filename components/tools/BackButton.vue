<!--一個手前のページに戻すボタンのコンポーネント-->
<template>
  <div>
    <v-btn icon fab small @click="$router.go(-1)">
      <v-icon>mdi-chevron-left</v-icon>
    </v-btn>
  </div>
</template>
