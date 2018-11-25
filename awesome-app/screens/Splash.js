import React, { Component } from "react";
import { Text, View, AsyncStorage } from "react-native";
import { StackActions } from "react-navigation";

export default class Splash extends Component {
  static navigationOptions = {
    header: null
  };

  isUserLoggedIn = async () => {
    let userStatus = await AsyncStorage.getItem("userStatus");
    console.log(userStatus);
    if (userStatus) {
      return this.props.navigation.navigate("Home");
    }
    return this.props.navigation.navigate("Auth");
  };

  componentDidMount = () => {
    setTimeout(() => {
      this.isUserLoggedIn();
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
