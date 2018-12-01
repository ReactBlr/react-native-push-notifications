componentDidMount = () => {
  this.notificationSubscription = Notifications.addListener(
    this.handlePushNotification
  );
};

this.handlePushNotification = ({ data, origin, remote }) => {
  this.setState({
    notification: notification
  });
};
