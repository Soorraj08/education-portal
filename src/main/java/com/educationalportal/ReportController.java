package com.educationalportal;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin
public class ReportController {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private EnrollmentRepository enrollmentRepository;

        @GetMapping("/revenue-by-course")
public Object getRevenueByCourse() {
    return courseRepository.getRevenueByCourse();
}
    @GetMapping("/summary")
    public Map<String, Object> getSummary() {

        Map<String, Object> summary = new HashMap<>();

        summary.put("totalCourses", courseRepository.countActiveCourses());
        summary.put("totalStudents", studentRepository.count());
        summary.put("totalEnrollments", enrollmentRepository.count());
        summary.put("totalRevenue", courseRepository.getTotalRevenue());

        Double totalRevenue = enrollmentRepository.getTotalRevenue();
        summary.put("totalRevenue", totalRevenue);
        return summary;
    }

}

