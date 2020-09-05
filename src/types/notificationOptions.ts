type NotificationID = "info" | "warning";
type NotificationType = 'basic';

export interface NotificationOptions {
    id: NotificationID,
    title: string,
    message: string,
    type?: NotificationType
}