import { Input } from "@/components/ui/input";
import { useState } from "react";

export const ImageInput = ({ image, onChange }) => {
  const [previewImage, setPreviewImage] = useState(image);
  const onInputChange = (event) => {
    const image = event.target.files[0];
    setPreviewImage(URL.createObjectURL(image));
    onChange(image);
  };
  return (
    <div className="flex items-center gap-2">
      <Input type="file" onChange={onInputChange} />
      {previewImage ? (
        <img
          src={previewImage}
          className="aspect-square w-12 bg-accent rounded-md"
        />
      ) : null}
    </div>
  );
};
