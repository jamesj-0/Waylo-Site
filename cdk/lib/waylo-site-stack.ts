import { Construct } from 'constructs';
import { CfnOutput, RemovalPolicy, Stack, StackProps } from 'aws-cdk-lib';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as cloudfront_origins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as targets from 'aws-cdk-lib/aws-route53-targets';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { BucketDeployment, Source } from 'aws-cdk-lib/aws-s3-deployment';

export class WayloSiteStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const siteDomain = 'waylo-records.com';
    const cloudfrontOAI = new cloudfront.OriginAccessIdentity(
      this,
      'cloudfront-OAI',
      {
        comment: `OAI for waylo-records`,
      }
    );

    const siteBucket = new s3.Bucket(this, 'WebsiteBucket', {
      bucketName: siteDomain,
      publicReadAccess: false,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      removalPolicy: RemovalPolicy.DESTROY,
      accessControl: s3.BucketAccessControl.PRIVATE,
      objectOwnership: s3.ObjectOwnership.BUCKET_OWNER_ENFORCED,
      encryption: s3.BucketEncryption.S3_MANAGED,
    });

    // Grant access to cloudfront
    siteBucket.addToResourcePolicy(
      new iam.PolicyStatement({
        actions: ['s3:GetObject'],
        resources: [siteBucket.arnForObjects('*')],
        principals: [
          new iam.CanonicalUserPrincipal(
            cloudfrontOAI.cloudFrontOriginAccessIdentityS3CanonicalUserId
          ),
        ],
      })
    );

    new CfnOutput(this, 'Bucket', { value: siteBucket.bucketName });

    // Perform a look up for the hosted zone for the site domain
    const zone = route53.HostedZone.fromLookup(this, 'HostedZone', {
      domainName: siteDomain,
    });

    // TLS certificate
    const certificate = new acm.DnsValidatedCertificate(
      this,
      'SiteCertificate',
      {
        domainName: siteDomain,
        hostedZone: zone,
        region: 'us-east-1', // Cloudfront only checks this region for certificates.
      }
    );
    new CfnOutput(this, 'Certificate', { value: certificate.certificateArn });

    // Add a cloudfront Function to a Distribution
    const rewriteFunction = new cloudfront.Function(this, 'Function', {
      code: cloudfront.FunctionCode.fromFile({
        filePath: 'functions/url-rewrite.js',
      }),
    });

    // CloudFront distribution
    const distribution = new cloudfront.Distribution(this, 'SiteDistribution', {
      certificate: certificate,
      defaultRootObject: 'index.html',
      domainNames: [siteDomain],
      minimumProtocolVersion: cloudfront.SecurityPolicyProtocol.TLS_V1_2_2021,
      defaultBehavior: {
        origin: new cloudfront_origins.S3Origin(siteBucket, {
          originAccessIdentity: cloudfrontOAI,
        }),
        compress: true,
        allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
    });

    new CfnOutput(this, 'DistributionId', {
      value: distribution.distributionId,
    });

    // Route53 alias record for the CloudFront distribution
    new route53.ARecord(this, 'SiteAliasRecord', {
      recordName: siteDomain,
      target: route53.RecordTarget.fromAlias(
        new targets.CloudFrontTarget(distribution)
      ),
      zone,
    });

    new BucketDeployment(this, 'DeviceLabUiBucketDeployment', {
      sources: [Source.asset(`../waylo-site/build`)],
      destinationBucket: siteBucket,
      distribution,
      distributionPaths: ['/*'],
    });
  }
}
