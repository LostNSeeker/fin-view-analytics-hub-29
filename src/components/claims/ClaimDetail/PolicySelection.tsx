import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronRight, X } from 'lucide-react';

// Type definitions
interface PolicySubType {
  id: string;
  name: string;
  uniqueId: string; // Added unique ID for each policy type/subtype
}

interface PolicyType {
  id: string;
  name: string;
  uniqueId: string; // Added unique ID for each policy type
  subTypes?: PolicySubType[];
}

// Policy data with unique IDs for each policy type and subtype
const policyTypes: PolicyType[] = [
  {
    id: 'marine',
    name: 'Marine',
    uniqueId: 'marine_main',
    subTypes: [
      { id: 'container', name: 'Container', uniqueId: 'marine_container' },
      { id: 'import', name: 'Import', uniqueId: 'marine_import' },
      { id: 'export', name: 'Export', uniqueId: 'marine_export' },
      { id: 'demurrage', name: 'Demurrage', uniqueId: 'marine_demurrage' },
      { id: 'inland', name: 'Inland', uniqueId: 'marine_inland' }
    ]
  },
  {
    id: 'engineering',
    name: 'Engineering',
    uniqueId: 'engineering_main',
    subTypes: [
      { id: 'contractor-all-risk', name: 'Contractor All Risk Policy', uniqueId: 'engineering_contractor_all_risk' },
      { id: 'electronic-equipment', name: 'Electronic Equipment Insurance', uniqueId: 'engineering_electronic_equipment' },
      { id: 'erectors-all-risk', name: 'Erectors All Risk', uniqueId: 'engineering_erectors_all_risk' },
      { id: 'machine-breakdown', name: 'Machine Breakdown', uniqueId: 'engineering_machine_breakdown' }
    ]
  },
  {
    id: 'fire',
    name: 'Fire',
    uniqueId: 'fire_main'
  },
  {
    id: 'miscellaneous',
    name: 'Miscellaneous',
    uniqueId: 'miscellaneous_main'
  },
  {
    id: 'value-added-services',
    name: 'Value Added Services',
    uniqueId: 'value_added_services_main'
  },
  {
    id: 'client',
    name: 'Client',
    uniqueId: 'client_main'
  }
];

// Additional sub-types for Marine sub-categories with unique IDs
const getNestedSubTypes = (policyId: string, subTypeId?: string): PolicySubType[] => {
  if (policyId === 'marine') {
    if (subTypeId === 'container') {
      return [
        { id: 'box-container', name: 'Box Container', uniqueId: 'marine_container_box' },
        { id: 'iso-container', name: 'ISO Container', uniqueId: 'marine_container_iso' },
        { id: 'reefer-container', name: 'Reefer Container', uniqueId: 'marine_container_reefer' }
      ];
    }
    if (subTypeId === 'import') {
      return [
        { id: 'air-import', name: 'Air', uniqueId: 'marine_import_air' },
        { id: 'sea-import', name: 'Sea', uniqueId: 'marine_import_sea' }
      ];
    }
    if (subTypeId === 'export') {
      return [
        { id: 'air-export', name: 'Air', uniqueId: 'marine_export_air' },
        { id: 'sea-export', name: 'Sea', uniqueId: 'marine_export_sea' }
      ];
    }
  }
  return [];
};

interface PolicyTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect?: (policyType: string, subType?: string, displayName?: string, uniqueId?: string) => void;
}
export const PolicyTypeModal: React.FC<PolicyTypeModalProps> = ({ isOpen, onClose, onSelect }) => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const navigate = useNavigate();

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const handleSelect = (policyId: string, subTypeId?: string) => {
    let displayName = '';
    let uniqueId = '';
    
    if (subTypeId) {
      const policy = policyTypes.find(p => p.id === policyId);
      const subType = policy?.subTypes?.find(s => s.id === subTypeId);
      
      // Check for nested subtypes
      const nestedSubTypes = getNestedSubTypes(policyId, subTypeId);
      if (nestedSubTypes.length > 0) {
        // Don't select if it has nested subtypes, just expand
        toggleExpanded(`${policyId}-${subTypeId}`);
        return;
      }
      
      displayName = subType?.name || '';
      uniqueId = subType?.uniqueId || '';
    } else {
      const policy = policyTypes.find(p => p.id === policyId);
      displayName = policy?.name || '';
      uniqueId = policy?.uniqueId || '';
    }

    // Call the onSelect callback if provided
    if (onSelect) {
      onSelect(policyId, subTypeId, displayName, uniqueId);
    }

    // Navigate to /claims/new with the selected policy type as URL parameter
    navigate(`/claims/new`, { state: { selectedOption: displayName } });
  };

  const handleNestedSelect = (policyId: string, subTypeId: string, nestedId: string) => {
    const nestedSubTypes = getNestedSubTypes(policyId, subTypeId);
    const nestedSubType = nestedSubTypes.find(n => n.id === nestedId);
    const displayName = nestedSubType?.name || '';
    const uniqueId = nestedSubType?.uniqueId || '';
    
    // Call the onSelect callback if provided
    if (onSelect) {
      onSelect(policyId, nestedId, displayName, uniqueId);
    }
    
    // Navigate to /claims/new with the selected policy type as URL parameter
    navigate(`/claims/new`, { state: { selectedOption: displayName } });
  };

  const renderSubTypes = (subTypes: PolicySubType[], parentId: string, level: number = 1) => {
    return subTypes.map(subType => {
      const hasNestedSubTypes = getNestedSubTypes(parentId, subType.id).length > 0;
      const isExpanded = expandedItems.has(`${parentId}-${subType.id}`);
      const nestedSubTypes = getNestedSubTypes(parentId, subType.id);

      return (
        <div key={subType.id}>
          <div
            className={`flex items-center justify-between px-4 py-2 hover:bg-gray-100 cursor-pointer ${
              level === 1 ? 'pl-8' : 'pl-12'
            }`}
            onClick={() => handleSelect(parentId, subType.id)}
          >
            <span className="text-gray-700">{subType.name}</span>
            {hasNestedSubTypes && (
              <div 
                className="ml-2"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleExpanded(`${parentId}-${subType.id}`);
                }}
              >
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-gray-500" />
                )}
              </div>
            )}
          </div>
          {hasNestedSubTypes && isExpanded && (
            <div className="bg-gray-50">
              {nestedSubTypes.map(nested => (
                <div
                  key={nested.id}
                  className="px-4 py-2 pl-16 hover:bg-gray-200 cursor-pointer text-gray-600"
                  onClick={() => handleNestedSelect(parentId, subType.id, nested.id)}
                >
                  {nested.name}
                </div>
              ))}
            </div>
          )}
        </div>
      );
    });
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-2xl w-full max-w-md max-h-96 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Select Policy Type</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          {/* Content */}
          <div className="max-h-80 overflow-y-auto">
            {policyTypes.map(policy => {
              const isExpanded = expandedItems.has(policy.id);
              const hasSubTypes = policy.subTypes && policy.subTypes.length > 0;

              return (
                <div key={policy.id}>
                  <div
                    className="flex items-center justify-between px-4 py-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100"
                    onClick={() => {
                      if (hasSubTypes) {
                        toggleExpanded(policy.id);
                      } else {
                        handleSelect(policy.id);
                      }
                    }}
                  >
                    <span className="font-medium text-gray-900">{policy.name}</span>
                    {hasSubTypes && (
                      <div className="ml-2">
                        {isExpanded ? (
                          <ChevronDown className="h-4 w-4 text-gray-500" />
                        ) : (
                          <ChevronRight className="h-4 w-4 text-gray-500" />
                        )}
                      </div>
                    )}
                  </div>
                  {hasSubTypes && isExpanded && policy.subTypes && (
                    <div className="bg-gray-50">
                      {renderSubTypes(policy.subTypes, policy.id)}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};