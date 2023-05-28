import { Platform } from 'react-native';
import * as Notifications from "expo-notifications";
import Constants from 'expo-constants';


import { PROJECT_ID } from "@env";

// デバイストークンを取得する関数
export const registerForPushNotificationsAsync = async () => {
  let token = "";

  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") return;
    
    
    token = (await Notifications.getExpoPushTokenAsync({
      projectId:PROJECT_ID
    })).data;
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
};
