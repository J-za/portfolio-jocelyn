const sgMail = require("../config/mail");

exports.sendMail = async (req, res) => {
  const { name, email, message } = req.body;

  const msg = {
    to: "jzarrouk@outlook.com", // destinataire
    from: "notification.portfolio.jza@gmail.com", // expéditeur validé dans SendGrid
    subject,
    text: message,
    replyTo: email,
  };

  try {
    await sgMail.send(msg);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};
