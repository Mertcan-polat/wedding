"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const Gallery = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetch('/api/files')
      .then(res => res.json())
      .then(data => setFiles(data.files));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Fotoğraf Galerisi</h1>
      <div className="grid grid-cols-3 gap-4">
        {files.map(file => (
          <div key={file} className="bg-white p-4 rounded shadow-md">
            <img src={`/uploads/${file}`} alt={file} className="w-full h-auto mb-4" />
            <Link href={`/uploads/${file}`} download>
              <span className="bg-blue-500 text-white py-2 px-4 rounded">İndir</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
