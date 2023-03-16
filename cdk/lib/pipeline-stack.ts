import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {
  CodeBuildStep,
  CodePipeline,
  CodePipelineSource,
} from 'aws-cdk-lib/pipelines';
import { PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { PipelineStage } from './pipeline-stage';
import { S3DeployAction } from 'aws-cdk-lib/aws-codepipeline-actions';

const REPO_NAME = 'jamesj-0/waylo-site';
const BUCKET_NAME = 'your-s3-bucket-name';

export class PipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const input = CodePipelineSource.gitHub(REPO_NAME, 'main', {
      authentication: cdk.SecretValue.secretsManager('github-access-token'),
    });

    const pipeline = new CodePipeline(this, 'WayloSiteUiPipeline', {
      pipelineName: 'WayloSiteUiPipeline',
      synth: new CodeBuildStep('BuildAndSynthStep', {
        input,
        commands: [
          // Run unit tests so we can "fail fast"
          './scripts/build.sh',
          // The result of this step must be to "synth" the pipeline
          './scripts/synth.sh',
        ],
        rolePolicyStatements: [
          new PolicyStatement({
            actions: [
              'codeartifact:List*',
              'codeartifact:Describe*',
              'codeartifact:Get*',
              'codeartifact:Read*',
            ],
            resources: ['*'],
          }),
          new PolicyStatement({
            actions: ['sts:GetServiceBearerToken'],
            resources: ['*'],
            conditions: {
              StringEquals: {
                'sts:AWSServiceName': 'codeartifact.amazonaws.com',
              },
            },
          }),
        ],
        primaryOutputDirectory: 'cdk/cdk.out',
      }),
    });

    pipeline.addStage(
      new PipelineStage(this, 'WayloSiteDeploymentStage', {
        env: { account: '843915320366', region: 'eu-west-1' },
      })
    );
  }
}
