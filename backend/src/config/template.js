exports.signup = (token, language = "ru") => {
  const message = {
    en: {
      subject: "Thank you for registering your account!",
      text: `Follow the link to verify your email.:<br>${process.env.CLIENT_URL}/email-verification?token=${token}`,
    },
    ru: {
      subject: "Спасибо за регистрацию аккаунта!",
      text: `Перейдите по ссылке, чтобы подтвердить вашу почту:<br>${process.env.CLIENT_URL}/email-verification?token=${token}`,
    },
  };
  return message[language];
};

exports.signupProvider = (password, language = "ru") => {
  const message = {
    en: {
      subject: "Account Registration",
      text: `Hi! Thank you for creating an account!\nYour password: ${password}`,
    },
    ru: {
      subject: "Регистрация аккаунта",
      text: `Привет! Спасибо за регистрацию аккаунта!\nПароль: ${password}`,
    },
  };
  return message[language];
};

exports.reset = (token, language = "ru") => {
  const message = {
    en: {
      subject: "Password Reset",
      text: `Please click on the link below to change your password:<br>${process.env.CLIENT_URL}/change-password?token=${token}`,
    },
    ru: {
      subject: "Сброс пароля",
      text: `Пожалуйста, нажмите на ссылку ниже, чтобы сменить пароль:<br>${process.env.CLIENT_URL}/change-password?token=${token}/`,
    },
  };
  return message[language];
};

exports.createAdmin = (password, language = "ru") => {
  const message = {
    ru: {
      subject: "Регистрация администратора",
      text: `Ваш логин: admin@admin.com<br>Ваш пароль: ${password}`,
    },
  };
  return message[language];
};

exports.contact = (email, subject, message, language = "ru") => {
  const emailMessage = {
    ru: {
      subject: "Сообщение от пользователя",
      text: `${email}<br>Тема: ${subject}<br>${message}`,
    },
  };
  return emailMessage[language];
};
