var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost',function(error0,connection){
    
    if(error0){
        throw error0;
    }
    
    connection.createChannel(function(error1,channel){
        
        if(error1){
            throw error1;
        }
        var queue = "task_queue";
        var msg = process.argv.slice(2).join() || "Hellow World.....!";
        channel.assertQueue(queue,{durable:true});
        
        channel.sendToQueue(queue,Buffer.from(msg),{persistent: true});
        console.log("%s sent",msg);
        
        
    });
    setTimeout(function(){
        connection.close();
        process.exit(0);
    }, 500);
    
});