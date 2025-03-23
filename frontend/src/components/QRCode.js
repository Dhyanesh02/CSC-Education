import React from 'react';
import QRCode from 'qrcode.react';

const AdmitCardQR = () => {
  const admitCardUrl = "https://iteducationjobs.com/sat2023/"; // Replace with your actual admit card URL

  return (
    <QRCode
      value={admitCardUrl}
      size={180}
      level="H"
      includeMargin={true}
      renderAs="svg"
      imageSettings={{
        src: "/images/brochures/WhatsApp Image 2025-03-19 at 18.33.32_0ba4b9f4.jpg",
        x: undefined,
        y: undefined,
        height: 24,
        width: 24,
        excavate: true,
      }}
    />
  );
};

export default AdmitCardQR; 