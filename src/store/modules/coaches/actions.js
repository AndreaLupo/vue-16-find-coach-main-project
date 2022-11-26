export default {
    async registerCoach(context, data) {
        const userId = context.rootGetters.userId;
        const coach = {
            firstName: data.first,
            lastName: data.last,
            description: data.desc,
            hourlyRate: data.rate,
            areas: data.areas
        };

        const response = await fetch(`https://vue-http-demo-2c8cb-default-rtdb.firebaseio.com/coaches/${userId}.json`, {
            method: 'PUT',
            body: JSON.stringify(coach)
        });

        // const responseData = await response.json();

        if(!response.ok) {
            // error ...
        }

        context.commit('registerCoach', {
            ...coach,
            id: userId
        });
    },
    async loadCoaches(context) {
        const response = await fetch('https://vue-http-demo-2c8cb-default-rtdb.firebaseio.com/coaches.json');

        const responseData = await response.json();
        if(!response.ok) {
            const error = new Error(responseData.message || 'Failed to fetch');
            throw error;
        }

        const coaches = [];
        for(const key in responseData) {
            const currentCoach = responseData[key];
            const coach = {
                id: key,
                firstName: currentCoach.firstName,
                lastName: currentCoach.lastName,
                description: currentCoach.description,
                hourlyRate: currentCoach.hourlyRate,
                areas: currentCoach.areas
            };
            coaches.push(coach);
        }

        context.commit('setCoaches', coaches);
    }
};