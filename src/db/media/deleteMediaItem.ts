import { DeleteItemCommand } from "@aws-sdk/client-dynamodb";
import { ddbClient, DEFAULT_MEDIA_TABLE } from "../libs/ddbClient.js";

export const deleteMediaItem = async (slug: string, year: number) => {
  // Set the parameters
  const params = {
    TableName: DEFAULT_MEDIA_TABLE,
    Key: {
      Slug: { S: slug },
      Year: { N: String(year) },
    },
  };

  console.log("Deleting " + slug + "-" + year + "...");

  try {
    const data = await ddbClient.send(new DeleteItemCommand(params));
    console.log(data);
    return data;
  } catch (err) {
    return "Failed to delete record:\r\n" + err;
  }  
};

export default deleteMediaItem;