function generateQR(event) {
    event.preventDefault(); // prevent form submit

    // collect inputs
    const fullName = document.getElementById('fullname').value;
    const email = document.getElementById('email').value;
    const Contact = document.getElementById('contact').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const district = document.getElementById('district').value;
    const zip = document.getElementById('zip').value;
    const cardname = document.getElementById('cardname').value;
    const delivery = document.getElementById('Deli-opti').value;
    

    const qrText = `Full Name: ${fullName}
Email: ${email}
Contact: ${Contact}
Address: ${address}
City: ${city}
District: ${district}
Zip: ${zip}
Card Name: ${cardname}
Delivery Option: ${delivery}`;

    // clear old qr code
    document.getElementById("qrcode").innerHTML = "";

    // create new qr code
    const qrcode = new QRCode(document.getElementById("qrcode"), {
        text: qrText,
        width: 180,
        height: 180,
    });

    // show popup
    document.getElementById("qrPopup").style.display = "flex";

    // Set blink start time (10 seconds from now)
    const triggerTime = Date.now() + 10000; // 10 seconds later
    localStorage.setItem("deliveredBlinkStart", triggerTime.toString());
}

function closeQRPopup() {
  document.getElementById("qrPopup").style.display = "none";
  document.getElementById("payment").style.display = "none"; // Hides the payment section too

  // Save the current timestamp
  localStorage.setItem("deliveryConfirmedTime", Date.now().toString());
}



function downloadQRImage() {
    const canvas = document.querySelector("#qrcode canvas");
    const image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");

    const a = document.createElement('a');
    a.href = image;
    a.download = 'payment_qr.png';
    a.click();
}

async function downloadQRPdf() {
    const canvas = document.querySelector("#qrcode canvas");
    const imgData = canvas.toDataURL("image/png");

    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();
    pdf.text("Payment QR Code", 10, 10);
    pdf.addImage(imgData, 'PNG', 10, 20, 100, 100);
    pdf.save("payment_qr.pdf");
}

function closeQRPopup() {
  document.getElementById("qrPopup").style.display = "none";
  document.getElementById("payment").style.display = "none"; // Hides the payment section too
}