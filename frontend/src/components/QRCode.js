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
        src: "/images/csc-logo-small.png",
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