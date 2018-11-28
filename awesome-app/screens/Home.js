import React, { Component } from "react";
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  AsyncStorage,
  StyleSheet,
  Image,
  ImageBackground
} from "react-native";
import { Notifications, LinearGradient } from "expo";

const { height, width } = Dimensions.get("window");

export default class Home extends Component {
  static navigationOptions = {
    header: null
  };

  handleLogout = async () => {
    await AsyncStorage.multiRemove(["userStatus", "notificationStatus"]);
    this.props.navigation.navigate("Splash");
  };

  render() {
    return (
      <View
        style={{
          flex: 1
        }}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            flex: 1
          }}
        >
          <Text style={{ fontSize: 36 }}>🌟Dashboard🌟</Text>
        </View>
        <View
          style={{
            position: "absolute",
            right: 0,
            top: 15,
            width: 55,
            height: 50,
            backgroundColor: "#5597FA",
            alignItems: "flex-end",
            borderTopLeftRadius: 25,
            borderBottomLeftRadius: 25
          }}
        >
          <TouchableOpacity onPress={this.handleLogout}>
            <Text style={{ color: "#fff", fontSize: 36 }}>🔚</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around"
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Text style={{ color: "#919191" }}>Pending Cases</Text>
            <ImageBackground
              source={require("../assets/pendingcase.png")}
              style={{
                height: 150,
                width: 150,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Text style={{ fontSize: 36, color: "#fff" }}>12</Text>
            </ImageBackground>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={{ color: "#919191" }}>Completed Cases</Text>
            <ImageBackground
              source={require("../assets/successcase.png")}
              style={{
                height: 150,
                width: 150,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Text style={{ fontSize: 36, color: "#fff" }}>100</Text>
            </ImageBackground>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ alignItems: "center" }}>
            <Text style={{ color: "#919191" }}>In Progress Cases</Text>
            <ImageBackground
              source={require("../assets/inprogress.png")}
              resizeMode={"center"}
              style={{
                height: 150,
                width: width,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Text style={{ fontSize: 36, color: "#fff" }}>3</Text>
            </ImageBackground>
          </View>
        </View>
        <View style={{ flex: 1, justifyContent: "space-around" }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate("Settings")}
          >
            <LinearGradient
              style={styles.gradient}
              colors={["#14F1D9", "#3672F8"]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
            >
              <Text style={{ color: "#fff", fontSize: 36 }}>
                Go To Settings
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate("Report")}
          >
            <LinearGradient
              style={styles.gradient}
              colors={["#14F1D9", "#3672F8"]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
            >
              <Text style={{ color: "#fff", fontSize: 36 }}>Create Report</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  gradient: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50
  },
  button: {
    height: 60,
    margin: 15,
    alignItems: "center",
    justifyContent: "center"
  }
});
