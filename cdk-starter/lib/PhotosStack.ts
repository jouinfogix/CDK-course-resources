import { Construct } from "constructs";
import * as cdk from 'aws-cdk-lib';
import { Bucket, CfnBucket } from "aws-cdk-lib/aws-s3";
//import { Fn } from "aws-cdk-lib";
import { CfnOutput, Fn } from "aws-cdk-lib";

export class PhotosStack extends cdk.Stack {

    private stackSuffix: string;
    public readonly photosBucketArn: string;

    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

      this.initializeSuffix();

        //(myBucket.node.defaultChild as CfnBucket).overrideLogicalId('photosbucket4462346')

        const photosBucket =  new Bucket(this, 'PhotosBucket2', {
                bucketName: `photos-bucket-${this.stackSuffix}`
            });
        this.photosBucketArn = photosBucket.bucketArn;

      
    }
      // create a new resource
        // delete the old one
    private initializeSuffix(){
        const shortStackId = Fn.select(2, Fn.split('/', this.stackId))
        this.stackSuffix = Fn.select(4, Fn.split('-', shortStackId))
    }
}