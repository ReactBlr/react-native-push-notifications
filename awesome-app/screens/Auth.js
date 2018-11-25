import React, { Component } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  AsyncStorage
} from "react-native";

export default class Auth extends Component {
  state = {
    username: "pikachu",
    password: "deadpool",
    button: "🙊🙉🙈",
    intervalId: null
  };
  emoji = ["😎", "😍", "😉", "🤐", "😝", "😲", "😦", "😵", "👻"];

  randomEmoji = () => {
    let emojiInterval = setInterval(() => {
      this.setState({
        button: this.emoji[Math.floor(Math.random() * this.emoji.length)]
      });
    }, 250);
    this.setState({ intervalId: emojiInterval });
  };

  logMeIn = async () => {
    this.randomEmoji();
    let setUserLogin = await AsyncStorage.setItem("userStatus", "true");
    this.props.navigation.navigate("Notification");
  };

  componentWillUnmount = () => {
    clearInterval(this.state.intervalId);
  };

  render() {
    return (
      <View
        style={{ flex: 1, alignItems: "stretch", justifyContent: "center" }}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: 36,
            fontWeight: "bold",
            alignSelf: "center",
            margin: 30
          }}
        >
          {" "}
          🔒 Auth 🔒{" "}
        </Text>
        <TextInput
          onChangeText={text => this.setState({ username: text })}
          value={this.state.username}
          style={{
            backgroundColor: "#fff",
            margin: 30,
            height: 60,
            fontSize: 36
          }}
        />
        <TextInput
          secureTextEntry={true}
          style={{
            backgroundColor: "#fff",
            margin: 30,
            height: 60,
            fontSize: 36
          }}
          onChangeText={text => this.setState({ password: text })}
          value={this.state.password}
        />
        <TouchableOpacity
          style={{
            backgroundColor: "#00FFFF",
            height: 60,
            margin: 30,
            alignItems: "center",
            justifyContent: "center"
          }}
          onPress={this.logMeIn}
        >
          <Text style={{ fontSize: 36 }}>{this.state.button}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
