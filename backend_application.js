const AWS = require('aws-sdk');
AWS.config.update({region : 'us-east-1'});
const sqs = new AWS.SQS();
const sqsURL = `https:///.fifo`;
const numberOfPizzaShops =2;

const numberOfOrders = 100;

exports.handler = async (event) => {
    let orderId = 1000;
    const records = [];
    for(let i =0; i < numberOfOrders ; i++){
        const params = {
            MessageBody: JSON.stringify({
            orderId : orderId,
            order : `pizza - ${Math.floor(Math.random() * 10)}`,
            timestamp: new Date().toISOString()
        }),
        QueueUrl: sqsURL,
        MessageDeduplicationId: orderId.toString(),
        MessageGroupId: `group-${i % numberOfPizzaShops}`
            
        }
        records.push(params);
        orderId++;
        
    }
    for(const record of records){
        await sqs.sendMessage(record).promise().then((response) => {
            console.log(JSON.stringify(response));
        }, error => {
            console.error(error);
        })
    }
};
