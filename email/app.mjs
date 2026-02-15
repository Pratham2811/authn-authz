import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: "smtp.resend.com",
  port: 587,
  secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user: "resend",
    pass: "",
  },
});

const info=await transporter.sendMail({
    from:'"Prathamesh Madane" <prathamesh@cloudmemories.in>',
    to:"prathameshmadane09@gmail.com",
    subject:"Hello",
    // text:"Hello, Prathamesh",
   html:"<h2>Hello prathames<h2>"
})
console.log(info.messageId);
