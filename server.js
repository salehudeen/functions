const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/send-email', async (req, res) => {
  console.log('Received request to send email');
  const { fullName, email, phoneNumber } = req.body;

  try {
    const transporter = nodemailer.createTransport({
    
      service: 'Gmail',
      auth: {
        user: 'hlprplatform@gmail.com',
        pass: 'nagzkhbdglrsqeop',
      },
      debug: true, // Enabling debugging
      logger: true, // Enabling logging
    });

    const mailOptions = {
      from: 'hlprplatform@gmail.com',
      to: 'hlprplatform@gmail.com', // Send email to this address
      subject: `New Trainee Application: ${fullName}`, // Subject with mailer's name
      text: `New Trainee Details:\n\nFull Name: ${fullName}\nEmail: ${email}\nPhone Number: ${phoneNumber}`,
    };

    // Sending email and handle response
    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent:', info.response);
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    let errorMessage = 'Error sending email.';
    
    if (error.response && error.responseCode) {
      errorMessage += ` Response code: ${error.responseCode}`;
    }
    
    res.status(500).json({ message: errorMessage });
  }
});

// message for the contact form 
app.post('/send-contact-email', async (req, res) => {
    console.log('Received request to send contact email');
    const { email, message } = req.body;
  
    try {
      const transporter = nodemailer.createTransport({
        // Configure your email service and credentials here
        service: 'Gmail',
        auth: {
          user: 'hlprplatform@gmail.com',
          pass: 'nagzkhbdglrsqeop',
        },
        debug: true, // Enable debugging
        logger: true, // Enable logging
      });
  
      const mailOptions = {
        from: 'hlprplatform@gmail.com',
        to: 'hlprplatform@gmail.com', // Send email to this address
        subject: 'Contact Message',
        text: `New Contact Message:\n\nEmail: ${email}\nMessage: ${message}`,
      };
  
      // Send email and handle response
      const info = await transporter.sendMail(mailOptions);
      console.log('Contact message sent:', info.response);
      res.status(200).json({ message: 'Contact message sent successfully!' });
    } catch (error) {
      console.error('Error sending contact message:', error);
      let errorMessage = 'Error sending contact message.';
      
      if (error.response && error.responseCode) {
        errorMessage += ` Response code: ${error.responseCode}`;
      }
      
      res.status(500).json({ message: errorMessage });
    }
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


module.exports = app