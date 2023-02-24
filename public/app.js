document.addEventListener("click", (event) => {
  const dataset = event.target?.dataset;
  if (!dataset) return;

  const id = dataset?.id;
  if (!id) return;

  if (dataset.type === "remove") {
    remove(id).then(() => {
      event.target.closest("li").remove();
    });
  }

  if (dataset.type === "edit") {
    const parent = event.target.closest("li");
    const titleHTML = parent?.querySelector(".note-title");
    if (!titleHTML) return;

    const currentTitle = titleHTML.textContent.trim();
    const newTitle = prompt("Input new value", currentTitle);
    if (newTitle === null) return; // if Cancel button pressed

    edit(id, newTitle).then(() => {
      titleHTML.textContent = newTitle;
    });
  }
});

async function remove(id) {
  await fetch(`/${id}`, { method: "DELETE" });
}

async function edit(id, newTitle) {
  await fetch(`/${id}/edit`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({ title: newTitle }),
  });
}
