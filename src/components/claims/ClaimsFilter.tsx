import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Search, X, Filter, Check, ChevronsUpDown } from "lucide-react";
import { useUser } from "@/context/UserContext";

interface Employee {
  _id?: string;
  id?: string | number;
  name: string;
  firstName?: string;
  lastName?: string;
}

interface ClaimsFilterProps {
  onFilterChange: (filters: any) => void;
  isOpen?: boolean;
  setIsOpen?: (isOpen: boolean) => void;
}

const statusOptions = [
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
  { value: "inReview", label: "In Review" },
];

const ClaimsFilter = ({ onFilterChange, isOpen, setIsOpen }: ClaimsFilterProps) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [dateFrom, setDateFrom] = useState<Date | undefined>(undefined);
  const [dateTo, setDateTo] = useState<Date | undefined>(undefined);
  const [employeeDropdownOpen, setEmployeeDropdownOpen] = useState(false);
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Add loading state for employees
  const { BackendUrl } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true); // Set loading to true before fetching
        const token = localStorage.getItem("token");
        const authHeader = {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        };
        const employeesRes = await fetch(BackendUrl + "/employees", authHeader);

        if (!employeesRes.ok) {
          throw new Error("Failed to fetch employees");
        }

        const employeesData = await employeesRes.json();
        console.log("Fetched employees:", employeesData);

        const normalizedEmployees = employeesData.map((emp: any) => ({
          id: emp._id || emp.id,
          name: emp.name || "Unknown",
        }));
        console.log("normalizedEmployees:", normalizedEmployees);
        setEmployees(normalizedEmployees);
        setIsLoading(false); // Set loading to false after success
      } catch (error) {
        console.error("Error fetching employees:", error);
        setIsLoading(false); // Set loading to false on error
      }
    };

    fetchData();
  }, [BackendUrl]);

  const handleApplyFilters = () => {
    onFilterChange({
      employees: selectedEmployees,
      statuses: selectedStatuses,
      dateFrom,
      dateTo,
    });
    setIsOpen?.(false);
  };

  const handleResetFilters = () => {
    setSelectedEmployees([]);
    setSelectedStatuses([]);
    setDateFrom(undefined);
    setDateTo(undefined);
    onFilterChange({});
  };

  const toggleEmployee = (employeeId: string) => {
    setSelectedEmployees((prev) =>
      prev.includes(employeeId)
        ? prev.filter((id) => id !== employeeId)
        : [...prev, employeeId]
    );
  };

  const toggleStatus = (status: string) => {
    setSelectedStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  const getSelectedEmployeeNames = () => {
    const names = selectedEmployees
      .map((id) => employees.find((emp) => emp.id?.toString() === id)?.name)
      .filter(Boolean);

    if (names.length === 0) return "Select employees";
    if (names.length === 1) return names[0];
    return `${names.length} employees selected`;
  };

  const getSelectedStatusLabels = () => {
    const labels = selectedStatuses
      .map((value) => statusOptions.find((opt) => opt.value === value)?.label)
      .filter(Boolean);

    if (labels.length === 0) return "Select statuses";
    if (labels.length === 1) return labels[0];
    return `${labels.length} statuses selected`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Filter Claims</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Employee Multi-Select */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Assigned Employees</label>
            <Popover
              open={employeeDropdownOpen}
              onOpenChange={setEmployeeDropdownOpen}
            >
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={employeeDropdownOpen}
                  className="w-full justify-between"
                >
                  {getSelectedEmployeeNames()}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Search employees..." />
                  <CommandList>
                    {isLoading ? (
                      <div className="p-2 text-center text-sm text-muted-foreground">
                        Loading employees...
                      </div>
                    ) : (
                      <>
                        <CommandEmpty>No employee found.</CommandEmpty>
                        <CommandGroup className="max-h-64 overflow-auto">
                          {employees.map((employee) => (
                            <CommandItem
                              key={employee.id}
                              value={employee.id?.toString() || ""}
                              onSelect={() =>
                                toggleEmployee(employee.id?.toString() || "")
                              }
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  selectedEmployees.includes(
                                    employee.id?.toString() || ""
                                  )
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {employee.name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </>
                    )}
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            {selectedEmployees.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {selectedEmployees.map((id) => {
                  const employee = employees.find(
                    (emp) => emp.id?.toString() === id
                  );
                  return employee ? (
                    <Badge key={id} variant="secondary" className="text-xs">
                      {employee.name}
                      <button
                        type="button"
                        className="ml-1 hover:bg-muted rounded"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleEmployee(id);
                        }}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ) : null;
                })}
              </div>
            )}
          </div>

          {/* Status Multi-Select */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Status</label>
            <Popover
              open={statusDropdownOpen}
              onOpenChange={setStatusDropdownOpen}
            >
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={statusDropdownOpen}
                  className="w-full justify-between"
                >
                  {getSelectedStatusLabels()}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandList>
                    <CommandGroup>
                      {statusOptions.map((option) => (
                        <CommandItem
                          key={option.value}
                          value={option.value}
                          onSelect={() => toggleStatus(option.value)}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              selectedStatuses.includes(option.value)
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {option.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            {selectedStatuses.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {selectedStatuses.map((value) => {
                  const status = statusOptions.find(
                    (opt) => opt.value === value
                  );
                  return status ? (
                    <Badge key={value} variant="secondary" className="text-xs">
                      {status.label}
                      <X
                        className="ml-1 h-3 w-3 cursor-pointer"
                        onClick={() => toggleStatus(value)}
                      />
                    </Badge>
                  ) : null;
                })}
              </div>
            )}
          </div>

          {/* Date Range */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
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
                    {dateFrom ? (
                      format(dateFrom, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
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

            <div className="space-y-2">
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
        </div>

        <div className="flex justify-between space-x-2 pt-4">
          <Button
            variant="outline"
            onClick={handleResetFilters}
            className="flex items-center"
          >
            <X className="mr-2 h-4 w-4" />
            Reset
          </Button>
          <Button onClick={handleApplyFilters} className="flex items-center">
            <Search className="mr-2 h-4 w-4" />
            Apply Filters
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ClaimsFilter;