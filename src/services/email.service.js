const { email } = require('../config/config');

const mailjet = require('node-mailjet').connect(
  process.env.MJ_APIKEY_PUBLIC,
  process.env.MJ_APIKEY_PRIVATE,
);

const request = async (data) => {
  await mailjet.post('send', { version: 'v3.1' }).request(data);
};

const sendEmail = async (to, subject, text) => {
  const requestObj = {
    Messages: [
      {
        From: {
          Email: 'opesiyanbola8991@gmail.com',
          Name: 'Pokadot',
        },
        To: [
          {
            Email: to,
            // Name: firstname,
          },
        ],
        Subject: subject,
        HTMLPart: text,
      },
    ],
  };
    // await transport.sendMail(msg);
  await request(requestObj);
};

const sendVerifyAccountEmail = async (to, token) => {
  const subject = 'Verify your account';

  const text = `
  Dear user,
  
  To verify your account (${to}) click the link https://pokadot.herokuapp.com/v1/api/users/security/verify_email/${to}/${token}.
  If you believe you received this email in error, Kindly ignore the email.
  
  Thank you, 
  Pokadot
  `;
  await sendEmail(to, subject, text);
};

const sendResetPasswordEmail = async (to, token) => {
  const subject = 'Reset Your Password';

  const resetPasswordUrl = `https://pokadot.herokuapp.com/v1/api/users/?token=${token}`;

  const text = `Dear user,
  To reset your password, click on this link: ${resetPasswordUrl}
  If you did not request any password resets, then ignore this email.`;

  await sendEmail(to, subject, text);
};

module.exports = {
  sendVerifyAccountEmail,
  sendResetPasswordEmail,
};
