const MIN_ORDER = 149;

// IMPORTANT: Do not present Razorpay as live until you add your own live Payment Link.
// Replace the value below with the exact Razorpay Payment Link from your Razorpay dashboard.
const RAZORPAY_PAYMENT_LINK = "https://rzp.io/rzp/qrYZXELG";

const PRODUCTS = {
  oats: { name: "NutriFresh Oats Bowl", price: 129 },
  protein: { name: "NutriFresh Protein Bowl", price: 129 },
  basil: { name: "NutriFresh Basil Bowl", price: 119 },
  sandwich: { name: "Nutri Power Sandwich", price: 109 },
  abc: { name: "NutriFresh ABC Juice", price: 99 },
  shake: { name: "NutriFresh Banana Milk Shake", price: 89 }
};

const cart = {};
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
}

document.querySelector('#year').textContent = new Date().getFullYear();

function money(value) {
  return `₹${value.toLocaleString('en-IN')}`;
}

function cartTotal() {
  return Object.entries(cart).reduce((sum, [id, qty]) => sum + PRODUCTS[id].price * qty, 0);
}

function cartCount() {
  return Object.values(cart).reduce((sum, qty) => sum + qty, 0);
}

function renderCart() {
  const items = document.querySelector('#summaryItems');
  const totalEl = document.querySelector('#summaryTotal');
  const status = document.querySelector('#summaryStatus');
  const minMsg = document.querySelector('#minimumMessage');
  const countEl = document.querySelector('#cartCount');
  const floatTotal = document.querySelector('#cartTotal');

  if (!items) return;
  items.innerHTML = '';

  Object.entries(cart).forEach(([id, qty]) => {
    const product = PRODUCTS[id];
    const row = document.createElement('div');
    row.className = 'summary-row';
    row.innerHTML = `
      <span>${product.name}</span>
      <span class="qty-controls">
        <button type="button" aria-label="Decrease ${product.name}" data-minus="${id}">−</button>
        <strong>${qty}</strong>
        <button type="button" aria-label="Increase ${product.name}" data-plus="${id}">+</button>
      </span>
      <strong>${money(product.price * qty)}</strong>`;
    items.appendChild(row);
  });

  const total = cartTotal();
  totalEl.textContent = money(total);
  countEl.textContent = cartCount();
  floatTotal.textContent = money(total);
  status.textContent = cartCount() ? `${cartCount()} item${cartCount() > 1 ? 's' : ''} selected` : 'Add items from the menu';

  minMsg.classList.toggle('ok', total >= MIN_ORDER);
  minMsg.classList.toggle('error', total > 0 && total < MIN_ORDER);
  minMsg.textContent = total >= MIN_ORDER
    ? '✓ Minimum order reached'
    : `Minimum order value: ₹149${total ? ` • Add ${money(MIN_ORDER - total)} more` : ''}`;

  items.querySelectorAll('[data-plus]').forEach(btn => btn.addEventListener('click', () => changeQty(btn.dataset.plus, 1)));
  items.querySelectorAll('[data-minus]').forEach(btn => btn.addEventListener('click', () => changeQty(btn.dataset.minus, -1)));
}

function changeQty(id, delta) {
  cart[id] = (cart[id] || 0) + delta;
  if (cart[id] <= 0) delete cart[id];
  renderCart();
}

document.querySelectorAll('[data-add]').forEach(btn => {
  btn.addEventListener('click', () => {
    changeQty(btn.dataset.add, 1);
    document.querySelector('#booking').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

function localDateString(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

const deliveryDate = document.querySelector('#deliveryDate');
if (deliveryDate) {
  const tomorrow = new Date();
  tomorrow.setHours(0, 0, 0, 0);
  tomorrow.setDate(tomorrow.getDate() + 1);
  deliveryDate.min = localDateString(tomorrow);
}

function showMessage(text, type = '') {
  const el = document.querySelector('#formMessage');
  el.textContent = text;
  el.className = `form-message ${type}`;
}

document.querySelector('#bookingForm').addEventListener('submit', (event) => {
  event.preventDefault();
  showMessage('');

  const total = cartTotal();
  if (total < MIN_ORDER) {
    showMessage(`Minimum order is ₹149. Please add ${money(MIN_ORDER - total)} more to your order.`, 'error');
    document.querySelector('#summaryTotal').scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }

  const form = event.currentTarget;
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const chosen = new Date(`${deliveryDate.value}T00:00:00`);
  const tomorrow = new Date();
  tomorrow.setHours(0, 0, 0, 0);
  tomorrow.setDate(tomorrow.getDate() + 1);
  if (chosen < tomorrow) {
    showMessage('Please select a delivery date at least one day in advance.', 'error');
    deliveryDate.focus();
    return;
  }

  const orderLines = Object.entries(cart)
    .map(([id, qty]) => `${PRODUCTS[id].name} x ${qty}`)
    .join('\n');

  const details = [
    `NutriFresh Bowl Booking`,
    `Name: ${document.querySelector('#customerName').value.trim()}`,
    `Mobile: ${document.querySelector('#mobile').value.trim()}`,
    `Gym: ${document.querySelector('#gym').value.trim()}`,
    `Delivery date: ${deliveryDate.value}`,
    `Delivery slot: ${document.querySelector('#timeSlot').value}`,
    `Address: ${document.querySelector('#address').value.trim()}`,
    `Order: ${orderLines}`,
    `Total: ${money(total)}`
  ];

  const note = document.querySelector('#orderNote').value.trim();
  if (note) details.push(`Note: ${note}`);

  // Keep the order details locally for the next step / future integration.
  localStorage.setItem('nutrifreshLastBooking', JSON.stringify({
    customerName: document.querySelector('#customerName').value.trim(),
    mobile: document.querySelector('#mobile').value.trim(),
    gym: document.querySelector('#gym').value.trim(),
    deliveryDate: deliveryDate.value,
    timeSlot: document.querySelector('#timeSlot').value,
    address: document.querySelector('#address').value.trim(),
    note,
    items: cart,
    total
  }));

  if (RAZORPAY_PAYMENT_LINK && !RAZORPAY_PAYMENT_LINK.includes('PASTE_YOUR')) {
    showMessage('Booking details validated. Opening Razorpay payment page…', 'success');
    window.open(RAZORPAY_PAYMENT_LINK, '_blank', 'noopener,noreferrer');
  } else {
    showMessage('Booking details are ready. Add your live Razorpay Payment Link in script.js to activate online payment.', 'error');
  }

  console.log(details.join('\n'));
});

renderCart();
