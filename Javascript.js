/* ==========================================
   BBM SPARES JAVASCRIPT
========================================== */


/*
    BBM SPARES WHATSAPP NUMBER

    South African format:
    079 672 9393

    WhatsApp format:
    27796729393
*/

const WHATSAPP_NUMBER = "27796729393";


/* ==========================================
   PRODUCTS
========================================== */


const PRODUCTS = [

    {
        id: 1,
        name: "Engine Oil Filter",
        category: "Engine",
        price: 180,
        icon: "⚙️",
        desc: "Quality replacement oil filter."
    },

    {
        id: 2,
        name: "Air Filter",
        category: "Engine",
        price: 250,
        icon: "▦",
        desc: "Replacement air filter for cleaner intake."
    },

    {
        id: 3,
        name: "Spark Plug Set",
        category: "Engine",
        price: 420,
        icon: "⚡",
        desc: "Reliable spark plugs for petrol engines."
    },

    {
        id: 4,
        name: "Brake Pad Set",
        category: "Brakes",
        price: 650,
        icon: "◉",
        desc: "Front brake pad replacement set."
    },

    {
        id: 5,
        name: "Brake Disc",
        category: "Brakes",
        price: 850,
        icon: "◉",
        desc: "Durable replacement brake disc."
    },

    {
        id: 6,
        name: "Brake Fluid",
        category: "Brakes",
        price: 160,
        icon: "🧴",
        desc: "Brake fluid for routine servicing."
    },

    {
        id: 7,
        name: "Headlight Assembly",
        category: "Body",
        price: 2500,
        icon: "💡",
        desc: "Replacement headlight assembly."
    },

    {
        id: 8,
        name: "Front Grille",
        category: "Body",
        price: 950,
        icon: "▤",
        desc: "Replacement front grille."
    },

    {
        id: 9,
        name: "Side Mirror",
        category: "Body",
        price: 780,
        icon: "🚘",
        desc: "Replacement side mirror."
    },

    {
        id: 10,
        name: "Car Battery",
        category: "Electrical",
        price: 1800,
        icon: "🔋",
        desc: "12V vehicle battery."
    },

    {
        id: 11,
        name: "LED Headlight Bulbs",
        category: "Electrical",
        price: 550,
        icon: "💡",
        desc: "Bright replacement LED bulbs."
    },

    {
        id: 12,
        name: "Fan Belt",
        category: "Service",
        price: 380,
        icon: "〰️",
        desc: "Replacement auxiliary drive belt."
    }

];


/* ==========================================
   FORMAT MONEY
========================================== */


const money = (number) => {

    return `R${Number(number).toLocaleString(
        "en-ZA",
        {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }
    )}`;

};


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


    /*
        Give the customer visual feedback
    */

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


                <div class="price">

                    ${money(product.price)}

                </div>


                <button

                    class="btn btn-primary add-btn"

                    data-add="${product.id}"

                    type="button"

                >

                    Add to Cart

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


    /*
        Only run this on Products.html
    */

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


    /*
        Add click events
        to Add to Cart buttons
    */

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
   DISPLAY CART
========================================== */


function renderCart() {

    const cartContainer =
        document.getElementById(
            "cartItems"
        );


    /*
        Only run this on Cart.html
    */

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


    /*
        Empty cart
    */

    if (cart.length === 0) {

        cartLayout.classList.add(
            "hidden"
        );

        emptyCart.classList.remove(
            "hidden"
        );

        return;

    }


    /*
        Cart has products
    */

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

                            <h3>

                                ${product.name}

                            </h3>


                            <div class="cart-price">

                                ${money(product.price)}
                                each

                            </div>


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


    /*
        Calculate total
    */

    const total =
        cart.reduce(
            (sum, item) => {


                const product =
                    PRODUCTS.find(
                        product =>
                            product.id === item.id
                    );


                if (!product) {

                    return sum;

                }


                return (
                    sum +
                    product.price *
                    item.qty
                );

            },
            0
        );


    /*
        Calculate item count
    */

    const itemCount =
        cart.reduce(
            (sum, item) =>
                sum + item.qty,
            0
        );


    document.getElementById(
        "cartTotal"
    ).textContent =
        money(total);


    document.getElementById(
        "cartItemCount"
    ).textContent =
        itemCount;


    /*
        Plus buttons
    */

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


    /*
        Minus buttons
    */

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


    /*
        Remove buttons
    */

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


    /*
        If quantity reaches zero,
        remove product
    */

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
   WHATSAPP CHECKOUT
========================================== */


function checkoutWhatsApp() {

    const cart = getCart();


    if (cart.length === 0) {

        alert(
            "Your cart is empty."
        );

        return;

    }


    let total = 0;


    /*
        First part of WhatsApp message
    */

    let messageLines = [

        "Hello BBM Spares, I would like to place an order:",

        ""

    ];


    /*
        Add every product
        to WhatsApp message
    */

    cart.forEach(item => {


        const product =
            PRODUCTS.find(
                product =>
                    product.id === item.id
            );


        if (!product) {

            return;

        }


        const subtotal =
            product.price *
            item.qty;


        total += subtotal;


        messageLines.push(

            `${product.name} x ${item.qty} — ${money(subtotal)}`

        );

    });


    /*
        Add total
    */

    messageLines.push(

        "",

        `Total: ${money(total)}`,

        "",

        "Please confirm availability and collection/delivery details."

    );


    /*
        Turn message into URL
    */

    const message =
        encodeURIComponent(
            messageLines.join("\n")
        );


    /*
        Open WhatsApp
    */

    window.open(

        `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`,

        "_blank"

    );

}


/* ==========================================
   INITIALISE WEBSITE
========================================== */


function setup() {


    /*
        Update cart icon
    */

    updateCartCount();


    /*
        Current year
    */

    document
        .querySelectorAll(".year")
        .forEach(element => {

            element.textContent =
                new Date().getFullYear();

        });


    /*
        Mobile menu
    */

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


    /*
        Product search
    */

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


    /*
        Category from homepage

        Example:

        Products.html?category=Engine
    */

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


    /*
        Render products
    */

    renderProducts();


    /*
        Render cart
    */

    renderCart();


    /*
        WhatsApp checkout button
    */

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


    /*
        Clear cart button
    */

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
                        "Clear all items from your cart?"
                    );


                if (confirmed) {

                    saveCart([]);

                    renderCart();

                }

            }
        );

    }


    /*
        Contact form
    */

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


/*
    Start website
*/

document.addEventListener(
    "DOMContentLoaded",
    setup
);
