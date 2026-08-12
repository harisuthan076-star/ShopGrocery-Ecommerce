// Elements
const cartToggleBtn = document.getElementById('cartToggleBtn');
const cartPanel = document.getElementById('cartPanel');
const closeCartBtn = document.getElementById('closeCartBtn');
const cartItemsContainer = document.getElementById('cartItems');
const generateBillBtn = document.getElementById('generateBillBtn');
const billOutput = document.getElementById('billOutput');
const cartCount = document.getElementById('cart-count');

let cart = [];

// Toggle cart visibility
function toggleCart() {
  cartPanel.classList.toggle('show');
}
cartToggleBtn.addEventListener('click', toggleCart);
closeCartBtn.addEventListener('click', toggleCart);

// Toggle compare prices view
document.querySelectorAll('.compare-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const productEl = btn.closest('.product');
    const compareView = productEl.querySelector('.compare-view');
    compareView.classList.toggle('hidden');
  });
});

// Add to cart handler
document.querySelectorAll('.add-cart-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const li = e.target.closest('li');
    const shop = li.getAttribute('data-shop');
    const price = parseFloat(li.getAttribute('data-price'));
    const productEl = e.target.closest('.product');
    const productId = productEl.getAttribute('data-id');
    const productName = productEl.getAttribute('data-name');
    const productImage = productEl.getAttribute('data-image');

    // Check if same product + shop exists in cart
    const existingIndex = cart.findIndex(item => item.productId === productId && item.shop === shop);

    if (existingIndex > -1) {
      cart[existingIndex].quantity++;
    } else {
      cart.push({
        productId,
        productName,
        shop,
        price,
        quantity: 1,
        image: productImage,
      });
    }
    updateCartUI();
  });
});

// Update cart UI
function updateCartUI() {
  // Update cart count badge
  cartCount.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);

  if (cart.length === 0) {
    cartItemsContainer.textContent = 'Your cart is empty.';
    generateBillBtn.disabled = true;
    billOutput.textContent = '';
    return;
  }

  generateBillBtn.disabled = false;

  // Clear container
  cartItemsContainer.innerHTML = '';

  cart.forEach((item, index) => {
    const div = document.createElement('div');
    div.classList.add('cart-item');
    div.innerHTML = `
      <img src="${item.image}" alt="${item.productName}" />
      <div class="cart-item-details">
        <span>${item.productName}</span>
        <small>Shop: ${item.shop}</small>
        <span>Qty: ${item.quantity}</span>
        <span>Price: LKR ${item.price.toFixed(2)}</span>
      </div>
      <button class="remove-btn" data-index="${index}" aria-label="Remove ${item.productName} from cart">Remove</button>
    `;
    cartItemsContainer.appendChild(div);
  });

  // Remove button handler
  document.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const idx = parseInt(e.target.getAttribute('data-index'));
      cart.splice(idx, 1);
      updateCartUI();
    });
  });
}

// Generate bill
const GenerateBillBtn = document.getElementById('generateBillBtn');
const downloadBillBtn = document.getElementById('downloadBillBtn');
const BillOutput = document.getElementById('billOutput');

let lastBillText = '';

GenerateBillBtn.addEventListener('click', () => {
  if (cart.length === 0) return;

  let billText = '--- Grocery Shop Bill ---\n\n';
  billText += 'Product\t\tShop\tQty\tPrice\n';
  billText += '------------------------------------------\n';

  let total = 0;

  cart.forEach(item => {
    const lineTotal = item.price * item.quantity;
    billText += `${item.productName}\t${item.shop}\t${item.quantity}\tLKR${lineTotal.toFixed(2)}\n`;
    total += lineTotal;
  });

  billText += '------------------------------------------\n';
  billText += `Total Amount:\t\t\tLKR${total.toFixed(2)}\n\n`;
  billText += 'Thank you for shopping with us!';

  BillOutput.textContent = billText;
  BillOutput.scrollIntoView({ behavior: 'smooth' });

  lastBillText = billText;
  downloadBillBtn.disabled = false; // Enable download button
});

/*downloadBillBtn.addEventListener('click', () => {
  if (!lastBillText) return;

  const blob = new Blob([lastBillText], { type: 'text/plain' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'Grocery_Bill.txt';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
});*/

downloadBillBtn.addEventListener('click', () => {
  if (!lastBillText) return;

  // Use jsPDF to create and save PDF
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.setFont("courier", "normal");
  doc.setFontSize(12);

  // Split long text to avoid overflow (optional)
  const lines = doc.splitTextToSize(lastBillText, 180); // 180 width in mm

  doc.text(lines, 10, 10); // x=10mm, y=10mm
  doc.save('Grocery_Bill.pdf');
});


