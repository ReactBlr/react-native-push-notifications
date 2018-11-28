import React, { Component } from "react";
import { Text, View } from "react-native";

export default class Stats extends Component {
  static navigationOptions = {
    header: null
  };
  render() {
    const { navigation } = this.props;
    const data = navigation.getParam("secret", "No Secret Available");
    return (
      <View style={{ backgroundColor: "000" }}>
        <Text style={{ color: "#fff", fontSize: 36 }}> Stats </Text>
        <Text>The Data from Notifications is {data}</Text>
      </View>
    );
  }
}
