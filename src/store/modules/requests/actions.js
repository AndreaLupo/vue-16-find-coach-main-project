export default {
    contactCoach(context, payload) {
        const newRequest = {
            id: new Date().toISOString(),
            coachId: payload.coachId,
            userEmail: payload.email,
            message: payload.message
        };
        console.log('Request', newRequest);
        context.commit('addRequest', newRequest);
    }
    
};