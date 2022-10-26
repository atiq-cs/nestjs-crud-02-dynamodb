import { PutItemCommand } from "@aws-sdk/client-dynamodb";
import { ddbClient, DEFAULT_MEDIA_TABLE } from "../libs/ddbClient.js";
import { Media } from "../../media/media.model.js";

export const putMedia = async (media: Media) => {
  // Set the parameters
  const params = {
    TableName: DEFAULT_MEDIA_TABLE,
    Item: {
      Slug: { S: media.slug },
      Year: { N: String(media.year) },
      Title: { S: media.title },
      Synopsis: { S: media.synopsis }
    },
  };

  console.log("Inserting " + media.slug + "-" + media.year + "...");

  try {
    const data = await ddbClient.send(new PutItemCommand(params));
    console.log(data);
    return data;
  } catch (err) {
    return "Failed to insert record:\r\n" + err;
  }
};

export default putMedia;