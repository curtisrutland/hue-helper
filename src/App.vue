<template>
  <v-app>
    <v-toolbar app color="white">
      <v-spacer></v-spacer>
      <v-toolbar-title v-text="title" :style="titleStyle"></v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <v-slide-y-transition mode="out-in">
          <v-layout column align-center>
            <LightPanel :groupId="1" />
          </v-layout>
        </v-slide-y-transition>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import LightPanel from "@/components/LightPanel.vue";

export default {
  name: "App",
  components: {
    LightPanel
  },
  data() {
    return {
      title: "Hue Helper",
      titleStyle: { marginLeft: 0 }
    };
  }
};
</script>
