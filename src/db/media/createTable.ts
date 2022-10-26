import { CreateTableCommand, CreateTableInput } from "@aws-sdk/client-dynamodb";
import { ddbClient, DEFAULT_MEDIA_TABLE } from "../libs/ddbClient";

const params: CreateTableInput = {
  TableName: DEFAULT_MEDIA_TABLE,
  KeySchema: [
    {
      AttributeName: "Year",  //ATTRIBUTE_NAME_2
      KeyType: "HASH",     //ATTRIBUTE_TYPE
    },
    // 'Title normalized string' + 'a sequence number' to make the key unique
    {
      AttributeName: "Slug", //ATTRIBUTE_NAME_1: Primary Key
      KeyType: "RANGE",
    },
  ],
  AttributeDefinitions: [
    {
      AttributeName: "Slug", //ATTRIBUTE_NAME_1
      AttributeType: "S",     //ATTRIBUTE_TYPE
    },
    {
      AttributeName: "Year",  //ATTRIBUTE_NAME_2
      AttributeType: "N",     //ATTRIBUTE_TYPE
    },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 1,
    WriteCapacityUnits: 1,
  },
  StreamSpecification: {
    StreamEnabled: false,
  },
}

// async/await.
const run = async () => {
  try {
    const data = await ddbClient.send(new CreateTableCommand(params));
    console.log("Table Created", data);
    return data;
  } catch (err) {
    // error handling.
    console.log("Error", err);
  } finally {
    // finally.
  }
};

run();
