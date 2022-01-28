export default {
    namespaced: true,
    state: {
        Finger: "",
    },
    mutations: {
        SetFinger(state, finger) {
            state.Finger = finger
        },
    },
    getters: {},
    actions: {
        SetFinger({ commit }, finger) {
            commit('SetFinger', finger)
        },
    },
}