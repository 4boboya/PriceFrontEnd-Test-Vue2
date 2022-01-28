export default {
    namespaced: true,
    state: {
        SinginComponent: "",
        Singin: false,
        GameType: "BK",
        Memo: false,
        Width: 0,
        SideBar: false,
    },
    mutations: {
        SetSingin(state, status) {
            state.Singin = status
        },
        SetSinginComponent(state, component) {
            state.SinginComponent = component
        },
        SetGameType(state, gameType) {
            state.GameType = gameType
        },
        SetMemo(state, memo) {
            state.Memo = memo
        },
        SetWidth(state, width) {
            state.Width = width
        },
        SetSideBar(state, sideBar) {
            state.SideBar = sideBar
        },
    },
    getters: {},
    actions: {
        SetSingin({ commit }, status) {
            commit("SetSingin", status)
        },
        SetSinginComponent({ commit }, component) {
            commit("SetSinginComponent", component)
        },
        SetGameType({ commit }, gameType) {
            commit("SetGameType", gameType)
        },
        SetMemo({ commit }, memo) {
            commit("SetMemo", memo)
        },
        SetWidth({ commit }, width) {
            commit("SetWidth", width)
        },
        SetSideBar({ commit }, sideBar) {
            commit("SetSideBar", sideBar)
        },
    },
}