import { Notifications, Permissions } from "expo";

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
