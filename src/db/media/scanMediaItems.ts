import { ScanCommand } from "@aws-sdk/client-dynamodb";
import { ddbClient, DEFAULT_MEDIA_TABLE } from "../libs/ddbClient.js";
// import { Media } from "../../media/media.model.js";

export const scanMediaItems = async () => {
  // Set the parameters
  const params = {
    TableName: DEFAULT_MEDIA_TABLE,
  };

  try {
    const data = await ddbClient.send(new ScanCommand(params));
    console.log(data);
    return data;
  } catch (err) {
    return "Failed to scan items:\r\n" + err;
  }
};

export default scanMediaItems;
