const PDFDocument = require('pdfkit');

/**
 * Generate PDF report for shipments
 */
const generateShipmentsPDF = (shipments, res) => {
  const doc = new PDFDocument({ margin: 50 });
  
  // Pipe PDF to response
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=shipments-report.pdf');
  doc.pipe(res);

  // Add company header
  doc.fontSize(25).text('Wilopo Cargo', { align: 'center' });
  doc.fontSize(16).text('Shipment Report', { align: 'center' });
  doc.moveDown();
  doc.fontSize(10).text(`Generated on: ${new Date().toLocaleDateString()}`, { align: 'center' });
  doc.moveDown(2);

  // Add table headers
  const tableTop = 200;
  const col1 = 50;
  const col2 = 150;
  const col3 = 250;
  const col4 = 350;
  const col5 = 450;

  doc.fontSize(10).font('Helvetica-Bold');
  doc.text('Tracking #', col1, tableTop);
  doc.text('Status', col2, tableTop);
  doc.text('Origin', col3, tableTop);
  doc.text('Destination', col4, tableTop);
  doc.text('Date', col5, tableTop);

  // Add horizontal line
  doc.moveTo(col1, tableTop + 15).lineTo(550, tableTop + 15).stroke();

  // Add shipment data
  doc.font('Helvetica');
  let yPosition = tableTop + 25;

  shipments.forEach((shipment, i) => {
    if (yPosition > 700) {
      doc.addPage();
      yPosition = 50;
    }

    doc.fontSize(9);
    doc.text(shipment.trackingNumber, col1, yPosition, { width: 90 });
    doc.text(shipment.status, col2, yPosition, { width: 90 });
    doc.text(shipment.origin, col3, yPosition, { width: 90 });
    doc.text(shipment.destination, col4, yPosition, { width: 90 });
    doc.text(new Date(shipment.createdAt).toLocaleDateString(), col5, yPosition, { width: 90 });

    yPosition += 25;
  });

  // Add footer
  const pages = doc.bufferedPageRange();
  for (let i = 0; i < pages.count; i++) {
    doc.switchToPage(i);
    doc.fontSize(8).text(
      `Page ${i + 1} of ${pages.count}`,
      50,
      doc.page.height - 50,
      { align: 'center' }
    );
  }

  doc.end();
};

/**
 * Generate PDF for single shipment with details
 */
const generateSingleShipmentPDF = (shipment, res) => {
  const doc = new PDFDocument({ margin: 50 });
  
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=shipment-${shipment.trackingNumber}.pdf`);
  doc.pipe(res);

  // Header
  doc.fontSize(25).text('Wilopo Cargo', { align: 'center' });
  doc.fontSize(14).text('Shipment Details', { align: 'center' });
  doc.moveDown(2);

  // Shipment Information
  doc.fontSize(12).font('Helvetica-Bold').text('Shipment Information');
  doc.moveDown(0.5);
  doc.fontSize(10).font('Helvetica');
  doc.text(`Tracking Number: ${shipment.trackingNumber}`);
  doc.text(`Status: ${shipment.status}`);
  doc.text(`Origin: ${shipment.origin}`);
  doc.text(`Destination: ${shipment.destination}`);
  doc.text(`Weight: ${shipment.weight} kg`);
  doc.text(`Volume: ${shipment.volume} m³`);
  if (shipment.estimatedCost) {
    doc.text(`Estimated Cost: $${shipment.estimatedCost}`);
  }
  if (shipment.estimatedArrival) {
    doc.text(`Estimated Arrival: ${new Date(shipment.estimatedArrival).toLocaleDateString()}`);
  }
  doc.moveDown();

  // Sender Information
  if (shipment.senderName) {
    doc.fontSize(12).font('Helvetica-Bold').text('Sender Information');
    doc.moveDown(0.5);
    doc.fontSize(10).font('Helvetica');
    doc.text(`Name: ${shipment.senderName}`);
    if (shipment.senderAddress) {
      doc.text(`Address: ${shipment.senderAddress}`);
    }
    doc.moveDown();
  }

  // Receiver Information
  if (shipment.receiverName) {
    doc.fontSize(12).font('Helvetica-Bold').text('Receiver Information');
    doc.moveDown(0.5);
    doc.fontSize(10).font('Helvetica');
    doc.text(`Name: ${shipment.receiverName}`);
    if (shipment.receiverAddress) {
      doc.text(`Address: ${shipment.receiverAddress}`);
    }
    if (shipment.receiverPhone) {
      doc.text(`Phone: ${shipment.receiverPhone}`);
    }
    doc.moveDown();
  }

  // Status History
  if (shipment.statusHistory && shipment.statusHistory.length > 0) {
    doc.fontSize(12).font('Helvetica-Bold').text('Status History');
    doc.moveDown(0.5);
    doc.fontSize(10).font('Helvetica');
    
    shipment.statusHistory.forEach((history) => {
      doc.text(`${new Date(history.timestamp).toLocaleString()} - ${history.status}`);
      if (history.description) {
        doc.text(`   ${history.description}`, { indent: 20 });
      }
      if (history.location) {
        doc.text(`   Location: ${history.location}`, { indent: 20 });
      }
      doc.moveDown(0.5);
    });
  }

  // Footer
  doc.fontSize(8).text(
    `Generated on ${new Date().toLocaleString()}`,
    50,
    doc.page.height - 50,
    { align: 'center' }
  );

  doc.end();
};

module.exports = {
  generateShipmentsPDF,
  generateSingleShipmentPDF,
};
