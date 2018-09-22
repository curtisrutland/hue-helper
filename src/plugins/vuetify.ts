import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify, {
  theme: {
    primary: "#3F51B5",
    secondary: "#7986CB",
    accent: "#9C27B0",
    error: "#F44336",
    warning: "#FF9800",
    info: "#2196f3",
    success: "#4caf50"
  },
  customProperties: true,
  iconfont: 'md',
})
