import { MailtrapClient } from "mailtrap"

const TOKEN = "d3f91e9c4305f67fdb194fff43d73f0d";
const SENDER_EMAIL = "mailtrap@demomailtrap.com";
const RECIPIENT_EMAIL = "chetan.rajawat25@gmail.com";

const client = new MailtrapClient({ token: TOKEN });

const sender = { name: "Mailtrap Test", email: SENDER_EMAIL };


try{
    await client.send({
    from: sender,
    to: [{ email: RECIPIENT_EMAIL }],
    subject: "Hello from Mailtrap!",
    text: "Welcome to Mailtrap Sending!",
  })


  
}catch(err){
    console.log(err.message)
}
