const nodemailer = require('nodemailer');

// Create email transporter
const createTransporter = () => {
  // For production, use real SMTP settings from .env
  // For development, use ethereal email (test account)
  if (process.env.NODE_ENV === 'production') {
    return nodemailer.createTransporter({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  } else {
    // For development/testing
    return nodemailer.createTransporter({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: process.env.SMTP_USER || 'test@ethereal.email',
        pass: process.env.SMTP_PASS || 'test123',
      },
    });
  }
};

// Email templates
const templates = {
  statusUpdate: (shipment, newStatus, customerName) => ({
    subject: `Shipment Update - ${shipment.trackingNumber}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
          .status-badge { display: inline-block; background: #10b981; color: white; padding: 8px 16px; border-radius: 20px; font-weight: bold; }
          .info-row { margin: 15px 0; }
          .label { font-weight: bold; color: #667eea; }
          .button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin-top: 20px; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🚢 Wilopo Cargo</h1>
            <p>Shipment Status Update</p>
          </div>
          <div class="content">
            <p>Dear ${customerName},</p>
            <p>Your shipment has been updated:</p>
            
            <div class="info-row">
              <span class="label">Tracking Number:</span> ${shipment.trackingNumber}
            </div>
            <div class="info-row">
              <span class="label">New Status:</span> <span class="status-badge">${newStatus}</span>
            </div>
            <div class="info-row">
              <span class="label">Origin:</span> ${shipment.origin}
            </div>
            <div class="info-row">
              <span class="label">Destination:</span> ${shipment.destination}
            </div>
            
            <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/shipments/${shipment.id}" class="button">
              Track Your Shipment
            </a>
            
            <p style="margin-top: 30px;">If you have any questions, please don't hesitate to contact our customer support.</p>
          </div>
          <div class="footer">
            <p>© 2025 Wilopo Cargo. All rights reserved.</p>
            <p>This is an automated message, please do not reply to this email.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  }),

  welcomeEmail: (user) => ({
    subject: 'Welcome to Wilopo Cargo!',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin-top: 20px; }
          .features { background: white; padding: 20px; border-radius: 5px; margin: 20px 0; }
          .feature-item { margin: 10px 0; padding-left: 25px; position: relative; }
          .feature-item:before { content: "✓"; position: absolute; left: 0; color: #10b981; font-weight: bold; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🚢 Welcome to Wilopo Cargo!</h1>
          </div>
          <div class="content">
            <p>Dear ${user.name},</p>
            <p>Thank you for registering with Wilopo Cargo! We're excited to have you on board.</p>
            
            <div class="features">
              <h3>What you can do:</h3>
              <div class="feature-item">Track your shipments in real-time</div>
              <div class="feature-item">Manage and download shipping documents</div>
              <div class="feature-item">Calculate import costs instantly</div>
              <div class="feature-item">Receive status updates via email</div>
              <div class="feature-item">Access your shipment history anytime</div>
            </div>
            
            <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/login" class="button">
              Login to Your Dashboard
            </a>
            
            <p style="margin-top: 30px;">If you need any assistance, our support team is here to help!</p>
          </div>
          <div class="footer">
            <p>© 2025 Wilopo Cargo. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  }),

  documentUploaded: (shipment, document, customerName) => ({
    subject: `New Document Available - ${shipment.trackingNumber}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin-top: 20px; }
          .document-box { background: white; padding: 20px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #667eea; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📄 New Document Available</h1>
          </div>
          <div class="content">
            <p>Dear ${customerName},</p>
            <p>A new document has been uploaded for your shipment:</p>
            
            <div class="document-box">
              <p><strong>Shipment:</strong> ${shipment.trackingNumber}</p>
              <p><strong>Document Type:</strong> ${document.type}</p>
              <p><strong>File Name:</strong> ${document.fileName}</p>
            </div>
            
            <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/shipments/${shipment.id}" class="button">
              View & Download Document
            </a>
          </div>
          <div class="footer">
            <p>© 2025 Wilopo Cargo. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  }),
};

// Send email function
const sendEmail = async (to, template) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"Wilopo Cargo" <${process.env.SMTP_FROM || 'noreply@wilopocargo.com'}>`,
      to,
      subject: template.subject,
      html: template.html,
    };

    const info = await transporter.sendMail(mailOptions);
    
    console.log('Email sent successfully:', info.messageId);
    if (process.env.NODE_ENV !== 'production') {
      console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
    }
    
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
};

// Notification functions
const sendStatusUpdateEmail = async (shipment, newStatus, userEmail, userName) => {
  const template = templates.statusUpdate(shipment, newStatus, userName);
  return await sendEmail(userEmail, template);
};

const sendWelcomeEmail = async (user) => {
  const template = templates.welcomeEmail(user);
  return await sendEmail(user.email, template);
};

const sendDocumentUploadedEmail = async (shipment, document, userEmail, userName) => {
  const template = templates.documentUploaded(shipment, document, userName);
  return await sendEmail(userEmail, template);
};

module.exports = {
  sendEmail,
  sendStatusUpdateEmail,
  sendWelcomeEmail,
  sendDocumentUploadedEmail,
};
