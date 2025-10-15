import { APIRequestContext } from "playwright";

const HOST = 'https://example.com/'
const HTTP_METHODS = ["POST", "PUT", "PATCH", "DELETE", "GET"]
const queryOptions = {
	'params': 'params',
	'form-data': 'form-data',
	'x-www-form-urlencoded': 'x-www-form-urlencoded',
	'data': 'data'
}

// функция для отправки запроса 
export async function doRequest(
	request: APIRequestContext,
	method: string,       // HTTP метод
	endpoint: string,     // название эндпоинта
	payload: string,      // вид payload
	token?: string,       // токен
	queryBody?: any,      // тело запроса или параметры
	headers?: any,        // дополнительные заголовки
	contentType?: string  // значение Content-Type
) {
	// не пустая строка и не null/undefined
	let userToken = token && token !== '' ? token : null;

	const authType = 'Bearer' // или Basic или другое и т.п

	let contentTypeValue = contentType ?? 'application/json';

	if (!HTTP_METHODS.includes(method)) {
		throw new Error(`Unsupported HTTP method: ${method}`);
	}

	const options = {
		method,
		headers: {
			'Content-Type': contentTypeValue,
			'Authorization': authType + ' ' + userToken,
			...headers, // добавление и объединение дополнительных хедеров
		},
		[payload]: queryBody, // тело запроса или параметры
	}

	switch (payload) {
		case queryOptions.data: {
			if (queryBody) {
				options.body = JSON.stringify(queryBody);
			}
			break;
		}

		case queryOptions.params: {
			if (queryBody) {
				options.searchParams = new URLSearchParams(queryBody).toString();
			}
			break;
		}

		case queryOptions["form-data"]: {
			if (queryBody) {
				const formData = new FormData();
				for (const key in queryBody) {
					formData.append(key, queryBody[key]);
				}
				options.body = formData;
			}
			break;
		}
	}

	let url = HOST + endpoint
	const res = await request.fetch(url, options);
	let body;

	try {
		body = await res.json();
	} catch {
		body = await res.text();
	}

	return { status: res.status(), body };
}

// GET запрос
export async function doGETRequest(
	request: APIRequestContext,
	endpoint: string,     // название эндпоинта
	token?: string,       // токен
	queryBody?: any,      // тело запроса или параметры
	headers?: any       // дополнительные заголовки
) {
	return await doRequest(
		request,
		'GET',
		endpoint,
		'params',
		token,
		queryBody,
		headers,
	)
}

// POST запрос
export async function doPOSTRequest(
	request: APIRequestContext,
	endpoint: string,     // название эндпоинта
	token?: string,       // токен
	queryBody?: any,      // тело запроса или параметры
	headers?: any       // дополнительные заголовки
) {
	return await doRequest(
		request,
		'POST',
		endpoint,
		'data',
		token,
		queryBody,
		headers,
	)
}