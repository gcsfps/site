import { useState, useRef } from 'react';
import Image from 'next/image';
import ReactCrop, { Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { FiUpload, FiEdit2 } from 'react-icons/fi';

interface ImageUploadProps {
  currentImage?: string;
  onImageChange: (file: File) => void;
  aspectRatio?: number;
  label: string;
  height?: string;
}

export default function ImageUpload({
  currentImage,
  onImageChange,
  aspectRatio,
  label,
  height = 'h-48'
}: ImageUploadProps) {
  const [preview, setPreview] = useState(currentImage);
  const [crop, setCrop] = useState<Crop>({
    unit: '%',
    width: 100,
    height: 100,
    x: 0,
    y: 0
  });
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
        setIsEditing(true);
      };
      reader.readAsDataURL(file);
      onImageChange(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
        setIsEditing(true);
      };
      reader.readAsDataURL(file);
      onImageChange(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="space-y-2">
      <label className="block text-gray-300 font-medium">{label}</label>
      <div
        className={`relative ${height} rounded-lg overflow-hidden bg-dark-800 group cursor-pointer`}
        onClick={() => fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {preview ? (
          <>
            <Image
              src={preview}
              alt={label}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <FiEdit2 className="w-8 h-8 text-white" />
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 hover:text-accent-purple transition-colors">
            <FiUpload className="w-8 h-8 mb-2" />
            <span className="text-sm">Arraste uma imagem ou clique para selecionar</span>
          </div>
        )}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-dark-800 rounded-lg p-6 max-w-2xl w-full">
            <h3 className="text-xl font-semibold mb-4">Ajustar Imagem</h3>
            <ReactCrop
              crop={crop}
              onChange={c => setCrop(c)}
              aspect={aspectRatio}
            >
              <img src={preview} alt="Preview" />
            </ReactCrop>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={() => setIsEditing(false)}
                className="btn-secondary"
              >
                Cancelar
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="btn-primary"
              >
                Aplicar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
