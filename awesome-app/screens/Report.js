import React, { Component } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import { Notifications } from "expo";

export default class Report extends Component {
  static navigationOptions = {
    header: null
  };

  scheduleNotification = async () => {
    await Notifications.scheduleLocalNotificationAsync(
      {
        title: "Your Monthly Stats are available",
        body: "You have set a new record",
        android: {
          sound: "default",
          priority: "max",
          channelId: "local"
        },
        ios: {
          sound: "default"
        },
        data: {
          goToPage: "Stats",
          secret: "Just Kidding! Better Luck Next Time"
        }
      },
      {
        time: new Date().getTime() + 5000
      }
    );
  };

  handleSubmitReport = async () => {
    let notificationStatus = await AsyncStorage.getItem("notificationStatus");
    if (notificationStatus) {
      Notifications.presentLocalNotificationAsync({
        title: "Sending Report",
        body: "Connecting to Pokemon Secure Servers",
        android: {
          sound: "default",
          priority: "max",
          channelId: "local"
        },
        ios: {
          sound: "default"
        }
      });
      this.scheduleNotification();
    }
  };

  render() {
    return (
      <View style={{ backgroundColor: "#000", flex: 1 }}>
        <View style={{ alignItems: "center", backgroundColor: "forestgreen" }}>
          <Text style={{ color: "#fff", fontSize: 36 }}>
            {" "}
            📜 Create Report📜{" "}
          </Text>
        </View>
        <View style={{ padding: 10 }}>
          <Text style={{ color: "#fff", fontSize: 28 }}>Criminal Name</Text>
          <TextInput
            style={{ backgroundColor: "#fff", height: 60, fontSize: 36 }}
            placeholder={"Enter Criminal Name"}
          />
          <Text style={{ color: "#fff", fontSize: 28 }}>Crime Committed</Text>
          <TextInput
            style={{ backgroundColor: "#fff", height: 60, fontSize: 36 }}
            placeholder={"Enter Name of Crime"}
          />
          <Text style={{ color: "#fff", fontSize: 28 }}>Crime Location</Text>
          <TextInput
            style={{ backgroundColor: "#fff", height: 60, fontSize: 36 }}
            placeholder={"Enter Crime Location"}
          />
        </View>
        <View style={{ flex: 1, justifyContent: "flex-end", padding: 10 }}>
          <TouchableOpacity
            style={{
              backgroundColor: "maroon",
              alignItems: "center",
              justifyContent: "center"
            }}
            onPress={this.handleSubmitReport}
          >
            <Text style={{ color: "#fff", fontSize: 36 }}>Submit Report</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
