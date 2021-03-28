import User from "../models/user";
import crypto from "crypto";
import { addMinutes, isAfter } from "date-fns";
import Mail from "../helpers/Mail";
import mailConfig from "../config/mail";
import logger from "../config/winston";

class RecoveryController {
  async store(req, res) {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        logger.warn(
          `IP:${req.ip} POST/recevory user does not found : ${email}`
        );
        return res.status(400).json({ error: "User does not found" });
      }
      const token = await crypto.randomBytes(8).toString("hex");
      const exp = addMinutes(new Date(), 5);

      user.token = token;
      user.expiration = exp;

      Mail.sendMail({
        from: mailConfig.from,
        to: user.email,
        subject: "Recuperação de senha",
        template: "recovery",
        context: {
          token: user.token,
        },
      });

      await user.save();
      logger.info(`IP:${req.ip} POST/recovery : ${user}`);
      return res.status(200).send();
    } catch (error) {
      logger.info(`IP:${req.ip} POST/recovery : ${error}`);
      return res.status(400).json({ error: "Error to send email" });
    }
  }

  async update(req, res) {
    const { token, password } = req.body;

    const user = await User.findOne({ token });
    if (isAfter(new Date(), user.expiration)) {
      return res.status(400).json({ error: "Token expired" });
    }

    user.password = password;
    user.token = null;
    user.expiration = null;
    await user.save();

    return res.status(200).send();
  }
}

export default new RecoveryController();
