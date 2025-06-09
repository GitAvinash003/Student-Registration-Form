const form = document.getElementById('student-form');
const tableBody = document.querySelector('#student-table tbody');
let students = JSON.parse(localStorage.getItem('students')) || [];

// Render the student table
function renderTable() {
  tableBody.innerHTML = '';
  students.forEach((student, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${student.name}</td>
      <td>${student.id}</td>
      <td>${student.email}</td>
      <td>${student.contact}</td>
      <td class="actions">
        <button onclick="editStudent(${index})">Edit</button>
        <button onclick="deleteStudent(${index})">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

//Form validation
function validateInputs(name, id, email, contact) {
  const nameRegex = /^[A-Za-z\s]+$/;
  const idRegex = /^[0-9]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const contactRegex = /^[0-9]{10}$/;

  return nameRegex.test(name) &&
         idRegex.test(id) &&
         emailRegex.test(email) &&
         contactRegex.test(contact);
}

//Event listener for form submission
form.addEventListener('submit', function(e) {
  // Prevent default form submission refresh
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const id = document.getElementById('studentId').value.trim();
  const email = document.getElementById('email').value.trim();
  const contact = document.getElementById('contact').value.trim();

  if (!name || !id || !email || !contact) return alert('Please fill all fields!');
  if (!validateInputs(name, id, email, contact)) return alert('Invalid input format!');

  //local storage code push
  students.push({ name, id, email, contact });
  localStorage.setItem('students', JSON.stringify(students));
  form.reset();
  renderTable();
});

//Edit Student function
window.editStudent = function(index) {
  const student = students[index];
  document.getElementById('name').value = student.name;
  document.getElementById('studentId').value = student.id;
  document.getElementById('email').value = student.email;
  document.getElementById('contact').value = student.contact;
  
  students.splice(index, 1); // Remove old data
  renderTable();
}

//Delete Student function
window.deleteStudent = function(index) {
  if (confirm('Are you sure to delete this student?')) {
    students.splice(index, 1);
    localStorage.setItem('students', JSON.stringify(students));
    renderTable();
    
  }
}

renderTable(); // Initial rendering
