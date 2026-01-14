package com.educationalportal;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;

public interface ReportRepository extends Repository<Course, Long> {

    @Query(value = "SELECT COUNT(*) FROM courses", nativeQuery = true)
    long totalCourses();

    @Query(value = "SELECT COUNT(*) FROM students", nativeQuery = true)
    long totalStudents();

    @Query(value = "SELECT COUNT(*) FROM enrollments", nativeQuery = true)
    long totalEnrollments();

    @Query(value = """
                SELECT COALESCE(SUM(c.fee), 0)
                FROM enrollments e
                JOIN courses c ON e.course_id = c.id
            """, nativeQuery = true)
    long totalRevenue();
}
