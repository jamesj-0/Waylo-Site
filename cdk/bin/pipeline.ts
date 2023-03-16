#!/usr/bin/env node
import 'source-map-support/register';
import { App } from 'aws-cdk-lib';
import { PipelineStack } from '../lib/pipeline-stack';

const app = new App();
new PipelineStack(app, 'WayloSitePipelineStack', {
  env: { account: '843915320366', region: 'eu-west-1' },
});
