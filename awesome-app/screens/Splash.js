import React, { Component } from "react";
import { Text, View, AsyncStorage, Alert, ImageBackground } from "react-native";
import { StackActions } from "react-navigation";
import { Notifications } from "expo";

export default class Splash extends Component {
  static navigationOptions = {
    header: null
  };

  isUserLoggedIn = async () => {
    let userStatus = await AsyncStorage.getItem("userStatus");
    if (userStatus) {
      return this.props.navigation.navigate("Home");
    }
    return this.props.navigation.navigate("Auth");
  };

  isOpenedByNotification = async () => {
    if (this.props.screenProps.shouldSplashHandleNotifications) {
      this.isUserLoggedIn();
    }
  };

  componentDidMount = () => {
    setTimeout(() => {
      this.isOpenedByNotification();
    }, 2000);
  };

  render() {
    return (
      <ImageBackground
        source={require("../assets/Splashx.png")}
        style={{ width: "100%", height: "100%" }}
      />
    );
  }
}
