const axios = require("axios").default;

const path = "https://ApiEmail.teleperformance.co/api/sendEmail";

exports.sendEmail = async (emails, subject, header, emailSender) => {
  try {
    let responses = emails.map(async (info) => {
      const { name, email, rol, manager, rolManager } = info;

      let welcomeEmailTemplate = `
        <!DOCTYPE html>
        <html lang="en"   >
          <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Space GP Email</title>
          </head>
          <body
          align="center"
          style="
            background: #f8f9fa;
          >
        <center>    
        <table
          style="
            width: 500px;
            background-color: #fdfdfd;
            box-shadow: 5px 5px 5px #8a8989;
            margin: 3rem;"
          >
            <tr>
            <td>
            <img
            border="0"
            width="500"
            height="157"
            style="width: 5.20833in; height: 1.635416in"
            src="https://firebasestorage.googleapis.com/v0/b/storage-296723/o/Gamification%2FemailResources%2Femail%20fullScreen?alt=media&token=c004ec99-6b7e-4306-9ad3-5e02e56e2a61"
            alt="header"
            />
            </td>
            </tr>
            <tr  style="width: 500px">
              <td align="center">
              <table width="436" style="margin:auto">
                  <tr><td>
                    <h2 style="margin-bottom:3px">WELCOME ABOARD, ${name}</h2>
                    <h3>${rol}</h3>
                    <img
                    border="0"
                    width="436"
                    height="134"
                    style="width: 4.541666in; height: 1.395833in"
                    src="https://firebasestorage.googleapis.com/v0/b/storage-296723/o/Gamification%2FemailResources%2Femail%20badgeImage?alt=media&token=b2d68ff4-980d-40c1-ae46-b38f34d3acbd"
                    alt="banner"
                    />
                  </td></tr>
              </table>
              </td>
            </tr>
            <tr>
              <td align="center">
                <table width="436" style="margin:auto">
                  <tr>
                    <td style="font-size: 14px; margin-top: 36px">
                      <p>Hi there!</p>
                      <p>
                      We are very excited to have you and your team on our platform,
                      we hope to achieve many goals together, as well as having fun on
                      the journey. Your <b>${rolManager}</b> gave you a ticket to
                      this flight on the SPACE GP.
                      </p>
                      <p>
                      To access the platform please click on the "Join the Journey"
                      and use your CCMS credentials.
                      </p>
                      <p>
                      *Remember that your role is very important for the success of
                      this mission.
                      </p>
                      <p>We are ready to take-off. Enjoy your flight!</p>
                      <p>
                      Kind regards, <br />
                      SPACE GP Team
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td align="center">
              <table style="margin:auto">
                <tr><td align="center">
                  <a
                  href="https://spacegptest.teleperformance.co/">
                  <img
                  border="0"
                  width="191"
                  height="37"
                  style="width: 1.98958in; height: 0.385416in"
                  src="https://firebasestorage.googleapis.com/v0/b/storage-296723/o/Gamification%2FemailResources%2Fbutton%20fullScreen?alt=media&token=fe5764b3-4b45-49b7-858d-e9a570c6421f"
                  alt="footer"
                  />
                  </a>
                </td></tr>
              </table>
              </td>
            </tr>
            <tr>
              <td class="footer">
                <img
                border="0"
                width="500"
                height="33"
                style="width: 5.20833in; height: 0.34375in"
                src="https://firebasestorage.googleapis.com/v0/b/storage-296723/o/Gamification%2FemailResources%2Femail%20descriptionImage?alt=media&token=57098326-6a60-4e40-86a7-732a6a038141"
                alt="footer"
                />
              </td>
            </tr>
        </table>
        </center>
        </body>
        </html> `;

      let message = {
        emails: `matilde.puentesgutierrez@teleperformance.com`,
        subject,
        name: header,
        emailSender,
        HTML: welcomeEmailTemplate,
      };

      return await axios.post(path, message);
    });

    return responses;
  } catch (error) {
    console.log(error);
    return error;
  }
};

exports.sendConfirmInactivationEmail = async (emails, subject, header, emailSender) => {
  try {
    let responses = emails.map(async (info) => {
      const { emailRequester, dataApprover, dataUser } = info;
      const { name, role, inactivate } = dataApprover;
      const { nameUser, roleUser } = dataUser;

      let inactivateUserTemplate = `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Space GP Email</title>
          <style type="text/css">
            body {
              margin: 0;
              padding: 0;
              background: linear-gradient(180deg, #f1f1f1 0%, #c7d9e9 100%);
              font-family: "Noto Sans", sans-serif;
              display: flex;
              justify-content: center;
            }
            .emailBody {
              width: 500px;
              background-color: #fdfdfd;
              box-shadow: 5px 5px 5px #8a8989;
              margin: 3rem;
            }
            img {
              width: 100%;
              object-fit: cover;
            }
            p {
              font-size: 14px;
              margin-top: 2rem;
            }
            section {
              margin: 1rem 2rem;
            }
            h2 {
              margin-bottom: 0px;
              font-family: "Sancoale Softened", sans-serif;
            }
          </style>
        </head>
        <body>
          <div class="emailBody">
            <header>
              <img src="https://firebasestorage.googleapis.com/v0/b/storage-296723/o/Gamification%2FemailResources%2Femail%20fullScreen?alt=media&token=c004ec99-6b7e-4306-9ad3-5e02e56e2a61" alt="header" />
            </header>
            <section>
              <h2>User Status</h2>
              <img src="https://firebasestorage.googleapis.com/v0/b/storage-296723/o/Gamification%2FemailResources%2Femail%20badgeImage?alt=media&token=b2d68ff4-980d-40c1-ae46-b38f34d3acbd" alt="banner" />
              <p>Hi there!</p>
              <p>
                The deactivation of the <b>${roleUser}, ${nameUser},</b> has been
                <b>${inactivate == 1 ? "approved" : "disapproved"}</b> by your <b>${role} - ${name}</b>
              </p>
              <p>
                Kind regards, <br />
                SPACEGP Team
              </p>
            </section>
            <footer>
              <img src="https://firebasestorage.googleapis.com/v0/b/storage-296723/o/Gamification%2FemailResources%2Femail%20descriptionImage?alt=media&token=57098326-6a60-4e40-86a7-732a6a038141" alt="footer" />
            </footer>
          </div>
        </body>
      </html>`;

      let message = {
        emails: `${emailRequester}`,
        subject,
        name: header,
        emailSender,
        HTML: inactivateUserTemplate,
      };

      return await axios.post(path, message);
    });

    return responses;
  } catch (error) {
    console.log(error);
    return error;
  }
};
