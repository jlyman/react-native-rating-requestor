declare module "react-native-rating-requestor" {
  export default RatingRequestor;

  export const buttonTypes: {
    NEUTRAL_DELAY: "NEUTRAL_DELAY";
    NEGATIVE_DECLINE: "NEGATIVE_DECLINE";
    POSITIVE_ACCEPT: "POSITIVE_ACCEPT";
  };

  type ButtonType = "NEUTRAL_DELAY" | "NEGATIVE_DECLINE" | "POSITIVE_ACCEPT";

  type RatingRequestorCallback = (
    didAppear: boolean,
    decision?: "decline" | "delay" | "accept"
  ) => void;

  type RatingRequestorOptions = {
    title?: string;
    message?: string;
    actionLabels?: {
      decline?: string;
      delay?: string;
      accept?: string;
    };
    buttonOrder?: {
      ios?: ButtonType[];
      android?: ButtonType[];
    };
    shouldBoldLastButton?: boolean;
    storeAppName?: string;
    storeCountry?: string;
    timingFunction?: (currentCount: number) => boolean;
  };

  class RatingRequestor {
    constructor(appStoreId: string, options?: RatingRequestorOptions);

    handlePositiveEvent(callback?: RatingRequestorCallback): void;

    showRatingDialog(callback?: RatingRequestorCallback): void;
  }
}
