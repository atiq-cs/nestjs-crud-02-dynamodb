import { GetItemCommand } from "@aws-sdk/client-dynamodb";
import { ddbClient, DEFAULT_MEDIA_TABLE } from "../libs/ddbClient.js";

export const getMediaItem = async (slug: string, year: number) => {
  // Set the parameters
  const params = {
    TableName: DEFAULT_MEDIA_TABLE,
    Key: {
      Slug: { S: slug },
      Year: { N: String(year) }
    },
  };

  console.log("Inserting " + slug + "-" + year + "..");
  
  try {
    const data = await ddbClient.send(new GetItemCommand(params));
    console.log("Success", data);
    return data.Item;
  } catch (err) {
    return "Failed to retrive record:\r\n" + err;
  }
};

export default getMediaItem;