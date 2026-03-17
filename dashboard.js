// Firestore reference
const db = firebase.firestore();

// Add / Update Student
function addOrUpdateStudent() {
  let roll = document.getElementById("roll").value;
  let name = document.getElementById("name").value;

  // Marks
  let english = parseInt(document.getElementById("english").value);
  let telugu = parseInt(document.getElementById("telugu").value);
  let office = parseInt(document.getElementById("office").value);
  let clanguage = parseInt(document.getElementById("clanguage").value);
  let clab = parseInt(document.getElementById("clab").value);
  let cfundamentals = parseInt(document.getElementById("cfundamentals").value);

  // Validate
  if(!roll || !name || [english,telugu,office,clanguage,clab,cfundamentals].some(isNaN)){
    alert("Please fill all fields correctly");
    return;
  }

  db.collection("students").doc(roll).set({
    name,
    english,
    telugu,
    office,
    clanguage,
    clab,
    cfundamentals
  })
  .then(() => {
    alert("Student added/updated successfully!");
    listStudents();
  })
  .catch(err => alert(err.message));
}

// Delete Student
function deleteStudent(roll) {
  if(confirm("Are you sure you want to delete this student?")) {
    db.collection("students").doc(roll).delete()
      .then(() => {
        alert("Student deleted successfully!");
        listStudents();
      })
      .catch(err => alert(err.message));
  }
}

// List all students
function listStudents() {
  db.collection("students").get().then(snapshot => {
    let html = "<table border='1' cellpadding='5'><tr><th>Roll</th><th>Name</th><th>English</th><th>Telugu/Sanskrit</th><th>Office Automation</th><th>C Language</th><th>C Lab</th><th>Computer Fundamentals Lab</th><th>Actions</th></tr>";
    snapshot.forEach(doc => {
      let d = doc.data();
      html += `<tr>
        <td>${doc.id}</td>
        <td>${d.name}</td>
        <td>${d.english}</td>
        <td>${d.telugu}</td>
        <td>${d.office}</td>
        <td>${d.clanguage}</td>
        <td>${d.clab}</td>
        <td>${d.cfundamentals}</td>
        <td>
          <button onclick="editStudent('${doc.id}')">Edit</button>
          <button onclick="deleteStudent('${doc.id}')">Delete</button>
        </td>
      </tr>`;
    });
    html += "</table>";
    document.getElementById("studentList").innerHTML = html;
  });
}

// Edit Student → populate fields
function editStudent(roll) {
  db.collection("students").doc(roll).get().then(doc => {
    if(doc.exists){
      let d = doc.data();
      document.getElementById("roll").value = doc.id;
      document.getElementById("name").value = d.name;
      document.getElementById("english").value = d.english;
      document.getElementById("telugu").value = d.telugu;
      document.getElementById("office").value = d.office;
      document.getElementById("clanguage").value = d.clanguage;
      document.getElementById("clab").value = d.clab;
      document.getElementById("cfundamentals").value = d.cfundamentals;
    }
  });
}

// Load all students on page load
window.onload = listStudents;
