const AWS = require('aws-sdk');

AWS.config.update({
    region: "us-east-1"
});

const dynamo = new AWS.DynamoDB.DocumentClient();
const TABLE = "CookrUsers";

module.exports = {
    putUser: async (user) => {
        await dynamo.put({
            TableName: TABLE,
            Item: user
        }).promise();
    },

    getUserByEmail: async (email) => {
        const params = {
            TableName: TABLE,
            IndexName: "email-index",
            KeyConditionExpression: "email = :e",
            ExpressionAttributeValues: { ":e": email }
        };

        const result = await dynamo.query(params).promise();
        return result.Items[0];
    },

    updateUser: async (userId, updates) => {
        const updateExpression = [];
        const values = {};

        for (const key in updates) {
            updateExpression.push(`${key} = :${key}`);
            values[`:${key}`] = updates[key];
        }

        await dynamo.update({
            TableName: TABLE,
            Key: { userId },
            UpdateExpression: `set ${updateExpression.join(', ')}`,
            ExpressionAttributeValues: values
        }).promise();
    }
};
