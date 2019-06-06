/**
 * Private class that let's us interact with AsyncStorage on the device
 * @class
 */
declare class RatingsData {
    constructor();
    getCount(): Promise<number | undefined>;
    incrementCount(): Promise<number | undefined>;
    getActionTimestamps(): Promise<[string, string][] | undefined>;
    recordDecline(): Promise<void>;
    recordRated(): Promise<void>;
    initialize(): Promise<void>;
}
declare const _default: RatingsData;
export default _default;
