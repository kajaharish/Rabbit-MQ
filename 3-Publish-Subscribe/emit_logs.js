var amqp = require('amqplib/callback_api')

amqp.connect('amqp://localhost',(error,connection)=>{
    if(error){
        throw error;
    }
    connection.createChannel((error,channel)=>{
        if(error){
            throw error;
        }
        var exchange = "logs";
        var msg = process.argv.slice(2).join() || 'hello world';

        channel.assertExchange(exchange,'fanout',{durable:false});
        channel.publish(exchange,'',Buffer.from(msg));
    })
})
