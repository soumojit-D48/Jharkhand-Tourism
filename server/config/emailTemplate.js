// export const EMAIL_VERIFY_TEMPLATE = `
// <!DOCTYPE html>
// <html xmlns="http://www.w3.org/1999/xhtml">

// <head>
//   <title>Email Verify</title>
//   <meta http-equiv="X-UA-Compatible" content="IE=edge">
//   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap" rel="stylesheet" type="text/css">
//   <style type="text/css">
//     body {
//       margin: 0;
//       padding: 0;
//       font-family: 'Open Sans', sans-serif;
//       background: #E5E5E5;
//     }

//     table, td {
//       border-collapse: collapse;
//     }

//     .container {
//       width: 100%;
//       max-width: 500px;
//       margin: 70px 0px;
//       background-color: #ffffff;
//     }

//     .main-content {
//       padding: 48px 30px 40px;
//       color: #000000;
//     }

//     .button {
//       width: 100%;
//       background: #22D172;
//       text-decoration: none;
//       display: inline-block;
//       padding: 10px 0;
//       color: #fff;
//       font-size: 14px;
//       text-align: center;
//       font-weight: bold;
//       border-radius: 7px;
//     }

//     @media only screen and (max-width: 480px) {
//       .container {
//         width: 80% !important;
//       }

//       .button {
//         width: 50% !important;
//       }
//     }
//   </style>
// </head>

// <body>
//   <table width="100%" cellspacing="0" cellpadding="0" border="0" align="center" bgcolor="#F6FAFB">
//     <tbody>
//       <tr>
//         <td valign="top" align="center">
//           <table class="container" width="600" cellspacing="0" cellpadding="0" border="0">
//             <tbody>
//               <tr>
//                 <td class="main-content">
//                   <table width="100%" cellspacing="0" cellpadding="0" border="0">
//                     <tbody>
//                       <tr>
//                         <td style="padding: 0 0 24px; font-size: 18px; line-height: 150%; font-weight: bold;">
//                           Verify your email
//                         </td>
//                       </tr>
//                       <tr>
//                         <td style="padding: 0 0 10px; font-size: 14px; line-height: 150%;">
//                           You are just one step away to verify your account for this email: <span style="color: #4C83EE;">{{email}}</span>.
//                         </td>
//                       </tr>
//                       <tr>
//                         <td style="padding: 0 0 16px; font-size: 14px; line-height: 150%; font-weight: 700;">
//                           Use below OTP to verify your account.
//                         </td>
//                       </tr>
//                       <tr>
//                         <td style="padding: 0 0 24px;">
//                           <p class="button" >{{otp}}</p>
//                         </td>
//                       </tr>
//                       <tr>
//                         <td style="padding: 0 0 10px; font-size: 14px; line-height: 150%;">
//                           This OTP is valid for 24 hours.
//                         </td>
//                       </tr>
//                     </tbody>
//                   </table>
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//         </td>
//       </tr>
//     </tbody>
//   </table>
// </body>
// </html>

// `

// export const PASSWORD_RESET_TEMPLATE = `

// <!DOCTYPE html>
// <html xmlns="http://www.w3.org/1999/xhtml">

// <head>
//   <title>Password Reset</title>
//   <meta http-equiv="X-UA-Compatible" content="IE=edge">
//   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap" rel="stylesheet" type="text/css">
//   <style type="text/css">
//     body {
//       margin: 0;
//       padding: 0;
//       font-family: 'Open Sans', sans-serif;
//       background: #E5E5E5;
//     }

//     table, td {
//       border-collapse: collapse;
//     }

//     .container {
//       width: 100%;
//       max-width: 500px;
//       margin: 70px 0px;
//       background-color: #ffffff;
//     }

//     .main-content {
//       padding: 48px 30px 40px;
//       color: #000000;
//     }

//     .button {
//       width: 100%;
//       background: #22D172;
//       text-decoration: none;
//       display: inline-block;
//       padding: 10px 0;
//       color: #fff;
//       font-size: 14px;
//       text-align: center;
//       font-weight: bold;
//       border-radius: 7px;
//     }

//     @media only screen and (max-width: 480px) {
//       .container {
//         width: 80% !important;
//       }

//       .button {
//         width: 50% !important;
//       }
//     }
//   </style>
// </head>

// <body>
//   <table width="100%" cellspacing="0" cellpadding="0" border="0" align="center" bgcolor="#F6FAFB">
//     <tbody>
//       <tr>
//         <td valign="top" align="center">
//           <table class="container" width="600" cellspacing="0" cellpadding="0" border="0">
//             <tbody>
//               <tr>
//                 <td class="main-content">
//                   <table width="100%" cellspacing="0" cellpadding="0" border="0">
//                     <tbody>
//                       <tr>
//                         <td style="padding: 0 0 24px; font-size: 18px; line-height: 150%; font-weight: bold;">
//                           Forgot your password?
//                         </td>
//                       </tr>
//                       <tr>
//                         <td style="padding: 0 0 10px; font-size: 14px; line-height: 150%;">
//                           We received a password reset request for your account: <span style="color: #4C83EE;">{{email}}</span>.
//                         </td>
//                       </tr>
//                       <tr>
//                         <td style="padding: 0 0 16px; font-size: 14px; line-height: 150%; font-weight: 700;">
//                           Use the OTP below to reset the password.
//                         </td>
//                       </tr>
//                       <tr>
//                         <td style="padding: 0 0 24px;">
//                           <p class="button" >{{otp}}</p>
//                         </td>
//                       </tr>
//                       <tr>
//                         <td style="padding: 0 0 10px; font-size: 14px; line-height: 150%;">
//                           The password reset otp is only valid for the next 15 minutes.
//                         </td>
//                       </tr>
//                     </tbody>
//                   </table>
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//         </td>
//       </tr>
//     </tbody>
//   </table>
// </body>
// </html>
// `



export const WELCOME_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to Our Platform! 🎉</h1>
    </div>
    
    <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.08);">
        <h2 style="color: #333; margin-bottom: 20px;">Hello {{name}}!</h2>
        
        <p style="font-size: 16px; margin-bottom: 20px;">
            Thank you for joining us! We're thrilled to have you on board.
        </p>
        
        <p style="font-size: 16px; margin-bottom: 20px;">
            Your account has been successfully created with the email: <strong>{{email}}</strong>
        </p>
        
        <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea;">
            <h3 style="color: #667eea; margin-top: 0;">What's Next?</h3>
            <ul style="padding-left: 20px;">
                <li>Explore our features and services</li>
                <li>Complete your profile setup</li>
                <li>Connect with our community</li>
            </ul>
        </div>
        
        <p style="font-size: 16px; margin-bottom: 30px;">
            If you have any questions or need assistance, feel free to reach out to our support team.
        </p>
        
        <div style="text-align: center; margin: 30px 0;">
            <a href="#" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block;">
                Get Started
            </a>
        </div>
        
        <p style="text-align: center; color: #666; font-size: 14px; margin-top: 30px;">
            Best regards,<br>
            The Team
        </p>
    </div>
</body>
</html>
`

export const PASSWORD_RESET_TEMPLATE = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 28px;">Password Reset 🔐</h1>
    </div>
    
    <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.08);">
        <h2 style="color: #333; margin-bottom: 20px;">Reset Your Password</h2>
        
        <p style="font-size: 16px; margin-bottom: 20px;">
            We received a request to reset the password for your account: <strong>{{email}}</strong>
        </p>
        
        <div style="background: white; padding: 25px; border-radius: 8px; margin: 25px 0; text-align: center; border: 2px dashed #ff6b6b;">
            <h3 style="color: #ff6b6b; margin-top: 0; margin-bottom: 15px;">Your OTP Code</h3>
            <div style="font-size: 36px; font-weight: bold; color: #333; letter-spacing: 5px; font-family: 'Courier New', monospace;">
                {{otp}}
            </div>
            <p style="color: #666; font-size: 14px; margin-top: 15px; margin-bottom: 0;">
                This code will expire in 15 minutes
            </p>
        </div>
        
        <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 0; color: #856404; font-size: 14px;">
                <strong>Security Notice:</strong> If you didn't request this password reset, please ignore this email. Your password will remain unchanged.
            </p>
        </div>
        
        <p style="font-size: 16px; margin-bottom: 20px;">
            Enter this OTP code on the password reset page to proceed with creating your new password.
        </p>
        
        <p style="text-align: center; color: #666; font-size: 14px; margin-top: 30px;">
            Best regards,<br>
            The Security Team
        </p>
    </div>
</body>
</html>
`