
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DocumentCard } from '@/components/claims/DocumentCard';
import { ClaimForm } from '@/components/claims/ClaimForm';
import { DocumentType } from '@/types/document';

interface DocumentGridProps {
  documents: DocumentType[];
}

export const DocumentGrid: React.FC<DocumentGridProps> = ({ documents }) => {
  if (!documents || documents.length === 0) {
    return <p className="text-gray-500">No documents found.</p>;
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {documents.map((document, index) => (
        <Dialog key={document.id}>
          <DialogTrigger asChild>
            <div className="cursor-pointer">
              <DocumentCard document={document} viewMode="grid" serialNumber={index + 1} />
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>Claim Details: {document.title}</DialogTitle>
            </DialogHeader>
            <ClaimForm documentType={document.type} documentId={document.id} skipTypeSelection={true} />
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
};
