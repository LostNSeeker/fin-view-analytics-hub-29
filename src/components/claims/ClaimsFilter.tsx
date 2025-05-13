
import React from 'react';
import { Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';

interface FilterOption {
  value: string;
  label: string;
}

export interface FiltersState {
  selectedClients: string[];
  selectedTypes: string[];
  selectedInsurers: string[];
  selectedSurveyers: string[];
  selectedStatuses: string[];
  selectedTimes: string[];
}

interface ClaimsFilterProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  filtersState: FiltersState;
  setFiltersState: React.Dispatch<React.SetStateAction<FiltersState>>;
  viewMode: 'grid' | 'list';
  setViewMode: React.Dispatch<React.SetStateAction<'grid' | 'list'>>;
  clientOptions: FilterOption[];
  typeOptions: FilterOption[];
  insurerOptions: FilterOption[];
  surveyerOptions: FilterOption[];
  statusOptions: FilterOption[];
  timeOptions: FilterOption[];
}

export const ClaimsFilter: React.FC<ClaimsFilterProps> = ({
  searchTerm,
  setSearchTerm,
  filtersState,
  setFiltersState,
  viewMode,
  setViewMode,
  clientOptions,
  typeOptions,
  insurerOptions,
  surveyerOptions,
  statusOptions,
  timeOptions,
}) => {
  // Helper function to toggle selection
  const toggleSelection = (value: string, selectedArray: string[], setFunction: (values: string[]) => void) => {
    if (selectedArray.includes(value)) {
      setFunction(selectedArray.filter((item) => item !== value));
    } else {
      setFunction([...selectedArray, value]);
    }
  };

  // Reset all filters
  const resetAllFilters = () => {
    setFiltersState({
      selectedClients: [],
      selectedTypes: [],
      selectedInsurers: [],
      selectedSurveyers: [],
      selectedStatuses: [],
      selectedTimes: [],
    });
    setSearchTerm('');
  };

  // Count applied filters
  const getAppliedFiltersCount = () => {
    return Object.values(filtersState).reduce((count, filterArray) => count + filterArray.length, 0);
  };

  // Update specific filter sets
  const updateFilter = (filterType: keyof FiltersState, values: string[]) => {
    setFiltersState(prev => ({
      ...prev,
      [filterType]: values
    }));
  };

  // Render filter badges
  const renderFilterBadges = () => {
    const {
      selectedClients,
      selectedTypes,
      selectedInsurers,
      selectedSurveyers,
      selectedStatuses,
      selectedTimes
    } = filtersState;

    const allBadges = [
      ...selectedClients.map(client => ({ type: 'Client', value: client })),
      ...selectedTypes.map(type => ({ type: 'Type', value: type })),
      ...selectedInsurers.map(insurer => ({ type: 'Insurer', value: insurer })),
      ...selectedSurveyers.map(surveyer => ({ type: 'Surveyer', value: surveyer })),
      ...selectedStatuses.map(status => ({ type: 'Status', value: status })),
      ...selectedTimes.map(time => ({ type: 'Time', value: time })),
    ];

    if (allBadges.length === 0) return null;

    return (
      <div className="flex flex-wrap gap-2 mt-4">
        {allBadges.map((badge, index) => (
          <div 
            key={index}
            className="bg-gray-100 text-xs rounded-full px-3 py-1 flex items-center gap-1"
          >
            <span className="font-medium">{badge.type}:</span> {badge.value}
            <button 
              className="ml-1 hover:text-red-500"
              onClick={() => {
                const filterType = badge.type.toLowerCase() as keyof FiltersState;
                const currentArray = filtersState[`selected${badge.type}s` as keyof FiltersState];
                if (Array.isArray(currentArray)) {
                  updateFilter(
                    `selected${badge.type}s` as keyof FiltersState, 
                    currentArray.filter(item => item !== badge.value)
                  );
                }
              }}
            >
              ×
            </button>
          </div>
        ))}
        <button 
          className="text-xs text-blue-600 hover:underline"
          onClick={resetAllFilters}
        >
          Clear All
        </button>
      </div>
    );
  };

  const renderFilterPopoverContent = () => (
    <div className="w-[300px] p-4 space-y-6">
      <div>
        <h4 className="font-medium mb-2">Client</h4>
        <div className="space-y-2">
          {clientOptions.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <Checkbox 
                id={`client-${option.value}`} 
                checked={filtersState.selectedClients.includes(option.value)} 
                onCheckedChange={() => toggleSelection(
                  option.value, 
                  filtersState.selectedClients, 
                  (values) => updateFilter('selectedClients', values)
                )}
              />
              <label 
                htmlFor={`client-${option.value}`}
                className="text-sm cursor-pointer"
              >
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h4 className="font-medium mb-2">Document Type</h4>
        <div className="space-y-2">
          {typeOptions.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <Checkbox 
                id={`type-${option.value}`} 
                checked={filtersState.selectedTypes.includes(option.value)} 
                onCheckedChange={() => toggleSelection(
                  option.value, 
                  filtersState.selectedTypes, 
                  (values) => updateFilter('selectedTypes', values)
                )}
              />
              <label 
                htmlFor={`type-${option.value}`}
                className="text-sm cursor-pointer"
              >
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h4 className="font-medium mb-2">Insurer</h4>
        <div className="space-y-2">
          {insurerOptions.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <Checkbox 
                id={`insurer-${option.value}`} 
                checked={filtersState.selectedInsurers.includes(option.value)} 
                onCheckedChange={() => toggleSelection(
                  option.value, 
                  filtersState.selectedInsurers, 
                  (values) => updateFilter('selectedInsurers', values)
                )}
              />
              <label 
                htmlFor={`insurer-${option.value}`}
                className="text-sm cursor-pointer"
              >
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h4 className="font-medium mb-2">Surveyer</h4>
        <div className="space-y-2">
          {surveyerOptions.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <Checkbox 
                id={`surveyer-${option.value}`} 
                checked={filtersState.selectedSurveyers.includes(option.value)} 
                onCheckedChange={() => toggleSelection(
                  option.value, 
                  filtersState.selectedSurveyers, 
                  (values) => updateFilter('selectedSurveyers', values)
                )}
              />
              <label 
                htmlFor={`surveyer-${option.value}`}
                className="text-sm cursor-pointer"
              >
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h4 className="font-medium mb-2">Status</h4>
        <div className="space-y-2">
          {statusOptions.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <Checkbox 
                id={`status-${option.value}`} 
                checked={filtersState.selectedStatuses.includes(option.value)} 
                onCheckedChange={() => toggleSelection(
                  option.value, 
                  filtersState.selectedStatuses, 
                  (values) => updateFilter('selectedStatuses', values)
                )}
              />
              <label 
                htmlFor={`status-${option.value}`}
                className="text-sm cursor-pointer"
              >
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h4 className="font-medium mb-2">Time Period</h4>
        <div className="space-y-2">
          {timeOptions.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <Checkbox 
                id={`time-${option.value}`} 
                checked={filtersState.selectedTimes.includes(option.value)} 
                onCheckedChange={() => toggleSelection(
                  option.value, 
                  filtersState.selectedTimes, 
                  (values) => updateFilter('selectedTimes', values)
                )}
              />
              <label 
                htmlFor={`time-${option.value}`}
                className="text-sm cursor-pointer"
              >
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-between">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={resetAllFilters}
        >
          Reset All
        </Button>
        <Button 
          size="sm" 
          className="bg-fin-blue hover:bg-fin-dark-blue"
        >
          Apply Filters
        </Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input 
            placeholder="Search documents..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        
        <div className="flex gap-2 items-center">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filter
                {getAppliedFiltersCount() > 0 && (
                  <span className="bg-fin-blue text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {getAppliedFiltersCount()}
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[350px] p-0" align="end">
              {renderFilterPopoverContent()}
            </PopoverContent>
          </Popover>
          
          <div className="border rounded-md flex">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="icon"
              className={viewMode === 'grid' ? 'bg-fin-blue hover:bg-fin-dark-blue rounded-r-none' : 'rounded-r-none'}
              onClick={() => setViewMode('grid')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="7" height="7" x="3" y="3" rx="1" />
                <rect width="7" height="7" x="14" y="3" rx="1" />
                <rect width="7" height="7" x="3" y="14" rx="1" />
                <rect width="7" height="7" x="14" y="14" rx="1" />
              </svg>
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="icon"
              className={viewMode === 'list' ? 'bg-fin-blue hover:bg-fin-dark-blue rounded-l-none' : 'rounded-l-none'}
              onClick={() => setViewMode('list')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="8" y1="6" x2="21" y2="6" />
                <line x1="8" y1="12" x2="21" y2="12" />
                <line x1="8" y1="18" x2="21" y2="18" />
                <line x1="3" y1="6" x2="3.01" y2="6" />
                <line x1="3" y1="12" x2="3.01" y2="12" />
                <line x1="3" y1="18" x2="3.01" y2="18" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
      
      {renderFilterBadges()}
    </div>
  );
};
