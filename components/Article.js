import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import tw from "twrnc";
import he from "he";
import React, { useState } from "react";
import ImageViewer from "../app/ImageViewer";
import RenderHTML from "react-native-render-html";
import Icon from "react-native-vector-icons/Ionicons";
import UseDynamicStyles from "../context/UseDynamicStyles";
import { useRouter } from "expo-router";

const Article = ({ title, imageURL, description, onBackPress }) => {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const dynamicStyles = UseDynamicStyles();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImageUri, setSelectedImageUri] = useState("");

  // Decode HTML entities using the 'he' library
  const decodeHtml = (html) => he.decode(html);

  // Modify the description to replace anchor tags with spans
  const modifyDescription = (html) => {
    const decoded = decodeHtml(html);
    return decoded.replace(
      /<a href="([^"]+)"[^>]*>(.*?)<\/a>/g,
      (match, href, text) => {
        return `<span data-href="${href}">${text}</span>`;
      }
    );
  };

  // Process the description for rendering
  const modifiedDescription = modifyDescription(description);

  const handleImagePress = (imageURI) => {
    setSelectedImageUri(imageURI);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleLinkPress = (href) => {
    if (href) {
      const articleId = href.split("article")[1]; // Extract articleId from href
      if (articleId) {
        router.push(`/SingleArticleById?articleId=${articleId}`); // Pass articleId as a param
      } else {
        console.warn("Article ID not found in href");
      }
    } else {
      console.warn("No href provided");
    }
  };

  return (
    <ScrollView style={[tw`flex-1 p-4`, dynamicStyles.backgroundColor]}>
      {/* Header with Back Button */}
      <View style={tw`flex-row justify-between items-center mb-4`}>
        <TouchableOpacity onPress={onBackPress}>
          <Icon
            name="arrow-back"
            size={24}
            color={dynamicStyles.textColor.color}
          />
        </TouchableOpacity>
      </View>

      {/* Article Title */}
      <Text
        style={[
          tw`text-3xl font-bold mb-4 text-justify`,
          dynamicStyles.textColor,
        ]}
      >
        {title}
      </Text>

      {/* Article Image */}
      <TouchableOpacity onPress={() => handleImagePress(imageURL)}>
        <Image
          source={{ uri: imageURL }}
          style={tw`w-full h-64 rounded-lg mb-4`}
          resizeMode="cover"
        />
      </TouchableOpacity>

      {/* Render HTML Description */}
      <RenderHTML
        contentWidth={width}
        source={{ html: modifiedDescription }}
        baseStyle={{
          fontSize: 18,
          lineHeight: 30,
          fontFamily: "serif",
          marginBottom: 30,
          textAlign: "justify",
          color: dynamicStyles.textColor.color,
        }}
        renderers={{
          span: (props) => {
            const href = props.tnode?.init?.domNode?.attribs["data-href"];
            const text = props.tnode?.init?.textNode?.data;

            if (!href || !text) {
              return <Text>{text || "Link"}</Text>; // Fallback text
            }

            return (
              <TouchableOpacity onPress={() => handleLinkPress(href)}>
                <Text style={tw`text-blue-500 underline`}>{text}</Text>
              </TouchableOpacity>
            );
          },
        }}
      />

      {/* Image Viewer Modal */}
      <ImageViewer
        visible={isModalVisible}
        imageUri={selectedImageUri}
        onClose={handleCloseModal}
      />
    </ScrollView>
  );
};

export default Article;
