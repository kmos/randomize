import netlifyIdentity from 'netlify-identity-widget'

const netlifyAuth = {
    isAuthenticated: false,
    user: null,
    initialize(callback) {
        window.netlifyIdentity = netlifyIdentity
        netlifyIdentity.on('init', (user) => {
            callback(user)
        })
        netlifyIdentity.init()
    },
    openLoginModal(callback) {
        netlifyIdentity.open();
    },
    logout(callback) {
        this.isAuthenticated = false
        netlifyIdentity.logout()
        netlifyIdentity.on('logout', () => {
            this.user = null
            callback()
        })
    },
}

export default netlifyAuth