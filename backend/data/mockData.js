/**
 * Mock Data - Static data for Hospital Management System API
 * Purpose: Provides dummy data for doctors, departments, appointments
 * Methodology: Static JSON for demo - no database required
 * 
 * Academic Note: In production, data would come from MongoDB.
 */

// ========== DEPARTMENTS DATA ==========
// Each department includes: id, name, description, icon, doctorCount, services, facilities
const departments = [
  { id: 'dept-1', name: 'Cardiology', description: 'Comprehensive heart and cardiovascular care. Our cardiology department specializes in diagnosis and treatment of heart conditions.', icon: '❤️', doctorCount: 4, services: ['ECG & Stress Testing', 'Echocardiography', 'Angioplasty', 'Cardiac Rehabilitation'], facilities: ['24/7 Cardiac ICU', 'Cath Lab', 'Holter Monitoring'] },
  { id: 'dept-2', name: 'Orthopedics', description: 'Expert bone, joint, and muscle care. From sports injuries to joint replacements, we provide holistic orthopedic solutions.', icon: '🦴', doctorCount: 3, services: ['Joint Replacement', 'Sports Medicine', 'Spine Surgery', 'Fracture Care'], facilities: ['Operation Theatre', 'Physiotherapy Unit', 'X-Ray & MRI'] },
  { id: 'dept-3', name: 'Neurology', description: 'Advanced brain and nervous system care. Diagnosis and treatment of neurological disorders.', icon: '🧠', doctorCount: 3, services: ['Stroke Care', 'Epilepsy Management', 'Sleep Disorders', 'Headache Clinic'], facilities: ['EEG Lab', 'Neuro ICU', 'Sleep Study Lab'] },
  { id: 'dept-4', name: 'Pediatrics', description: 'Dedicated child healthcare from birth through adolescence. Compassionate care for young patients.', icon: '👶', doctorCount: 5, services: ['Vaccinations', 'Child Development', 'Pediatric Emergency', 'Nutrition Counseling'], facilities: ['Pediatric Ward', 'NICU', 'Play Area'] },
  { id: 'dept-5', name: 'Dermatology', description: 'Skin, hair, and cosmetic care. Treatment for all dermatological conditions.', icon: '💆', doctorCount: 2, services: ['Skin Biopsy', 'Laser Therapy', 'Cosmetic Procedures', 'Allergy Testing'], facilities: ['Laser Unit', 'Patch Testing Lab'] },
  { id: 'dept-6', name: 'ENT', description: 'Ear, nose, and throat specialists. Complete ENT and head-neck care.', icon: '👂', doctorCount: 3, services: ['Hearing Tests', 'Endoscopy', 'Tonsillectomy', 'Sinus Surgery'], facilities: ['Audiology Lab', 'ENT OPD', 'Minor OT'] },
  { id: 'dept-7', name: 'General Medicine', description: 'Primary and preventive care. Your first point of contact for health concerns.', icon: '🩺', doctorCount: 6, services: ['Health Checkups', 'Chronic Disease Management', 'Fever & Infections', 'Preventive Care'], facilities: ['OPD', 'Pharmacy', 'Lab Collection'] },
  { id: 'dept-8', name: 'Gynecology', description: "Women's health and maternity care. From routine checkups to high-risk pregnancy.", icon: '👩', doctorCount: 4, services: ['Prenatal Care', 'High-Risk Pregnancy', 'Laparoscopy', 'Fertility Counseling'], facilities: ['Maternity Ward', 'Ultrasound', 'Gynec OT'] },
  { id: 'dept-9', name: 'Ophthalmology', description: 'Eye care and vision correction. Comprehensive eye health services.', icon: '👁️', doctorCount: 2, services: ['Cataract Surgery', 'Retina Care', 'Glaucoma Management', 'LASIK'], facilities: ['Eye OPD', 'Surgical Theatre', 'Optometry'] },
  { id: 'dept-10', name: 'Dental', description: 'Oral and dental health. Preventive and restorative dental care.', icon: '🦷', doctorCount: 3, services: ['Routine Checkups', 'Root Canal', 'Orthodontics', 'Dental Implants'], facilities: ['Dental OPD', 'X-Ray', 'Sterilization Unit'] },
];

// ========== DOCTORS DATA ==========
// Each doctor has: id, name, department, specialization, experience, availability (string)
const doctors = [
  { id: 'doc-1', name: 'Dr. Rajesh Kumar', department: 'Cardiology', specialization: 'Interventional Cardiologist', experience: 15, availability: 'Mon, Wed, Fri', contact: '+91 98765 43210' },
  { id: 'doc-2', name: 'Dr. Priya Sharma', department: 'Cardiology', specialization: 'Pediatric Cardiologist', experience: 10, availability: 'Tue, Thu, Sat', contact: '+91 98765 43211' },
  { id: 'doc-3', name: 'Dr. Arjun Mehta', department: 'Cardiology', specialization: 'Electrophysiology', experience: 12, availability: 'Mon, Tue, Wed', contact: '+91 98765 43220' },
  { id: 'doc-4', name: 'Dr. Kavita Nair', department: 'Cardiology', specialization: 'Heart Failure Specialist', experience: 9, availability: 'Thu, Fri, Sat', contact: '+91 98765 43221' },
  { id: 'doc-5', name: 'Dr. Amit Patel', department: 'Orthopedics', specialization: 'Joint Replacement', experience: 12, availability: 'Mon, Tue, Wed, Thu', contact: '+91 98765 43212' },
  { id: 'doc-6', name: 'Dr. Suresh Reddy', department: 'Orthopedics', specialization: 'Sports Medicine', experience: 8, availability: 'Wed, Thu, Fri', contact: '+91 98765 43222' },
  { id: 'doc-7', name: 'Dr. Neha Joshi', department: 'Orthopedics', specialization: 'Spine Surgery', experience: 11, availability: 'Mon, Wed, Sat', contact: '+91 98765 43223' },
  { id: 'doc-8', name: 'Dr. Sneha Reddy', department: 'Neurology', specialization: 'Stroke Specialist', experience: 14, availability: 'Mon, Wed, Fri', contact: '+91 98765 43213' },
  { id: 'doc-9', name: 'Dr. Vikram Singh', department: 'Neurology', specialization: 'Epilepsy & Sleep Disorders', experience: 8, availability: 'Tue, Thu, Sat', contact: '+91 98765 43214' },
  { id: 'doc-10', name: 'Dr. Anil Kapoor', department: 'Neurology', specialization: 'Movement Disorders', experience: 10, availability: 'Mon, Thu, Fri', contact: '+91 98765 43224' },
  { id: 'doc-11', name: 'Dr. Anjali Desai', department: 'Pediatrics', specialization: 'Child Development', experience: 11, availability: 'Mon, Tue, Wed, Thu, Fri', contact: '+91 98765 43215' },
  { id: 'doc-12', name: 'Dr. Ravi Verma', department: 'General Medicine', specialization: 'Internal Medicine', experience: 20, availability: 'Mon, Tue, Wed, Thu, Fri, Sat', contact: '+91 98765 43216' },
  { id: 'doc-13', name: 'Dr. Meera Krishnan', department: 'Gynecology', specialization: 'High-Risk Pregnancy', experience: 16, availability: 'Tue, Wed, Fri', contact: '+91 98765 43217' },
  { id: 'doc-14', name: 'Dr. Karthik Nair', department: 'ENT', specialization: 'Head & Neck Surgery', experience: 9, availability: 'Mon, Thu, Sat', contact: '+91 98765 43218' },
  { id: 'doc-15', name: 'Dr. Pooja Gupta', department: 'Dermatology', specialization: 'Cosmetic Dermatology', experience: 7, availability: 'Wed, Fri, Sat', contact: '+91 98765 43219' },
];

// ========== HOSPITAL STATISTICS (for Home page) ==========
const hospitalStats = {
  totalDoctors: 45,
  totalDepartments: 12,
  patientsServed: 12500,
  yearsOfService: 25,
};

module.exports = {
  departments,
  doctors,
  hospitalStats,
};
