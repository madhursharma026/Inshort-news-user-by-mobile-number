import React from "react";
import UseDynamicStyles from "../../context/UseDynamicStyles";
import { View, Text, ScrollView } from "react-native";
import tw from "twrnc"; // Import twrnc for Tailwind CSS classes

const TermsOfService = () => {
  const dynamicStyles = UseDynamicStyles();

  const renderParagraph = (content) => (
    <Text style={[tw`text-base leading-6 mb-4`, dynamicStyles.textColor]}>
      {content}
    </Text>
  );

  const renderListItem = (content) => (
    <Text style={[tw`text-base leading-6 mb-1`, dynamicStyles.textColor]}>
      • {content}
    </Text>
  );

  return (
    <ScrollView
      contentContainerStyle={[tw`flex-1 p-4`, dynamicStyles.backgroundColor]}
    >
      <View>
        <Text
          style={[
            tw`text-3xl mb-4 font-bold text-center underline`,
            dynamicStyles.textColor,
          ]}
        >
          Terms of Service
        </Text>
        {renderParagraph(
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tincidunt nunc lorem, eget bibendum nisl malesuada a. Nulla facilisi. Suspendisse potenti. Ut id enim nec ipsum consequat scelerisque. Suspendisse potenti. Phasellus in justo non nisi lacinia efficitur. Donec et sapien in elit vulputate fermentum. Fusce in arcu non nisi blandit placerat."
        )}
        {renderParagraph(
          "Curabitur vel ligula euismod, suscipit augue in, accumsan nisi. Nulla facilisi. In hac habitasse platea dictumst. Curabitur eget tincidunt lorem, id vulputate tortor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse potenti. Phasellus in justo non nisi lacinia efficitur."
        )}
        <Text
          style={[
            tw`text-2xl mb-2 font-bold text-center underline`,
            dynamicStyles.textColor,
          ]}
        >
          Key Points:
        </Text>
        <View style={tw`ml-4 mb-4`}>
          {renderListItem("Lorem ipsum dolor sit amet")}
          {renderListItem("Consectetur adipiscing elit")}
          {renderListItem("Proin tincidunt nunc lorem")}
          {renderListItem("Nulla facilisi")}
          {renderListItem("Suspendisse potenti")}
        </View>
        {renderParagraph(
          "Curabitur vel ligula euismod, suscipit augue in, accumsan nisi. Nulla facilisi. In hac habitasse platea dictumst. Curabitur eget tincidunt lorem, id vulputate tortor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse potenti. Phasellus in justo non nisi lacinia efficitur."
        )}
        <Text
          style={[tw`text-base text-center mt-4 mb-8`, dynamicStyles.textColor]}
        >
          ---------------------------------------------------
        </Text>
      </View>
    </ScrollView>
  );
};

export default TermsOfService;
