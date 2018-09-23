<template>
  <LightGroupList v-if="showLightGroups" />
  <HueDiscovery v-else />
</template>


<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { State, Action } from "vuex-class";
import { HueState, bindingOptions as hueBinding } from "@/store/hue";
import LightGroupList from "@/components/LightGroup/LightGroupList.vue";
import HueDiscovery from "@/components/HueDiscovery.vue";

@Component({
  components: { LightGroupList, HueDiscovery }
})
export default class HueHelper extends Vue {
  @State("hue") hueState!: HueState;

  get showLightGroups() {
    const { discoveryComplete, discoveryError, userCreated } = this.hueState;
    return discoveryComplete && !discoveryError && userCreated;
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
