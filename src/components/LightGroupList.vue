<template>
  <v-layout column align-center>
    <LightGroupPanel  v-for="(group, id) in hueState.groups" :key="id" :groupId="id" :group="group">
    </LightGroupPanel>        
  </v-layout>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State, Action } from "vuex-class";
import { HueState, bindingOptions as hueBinding } from "@/store/hue";
import { UpdateGroupPayload } from "@/api/hue";
import LightGroupPanel from "@/components/LightGroupPanel.vue";

@Component({
  components: { LightGroupPanel }
})
export default class LightGroupList extends Vue {
  @State("hue") hueState!: HueState;

  @Action("getState", hueBinding)
  getState!: () => void;

  @Action("setGroupState", hueBinding)
  setGroupState!: (payload: UpdateGroupPayload) => void;

  mounted() {
    this.getState();
  }
}
</script>
<style scoped>
</style>
