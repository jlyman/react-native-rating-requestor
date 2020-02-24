declare module 'react-native-rating-requestor' {
  import { Component } from 'react'
  import { StyleProp, ViewStyle } from 'react-native'

  enum buttonTypes {
    NEUTRAL_DELAY = 'NEUTRAL_DELAY',
    NEGATIVE_DECLINE = 'NEGATIVE_DECLINE',
    POSITIVE_ACCEPT = 'POSITIVE_ACCEPT',
  }

  type UserDecisions = 'decline' | 'delay' | 'accept'

  type RatingCallback = (didAppear: boolean, userDecision:UserDecisions) => void

  interface Options {
    title?: string,
    message?: string,
    actionLabels?: {
      decline: string;
      delay: string;
      accept: string;
    },
    buttonOrder?: {
      ios: [buttonTypes, buttonTypes, buttonTypes];
      android: [buttonTypes, buttonTypes, buttonTypes];
    },
    shouldBoldLastButton?: boolean,
    storeAppName?: string,
    storeCountry?: string,
    timingFunction?: (currentCount: number) => boolean
  }

  interface Props {
    platform: string,
    options?: Options
  }

  export default class RatingRequestor {
    constructor(platform: string, options?:Options)

    handlePositiveEvent(callback?:RatingCallback): void
    showRatingDialog(callback?:RatingCallback): void
  }
}

