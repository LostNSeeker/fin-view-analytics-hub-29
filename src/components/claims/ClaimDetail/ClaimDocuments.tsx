import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ClaimDocument } from "@/types/claim";
import { formatBytes } from "@/lib/format-utils";
import { 
  FileText, 
  FileImage, 
  Download, 
  Trash2, 
  File, 
  UploadCloud 
} from "lucide-react";
import { formatDate } from "@/lib/date-utils";

interface ClaimDocumentsProps {
  documents: ClaimDocument[];
  onViewDocument: (document: ClaimDocument) => void;
  onDeleteDocument?: (documentId: string) => void;
}

const ClaimDocuments = ({ 
  documents, 
  onViewDocument, 
  onDeleteDocument 
}: ClaimDocumentsProps) => {
  const getFileIcon = (fileType: string) => {
    if (fileType.includes("image")) {
      return <FileImage className="h-8 w-8 text-blue-500" />;
    } else if (fileType.includes("pdf")) {
      return <FileText className="h-8 w-8 text-red-500" />;
    } else if (fileType.includes("text") || fileType.includes("doc")) {
      return <FileText className="h-8 w-8 text-yellow-500" />;
    } else {
      return <File className="h-8 w-8 text-gray-500" />;
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle>Documents</CardTitle>
        <Button 
          size="sm"
          className="text-xs flex items-center"
        >
          <UploadCloud className="mr-1 h-4 w-4" />
          Upload Documents
        </Button>
      </CardHeader>
      <CardContent>
        {documents.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            No documents attached to this claim
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="border rounded-lg p-3 hover:bg-gray-50 transition cursor-pointer"
                onClick={() => onViewDocument(doc)}
              >
                <div className="flex items-center space-x-3">
                  {getFileIcon(doc.fileType)}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{doc.fileName}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatBytes(doc.fileSize)}
                    </p>
                  </div>
                </div>
                <div className="mt-2 flex justify-between items-center text-xs text-gray-500">
                  <span>{formatDate(doc.dateModified)}</span>
                  <div className="flex space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Download logic here
                      }}
                    >
                      <Download className="h-3 w-3" />
                    </Button>
                    {onDeleteDocument && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-destructive hover:text-destructive"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteDocument(doc.id);
                        }}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ClaimDocuments;
