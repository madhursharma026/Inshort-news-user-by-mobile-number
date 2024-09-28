import tw from "twrnc";
import React from "react";
import { WebView } from "react-native-webview";
import UseDynamicStyles from "../../context/UseDynamicStyles";
import { SafeAreaView, ActivityIndicator, View } from "react-native";

const ContactUs = () => {
  const dynamicStyles = UseDynamicStyles();
  const zohoFormUrl =
    "https://forms.zohopublic.in/iammadhur05/form/ContactUs/formperma/spVhcB0YKJRlewY7xnpx0WkDFnsMekNKkDT6G9gEhgg";

  return (
    <SafeAreaView style={[tw`flex-1`, dynamicStyles.backgroundColor]}>
      <WebView
        source={{ uri: zohoFormUrl }}
        style={[tw`flex-1`, dynamicStyles.backgroundColor]}
        startInLoadingState
        renderLoading={() => (
          <View style={tw`flex-1 justify-center items-center`}>
            <ActivityIndicator
              size="large"
              color={dynamicStyles.textColor.color}
            />
          </View>
        )}
        onError={(error) => {
          console.error("WebView error: ", error);
        }}
      />
    </SafeAreaView>
  );
};

export default ContactUs;
