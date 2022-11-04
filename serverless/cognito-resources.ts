import type { AWS } from "@serverless/typescript";

export const cognito: AWS["resources"]["Resources"] = {
  UserPool: {
    Type: "AWS::Cognito::UserPool",
    Properties: {
      UserPoolName: "${self:custom.userPoolName}",
      UsernameAttributes: ["email"],
      AutoVerifiedAttributes: ["email"],
    },
  },
  UserPoolClient: {
    Type: "AWS::Cognito::UserPoolClient",
    Properties: {
      ClientName: "${self:custom.userPoolClientName}",
      UserPoolId: {
        Ref: "UserPool",
      },
      GenerateSecret: false,
    },
  },
};
