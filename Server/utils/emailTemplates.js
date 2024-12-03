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


const subscribeEmailTemplate = (username) => {
    return `
    <section style="max-width: 800px; margin: 0 auto; padding: 2rem; color: #0a0a0a; line-height: 1.6; font-family: 'Nunito Sans', sans-serif;">
        <header style="margin-bottom: 4rem; text-align: center; display: flex; justify-content: center; align-items: center;">
            <img src="https://img.icons8.com/?size=100&id=2ubk_RR_0aa2&format=png&color=24A32A" alt="BlogApp Logo"
                style="width: 60px; height: 60px; vertical-align: middle;" />
        </header>

        <main>
            <h1 style="font-size: 3.5rem; font-weight: 400; line-height: 1.2; margin-bottom: 2rem; text-align: center;">
                Thank You for Subscribing!</h1>

            <p class="greeting" style="font-size: 1.25rem; margin-bottom: 1.5rem;">Hello ${username},</p>

            <div class="content" style="margin-bottom: 2rem; font-size: 1.2rem;">
                <p>Welcome to the BlogApp community! We're thrilled to have you here. Our commitment is to provide you with
                    our latest updates, blog posts, and exclusive content directly to your inbox.</p>

                <p>Stay tuned for amazing insights and updates from us. If you have any questions, feel free to reply to
                    this email or contact us directly.</p>
            </div>

            <div style="text-align: center; margin-top: 2rem;">
                <a href="http://localhost:3000/" style="text-decoration: none;">
                    <button style="background-color: #24a32a; color: #fff; padding: 10px 20px; font-size: 1.2rem; border: none; border-radius: 5px; cursor: pointer; transition: all 0.3s ease;">
                        View All Blogs
                    </button>
                </a>
            </div>

            <div style="height: 1px; background-color: #e5e5e5; margin: 2rem 0;"></div>

            <nav class="social-links" style="display: flex; gap: 1rem; justify-content: flex-start; align-items: center; margin: 1rem 0;">
                <a href="https://google.com" target="_blank" style="text-decoration: none;">
                    <img src="https://img.icons8.com/?size=100&id=V5cGWnc9R4xj&format=png&color=000000" alt="Google"
                        style="width: 24px; height: 24px;" />
                </a>
                <a href="https://twitter.com" target="_blank" style="text-decoration: none;">
                    <img src="https://img.icons8.com/?size=100&id=phOKFKYpe00C&format=png&color=000000" alt="Twitter"
                        style="width: 24px; height: 24px;" />
                </a>
                <a href="https://facebook.com" target="_blank" style="text-decoration: none;">
                    <img src="https://img.icons8.com/?size=100&id=8818&format=png&color=339AF0"
                        alt="Facebook" style="width: 24px; height: 24px;" />
                </a>
                <a href="https://instagram.com" target="_blank" style="text-decoration: none; justify-items: center;">
                    <img src="https://img.icons8.com/?size=100&id=BrU2BBoRXiWq&format=png&color=000000" alt="Instagram"
                        style="width: 25px; height: 25px;" />
                </a>
            </nav>

            <div>
                <p style="font-size: 1rem;">Thank you,<br>BlogApp Team</p>
            </div>

            <div>
                <a href="" style="text-decoration: none;">Unsubscribe</a>
            </div>

            <footer style="margin-top: 3rem; text-align: center;">
                <p style="font-size: 0.875rem;">&copy; 2024 BlogApp. All Rights Reserved.</p>
            </footer>
        </main>
    </section>
    `
}


const unsubscribeEmailTemplate = (username) => {
    return `
    <section style="max-width: 800px; margin: 0 auto; padding: 2rem; color: #0a0a0a; line-height: 1.6; font-family: 'Nunito Sans', sans-serif;">
        <header style="margin-bottom: 4rem; text-align: center; display: flex; justify-content: center; align-items: center;">
            <img src="https://img.icons8.com/?size=100&id=2ubk_RR_0aa2&format=png&color=24A32A" alt="BlogApp Logo"
                style="width: 60px; height: 60px; vertical-align: middle;" />
        </header>

        <main>
            <h1 style="font-size: 3.5rem; font-weight: 400; line-height: 1.2; margin-bottom: 2rem; text-align: center;">
                We're Sorry to See You Go!</h1>

            <p class="greeting" style="font-size: 1.25rem; margin-bottom: 1.5rem;">Hello ${username},</p>

            <div class="content" style="margin-bottom: 2rem; font-size: 1.2rem;">
                <p>We've received your request to unsubscribe from our newsletter. Your email has been successfully removed from our mailing list.</p>

                <p>We understand that preferences change, and we respect your decision. However, if you ever want to receive our latest updates, blogs, and exclusive content again, you can re-subscribe anytime!</p>
            </div>

            <div style="text-align: center; margin-top: 2rem;">
                <a href="http://localhost:3000/subscribe" style="text-decoration: none;">
                    <button style="background-color: #24a32a; color: #fff; padding: 10px 20px; font-size: 1.2rem; border: none; border-radius: 5px; cursor: pointer; transition: all 0.3s ease;">
                        Re-Subscribe
                    </button>
                </a>
            </div>

            <div style="height: 1px; background-color: #e5e5e5; margin: 2rem 0;"></div>

            <nav class="social-links" style="display: flex; gap: 1rem; justify-content: flex-start; align-items: center; margin: 1rem 0;">
                <a href="https://google.com" target="_blank" style="text-decoration: none;">
                    <img src="https://img.icons8.com/?size=100&id=V5cGWnc9R4xj&format=png&color=000000" alt="Google"
                        style="width: 24px; height: 24px;" />
                </a>
                <a href="https://twitter.com" target="_blank" style="text-decoration: none;">
                    <img src="https://img.icons8.com/?size=100&id=phOKFKYpe00C&format=png&color=000000" alt="Twitter"
                        style="width: 24px; height: 24px;" />
                </a>
                <a href="https://facebook.com" target="_blank" style="text-decoration: none;">
                    <img src="https://img.icons8.com/?size=100&id=8818&format=png&color=339AF0"
                        alt="Facebook" style="width: 24px; height: 24px;" />
                </a>
                <a href="https://instagram.com" target="_blank" style="text-decoration: none; justify-items: center;">
                    <img src="https://img.icons8.com/?size=100&id=BrU2BBoRXiWq&format=png&color=000000" alt="Instagram"
                        style="width: 25px; height: 25px;" />
                </a>
            </nav>

            <div>
                <p style="font-size: 1rem;">Thank you,<br>BlogApp Team</p>
            </div>

            <div>
                <a href="#" style="text-decoration: none;">Re-Subscribe</a>
            </div>

            <footer style="margin-top: 3rem; text-align: center;">
                <p style="font-size: 0.875rem;">&copy; 2024 BlogApp. All Rights Reserved.</p>
            </footer>
        </main>
    </section>
    `
}

      
const postNotifyEmailTemplate = (username, blogs) => {
    const blogCards = blogs
        .map(
            (blog) => `
                <div style="max-width: 500px; border-radius: 16px; background: whitesmoke; font-family: system-ui, -apple-system, sans-serif; overflow: hidden; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);">
                    <div style="position: relative;">
                        <img src="${blog?.coverImage || '/placeholder.svg?height=300&width=600'}" alt="${blog?.title}"
                            style="width: 100%; height: 300px; object-fit: cover; filter: saturate(0.8); border: 1px solid silver; border-radius: 16px">
                    </div>

                    <div style="padding: 24px;">
                        <div style="color: rgb(75, 85, 99); margin-bottom: 16px; font-size: 15px">
                            ${new Date(blog?.created_at).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </div>

                        <h2 style="margin: 0 0 16px 0; font-size: 24px; line-height: 1.2; color: rgb(17, 24, 39);">
                            ${blog?.title}
                        </h2>

                        <p style="margin: 0 0 24px 0; font-size: 18px; color: rgb(75, 85, 99); line-height: 1.5;">
                            ${blog?.content?.introduction?.substring(0, 300)}...
                        </p>

                        <div style="font-size: 18px; font-weight: 600; color: #24a32a">
                            <a href="http://localhost:3000/blogs/${blog?._id}"
                                style="text-decoration: none; color: #24a32a">
                                Read more
                            </a>
                        </div>
                    </div>
                </div>`
        )
        .join("");

    return `
    <section style="max-width: 800px; margin: 0 auto; padding: 2rem; font-family: 'Nunito Sans', sans-serif; background-color: #f9f9f9; color: #0a0a0a; line-height: 1.6;">
        <header style="margin-bottom: 2rem;">
            <img src="https://img.icons8.com/?size=100&id=2ubk_RR_0aa2&format=png&color=24A32A" alt="BlogApp Logo"
                style="width: 60px; height: 60px; justify-content: flex-start; align-items: flex-start; vertical-align: middle;" />
            <h1 style="text-align: center; font-size: 2rem; font-weight: 600; color: #1f2937; margin-top: 30px;">Hello ${username}, Check Out Our Latest Blogs!</h1>
        </header>

        <main>
            <p style="font-size: 1.2rem; margin-bottom: 2rem;">
                We’re thrilled to share some exciting new blog posts that we’ve just published! Dive into the latest insights, trends, and updates that you won’t want to miss.
            </p>

            <div style="background-color: white; padding: 50px;">
                ${blogCards}
            </div>

            <div style="text-align: center; margin-top: 2rem;">
                <a href="http://localhost:3000/" style="text-decoration: none;">
                    <button style="background-color: #24a32a; color: #fff; padding: 15px 30px; font-size: 1.2rem; border: none; border-radius: 5px; cursor: pointer; transition: all 0.3s ease;">
                        View All Blogs
                    </button>
                </a>
            </div>

            <p style="font-size: 1rem; color: #4a4a4a; margin-top: 2rem; text-align: center;">
                Stay inspired with BlogApp. New stories await!
            </p>
        </main>

        <footer style="text-align: center; margin-top: 3rem;">
            <nav style="margin-bottom: 1.5rem;">
                <a href="https://google.com" style="margin: 0 10px; text-decoration: none;">
                    <img src="https://img.icons8.com/?size=100&id=V5cGWnc9R4xj&format=png&color=000000" alt="Google"
                        style="width: 24px; height: 24px;" />
                </a>
                <a href="https://twitter.com" style="margin: 0 10px; text-decoration: none;">
                    <img src="https://img.icons8.com/?size=100&id=phOKFKYpe00C&format=png&color=000000" alt="Twitter"
                        style="width: 24px; height: 24px;" />
                </a>
                <a href="https://facebook.com" style="margin: 0 10px; text-decoration: none;">
                    <img src="https://img.icons8.com/?size=100&id=106163&format=png&color=339AF0" alt="Facebook"
                        style="width: 24px; height: 24px;" />
                </a>
                <a href="https://instagram.com" style="margin: 0 10px; text-decoration: none;">
                    <img src="https://img.icons8.com/?size=100&id=BrU2BBoRXiWq&format=png&color=000000" alt="Instagram"
                        style="width: 24px; height: 24px;" />
                </a>
            </nav>
            <p style="font-size: 0.875rem; color: #4a4a4a;">&copy; 2024 BlogApp. All Rights Reserved.</p>
        </footer>
    </section>
    `;
};



module.exports = { resetEmailTemplate, resetSuccessEmailTemplate, subscribeEmailTemplate, unsubscribeEmailTemplate, postNotifyEmailTemplate };
