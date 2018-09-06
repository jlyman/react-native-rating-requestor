//
//  RNRatingRequestor.m
//  RNRatingRequestor
//
//  Created by Narendra on 05/09/18.
//  Copyright © 2018 RNRatingRequestor. All rights reserved.
//

#import "RNRatingRequestor.h"
#import <StoreKit/StoreKit.h>

@implementation RNRatingRequestor
RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(requestorRatingView) {
    dispatch_sync(dispatch_get_main_queue(), ^{
        [SKStoreReviewController requestReview];
    });
}

@end
