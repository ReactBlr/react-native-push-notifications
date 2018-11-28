import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  AsyncStorage,
  Platform
} from "react-native";
import { Notifications, Permissions } from "expo";

export default class Notification extends Component {
  registerForPushNotification = async () => {
    const enabled = await this.pushNotificationsEnabled();

    if (!enabled) {
      return Promise.resolve();
    }

    return Notifications.getExpoPushTokenAsync();
  };

  pushNotificationsEnabled = async () => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      return false;
    }

    return true;
  };

  handleNotificationStatus = async () => {
    let token = await this.registerForPushNotification();
    if (token) {
      if (Platform.OS === "android") {
        await Notifications.createChannelAndroidAsync("local", {
          name: "Local",
          sound: true,
          priority: "max",
          badge: true
        });
        await Notifications.createChannelAndroidAsync("remote", {
          name: "Remote",
          sound: true,
          priority: "max",
          badge: true
        });
      }
      await AsyncStorage.setItem("notificationStatus", "true");
    }
    this.goToHome();
  };

  goToHome = () => {
    this.props.navigation.navigate("HomeNavigator");
  };

  render() {
    return (
      <View
        style={{ alignItems: "stretch", justifyContent: "center", flex: 1 }}
      >
        <Text style={{ fontSize: 48, margin: 30, textAlign: "center" }}>
          🙏
        </Text>
        <Text
          style={{
            color: "#fff",
            fontSize: 36,
            textAlign: "center",
            margin: 30
          }}
        >
          Namaste Detective Pikachu
        </Text>
        <Text
          style={{
            color: "#fff",
            fontSize: 30,
            textAlign: "center",
            margin: 30
          }}
        >
          Do you want me to notify 🔔 about new complaints?
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: "#00FFFF",
            height: 60,
            margin: 15,
            alignItems: "center",
            justifyContent: "center"
          }}
          onPress={() => this.handleNotificationStatus()}
        >
          <Text style={{ fontSize: 36 }}>Yes Pleeezz 😀</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "#00FFFF",
            height: 60,
            margin: 15,
            alignItems: "center",
            justifyContent: "center"
          }}
          onPress={() => this.goToHome()}
        >
          <Text style={{ fontSize: 36 }}>No 😭</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
