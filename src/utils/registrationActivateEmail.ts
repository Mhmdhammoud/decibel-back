import nodemailer from 'nodemailer'
import {Logger} from '../lib'

/**
 * @remarks
 *  Sends a notification email about new registrations
 * @param email - The email of the recipient
 *
 * @returns void
 */
const sendEmail = (email: string) => {
	try {
		const html = `<!DOCTYPE html>
        <html>
          <body>
            <div
              style="
                background-color: #f7f7f7;
                margin: 0;
                padding: 70px 0;
                width: 100%;
                -webkit-text-size-adjust: none;
              "
            >
              <table
                border="0"
                cellpadding="0"
                cellspacing="0"
                height="100%"
                width="100%"
              >
                <tbody>
                  <tr>
                    <td align="center" valign="top">
                      <div>
                        <p style="margin-top: 0">
                          <img
                            src="https://hassans.s3.eu-central-1.amazonaws.com/youssef/assets/logo.png"
                            alt="logo"
                            style="
                              border: none;
                              display: inline-block;
                              font-size: 14px;
                              font-weight: bold;
                              height: auto;
                              outline: none;
                              text-decoration: none;
                              text-transform: capitalize;
                              vertical-align: middle;
                              max-width: 80%;
                              margin-left: 0;
                              margin-right: 0;
                            "
                            height="128px"
                            width="128px"
                          />
                        </p>
                      </div>
                      <table
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        width="100%"
                        style="
                          max-width: 600px;
                          background-color: #ffffff;
                          border: 1px solid #dedede;
                          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
                          border-radius: 3px;
                        "
                      >
                        <tbody>
                          <tr>
                            <td align="center" valign="top">
                              <table
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                width="100%"
                                style="
                                  background-color: #b61a22;
                                  color: #ffffff;
                                  border-bottom: 0;
                                  font-weight: bold;
                                  line-height: 100%;
                                  vertical-align: middle;
                                  font-family: 'Helvetica Neue', Helvetica, Roboto,
                                    Arial, sans-serif;
                                  border-radius: 3px 3px 0 0;
                                "
                              >
                                <tbody>
                                  <tr>
                                    <td
                                      id="header_wrapper"
                                      style="padding: 36px 48px; display: block"
                                    >
                                      <h1
                                        style="
                                          font-family: 'Helvetica Neue', Helvetica,
                                            Roboto, Arial, sans-serif;
                                          font-size: 30px;
                                          font-weight: 300;
                                          line-height: 150%;
                                          margin: 0;
                                          text-align: center;
                                          text-shadow: 0 1px 0 #354c6c;
                                          color: #ffffff;
                                          background-color: inherit;
                                        "
                                      >
                                        View Products
                                      </h1>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td align="center" valign="top">
                              <table
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                width="100%"
                                style="max-width: 600px"
                              >
                                <tbody>
                                  <tr>
                                    <td
                                      valign="top"
                                      id="body_content"
                                      style="background-color: #ffffff"
                                    >
                                      <table
                                        border="0"
                                        cellpadding="20"
                                        cellspacing="0"
                                        width="100%"
                                      >
                                        <tbody>
                                          <tr>
                                            <td
                                              valign="top"
                                              style="padding: 48px 48px 12px"
                                            >
                                              <div
                                                style="
                                                  color: #636363;
                                                  font-family: 'Helvetica Neue',
                                                    Helvetica, Roboto, Arial, sans-serif;
                                                  font-size: 14px;
                                                  line-height: 150%;
                                                  text-align: center;
                                                "
                                              >
                                                <p>
                                                  You are receiving this email because
                                                  you have one or more products in your account wishlist.
                                                </p>
                                              </div>
                                            </td>
                                          </tr>
                                          <tr align="center">
                                            <td>
                                              <a
                                                role="button"
                                                href="#"
                                                rel="noopener noreferrer"
                                                target="_blank"
                                                style="
                                                  font-family: 'Helvetica Neue',
                                                    Helvetica, Roboto, Arial, sans-serif;
                                                  font-size: 24px;
                                                  font-weight: 300;
                                                  line-height: 100%;
                                                  border-radius: 10px;
                                                  padding: 5px;
                                                  margin: 0;
                                                  text-align: center;
                                                  text-shadow: 0 1px 0 #910000;
                                                  color: #ffffff;
                                                  background-color: #b61a22;
                                                  text-decoration: none;
                                                "
                                              >
                                                View products
                                              </a>
                                            </td>
                                          </tr>

                                          <tr>
                                            <td>
                                              <div
                                                style="
                                                  color: #636363;
                                                  font-family: 'Helvetica Neue',
                                                    Helvetica, Roboto, Arial, sans-serif;
                                                  font-size: 14px;
                                                  text-align: center;
                                                "
                                              >
                                                <p style="margin: 0 0 16px">
                                                  If the button does not work, copy and
                                                  paste the URL below into your web
                                                  browser
                                                  <br />
                                                  <br />

                                                  <a
                                                    href="#"
                                                    style="
                                                      color: #1a57ad;
                                                      text-decoration: none;
                                                    "
                                                  >
                                                   a
                                                  </a>
                                                  .
                                                </p>
                                              </div>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td>
                                              <div
                                                style="
                                                  color: #636363;
                                                  font-family: 'Helvetica Neue',
                                                    Helvetica, Roboto, Arial, sans-serif;
                                                  font-size: 14px;
                                                  text-align: center;
                                                "
                                              >
                                                <p style="margin: 0 0 16px">
                                                  If you have any questions, please
                                                  contact us at
                                                  <a
                                                    href="mailto:support@mr-green.com"
                                                    style="
                                                      color: #1a57ad;
                                                      text-decoration: none;
                                                    "
                                                  >
                                                    support@mr-green.com
                                                  </a>
                                                  .
                                                </p>
                                              </div>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td align="center" valign="top">
                      <table
                        border="0"
                        cellpadding="10"
                        cellspacing="0"
                        width="100%"
                        style="max-width: 600px"
                      >
                        <tbody>
                          <tr>
                            <td valign="top" style="padding: 0; border-radius: 6px">
                              <table
                                border="0"
                                cellpadding="10"
                                cellspacing="0"
                                width="100%"
                              >
                                <tbody>
                                  <tr>
                                    <td
                                      colspan="2"
                                      valign="middle"
                                      id="credit"
                                      style="
                                        border-radius: 6px;
                                        border: 0;
                                        color: #8a8a8a;
                                        font-family: 'Helvetica Neue', Helvetica, Roboto,
                                          Arial, sans-serif;
                                        font-size: 12px;
                                        line-height: 150%;
                                        text-align: center;
                                        padding: 24px 0;
                                      "
                                    >
                                      Mr Green ltd <sup>&copy;</sup> <br />
                                      2022 - All rights reserved<br /><br />
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </body>
        </html>
        `
		// create reusable transporter object using the default SMTP transport

		const transporter = nodemailer.createTransport({
			host: process.env.EMAIL_HOST,
			secure: false, // true for 465, false for other ports
			auth: {
				user: process.env.EMAIL_USER, // generated ethereal user
				pass: process.env.EMAIL_PASSWORD, // generated ethereal password
			},
			tls: {
				rejectUnauthorized: false,
			},
		})

		// setup email data with unicode symbols
		const mailOptions = {
			from: `Decibel <${process.env.EMAIL_USER}>`, // sender address
			// to: `${emailStrings}`, // list of receivers
			subject: 'New Registration', // Subject line
			html: html, // html body,
			bcc: `${email}`, // list of receivers
		}

		// send mail with defined transport object
		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				Logger.error('registrationActivateEmail','sendEmail',error.message,'localhost',error)
			}
			Logger.info('registrationActivateEmail','sendEmail',`Message sent: ${info.messageId}`,'localhost')
		})
	} catch (error) {
		Logger.error('registrationActivateEmail','sendEmail',error.message,'localhost',error)
	}
}
export default sendEmail
