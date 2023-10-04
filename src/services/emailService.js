require("dotenv").config();
const nodemailer = require("nodemailer");

let sendSimpleEmail = async (dataSend) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_APP,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });

  let info = await transporter.sendMail({
    from: '"BOOKINGCARE 👻" <thuha250300@gmail.com>',
    to: dataSend.reciverEmail,
    subject: "Thông tin đặt lịch khám bệnh",
    html: getBodyHTMLEmail(dataSend),
  });
};
let sendAttachment = async (dataSend) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_APP,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });

  let info = await transporter.sendMail({
    from: '"BOOKINGCARE 👻" <thuha250300@gmail.com>',
    to: dataSend.email,
    subject: "Kết quả đặt lịch khám bệnh",
    html: getBodyHTMLEmailRemedy(dataSend),
    attachments: [
      {
        filename: `remedy-${dataSend.patientId}-${new Date().getTime()}.png`,
        content: dataSend.imgBase64.split("base64,")[1],
        encoding: "base64",
      },
    ],
  });
};
let getBodyHTMLEmailRemedy = (dataSend) => {
  let result = "";
  if (dataSend.language === "vi") {
    result = `
    <h3>Xin chào ${dataSend.patientName}</h3>
    <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên BookingCare thành công</p>
    <h4>Thông tin đặt lịch khám bệnh</h4>
    <p>Thông tin chi tiết được gửi trong file đính kèm.</p>
    <p>Xin chân thành cảm ơn</p>
    `;
  }
  if (dataSend.language === "en") {
    result = `
    <h3>Dear ${dataSend.patientName}</h3>
    <p>You received this email because you booked an online medical appointment on BookingCare Success</p>
    <p>aaaaa.</p>
    <p>Sincerely thank</p>
    `;
  }
  return result;
};
let getBodyHTMLEmail = (dataSend) => {
  let result = "";
  if (dataSend.language === "vi") {
    result = `
    <h3>Xin chào ${dataSend.patientName}</h3>
    <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên BookingCare</p>
    <h4>Thông tin đặt lịch khám bệnh</h4>
    <div><b>Thời gian: ${dataSend.time}</b></div>
    <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>
    <p>Nếu các thông tin trên là đúng, vui lòng xác nhận email.</p>
    <div>
    <a href=${dataSend.redirectLink} target="_blank">Click here</a>
    </div>
    <p>Xin chân thành cảm ơn</p>
    `;
  }
  if (dataSend.language === "en") {
    result = `
    <h3>Dear ${dataSend.patientName}</h3>
    <p>You received this email because you booked an online medical appointment on BookingCare</p>
    <h4>Information on scheduling medical examinations</h4>
    <div><b>Time: ${dataSend.time}</b></div>
    <div><b>Doctor: ${dataSend.doctorName}</b></div>
    <p>If the above information is correct, please confirm your email.</p>
    <div>
    <a href=${dataSend.redirectLink} target="_blank">Click here</a>
    </div>
    <p>Sincerely thank</p>
    `;
  }
  return result;
};
module.exports = {
  sendSimpleEmail,
  sendAttachment,
};
