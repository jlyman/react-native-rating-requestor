import React from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const keyPrefix = '@RatingRequestData.';
const eventCountKey = keyPrefix + 'positiveEventCount';
const ratedTimestamp = keyPrefix + 'ratedTimestamp';
const declinedTimestamp = keyPrefix + 'declinedTimestamp';

/**
 * Private class that let's us interact with AsyncStorage on the device
 * @class
 */
class RatingsData {

	constructor() {
		this.initialize();
	}

	// Get current count of positive events
	async getCount() {
		try {
			let countString = await AsyncStorage.getItem(eventCountKey);
			return parseInt(countString, 10);
		} catch (ex) {
			console.warn('Couldn\'t retrieve positive events count. Error:', ex);
		}
	}

	// Increment count of positive events
	async incrementCount() {
		try {
			let currentCount = await this.getCount();
			await AsyncStorage.setItem(eventCountKey, (currentCount + 1).toString());

			return currentCount + 1;
		} catch (ex) {
			console.warn('Could not increment count. Error:', ex);
		}
	}

	async getActionTimestamps() {
		try {
			let timestamps = await AsyncStorage.multiGet([ratedTimestamp, declinedTimestamp]);

			return timestamps;
		} catch (ex) {
			console.warn('Could not retrieve rated or declined timestamps.', ex);
		}
	}

	async recordDecline() {
		try {
			await AsyncStorage.setItem(declinedTimestamp, Date.now().toString());
		} catch (ex) {
			console.warn('Couldn\'t set declined timestamp.', ex);
		}
	}

	async recordRated() {
		try {
			await AsyncStorage.setItem(ratedTimestamp, Date.now().toString());
		} catch (ex) {
			console.warn('Couldn\'t set rated timestamp.', ex);
		}
	}

	// Initialize keys, if necessary
	async initialize() {
		try {
			let keys = await AsyncStorage.getAllKeys();

			if (!keys.some((key) => key === eventCountKey)) {
				await AsyncStorage.setItem(eventCountKey, '0');
			}
		} catch (ex) {
			// report error or maybe just initialize the values?
			console.warn('Uh oh, something went wrong initializing values!', ex);
		}
	}

}

export default new RatingsData();
