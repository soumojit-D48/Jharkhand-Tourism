// import nodemailer from 'nodemailer'

// const transporter = nodemailer.createTestAccount({
//     host: 'smtp-relay.brevo.com',
//     port: 587,
//     secure: false, // true for port 465, false for 587
//     auth: {
//         user: process.env.SMTP_USER,
//         pass: process.env.SMTP_PASSWORD
//     }
// })

// export default transporter







// import nodemailer from "nodemailer";

// const transporter = nodemailer.createTransport({
//   host: "smtp-relay.brevo.com",
//   port: 587,
//   secure: false, // use true for 465
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASSWORD,
//   },
// });

// export default transporter;


// import nodemailer from "nodemailer";

// const transporter = nodemailer.createTransport({
// //   host: "smtp-relay.brevo.com", // Brevo (Sendinblue) SMTP
//   host: process.env.SMTP_USER, // Brevo (Sendinblue) SMTP
//   port: 587,
// //   secure: false, // use true for port 465
//   auth: {
//     user: process.env.SMTP_USER,      // your Brevo email/username
//     pass: process.env.SMTP_PASSWORD,  // your Brevo API key
//   },
// });


// import nodemailer from 'nodemailer'

// const transporter = nodemailer.createTransport({
//     host: 'smtp-relay.brevo.com',
//     port: 587,
//     auth: {
//         user: process.env.SMTP_USER,
//         pass: process.env.SMTP_PASSWORD
//     }

// })

// export default transporter;



// import nodemailer from 'nodemailer'

// const transporter = nodemailer.createTransport({
//   host: 'smtp-relay.brevo.com', // Brevo SMTP host
//   port: 587,                     // TLS port
//   secure: false,                 // false for port 587
//   auth: {
//     user: process.env.SMTP_USER,     // your Brevo SMTP email
//     pass: process.env.SMTP_PASSWORD  // your SMTP password
//   },
//   tls: {
//     rejectUnauthorized: false      // sometimes needed for local dev
//   }
// })

// export default transporter


// const transporter = nodemailer.createTransport(
//     {
//         secure: true,
//         host: 'smtp.gamil.com',
//         port: 465,
//         auth: {
//             user: '',
//             pass: ''
//         }
//     }
// )



import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    service: 'gmail',
    // OR use explicit config:
    // host: 'smtp.gmail.com',
    // port: 587,
    // secure: false,
    // auth: {
    //     user: process.env.GMAIL_USER,
    //     pass: process.env.GMAIL_APP_PASSWORD  
    // }

    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD  
    }
})

// Verify connection configuration
// transporter.verify(function (error, success) {
//     if (error) {
//         console.log('❌ SMTP connection error:', error.message);
//         console.log('GMAIL_USER:', process.env.GMAIL_USER ? '✅ Set' : '❌ Not set');
//         console.log('GMAIL_APP_PASSWORD:', process.env.GMAIL_APP_PASSWORD ? '✅ Set' : '❌ Not set');
//     } else {
//         console.log('✅ Gmail SMTP server is ready to send emails');
//     }
// });

export default transporter