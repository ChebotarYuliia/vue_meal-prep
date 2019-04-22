import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import uk from 'vuetify/es5/locale/uk'

Vue.use(Vuetify, {
  iconfont: 'mdi',
  lang: {
    locales: { uk },
    current: 'uk'
  },
})
