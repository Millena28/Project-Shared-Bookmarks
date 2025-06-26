// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getUserIds, getData, setData , clearData} from "./storage.js";

// getUserIds().forEach(id => clearData(id));


const userSelect = document.getElementById("user-select");
const bookmarkList = document.getElementById("bookmark-list");
const form = document.getElementById("bookmark-form");
let currentUser = null;

// Load dropdown
function populateUserDropdown() {
  const userIds = getUserIds();
  userIds.forEach(id => {
    const option = document.createElement("option");
    option.value = id;
    option.textContent = `User ${id}`;
    userSelect.appendChild(option);
  });
}

// Showing bookmarks
function displayBookmarks(bookmarks) {
  bookmarkList.innerHTML = ""; // Clear

  if (!bookmarks || bookmarks.length === 0) {
    bookmarkList.textContent = "No bookmarks for this user.";
    return;
  }

  const list = document.createElement("ul");

  // Reverse chronological
  bookmarks
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .forEach(bookmark => {
      const item = document.createElement("li");
      const link = document.createElement("a");
      link.href = bookmark.url;
      link.target = "_blank";
      link.textContent = bookmark.title;

      const desc = document.createElement("p");
      desc.textContent = bookmark.description;

      const time = document.createElement("small");
      time.textContent = new Date(bookmark.createdAt).toLocaleString();

      item.appendChild(link);
      item.appendChild(desc);
      item.appendChild(time);
      list.appendChild(item);
    });

  bookmarkList.appendChild(list);
}

// Handles user change
userSelect.addEventListener("change", () => {
  currentUser = userSelect.value;
  const data = getData(currentUser);
  displayBookmarks(data);
});

// Handle form submit
form.addEventListener("submit", e => {
  e.preventDefault();
  if (!currentUser) {
    alert("Please select a user first.");
    return;
  }

  const url = document.getElementById("url").value.trim();
  const title = document.getElementById("title").value.trim();
  const description = document.getElementById("description").value.trim();

  const newBookmark = {
    url,
    title,
    description,
    createdAt: new Date().toISOString()
  };

  const existing = getData(currentUser) || [];
  const updated = [newBookmark, ...existing];

  setData(currentUser, updated);
  displayBookmarks(updated);
  form.reset();
});

// Starts the populating the book marks
populateUserDropdown();

// Clear bookmarks for current user
const clearButton = document.getElementById("clear-bookmarks");

clearButton.addEventListener("click", () => {
  if (!currentUser) {
    alert("Please select a user first.");
    return;
  }

  const confirmClear = confirm("Are you sure you want to clear all bookmarks for this user?");
  if (!confirmClear) return;

  clearData(currentUser);
  displayBookmarks([]);
});
