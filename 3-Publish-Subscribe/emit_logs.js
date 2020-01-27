var amqp = require('amqplib/callback_api')

amqp.connect('amqp://localhost',(error,connection)=>{
    if(error){
        throw error;
    }
    connection.createChannel((error1,channel)=>{
        if(error1){
            throw error1;
        }
        var exchange = "logs";
        var msg = process.argv.slice(2).join() || 'hello world';

        channel.assertExchange(exchange,'fanout',{durable:false});
        channel.publish(exchange,'',Buffer.from(msg));
        console.log("[x] msg sent %s",msg);
    });
    setTimeout(()=>{
        connection.close();
        process.exit(0);
    },500);
});
