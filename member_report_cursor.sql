-- ============================================================
-- Online Gym Management System - Member Report Stored Procedure
-- Using MySQL Cursor (XAMPP Compatible)
-- DBMS Practical - Exam Ready
-- ============================================================

-- Drop existing objects if they exist (for clean re-run)
DROP PROCEDURE IF EXISTS sp_generate_member_report;

-- ============================================================
-- STEP 1: Create the members table
-- ============================================================

CREATE TABLE IF NOT EXISTS members (
    member_id    INT PRIMARY KEY AUTO_INCREMENT,
    name         VARCHAR(100) NOT NULL,
    email        VARCHAR(100) NOT NULL UNIQUE,
    join_date    DATE NOT NULL,
    created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- STEP 2: Sample Insert Data
-- ============================================================

INSERT INTO members (name, email, join_date) VALUES
('Rahul Sharma',      'rahul.sharma@email.com',   '2024-01-15'),
('Priya Patel',       'priya.patel@email.com',    '2024-02-20'),
('Amit Kumar',        'amit.kumar@email.com',     '2024-03-10'),
('Sneha Reddy',       'sneha.reddy@email.com',    '2024-04-05'),
('Vikram Singh',      'vikram.singh@email.com',   '2024-05-18');

-- ============================================================
-- STEP 3: Stored Procedure with Cursor
-- ============================================================

DELIMITER $$

CREATE PROCEDURE sp_generate_member_report()
BEGIN
    -- Variable declarations for FETCH
    DECLARE v_member_id  INT;
    DECLARE v_name       VARCHAR(100);
    DECLARE v_email      VARCHAR(100);
    DECLARE v_join_date  DATE;

    -- Flag for cursor loop exit (NOT FOUND condition)
    DECLARE done INT DEFAULT FALSE;

    -- CURSOR: Declare cursor to iterate through all members
    DECLARE member_cursor CURSOR FOR
        SELECT member_id, name, email, join_date
        FROM members
        ORDER BY member_id;

    -- HANDLER: Set done=TRUE when no more rows to fetch
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

    -- Create temporary table to store report data
    DROP TEMPORARY TABLE IF EXISTS member_report_temp;
    CREATE TEMPORARY TABLE member_report_temp (
        member_id   INT,
        name        VARCHAR(100),
        email       VARCHAR(100),
        join_date   DATE
    );

    -- OPEN the cursor
    OPEN member_cursor;

    -- LOOP: Fetch and process each member record
    member_loop: LOOP
        -- FETCH: Get next row into variables
        FETCH member_cursor INTO v_member_id, v_name, v_email, v_join_date;

        -- Exit loop when no more rows (handler sets done=TRUE)
        IF done THEN
            LEAVE member_loop;
        END IF;

        -- Store fetched data into temporary report table
        INSERT INTO member_report_temp
        VALUES (v_member_id, v_name, v_email, v_join_date);

    END LOOP member_loop;

    -- CLOSE the cursor
    CLOSE member_cursor;

    -- Display the report
    SELECT
        member_id    AS 'Member ID',
        name         AS 'Member Name',
        email        AS 'Email',
        join_date    AS 'Join Date'
    FROM member_report_temp;

    -- Cleanup temporary table
    DROP TEMPORARY TABLE member_report_temp;

END$$

DELIMITER ;

-- ============================================================
-- STEP 4: Call the Procedure
-- ============================================================

CALL sp_generate_member_report();
