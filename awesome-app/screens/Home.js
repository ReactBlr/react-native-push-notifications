import React, { Component } from "react";
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import { Notifications } from "expo";

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
          backgroundColor: "#000",
          flex: 1
        }}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "space-around",
            backgroundColor: "forestgreen",
            flexDirection: "row"
          }}
        >
          <Text style={{ color: "#fff", fontSize: 36 }}> 🌟 Dashboard 🌟 </Text>
          <TouchableOpacity onPress={this.handleLogout}>
            <Text style={{ color: "#fff", fontSize: 36 }}>⛔</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            alignItems: "stretch"
          }}
        >
          <View
            style={{
              backgroundColor: "darkred",
              alignItems: "center",
              justifyContent: "center",
              padding: 10,
              margin: 10
            }}
          >
            <Text style={{ color: "#fff", fontSize: 24 }}>
              Pending Cases 😴
            </Text>
            <Text style={{ color: "#fff", fontSize: 24 }}>12</Text>
          </View>
          <View
            style={{
              backgroundColor: "teal",
              alignItems: "center",
              justifyContent: "center",
              padding: 10,
              margin: 10
            }}
          >
            <Text style={{ color: "#fff", fontSize: 24 }}>
              Completed Cases 🏆
            </Text>
            <Text style={{ color: "#fff", fontSize: 24 }}>100</Text>
          </View>
          <View
            style={{
              backgroundColor: "indigo",
              alignItems: "center",
              justifyContent: "center",
              padding: 10,
              margin: 10
            }}
          >
            <Text style={{ color: "#fff", fontSize: 24 }}>
              In Progress Cases 🏃‍♀️
            </Text>
            <Text style={{ color: "#fff", fontSize: 24 }}>1</Text>
          </View>
        </View>
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <TouchableOpacity
            style={{
              backgroundColor: "#E67D27",
              margin: 10,
              padding: 10,
              alignItems: "center"
            }}
            onPress={() => this.props.navigation.navigate("Report")}
          >
            <Text style={{ color: "#fff", fontSize: 36 }}>Create Report</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
