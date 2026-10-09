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

async function sendWelcomeEmail(userEmail, name, otp) {
    const subject = 'Welcome to Interview Ready, Verify Your Email';

    const text = `
        Dear ${name},

        We're excited to have you with us. Your account has been successfully created, and you're now ready to start preparing for your interviews.

        Before you get started, please verify your email using the OTP below:

        Your verification OTP is: ${otp}

        This code is valid for a short time and can be used only once. If you did not create this account, please ignore this email.

        With Interview Ready, you can practice interviews, improve your skills, and get valuable feedback to help you become more confident and interview ready.

        Good luck with your interview preparation!

        Regards,
        Interview Ready Team
    `.trim();

    const html = `
        <div style="font-family: Arial, sans-serif; font-size: 15px; line-height: 1.6; color: #292524; max-width: 480px;">
            <p>Dear <strong>${name}</strong>,</p>

            <p>
                We're excited to have you with us.
            </p>

            <p>
                Your account has been successfully created, and you're now ready
                to start preparing for your interviews.
            </p>

            <div style="
                background: #EAF5EE;
                border-radius: 8px;
                padding: 20px;
                margin: 20px 0;
                text-align: center;
            ">
                <p style="margin: 0 0 8px; font-weight: 600;">
                    Verify your email to activate your account
                </p>
                <p style="margin: 0; font-size: 20px; font-weight: 700; letter-spacing: 2px; color: #0B4D3B;">
                    ${otp}
                </p>
                <p style="margin: 8px 0 0; font-size: 12px; color: #57534E;">
                    This code is valid for a short time and can be used only once.
                </p>
            </div>

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
                    feedback to become more confident and interview ready.
                </p>
            </div>

            <p>
                Good luck with your interview preparation!
            </p>

            <p>
                If you did not create this account, please ignore this email.
            </p>

            <p>
                Regards,<br />
                <strong>Interview Ready Team</strong>
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

            <p>Need help? Reach us at <a href="mailto:jhaashutosh0811@gmail.com" style="color: #0B4D3B;">jhaashutosh0811@gmail.com</a></p>

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

export { sendWelcomeEmail, OtpEmail, checkEmailConnection }