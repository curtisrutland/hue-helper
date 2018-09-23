<template>
  <LightGroupList v-if="discoveryComplete" />
  <v-layout v-else column align-center>
    <h2>{{ discoveryError ? "Error" : "Discovering Bridge"}}</h2>
  </v-layout>
</template>


<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { State, Action } from "vuex-class";
import { HueState, bindingOptions as hueBinding } from "@/store/hue";
import LightGroupList from "@/components/LightGroup/LightGroupList.vue";

@Component({
  components: { LightGroupList }
})
export default class HueHelper extends Vue {
  @State("hue") hueState!: HueState;

  get discoveryError() {
    return this.hueState.discoveryError;
  }

  get discoveryComplete() {
    return this.hueState.discoveryComplete && !this.hueState.discoveryError;
  }

  @Action("discover", hueBinding)
  discover!: () => void;

  mounted() {
    this.discover();
  }

  @Watch("hueState")
  hueStateChange() {
    console.log(this.hueState);
  }
}
</script>
<style scoped>
</style>
