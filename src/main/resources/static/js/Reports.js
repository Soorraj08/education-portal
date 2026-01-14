let barChartInstance = null;
let pieChartInstance = null;

function loadReports() {
  const reportSection = document.getElementById('reportsSection');

  // Ensure section is visible before drawing charts
  reportSection.style.display = "block";

  // Load summary
  fetch('/api/reports/summary')
    .then(res => res.json())
    .then(data => {

      reportSection.querySelector('#totalCourses').innerText = data.totalCourses;
      reportSection.querySelector('#totalStudents').innerText = data.totalStudents;
      reportSection.querySelector('#totalEnrollments').innerText = data.totalEnrollments;
      reportSection.querySelector('#totalRevenue').innerText = '₹ ' + data.totalRevenue;

      if (barChartInstance) barChartInstance.destroy();

      const barCtx = document.getElementById('barChart').getContext('2d');

      barChartInstance = new Chart(barCtx, {
        type: 'bar',
        data: {
          labels: ['Courses', 'Students', 'Enrollments'],
          datasets: [{
            label: 'Count',
            data: [
              data.totalCourses,
              data.totalStudents,
              data.totalEnrollments
            ],
            backgroundColor: ['#6366f1', '#22c55e', '#f97316']
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      });
    });

  // Load revenue-by-course for pie chart
  fetch('/api/reports/revenue-by-course')
    .then(r => r.json())
    .then(revData => {

      const labels = revData.map(r => r[0]);
      const values = revData.map(r => r[1]);

      if (pieChartInstance) pieChartInstance.destroy();

      const pieCanvas = document.getElementById('pieChart');
      const pieCtx = pieCanvas.getContext('2d');

      pieChartInstance = new Chart(pieCtx, {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [{
            data: values,
            backgroundColor: [
              '#0ea5e9', '#a855f7', '#10b981',
              '#f59e0b', '#ef4444', '#14b8a6'
            ]
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom'
            }
          }
        }
      });
    });
}

function downloadReportPDF() {
  window.print();
}
