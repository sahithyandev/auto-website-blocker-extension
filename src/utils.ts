/**
 * Extract the absolute URL path to a general one
 * @param absolutePath The URL path to extract
 */
export const extractURL = (absolutePath: string): string => {
    if (absolutePath == '') return '';

    let url = new URL(absolutePath);   
    
    return `*://*.${extractHostname(url.host).join('.')}/*`
}

/**
 * Extracts the absolute hostname of a URL.hostname property
 * @param hostname hostname to extract
 */
const extractHostname = (hostname: string): string[] => {
    let parts = hostname.split('.');
    return parts.slice(parts.length - 2, parts.length);
}