import { Module, ActionTree, MutationTree } from 'vuex';
import { RootState } from "..";
import { HueState } from "./types";
import Hue from "@/api/hue";
import { Groups, UpdateGroupPayload, defaultGroups } from "@/models/group";
export * from "./types";


const state: HueState = {
    groups: { ...defaultGroups },
    discoveryComplete: false,
    discoveryError: false,
    userCreated: false
}

const actions: ActionTree<HueState, RootState> = {
    async discover({ commit }) {
        try {
            await Hue.discover();
            commit("discoveryComplete");
            if (Hue.getStoredUsername()) {
                commit("userCreated");
            }
        } catch (err) {
            commit("discoveryError");
        }
    },
    async createUser({ commit }) {
        if (await Hue.createUser()) {
            commit("userCreated");
        }
    },
    async getState({ commit }) {
        console.log("get state");
        const groups = await Hue.getGroups();
        commit("getStateComplete", groups);
    },
    async setGroupState({ dispatch }, { groupId, action }: UpdateGroupPayload) {
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
    },
    userCreated(state) {
        state.userCreated = true;
    }
}

export const bindingOptions = { namespace: "hue" };

export const hue: Module<HueState, RootState> = {
    state,
    actions,
    mutations,
    namespaced: true
}