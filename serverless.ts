import type { AWS } from "@serverless/typescript";

import hello from "@functions/hello";
import { S3 } from "./serverless/s3-resources";
import { cognito } from "./serverless/cognito-resources";
import { dynamo } from "./serverless/dynamo-resources";

const serverlessConfiguration: AWS = {
  service: "wildrydes-site",
  frameworkVersion: "3",
  plugins: ["serverless-esbuild", "serverless-s3-sync"],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
    },
  },
  // import the function via paths
  functions: { hello },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node14",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },
    productName: "wildrydes",
    websiteBucketName: "${self:custom.productName}-website-${sls:stage}",
    userPoolName: "${self:custom.productName}-user-pool-${sls:stage}",
    userPoolClientName:
      "${self:custom.productName}-user-pool-client-${sls:stage}",
    tableName: "${self:custom.productName}-table-${sls:stage}",
    s3Sync: [
      {
        bucketName: "${self:custom.websiteBucketName}",
        localDir: "frontend",
      },
    ],
  },
  resources: {
    Resources: {
      ...S3,
      ...cognito,
      ...dynamo,
    },
  },
};

module.exports = serverlessConfiguration;
