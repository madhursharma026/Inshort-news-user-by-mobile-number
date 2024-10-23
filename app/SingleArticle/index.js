// SingleArticle.js
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import Article from "../../components/Article";

const SingleArticle = () => {
  const router = useRouter();
  const { title, imageURL, description } = useLocalSearchParams();

  return (
    <Article
      title={title}
      imageURL={imageURL}
      description={description}
      onBackPress={router.back}
    />
  );
};

export default SingleArticle;
