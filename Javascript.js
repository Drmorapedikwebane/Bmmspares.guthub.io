/* ==========================================
   BBM SPARES JAVASCRIPT
   Mercedes-Benz Parts Specialists
========================================== */


/*
    BBM SPARES WHATSAPP NUMBER
    Format: country code + number (no spaces, no +)
*/

const WHATSAPP_NUMBER = "27650742860";


/* ==========================================
   PRODUCTS — MERCEDES-BENZ PARTS
========================================== */


const PRODUCTS = [

    /* ---------- ENGINE ---------- */

    {
        id: 1,
        name: "Oil Filter – OM651 / M274",
        category: "Engine",
        icon: "⚙️",
        desc: "Mercedes-Benz oil filter for OM651 diesel & M274 petrol engines."
    },

    {
        id: 2,
        name: "Air Filter – C-Class W204 / W205",
        category: "Engine",
        icon: "▦",
        desc: "Genuine-fit air filter for Mercedes C-Class W204 & W205."
    },

    {
        id: 3,
        name: "Spark Plug Set – M274 Petrol",
        category: "Engine",
        icon: "⚡",
        desc: "Spark plug set for Mercedes M274 4-cylinder petrol engines."
    },

    {
        id: 4,
        name: "Timing Chain Kit – OM651 Diesel",
        category: "Engine",
        icon: "🔗",
        desc: "Timing chain kit for Mercedes OM651 diesel engines."
    },

    {
        id: 5,
        name: "Water Pump – C-Class / E-Class",
        category: "Engine",
        icon: "💧",
        desc: "Coolant water pump for Mercedes C-Class & E-Class models."
    },

    /* ---------- BRAKES ---------- */

    {
        id: 6,
        name: "Front Brake Pads – W204 / W205",
        category: "Brakes",
        icon: "◉",
        desc: "Front brake pad set for Mercedes W204 & W205."
    },

    {
        id: 7,
        name: "Brake Discs (Pair) – W205",
        category: "Brakes",
        icon: "⊙",
        desc: "Brake disc pair for Mercedes W205 C-Class."
    },

    {
        id: 8,
        name: "Brake Fluid – DOT 4",
        category: "Brakes",
        icon: "🧴",
        desc: "DOT 4 brake fluid for Mercedes-Benz hydraulic brake systems."
    },

    {
        id: 9,
        name: "Brake Wear Sensor – W204",
        category: "Brakes",
        icon: "🔌",
        desc: "Brake pad wear sensor for Mercedes W204."
    },

    /* ---------- BODY ---------- */

    {
        id: 10,
        name: "Front Grille – W204",
        category: "Body",
        icon: "▤",
        desc: "Replacement front grille for Mercedes W204 C-Class."
    },

    {
        id: 11,
        name: "Side Mirror – W205",
        category: "Body",
        icon: "🚘",
        desc: "Replacement side mirror for Mercedes W205."
    },

    {
        id: 12,
        name: "Headlight Assembly – W204",
        category: "Body",
        icon: "💡",
        desc: "Headlight assembly for Mercedes W204 C-Class."
    },

    {
        id: 13,
        name: "Bonnet Star Emblem",
        category: "Body",
        icon: "⭐",
        desc: "Mercedes-Benz bonnet star emblem (upright style)."
    },

    /* ---------- ELECTRICAL ---------- */

    {
        id: 14,
        name: "Car Battery – AGM 12V",
        category: "Electrical",
        icon: "🔋",
        desc: "AGM 12V battery suitable for Mercedes-Benz vehicles."
    },

    {
        id: 15,
        name: "Crankshaft Position Sensor – M274",
        category: "Electrical",
        icon: "📡",
        desc: "Crankshaft position sensor for Mercedes M274 engines."
    },

    {
        id: 16,
        name: "Ignition Coil – M274 / M270",
        category: "Electrical",
        icon: "⚡",
        desc: "Ignition coil for Mercedes M274 & M270 engines."
    },

    {
        id: 17,
        name: "SAM Module – W204",
        category: "Electrical",
        icon: "🧠",
        desc: "Signal Acquisition Module (SAM) for Mercedes W204."
    },

    /* ---------- SERVICE ---------- */

    {
        id: 18,
        name: "Cabin Air Filter – C-Class",
        category: "Service",
        icon: "🌬️",
        desc: "Cabin air filter for Mercedes C-Class models."
    },

    {
        id: 19,
        name: "Fuel Filter – OM651 Diesel",
        category: "Service",
        icon: "⛽",
        desc: "Fuel filter for Mercedes OM651 diesel engines."
    },

    {
        id: 20,
        name: "Serpentine Belt – M274",
        category: "Service",
        icon: "〰️",
        desc: "Serpentine drive belt for Mercedes M274 engines."
    },

    {
        id: 21,
        name: "Engine Mount – W204 / W205",
        category: "Service",
        icon: "🔩",
        desc: "Engine mount for Mercedes W204 & W205 models."
    }

];


/* ==========================================
   GET CART
========================================== */


function getCart() {

    try {

        return JSON.parse(
            localStorage.getItem("bbmSparesCart") || "[]"
        );

    }

    catch {

        return [];

    }

}


/* ==========================================
   SAVE CART
========================================== */


function saveCart(cart) {

    localStorage.setItem(
        "bbmSparesCart",
        JSON.stringify(cart)
    );

    updateCartCount();

}


/* ==========================================
   UPDATE CART NUMBER
========================================== */


function updateCartCount() {

    const cart = getCart();

    const count = cart.reduce(
        (sum, item) => sum + item.qty,
        0
    );


    document
        .querySelectorAll(".cart-count")
        .forEach((element) => {

            element.textContent = count;

        });

}


/* ==========================================
   ADD PRODUCT TO CART
========================================== */


function addToCart(id) {

    const cart = getCart();

    const existingProduct =
        cart.find(item => item.id === id);


    if (existingProduct) {

        existingProduct.qty++;

    }

    else {

        cart.push({
            id: id,
            qty: 1
        });

    }


    saveCart(cart);


    /* Visual feedback on the button */

    const button =
        document.querySelector(
            `[data-add="${id}"]`
        );


    if (button) {

        const oldText =
            button.textContent;


        button.textContent =
            "Added ✓";


        setTimeout(() => {

            button.textContent =
                oldText;

        }, 900);

    }

}


/* ==========================================
   PRODUCT CARD
========================================== */


function productCard(product) {

    return `

        <article class="product-card">

            <div class="product-image">

                ${product.icon}

            </div>


            <div class="product-body">

                <span class="product-category">

                    ${product.category}

                </span>


                <h3>

                    ${product.name}

                </h3>


                <p class="product-desc">

                    ${product.desc}

                </p>


                <button

                    class="btn btn-primary add-btn"

                    data-add="${product.id}"

                    type="button"

                >

                    Request Availability & Quotation

                </button>


            </div>

        </article>

    `;

}


/* ==========================================
   DISPLAY PRODUCTS
========================================== */


function renderProducts() {

    const grid =
        document.getElementById(
            "productsGrid"
        );


    if (!grid) {

        return;

    }


    const search =
        (
            document.getElementById(
                "productSearch"
            )?.value || ""
        )
        .toLowerCase()
        .trim();


    const category =
        document.getElementById(
            "categoryFilter"
        )?.value || "All";


    const filteredProducts =
        PRODUCTS.filter(product => {


            const matchesCategory =
                category === "All" ||
                product.category === category;


            const searchableText =
                `
                    ${product.name}
                    ${product.category}
                    ${product.desc}
                `.toLowerCase();


            const matchesSearch =
                searchableText.includes(search);


            return (
                matchesCategory &&
                matchesSearch
            );

        });


    grid.innerHTML =
        filteredProducts
            .map(productCard)
            .join("");


    const noProducts =
        document.getElementById(
            "noProducts"
        );


    if (noProducts) {

        noProducts.classList.toggle(
            "hidden",
            filteredProducts.length > 0
        );

    }


    grid
        .querySelectorAll("[data-add]")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    addToCart(
                        Number(
                            button.dataset.add
                        )
                    );

                }
            );

        });

}


/* ==========================================
   DISPLAY CART / QUOTE LIST
========================================== */


function renderCart() {

    const cartContainer =
        document.getElementById(
            "cartItems"
        );


    if (!cartContainer) {

        return;

    }


    const cart = getCart();


    const emptyCart =
        document.getElementById(
            "emptyCart"
        );


    const cartLayout =
        document.getElementById(
            "cartLayout"
        );


    if (cart.length === 0) {

        cartLayout.classList.add(
            "hidden"
        );

        emptyCart.classList.remove(
            "hidden"
        );

        return;

    }


    cartLayout.classList.remove(
        "hidden"
    );

    emptyCart.classList.add(
        "hidden"
    );


    cartContainer.innerHTML =
        cart
            .map(item => {


                const product =
                    PRODUCTS.find(
                        product =>
                            product.id === item.id
                    );


                if (!product) {

                    return "";

                }


                return `

                    <article class="cart-item">


                        <div class="cart-thumb">

                            ${product.icon}

                        </div>


                        <div>

                            <span class="cart-category">

                                ${product.category}

                            </span>


                            <h3>

                                ${product.name}

                            </h3>


                            <button

                                class="remove-btn"

                                data-remove="${product.id}"

                                type="button"

                            >

                                Remove

                            </button>

                        </div>


                        <div class="qty-controls">


                            <button

                                type="button"

                                data-minus="${product.id}"

                            >

                                −

                            </button>


                            <span>

                                ${item.qty}

                            </span>


                            <button

                                type="button"

                                data-plus="${product.id}"

                            >

                                +

                            </button>


                        </div>


                    </article>

                `;

            })
            .join("");


    const itemCount =
        cart.reduce(
            (sum, item) =>
                sum + item.qty,
            0
        );


    document.getElementById(
        "cartItemCount"
    ).textContent =
        itemCount;


    /* Plus buttons */

    cartContainer
        .querySelectorAll("[data-plus]")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    changeQty(
                        Number(
                            button.dataset.plus
                        ),
                        1
                    );

                }
            );

        });


    /* Minus buttons */

    cartContainer
        .querySelectorAll("[data-minus]")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    changeQty(
                        Number(
                            button.dataset.minus
                        ),
                        -1
                    );

                }
            );

        });


    /* Remove buttons */

    cartContainer
        .querySelectorAll("[data-remove]")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    removeItem(
                        Number(
                            button.dataset.remove
                        )
                    );

                }
            );

        });

}


/* ==========================================
   CHANGE QUANTITY
========================================== */


function changeQty(id, amount) {

    const cart = getCart();


    const item =
        cart.find(
            item => item.id === id
        );


    if (!item) {

        return;

    }


    item.qty += amount;


    if (item.qty < 1) {

        cart.splice(
            cart.indexOf(item),
            1
        );

    }


    saveCart(cart);

    renderCart();

}


/* ==========================================
   REMOVE PRODUCT
========================================== */


function removeItem(id) {

    const cart =
        getCart().filter(
            item => item.id !== id
        );


    saveCart(cart);

    renderCart();

}


/* ==========================================
   WHATSAPP QUOTATION REQUEST
========================================== */


function checkoutWhatsApp() {

    const cart = getCart();


    if (cart.length === 0) {

        alert(
            "Your parts list is empty."
        );

        return;

    }


    let messageLines = [

        "Hello BBM Spares,",

        "",

        "I would like to request the availability and a quotation for the following Mercedes-Benz parts:",

        ""

    ];


    cart.forEach(item => {


        const product =
            PRODUCTS.find(
                product =>
                    product.id === item.id
            );


        if (!product) {

            return;

        }


        messageLines.push(

            `• ${product.name} — Qty: ${item.qty}`

        );

    });


    messageLines.push(

        "",

        "Please confirm availability and send me a quotation."

    );


    const message =
        encodeURIComponent(
            messageLines.join("\n")
        );


    window.open(

        `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`,

        "_blank"

    );

}


/* ==========================================
   INITIALISE WEBSITE
========================================== */


function setup() {


    updateCartCount();


    document
        .querySelectorAll(".year")
        .forEach(element => {

            element.textContent =
                new Date().getFullYear();

        });


    /* Mobile menu */

    const menuButton =
        document.querySelector(
            ".menu-toggle"
        );


    const navigation =
        document.querySelector(
            ".nav"
        );


    if (menuButton) {

        menuButton.addEventListener(
            "click",
            () => {

                navigation?.classList.toggle(
                    "open"
                );

            }
        );

    }


    /* Product search & filter */

    const search =
        document.getElementById(
            "productSearch"
        );


    const filter =
        document.getElementById(
            "categoryFilter"
        );


    if (search) {

        search.addEventListener(
            "input",
            renderProducts
        );

    }


    if (filter) {

        filter.addEventListener(
            "change",
            renderProducts
        );

    }


    /* Category from URL */

    const params =
        new URLSearchParams(
            window.location.search
        );


    const requestedCategory =
        params.get("category");


    if (
        filter &&
        requestedCategory
    ) {

        const validOption =
            [
                ...filter.options
            ].some(
                option =>
                    option.value ===
                    requestedCategory
            );


        if (validOption) {

            filter.value =
                requestedCategory;

        }

    }


    renderProducts();

    renderCart();


    /* WhatsApp checkout button */

    const checkoutButton =
        document.getElementById(
            "checkoutBtn"
        );


    if (checkoutButton) {

        checkoutButton.addEventListener(
            "click",
            checkoutWhatsApp
        );

    }


    /* Clear list button */

    const clearButton =
        document.getElementById(
            "clearCartBtn"
        );


    if (clearButton) {

        clearButton.addEventListener(
            "click",
            () => {


                const confirmed =
                    confirm(
                        "Clear all items from your list?"
                    );


                if (confirmed) {

                    saveCart([]);

                    renderCart();

                }

            }
        );

    }


    /* Contact form */

    const enquiryForm =
        document.getElementById(
            "enquiryForm"
        );


    if (enquiryForm) {


        enquiryForm.addEventListener(
            "submit",
            event => {


                event.preventDefault();


                const name =
                    document.getElementById(
                        "enquiryName"
                    ).value.trim();


                const message =
                    document.getElementById(
                        "enquiryMessage"
                    ).value.trim();


                const whatsappMessage =

                    `Hello BBM Spares, my name is ${name}.\n\n${message}`;


                window.open(

                    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`,

                    "_blank"

                );

            }
        );

    }

}


document.addEventListener(
    "DOMContentLoaded",
    setup
);
