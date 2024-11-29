// 1- Selecting the Button element
var SubmitBtn = document.getElementById("SubmitBtn");

// 2- Creating an array to store bookmarks
var bookmarks = [];

// 3- Listening to the button click
SubmitBtn.addEventListener("click", function (event) {
  // 4- Prevent form from default submitting
  event.preventDefault();

  // 5- Targeting the name and the URL element's values
  var webName = document.getElementById("name").value;
  var webUrl = document.getElementById("url").value;

  // 6- Ensure the URL starts with http:// or https://
  if (!webUrl.startsWith("http://") && !webUrl.startsWith("https://")) {
    webUrl = "https://" + webUrl; // Default to https:// if not provided
  }

  // 7- Creating the object that contains the name and URL as attributes
  var bookMarkObject = {
    name: webName,
    url: webUrl,
  };

  // 8- Push the new object to the array
  bookmarks.push(bookMarkObject);

  // 9- Save the array to localStorage
  localStorage.setItem("bookMarks", JSON.stringify(bookmarks));

  // 10- Call displayBookmarks to update the table
  displayBookmarks();

  // 11- Clear input fields after adding the bookmark
  document.getElementById("name").value = "";
  document.getElementById("url").value = "";
});

// 12- Creating the function that will display the output
function displayBookmarks() {
  var tableBody = document.getElementById("tbody"); // Targeting tbody on HTML
  tableBody.innerHTML = ""; // Clearing the table body before adding new data

  // Fetching the saved bookmarks from localStorage
  var savedBookmarks = localStorage.getItem("bookMarks");

  // If there are saved bookmarks, parse them into the array
  if (savedBookmarks !== null) {
    bookmarks = JSON.parse(savedBookmarks);
  }

  // Loop through each bookmark and display it in the table
  bookmarks.forEach((bookmark, index) => {
    var row = document.createElement("tr"); // Create table row
    var nameCell = document.createElement("td"); // Create table cell for name
    var urlCell = document.createElement("td"); // Create table cell for URL
    var actionCell = document.createElement("td"); // Create cell for delete button

    nameCell.textContent = bookmark.name; // Add name to the cell

    // Create a link element for the URL
    var link = document.createElement("a");
    link.href = bookmark.url; // Set the URL
    link.textContent = bookmark.url; // Set the display text to the URL
    link.target = "_blank"; // Open the link in a new tab
    urlCell.appendChild(link); // Append the link to the URL cell

    // Create a delete button with a bin icon
    var deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn-danger btn-sm";
    deleteBtn.innerHTML = '<i class="bi bi-trash"></i>'; // Bin icon from Bootstrap Icons
    deleteBtn.addEventListener("click", function () {
      deleteBookmark(index); // Call deleteBookmark with the index of the row
    });
    actionCell.appendChild(deleteBtn); // Add delete button to the action cell

    // Append cells to the row
    row.appendChild(nameCell);
    row.appendChild(urlCell);
    row.appendChild(actionCell);

    // Append the row to the table body
    tableBody.appendChild(row);
  });
}

// 13- Function to delete a specific bookmark
function deleteBookmark(index) {
  bookmarks.splice(index, 1); // Remove the bookmark at the given index
  localStorage.setItem("bookMarks", JSON.stringify(bookmarks)); // Update localStorage
  displayBookmarks(); // Refresh the displayed table
}

// 14- Clear all bookmarks functionality
var clearBtn = document.getElementById("clear");
clearBtn.addEventListener("click", function () {
  localStorage.clear(); // Clear all items from localStorage
  bookmarks = []; // Reset the bookmarks array
  displayBookmarks(); // Refresh the displayed table
});

// 15- Call displayBookmarks on page load to display any saved bookmarks
window.onload = displayBookmarks;
