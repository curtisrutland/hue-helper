<template>
  <v-app dark>
    <v-toolbar app>
      <v-spacer></v-spacer>
      <v-toolbar-title v-text="title" :style="titleStyle"></v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <HueHelper />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import HueHelper from "@/components/HueHelper.vue";

export default {
  name: "App",
  components: {
    HueHelper
  },
  data() {
    return {
      title: "Hue Helper",
      titleStyle: { marginLeft: 0 }
    };
  }
};
</script>
