import { useState } from "react";

interface ImageUploadProps {
  onImageSelected: (image: string) => void;
}

const ImageUpload = ({ onImageSelected }: ImageUploadProps) => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const image = reader.result as string;

      setPreview(image);
      onImageSelected(image);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-4">
      <label className="block font-medium">
        Product Photo
      </label>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="block w-full border rounded-lg p-2"
      />

      {preview && (
        <div className="mt-4">
          <img
            src={preview}
            alt="Product preview"
            className="w-48 h-48 object-cover rounded-lg border"
          />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
