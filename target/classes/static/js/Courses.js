function loadCourses() {
  fetch("/api/courses")
    .then(res => res.json())
    .then(data => {
      const tbody = document.getElementById("coursesTable");
      tbody.innerHTML = "";

      data.forEach((c, i) => {
        const safeName = c.name.replace(/'/g, "\\'");
        const safeDuration = c.duration.replace(/'/g, "\\'");

        tbody.innerHTML += `
          <tr>
            <td>${i + 1}</td>
            <td>${c.name}</td>
            <td>${c.duration}</td>
            <td>${c.fee}</td>
            <td>
              <button class="btn-edit" onclick="openEditCourse(${c.id}, '${safeName}', '${safeDuration}', ${c.fee})">Edit</button>
              <button class="btn-delete" onclick="deleteCourse(${c.id})">Delete</button>
            </td>
          </tr>
        `;
      });
    });
}

// ---------- MODAL CONTROL ----------
function openAddCourse() {
  document.getElementById("courseModalTitle").innerText = "Add Course";
  document.getElementById("courseIdInput").value = "";
  document.getElementById("courseNameInput").value = "";
  document.getElementById("courseDurationInput").value = "";
  document.getElementById("courseFeeInput").value = "";
  document.getElementById("courseModal").classList.remove("hidden");
}

function openEditCourse(id, name, duration, fee) {
  document.getElementById("courseModalTitle").innerText = "Edit Course";
  document.getElementById("courseIdInput").value = id;
  document.getElementById("courseNameInput").value = name;
  document.getElementById("courseDurationInput").value = duration;
  document.getElementById("courseFeeInput").value = fee;
  document.getElementById("courseModal").classList.remove("hidden");
}

function closeCourseModal() {
  document.getElementById("courseModal").classList.add("hidden");
}

// ---------- SAVE ----------
function saveCourse() {
  const id = document.getElementById("courseIdInput").value;

  const course = {
    name: document.getElementById("courseNameInput").value,
    duration: document.getElementById("courseDurationInput").value,
    fee: document.getElementById("courseFeeInput").value
  };

  if (!confirm(id ? "Update this course?" : "Add this course?")) return;

  if (id) {
    fetch(`/api/courses/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(course)
    }).then(() => {
      closeCourseModal();
      loadCourses();
    });
  } else {
    fetch("/api/courses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(course)
    }).then(() => {
      closeCourseModal();
      loadCourses();
    });
  }
}

// ---------- DELETE ----------
function deleteCourse(id) {
  if (!confirm("Do you want to delete this course?")) return;

  fetch(`/api/courses/${id}`, {
    method: "DELETE"
  }).then(() => loadCourses());
}

document.addEventListener("DOMContentLoaded", () => {
  loadCourses();
});

