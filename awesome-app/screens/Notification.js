import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  AsyncStorage,
  Platform,
  StyleSheet
} from "react-native";
import { Notifications, Permissions, LinearGradient } from "expo";
import { request } from "graphql-request";

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
      const variables = {
        token
      };

      let mutation = `
        mutation createNotificationToken($token: String!){
          createNotificationToken(token: $token) {
            id
          }
        }
      `;
      await request("http://192.168.1.100:4000", mutation, variables);
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
            fontSize: 36,
            textAlign: "center",
            margin: 30
          }}
        >
          Namaste Detective Pikachu
        </Text>
        <Text
          style={{
            fontSize: 30,
            textAlign: "center",
            margin: 30
          }}
        >
          Do you want me to notify 🔔 about new complaints?
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.handleNotificationStatus()}
        >
          <LinearGradient
            style={styles.gradient}
            colors={["#14F1D9", "#3672F8"]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
          >
            <Text style={{ fontSize: 36, color: "#fff" }}>Yes Pleeezz 😀</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => this.goToHome()}>
          <LinearGradient
            style={styles.gradient}
            colors={["#14F1D9", "#3672F8"]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
          >
            <Text style={{ fontSize: 36, color: "#fff" }}>No 😭</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    height: 60,
    margin: 15,
    alignItems: "center",
    justifyContent: "center"
  },
  gradient: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50
  }
});
