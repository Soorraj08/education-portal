function loadStudentsData() {
    
    const tbody = document.getElementById("studentsTable");
    if (!tbody) return;

    fetch("/api/students", { cache: "no-store"})
        .then(res => res.json())
        .then(data => {
            tbody.innerHTML = "";

            data.forEach((s, index) => {
                const tr = document.createElement("tr");
                
                tr.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${s.name || ""}</td>
                    <td>${s.rollNumber || ""}</td>
                    <td>${s.email || ""}</td>
                    <td>${s.course || ""}</td>
                    <td>${s.fees || ""}</td>
                    <td>
                        <button class="edit-btn">Edit</button>
                        <button class="delete-btn">Delete</button>
                    </td>
                `;

                tr.dataset.id = s.id;

                tr.querySelector(".edit-btn").onclick = () =>
                    openEditStudent(s);

                tr.querySelector(".delete-btn").onclick = () =>
                    deleteStudent(s.id);

                tbody.appendChild(tr);
            });
        });
}

// ---------- MODAL CONTROL ----------
function openAddStudent() {
    document.getElementById("modalTitle").innerText = "Add Student";
    document.getElementById("studentIdInput").value = "";
    document.getElementById("studentNameInput").value = "";
    document.getElementById("studentRollInput").value = "";
    document.getElementById("studentEmailInput").value = "";
    document.getElementById("studentCourseInput").value = "";
    document.getElementById("studentFeesInput").value = "";
    document.getElementById("studentModal").classList.remove("hidden");
}

function openEditStudent(s) {
    document.getElementById("modalTitle").innerText = "Edit Student";
    document.getElementById("studentIdInput").value = s.id;
    document.getElementById("studentNameInput").value = s.name || "";
    document.getElementById("studentRollInput").value = s.rollNumber || "";
    document.getElementById("studentEmailInput").value = s.email || "";
    document.getElementById("studentCourseInput").value = s.course || "";
    document.getElementById("studentFeesInput").value = s.fees || "";
    document.getElementById("studentModal").classList.remove("hidden");
}

function closeStudentModal() {
    document.getElementById("studentModal").classList.add("hidden");
}

// ---------- SAVE ----------
function saveStudent() {
    const id = document.getElementById("studentIdInput").value;

    const student = {
        name: document.getElementById("studentNameInput").value.trim(),
        rollNumber: document.getElementById("studentRollInput").value.trim(),
        email: document.getElementById("studentEmailInput").value.trim(),
        course: document.getElementById("studentCourseInput").value.trim(),
        fees: document.getElementById("studentFeesInput").value
    };

    if (!confirm(id ? "Update this student?" : "Add this student?")) return;

    const url = id ? `/api/students/${id}` : "/api/students";
    const method = id ? "PUT" : "POST";

    fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student)
    })
    .then(() => {
        closeStudentModal();
        loadStudentsData();
    });
}

// ---------- DELETE (FIXED) ----------
function deleteStudent(id) {
    if (!id) {
        alert("Invalid student id");
        return;
    }

    if (!confirm("Are you sure you want to delete this student?")) return;

    fetch("/api/students/" + id, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => {
        if (!res.ok) {
            return res.text().then(t => {
                console.error("Delete failed:", t);
                throw new Error(t);
            });
        }
    })
    .then(() => {
        loadStudentsData();
    })
    .catch(err => {
        alert("Failed to delete student");
        console.error(err);
    });
}

// ---------- SEARCH ----------
function searchStudents() {
    const query = document.getElementById("studentSearchInput").value.toLowerCase();
    const rows = document.querySelectorAll("#studentsTable tr");

    rows.forEach(row => {
        const text = row.innerText.toLowerCase();
        row.style.display = text.includes(query) ? "" : "none";
    });
}

// 👇 ADD THIS EXACTLY HERE (LAST LINES OF FILE)
window.addEventListener("DOMContentLoaded", () => {
    loadStudentsData();
})