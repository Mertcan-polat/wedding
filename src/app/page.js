"use client";
import React, { useState } from 'react';
import Link from 'next/link';

const Home = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        alert('Dosya başarıyla yüklendi');
        setFile(null);
        setPreview(null);
      } else {
        const errorData = await res.json();
        alert(`Dosya yükleme başarısız: ${errorData.error}`);
      }
    } catch (error) {
      alert(`Dosya yükleme başarısız: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="absolute top-4 left-4">
        <Link href="/gallery">
          <span className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-200">Galeriyi Görüntüle</span>
        </Link>
      </div>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Fotoğraf Yükle</h1>
        <input type="file" onChange={handleFileChange} className="mb-4 w-full p-2 border border-gray-300 rounded" />
        {preview && (
          <div className="mb-4">
            <img src={preview} alt="Selected file preview" className="w-full h-auto rounded" />
          </div>
        )}
        <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200">Yükle</button>
      </form>
    </div>
  );
};

export default Home;
