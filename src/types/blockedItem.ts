
export interface TimeLimit {
    startTime: string,
    endTime: string
}


/**
 * @description Holds the info of a blocked website
 */
export interface BlockedItem {
    url: string,
    timeLimit: TimeLimit
}