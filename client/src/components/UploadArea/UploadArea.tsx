import "./UploadArea.css";
import UploadIcon from "../../assets/uploadIcon.svg";

type Props = {
  onFileSelect: (file: File) => void;
  isUploading: boolean;
};

export default function UploadArea({ onFileSelect, isUploading }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isUploading) return;
    const file = e.target.files?.[0];
    if (file) onFileSelect(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    if (isUploading) return;
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) onFileSelect(file);
  };

  return (
    <div
      className={`upload-area ${isUploading ? "upload-area_disabled" : ""}`}
      onDrop={handleDrop}
      onDragOver={(e) => {
        if (!isUploading) e.preventDefault();
      }}
    >
      <label className="upload-area__label">
        <img src={UploadIcon} alt="Upload Icon" className="upload-area__label_icon"/>
        {isUploading ? (
          <span>Uploading...</span>
        ) : (
          <>
            <span>Drag and drop a PDF, or </span>
            <span className="underline">Upload</span>
          </>
        )}
        <input
          type="file"
          accept=".pdf"
          className="upload-area__input"
          onChange={handleChange}
          disabled={isUploading}
        />
      </label>
    </div>
  );
}
