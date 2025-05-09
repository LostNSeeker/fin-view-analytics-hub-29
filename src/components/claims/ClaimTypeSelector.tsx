
import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { 
  FileText, 
  FileCheck, 
  FileCode, 
  FileSpreadsheet, 
  FilePlus 
} from 'lucide-react';

interface ClaimTypeSelectorProps {
  onSelectType: (type: string) => void;
  onCancel: () => void;
}

export const ClaimTypeSelector: React.FC<ClaimTypeSelectorProps> = ({ onSelectType, onCancel }) => {
  const [selectedType, setSelectedType] = React.useState<string>("Claim");
  
  const claimTypes = [
    { value: 'Policy', label: 'Insurance Policy', icon: <FileText className="mr-2" /> },
    { value: 'Claim', label: 'Claim Document', icon: <FileCheck className="mr-2" /> },
    { value: 'Contract', label: 'Business Contract', icon: <FileCode className="mr-2" /> },
    { value: 'Application', label: 'Insurance Application', icon: <FileSpreadsheet className="mr-2" /> },
    { value: 'Other', label: 'Other Document', icon: <FilePlus className="mr-2" /> },
  ];
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSelectType(selectedType);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">Select the type of document you want to create:</p>
        
        <RadioGroup 
          value={selectedType} 
          onValueChange={setSelectedType} 
          className="space-y-3"
        >
          {claimTypes.map((type) => (
            <div key={type.value} className="flex items-center space-x-2 rounded-md border p-3 cursor-pointer hover:bg-accent" onClick={() => setSelectedType(type.value)}>
              <RadioGroupItem value={type.value} id={`type-${type.value}`} />
              <Label htmlFor={`type-${type.value}`} className="flex items-center text-base font-medium flex-1 cursor-pointer">
                {type.icon} {type.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
        <Button type="submit" className="bg-fin-blue hover:bg-fin-dark-blue">Continue</Button>
      </div>
    </form>
  );
};
