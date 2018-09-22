<template>
  <v-card class="card">
    <v-card-title primary-title>
      <div>
        <div class="headline">{{name}}</div>
      </div>  
    </v-card-title>
    <v-card-title>
      <v-btn icon :disabled="!on" class="sliderIcon" @click="brightness = 0">
        <v-icon>brightness_low</v-icon>
      </v-btn>
      <v-slider :disabled="!on" v-model="brightness" :step="1" :min="1" :max="254"></v-slider>
      <v-btn icon :disabled="!on" class="sliderIcon" @click="brightness = 254">
        <v-icon>brightness_high</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn icon @click="toggle">
        <v-icon :color="powerIconColor">{{powerIcon}}</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { debounce } from "throttle-debounce";
import { Hue, Group } from "@/api/hue";
@Component
export default class LightPanel extends Vue {
  @Prop() private groupId!: number;
  private on = false;
  private brightness = 1;
  private powerIcon = "power_settings_new";
  private name = "";
  private get powerIconColor() { return this.on ? "error" : "success"; }

  private created() {
    this.updateState();
  }

  @Watch("brightness")
  onBrightnessChanged(brightness: number) {
    this.updateBrightness();
  }

  private async updateState() {
    const group = await Hue.getGroup(this.groupId);
    this.on = group.state.any_on;
    this.brightness = group.action.bri || 0;
    this.name = group.name;
  }

  private async toggle() {
    await Hue.setGroupAction(this.groupId, { on: !this.on });
    this.on = !this.on;
  }

  private updateBrightness = debounce(50, this._updateBrightness);
  private async _updateBrightness() {
    await Hue.setGroupAction(this.groupId, { bri: this.brightness });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card {
  width: 500px;
  max-width: 90%;
}

.sliderIcon {
  margin-bottom: 5px;
}

.firstIcon {
  margin-right: 5px;
}

.lastIcon {
  margin-left: 5px;
}
</style>
