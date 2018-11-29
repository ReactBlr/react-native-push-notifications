import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Platform,
  AppState
} from "react-native";
import { Constants, Notifications } from "expo";
import { NavigationActions } from "react-navigation";
import AppContainer from "./screens";

export default class App extends React.Component {
  state = {
    routeName: null,
    data: null,
    origin: null,
    remote: null,
    shouldSplashHandleNotifications: true
  };

  constructor(props) {
    super(props);
    this.isFirstTime = true;
    this.notificationSubscription = null;
  }

  componentDidMount = () => {
    this.notificationSubscription = Notifications.addListener(
      this.handlePushNotification
    );
  };

  componentWillUnmount = () => {
    this.notificationSubscription.remove();
  };

  handlePushNotification = ({ data, origin, remote }) => {
    console.log(origin, data);
    if (origin === "selected") {
      this.setState({
        shouldSplashHandleNotifications: false
      });
      // User opened the app via push
      this.navigator &&
        this.navigator.dispatch(
          NavigationActions.navigate({ routeName: data.goToPage, params: data })
        );
      // if (this.isFirstTime) {
      //   this.isFirstTime = false;
      //   this.setState({ routeName: data.goToPage, data, origin, remote });
      // } else {
      //   console.log("I am here");
      //   this.navigator &&
      //     this.navigator.dispatch(
      //       NavigationActions.navigate({ routeName: data.goToPage, data })
      //     );
      // }
    } else if (origin === "received") {
      // App was open when notification was received
      if (Platform.OS == "ios") {
        Alert.alert(
          "Notification clicked while app is opened",
          "Some random information",
          [
            {
              text: "ignore",
              style: "cancel"
            },
            {
              text: "show Me",
              style: "default",
              onPress: () => this.props.onPushNotificationReceived(data)
            }
          ]
        );
      }
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <AppContainer
          ref={nav => {
            this.navigator = nav;
          }}
          screenProps={this.state}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 1
  }
});
