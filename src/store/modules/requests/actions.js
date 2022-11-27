export default {
    async contactCoach(context, payload) {
        const newRequest = {
            userEmail: payload.email,
            message: payload.message
        };
        const response = await fetch(`https://vue-http-demo-2c8cb-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`, {
            method: 'POST',
            body: JSON.stringify(newRequest)
        });

        const responseData = await response.json();

        if(!response.ok) {
            const error = new Error(responseData.message || 'Failed to send request.');
            throw error;
        }

        // name has the automatically generated id from Firebase
        newRequest.id = responseData.name;
        newRequest.coachId = payload.coachId;
        context.commit('addRequest', newRequest);
    },
    async fetchRequests(context) {
        const coachId = context.rootGetters.userId;
        const token = context.rootGetters.token;

        const response = await fetch(`https://vue-http-demo-2c8cb-default-rtdb.firebaseio.com/requests/${coachId}.json?auth=${token}`);
    
        const responseData = await response.json();
        
        if(!response.ok) {
            const error = new Error(responseData.message || 'Failed to send request.');
            throw error;
        }

        const requests = [];
        for(const key in responseData) {
            const current = responseData[key];
            const request = {
                id: key,
                coachId: coachId,
                userEmail: current.userEmail,
                message: current.message
            }
            requests.push(request);
        }

        context.commit('setRequests', requests);
    }
    
};