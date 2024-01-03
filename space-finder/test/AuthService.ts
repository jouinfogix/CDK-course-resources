import { type CognitoUser } from '@aws-amplify/auth';
import { Amplify, Auth } from 'aws-amplify';
import { CognitoIdentityClient } from '@aws-sdk/client-cognito-identity';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-providers';


const awsRegion = 'us-east-1'

Amplify.configure({
    Auth: {
        region: awsRegion,
        userPoolId: 'us-east-1_9QemItG9J',
        userPoolWebClientId: '7e4dto1jqmbi1kc2mah6p2bk2s',
        identityPoolId: 'us-east-1:aefadbb4-728c-4d62-a8b4-d859bcb498b6',
        authenticationFlowType: 'USER_PASSWORD_AUTH'
    }
});



export class AuthService {


    public async login(userName: string, password: string) {
        const result = await Auth.signIn(userName, password) as CognitoUser;
        //const result = await Auth.signIn(userName, password);
        return result;
    }

    public async generateTemporaryCredentials(user: CognitoUser){
    //public async generateTemporaryCredentials(user: any){
        const jwtToken = user.getSignInUserSession().getIdToken().getJwtToken();
        const cognitoIdentityPool = `cognito-idp.${awsRegion}.amazonaws.com/us-east-1_9QemItG9J`;
        const cognitoIdentity = new CognitoIdentityClient({
            credentials: fromCognitoIdentityPool({
                identityPoolId: 'us-east-1:aefadbb4-728c-4d62-a8b4-d859bcb498b6',
                logins: {
                    [cognitoIdentityPool]: jwtToken
                }
            })
        });
        const credentials = await cognitoIdentity.config.credentials();
        return credentials;
    }
}