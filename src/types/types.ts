export { NotificationOptions } from './notificationOptions';
export { Test } from './test';

/**
 * @todo @important Find a suitable name for this interface
 */
export interface webRequestArg {
    requestId: string;
    url: string;
    method: string;
    frameId: number;
    parentFrameId: number;
    requestBody?: {
        error?: string;
        formData?: {
            [key: string]: string[];
        };
        raw?: browser.webRequest.UploadData[];
    };
    tabId: number;
    type: browser.webRequest.ResourceType;
    timeStamp: number;
    originUrl: string;
}