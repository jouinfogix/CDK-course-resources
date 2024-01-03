import { handler } from "../src/services/spaces/handler";


process.env.AWS_REGION = "us-east-1";
process.env.TABLE_NAME = 'SpaceTable-0a1f9941085d';

handler({
//     httpMethod: 'DELETE',
//     queryStringParameters: {
//         id: '71368228-a53c-4e67-9ef6-1829f21127ae'
//     },
//     // body: JSON.stringify({
//     //     location: 'Dublin updated'
//     // })
// } as any, {} as any);

httpMethod: 'PUT',
    queryStringParameters: {
        id: 'fbe76aea-5aff-434e-85f6-e8f5fc1647ec'
    },
    body: JSON.stringify({
        location: 'Best location 2'
    })
} as any, {} as any).then(result =>{
    console.log(result)
});