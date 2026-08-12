let sidebar = document.querySelector(".sidebar");
let sidebarBtn = document.querySelector(".sidebarBtn");
sidebarBtn.onclick = function () {
  sidebar.classList.toggle("active");
  if (sidebar.classList.contains("active")) {
    sidebarBtn.classList.replace("bx-menu", "bx-menu-alt-right");
  } else
    sidebarBtn.classList.replace("bx-menu-alt-right", "bx-menu");
}

function logout() {
  const confirmed = confirm("Are you sure you want to log out?");
  if (confirmed) {
    window.location.href = "index.html";
  } else {
    return false;
  }
}

const shopName = "Food City"; // change based on the shop
const notifications = JSON.parse(localStorage.getItem("shopNotifications") || "{}");

if (notifications[shopName]) {
    alert(`New shopper entered for ${shopName}!`);
    // Optionally clear the notification
    delete notifications[shopName];
    localStorage.setItem("shopNotifications", JSON.stringify(notifications));
}

// filtering content

function filterSales(status) {
    const dateItems = document.querySelectorAll(".sales-details ul:nth-child(1) li:not(.topic)");
    const customerItems = document.querySelectorAll(".sales-details ul:nth-child(2) li:not(.topic)");
    const statusItems = document.querySelectorAll("#sales-details li:not(.topic)");
    const totalItems = document.querySelectorAll(".sales-details ul:nth-child(4) li:not(.topic)");

    for (let i = 0; i < statusItems.length; i++) {
      const itemStatus = statusItems[i].querySelector('a').classList.contains(status);
      const show = status === "all" || itemStatus;

      dateItems[i].style.display = show ? "list-item" : "none";
      customerItems[i].style.display = show ? "list-item" : "none";
      statusItems[i].style.display = show ? "list-item" : "none";
      totalItems[i].style.display = show ? "list-item" : "none";
  }
}