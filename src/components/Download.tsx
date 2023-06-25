import { PDFDocument, StandardFonts, JpegEmbedder } from "pdf-lib";
import React from "react";
import axios from "axios";
// import fs from "fs";

interface props {
  title: string;
  images: string[];
}

// export function require images list
export default function Download(props: props): JSX.Element {
  const { title, images } = props;

  async function saveImagesToPDF(imageUrls, destination) {
    const pdfDoc = await PDFDocument.create();

    for (const imageUrl of imageUrls) {
      const imageResponse = await fetch(imageUrl, {
        method: "GET",
        headers: {
            "Content-Type": "image/jpeg",
        },
      });
      const imageArrayBuffer = await imageResponse.arrayBuffer();
      const image = await pdfDoc.embedPng(imageArrayBuffer);

      const page = pdfDoc.addPage();
      const { width, height } = image.scale(0.5);
      page.drawImage(image, {
        x: 0,
        y: 0,
        width,
        height,
      });
    }

    const pdfBytes = await pdfDoc.save();
    // fs.writeFileSync(destination, pdfBytes);
  }

  return (
    <div className="container mx-auto">
      {images.map((url, index) => (
        <div key={index} id={`image-${index}`}>
          <img src={url} className="hidden" alt={`Image ${index + 1}`} />
        </div>
      ))}
      <button
        onClick={() => saveImagesToPDF(images, "out.pdf")}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2"
      >
        Download
      </button>
    </div>
  );
}
