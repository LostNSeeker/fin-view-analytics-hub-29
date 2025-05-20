
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, FileText, FileImage, File } from "lucide-react";
import { ClaimDocument } from "@/types/claim";
import { formatBytes } from "@/lib/format-utils";
import { formatDate } from "@/lib/date-utils";
import { Separator } from "@/components/ui/separator";

interface DocumentPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  document: ClaimDocument | null;
}

const DocumentPreviewModal = ({ isOpen, onClose, document }: DocumentPreviewModalProps) => {
  if (!document) return null;

  const getFileIcon = (fileType: string) => {
    if (fileType.includes("image")) {
      return <FileImage className="h-12 w-12 text-blue-500" />;
    } else if (fileType.includes("pdf")) {
      return <FileText className="h-12 w-12 text-red-500" />;
    } else if (fileType.includes("text") || fileType.includes("doc")) {
      return <FileText className="h-12 w-12 text-yellow-500" />;
    } else {
      return <File className="h-12 w-12 text-gray-500" />;
    }
  };

  const renderPreview = () => {
    if (document.fileType.includes("image")) {
      return (
        <div className="flex items-center justify-center p-4 bg-gray-50 rounded-md">
          <img 
            src={document.url} 
            alt={document.fileName} 
            className="max-h-80 object-contain"
          />
        </div>
      );
    } else {
      return (
        <div className="flex items-center justify-center p-12 bg-gray-50 rounded-md">
          {getFileIcon(document.fileType)}
          <p className="ml-4 text-gray-500">Preview not available</p>
        </div>
      );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>{document.fileName}</DialogTitle>
        </DialogHeader>

        {renderPreview()}

        <div className="mt-4 space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">File Size</p>
              <p className="font-medium">{formatBytes(document.fileSize)}</p>
            </div>
            <div>
              <p className="text-muted-foreground">File Type</p>
              <p className="font-medium">{document.fileType}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Date Modified</p>
              <p className="font-medium">{formatDate(document.dateModified)}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Uploaded By</p>
              <p className="font-medium">{document.uploadedBy || "Unknown"}</p>
            </div>
          </div>

          <Separator />

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>Close</Button>
            <Button className="flex items-center">
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentPreviewModal;
