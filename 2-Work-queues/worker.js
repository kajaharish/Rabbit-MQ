var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost',(error,connection)=>{
    if(error){
        throw error;
    }
    connection.createChannel((error1,channel)=>{
        if(error1){
            throw error1;
        }

        var queue='task_queue';
        channel.assertQueue(queue,{durable:true});
        channel.consume(queue,(msg)=>{
            var secs = msg.content.toString().split('.').length - 1;
            console.log('[x] received %s',msg.content.toString());
            setTimeout(()=>{
                console.log("[x] Done");
            },secs *1000);
        },{noAck:false});
    })
});
