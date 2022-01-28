export default {
    namespaced: true,
    state: {
        Status: false,
        Finger: null,
        User: {
            Account: null,
            Password: null,
            AddTime: null,
            Rank: null,
            Token: null,
            Name: null,
            Site: null,
            AuthKey: null,
        },
        Wallet: {
            Point: null,
            Subscriber: null,
        },
    },
    mutations: {
        SetFinger(state, finger) {
            state.Finger = finger
        },
        SetStatus(state, status) {
            state.Status = status
        },
        SetAccount(state, account) {
            state.Account = account
        },
        SetPassword(state, password) {
            state.Password = password
        },
        SetAddTime(state, addTime) {
            state.AddTime = addTime
        },
        SetRank(state, rank) {
            state.Rank = rank
        },
        SetToken(state, token) {
            state.Token = token
        },
        SetName(state, name) {
            state.Name = name
        },
        SetSite(state, site) {
            state.Site = site
        },
        SetAuthKey(state, authKey) {
            state.AuthKey = authKey
        },
        SetPoint(state, point) {
            state.Point = point
        },
        SetSubscriber(state, subscriber) {
            state.Subscriber = subscriber
        },
    },
    getters: {},
    actions: {
        SetFinger({ commit }, finger) {
            commit('SetFinger', finger)
        },
        SetUser({ commit }, user) {
            commit('SetAccount', user.account)
            commit('SetPassword', user.password)
            commit('SetAddTime', user.addtime)
            commit('SetRank', user.rank)
            commit('SetToken', user.token)
            commit('SetName', user.name)
            commit('SetSite', user.site)
            commit('SetAuthKey', user.authkey)
        },
        SetWallet({ commit }, wallet) {
            commit('SetPoint', wallet.point)
            commit('SetSubscriber', wallet.endTime)
        }
        ,
    },
}