import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.GMAIL_USER,
        clientId: process.env.GMAIL_CLIENT_ID,
        clientSecret: process.env.GMAIL_CLIENT_SECRET,
        refreshToken: process.env.GMAIL_REFRESH_TOKEN,
    },
});

const checkEmailConnection = async () => {
    try {
        await transporter.verify();
        console.log('[Nodemailer] Gmail connection is working');
        return true;
    } catch (error) {
        console.error(
            '[Nodemailer] Gmail connection failed:',
            error?.message || error
        );
        return false;
    }
};

const sendEmail = async ({ to, subject, html, text }) => {
    try {
        await transporter.sendMail({
            from: `"InterviewReady | Get Hired!" <${process.env.GMAIL_USER}>`,
            to,
            subject,
            text,
            html,
        });
        console.log(`Email sent successfully to ${to}`);
    } catch (error) {
        console.error(`Failed to send email to ${to}\n:`, error?.stack || error);
        throw error;
    }
};

async function sendWelcomeEmail(userEmail, name) {
    const subject = 'Welcome Message';

    const text = `
        Dear ${name},

        Welcome to Interview Ready Platform!

        We're excited to have you with us. Your account has been successfully created, and you're now ready to start preparing for your interviews.

        With Interview Ready, you can practice interviews, improve your skills, and get valuable feedback to help you become more confident and interview - ready.

        Good luck with your interview preparation!

        Regards,
        Interview Ready Team
    `;

    const html = `
            <h2 style="color: #222;">
                Welcome to Interview Ready!
            </h2>

            <p>Dear <strong>${name}</strong>,</p>

            <p>
                We're excited to have you with us.
            </p>

            <p>
                Your account has been successfully created, and you're now ready
                to start preparing for your interviews.
            </p>

            <div style="
                background: #f5f5f5;
                border-radius: 8px;
                padding: 20px;
                margin: 20px 0;
            ">
                <h3 style="margin-top: 0;">
                    Start Your Interview Preparation
                </h3>

                <p style="margin-bottom: 0;">
                    Practice interviews, improve your skills, and get valuable
                    feedback to become more confident and interview-ready.
                </p>
            </div>

            <p>
                We're glad to have you on board. It's time to start preparing
                and take the next step toward your career goals!
            </p>

            <p>
                Good luck with your interview preparation!
            </p>

            <p>
                Regards,<br />
                <strong>Interview Ready Team</strong>
            </p>
        </div >
    `;

    await sendEmail({
        to: userEmail,
        subject,
        text,
        html,
    });
}

async function sendLoginAlertEmail(userEmail, name, loginTime) {
    const subject = 'Welcome Back to Interview Ready!';

    const text = `       
       We're glad to have you back. Your account was successfully logged in at: ${loginTime} 
       
       You can now continue your interview preparation, practice mock interviews, and work towards becoming interview ready. 
       
       If you did not log in to your account, please change your password immediately and contact our support team. 
       
       Didn't log in? 
       If you don't recognize this login, please secure your account immediately. 
       
       Regards, 
       Interview Ready Team
    `;

    const html = `
    <div style="
        font-family: Arial, sans-serif;
        max-width: 600px;
        margin: auto;
        color: #292524;
    ">

        <h2>Welcome Back to Interview Ready!</h2>

        <p>Dear <strong>${name}</strong>,</p>

        <p>
            Welcome back! We're glad to have you with us again.
        </p>

        <p>
            Your Interview Ready account was successfully logged in at:
        </p>

        <div style="
            background: #f5f5f5;
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 15px;
            margin: 20px 0;
        ">
            <strong>Login Time:</strong> ${loginTime}
        </div>

        <p>
            You can now continue your interview preparation, practice mock
            interviews, and work towards becoming interview-ready.
        </p>

        <div style="
            background: #fff8e1;
            border-left: 4px solid #ffc107;
            padding: 12px;
            margin-top: 20px;
        ">
            <strong>Didn't log in?</strong>

            <p style="margin-bottom: 0;">
                If you don't recognize this login, please change your password
                immediately and contact our support team to secure your account.
            </p>
        </div>

        <p>
            Keep learning, keep practicing, and keep moving closer to your
            dream opportunity! 
        </p>

        <p>
            Regards,<br />
            <strong>Interview Ready Team</strong>
        </p>

    </div>
`;

    await sendEmail({
        to: userEmail,
        subject,
        text,
        html,
    });
}

async function OtpEmail(userEmail, otp) {
    const subject = 'Your Interview Ready Login OTP';

    const text = `
        Hello,
        
        Welcome back to Interview Ready 👋
        
        Your login OTP is: ${otp}
        
        This code is valid for a short time and can be used only once. If this wasn't you, please ignore this message.
        
        Need help? Reach us at jhaashutosh0811@gmail.com
        
        Regards,
        Interview Ready
    `.trim();

    const html = `
        <div style="font-family: Arial, sans-serif; font-size: 15px; line-height: 1.6; color: #292524; max-width: 480px;">
            <p>Hello,</p>

            <p>Welcome back to <strong>Interview Ready</strong> 👋</p>

            <p>Your login OTP is: <strong style="font-size: 17px; letter-spacing: 1px;">${otp}</strong></p>

            <p>This code is valid for a short time and can be used only once. If this wasn't you, please ignore this message.</p>

            <p>Need help? Reach us at <a href="mailto:jhaashutosh0811@gmail.com" style="color: #0B4D3B;"> jhaashutosh0811@gmail.com</a></p>

            <p>
                Regards,<br />
                <strong>Interview Ready</strong>
            </p>
        </div>
    `.trim();

    await sendEmail({
        to: userEmail,
        subject,
        text,
        html,
    });
}

export { sendWelcomeEmail, sendLoginAlertEmail, OtpEmail, checkEmailConnection }