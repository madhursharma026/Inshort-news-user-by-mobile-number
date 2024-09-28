import {
  View,
  Text,
  Alert,
  Linking,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import tw from "twrnc";
import React, { useState } from "react";
import * as Clipboard from "expo-clipboard";
import { Ionicons } from "@expo/vector-icons";
import { WebView } from "react-native-webview";
import { useLocalSearchParams, useNavigation } from "expo-router";

const LinkViewer = () => {
  const { LinkURL } = useLocalSearchParams();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigation = useNavigation();

  const getDomainName = (url) => {
    try {
      const { protocol, hostname } = new URL(url);
      return `${protocol}//${hostname}`;
    } catch {
      return "Invalid URL";
    }
  };

  const domainName = getDomainName(LinkURL);

  const handleError = (syntheticEvent) => {
    console.error("WebView error: ", syntheticEvent.nativeEvent);
  };

  const handleClose = () => {
    navigation.goBack();
  };

  const handleCopyLink = async () => {
    await Clipboard.setStringAsync(LinkURL);
    Alert.alert("Link Copied", "The link has been copied successfully!");
    setDropdownVisible(false);
  };

  const handleOpenInBrowser = async () => {
    const supported = await Linking.canOpenURL(LinkURL);
    if (supported) {
      await Linking.openURL(LinkURL);
    } else {
      Alert.alert("Error", "Can't open this URL.");
    }
    setDropdownVisible(false);
  };

  const toggleDropdown = () => {
    setDropdownVisible((prevVisible) => !prevVisible);
  };

  return (
    <View style={tw`flex-1`}>
      <View
        style={tw`flex-row items-center p-2 border-b border-gray-300 bg-gray-800`}
      >
        <TouchableOpacity
          onPress={handleClose}
          style={tw`pr-4`}
          accessibilityRole="button"
          accessibilityLabel="Close"
          accessibilityHint="Closes the current view"
        >
          <Ionicons name="close-outline" size={20} color="white" />
        </TouchableOpacity>
        <Text
          style={tw`flex-1 text-sm text-white text-center`}
          accessibilityRole="text"
        >
          {domainName}
        </Text>
        <TouchableOpacity
          onPress={toggleDropdown}
          style={tw`pl-4`}
          accessibilityRole="button"
          accessibilityLabel="More options"
          accessibilityHint="Shows additional options"
        >
          <Ionicons name="ellipsis-vertical-sharp" size={16} color="white" />
        </TouchableOpacity>
      </View>

      {dropdownVisible && (
        <View
          style={tw`absolute top-12 right-2 bg-white rounded shadow-md p-2 z-10`}
          accessibilityRole="dialog"
          accessibilityLabel="Options menu"
        >
          <TouchableOpacity
            onPress={handleCopyLink}
            style={tw`flex-row items-center p-2 border-b border-gray-200`}
            accessibilityRole="button"
            accessibilityLabel="Copy link"
            accessibilityHint="Copies the link to clipboard"
          >
            <Ionicons name="copy-outline" size={20} color="black" />
            <Text style={tw`ml-2 text-base text-gray-800`}>Copy Link</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleOpenInBrowser}
            style={tw`flex-row items-center p-2`}
            accessibilityRole="button"
            accessibilityLabel="Open in browser"
            accessibilityHint="Opens the link in a web browser"
          >
            <Ionicons name="open-outline" size={20} color="black" />
            <Text style={tw`ml-2 text-base text-gray-800`}>
              Open in Browser
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <WebView
        source={{ uri: LinkURL }}
        startInLoadingState
        renderLoading={() => <ActivityIndicator size="large" color="#0000ff" />}
        onError={handleError}
        onHttpError={handleError}
        accessibilityLabel="Web content"
        accessibilityRole="webview"
      />
    </View>
  );
};

export default LinkViewer;
