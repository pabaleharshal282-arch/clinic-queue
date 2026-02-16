package com.gym.web;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Calls MySQL stored procedure sp_generate_member_report() and displays result on JSP.
 * Requires: MySQL JDBC driver, DB connection (e.g. context or JDBC URL).
 */
@WebServlet("/member-report")
public class MemberReportServlet extends HttpServlet {

    // Change these to match your XAMPP MySQL setup
    private static final String DB_URL = "jdbc:mysql://localhost:3306/gym_db?useSSL=false&allowPublicKeyRetrieval=true";
    private static final String DB_USER = "root";
    private static final String DB_PASSWORD = "";

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        List<MemberReportRow> reportRows = new ArrayList<>();
        String errorMessage = null;

        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD)) {

            // Call stored procedure (procedure returns one result set)
            try (CallableStatement stmt = conn.prepareCall("CALL sp_generate_member_report()")) {
                boolean hasResultSet = stmt.execute();

                if (hasResultSet) {
                    try (ResultSet rs = stmt.getResultSet()) {
                        while (rs.next()) {
                            reportRows.add(new MemberReportRow(
                                    rs.getInt(1),
                                    rs.getString(2),
                                    rs.getString(3),
                                    rs.getDate(4)
                            ));
                        }
                    }
                }
            }

        } catch (SQLException e) {
            errorMessage = "Database error: " + e.getMessage();
            e.printStackTrace();
        }

        request.setAttribute("reportRows", reportRows);
        request.setAttribute("errorMessage", errorMessage);
        request.getRequestDispatcher("/memberReport.jsp").forward(request, response);
    }

    /** DTO for one row of the member report */
    public static class MemberReportRow {
        private final int memberId;
        private final String name;
        private final String email;
        private final Date joinDate;

        public MemberReportRow(int memberId, String name, String email, Date joinDate) {
            this.memberId = memberId;
            this.name = name;
            this.email = email;
            this.joinDate = joinDate;
        }

        public int getMemberId() { return memberId; }
        public String getName() { return name; }
        public String getEmail() { return email; }
        public Date getJoinDate() { return joinDate; }
    }
}
