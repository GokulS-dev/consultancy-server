const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Resend } = require('resend');
require('dotenv').config();

const app = express();
const port = 3001;
const resend = new Resend(process.env.RESEND_API_KEY);

app.use(cors());
app.use(bodyParser.json());

app.post('/send-email', async (req, res) => {
  const { to, subject, html } = req.body;

  try {
    const data = await resend.emails.send({
  	from: 'GMHSS <onboarding@resend.dev>',  	
	to,
  	subject,
  	html,
    });

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});