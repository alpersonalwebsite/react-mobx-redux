import UserStore from './UserStore'
import OtherUserStore from './OtherUserStore'

class RootStore {
  constructor () {
    this.UserStore = new UserStore(this)
    this.OtherUserStore = new OtherUserStore(this)
    // ... more
  }
}

const rootStore = new RootStore()

export default rootStore
