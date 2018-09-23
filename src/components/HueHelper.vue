<template v-if="!showList">
    <v-layout column align-center >
      show list: {{showList}}
      <v-btn @click="discover">Discover</v-btn>
    </v-layout>
</template>
<template v-else>
    <LightGroupList ></LightGroupList>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State, Action } from "vuex-class";
import { HueState, bindingOptions as hueBinding } from "@/store/hue";
import LightGroupList from "@/components/LightGroupList.vue";

@Component({
  components: { LightGroupList }
})
export default class HueHelper extends Vue {
  @State("hue") hueState!: HueState;

  get showList() {
    return this.hueState.discoveryComplete && !this.hueState.discoveryError;
  }

  @Action("discover", hueBinding)
  discover!: () => void;

  mounted() {
    this.discover();
  }
}
</script>
<style scoped>
</style>
