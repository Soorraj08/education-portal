function loadEnrollmentsSection() {
    loadStudentsForEnroll();
    loadCoursesForEnroll();
    loadEnrollmentsTable();
}

// Load students into dropdown
function loadStudentsForEnroll() {
    fetch("/api/students")
        .then(r => r.json())
        .then(data => {
            const sel = document.getElementById("studentSelect");
            sel.innerHTML = "";
            data.forEach(s => {
                sel.innerHTML += `<option value="${s.id}">${s.name}</option>`;
            });
        });
}

// Load courses into dropdown
function loadCoursesForEnroll() {
    fetch("/api/courses")
        .then(r => r.json())
        .then(data => {
            const sel = document.getElementById("courseSelect");
            sel.innerHTML = "";
            data.forEach(c => {
                sel.innerHTML += `<option value="${c.id}">${c.name}</option>`;
            });
        });
}

// Enroll student
function enrollStudent() {
    const studentId = document.getElementById("studentSelect").value;
    const courseId = document.getElementById("courseSelect").value;

    fetch(`/api/enrollments?studentId=${studentId}&courseId=${courseId}`, {
        method: "POST"
    }).then(() => loadEnrollmentsTable());
}

// Load enrollments table (S.No flows 1,2,3… always)
function loadEnrollmentsTable() {
    fetch("/api/enrollments")
        .then(res => res.json())
        .then(data => {
            const tbody = document.getElementById("enrollmentsTable");
            tbody.innerHTML = "";

            data.forEach((e, i) => {
                const studentName = e.student ? e.student.name : "";
                const courseName = e.course ? e.course.name : "";
                const date = e.enrollDate ? e.enrollDate : "";

                tbody.innerHTML += `
                  <tr>
                    <td>${i + 1}</td>
                    <td>${studentName}</td>
                    <td>${courseName}</td>
                    <td>${date}</td>
                    <td>
                      <button class="btn-delete" onclick="deleteEnrollment(${e.id})">Delete</button>
                    </td>
                  </tr>
                `;
            });
        })
        .catch(err => console.error(err));
}

// Delete enrollment
function deleteEnrollment(id) {
    if (confirm("Delete this enrollment?")) {
        fetch(`/api/enrollments/${id}`, { method: "DELETE" })
            .then(() => loadEnrollmentsTable());
    }
}
