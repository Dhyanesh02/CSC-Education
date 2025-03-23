import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

const AdmitCardQR = () => {
  const admitCardUrl = "https://iteducationjobs.com/sat2023/"; // Replace with your actual admit card URL

  return (
    <QRCodeSVG
      value={admitCardUrl}
      size={180}
      level="H"
      includeMargin={true}
      imageSettings={{
        src: "/images/brochures",
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