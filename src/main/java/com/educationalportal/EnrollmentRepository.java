package com.educationalportal;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {

    @Query("SELECT COALESCE(SUM(e.course.fee), 0) FROM Enrollment e")
    Double getTotalRevenue();
}
