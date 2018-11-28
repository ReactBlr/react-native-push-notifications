import React, { Component } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  Image,
  Dimensions,
  StyleSheet
} from "react-native";
import { LinearGradient } from "expo";

const { height, width } = Dimensions.get("window");

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

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  logMeIn = async () => {
    this.randomEmoji();
    let setUserLogin = await AsyncStorage.setItem("userStatus", "true");
    await this.sleep(2500);
    this.props.navigation.navigate("Notification");
  };

  componentWillUnmount = () => {
    clearInterval(this.state.intervalId);
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 36,
              fontWeight: "bold",
              alignSelf: "center",
              marginTop: 10
            }}
          >
            🔒 Login 🔒
          </Text>
          <TextInput
            onChangeText={text => this.setState({ username: text })}
            value={this.state.username}
            style={styles.input}
          />
          <TextInput
            secureTextEntry={true}
            style={styles.input}
            onChangeText={text => this.setState({ password: text })}
            value={this.state.password}
          />

          <TouchableOpacity style={styles.loginButton} onPress={this.logMeIn}>
            <LinearGradient
              style={styles.gradient}
              colors={["#14F1D9", "#3672F8"]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
            >
              <Text style={{ fontSize: 36 }}>{this.state.button}</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        {/* Images Code */}
        <View style={{ flex: 1 }}>
          <View style={{ position: "absolute", top: 75, left: 25 }}>
            <Image
              source={require("../assets/Pokeballz.png")}
              style={{ height: 70, width: 70 }}
            />
          </View>
          <View style={{ position: "absolute", top: height / 15 }}>
            <Image
              source={require("../assets/pokemons.png")}
              style={{ height: height / 2.3, width }}
              resizeMode={"cover"}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    borderColor: "gray",
    borderWidth: 1,
    margin: 15,
    height: 60,
    fontSize: 36,
    borderRadius: 25,
    paddingLeft: 10
  },
  loginButton: {
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
