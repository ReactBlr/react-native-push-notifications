import React from "react";
import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator
} from "react-navigation";
import Home from "./Home";
import Splash from "./Splash";
import Auth from "./Auth";
import Notification from "./Notification";
import Settings from "./Settings";
import Report from "./Report";
import Stats from "./Stats";

const HomeNavigator = createStackNavigator({
  Home,
  Settings,
  Report,
  Stats
});

const AppNavigator = createSwitchNavigator(
  {
    HomeNavigator,
    Splash: {
      screen: props => <Splash {...props} />
    },
    Auth,
    Notification
  },
  {
    initialRouteName: "Splash"
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
