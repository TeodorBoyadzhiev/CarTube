import { getUserData,setUserData,clearUserData} from '../utility.js';


export const settings = {
    host: ''
};

async function request(url, options) {
    try {

        const response = await fetch(url, options);

        if (response.ok == false) {
            const error = await response.json();
            throw new Error(error.message);
        }

        try {
            const data = await response.json();
            return data;
        } catch (err) {
            return response;
        }

    } catch (err) {
        alert(err.message);
        throw err;
    }
}


function getOptions(method = 'get', body) {
    const options = {
        method,
        headers: {},
    };

    const user = getUserData();

    if (user) {
        options.headers['X-Authorization'] = user.accessToken;
    }

    if (body) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(body);
    }

    return options;
}

export async function get(url) {
    return await request(url, getOptions());
}

export async function post(url,body) {
    return await request(url, getOptions('post',body));
}


export async function put(url,body) {
    return await request(url, getOptions('put',body));
}


export async function del(url) {
    return await request(url, getOptions('delete'));
}


export async function register(username, password) {
    const result = await post(settings.host + '/users/register', { username, password });

    setUserData(result);


    return result;
}


export async function login(username, password) {
    const result = await post(settings.host + '/users/login', { username, password });

    setUserData(result);

    return result;
}


export async function logout() {
    const result = get(settings.host + '/users/logout');

    clearUserData(result);

    return result;

}