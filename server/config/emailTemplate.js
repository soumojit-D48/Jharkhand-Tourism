

export const WELCOME_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Jharkhand Eco Quest</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
    </style>
</head>
<body style="font-family: 'Poppins', Arial, sans-serif; line-height: 1.6; color: #2c3e50; max-width: 650px; margin: 0 auto; padding: 0; background-color: #f8fffe;">
    <!-- Header with Jharkhand landscape gradient -->
    <div style="background: linear-gradient(135deg, #27ae60 0%, #2ecc71 25%, #f39c12 75%, #e67e22 100%); padding: 40px 30px; text-align: center; position: relative; overflow: hidden;">
        <div style="position: absolute; top: 10px; right: 20px; color: rgba(255,255,255,0.8); font-size: 12px;">
            Government of Jharkhand Initiative
        </div>
        <h1 style="color: white; margin: 0; font-size: 32px; font-weight: 600; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">
            🌿 Welcome to Eco Quest Jharkhand! 🏔️
        </h1>
        <p style="color: rgba(255,255,255,0.95); margin: 10px 0 0 0; font-size: 16px; font-weight: 300;">
            Your Gateway to Sustainable Tourism & Cultural Heritage
        </p>
    </div>
    
    <!-- Main Content -->
    <div style="background: white; padding: 40px 30px; box-shadow: 0 8px 32px rgba(0,0,0,0.1);">
        <div style="text-align: center; margin-bottom: 30px;">
            <h2 style="color: #27ae60; margin: 0; font-size: 24px; font-weight: 500;">
                Welcome {{name}}! 🙏
            </h2>
            <div style="width: 60px; height: 3px; background: linear-gradient(90deg, #27ae60, #f39c12); margin: 15px auto;"></div>
        </div>
        
        <p style="font-size: 16px; margin-bottom: 25px; color: #34495e;">
            Welcome to Jharkhand's premier digital platform for eco-tourism and cultural exploration! We're delighted to have you join our community of conscious travelers and culture enthusiasts.
        </p>
        
        <p style="font-size: 16px; margin-bottom: 25px; color: #34495e;">
            Your account has been successfully created with: <strong style="color: #27ae60;">{{email}}</strong>
        </p>
        
        <!-- Features Section -->
        <div style="background: linear-gradient(135deg, #ecf0f1 0%, #f8f9fa 100%); padding: 30px; border-radius: 15px; margin: 30px 0; border: 1px solid #e8f5e8;">
    <h3 style="color: #27ae60; margin-top: 0; margin-bottom: 20px; font-size: 20px; text-align: center;">
        🌟 Discover Jharkhand's Treasures
    </h3>

    <!-- Table layout for better email support -->
    <table width="100%" cellpadding="10" cellspacing="0" style="text-align: center;">
        <tr>
            <td width="33%" style="padding: 15px;">
                <div style="font-size: 32px; margin-bottom: 10px;">🏞️</div>
                <h4 style="color: #2c3e50; margin: 0 0 8px 0; font-size: 16px;">Eco Tourism</h4>
                <p style="color: #7f8c8d; font-size: 13px; margin: 0;">Explore pristine forests, waterfalls & wildlife</p>
            </td>
            <td width="33%" style="padding: 15px;">
                <div style="font-size: 32px; margin-bottom: 10px;">❤</div>
                <h4 style="color: #2c3e50; margin: 0 0 8px 0; font-size: 16px;">Cultural Heritage</h4>
                <p style="color: #7f8c8d; font-size: 13px; margin: 0;">Experience tribal art, festivals & traditions</p>
            </td>
            <td width="33%" style="padding: 15px;">
                <div style="font-size: 32px; margin-bottom: 10px;">🌱</div>
                <h4 style="color: #2c3e50; margin: 0 0 8px 0; font-size: 16px;">Sustainable Travel</h4>
                <p style="color: #7f8c8d; font-size: 13px; margin: 0;">Support local communities & environment</p>
            </td>
        </tr>
    </table>
</div>

        
        <!-- Next Steps -->
        <div style="background: white; padding: 25px; border-radius: 12px; margin: 25px 0; border-left: 5px solid #f39c12; box-shadow: 0 4px 15px rgba(243, 156, 18, 0.1);">
            <h3 style="color: #f39c12; margin-top: 0; margin-bottom: 15px; font-size: 18px;">🚀 Get Started Today</h3>
            <ul style="padding-left: 20px; color: #34495e;">
                <li style="margin-bottom: 8px;">Learn about Jharkhand’s rich cultural heritage and traditions</li>
                <li style="margin-bottom: 8px;">Browse eco-friendly destinations across Jharkhand</li>
                <li style="margin-bottom: 8px;">Book sustainable accommodations & experiences</li>
                <li style="margin-bottom: 8px;">Connect with local guides and communities</li>
                <li style="margin-bottom: 8px;">Share your experiences and inspire other travelers</li>
            </ul>
        </div>
        
        <!-- CTA Button -->
        <div style="text-align: center; margin: 40px 0;">
            <a href="https://eco-quest-7p8q.onrender.com" style="background: linear-gradient(135deg, #27ae60 0%, #2ecc71 50%, #f39c12 100%); color: white; padding: 15px 35px; text-decoration: none; border-radius: 50px; font-weight: 500; font-size: 16px; display: inline-block; box-shadow: 0 6px 20px rgba(39, 174, 96, 0.3); transition: all 0.3s ease;">
                🌿 Start Your Eco Quest
            </a>
        </div>
        
        
        <!-- Footer -->
        <div style="text-align: center; margin-top: 40px; padding-top: 30px; border-top: 1px solid #ecf0f1;">
            <p style="color: #7f8c8d; font-size: 14px; margin: 0 0 10px 0;">
                With warm regards,<br>
                <strong style="color: #27ae60;">Team Eco Quest</strong><br>
                <em style="font-size: 12px;">A Government of Jharkhand Digital Initiative</em>
            </p>
            <div style="margin-top: 20px;">
                
                <span style="font-size: 12px; color: #95a5a6;">🌿 Sustainable Tourism • Cultural Heritage • Responsible Travel 🌿</span>
            </div>
        </div>
    </div>
</body>
</html>
`;

export const PASSWORD_RESET_TEMPLATE = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset - Eco Quest Jharkhand</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
    </style>
</head>
<body style="font-family: 'Poppins', Arial, sans-serif; line-height: 1.6; color: #2c3e50; max-width: 650px; margin: 0 auto; padding: 0; background-color: #f8fffe;">
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #e74c3c 0%, #c0392b 50%, #d35400 100%); padding: 40px 30px; text-align: center; position: relative;">
        <div style="position: absolute; top: 10px; right: 20px; color: rgba(255,255,255,0.8); font-size: 12px;">
            Organization: Government of Jharkhand
        </div>
        <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 600; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">
            🔐 Account Security Alert
        </h1>
        <p style="color: rgba(255,255,255,0.95); margin: 10px 0 0 0; font-size: 15px;">
            Eco Quest Jharkhand - Password Reset Request
        </p>
    </div>
    
    <!-- Main Content -->
    <div style="background: white; padding: 40px 30px; box-shadow: 0 8px 32px rgba(0,0,0,0.1);">
        <div style="text-align: center; margin-bottom: 30px;">
            <h2 style="color: #e74c3c; margin: 0; font-size: 22px; font-weight: 500;">
                Password Reset Request
            </h2>
            <div style="width: 60px; height: 3px; background: linear-gradient(90deg, #e74c3c, #d35400); margin: 15px auto;"></div>
        </div>
        
        <p style="font-size: 16px; margin-bottom: 25px; color: #34495e;">
            We received a request to reset the password for your Eco Quest Jharkhand account:
        </p>
        
        <p style="font-size: 16px; margin-bottom: 30px; color: #34495e;">
            <strong style="color: #e74c3c;">Account Email:</strong> {{email}}
        </p>
        
        <!-- OTP Section -->
        <div style="background: linear-gradient(135deg, #fff5f5 0%, #fef7f7 100%); padding: 35px; border-radius: 15px; margin: 30px 0; text-align: center; border: 2px solid #fadbd8; position: relative;">
            <div style="position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background: white; padding: 0 15px; color: #e74c3c; font-size: 14px; font-weight: 500;">
                🔑 SECURE ACCESS CODE
            </div>
            <h3 style="color: #c0392b; margin: 20px 0 15px 0; font-size: 18px;">Your One-Time Password (OTP)</h3>
            <div style="background: white; padding: 25px; border-radius: 10px; margin: 20px 0; border: 2px dashed #e74c3c; box-shadow: 0 4px 15px rgba(231, 76, 60, 0.1);">
                <div style="font-size: 42px; font-weight: 700; color: #c0392b; letter-spacing: 8px; font-family: 'Courier New', monospace; text-shadow: 1px 1px 2px rgba(0,0,0,0.1);">
                    {{otp}}
                </div>
            </div>
            <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 12px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0; color: #856404; font-size: 13px;">
                    ⏱️ <strong>Valid for 15 minutes only</strong>
                </p>
            </div>
        </div>
        
        <!-- Instructions -->
        <div style="background: #f8f9fa; padding: 25px; border-radius: 12px; margin: 25px 0; border-left: 5px solid #3498db;">
            <h3 style="color: #3498db; margin-top: 0; margin-bottom: 15px; font-size: 16px;">📋 How to Reset Your Password</h3>
            <ol style="padding-left: 20px; color: #34495e; font-size: 14px;">
                <li style="margin-bottom: 8px;">Return to the password reset page on Eco Quest platform</li>
                <li style="margin-bottom: 8px;">Enter the OTP code exactly as shown above</li>
                <li style="margin-bottom: 8px;">Create a strong new password (min. 8 characters)</li>
                <li style="margin-bottom: 8px;">Confirm your new password and save changes</li>
            </ol>
        </div>
        
        <!-- Security Notice -->
        <div style="background: linear-gradient(135deg, #fff8e1 0%, #fffbf0 100%); border: 1px solid #ffcc02; padding: 20px; border-radius: 10px; margin: 25px 0;">
            <h4 style="color: #f57f17; margin: 0 0 12px 0; font-size: 16px;">
                🛡️ Security Notice
            </h4>
            <ul style="color: #bf360c; font-size: 14px; margin: 0; padding-left: 20px;">
                <li style="margin-bottom: 6px;">If you didn't request this password reset, please ignore this email</li>
                <li style="margin-bottom: 6px;">Never share your OTP with anyone, including our support team</li>
                <li style="margin-bottom: 6px;">This code will automatically expire after 15 minutes</li>
                <!-- <li>For security concerns, contact us immediately at security@ecoquest-jharkhand.gov.in</li> -->
            </ul>
        </div>
        
        <p style="font-size: 15px; margin: 30px 0 20px 0; color: #34495e;">
            Once you've successfully reset your password, you'll be able to continue exploring Jharkhand's beautiful eco-tourism destinations and cultural heritage sites.
        </p>
        
        
        <!-- Footer -->
        <div style="text-align: center; margin-top: 40px; padding-top: 30px; border-top: 1px solid #ecf0f1;">
            <p style="color: #7f8c8d; font-size: 14px; margin: 0 0 10px 0;">
                Regards,<br>
                <strong style="color: #e74c3c;">Security Team - Eco Quest Jharkhand</strong><br>
                <em style="font-size: 12px;">Government of Jharkhand Digital Tourism Initiative</em>
            </p>
            <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #f1f2f6;">
                <span style="font-size: 12px; color: #95a5a6;">🔒 Your security is our priority • Sustainable Tourism • Cultural Heritage 🌿</span>
            </div>
        </div>
    </div>
</body>
</html>
`;
