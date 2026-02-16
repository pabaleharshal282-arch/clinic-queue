/**
 * Admin Controller - Lightweight control panel stats
 * Purpose: Aggregate data from appointments and tokens stores; doctors from mockData
 */

const appointmentStore = require('../store/appointmentStore');
const tokenStore = require('../store/tokenStore');
const doctorStore = require('../store/doctorStore');

/**
 * GET /api/admin/stats - Admin dashboard metrics (dynamic)
 * Returns: totalPatientsToday, activeQueuesCount, appointmentsToday, doctorsOnDuty
 */
const getStats = (req, res) => {
  try {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];

    const todayTokens = tokenStore.getTodayTokens();
    const totalPatientsToday = todayTokens.length;
    const activeQueuesCount = tokenStore.getActiveQueuesCount();
    const appointmentsToday = appointmentStore.countByDate(todayStr);
    const doctorsOnDuty = doctorStore.getOnDuty();

    res.json({
      success: true,
      data: {
        totalPatientsToday,
        activeQueuesCount,
        appointmentsToday,
        doctorsOnDuty: doctorsOnDuty.map((d) => ({
          id: d.id,
          name: d.name,
          department: d.department,
        })),
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getStats };
