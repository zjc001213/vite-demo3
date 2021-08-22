export default {
    async addCart(state, payload) {
        state.cartCount = payload.count
    }
}