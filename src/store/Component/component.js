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
            commit("Singin", status)
        },
        SetSinginComponent({ commit }, component) {
            commit("SinginComponent", component)
        },
        SetGameType({ commit }, gameType) {
            commit("GameType", gameType)
        },
        SetMemo({ commit }, memo) {
            commit("Memo", memo)
        },
        SetWidth({ commit }, width) {
            commit("Width", width)
        },
        SetSideBar({ commit }, sideBar) {
            commit("SideBar", sideBar)
        },
    },
}