import "./KnowledgeBase.css";
import { useState, useEffect } from "react";
import { getDocuments, type KnowledgeDoc } from "../../utils/api";
import UploadArea from "../../UploadArea/UploadArea";
import deleteButton from "../../../assets/deleteButton.svg";

export default function KnowledgeBase() {
  const [documents, setDocuments] = useState<KnowledgeDoc[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = (file: File) => {
    const newDoc: KnowledgeDoc = {
      _id: Date.now().toString(),
      title: file.name,
      fileName: file.name,
      userId: 'local',
      createdAt: new Date().toISOString(),
    };
    setDocuments([newDoc, ...documents]);
  };

  useEffect(() => {
  const load = async () => {
    try {
      const res = await getDocuments();
      setDocuments(res.data || []);
    } catch {
      setError("Failed to load documents");
    } finally {
      setIsLoading(false);
    }
  };

  load();
}, []);

  return <div className="knowledge-base">
    <h1>Manage Your Knowledge Base</h1>
    <section className="knowledge-base__content">
        <p>Upload documents(PDF)</p>
        <UploadArea
        onFileSelect={handleFileSelect}>
        </UploadArea>
        <section className="document-list">
          {isLoading && (
            <p >"Loading..."</p>
          )}

          {!isLoading && !error && documents.length > 0 && (
            documents.map((doc) => (
              <li key={doc._id} className="document-list__item">
                <p className="document__title">{doc.fileName}</p>
                <button 
                  className="document__delete-button"
                  aria-label="Delete this document"
                  >
                  <img 
                    src={deleteButton}
                    alt=""
                    className="document__delete-icon"
                    />
                  </button>
              </li>
            ))
        )}

          {!isLoading && error && (
            <p className="error-message">Failed to load documents.</p>
          )}

          {!isLoading && !error && documents.length === 0 && (
            <p>No Documents yet.</p>
          )}
      </section>
        <button 
            className="knowledge-base__button">
        Save
        </button>
    </section>
    </div>;
}