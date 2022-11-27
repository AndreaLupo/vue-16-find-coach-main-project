export default {
    async login(context, payload) {
        const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=***REMOVED***`,
            {
                method: 'POST',
                body: JSON.stringify({
                    email: payload.email,
                    password: payload.password,
                    returnSecureToken: true
                })
            }
        );

        const responseData = await response.json();

        if(!response.ok) {
            console.log( responseData );
            const error = new Error( responseData.message || 'Failed to authenticate.');
            throw error;
        }

        context.commit('setUser', {
            token: responseData.idToken,
            userId: responseData.localId,
            tokenExpiration: responseData.expiresIn
        });
    },
    async signup(context, payload) {
        // got from https://firebase.google.com/docs/reference/rest/auth#section-create-email-password
        const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=***REMOVED***`,
            {
                method: 'POST',
                body: JSON.stringify({
                    email: payload.email,
                    password: payload.password,
                    returnSecureToken: true
                })
            }
        );
        
        const responseData = await response.json();

        if(!response.ok) {
            console.log( responseData );
            const error = new Error( responseData.message || 'Failed to authenticate.');
            throw error;
        }

        context.commit('setUser', {
            token: responseData.idToken,
            userId: responseData.localId,
            tokenExpiration: responseData.expiresIn
        });
    }

};