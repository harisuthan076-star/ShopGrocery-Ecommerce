// Simulated delivery guy data — replace with localStorage if needed
document.getElementById("trackPhoto").src = localStorage.getItem("deliveryPhoto") || "https://via.placeholder.com/100";
document.getElementById("trackName").textContent = localStorage.getItem("deliveryName") || "John Doe";
document.getElementById("trackVehicleNumber").textContent = localStorage.getItem("vehicleNumber") || "KA-03-XY-1234";
document.getElementById("trackVehicleType").textContent = localStorage.getItem("vehicleType") || "Bike";
document.getElementById("trackPhone").textContent = localStorage.getItem("deliveryPhone") || "+94 76 123 4567";

// Geolocation Tracker
if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            document.getElementById("geoLocation").textContent = `Latitude: ${latitude.toFixed(5)}, Longitude: ${longitude.toFixed(5)}`;
        },
        () => {
            document.getElementById("geoLocation").textContent = "Unable to retrieve location.";
        }
    );
} else {
    document.getElementById("geoLocation").textContent = "Geolocation not supported.";
}

const details = JSON.parse(localStorage.getItem("deliveryDetails"));

if (details) {
    document.getElementById("trackPhoto").src = details.photo || "https://via.placeholder.com/100";
    document.getElementById("ordernumber").textContent = details.orderNumber || "N/A";
    document.getElementById("trackName").textContent = details.name || "N/A";
    document.getElementById("trackVehicleNumber").textContent = details.vehicleNumber || "N/A";
    document.getElementById("trackVehicleType").textContent = details.vehicleType || "N/A";
    document.getElementById("DeliveryType").textContent = details.deliveryType || "N/A";
} else {
    document.querySelector(".delivery-details").innerHTML = "<p style='text-align:center;'>No delivery details available.</p>";
}


function removeDeliveryDetails() {
  // Remove the entire detail card from the DOM
  const card = document.getElementById("detailCard");
  if (card) {
    card.remove(); // Remove the card element
  }

  // Remove saved delivery data from localStorage
  localStorage.removeItem("deliveryRecords");

  alert("Delivery details removed.");
}


