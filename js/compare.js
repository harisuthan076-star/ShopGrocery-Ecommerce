
  /*const compareButtons = document.querySelectorAll('.compare-btn');
  const compareSection = document.querySelector('.compare');
  const closeBtn = document.querySelector('.modal .close');

  compareButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      compareSection.style.display = 'flex';
    });
  });

  closeBtn.addEventListener('click', () => {
    compareSection.style.display = 'none';
  });

  window.addEventListener('click', (e) => {
    if (e.target === compareSection) {
      compareSection.style.display = 'none';
    }
  });*/


  const productPrices = {
    "Apple || 500g": {
      "Araliya": 400,
      "Keels Super": 420,
      "Arpico": 390
    },
    "Banana || 1Kg": {
      "Araliya": 130,
      "Keels Super": 125,
      "Arpico": 140
    },
    "Black Grapes || 500g": {
      "Araliya": 450,
      "Keels Super": 470,
      "Arpico": 440
    },
    "Brinjal || 500g": {
      "Araliya": 80,
      "Keels Super": 85,
      "Arpico": 79
    },
    "Cabbage || 500g": {
      "Araliya": 90,
      "Keels Super": 95,
      "Arpico": 92
    },
    "Carrot || 250g": {
      "Araliya": 70,
      "Keels Super": 72,
      "Arpico": 68
    },
    "Leeks || 250g": {
      "Araliya": 50,
      "Keels Super": 52,
      "Arpico": 49
    },
    "Mango || 500g": {
      "Araliya": 120,
      "Keels Super": 125,
      "Arpico": 118
    },
    "Orange || 500g": {
      "Araliya": 200,
      "Keels Super": 210,
      "Arpico": 195
    },
    "pinnapple || 500g": {
      "Araliya": 160,
      "Keels Super": 165,
      "Arpico": 155
    },
    "Potato || 500g": {
      "Araliya": 80,
      "Keels Super": 85,
      "Arpico": 78
    },
    "tomato || 500g": {
      "Araliya": 140,
      "Keels Super": 145,
      "Arpico": 138
    },
    "watermelon || 500g": {
      "Araliya": 200,
      "Keels Super": 210,
      "Arpico": 205
    },
  };

  const compareButtons = document.querySelectorAll('.compare-btn');
  const compareSection = document.querySelector('.compare');
  const closeBtn = document.querySelector('.modal .close');
  const compareList = document.getElementById('compare-list');

  compareButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const productBox = button.closest('.box');
      const productName = productBox.querySelector('.product-title').textContent.trim();
      populateComparison(productName);
      compareSection.style.display = 'flex';
    });
  });

  closeBtn.addEventListener('click', () => {
    compareSection.style.display = 'none';
  });

  window.addEventListener('click', (e) => {
    if (e.target === compareSection) {
      compareSection.style.display = 'none';
    }
  });

  function populateComparison(productName) {
    const prices = productPrices[productName];
    compareList.innerHTML = '';

    if (!prices) {
      compareList.innerHTML = `<p>No price comparison available for <strong>${productName}</strong>.</p>`;
      return;
    }

    for (const [shop, price] of Object.entries(prices)) {
      const card = document.createElement('div');
      card.className = 'compare-card';
      card.innerHTML = `
        <div class="shop-info">
          <strong class="shop-name">${shop}</strong>
          <span class="product-name">${productName}</span>
        </div>
        <div class="price-action">
          <span class="price">LKR ${price.toFixed(2)}</span>
          <button class="buy-btn" id="cart_btn">Buy Now</button>
          <button class="crt-btn" id="cart_btn">Add Cart</button>
          
        </div>
      `;
      compareList.appendChild(card);
    }
  }

  

  

  


