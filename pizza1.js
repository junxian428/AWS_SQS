exports.handler = async (event) => {
    console.log(JSON.stringify(event));
    const order = JSON.parse(event.Records[0].body);
    console.log('Received order: ' , order);
    console.log('Making Pizza 1 ....');
    await sleep(5000)
};


function sleep(ms){
    return new Promise((resolve) => {
        setTimeout(resolve, 10);
    })
}
