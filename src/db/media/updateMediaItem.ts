import { UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { Media } from "../../media/media.model.js";
import { ddbClient, DEFAULT_MEDIA_TABLE } from "../libs/ddbClient.js";

export const putMedia = async (media: Media) => {
  // Set the parameters
  const params = {
    TableName: DEFAULT_MEDIA_TABLE,
    Item: {
      Slug: { S: media.slug },
      Title: { S: media.title },
      Year: { N: String(media.year) },
      Synopsis: { S: media.synopsis }
    },
  };
}


export const updateMediaItem = async (media: Media) => {
  // Set the parameters
  const params = {
    TableName: DEFAULT_MEDIA_TABLE,
    Key: {
      Slug: { S: media.slug },
      Year: { N: String(media.year) },
    },
    // Use new names for the attributes
    // UpdateExpression: "SET Slug = :s, Title = :t, Year = :y, Synopsis = :synop",
    UpdateExpression: "SET Title=:t, Synopsis = :synop",
    ExpressionAttributeValues: {
      // ":s": { S: media.slug },
      // ":y": { N: String(media.year) },
      ":t": { S: media.title },
      ":synop": { S: media.synopsis },
    },
    ReturnValues: "ALL_NEW"
  };

  console.log("Updating " + media.slug + "-" + media.year + "..");

  try {
    const data = await ddbClient.send(new UpdateItemCommand(params));
    return data;
  } catch (err) {
    return "Failed to update record:\r\n" + err; 
  }
};

export default updateMediaItem;