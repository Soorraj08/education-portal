package com.educationalportal;

public class Report {

    private long totalCourses;
    private long totalStudents;
    private long totalEnrollments;
    private long totalRevenue;

    public Report(long totalCourses, long totalStudents, long totalEnrollments, long totalRevenue) {
        this.totalCourses = totalCourses;
        this.totalStudents = totalStudents;
        this.totalEnrollments = totalEnrollments;
        this.totalRevenue = totalRevenue;
    }

    public long getTotalCourses() {
        return totalCourses;
    }

    public long getTotalStudents() {
        return totalStudents;
    }

    public long getTotalEnrollments() {
        return totalEnrollments;
    }

    public long getTotalRevenue() {
        return totalRevenue;
    }
}
