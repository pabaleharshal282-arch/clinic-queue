<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Member Report - Gym Management</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }
        .container { max-width: 900px; margin: 0 auto; background: white; padding: 24px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
        h1 { color: #333; border-bottom: 2px solid #4CAF50; padding-bottom: 8px; }
        .error { color: #c62828; padding: 12px; background: #ffebee; border-radius: 4px; }
        table { width: 100%; border-collapse: collapse; margin-top: 16px; }
        th, td { border: 1px solid #ddd; padding: 10px 12px; text-align: left; }
        th { background: #4CAF50; color: white; }
        tr:nth-child(even) { background: #f9f9f9; }
        .back { display: inline-block; margin-top: 16px; color: #4CAF50; text-decoration: none; }
        .back:hover { text-decoration: underline; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Member Report (Cursor Procedure)</h1>

        <c:if test="${not empty errorMessage}">
            <p class="error">${errorMessage}</p>
        </c:if>

        <c:if test="${empty errorMessage}">
            <table>
                <thead>
                    <tr>
                        <th>Member ID</th>
                        <th>Member Name</th>
                        <th>Email</th>
                        <th>Join Date</th>
                    </tr>
                </thead>
                <tbody>
                    <c:forEach var="row" items="${reportRows}">
                        <tr>
                            <td>${row.memberId}</td>
                            <td>${row.name}</td>
                            <td>${row.email}</td>
                            <td>${row.joinDate}</td>
                        </tr>
                    </c:forEach>
                </tbody>
            </table>
            <p><strong>Total members:</strong> ${reportRows.size()}</p>
        </c:if>

        <a href="${pageContext.request.contextPath}/" class="back">&larr; Back to Home</a>
    </div>
</body>
</html>
