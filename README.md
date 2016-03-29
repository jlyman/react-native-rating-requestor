# react-native-rating-requestor

A React Native component to prompt users for a rating after positive interactions

The Rating Requestor is a very simple JS module that you simply instantiate and call from time to time, as your user performs actions that result in a "happy path." For example, maybe your users get a smile on their face every time they save money with your app, beat a level, or clear out their inbox. After a certain number of these positive events, it might be a good time to ask the user for a review. 

## Installation

    npm i --save react-native-rating-requestor

## Usage

Import and create a new instantiation of the Rating Requestor somewhere in the main portion of your application:

````javascript
    import RatingRequestor from 'react-native-rating-requestor';
    let RatingTracker = new RatingRequestor('[your apps store ID]');

    let MyApp = React.createClass({ ... });
````
When a positive UX event occurs, let the Rating Requestor know so that it can keep track of these:

````javascript
	if (user_saved_the_world) {
		RatingTracker.handlePositiveEvent();
	}
````

If enough positive events have occurred (defined by the `timingFunction`) then a rating dialog will pop up. The user can rate the app or decline to rate, in which case they won't be bothered again, or can choose to maybe do so later, in which case the Rating Requestor will keep on tracking positive event counts.

## Configuration

All configuration occurs on the construction of a new RatingRequestor. 

````javascript
    let myRR = new RatingRequestor(appStoreId, [ options ]);
````

You *must* pass in a string as the first parameter, which is the app store ID of your application. Optionally, but highly suggested, is a second parameter: a set of options to customize the request dialog and the timing of the dialog. This object follows this pattern:

````javascript
	{
		title: {string},
        message: {string},
        actionLabels: {
        	decline: {string},
        	delay: {string},
        	accept: {string}
        },
        timingFunction: {func(currentCount) => boolean}
	}
````

- `title`: A string used as the title for the dialog (e.g., "Please rate me!")
- `message`: The message you'd like to show the user (e.g., "If you are loving [my app's name], would you please leave me a positive review?")
- `actionLabels`: An object with three properties (all required if you don't want weird blanks or OKs):
  - `decline`: The "no thanks, I don't want to ever rate this" button label
  - `delay`: The "maybe I'll rate this later if I'm feeling charitable" button label
  - `accept`: The "oh my gosh I love this app so much so I'll rate it right now" button label
- `timingFunction`: A method that takes the current total count of positive events recorded for the app, and returns if the Requestor should display the dialog or not. By default, the timingFunction evaluates as `3^n`, and if `3^n == currentCount` then it returns true/shows the dialog. Source looks like this:

```javascript
timingFunction: function(currentCount) {
    return currentCount > 1 && Math.log(currentCount) / Math.log(3) % 1 == 0;
}
```

## Notes

Currently compatible with just iOS, but Android should be around the corner soon. (Need to replace AlertIOS with Alert, and an alternative for LinkingIOS).

## Releases

- 1.0.0 - Initial release

## Questions?

Feel free to contact me!

- Twitter: [@jlyman](https://www.twitter.com/jlyman)
- Website: http://www.joshualyman.com/
