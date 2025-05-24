import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar, FileUp, Plus, Save, X, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/context/UserContext";

const EditClaimPage = () => {
  const { id } = useParams();
  const [claim, setClaim] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [policyTypes, setPolicyTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { BackendUrl } = useUser();

  // Form default values based on the API structure
  const defaultValues = claim
    ? {
        details: claim.details || "",
        customer_id: claim.customer_id ? claim.customer_id.toString() : "",
        employee_id: claim.employee_id ? claim.employee_id.toString() : "",
        policy_id: claim.policy_id ? claim.policy_id.toString() : "",
        docs: claim.docs || {
          photoEvidence: false,
          estimateProvided: false,
        },
        metadata: claim.metadata || {
          status: "Pending",
          priority: "Medium",
          claimAmount: 0,
          incidentDate: new Date().toISOString().split("T")[0],
        },
      }
    : {
        details: "",
        customer_id: "",
        employee_id: "",
        policy_id: "",
        docs: {
          photoEvidence: false,
          estimateProvided: false,
        },
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

  // Fetch claim data
  useEffect(() => {
    const fetchClaim = async () => {
      if (!id) return;
      
      try {
        setIsDataLoading(true);
        const token = localStorage.getItem("token");
        const response = await fetch(`${BackendUrl}/claims/${id}`, {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch claim");
        }

        const claimData = await response.json();
        setClaim(claimData);
      } catch (error) {
        console.error("Error fetching claim:", error);
        toast({
          title: "Error",
          description: "Failed to load claim data. Please try again later.",
          variant: "destructive",
        });
        navigate("/claims");
      } finally {
        setIsDataLoading(false);
      }
    };

    fetchClaim();
  }, [id, BackendUrl, navigate, toast]);

  // Fetch customers, employees, and policy types
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const authHeader = {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        };
        const [customersRes, employeesRes, policyTypesRes] = await Promise.all([
          fetch(BackendUrl + "/customers", authHeader),
          fetch(BackendUrl + "/employees", authHeader),
          fetch(BackendUrl + "/policy-types", authHeader),
        ]);

        if (!customersRes.ok || !employeesRes.ok || !policyTypesRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const [customersData, employeesData, policyTypesData] =
          await Promise.all([
            customersRes.json(),
            employeesRes.json(),
            policyTypesRes.json(),
          ]);

        setCustomers(customersData.customers || []);
        setEmployees(employeesData || []);
        setPolicyTypes(policyTypesData.data || []);
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
  }, [BackendUrl, toast]);

  // Reset form when claim data is loaded
  useEffect(() => {
    if (claim) {
      const formData = {
        details: claim.details || "",
        customer_id: claim.customer_id ? claim.customer_id.toString() : "",
        employee_id: claim.employee_id ? claim.employee_id.toString() : "",
        policy_id: claim.policy_id ? claim.policy_id.toString() : "",
        docs: claim.docs || {
          photoEvidence: false,
          estimateProvided: false,
        },
        metadata: claim.metadata || {
          status: "Pending",
          priority: "Medium",
          claimAmount: 0,
          incidentDate: new Date().toISOString().split("T")[0],
        },
      };
      form.reset(formData);
    }
  }, [claim, form]);

  const handleSubmit = async (formData) => {
    try {
      setIsLoading(true);

      // Make sure all ID fields are properly formatted
      const preparedData = {
        ...formData,
        customer_id: parseInt(formData.customer_id),
        employee_id: parseInt(formData.employee_id),
        policy_id: parseInt(formData.policy_id),
        metadata: {
          ...formData.metadata,
          claimAmount: parseFloat(formData.metadata.claimAmount) || 0,
        },
      };

      const token = localStorage.getItem("token");
      const response = await fetch(`${BackendUrl}/claims/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({ ...preparedData, id: parseInt(id) }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update claim");
      }

      const savedClaim = await response.json();

      toast({
        title: "Claim updated",
        description: "Claim has been updated successfully.",
      });

      // Navigate to the claim detail page
      navigate(`/claims/${id}`);
    } catch (error) {
      console.error("Error updating claim:", error);
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
    navigate(`/claims/${id}`);
  };

  // Helper to handle form value changes that need to update nested objects
  const handleNestedChange = (field, nestedField, value) => {
    const currentValues = form.getValues(field) || {};
    form.setValue(field, {
      ...currentValues,
      [nestedField]: value,
    });
  };

  // Show loading state while fetching claim data
  if (isDataLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin text-xl">⏳</div>
        <span className="ml-2">Loading claim data...</span>
      </div>
    );
  }

  if (!claim) {
    return (
      <div className="flex items-center justify-center h-64">
        <span>Claim not found</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-6">
          <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-semibold tracking-tight">
            Edit Claim #{claim.id}
          </h1>
        </div>
      </div>

      <Form {...form}>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Claim Details Section */}
            <Card className="col-span-1 md:col-span-2">
              <CardHeader>
                <CardTitle>Claim Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="details"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Claim Details</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter claim details"
                            className="min-h-32"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Party Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Party Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="customer_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Customer</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
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
                        value={field.value}
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

                <FormField
                  control={form.control}
                  name="policy_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Policy Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select policy type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {policyTypes &&
                            policyTypes.map((policy) => (
                              <SelectItem
                                key={policy.id}
                                value={policy.id.toString()}
                              >
                                {policy.data?.name || policy.name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Claim Metadata */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Claim Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
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
                        value={form.getValues("metadata.status")}
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
                        value={form.getValues("metadata.priority")}
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
                              <Calendar className="ml-auto h-4 w-4 opacity-50" />
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
              </CardContent>
            </Card>

            {/* Documents Section */}
            <Card className="col-span-1 md:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-base">Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="docs.photoEvidence"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel>Photo Evidence</FormLabel>
                          <div className="text-sm text-muted-foreground">
                            Upload photos of the damage or incident
                          </div>
                        </div>
                        <FormControl>
                          <input
                            type="checkbox"
                            checked={field.value}
                            onChange={(e) =>
                              handleNestedChange(
                                "docs",
                                "photoEvidence",
                                e.target.checked
                              )
                            }
                            className="accent-primary h-4 w-4 rounded border-gray-300"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="docs.estimateProvided"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel>Repair Estimate</FormLabel>
                          <div className="text-sm text-muted-foreground">
                            Include repair cost estimates
                          </div>
                        </div>
                        <FormControl>
                          <input
                            type="checkbox"
                            checked={field.value}
                            onChange={(e) =>
                              handleNestedChange(
                                "docs",
                                "estimateProvided",
                                e.target.checked
                              )
                            }
                            className="accent-primary h-4 w-4 rounded border-gray-300"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="border border-dashed p-8 rounded-md flex flex-col items-center justify-center text-center mt-4">
                  <FileUp className="h-8 w-8 text-gray-400 mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Drag & drop files here, or click to select files
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Supports: PDF, Images, Word Documents (max 10MB)
                  </p>
                  <Button variant="outline" size="sm" className="mt-4">
                    <Plus className="mr-2 h-4 w-4" />
                    Select Files
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex justify-end space-x-2">
            <Button
              variant="outline"
              type="button"
              onClick={handleCancel}
              disabled={isLoading}
            >
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button 
              type="button" 
              onClick={form.handleSubmit(handleSubmit)}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="animate-spin mr-2">⏳</span> Updating...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Update Claim
                </>
              )}
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default EditClaimPage;