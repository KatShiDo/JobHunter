const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const template = require("@/config/template");
const keys = require("@/config/keys");
const path = require("path");
const fs = require("fs");

const { user, pass, sender } = keys.nodemailer;

class NodemailerService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: user,
        pass: pass,
      },
    });
  }

  sendMail(config) {
    return this.transporter.sendMail(config);
  }
}

const nodemailerService = new NodemailerService();

exports.sendEmail = async (email, type, host, data) => {
  try {
    const message = prepareTemplate(type, host, data);
    const templatePath = path.join(
      __dirname,
      "../templates/email-template.html",
    );
    const source = fs.readFileSync(templatePath, "utf8");
    const template = handlebars.compile(source);

    const replacements = {
      subject: message.subject,
      content: message.text,
    };

    const htmlToSend = template(replacements);

    const config = {
      from: `JobHunter <${sender}>`,
      to: email,
      subject: message.subject,
      html: htmlToSend,
    };

    return await nodemailerService.sendMail(config);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

const prepareTemplate = (type, data) => {
  let message;

  switch (type) {
    case "signup":
      message = template.signup(data.token, data.language);
      break;

    case "signup-provider":
      message = template.signupProvider(data.password, data.language);
      break;

    case "reset":
      message = template.reset(data.token, data.language);
      break;

    case "create-admin":
      message = template.createAdmin(data.password, data.language);
      break;

    case "contact":
      message = template.contact(data.email, data.subject, data.message, data.language);
      break;

    default:
      message = { subject: "", text: "" };
  }

  return message;
};
