package com.educationalportal;

import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/api/courses")
@CrossOrigin
public class CourseController {

    private final CourseRepository repo;

    public CourseController(CourseRepository repo) {
        this.repo = repo;
    }

    // GET ACTIVE COURSES
    @GetMapping
    public List<Course> getAllCourses() {
        return repo.findByActiveTrue();
    }

    // ADD
    @PostMapping
    public Course add(@RequestBody Course course) {
        course.setActive(true);   // ensure new course is active
        return repo.save(course);
    }

    // UPDATE
    @PutMapping("/{id}")
    public Course update(@PathVariable Long id, @RequestBody Course course) {
        Course c = repo.findById(id).orElseThrow();
        c.setName(course.getName());
        c.setDuration(course.getDuration());
        c.setFee(course.getFee());
        return repo.save(c);
    }

    // SOFT DELETE
    @DeleteMapping("/{id}")
    public void deleteCourse(@PathVariable Long id) {
        Course c = repo.findById(id)
            .orElseThrow(() -> new RuntimeException("Course not found"));
        c.setActive(false);
        repo.save(c);
    }
}
