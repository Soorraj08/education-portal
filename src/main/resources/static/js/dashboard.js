function hideAllSections() {
  const sections = [
    "dashboardSection",
    "studentsSection",
    "coursesSection",
    "enrollmentsSection",
    "reportsSection"
  ];

  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = "none";
  });
}

function showDashboard() {
  hideAllSections();
  const el = document.getElementById("dashboardSection");
  if (el) el.style.display = "block";
  loadDashboardCounts();
}

function showStudents() {
  hideAllSections();
  const el = document.getElementById("studentsSection");
  if (el) {
    el.style.display = "block";
    if (typeof loadStudentsData === "function") {
      loadStudentsData();
    }
  }
}

function showCourses() {
  hideAllSections();
  const el = document.getElementById("coursesSection");
  if (el) el.style.display = "block";
  loadCourses();
}

function showEnrollments() {
    hideAllSections();

    const el = document.getElementById("enrollmentsSection");
    if (el) el.style.display = "block";

    loadEnrollmentsSection();
}

// ADD THIS JUST BELOW (or anywhere in dashboard.js)
function loadEnrollmentsSection() {
    loadStudentsForEnrollment();
    loadCoursesForEnrollment();
    loadEnrollmentsTable();
}

function showReports() {
    hideAllSections();
    const el = document.getElementById("reportsSection");
        el.style.display = "block";
        setTimeout(() => {
          loadReports();// ensure visible before drawing charts
    }, 100);
}


function logout() {
  if (confirm("Do you want to logout")){
    window.location.href = "/login.html";
  }
}

// Show dashboard by default on page load
window.addEventListener("DOMContentLoaded", () => {
  showDashboard();
});

function loadDashboardCounts() {
  fetch('/api/reports/summary')
    .then(res => res.json())
    .then(data => {
      const ds = document.getElementById("dashboardSection");
      if (!ds) return;

      ds.querySelector("#totalStudents").innerText = data.totalStudents;
      ds.querySelector("#totalCourses").innerText = data.totalCourses;
      ds.querySelector("#totalEnrollments").innerText = data.totalEnrollments;
      ds.querySelector("#totalRevenue").innerText = "₹ " + data.totalRevenue;
    });
}
