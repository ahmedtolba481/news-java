const Url = "http://localhost:3000/tasks";
function loadTasks() {
  fetch(`${Url}`)
    .then((res) => res.json())
    .then((tasks) => {
      let tableBody = document.getElementById("table");
      tableBody.innerHTML = "";
      tasks.forEach((task) => {
        tableBody.innerHTML += `
          <tr>
            <td>${task.id}</td>
            <td>${task.title}</td>
            <td>${task.description}</td>
            <td>
              <button onclick="deleteTask('${task.id}')" class="btn btn-danger btn-sm">Delete</button>
            </td>
                    <td>
              <button onclick="updateTask('${task.id}')" class="btn btn-success btn-sm">update</button>
            </td>
          </tr>
        `;
      });
    });
}
document.getElementById("submit").addEventListener("click", () => {
  let title = document.getElementById("title").value;
  let description = document.getElementById("description").value;

  fetch(Url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, description }),
  }).then(() => loadTasks());
});

function deleteTask(id) {
  fetch(`${Url}/${id}`, { method: "DELETE" }).then(() => loadTasks());
}
function updateTask(id) {
  let title = document.getElementById("title").value;
  let description = document.getElementById("description").value;

  fetch(`${Url}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, title, description }),
  }).then(() => alert("Task updated successfully"));
}
loadTasks();
