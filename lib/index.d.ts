declare type ButtonType = "NEUTRAL_DELAY" | "NEGATIVE_DECLINE" | "POSITIVE_ACCEPT";
declare type RatingRequestorCallback = (didAppear: boolean, decision?: "decline" | "delay" | "accept") => void;
declare type RatingRequestorOptions = {
    title: string;
    message: string;
    actionLabels: {
        decline: string;
        delay: string;
        accept: string;
    };
    buttonOrder: {
        ios: ButtonType[];
        android: ButtonType[];
    };
    shouldBoldLastButton: boolean;
    storeAppName: string;
    storeCountry: string;
    timingFunction: (currentCount: number) => boolean;
};
export declare enum ButtonTypes {
    NEUTRAL_DELAY = "NEUTRAL_DELAY",
    NEGATIVE_DECLINE = "NEGATIVE_DECLINE",
    POSITIVE_ACCEPT = "POSITIVE_ACCEPT"
}
/**
 * Creates the RatingRequestor object you interact with
 * @class
 */
export default class RatingRequestor {
    storeUrl: string;
    /**
     * @param  {string} appStoreId - Required. The ID used in the app's respective app store
     * @param  {object} options - Optional. Override the defaults. Takes the following shape, with all elements being optional:
     * 								{
     * 									title: {string},
     * 									message: {string},
     * 									actionLabels: {
     * 										decline: {string},
     * 										delay: {string},
     * 										accept: {string}
     * 									},
     * 									buttonOrder: {
     * 										ios: [buttonTypes],
     * 										android: [buttonTypes],
     * 									}
     * 									shouldBoldLastButton: {boolean},
     *                  storeAppName: {string},
     *                  storeCountry: {string},
     * 									timingFunction: {func}
     * 								}
     */
    constructor(appStoreId: string, options: Partial<RatingRequestorOptions>);
    /**
     * Shows the rating dialog when called. Normally called by `handlePositiveEvent()`, but
     * can be called on its own as well. Use caution when doing so--you don't want to ask
     * the user for a rating too frequently or you might annoy them. (This is handy, however,
     * if the user proactively seeks out something in your app to leave a rating, for example.)
     *
     * @param {function(didAppear: boolean, result: string)} callback Optional. Callback that reports whether the dialog appeared and what the result was.
     */
    showRatingDialog(callback?: RatingRequestorCallback): void;
    /**
     * Call when a positive interaction has occurred within your application. Depending on the number
     * of times this has occurred and your timing function, this may display a rating request dialog.
     *
     * @param {function(didAppear: boolean, result: string)} callback Optional. Callback that reports whether the dialog appeared and what the result was.
     */
    handlePositiveEvent(callback?: RatingRequestorCallback): Promise<void>;
}
export {};
