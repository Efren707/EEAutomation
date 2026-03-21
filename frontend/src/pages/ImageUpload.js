import { useState, useRef } from "react";
import { uploadImage } from "../services/api";
import Layout from "../components/Layout";

export default function ImageUpload() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [dragActive, setDragActive] = useState(false);

  const inputRef = useRef(null);

  const handleUpload = async () => {
    setError("");
    setText("");

    if (!file) {
      setError("Please select an image");
      return;
    }

    try {
      setLoading(true);

      const data = await uploadImage(file);
      setText(data.text);
      setFile(null);

    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const validateFile = (selectedFile) => {
    if (!selectedFile.type.startsWith("image/")) {
      setError("Only image files allowed");
      return false;
    }
    return true;
  };

  const handleFile = (selectedFile) => {
    if (!selectedFile) return;

    if (!validateFile(selectedFile)) {
      setFile(null);
      return;
    }

    setError("");
    setFile(selectedFile);
  };

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleFileChange = (e) => {
    handleFile(e.target.files[0]);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFile = e.dataTransfer.files[0];
    handleFile(droppedFile);
  };

  const removeFile = () => {
    setFile(null);
    setText("");
  };

  return (
    <Layout>
      <div className="container mt-4">
        <h3>Upload Image for Text Extraction</h3>

        <div
          className={`mt-3 p-5 text-center border rounded ${
            dragActive ? "border-primary bg-light" : "border-secondary"
          }`}
          style={{ cursor: "pointer" }}
          onClick={handleClick}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <p className="mb-0">
            Drag & drop an image here, or <strong>click to upload</strong>
          </p>
        </div>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />

        {file && (
          <div className="mt-4 position-relative text-center">
            <img
              src={URL.createObjectURL(file)}
              alt="preview"
              style={{ maxWidth: "300px", borderRadius: "8px" }}
            />

            <button
              onClick={removeFile}
              className="btn btn-danger btn-sm"
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                borderRadius: "50%",
                width: "30px",
                height: "30px",
                padding: "0",
              }}
            >
              ×
            </button>

            <div className="mt-3">
              <button
                className="btn btn-primary"
                onClick={handleUpload}
                disabled={loading}
              >
                {loading ? "Processing..." : "Upload"}
              </button>
            </div>
          </div>
        )}

        {error && <div className="alert alert-danger mt-3">{error}</div>}

        {text && (
          <div className="card mt-4">
            <div className="card-body">
              <h5>Extracted Text</h5>
              <pre style={{ whiteSpace: "pre-wrap" }}>{text}</pre>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}