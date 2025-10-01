// ---------------- INVENTORY ----------------
const form = document.getElementById("addItemForm");
const tableBody = document.getElementById("inventoryTable");
const reportBody = document.getElementById("reportTable");

let inventory = JSON.parse(localStorage.getItem("inventory")) || [];

function renderInventory() {
  tableBody.innerHTML = "";
  inventory.forEach((item, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.finish}</td>
      <td>${item.grade}</td>
      <td>${item.size}</td>
      <td>${item.thickness}</td>
      <td>${item.rack}</td>
      <td>${item.shelf}</td>
      <td>
        <button onclick="editItem(${index})">Edit</button>
        <button onclick="deleteItem(${index})">Delete</button>
      </td>`;
    tableBody.appendChild(row);
  });
  renderReport();
}

function saveInventory() {
  localStorage.setItem("inventory", JSON.stringify(inventory));
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const item = {
    finish: document.getElementById("finish").value.trim(),
    grade: document.getElementById("grade").value.trim(),
    size: document.getElementById("size").value.trim(),
    thickness: document.getElementById("thickness").value.trim(),
    rack: document.getElementById("rack").value.trim(),
    shelf: document.getElementById("shelf").value.trim()
  };
  const editIndex = document.getElementById("editIndex").value;
  if (editIndex !== "") {
    inventory[editIndex] = item;
    document.getElementById("editIndex").value = "";
    document.getElementById("cancelEdit").style.display = "none";
  } else {
    inventory.push(item);
  }
  saveInventory();
  renderInventory();
  form.reset();
});

function editItem(index) {
  const item = inventory[index];
  document.getElementById("finish").value = item.finish;
  document.getElementById("grade").value = item.grade;
  document.getElementById("size").value = item.size;
  document.getElementById("thickness").value = item.thickness;
  document.getElementById("rack").value = item.rack;
  document.getElementById("shelf").value = item.shelf;
  document.getElementById("editIndex").value = index;
  document.getElementById("cancelEdit").style.display = "inline-block";
}

function cancelEdit() {
  form.reset();
  document.getElementById("editIndex").value = "";
  document.getElementById("cancelEdit").style.display = "none";
}

function deleteItem(index) {
  inventory.splice(index, 1);
  saveInventory();
  renderInventory();
}

function renderReport() {
  reportBody.innerHTML = "";
  inventory.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.finish}</td>
      <td>${item.grade}</td>
      <td>${item.size}</td>
      <td>${item.thickness}</td>
      <td>${item.rack}</td>
      <td>${item.shelf}</td>`;
    reportBody.appendChild(row);
  });
}

function exportExcel() {
  const ws = XLSX.utils.json_to_sheet(inventory);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Inventory Report");
  XLSX.writeFile(wb, "inventory_report.xlsx");
}

function showSection(sectionId) {
  document.getElementById("dashboard").style.display = "none";
  document.getElementById("reports").style.display = "none";
  document.getElementById(sectionId).style.display = "block";
}

// Init
renderInventory();
showSection("dashboard");
