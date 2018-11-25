import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Constants } from "expo";
import AppContainer from "./screens";

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <AppContainer />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: "#000"
  }
});
