import toastr from 'toastr';

export default {
    get: httpGet,
    post: httpPost,
    patch: httpPatch,
    put: httpPut,
    delete: httpDelete
}

function httpGet(url, queryParams) {
    let fetchData = fetch(`${url}${getQueryString(queryParams)}`, {
        credentials: 'same-origin',
        headers: new Headers({
            'pragma': 'no-cache',
            'cache-control': 'no-cache'
        }),
    });

    return processRequest(fetchData);
}

function httpPost(url, data) {
    let request = new Request(url, {
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        credentials: 'same-origin',
        method: 'POST',
        body: JSON.stringify(data)
    });

    return processRequest(fetch(request));
}

function httpPut(url, data) {
    let request = new Request(url, {
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        credentials: 'same-origin',
        method: 'PUT',
        body: JSON.stringify(data)
    });

    return processRequest(fetch(request));
}

function httpPatch(url, data) {
    let request = new Request(url, {
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        credentials: 'same-origin',
        method: 'PATCH',
        body: JSON.stringify(data)
    });

    return processRequest(fetch(request));
}

async function httpDelete(url, data) {
    let fetchData = fetch(url, {
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        credentials: 'same-origin',
        method: 'DELETE',
        body: JSON.stringify(data)
    });

    return processRequest(fetchData);
}

async function processRequest(fetchRequest) {
    try {
        let response = await fetchRequest;

        if (!response.ok) {
            if (response.status === 400 || response.status === 500) {
                let responseJson = await response.json();
                throw new Error(responseJson.message);
            }

            throw new Error(`Invalid HTTP response status ${response.status}`);
        }

        let result = await response.json();

        checkResult(result);

        return result.data;
    } catch (err) {
        toastr.error(err);

        throw new Error('API Request Error');
    }
}

function checkResult(result) {
    if (result.status === 'error' || result.status === 'validation error') {
        throw new Error(result.message);
    }
}

function getQueryString(params) {
    if (!params || !Object.keys(params).length) return '';

    const esc = encodeURIComponent;

    let query = '?';

    query += Object.keys(params)
        .map(k => esc(k) + '=' + esc(params[k]))
        .join('&');

    return query;
}