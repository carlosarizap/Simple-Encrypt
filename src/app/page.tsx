'use client';

import { useState } from 'react';

export default function Home() {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleProcess = async (mode: 'encrypt' | 'decrypt') => {
    setLoading(true);
    try {
      const response = await fetch(`/api/crypto?text=${encodeURIComponent(text)}&mode=${mode}`);
      const data = await response.json();
      setResult(data.result || 'Error en el proceso.');
    } catch (error) {
      if (error instanceof Error) {
        setResult('Error en el cliente: ' + error.message);
      } else {
        setResult('Error desconocido');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Fondo de video */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/space-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Contenido */}
      <div className="relative z-10 bg-black bg-opacity-60 p-6 rounded-lg shadow-2xl max-w-md w-full text-center">
        <h1 className="text-4xl font-extrabold text-white mb-2">
          Carlos Ariza
        </h1>
        <h2 className="text-xl font-semibold text-blue-400 mb-4">
          Seguridad Informática
        </h2>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Ingresa tu texto aquí..."
          className="w-full p-3 border border-blue-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-800 placeholder-gray-400 mb-4"
          rows={4}
        />

        <div className="flex space-x-4 justify-center">
          <button
            onClick={() => handleProcess('encrypt')}
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg shadow-lg hover:scale-105 transform transition text-sm"
          >
            {loading ? 'Cargando...' : 'Encriptar'}
          </button>
          <button
            onClick={() => handleProcess('decrypt')}
            className="px-6 py-2 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-lg shadow-lg hover:scale-105 transform transition text-sm"
          >
            {loading ? 'Desencriptando...' : 'Desencriptar'}
          </button>
        </div>

        <h3 className="text-lg font-semibold text-white mt-6">Resultado:</h3>
        <textarea
          value={result}
          readOnly
          className="w-full p-3 border border-green-400 rounded-md shadow-sm focus:outline-none bg-gray-200 text-sm text-gray-800 mt-4"
          rows={4}
        />
      </div>

      {/* Footer */}
      <footer className="absolute bottom-4 text-white text-sm">
        <p>Diseñado por Carlos Ariza | Seguridad Informática © {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}
