const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const captureBtn = document.getElementById("captureBtn");
const photoPreview = document.getElementById("photoPreview");

// Start camera
navigator.mediaDevices.getUserMedia({ video: true })
    .then((stream) => {
        video.srcObject = stream;
    })
    .catch(() => alert("Camera access denied or not available."));

let capturedImage = null;

// Capture photo
captureBtn.addEventListener("click", () => {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0);
    capturedImage = canvas.toDataURL("image/png");
    photoPreview.src = capturedImage;
    photoPreview.style.display = "block";
});

// Submit and store in localStorage
document.getElementById("deliveryForm").addEventListener("submit", (e) => {
    e.preventDefault();

    if (!capturedImage) {
        alert("Please capture the photo before submitting.");
        return;
    }

    const data = {
        orderNumber: document.getElementById("orderNumber").value,
        name: document.getElementById("name").value,
        vehicleNumber: document.getElementById("vehicleNumber").value,
        vehicleType: document.getElementById("vehicleType").value,
        deliveryType: document.getElementById("deliveryType").value,
        photo: capturedImage,
    };

    localStorage.setItem("deliveryDetails", JSON.stringify(data));
    alert("Delivery details sent to the customer.");
    document.getElementById("deliveryForm").reset();
    photoPreview.style.display = "none";
});