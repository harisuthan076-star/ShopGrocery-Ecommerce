


document.addEventListener("DOMContentLoaded", function () {
    const viewButtons = document.querySelectorAll(".view-order");
    const customerOrder = document.querySelector(".customer-order");
    const orderHead = document.querySelector(".order-head");
    const infoGrid = document.querySelectorAll(".cus-section .info-grid");
    const closeBtn = document.querySelector(".mark-btn-close");

    viewButtons.forEach(button => {
        button.addEventListener("click", function () {
            const orderId = this.dataset.id;
            const name = this.dataset.name;
            const location = this.dataset.location;
            const date = this.dataset.date;

            // Update Order Header
            orderHead.textContent = `Order #${orderId.padStart(3, '0')} Details`;

            // Update Order Info section
            infoGrid[0].querySelector("div:nth-child(1)").innerHTML = `<strong>Order Date:</strong> ${date}`;
            infoGrid[1].querySelector("div:nth-child(1)").innerHTML = `<strong>Name:</strong> ${name}`;
            infoGrid[1].querySelector("div:nth-child(3)").innerHTML = `<strong>Address:</strong> ${location}`;

            // Show the order detail div
            customerOrder.style.display = "block";
        });
    });

    // Close the customer order view
    closeBtn.addEventListener("click", function () {
        customerOrder.style.display = "none";
    });
});



document.addEventListener("DOMContentLoaded", function () {
    const markButtons = document.querySelectorAll(".mark-btn");
    const AcceptButtons = document.querySelectorAll(".mark-btn-accepted");

    markButtons.forEach(button => {
        button.addEventListener("click", function () {
            // Find the closest customer order div
            const orderContainer = button.closest(".order-container");

            // Find the status badge within that order container
            const statusBadge = orderContainer.querySelector(".status-badge");

            // Change the text and styles
            statusBadge.textContent = "Delivered";
            statusBadge.classList.remove("pending");
            statusBadge.classList.add("delivered");
            statusBadge.style.backgroundColor = "rgba(33, 209, 74, 0.781)";
        });
    });
    
    AcceptButtons.forEach(button => {
        button.addEventListener("click", function () {
            // Find the closest customer order div
            const orderContainer = button.closest(".order-container");

            // Find the status badge within that order container
            const statusBadge = orderContainer.querySelector(".status-badge");

            // Change the text and styles
            statusBadge.textContent = "Accepted";
            statusBadge.classList.remove("pending");
            statusBadge.classList.add("accepted");
            statusBadge.style.backgroundColor = "rgba(31, 40, 212, 0.781)";
        });
    });


});

function cancelOrder(button) {
    // Get the parent row of the clicked cancel button
    let row = button.closest('tr');
    
    // Add a class to the row to dim the background
    row.classList.add('cancelled-row');
    
    // Hide the "Confirm" button and show "Cancelled" status
    let confirmButton = row.querySelector('.status.delivered');
    confirmButton.style.display = 'none';
    
    // Show the cancelled status text
    let cancelledButton = row.querySelector('.status.cancelled');
    cancelledButton.textContent = 'Cancelled';
}

// You can also add CSS for the dimmed background



