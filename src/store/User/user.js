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
            state.User.Account = account
        },
        SetPassword(state, password) {
            state.User.Password = password
        },
        SetAddTime(state, addTime) {
            state.User.AddTime = addTime
        },
        SetRank(state, rank) {
            state.User.Rank = rank
        },
        SetToken(state, token) {
            state.User.Token = token
        },
        SetName(state, name) {
            state.User.Name = name
        },
        SetSite(state, site) {
            state.User.Site = site
        },
        SetAuthKey(state, authKey) {
            state.User.AuthKey = authKey
        },
        SetPoint(state, point) {
            state.Wallet.Point = point
        },
        SetSubscriber(state, subscriber) {
            state.Wallet.Subscriber = subscriber
        },
    },
    getters: {},
    actions: {
        SetFinger({ commit }, finger) {
            commit('SetFinger', finger)
        },
        SetStatus({ commit }, status) {
            commit('SetStatus', status)
        },
        SetUser({ commit }, user) {
            console.log(user)
            commit('SetAccount', user.account)
            commit('SetPassword', user.password)
            commit('SetAddTime', user.addTime)
            commit('SetRank', user.rank)
            commit('SetToken', user.token)
            commit('SetName', user.userName)
            commit('SetSite', user.site)
            commit('SetAuthKey', user.authKey)
        },
        SetWallet({ commit }, wallet) {
            commit('SetPoint', wallet.point)
            commit('SetSubscriber', wallet.endTime)
        }
        ,
    },
}