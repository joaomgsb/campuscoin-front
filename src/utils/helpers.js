const baseUrl = import.meta.env.VITE_API_BASE_URL;

export function getCurrentDateTime() {

    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(now.getDate()).padStart(2, '0');

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}


export const handleFetch = async ({ endPoint, method, body, headers }) => {
    const token = localStorage.getItem('token');

    const response = await fetch(`${baseUrl}/api/${endPoint}`, {
        method: method,
        headers: headers ? headers : {
            'Content-Type': 'application/json',
            'x-access-token': token,
        },
        body: JSON.stringify(body),
    });

    return response;
}

export const FirstLetterUppercase = (string) => {
    if (typeof string !== 'string' || string.lenght === 0) {
        return string;
    } else {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}