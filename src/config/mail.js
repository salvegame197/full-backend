export default {
  host: `${process.env.MAIL_HOST}`,
  port: 2525,
  auth: {
    user: `${process.env.MAIL_USER}`,
    pass: `${process.env.MAIL_PASS}`,
  },
  secure: false,
  from: "",
};
