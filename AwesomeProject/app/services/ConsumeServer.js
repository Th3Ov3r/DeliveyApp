const baseUrl = 'http://192.168.1.2:8090/serverEvaluation/public/index.php/';
var ConsumeServer = {
    
    get(route)
    {
        return fetch(baseUrl + route, {
            method: 'GET'
        });
    },  
    post(route, data)
    {
        return fetch(baseUrl + route, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    },
    put(route, data)
    {
        return fetch(baseUrl + route, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    },
    delete(route, id)
    {
        //VERFIICAR NO SE SI ASÍ FUNCIONARIA
        return fetch(baseUrl + route + id , {
            method: 'DELETE'
        });
    }
    
};

export default ConsumeServer;

// function ConsumeServer()
// {
//     const baseUrl = 'http://192.168.0.70:8090/serverEvaluation/public/index.php/';

//     return{
//         get(route)
//         {
//             return fetch(baseUrl + route, {
//                 method: 'GET'
//             });
//         },  
//         post(route, data)
//         {
//             return fetch(baseUrl + route, {
//                 method: 'POST',
//                 body: JSON.stringify(data)
//             });
//         },
//         put(route, data)
//         {
//             return fetch(baseUrl + route, {
//                 method: 'PUT',
//                 body: JSON.stringify(data)
//             });
//         },
//         delete(route, id)
//         {
//             //VERFIICAR NO SE SI ASÍ FUNCIONARIA
//             return fetch(baseUrl + route + id , {
//                 method: 'DELETE'
//             });
//         }
//     };
// }

