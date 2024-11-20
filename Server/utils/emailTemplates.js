const resetEmailTemplate = (resetLink, username) => {
    return `
    <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
        <div></div>
        <h2 style="color: #333; font-size: 24px; margin-bottom: 10px;">Hello ${username},</h2>

        <p style="font-size: 16px; line-height: 1.5;">
            We received a request to reset your password. You can reset your password by clicking the button below. If you did not request this change, please ignore this email.
        </p>

        <div style="text-align: center; margin: 30px 0;">
            <a
                href="${resetLink}"
                style="
            display: inline-block;
            background-color: #24a32a;
            color: white;
            text-decoration: none;
            padding: 15px 25px;
            font-size: 16px;
            font-weight: bold;
            border-radius: 5px;
            transition: background-color 0.3s ease;
          "
                onmouseout="this.style.backgroundColor='#24a32a';"
                onmouseover="this.style.backgroundColor='#209326';"
            >
                Reset Your Password
            </a>
        </div>

        <p style="font-size: 16px; line-height: 1.5;">
            If the button above doesn't work, copy and paste the following URL into your browser:
        </p>
        <p style="font-size: 14px; color: #555; word-break: break-all font-weight: bold;">
            <a href="${resetLink}" style="color: #007BFF font-weight: bold;">${resetLink}</a>
        </p>

        <p style="font-size: 16px; line-height: 1.5;">
            This link will expire in 10 minutes. If you have any questions or need assistance, please contact us at <a href="mailto:support@blogapp.com" style="color: #007BFF;">support@blogapp.com</a>.
        </p>

        <p style="font-size: 16px; line-height: 1.5;">
            Thank you,<br />
            The BlogApp Team
        </p>

        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />

        <p style="font-size: 12px; color: #999; text-align: center;">
            If you received this email by mistake, please disregard it. Your security is our top priority.
        </p>
    </div>
   `;
};

const resetSuccessEmailTemplate = (username) => {
    return `
    <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
        <h2 style="color: #333; font-size: 24px; margin-bottom: 10px;">Hello ${username},</h2>

        <p style="font-size: 16px; line-height: 1.5;">
            This is a confirmation that your password has been successfully reset. You can now use your new password to log in to your account.
        </p>

        <p style="font-size: 16px; line-height: 1.5;">
            If you did not request this password change, please contact us immediately to secure your account.
        </p>

        <div style="text-align: center; margin: 30px 0;">
            <a
                href="http://localhost:3000/login"
                style="
                display: inline-block;
                background-color: #24a32a;
                color: white;
                text-decoration: none;
                padding: 15px 25px;
                font-size: 16px;
                font-weight: bold;
                border-radius: 5px;
                transition: background-color 0.3s ease;
              "
                onmouseout="this.style.backgroundColor='#24a32a';"
                onmouseover="this.style.backgroundColor='#209326';"
            >
                Login to Your Account
            </a>
        </div>

        <p style="font-size: 16px; line-height: 1.5;">
            For your security, please ensure that your account recovery options and security settings are up-to-date.
        </p>

        <p style="font-size: 16px; line-height: 1.5;">
            If you have any questions or need further assistance, please contact us at <a href="mailto:support@blogapp.com" style="color: #007BFF;">support@blogapp.com</a>.
        </p>

        <p style="font-size: 16px; line-height: 1.5;">
            Thank you,<br />
            The BlogApp Team
        </p>
    </div>
   `;
};


module.exports = { resetEmailTemplate, resetSuccessEmailTemplate };
