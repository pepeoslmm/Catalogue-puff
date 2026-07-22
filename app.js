const ACCESS_CODE = "2026";
const ADMIN_CODE = "admin2026";
const STORAGE_KEY = "private_catalog_products";

const defaults = [
  {id:1,name:"Produit Exemple 01",price:19.90,stock:12},
  {id:2,name:"Produit Exemple 02",price:24.90,stock:7},
  {id:3,name:"Produit Exemple 03",price:29.90,stock:0},
  {id:4,name:"Produit Exemple 04",price:14.90,stock:21}
];

const $ = s => document.querySelector(s);
let products = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null") || defaults;

function save(){localStorage.setItem(STORAGE_KEY,JSON.stringify(products));}
function money(n){return new Intl.NumberFormat("fr-BE",{style:"currency",currency:"EUR"}).format(Number(n)||0)}

function render(filter=""){
  const grid=$("#productGrid");
  const q=filter.trim().toLowerCase();
  const list=products.filter(p=>p.name.toLowerCase().includes(q));
  if(!list.length){grid.innerHTML='<div class="empty">Aucun produit trouvé.</div>';return}
  grid.innerHTML=list.map(p=>{
    const out=Number(p.stock)<=0;
    return `<article class="product">
      <div class="product-image">IMAGE</div>
      <div class="product-body">
        <div class="product-top"><h3>${escapeHtml(p.name)}</h3><div class="price">${money(p.price)}</div></div>
        <div class="stock ${out?"out":"ok"}">${out?"Rupture de stock":`${p.stock} disponible${p.stock>1?"s":""}`}</div>
      </div>
    </article>`
  }).join("");
}

function escapeHtml(s){return String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}

$("#loginForm").addEventListener("submit",e=>{
  e.preventDefault();
  if($("#accessCode").value===ACCESS_CODE){
    $("#login").classList.add("hidden");$("#app").classList.remove("hidden");render();
  }else $("#loginError").textContent="Code d'accès incorrect.";
});
$("#logoutBtn").onclick=()=>location.reload();
$("#search").oninput=e=>render(e.target.value);

$("#adminBtn").onclick=()=>{$("#adminModal").classList.remove("hidden");$("#adminLogin").classList.remove("hidden");$("#adminPanel").classList.add("hidden");$("#adminCode").value=""}
$("#closeAdmin").onclick=()=>$("#adminModal").classList.add("hidden");

$("#adminLoginBtn").onclick=()=>{
  if($("#adminCode").value===ADMIN_CODE){$("#adminLogin").classList.add("hidden");$("#adminPanel").classList.remove("hidden");renderAdmin()}
  else $("#adminError").textContent="Code administrateur incorrect.";
};

function renderAdmin(){
  $("#adminList").innerHTML=products.map((p,i)=>`
    <div class="admin-item">
      <input data-i="${i}" data-k="name" value="${escapeHtml(p.name)}">
      <input data-i="${i}" data-k="price" type="number" step="0.01" value="${p.price}">
      <input data-i="${i}" data-k="stock" type="number" min="0" value="${p.stock}">
      <button class="danger" data-del="${i}">Supprimer</button>
    </div>`).join("");
  $("#adminList").querySelectorAll("input").forEach(inp=>inp.onchange=()=>{
    const i=+inp.dataset.i,k=inp.dataset.k;
    products[i][k]=k==="name"?inp.value:Number(inp.value);
    save();render();
  });
  $("#adminList").querySelectorAll("[data-del]").forEach(btn=>btn.onclick=()=>{
    products.splice(+btn.dataset.del,1);save();renderAdmin();render();
  });
}
$("#addProduct").onclick=()=>{
  products.push({id:Date.now(),name:"Nouveau produit",price:0,stock:0});save();renderAdmin();render();
};
$("#resetProducts").onclick=()=>{
  if(confirm("Réinitialiser le catalogue ?")){products=defaults.map(x=>({...x}));save();renderAdmin();render();}
};
