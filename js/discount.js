const openCartBtn = document.getElementById('open-cart');
  const closeCartBtn = document.getElementById('close-cart');
  const cartSection = document.getElementById('cart-section');
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  const cartCount = document.getElementById('cart-count');

  let total = 0;
  let itemCount = 0;

  openCartBtn.addEventListener('click', () => {
    cartSection.classList.add('open');
  });

  closeCartBtn.addEventListener('click', () => {
    cartSection.classList.remove('open');
  });

 document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', e => {
    const card = e.target.closest('.product-card');
    const title = card.querySelector('h3').innerText;
    const priceText = card.querySelector('.discounted-price').innerText.replace("LKR.", "");
    const price = parseFloat(priceText);
    const imageSrc = card.querySelector('img').src;

    const listItem = document.createElement('li');
    listItem.classList.add('cart-item');
    listItem.innerHTML = `
      <img src="${imageSrc}" alt="${title}" class="cart-item-img">
      <div class="cart-item-info">
        <span class="cart-item-title">${title}</span><br>
        <span class="cart-item-price">LKR ${price.toFixed(2)}</span>
      </div>
      <button class="remove-btn">Remove</button>
    `;

    // Remove button logic
    listItem.querySelector('.remove-btn').addEventListener('click', () => {
      cartItems.removeChild(listItem);
      total -= price;
      itemCount--;
      cartTotal.textContent = total.toFixed(2);
      cartCount.textContent = itemCount;
    });

    cartItems.appendChild(listItem);

    total += price;
    itemCount++;
    cartTotal.textContent = total.toFixed(2);
    cartCount.textContent = itemCount;
  });
});



  const paymentContainer = document.getElementById('payment');
  const buyNowButton = document.querySelector('.btn-buy');
  const closePaymentButton = document.getElementById('close-payment');

  function openPopup() {
    paymentContainer.classList.add('show');
  }

  function closePopup() {
    paymentContainer.classList.remove('show');
  }

  buyNowButton.addEventListener('click', openPopup);
  closePaymentButton.addEventListener('click', (e) => {
    e.preventDefault(); // prevent form submission
    closePopup();
    alert (" thank you for purchasing , Come again");
  });

