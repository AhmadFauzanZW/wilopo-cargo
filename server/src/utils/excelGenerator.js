const ExcelJS = require('exceljs');

/**
 * Generate Excel report for shipments
 */
const generateShipmentsExcel = async (shipments, res) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Shipments');

  // Set up columns
  worksheet.columns = [
    { header: 'Tracking Number', key: 'trackingNumber', width: 20 },
    { header: 'Status', key: 'status', width: 20 },
    { header: 'Origin', key: 'origin', width: 25 },
    { header: 'Destination', key: 'destination', width: 25 },
    { header: 'Weight (kg)', key: 'weight', width: 12 },
    { header: 'Volume (m³)', key: 'volume', width: 12 },
    { header: 'Estimated Cost ($)', key: 'estimatedCost', width: 18 },
    { header: 'Estimated Arrival', key: 'estimatedArrival', width: 18 },
    { header: 'Created Date', key: 'createdAt', width: 18 },
  ];

  // Style the header row
  worksheet.getRow(1).font = { bold: true, size: 12 };
  worksheet.getRow(1).fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FF667eea' },
  };
  worksheet.getRow(1).alignment = { vertical: 'middle', horizontal: 'center' };

  // Add data
  shipments.forEach((shipment) => {
    worksheet.addRow({
      trackingNumber: shipment.trackingNumber,
      status: shipment.status,
      origin: shipment.origin,
      destination: shipment.destination,
      weight: parseFloat(shipment.weight),
      volume: parseFloat(shipment.volume),
      estimatedCost: shipment.estimatedCost ? parseFloat(shipment.estimatedCost) : '',
      estimatedArrival: shipment.estimatedArrival
        ? new Date(shipment.estimatedArrival).toLocaleDateString()
        : '',
      createdAt: new Date(shipment.createdAt).toLocaleDateString(),
    });
  });

  // Add borders to all cells
  worksheet.eachRow((row, rowNumber) => {
    row.eachCell((cell) => {
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    });
  });

  // Set response headers
  res.setHeader(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  );
  res.setHeader('Content-Disposition', 'attachment; filename=shipments-report.xlsx');

  // Write to response
  await workbook.xlsx.write(res);
  res.end();
};

/**
 * Generate detailed Excel report for single shipment
 */
const generateSingleShipmentExcel = async (shipment, res) => {
  const workbook = new ExcelJS.Workbook();
  
  // Sheet 1: Shipment Details
  const detailsSheet = workbook.addWorksheet('Shipment Details');
  
  // Add company header
  detailsSheet.mergeCells('A1:B1');
  detailsSheet.getCell('A1').value = 'Wilopo Cargo - Shipment Details';
  detailsSheet.getCell('A1').font = { bold: true, size: 16 };
  detailsSheet.getCell('A1').alignment = { horizontal: 'center' };
  
  detailsSheet.addRow([]);
  
  // Shipment Information
  detailsSheet.addRow(['Tracking Number', shipment.trackingNumber]);
  detailsSheet.addRow(['Status', shipment.status]);
  detailsSheet.addRow(['Origin', shipment.origin]);
  detailsSheet.addRow(['Destination', shipment.destination]);
  detailsSheet.addRow(['Weight (kg)', parseFloat(shipment.weight)]);
  detailsSheet.addRow(['Volume (m³)', parseFloat(shipment.volume)]);
  if (shipment.estimatedCost) {
    detailsSheet.addRow(['Estimated Cost ($)', parseFloat(shipment.estimatedCost)]);
  }
  if (shipment.estimatedArrival) {
    detailsSheet.addRow([
      'Estimated Arrival',
      new Date(shipment.estimatedArrival).toLocaleDateString(),
    ]);
  }
  detailsSheet.addRow(['Created Date', new Date(shipment.createdAt).toLocaleDateString()]);
  
  detailsSheet.addRow([]);
  
  // Sender Information
  if (shipment.senderName) {
    detailsSheet.addRow(['Sender Name', shipment.senderName]);
    if (shipment.senderAddress) {
      detailsSheet.addRow(['Sender Address', shipment.senderAddress]);
    }
    detailsSheet.addRow([]);
  }
  
  // Receiver Information
  if (shipment.receiverName) {
    detailsSheet.addRow(['Receiver Name', shipment.receiverName]);
    if (shipment.receiverAddress) {
      detailsSheet.addRow(['Receiver Address', shipment.receiverAddress]);
    }
    if (shipment.receiverPhone) {
      detailsSheet.addRow(['Receiver Phone', shipment.receiverPhone]);
    }
  }
  
  // Style the details sheet
  detailsSheet.getColumn(1).width = 20;
  detailsSheet.getColumn(2).width = 50;
  detailsSheet.getColumn(1).font = { bold: true };
  
  // Sheet 2: Status History
  if (shipment.statusHistory && shipment.statusHistory.length > 0) {
    const historySheet = workbook.addWorksheet('Status History');
    
    historySheet.columns = [
      { header: 'Date & Time', key: 'timestamp', width: 25 },
      { header: 'Status', key: 'status', width: 25 },
      { header: 'Location', key: 'location', width: 30 },
      { header: 'Description', key: 'description', width: 40 },
    ];
    
    // Style header
    historySheet.getRow(1).font = { bold: true };
    historySheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF667eea' },
    };
    
    // Add history data
    shipment.statusHistory.forEach((history) => {
      historySheet.addRow({
        timestamp: new Date(history.timestamp).toLocaleString(),
        status: history.status,
        location: history.location || '',
        description: history.description || '',
      });
    });
    
    // Add borders
    historySheet.eachRow((row) => {
      row.eachCell((cell) => {
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        };
      });
    });
  }
  
  // Sheet 3: Documents
  if (shipment.documents && shipment.documents.length > 0) {
    const documentsSheet = workbook.addWorksheet('Documents');
    
    documentsSheet.columns = [
      { header: 'Document Type', key: 'documentType', width: 25 },
      { header: 'File Name', key: 'originalName', width: 40 },
      { header: 'Upload Date', key: 'uploadedAt', width: 20 },
    ];
    
    // Style header
    documentsSheet.getRow(1).font = { bold: true };
    documentsSheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF667eea' },
    };
    
    // Add document data
    shipment.documents.forEach((doc) => {
      documentsSheet.addRow({
        documentType: doc.documentType,
        originalName: doc.originalName,
        uploadedAt: new Date(doc.uploadedAt).toLocaleString(),
      });
    });
    
    // Add borders
    documentsSheet.eachRow((row) => {
      row.eachCell((cell) => {
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        };
      });
    });
  }
  
  // Set response headers
  res.setHeader(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  );
  res.setHeader(
    'Content-Disposition',
    `attachment; filename=shipment-${shipment.trackingNumber}.xlsx`
  );
  
  // Write to response
  await workbook.xlsx.write(res);
  res.end();
};

module.exports = {
  generateShipmentsExcel,
  generateSingleShipmentExcel,
};
