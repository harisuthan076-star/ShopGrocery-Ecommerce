function processQR() {
  const fileInput = document.getElementById("qrImage");
  const deliveryName = document.getElementById("deliveryName").value;
  const vehicleNumber = document.getElementById("vehicleNumber").value;

  if (!fileInput.files[0] || !deliveryName || !vehicleNumber) {
    alert("Please fill all fields and upload a QR image.");
    return;
  }

  const file = fileInput.files[0];
  const reader = new FileReader();

  reader.onload = function () {
    const img = new Image();
    img.onload = function () {
      const canvas = document.getElementById("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const qrCode = jsQR(imageData.data, canvas.width, canvas.height);

      if (qrCode) {
        const qrData = qrCode.data;

        // Retrieve existing deliveries or initialize array
        let deliveries = JSON.parse(localStorage.getItem("deliveryRecords")) || [];

        // Add new delivery to the list
        deliveries.push({
          qrData,
          deliveryName,
          vehicleNumber,
          timestamp: new Date().toISOString()
        });

        // Save updated array back to localStorage
        localStorage.setItem("deliveryRecords", JSON.stringify(deliveries));

        alert("Delivery recorded successfully.");
        
      } else {
        alert("QR code not detected. Please upload a clear image.");
      }
    };
    img.src = reader.result;
  };

  reader.readAsDataURL(file); 

  
}

// deliveryguy.js

function processQR() {
  // Store delivery data (you may already have this logic)
  const name = document.getElementById('deliveryName').value;
  const vehicle = document.getElementById('vehicleNumber').value;
  
  // Optional: Save data if needed
  localStorage.setItem('deliveryGuyName', name);
  localStorage.setItem('vehicleNumber', vehicle);

  // Set trigger flag for blinking
  localStorage.setItem('startDeliveredBlink', 'true');

  // Redirect to tracking page
  alert("Delivered Successfully");
}





/* to capture the QR code directly and confirm delivered*/
let videoStream; // Global variable to stop the stream later

function startCamera() {
  const deliveryName = document.getElementById("deliveryName").value;
  const vehicleNumber = document.getElementById("vehicleNumber").value;

  if (!deliveryName || !vehicleNumber) {
    alert("Please fill in name and vehicle number before scanning.");
    return;
  }

  const video = document.getElementById("video");
  video.style.display = "block";

  navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
    .then((stream) => {
      videoStream = stream;
      video.srcObject = stream;

      const canvas = document.getElementById("canvas");
      const ctx = canvas.getContext("2d");

      const scanInterval = setInterval(() => {
        if (video.readyState === video.HAVE_ENOUGH_DATA) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const qrCode = jsQR(imageData.data, canvas.width, canvas.height);

          if (qrCode) {
            clearInterval(scanInterval);
            stopCamera();
            saveDelivery(qrCode.data, deliveryName, vehicleNumber);
          }
        }
      }, 500);
    })
    .catch((err) => {
      alert("Could not access the camera. Please allow permission.");
      console.error(err);
    });
}

function stopCamera() {
  const video = document.getElementById("video");
  video.style.display = "none";
  if (videoStream) {
    videoStream.getTracks().forEach(track => track.stop());
  }
}

function saveDelivery(qrData, deliveryName, vehicleNumber) {
  let deliveries = JSON.parse(localStorage.getItem("deliveryRecords")) || [];

  deliveries.push({
    qrData,
    deliveryName,
    vehicleNumber,
    timestamp: new Date().toISOString()
  });

  localStorage.setItem("deliveryRecords", JSON.stringify(deliveries));

  // Set flag for blinking
  localStorage.setItem("startDeliveredBlink", "true");

  alert("QR code Scanned Successfully , Notification sent.");
  
}
