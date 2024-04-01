import { library, config } from '@fortawesome/fontawesome-svg-core'
import { faSun, faEye, faEyeSlash, faTrashAlt, faEdit } from '@fortawesome/free-regular-svg-icons'
import {
  faBan,
  faBars,
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faMoon,
  faPlus,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// This is important, we are going to let Nuxt.js worry about the CSS
config.autoAddCss = false

library.add(
  faSun,
  faMoon,
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faBars,
  faEye,
  faEyeSlash,
  faSignOutAlt,
  faTrashAlt,
  faEdit,
  faBan,
  faPlus
)

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('fa-icon', FontAwesomeIcon)
})
