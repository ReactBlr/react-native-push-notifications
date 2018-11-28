import React, { Component } from "react";
import { Text, View, AsyncStorage, Alert } from "react-native";
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
    if (this.props.screenProps.origin === null) {
      this.isUserLoggedIn();
    } else {
      if (this.props.screenProps.routeName) {
        this.props.navigation.navigate(
          this.props.screenProps.routeName,
          this.props.screenProps.data
        );
      } else {
        this.isUserLoggedIn();
      }
    }
    console.log(this.props.screenProps);
  };

  componentDidMount = () => {
    setTimeout(() => {
      this.isOpenedByNotification();
    }, 2000);
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          borderWidth: 2
        }}
      >
        <Text style={{ color: "#fff", fontSize: 36 }}>
          {" "}
          React.JS Bengaluru{" "}
        </Text>
      </View>
    );
  }
}
