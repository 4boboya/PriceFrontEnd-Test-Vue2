import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import directive from './directive'
import router from './router'
import store from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import './components'
import './style/app.scss'

Vue.config.productionTip = false
Vue.component('icon', FontAwesomeIcon)
library.add(fas, far)
directive(Vue)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
