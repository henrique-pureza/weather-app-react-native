export function encodeURL(url: string, params?: Record<string, string>) {
    if (params) {
        const queryString = Object.keys(params)
            .filter(key => params[key] !== undefined && params[key] !== "")
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
            .join('&');

        if (queryString) {
            url += '?' + queryString;
        }
    }

    return url;
}
