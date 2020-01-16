var amqp = require('amqplib/callback_api');
amqp.connect('amqp://localhost',(error,connection)=>{
	if(error){
		throw error;
	}
	connection.createChannel((error1,channel)=>{
		if(error1){
			throw error1;
		}
		var queue = 'hello';
		var msg = 'Hello Boy';
		
		channel.assertQueue(queue,{durable:false});
		
		channel.sendToQueue(queue, Buffer.from(msg));
		console.log(" [x] sent %s",msg);
	});
	setTimeout(()=> {
		connection.close();
		process.exit(0);
	},500);
});
