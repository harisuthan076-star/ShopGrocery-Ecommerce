window.onload = function () {
        loadNotifications();
    };

    function loadNotifications() {
        const container = document.getElementById("notificationsContainer");
        container.innerHTML = ""; // Clear existing content
        const records = JSON.parse(localStorage.getItem("deliveryRecords")) || [];

        records.forEach((record, index) => {
            const bar = document.createElement("div");
            bar.className = "notification-bar";

            bar.innerHTML = `
                <span>✅ New Delivery from ${record.deliveryName}</span>
                <div style="display: flex; gap: 10px;">
                    <button onclick="showCard(${index})">View</button>
                    <button onclick="deleteRecord(${index})" style="background-color:#e74c3c;">Delete</button>
                </div>
            `;
            container.appendChild(bar);
        });
    }

    function showCard(index) {
        const records = JSON.parse(localStorage.getItem("deliveryRecords")) || [];
        const data = records[index];

        document.getElementById("qrDetails").textContent = data.qrData;
        document.getElementById("deliveryName").textContent = data.deliveryName;
        document.getElementById("vehicleNumber").textContent = data.vehicleNumber;
        document.getElementById("deliveryCard").classList.add("active");
    }

    function toggleCard() {
        document.getElementById("deliveryCard").classList.remove("active");
    }

    function deleteRecord(index) {
        let records = JSON.parse(localStorage.getItem("deliveryRecords")) || [];
        if (confirm(`Are you sure you want to delete the record for ${records[index].deliveryName}?`)) {
            records.splice(index, 1);
            localStorage.setItem("deliveryRecords", JSON.stringify(records));
            loadNotifications();
            toggleCard(); // Close the detail card if open
        }
    }