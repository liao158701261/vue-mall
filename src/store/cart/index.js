export default {
  namespaced: true,
  state: {
    items: []
  },
  mutations: {
    set_items(state, items) {
      state.items = items
    }
  }
}