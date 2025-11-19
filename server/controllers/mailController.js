const transporter = require("../config/mail");

exports.sendMail = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.MAIL_TO,
      subject: `Nouveau message de ${name}`,
      text: `Email: ${email}\n\nMessage:\n${message}`,
    });

    res.json({ success: true, message: "Email sent successfully !" });
  } catch (err) {
    console.error("Email sending error :", err);
    res.status(500).json({ success: false, message: "Internal error" });
  }
};
