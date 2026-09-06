const cart=JSON.parse(localStorage.getItem("nutrifreshCart")||"{}");
document.addEventListener("DOMContentLoaded",()=>{
 document.getElementById("year").textContent=new Date().getFullYear();
 const d=document.getElementById("date"), now=new Date();
 const tomorrow=new Date(now); tomorrow.setDate(now.getDate()+1);
 d.min=tomorrow.toISOString().slice(0,10);
 render();
});
function save(){localStorage.setItem("nutrifreshCart",JSON.stringify(cart))}
function add(btn){const c=btn.closest(".product"),n=c.dataset.name,p=+c.dataset.price;cart[n]??={price:p,qty:0};cart[n].qty++;save();render();toast(n+" added to your order");document.getElementById("order").scrollIntoView({behavior:"smooth"})}
function addCombo(btn){const n=btn.dataset.name,p=+btn.dataset.price;cart[n]??={price:p,qty:0};cart[n].qty++;save();render();toast("Combo added to your order");document.getElementById("order").scrollIntoView({behavior:"smooth"})}
function qty(n,a){if(!cart[n])return;cart[n].qty+=a;if(cart[n].qty<1)delete cart[n];save();render()}
function clearCart(){Object.keys(cart).forEach(k=>delete cart[k]);save();render()}
function render(){
 const box=document.getElementById("items"),total=document.getElementById("total"),note=document.getElementById("threshold"),es=Object.entries(cart);
 if(!es.length){box.innerHTML='<p class="empty">No items added yet. Choose something from the menu.</p>';total.textContent="₹0";note.textContent="Minimum order value: ₹149.";return}
 let sum=0;
 box.innerHTML=es.map(([n,x])=>{const line=x.price*x.qty;sum+=line;const safe=n.replaceAll("'","\\\\'");return `<div class="cart-row"><div><b>${n}</b><br>₹${x.price} × ${x.qty}</div><div class="cart-controls"><button type="button" onclick="qty('${safe}',-1)">−</button><span>${x.qty}</span><button type="button" onclick="qty('${safe}',1)">+</button><b>₹${line}</b></div></div>`}).join("");
 total.textContent="₹"+sum;
 note.textContent=sum>=149?"✓ Minimum order value reached.":`Add ₹${149-sum} more to reach the ₹149 minimum order value.`;
}
function submitOrder(e){
 e.preventDefault();
 const sum=Object.values(cart).reduce((a,x)=>a+x.price*x.qty,0);
 if(sum<149){toast("Minimum order value is ₹149.");return}
 const date=document.getElementById("date").value;
 if(!date){toast("Please select a delivery date.");return}
 const selected=new Date(date+"T00:00:00"), deadline=new Date(selected);deadline.setDate(deadline.getDate()-1);deadline.setHours(23,59,59,999);
 if(new Date()>deadline){toast("Ordering for this date has closed. Please choose another date.");return}
 const phone=document.getElementById("phone").value.replace(/\D/g,"");
 if(phone.length<10){toast("Please enter a valid mobile number.");return}
 const order={name:document.getElementById("name").value,phone,gym:document.getElementById("gym").value,address:document.getElementById("address").value,date,slot:document.getElementById("slot").value,items:cart,total:sum};
 localStorage.setItem("nutrifreshLastOrder",JSON.stringify(order));
 toast("Order details saved. Connect Razorpay to complete payment.");
}
function toast(m){const t=document.getElementById("toast");t.textContent=m;t.classList.add("show");clearTimeout(window.tt);window.tt=setTimeout(()=>t.classList.remove("show"),3000)}
