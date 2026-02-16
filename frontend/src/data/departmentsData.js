/**
 * Departments Static Data - Frontend-only, no backend dependency
 * Purpose: Provides department details for /departments and /departments/:departmentId
 * Each department: id, name, description, icon, doctorCount, services, facilities
 *
 * Note: Backend API integration can be added later by replacing this import
 * with fetchDepartments() / fetchDepartmentById() from hospitalApi.js
 */

export const departments = [
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

/** Get department by ID - used for /departments/:departmentId route */
export function getDepartmentById(id) {
  return departments.find((d) => d.id === id) ?? null;
}
