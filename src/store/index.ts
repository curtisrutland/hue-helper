import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { hue } from "@/store/hue";
import { RootState } from "./types";
export * from "./types"

Vue.use(Vuex)

const store: StoreOptions<RootState> = {
  modules: { hue }
}

const storeInstance = new Vuex.Store<RootState>(store);
export default storeInstance;
