import "./KnowledgeBase.css";
import { useState, useEffect } from "react";
import { deleteDocument, getDocuments, uploadDocument, type KnowledgeDoc } from "../../utils/api.ts";
import UploadArea from "../../components/UploadArea/UploadArea";
import deleteButton from "../../assets/deleteButton.svg";

export default function KnowledgeBase() {
  const [documents, setDocuments] = useState<KnowledgeDoc[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [deletingDocumentId, setDeletingDocumentId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    setDeletingDocumentId(id);
    setDeleteError(null);
    try {
      await deleteDocument(id);
      setDocuments((currentDocuments) => currentDocuments.filter((doc) => doc._id !== id));
    } catch {
      setDeleteError("Failed to delete document");
    } finally {
      setDeletingDocumentId(null);
    }
  };

  const handleFileSelect = async (file: File) => {
    setIsUploading(true);
    try {
    const res = await uploadDocument(file);
    if (res.data) {
      setDocuments([res.data, ...documents]);
    }
    } catch {
      setError('Failed to upload document');
    } finally {
    setIsUploading(false);
    }
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
        onFileSelect={handleFileSelect}
        isUploading={isUploading}>
        </UploadArea>
        <section className="document-list">
          {isLoading && (
            <p >"Loading..."</p>
          )}

          {!isLoading && !error && documents.length > 0 && (
            documents.map((doc) => (
              <li key={doc._id} className="document-list__item">
                <p className="document__title">{doc.title}</p>
                <button 
                  className="document__delete-button"
                  aria-label="Delete this document"
                  disabled={deletingDocumentId !== null}
                  onClick={() => handleDelete(doc._id)}
                  >
                  <img 
                    src={deleteButton}
                    alt="Delete Button"
                    className="document__delete-icon"
                    />
                  </button>
              </li>
            ))
        )}

          {deleteError && (
            <p className="error-message">{deleteError}</p>
          )}

          {!isLoading && error && (
            <p className="error-message">Failed to load documents.</p>
          )}

          {!isLoading && !error && documents.length === 0 && (
            <p>No Documents Yet.</p>
          )}
      </section>
    </section>
    </div>;
}