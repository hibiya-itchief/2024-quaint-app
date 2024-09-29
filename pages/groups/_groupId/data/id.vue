<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col>
          <div style="height: 220px"></div>
          <div v-if="$vuetify.breakpoint.xs" class="container">
            <h3 id="title">第49回星陵祭は終了しました。</h3>
            <h3 id="title">お越しいただき、本当にありがとうございました。</h3>
          </div>
          <div v-else class="container">
            <h2 id="title">第49回星陵祭は終了しました。</h2>
            <h2 id="title">お越しいただき、本当にありがとうございました。</h2>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>
