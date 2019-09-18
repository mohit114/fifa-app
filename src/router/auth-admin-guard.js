import {store} from '../store/store'

export default (to, from, next) => {
  if (store.getters.user && store.getters.user.id == process.env.ADMIN_ID) {
    next()
  } else {
    next('/')
  }
}