<template>
    <v-layout column align-center>
        <h2 v-if="discoveryError">Can't Find Any Bridges</h2>
        <HueConnector v-else-if="!userCreated" />
        <span v-else>User Created, Showing Panels...</span>
    </v-layout>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { State } from "vuex-class";
import { HueState, bindingOptions as hueBinding } from "@/store/hue";
import HueConnector from "@/components/HueConnector.vue";

@Component({
  components: { HueConnector }
})
export default class HueDiscovery extends Vue {
  @State("hue") hueState!: HueState;

  get discoveryError() {
    return this.hueState.discoveryError;
  }

  get discoveryComplete() {
    return this.hueState.discoveryComplete && !this.hueState.discoveryError;
  }

  get userCreated() {
      return this.hueState.userCreated;
  }
}
</script>
<style scoped>

</style>
