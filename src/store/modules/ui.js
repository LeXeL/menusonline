export default {
    state: {
        displayFooter: false,
    },
    mutations: {
        SET_DISPLAYFOOTER: (state, payload) => {
            state.displayFooter = payload
        },
    },
    actions: {},
    getters: {
        displayFooter: state => state.displayFooter,
    },
}
