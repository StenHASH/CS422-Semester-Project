// Header Catalog tabs
// To add or rename, edit this list
const Catalog = [
    { id: "plastic-containers", label: "Plastic Containers",         url: "plastic-containers.html"},
    { id: "plastic-cups",       label: "Plastic Cups",               url: "plastic-cups.html"},
    { id: "plastic-bottles",    label: "Plastic Bottles",            url: "plastic-bottles.html" },
    { id: "paper-office",       label: "Office Paper",               url: "paper-office.html"},
    { id: "paper-food",         label: "Food Paper Container/Bag",   url: "paper-food.html"},
    { id: "batteries",          label: "Batteries",                  url: "batteries.html" },
    { id: "metal-cans",         label: "Metal Cans",                 url: "metal-cans.html" },
  ]

function renderHeader() {
    const mount = document.getElementById("site-header");
    if(!mount) return;

    // Each page sets <body data-page="..." to match a catalog id
    const currentPage = document.body.dataset.page;

    const tabs = Catalog.map((item) => {
        const isActive = item.id === currentPage;
        return `<a class="tab${isActive ? " active" : ""}"
               href="${item.url}"
               ${isActive ? 'aria-current="page"' : ""}>${item.label}</a>`;
    }).join("");

    mount.innerHTML = `
    <header class="site-header">
      <div class="header-text">
        <a class="site-title" href="index.html">Recyclables</a>
        <p class="site-subtitle">How You Can Reduce, Reuse &amp; Recycle</p>
      </div>
      <button class="menu-button" type="button" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
    </header>

    <nav class="catalog" aria-label="Recycling items">
      <div class="catalog-scroll">
        <div class="catalog-tabs">${tabs}</div>
      </div>
    </nav>
  `;

  // On a narrow screen, scroll the selected tab into view
  const active = mount.querySelector(".tab.active");
  const scroller = mount.querySelector(".catalog-scroll");
  if (active && scroller) {
    scroller.scrollLeft = active.offsetLeft - (scroller.clientWidth - active.offsetWidth) / 2;
  }
}

document.addEventListener("DOMContentLoaded", renderHeader);