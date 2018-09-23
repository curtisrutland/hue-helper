<template>
  <v-card class="card">
    <v-card-title primary-title>
      <div class="headline">Please Press the Connect Button on Your Hue Bridge</div>
    </v-card-title>
    <v-layout column align-center justify-center style="height: 200px">
      <v-progress-circular 
        :size="100"
        :width="7"
        color="purple"
        indeterminate />
    </v-layout>
  </v-card>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { State, Action } from "vuex-class";
import { HueState, bindingOptions as hueBinding } from "@/store/hue";

@Component
export default class HueConnector extends Vue {
  @State("hue") hueState!: HueState;

  @Action("createUser", hueBinding)
  createUser!: () => void;

  private interval: number = -1;

  created() {
    this.interval = window.setInterval(this.tryCreateUser, 3000);
  }

  beforeDestroy() {
    if (this.interval > 0) {
      console.log("clearing interval");
      clearInterval(this.interval);
    }
  }

  private tryCreateUser() {
    console.log("try create user");
    this.createUser();
  }
}
</script>
<style scoped>
.card {
  width: 600px;
  max-width: 95%;
}
</style>
