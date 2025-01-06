const noteInput = document.getElementById("note-input");
const addNoteBtn = document.getElementById("add-note-btn");
const notesList = document.getElementById("notes-list");
const statusFilter = document.getElementById("status-filter");

function createNoteElement(noteText, timestamp) {
    const noteItem = document.createElement("li");
    noteItem.classList.add("note-item", "on-hold");

    // Note content
    const noteContent = document.createElement("div");
    noteContent.innerHTML = `
        <p>${noteText}</p>
        <span class="note-date">${timestamp}</span>
    `;

    // Status dropdown
    const statusDropdown = document.createElement("select");
    statusDropdown.innerHTML = `
        <option value="on-hold">On Hold</option>
        <option value="in-process">In Process</option>
        <option value="done">Done</option>
    `;
    statusDropdown.addEventListener("change", (e) => {
        noteItem.className = `note-item ${e.target.value}`;
    });

    // Append content and dropdown
    noteItem.appendChild(noteContent);
    noteItem.appendChild(statusDropdown);

    return noteItem;
}

addNoteBtn.addEventListener("click", () => {
    const noteText = noteInput.value.trim();
    if (!noteText) return alert("Please enter a note.");

    const timestamp = new Date().toLocaleString();
    const noteElement = createNoteElement(noteText, timestamp);
    notesList.appendChild(noteElement);
    noteInput.value = "";
});

statusFilter.addEventListener("change", () => {
    const selectedStatus = statusFilter.value;
    const notes = document.querySelectorAll(".note-item");

    notes.forEach((note) => {
        if (selectedStatus === "all" || note.classList.contains(selectedStatus)) {
            note.style.display = "flex";
        } else {
            note.style.display = "none";
        }
    });
});
