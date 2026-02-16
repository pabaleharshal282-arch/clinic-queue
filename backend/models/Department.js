/**
 * Department Model - Schema definition for hospital departments
 * Purpose: Defines structure of department entity
 * 
 * Academic Note: Model-View-Controller (MVC) pattern - Models define data structure.
 */

// Schema structure for documentation
const DepartmentSchema = {
  id: 'String',
  name: 'String',
  description: 'String',
  icon: 'String',
  doctorCount: 'Number',
};

module.exports = { DepartmentSchema };
