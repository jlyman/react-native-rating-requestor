import React, { Alert, Linking } from 'react-native';

import RatingsData from './RatingsData';

const _config = {
	title: 'Rate Me',
	message: 'We hope you\'re loving our app. If you are, would you mind taking a quick moment to leave us a positive review?',
	appStoreId: null,
	actionLabels: {
		decline: 'No thanks',
		delay: 'Not right now',
		accept: 'Sure'
	},
	timingFunction: function(currentCount) {
		return currentCount > 1 && Math.log(currentCount) / Math.log(3) % 1 == 0;
	}
};

async function _isAwaitingRating() {
	let timestamps = await RatingsData.getActionTimestamps();

	// If no timestamps have been set yet we are still awaiting the user, return true
	return timestamps.every((timestamp) => { return timestamp[1] === null; });
}

/**
 * Creates the RatingRequestor object you interact with
 * @class
 */
export default class RatingRequestor {

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
	 * 									timingFunction: {func}
	 * 								}
	 */
	constructor(appStoreId, options) {
		// Check for required options
		if (!appStoreId) {
			throw 'You must specify your app\'s store ID on construction to use the Rating Requestor.';
		}

		// Merge defaults with user-supplied config
		Object.assign(_config, options);
		_config.appStoreId = appStoreId;
	}

	/**
	 * Call to immediately show the rating dialog
	 *
	 * @param {function(didAppear: boolean, result: string)} callback Optional. Callback that reports whats the result was.
	 */
	showRatingPopup(callback = () => {}) {
		Alert.alert(
			_config.title,
			_config.message,
			[
				{ text: _config.actionLabels.decline, onPress: () => { RatingsData.recordDecline(); callback(true, 'decline'); } },
				{ text: _config.actionLabels.delay, onPress: () => { callback(true, 'delay'); } },
				{ text: _config.actionLabels.accept, onPress: () => {
					RatingsData.recordRated();
					callback(true, 'accept');
					Linking.openURL('http://itunes.apple.com/WebObjects/MZStore.woa/wa/viewContentsUserReviews?id=' + _config.appStoreId + '&pageNumber=0&sortOrdering=2&type=Purple+Software&mt=8');
				}, style: 'default' }
			]
		);
	}

	/**
	 * Call when a positive interaction has occurred within your application. Depending on the number
	 * of times this has occurred and your timing function, this may display a rating request dialog.
	 *
	 * @param {function(didAppear: boolean, result: string)} callback Optional. Callback that reports whether the dialog appeared and what the result was.
	 */
	async handlePositiveEvent(callback = () => {}) {
		if (await _isAwaitingRating()) {
			let currentCount = await RatingsData.incrementCount();

			if (_config.timingFunction(currentCount)) {
				this.showRatingPopup(callback);
			} else callback(false);
		} else callback(false);
	}
}
