var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost',function(error0,connection){
    
    if(error0){
        throw error0;
    }
    
    connection.createChannel(function(error1,channel){
        
        if(error1){
            throw error1;
        }
        var queue = "pipe";
        var msg = "Hello world";
        channel.assertQueue(queue,{durable:false});
        
        channel.sendToQueue(queue,Buffer.from(msg));
        console.log("%s sent",msg);
        
        
    });
    setTimeout(function(){
        connection.close();
        process.exit(0);
    }, 500);
    
});