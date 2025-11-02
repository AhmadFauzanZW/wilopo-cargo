const { PrismaClient } = require('@prisma/client');
const { sendStatusUpdateEmail, sendWelcomeEmail, sendDocumentUploadedEmail } = require('./emailService');

const prisma = new PrismaClient();

// Create notification record in database
const createNotification = async (userId, type, title, message, relatedId = null) => {
  try {
    const notification = await prisma.notification.create({
      data: {
        userId,
        type,
        title,
        message,
        relatedId,
        isRead: false,
      },
    });
    return notification;
  } catch (error) {
    console.error('Error creating notification:', error);
    throw error;
  }
};

// Send shipment status update notification
const notifyStatusUpdate = async (shipmentId, newStatus) => {
  try {
    const shipment = await prisma.shipment.findUnique({
      where: { id: shipmentId },
      include: { user: true },
    });

    if (!shipment) {
      throw new Error('Shipment not found');
    }

    // Create in-app notification
    await createNotification(
      shipment.userId,
      'STATUS_UPDATE',
      'Shipment Status Updated',
      `Your shipment ${shipment.trackingNumber} status has been updated to ${newStatus}`,
      shipmentId
    );

    // Send email notification
    if (shipment.user.email) {
      await sendStatusUpdateEmail(
        shipment,
        newStatus,
        shipment.user.email,
        shipment.user.fullName
      );
    }

    return { success: true };
  } catch (error) {
    console.error('Error sending status update notification:', error);
    return { success: false, error: error.message };
  }
};

// Send welcome notification to new user
const notifyNewUser = async (userId) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('User not found');
    }

    // Create in-app notification
    await createNotification(
      userId,
      'WELCOME',
      'Welcome to Wilopo Cargo!',
      'Thank you for registering. Start tracking your shipments now.',
      null
    );

    // Send welcome email
    if (user.email) {
      await sendWelcomeEmail(user);
    }

    return { success: true };
  } catch (error) {
    console.error('Error sending welcome notification:', error);
    return { success: false, error: error.message };
  }
};

// Send document upload notification
const notifyDocumentUpload = async (documentId) => {
  try {
    const document = await prisma.document.findUnique({
      where: { id: documentId },
      include: {
        shipment: {
          include: { user: true },
        },
      },
    });

    if (!document) {
      throw new Error('Document not found');
    }

    // Create in-app notification
    await createNotification(
      document.shipment.userId,
      'DOCUMENT_UPLOADED',
      'New Document Available',
      `A new ${document.documentType} document has been uploaded for shipment ${document.shipment.trackingNumber}`,
      document.shipmentId
    );

    // Send email notification
    if (document.shipment.user.email) {
      await sendDocumentUploadedEmail(
        document.shipment,
        document,
        document.shipment.user.email,
        document.shipment.user.fullName
      );
    }

    return { success: true };
  } catch (error) {
    console.error('Error sending document upload notification:', error);
    return { success: false, error: error.message };
  }
};

// Get user notifications
const getUserNotifications = async (userId, limit = 20) => {
  try {
    const notifications = await prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
    return notifications;
  } catch (error) {
    console.error('Error fetching notifications:', error);
    throw error;
  }
};

// Mark notification as read
const markNotificationAsRead = async (notificationId, userId) => {
  try {
    const notification = await prisma.notification.updateMany({
      where: {
        id: notificationId,
        userId,
      },
      data: {
        isRead: true,
      },
    });
    return notification;
  } catch (error) {
    console.error('Error marking notification as read:', error);
    throw error;
  }
};

// Mark all notifications as read
const markAllNotificationsAsRead = async (userId) => {
  try {
    const result = await prisma.notification.updateMany({
      where: {
        userId,
        isRead: false,
      },
      data: {
        isRead: true,
      },
    });
    return result;
  } catch (error) {
    console.error('Error marking all notifications as read:', error);
    throw error;
  }
};

module.exports = {
  createNotification,
  notifyStatusUpdate,
  notifyNewUser,
  notifyDocumentUpload,
  getUserNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
};
