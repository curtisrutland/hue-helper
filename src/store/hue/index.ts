import { Module, ActionTree, MutationTree } from 'vuex';
import { RootState } from "..";
import { HueState } from "./types";
import { Hue, Groups, UpdateGroupPayload, defaultGroups } from "@/api/hue";

export * from "./types";


const state: HueState = {
    groups: { ...defaultGroups },
    discoveryComplete: false,
    discoveryError: false
}

const actions: ActionTree<HueState, RootState> = {
    async discover({ commit }) {
        try {
            await Hue.discover();
            commit("discoveryComplete");
        } catch (err) {
            commit("discoveryError");
        }
    },
    async getState({ commit }) {
        const groups = await Hue.getGroups();
        commit("getStateComplete", groups);
    },
    async setGroupState({ commit, dispatch }, { groupId, action }: UpdateGroupPayload) {
        await Hue.setGroupAction(groupId, action);
        dispatch("getState", null);
    }
}

const mutations: MutationTree<HueState> = {
    getStateComplete(state, groups: Groups) {
        state.groups = groups;
    },
    discoveryComplete(state) {
        state.discoveryError = false;
        state.discoveryComplete = true;
    },
    discoveryError(state) {
        state.discoveryError = true;
        state.discoveryComplete = true;
    }
}

export const bindingOptions = { namespace: "hue" };

export const hue: Module<HueState, RootState> = {
    state,
    actions,
    mutations,
    namespaced: true
}