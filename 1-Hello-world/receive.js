#!/usr/bin/env node
var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost',(error,connection)=>{
    if(error){
        throw error;
    }
    connection.createChannel((error1,channel)=>{
        if(error1){
            throw error1;
        }
        var queue = "hello";
        channel.assertQueue(queue,{durable:false});
        console.log('[x] waiting for messages in %s:',queue);
        channel.consume(queue,(msg)=>console.log(msg.content.toString()),{noAck:true});
    })
});
