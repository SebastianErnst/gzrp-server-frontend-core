export default class NUICallbackHandler {
    sendNUICallback(endpoint, data = {}) {
        console.log(data);
        const request = new Request(`http://${endpoint}`, {
            method: 'post',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        fetch(request)
            .catch((error) => {
                console.log(`Error in ${endpoint}: ` + error);
            });
    }
}