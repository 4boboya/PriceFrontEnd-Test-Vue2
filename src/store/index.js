import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
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
  actions: {
  },
  modules: {
  }
})
