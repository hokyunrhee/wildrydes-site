import type { AWS } from "@serverless/typescript";

const authorizer = {
  name: "authorizer",
  type: "COGNITO_USER_POOLS",
  arn: { "Fn::GetAtt": ["UserPool", "Arn"] },
};

export const functions: AWS["functions"] = {
  RequestUnicorn: {
    handler: "src/functions/request-unicorn.handler",
    events: [
      {
        http: {
          path: "/ride",
          method: "post",
          cors: true,
          authorizer,
        },
      },
    ],
  },
};
