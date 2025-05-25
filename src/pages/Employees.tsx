import React, { useState } from 'react';
import { User, UserPlus, Calendar, GraduationCap, FileText, Search } from 'lucide-react';

// Sample employee data with new fields
const employeesData = [
  {
    id: 'EMP-001',
    name: 'John Smith',
    position: 'Senior Claims Adjuster',
    email: 'john.smith@gondalia.com',
    phone: '(555) 123-4567',
    claims: 58,
    performance: 95,
    role: 'admin',
    dob: '1985-03-15',
    qualification: 'MBA in Risk Management',
    additionalDetails: 'Over 10 years of experience in claims processing. Certified in advanced claims handling.'
  },
  {
    id: 'EMP-002',
    name: 'Emily Davis',
    position: 'Claims Specialist',
    email: 'emily.davis@gondalia.com',
    phone: '(555) 234-5678',
    claims: 45,
    performance: 90,
    role: 'employee',
    dob: '1990-07-22',
    qualification: 'Bachelor of Commerce',
    additionalDetails: 'Specialized in property damage claims. Excellent customer service skills.'
  },
  {
    id: 'EMP-003',
    name: 'Robert Wilson',
    position: 'Claims Analyst',
    email: 'robert.wilson@gondalia.com',
    phone: '(555) 345-6789',
    claims: 39,
    performance: 82,
    role: 'employee',
    dob: '1988-11-05',
    qualification: 'Bachelor of Business Administration',
    additionalDetails: 'Proficient in data analysis and claims software. Strong analytical skills.'
  },
  {
    id: 'EMP-004',
    name: 'Jessica White',
    position: 'Senior Claims Analyst',
    email: 'jessica.white@gondalia.com',
    phone: '(555) 456-7890',
    claims: 52,
    performance: 88,
    role: 'admin',
    dob: '1986-09-18',
    qualification: 'Masters in Insurance Studies',
    additionalDetails: 'Team lead for complex claims. Expert in policy interpretation.'
  },
  {
    id: 'EMP-005',
    name: 'Michael Brown',
    position: 'Claims Adjuster',
    email: 'michael.brown@gondalia.com',
    phone: '(555) 567-8901',
    claims: 47,
    performance: 85,
    role: 'user',
    dob: '1992-02-28',
    qualification: 'Diploma in Insurance',
    additionalDetails: 'Handles auto insurance claims. Strong negotiation skills.'
  },
];

const EmployeeDetails = ({ employee, onClose }) => {
  const [activeTab, setActiveTab] = useState('details');
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'admin': return 'bg-purple-100 text-purple-800';
      case 'employee': return 'bg-blue-100 text-blue-800';
      case 'user': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-auto">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Employee Information</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex space-x-1 border-b">
            <button
              onClick={() => setActiveTab('details')}
              className={`px-4 py-2 font-medium transition-colors ${
                activeTab === 'details' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Employee Details
            </button>
            <button
              onClick={() => setActiveTab('claims')}
              className={`px-4 py-2 font-medium transition-colors ${
                activeTab === 'claims' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Claims Activity
            </button>
            <button
              onClick={() => setActiveTab('additional')}
              className={`px-4 py-2 font-medium transition-colors ${
                activeTab === 'additional' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Additional Information
            </button>
          </div>
          
          {activeTab === 'details' && (
            <div className="py-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col items-center">
                  <div className="h-32 w-32 rounded-full flex items-center justify-center bg-blue-600">
                    <User className="h-16 w-16 text-white" />
                  </div>
                  <h3 className="mt-4 font-semibold text-xl">{employee.name}</h3>
                  <p className="text-gray-500">{employee.position}</p>
                  <span className={`mt-2 px-3 py-1 rounded-full text-sm font-medium ${getRoleBadgeColor(employee.role)}`}>
                    {employee.role.charAt(0).toUpperCase() + employee.role.slice(1)}
                  </span>
                </div>
                
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Employee ID</p>
                      <p className="font-medium">{employee.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{employee.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium">{employee.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Date of Birth</p>
                      <p className="font-medium">{formatDate(employee.dob)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Qualification</p>
                      <p className="font-medium">{employee.qualification}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Performance Score</p>
                      <p className="font-medium">{employee.performance}%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'claims' && (
            <div className="py-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Processed Claims</p>
                  <p className="text-2xl font-bold">{employee.claims}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Approval Rate</p>
                  <p className="text-2xl font-bold">{Math.floor(employee.performance * 0.8)}%</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Average Processing</p>
                  <p className="text-2xl font-bold">{Math.floor(Math.random() * 3) + 2} days</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Performance</p>
                  <p className="text-2xl font-bold">{employee.performance}%</p>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'additional' && (
            <div className="py-6 space-y-4">
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-gray-500 mt-1" />
                <div>
                  <p className="font-medium text-sm">Date of Birth</p>
                  <p className="text-gray-600">{formatDate(employee.dob)}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <GraduationCap className="h-5 w-5 text-gray-500 mt-1" />
                <div>
                  <p className="font-medium text-sm">Qualification</p>
                  <p className="text-gray-600">{employee.qualification}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 text-gray-500 mt-1" />
                <div>
                  <p className="font-medium text-sm">Additional Details</p>
                  <p className="text-gray-600">{employee.additionalDetails || 'No additional details provided'}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const AddEmployeeForm = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    email: '',
    phone: '',
    role: '',
    dob: '',
    qualification: '',
    additionalDetails: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-lg w-full max-h-[90vh] overflow-auto">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Add New Employee</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Employee name"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Job title"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="employee@gondalia.com"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Contact number"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select a role</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="employee">Employee</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Qualification</label>
              <input
                type="text"
                name="qualification"
                value={formData.qualification}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Educational qualification"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Additional Details</label>
              <textarea
                name="additionalDetails"
                value={formData.additionalDetails}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Any additional information about the employee"
                rows={3}
              />
            </div>
          </div>
          
          <div className="flex justify-end gap-4 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
            >
              Add Employee
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Employees = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isAddEmployeeOpen, setIsAddEmployeeOpen] = useState(false);
  const [employees, setEmployees] = useState(employeesData);
  
  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.position.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleAddEmployee = (newEmployee) => {
    const employeeWithId = {
      ...newEmployee,
      id: `EMP-${String(employees.length + 1).padStart(3, '0')}`,
      claims: 0,
      performance: 0
    };
    setEmployees([...employees, employeeWithId]);
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'admin': return 'bg-purple-100 text-purple-800';
      case 'employee': return 'bg-blue-100 text-blue-800';
      case 'user': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Employees</h1>
          <p className="text-gray-500">Manage employee information and claims performance</p>
        </div>

        <button 
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          onClick={() => setIsAddEmployeeOpen(true)}
        >
          <UserPlus className="h-4 w-4" />
          Add Employee
        </button>
      </div>
      
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search employees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-80 pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      
      <div className="overflow-x-auto bg-white rounded-lg border">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Claims</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredEmployees.map((employee) => (
              <tr key={employee.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{employee.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.position}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(employee.role)}`}>
                    {employee.role.charAt(0).toUpperCase() + employee.role.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">{employee.claims}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">{employee.performance}%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                  <button
                    className="text-blue-600 hover:text-blue-900 font-medium"
                    onClick={() => setSelectedEmployee(employee)}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {selectedEmployee && (
        <EmployeeDetails 
          employee={selectedEmployee} 
          onClose={() => setSelectedEmployee(null)} 
        />
      )}
      
      {isAddEmployeeOpen && (
        <AddEmployeeForm 
          onClose={() => setIsAddEmployeeOpen(false)}
          onSubmit={handleAddEmployee}
        />
      )}
    </div>
  );
};

export default Employees;