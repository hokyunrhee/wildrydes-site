import type { AWS } from "@serverless/typescript";

export const dynamo: AWS["resources"]["Resources"] = {
  RideTable: {
    Type: "AWS::DynamoDB::Table",
    Properties: {
      TableName: "${self:custom.tableName}",
      AttributeDefinitions: [
        {
          AttributeName: "RideId",
          AttributeType: "S",
        },
      ],
      KeySchema: [
        {
          AttributeName: "RideId",
          KeyType: "HASH",
        },
      ],
      BillingMode: "PAY_PER_REQUEST",
    },
  },
};
