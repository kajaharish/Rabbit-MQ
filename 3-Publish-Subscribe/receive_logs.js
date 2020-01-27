var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost',(error,connection)=>{
    if(error){
        throw error;
    }
    connection.createChannel((error1,channel)=>{
        if(error1){
            throw error1;
        }
        var exchange = 'logs';
        channel.assertExchange(exchange,'fanout',{durable:false});
        channel.assertQueue('',{exclusive:false},(error2,q)=>{
            if(error2){
                throw error2;
            }
            console.log("[x] waiting for the messages in %s : ",q.queue);
            channel.bindQueue(q.queue,exchange,'');
            channel.consume(q.queue,(msg)=>{if(msg.content) {console.log('[x] received msg is %s',msg.content.toString())} },{noAck:true} );

        });
    })
});
