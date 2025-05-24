import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarIcon, Save, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/context/UserContext";

const CreateClaimPopup = ({ 
  isOpen, 
  onClose, 
  preSelectedPolicy, 
  selectedClaim,
  onSuccess 
}) => {
  const [customers, setCustomers] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { BackendUrl } = useUser();

  // Form default values
  const defaultValues = {
    customer_id: "",
    employee_id: "",
    policy_id: "",
    metadata: {
      status: "Pending",
      priority: "Medium",
      claimAmount: 0,
      incidentDate: new Date().toISOString().split("T")[0],
    },
  };

  const form = useForm({
    defaultValues,
  });

  // Fetch customers and employees on component mount
  useEffect(() => {
    if (isOpen) {
      const fetchData = async () => {
        try {
          const token = localStorage.getItem("token");
          const authHeader = {
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
            },
          };
          
          const [customersRes, employeesRes] = await Promise.all([
            fetch(BackendUrl + "/customers", authHeader),
            fetch(BackendUrl + "/employees", authHeader),
          ]);

          if (!customersRes.ok || !employeesRes.ok) {
            throw new Error("Failed to fetch data");
          }

          const [customersData, employeesData] = await Promise.all([
            customersRes.json(),
            employeesRes.json(),
          ]);

          setCustomers(customersData.customers || []);
          setEmployees(employeesData || []);
        } catch (error) {
          console.error("Error fetching form data:", error);
          toast({
            title: "Error",
            description: "Failed to load data. Please try again later.",
            variant: "destructive",
          });
        }
      };

      fetchData();
    }
  }, [isOpen, BackendUrl, toast]);

  // Reset form when dialog opens/closes
  useEffect(() => {
    if (isOpen) {
      form.reset(defaultValues);
    }
  }, [isOpen, form]);

  const handleSubmit = async (formData) => {
    try {
      setIsLoading(true);

      // Prepare data for submission
      const preparedData = {
        details: "", // Empty for now since it's not in this form
        customer_id: parseInt(formData.customer_id),
        employee_id: parseInt(formData.employee_id),
        policy_id: 1, // Default for now since policy selection is simplified
        docs: {
          photoEvidence: false,
          estimateProvided: false,
        },
        metadata: {
          ...formData.metadata,
          claimAmount: parseFloat(formData.metadata.claimAmount) || 0,
        },
      };

      const token = localStorage.getItem("token");
      const response = await fetch(BackendUrl + "/claims", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify(preparedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create claim");
      }

      const savedClaim = await response.json();

      toast({
        title: "Claim created",
        description: "Claim has been created successfully.",
      });

      // Reset form and close dialog
      form.reset();
      onClose();
      
      // Call success callback if provided
      if (onSuccess) {
        onSuccess(savedClaim);
      }
    } catch (error) {
      console.error("Error creating claim:", error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    form.reset();
    onClose();
  };

  // Helper to handle form value changes that need to update nested objects
  const handleNestedChange = (field, nestedField, value) => {
    const currentValues = form.getValues(field) || {};
    form.setValue(field, {
      ...currentValues,
      [nestedField]: value,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Claim</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
              {/* Party Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Party Information</h3>
                
                <FormField
                  control={form.control}
                  name="customer_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Customer</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select customer" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {customers &&
                            customers.map((customer) => (
                              <SelectItem
                                key={customer.id}
                                value={customer.id.toString()}
                              >
                                {customer.name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="employee_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Assigned Agent</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select agent" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {employees &&
                            employees.map((employee) => (
                              <SelectItem
                                key={employee.id}
                                value={employee.id.toString()}
                              >
                                {employee.name} - {employee.position}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div>
                  <FormLabel>Policy Type</FormLabel>
                  <div className="border p-2 rounded-md bg-muted">
                    {selectedClaim || "Marine"}
                  </div>
                </div>
              </div>

              {/* Claim Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Claim Details</h3>
                
                <FormField
                  control={form.control}
                  name="metadata.status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select
                        onValueChange={(value) =>
                          handleNestedChange("metadata", "status", value)
                        }
                        defaultValue={form.getValues("metadata.status")}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Pending">Pending</SelectItem>
                          <SelectItem value="In Progress">In Progress</SelectItem>
                          <SelectItem value="Under Review">Under Review</SelectItem>
                          <SelectItem value="Approved">Approved</SelectItem>
                          <SelectItem value="Completed">Completed</SelectItem>
                          <SelectItem value="Rejected">Rejected</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="metadata.priority"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Priority</FormLabel>
                      <Select
                        onValueChange={(value) =>
                          handleNestedChange("metadata", "priority", value)
                        }
                        defaultValue={form.getValues("metadata.priority")}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Low">Low</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="High">High</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="metadata.claimAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Claim Amount</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter claim amount"
                          value={field.value}
                          onChange={(e) =>
                            handleNestedChange(
                              "metadata",
                              "claimAmount",
                              e.target.value
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="metadata.incidentDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Incident Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(new Date(field.value), "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={
                              field.value ? new Date(field.value) : undefined
                            }
                            onSelect={(date) => {
                              const dateStr = date
                                ? date.toISOString().split("T")[0]
                                : "";
                              handleNestedChange(
                                "metadata",
                                "incidentDate",
                                dateStr
                              );
                            }}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <DialogFooter className="mt-6">
              <Button
                variant="outline"
                type="button"
                onClick={handleCancel}
                disabled={isLoading}
              >
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span> Creating...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Create Claim
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateClaimPopup;