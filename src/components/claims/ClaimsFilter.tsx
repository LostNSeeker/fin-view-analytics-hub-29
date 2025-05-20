
import { useState } from "react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Search, X } from "lucide-react";

interface ClaimsFilterProps {
  onFilterChange: (filters: any) => void;
}

const ClaimsFilter = ({ onFilterChange }: ClaimsFilterProps) => {
  const [policyNumber, setPolicyNumber] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [employee, setEmployee] = useState("");
  const [status, setStatus] = useState("all"); // Changed default value to "all"
  const [dateFrom, setDateFrom] = useState<Date | undefined>(undefined);
  const [dateTo, setDateTo] = useState<Date | undefined>(undefined);

  const handleApplyFilters = () => {
    onFilterChange({
      policyNumber,
      customerName,
      employee,
      status: status === "all" ? "" : status, // Convert "all" to empty string for filtering
      dateFrom,
      dateTo
    });
  };

  const handleResetFilters = () => {
    setPolicyNumber("");
    setCustomerName("");
    setEmployee("");
    setStatus("all"); // Reset to "all" instead of empty string
    setDateFrom(undefined);
    setDateTo(undefined);
    onFilterChange({});
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        <div className="space-y-1">
          <label className="text-sm font-medium">Policy Number</label>
          <Input
            placeholder="Enter policy number"
            value={policyNumber}
            onChange={(e) => setPolicyNumber(e.target.value)}
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Customer Name</label>
          <Input
            placeholder="Enter customer name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Assigned Employee</label>
          <Input
            placeholder="Enter employee name"
            value={employee}
            onChange={(e) => setEmployee(e.target.value)}
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Status</label>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="inReview">In Review</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Date From</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !dateFrom && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateFrom ? format(dateFrom, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={dateFrom}
                onSelect={setDateFrom}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Date To</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !dateTo && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateTo ? format(dateTo, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={dateTo}
                onSelect={setDateTo}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      
      <div className="flex flex-wrap justify-between items-center mt-4">
        <div className="flex space-x-2 mt-2">
          <Button 
            variant="default" 
            onClick={handleApplyFilters}
            className="flex items-center"
          >
            <Search className="mr-1 h-4 w-4" />
            Apply Filters
          </Button>
          <Button 
            variant="outline" 
            onClick={handleResetFilters}
            className="flex items-center"
          >
            <X className="mr-1 h-4 w-4" />
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ClaimsFilter;
