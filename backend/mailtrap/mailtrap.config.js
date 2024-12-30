import { MailtrapClient } from "mailtrap";
import dotenv from 'dotenv'

dotenv.config();

 const TOKEN =  "9428095552c6c6d42b098f72b57b72e5"
// const TOKEN = process.env.MAILTRAP_TOKEN;
const ENDPOINT = process.env.MAILTRAP_ENDPOINT


export const mailtrapClient = new MailtrapClient({
  token: TOKEN,
   endpoint: ENDPOINT
});

export const sender = {
  email: "hello@demomailtrap.com",
  name: "Sumant",
};

