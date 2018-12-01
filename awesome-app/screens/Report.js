import React, { Component } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  Image,
  StyleSheet
} from "react-native";
import { Notifications, LinearGradient } from "expo";

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
          secret: "You are on #1 position for this month"
        }
      },
      {
        time: new Date().getTime() + 5000
      }
    );
    setTimeout(() => {
      Notifications.dismissAllNotificationsAsync();
    }, 2500);
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
        },
        data: {
          goToPage: "Home"
        }
      });
      this.scheduleNotification();
    }
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 36 }}>📜 Create Report📜</Text>
          <Image
            source={require("../assets/pikachu.png")}
            style={{ width: 100, height: 125 }}
            resizeMode={"center"}
          />
        </View>
        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 28 }}>Criminal Name</Text>
          <TextInput style={styles.input} placeholder={"Enter Criminal Name"} />
          <Text style={{ fontSize: 28 }}>Crime Location</Text>
          <TextInput
            style={styles.input}
            placeholder={"Enter Crime Location"}
          />
          <Text style={{ fontSize: 28 }}>Crime Details</Text>
          <TextInput
            style={styles.input}
            placeholder={"Enter Crime Details"}
            multiline={true}
            numberOfLines={3}
          />
        </View>
        <View style={{ flex: 1, justifyContent: "flex-end", padding: 10 }}>
          <TouchableOpacity
            style={styles.button}
            onPress={this.handleSubmitReport}
          >
            <LinearGradient
              style={styles.gradient}
              colors={["#14F1D9", "#3672F8"]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
            >
              <Text style={{ color: "#fff", fontSize: 36 }}>Submit Report</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    borderColor: "gray",
    borderWidth: 1,
    // margin: 15,
    height: 60,
    fontSize: 28,
    borderRadius: 25,
    paddingLeft: 10
  },
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
