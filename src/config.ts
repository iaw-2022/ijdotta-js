const CONFIG = {
    SERVICES: {
        CLINIC_API: {
            BASE_URL: "https://clinicapp-ijdotta-api.herokuapp.com/api"
        }
    },

    AUTH0: {
        DOMAIN: "dev-brg52e01.us.auth0.com",
        CLIENT_ID: "fj7XSgg3r1adwGfYyHSKplYfQzou1E9r",
        AUDIENCE: "https://clinicapp/api",
        LOGOUT: {
            REDIRECT_TO: "http://localhost:3000/"
        }
    }
}

export default CONFIG;