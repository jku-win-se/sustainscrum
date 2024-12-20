import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
// import BootstrapVue from 'bootstrap-vue'
// import { BTooltip } from 'bootstrap-vue'

// Import Bootstrap and BootstrapVue CSS files (order is important)
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap/dist/css/bootstrap.css'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.js'
// Make BootstrapVue available throughout your project
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
// Icons
import { fa } from 'vuetify/iconsets/fa'
import { md } from 'vuetify/iconsets/md'
import { mdi } from 'vuetify/iconsets/mdi-svg'
import * as mdiSvg from 'vuetify'

const vuetify = createVuetify({
  components,
  directives,
  icons: { defaultSet: 'mdi', sets: { fa, mdi, md, mdiSvg } }
})
const pinia = createPinia()
createApp(App).use(router).use(bootstrap).use(vuetify).use(pinia).mount('#app')

/* const app = createApp(App)
// app.component('b-tooltip', BTooltip)
app.use(router)
app.mount('#app') */
