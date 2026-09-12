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
            from: `"SecureBank" <${process.env.GMAIL_USER}>`,
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

async function sendWelcomeEmail(userEmail, name, otp) {
    const subject = 'Welcome to Interview Ready Platform';

    const text = `
        Dear ${name},

        Welcome to Interview Ready Platform!

        Your One-Time Password (OTP) for email verification is:
        ${otp}

        This OTP is valid for 5 minutes.

        If you did not create an account with us, please ignore this email or contact our support team immediately.

        For your security:
        - Never share this OTP with anyone.
        - This OTP can only be used once.

        Good luck with your interview prep!
        Regards,
        Interview Ready Team
    `;

    const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
            <h2>Verify your Interview Ready account</h2>

            <p>Dear <strong>${name}</strong>,</p>

            <p>Thanks for signing up with Interview Ready \u2014 let's get you interview-ready.</p>

            <p>Please use the following One-Time Password (OTP) to verify your email address:</p>

            <div style="
                background: #f5f5f5;
                border: 1px solid #ddd;
                border-radius: 8px;
                padding: 20px;
                text-align: center;
                margin: 20px 0;
            ">
                <span style="
                    font-size: 32px;
                    font-weight: bold;
                    letter-spacing: 8px;
                ">
                    ${otp}
                </span>
            </div>

            <p>
                <strong>Validity:</strong> This OTP will expire in
                <strong>5 minutes</strong>.
            </p>

            <div style="
                background: #fff8e1;
                border-left: 4px solid #ffc107;
                padding: 12px;
                margin-top: 20px;
            ">
                <strong>Security Reminder</strong>
                <ul>
                    <li>Never share your OTP with anyone.</li>
                    <li>Interview Ready will never ask for your OTP.</li>
                    <li>If you did not request this verification, ignore this email and contact support.</li>
                </ul>
            </div>

            <p>
                Good luck with your prep!<br />
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

async function sendLoginAlertEmail(userEmail, name, loginTime) {
    const subject = 'Welcome Back to Interview Ready!';

    const text = `
       Welcome back to Interview Ready! 
       
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

        <h2>Welcome Back to Interview Ready! 👋</h2>

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
            dream opportunity! 🚀
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

export { sendWelcomeEmail, sendLoginAlertEmail, checkEmailConnection }