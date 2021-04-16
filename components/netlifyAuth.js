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
    authenticate(callback) {
        netlifyIdentity.open()
        netlifyIdentity.on('login', (user) => {
            console.log(`user_authenticate:${user}`)
            this.user = user
            callback(user)
            netlifyIdentity.close()
        })
    },
    signout(callback) {
        this.isAuthenticated = false
        netlifyIdentity.logout()
        netlifyIdentity.on('logout', () => {
            this.user = null
            callback()
        })
    },
}

export default netlifyAuth