/**
 * Doctors Static Data - Frontend-only, used for filtering on DepartmentDetails
 * Purpose: Filter doctors by department name when displaying department details
 * Each doctor: id, name, department, specialization, experience, availability
 *
 * Note: Doctors page (/doctors) may still use API. This data is for DepartmentDetails
 * when backend is unavailable. Backend API integration can be added later.
 */

export const doctors = [
  { id: 'doc-1', name: 'Dr. Rajesh Kumar', department: 'Cardiology', specialization: 'Interventional Cardiologist', experience: 15, availability: 'Mon, Wed, Fri' },
  { id: 'doc-2', name: 'Dr. Priya Sharma', department: 'Cardiology', specialization: 'Pediatric Cardiologist', experience: 10, availability: 'Tue, Thu, Sat' },
  { id: 'doc-3', name: 'Dr. Arjun Mehta', department: 'Cardiology', specialization: 'Electrophysiology', experience: 12, availability: 'Mon, Tue, Wed' },
  { id: 'doc-4', name: 'Dr. Kavita Nair', department: 'Cardiology', specialization: 'Heart Failure Specialist', experience: 9, availability: 'Thu, Fri, Sat' },
  { id: 'doc-5', name: 'Dr. Amit Patel', department: 'Orthopedics', specialization: 'Joint Replacement', experience: 12, availability: 'Mon, Tue, Wed, Thu' },
  { id: 'doc-6', name: 'Dr. Suresh Reddy', department: 'Orthopedics', specialization: 'Sports Medicine', experience: 8, availability: 'Wed, Thu, Fri' },
  { id: 'doc-7', name: 'Dr. Neha Joshi', department: 'Orthopedics', specialization: 'Spine Surgery', experience: 11, availability: 'Mon, Wed, Sat' },
  { id: 'doc-8', name: 'Dr. Sneha Reddy', department: 'Neurology', specialization: 'Stroke Specialist', experience: 14, availability: 'Mon, Wed, Fri' },
  { id: 'doc-9', name: 'Dr. Vikram Singh', department: 'Neurology', specialization: 'Epilepsy & Sleep Disorders', experience: 8, availability: 'Tue, Thu, Sat' },
  { id: 'doc-10', name: 'Dr. Anil Kapoor', department: 'Neurology', specialization: 'Movement Disorders', experience: 10, availability: 'Mon, Thu, Fri' },
  { id: 'doc-11', name: 'Dr. Anjali Desai', department: 'Pediatrics', specialization: 'Child Development', experience: 11, availability: 'Mon, Tue, Wed, Thu, Fri' },
  { id: 'doc-12', name: 'Dr. Ravi Verma', department: 'General Medicine', specialization: 'Internal Medicine', experience: 20, availability: 'Mon, Tue, Wed, Thu, Fri, Sat' },
  { id: 'doc-13', name: 'Dr. Meera Krishnan', department: 'Gynecology', specialization: 'High-Risk Pregnancy', experience: 16, availability: 'Tue, Wed, Fri' },
  { id: 'doc-14', name: 'Dr. Karthik Nair', department: 'ENT', specialization: 'Head & Neck Surgery', experience: 9, availability: 'Mon, Thu, Sat' },
  { id: 'doc-15', name: 'Dr. Pooja Gupta', department: 'Dermatology', specialization: 'Cosmetic Dermatology', experience: 7, availability: 'Wed, Fri, Sat' },
];

/** Filter doctors by department name */
export function getDoctorsByDepartment(departmentName) {
  if (!departmentName) return [];
  return doctors.filter((d) => d.department === departmentName);
}
