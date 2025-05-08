
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Download, Eye, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DocumentProps {
  document: {
    id: string;
    title: string;
    type: string;
    thumbnail: string;
    client: string;
    status: string;
    fileSize: string;
    dateModified: string;
  };
  viewMode: 'grid' | 'list';
}

export const DocumentCard: React.FC<DocumentProps> = ({ document, viewMode }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Draft':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  if (viewMode === 'list') {
    return (
      <Card className="overflow-hidden hover:shadow-md transition-shadow">
        <div className="flex items-center p-4">
          <div className="flex-shrink-0 mr-4 w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
            <span className="text-xs font-medium">{document.type}</span>
          </div>
          <div className="flex-grow">
            <h3 className="font-medium">{document.title}</h3>
            <p className="text-sm text-gray-500">{document.id} • {document.client}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(document.status)}`}>
              {document.status}
            </span>
            <p className="text-sm text-gray-500">{document.dateModified}</p>
            <div className="flex">
              <Button variant="ghost" size="icon">
                <Eye className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Download className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="h-40 bg-gray-100 border-b flex items-center justify-center relative">
        {document.thumbnail ? (
          <div className="h-full w-full overflow-hidden">
            <img src={document.thumbnail} alt={document.title} className="h-full w-full object-cover" />
          </div>
        ) : (
          <div className="text-gray-400">No Preview</div>
        )}
        <div className="absolute top-2 right-2 bg-white rounded-full p-1">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(document.status)}`}>
            {document.status}
          </span>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded">{document.type}</span>
          <span className="text-xs text-gray-500">{document.fileSize}</span>
        </div>
        <h3 className="font-medium truncate">{document.title}</h3>
        <p className="text-sm text-gray-500">{document.id}</p>
        <div className="flex justify-between items-center mt-3">
          <div className="flex items-center">
            <div className="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs mr-2">
              {document.client.charAt(0)}
            </div>
            <span className="text-xs truncate max-w-[120px]">{document.client}</span>
          </div>
          <div className="flex">
            <Button variant="ghost" size="icon">
              <Download className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
