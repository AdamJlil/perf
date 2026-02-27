export const baseEmailTemplate = (content: string, title: string) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;700&display=swap');
    body { font-family: 'Montserrat', Arial, sans-serif; background-color: #EFEFEC; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 30px; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.1); border: 1px solid #ffffff; }
    .header { background-color: #1A1A1A; padding: 40px; text-align: center; }
    .logo { height: 40px; }
    .content { padding: 50px; color: #333333; line-height: 1.6; }
    .title { color: #1A1A1A; font-size: 24px; font-weight: 700; text-transform: uppercase; letter-spacing: 4px; margin-bottom: 30px; border-bottom: 2px solid #D05E33; padding-bottom: 15px; }
    .info-box { background-color: #F9F9F9; border-radius: 15px; padding: 25px; margin: 20px 0; border-left: 4px solid #D05E33; }
    .footer { background-color: #F4F4F4; padding: 30px; text-align: center; color: #999999; font-size: 10px; text-transform: uppercase; letter-spacing: 2px; }
    .accent { color: #D05E33; font-weight: 700; }
    .label { color: #999999; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 5px; }
    .value { font-size: 16px; color: #1A1A1A; margin-bottom: 15px; display: block; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="color: white; margin: 0; letter-spacing: 8px; font-weight: 300;">PERF</h1>
    </div>
    <div class="content">
      <div class="title">${title}</div>
      ${content}
    </div>
    <div class="footer">
      PERF Fitness & Wellness Admin Notification
    </div>
  </div>
</body>
</html>
`;
