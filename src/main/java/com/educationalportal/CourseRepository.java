package com.educationalportal;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {


    @Query("SELECT SUM(c.fee) FROM Course c WHERE c.active = true")
    Double getTotalRevenue();

    List<Course> findByActiveTrue();

    @Query("SELECT COUNT(c) FROM Course c WHERE c.active = true")
Long countActiveCourses();

 
    @Query("""
    SELECT c.name, COALESCE(SUM(e.course.fee), 0)
    FROM Enrollment e
    JOIN e.course c
    GROUP BY c.name
""")
List<Object[]> getRevenueByCourse();

}
