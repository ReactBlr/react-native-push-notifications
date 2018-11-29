import React, { Component } from "react";
import { Text, View, Image } from "react-native";

export default class Stats extends Component {
  static navigationOptions = {
    header: null
  };
  render() {
    const { navigation } = this.props;
    console.log(navigation, "🚧🚧🚧");
    const data = navigation.getParam("secret", "No Secret Available");
    return (
      <View style={{ flex: 1, alignItems: "center" }}>
        <Image
          source={require("../assets/pikapika.jpg")}
          style={{ width: 250, height: 250 }}
        />
        <Text style={{ fontSize: 28 }}>🌟Your Monthly Stats🌟</Text>
        <Text style={{ fontSize: 24, textAlign: "center" }}>{data}</Text>
      </View>
    );
  }
}
