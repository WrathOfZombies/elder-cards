import React from "react";
import { Box, Animation } from "@fluentui/react-northstar";
import { gql, useQuery } from "@apollo/client";

const DOWNLOAD_IMAGE = gql`
  query DownloageImage($src: String!) {
    downloadImage(src: $src) @client
  }
`;

const boxStyles = {
  backgroundPosition: "center center",
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
  width: "17rem",
  height: "28rem",
};

/**
 * Requests the ApolloClient to fetch and image and convert it to a BlobURL.
 * The main advantage of this process is to allow Apollo layer to utilize disk caching of images
 * and also to prevent us from making multiple network requests and utilize the built in deduplication.
 *
 * This approach also allows us to lazily download the image and swap the placeholder with animated load of
 * the final image.
 */
export const LazyImage: React.FC<{ src?: string; title?: string }> = React.memo(
  ({ src, title }) => {
    const { data } = useQuery(DOWNLOAD_IMAGE, {
      variables: { src },
      skip: !src,
    });

    const blobUrl = data?.downloadImage ?? "/card-background.png";

    /**
     * The reason we use an div as an image component is so that we can
     * leverage the backgroundSizing and backgroundPositioning aspect
     */
    const image = (
      <Box
        role="img"
        aria-label={title}
        title={title}
        styles={{
          ...boxStyles,
          backgroundImage: `url("${blobUrl}")`,
        }}
      />
    );

    // If the data isn't loaded yet then render the image directly
    // else animate it in
    return data?.downloadImage ? (
      <Animation name="fadeEnterSlower">{image}</Animation>
    ) : (
      image
    );
  }
);
