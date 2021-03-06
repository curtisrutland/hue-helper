<template>
  <v-card class="card">
    <v-card-title primary-title>
        <div class="headline">{{name}}</div>
        <v-spacer></v-spacer>
        <v-avatar :color="lightColor"></v-avatar>
    </v-card-title>
    <v-card-title>
      <v-btn icon :disabled="!on" class="sliderIcon" @click="brightness = 0">
        <v-icon>brightness_low</v-icon>
      </v-btn>
      <v-slider :disabled="!on" v-model="brightness" :step="1" :min="1" :max="0xFE"></v-slider>
      <v-btn icon :disabled="!on" class="sliderIcon" @click="brightness = 0xFE">
        <v-icon>brightness_high</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-title>
      <v-btn icon :disabled="!on" class="sliderIcon" @click="hue = 0">
        <v-icon dark>color_lens</v-icon>
      </v-btn>
      <v-slider :disabled="!on" v-model="hue" :step="1" :min="1" :max="0XFFFF"></v-slider>
      <v-btn icon :disabled="!on" class="sliderIcon" @click="hue = 0xFFFF">
        <v-icon>color_lens</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-title>
      <v-btn icon :disabled="!on" class="sliderIcon" @click="saturation = 0">
        <v-icon>invert_colors</v-icon>
      </v-btn>
      <v-slider :disabled="!on" v-model="saturation" :step="1" :min="1" :max="0xFE"></v-slider>
      <v-btn icon :disabled="!on" class="sliderIcon" @click="saturation = 0xFE">
        <v-icon>invert_colors</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-actions>
      <v-btn icon @click="refresh">
        <v-icon>refresh</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn icon @click="nightPreset">
        <v-icon>brightness_3</v-icon>
      </v-btn>
      <v-btn icon @click="dimPreset">
        <v-icon>brightness_4</v-icon>
      </v-btn>
      <v-btn icon @click="brightPreset">
        <v-icon>brightness_5</v-icon>
      </v-btn>
      <v-btn icon @click="toggle">
        <v-icon :color="powerIconColor">power_settings_new</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from "vue-property-decorator";
import { Action } from "vuex-class";
import {
  Group,
  UpdateGroupPayload,
  defaultGroup,
  GroupAction,
  actionPresets
} from "@/models/group";
import { bindingOptions as hueBinding, HueState } from "@/store/hue";
import hsvToRgb from "@/helpers/hsvToRgb";
import { debounce } from "throttle-debounce";

@Component
export default class LightGroupPanel extends Vue {
  @Prop() private group!: Group;
  @Prop() private groupId!: string;

  private brightness: number = 1;
  private saturation: number = 1;
  private hue: number = 1;
  private lightColor: string = "white";
  private get on() {
    return this.group.state.any_on;
  }
  private get name() {
    return this.group.name;
  }
  private get powerIconColor() {
    return this.on ? "error" : "success";
  }

  @Watch("group")
  private onGroupChanged(group: Group) {
    this.brightness = group.action.bri || 1;
    this.hue = group.action.hue || 1;
    this.saturation = group.action.sat || 1;
    this.lightColor = hsvToRgb(
      group.action.hue || 1,
      group.action.sat || 1,
      group.action.bri || 1
    );
  }

  @Watch("brightness")
  private onBrightnessChanged(brightness: number) {
    this.updateBrightness(brightness);
  }

  @Watch("hue")
  private onHueChanged(hue: number) {
    this.updateHue(hue);
  }

  @Watch("saturation")
  private onSaturationChanged(saturation: number) {
    this.updateSaturation(saturation);
  }

  @Action("setGroupState", hueBinding)
  private setGroupState!: (payload: UpdateGroupPayload) => void;

  @Emit("refresh")
  private refresh() { }

  private brightPreset() {
    this.setGroupState(this.createPayload(actionPresets.bright));
  }

  private dimPreset() {
    this.setGroupState(this.createPayload(actionPresets.dim));
  }

  private nightPreset() {
    this.setGroupState(this.createPayload(actionPresets.night));
  }

  private toggle() {
    this.setGroupState(this.createPayload({ on: !this.on }));
  }

  private updateBrightness = debounce(50, (bri: number) =>
    this.setGroupState(this.createPayload({ bri }))
  );

  private updateHue = debounce(50, hue =>
    this.setGroupState(this.createPayload({ hue }))
  );

  private updateSaturation = debounce(50, sat =>
    this.setGroupState(this.createPayload({ sat }))
  );

  private createPayload(action: GroupAction): UpdateGroupPayload {
    return { groupId: this.groupId, action };
  }
}
</script>
<style scoped>
.card {
  width: 600px;
  max-width: 95%;
}

.sliderIcon {
  margin-bottom: 12px;
}
</style>
