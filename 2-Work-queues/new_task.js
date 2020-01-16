var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost',(error,connection)=>{
    if(error){
        throw error;
    }
    connection.createChannel((error1,channel)=>{
        if(error1){
            throw error1;
        }
        var queue = 'task_queue';
        var msg = process.argv.slice(2).join(' ') || "hello world!";
        channel.assertQueue(queue,{durable:true});
        channel.sendToQueue(queue,Buffer.from(msg),{persistent:true});

    });
    setTimeout(()=>{
        connection.close();
        process.exit(0);
    }, 500);
});
