/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment, Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity
} from 'react-native';

import RatingRequestor from "react-native-rating-requestor";

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

const RatingTracker = new RatingRequestor("123456789", {
  shouldBoldLastButton: true
});

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // Note: this has nothing to do with the tracker, it's just a convenience so we can show
			// on the screen how many times we've pressed the button.
			happyInteractions: 0 
    }

    this._handlePositivePress = this._handlePositivePress.bind(this);
    this._handlePositivePress = this._handlePositivePress.bind(this);
  }

  _handlePositivePress() {
		RatingTracker.handlePositiveEvent();
		this.setState({
			// Again, this state variable has nothing to do with the tracker, it's just for visualization.
			happyInteractions: this.state.happyInteractions + 1
		});
	}

	_handleImmediateDialogDisplay() {
		RatingTracker.showRatingDialog();
  }
  
  render() {
    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <Text style={styles.welcome}>Ratings Requestor Example</Text>
          <Text style={styles.instructions}>
            Press the button below 3, 9, 27, etc., times to trigger the
            ratings prompt. The prompt will not appear again if you select "No
            thanks" or "Sure." (Note: to reset the counter if you
            decline/rate, you'll need to remove the app and reinstall.)
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={this._handlePositivePress}
          >
            <Text style={styles.buttonText}>Tap me for awesomeness!</Text>
          </TouchableOpacity>
          <Text style={styles.instructions}>
            You've triggered {this.state.happyInteractions} happy
            interactions.
          </Text>
          <TouchableOpacity
            style={styles.altButton}
            onPress={this._handleImmediateDialogDisplay}
          >
            <Text style={styles.buttonText}>
              Force the dialog to show (use with caution!)
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Fragment>
    );
  }
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF'
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginHorizontal: 20,
		marginVertical: 25
	},
	button: {
		backgroundColor: '#38ADC6',
		borderColor: '#3095AB',
		borderWidth: 1,
		borderRadius: 3,
		padding: 10
	},
	altButton: {
		backgroundColor: '#fc8265',
		borderColor: '#de5740',
		borderWidth: 1,
		borderRadius: 3,
		padding: 10,
		marginTop: 60
	},
	buttonText: {
		color: 'white',
		fontSize: 14,
		fontWeight: 'bold'
	}
});

export default App;
