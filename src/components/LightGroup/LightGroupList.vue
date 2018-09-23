<template>
  <v-layout column align-center>
    <LightGroupPanel  v-for="(group, id) in hueState.groups" 
      :key="id" :groupId="id" :group="group"
      @refresh="onRefresh">
    </LightGroupPanel>        
  </v-layout>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { State, Action } from "vuex-class";
import { HueState, bindingOptions as hueBinding } from "@/store/hue";
import { UpdateGroupPayload } from "@/models/group";
import LightGroupPanel from "@/components/LightGroup/LightGroupPanel.vue";

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
    console.log("mounted");
    this.getState();
  }

  onRefresh() {
    this.getState();
  }
}
</script>
<style scoped>
</style>
