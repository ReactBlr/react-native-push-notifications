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

const HomeNavigator = createStackNavigator({
  Home,
  Settings
});

const AppNavigator = createSwitchNavigator(
  {
    HomeNavigator,
    Splash,
    Auth,
    Notification
  },
  {
    initialRouteName: "Splash"
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
