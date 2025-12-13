 const luxuryCars = {
    "car1": { name: "Ferrari 488 GTB", price: 250000.00, img: "path/to/ferrari_488.jpg" },
    "car2": { name: "Lamborghini Huracán", price: 200000.00, img: "path/to/lamborghini_huracan.jpg" },
    "car4": { name: "Porsche 911 Turbo S", price: 207000.00, img: "path/to/porsche_911.jpg" },
    "car5": { name: "Bentley Continental GT", price: 220000.00, img: "path/to/bentley_continental.jpg" },
    "car6": { name: "Aston Martin DB11", price: 200000.00, img: "path/to/aston_martin_db11.jpg" },
    "car7": { name: "McLaren 720S", price: 300000.00, img: "path/to/mclaren_720s.jpg" },
    "car8": { name: "Mercedes-AMG GT R", price: 160000.00, img: "path/to/mercedes_amg.jpg" },
    "car9": { name: "Audi R8 V10", price: 150000.00, img: "path/to/audi_r8.jpg" },
    "car10": { name: "BMW i8 Roadster", price: 165000.00, img: "path/to/bmw_i8.jpg" },
    "car11": { name: "Bugatti Chiron", price: 3000000.00, img: "path/to/bugatti_chiron.jpg" },
    "car12": { name: "Koenigsegg Jesko", price: 2800000.00, img: "path/to/koenigseggjpg_jesko." },
    "car13": { name: "Pagani Huayra", price: 2600000.00, img: "path/to/pagani_huayra.jpg" },
    "car14": { name: "Tesla Model S Plaid", price: 100000.00, img: "path/to/tesla_model_s.jpg" },
    "car15": { name: "Lexus LC 500", price: 90000.00, img: "path/to/lexus_lc500.jpg" },
    "car16": { name: "Jaguar F-Type R", price: 105000.00, img: "path/to/jaguar_ftype.jpg" },
    "car17": { name: "Acura NSX", price: 157000.00, img: "path/to/acura_nsx.jpg" },
    "car18": { name: "Nissan GT-R Nismo", price: 210000.00, img: "path/to/nissan_gtr.jpg" },
    "car19": { name: "Maserati MC20", price: 216000.00, img: "path/to/maserati_mc20.jpg" },
    "car20": { name: "Lotus Evija", price: 2300000.00, img: "path/to/lotus_evija.jpg" },
    "car21": { name: "Ford GT", price: 500000.00, img: "path/to/ford_gt.jpg" }
};

// Use Intl.NumberFormat for correct currency formatting
const currencyFormatter = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP'
});

const cart = {
    items: {},
    hList: document.getElementById("car-list"),
    hItems: document.getElementById("cart-items"),
    hCount: document.getElementById("cart-count"),
    hTotal: document.getElementById("cart-total-price"),
    hCart: document.getElementById("shopping-cart"),

    // Save and Load functions
    save: () => localStorage.setItem("luxuryCarCart", JSON.stringify(cart.items)),
    load: () => {
        const storedCart = localStorage.getItem("luxuryCarCart");
        cart.items = storedCart ? JSON.parse(storedCart) : {};
    },

    toggleDisplay: () => {
        cart.hCart.classList.toggle("open");
    },

    add: function(carId) {
        if (cart.items[carId]) {
            cart.items[carId]++;
        } else {
            cart.items[carId] = 1;
        }
        cart.save();
        cart.list();
    },

    list: function() {
        cart.hList.innerHTML = "";
        cart.hItems.innerHTML = "";

        // Display cars
        for (let id in luxuryCars) {
            const car = luxuryCars[id];
            const item = document.createElement("div");
            item.className = "car-item";
            item.innerHTML = `
                <img src="${car.img}" alt="${car.name}" class="car-img">
                <h3>${car.name}</h3>
                <p>${currencyFormatter.format(car.price)}</p>
                <button onclick="cart.add('${id}')">Buy Now</button>
            `;
            cart.hList.appendChild(item);
        }

        // Display cart items and update total
        let total = 0;
        let itemCount = 0;
        for (let id in cart.items) {
            const car = luxuryCars[id];
            const quantity = cart.items[id];
            const subtotal = quantity * car.price;

            const itemElement = document.createElement("li");
            itemElement.innerHTML = `
                ${car.name} (x${quantity}) - ${currencyFormatter.format(subtotal)}
                <button onclick="cart.remove('${id}')">Remove</button>
            `;
            cart.hItems.appendChild(itemElement);
            
            total += subtotal;
            itemCount += quantity;
        }

        cart.hCount.textContent = itemCount;
        cart.hTotal.textContent = currencyFormatter.format(total);
    },

    remove: function(carId) {
        delete cart.items[carId];
        cart.save();
        cart.list();
    },
    
    nuke: () => {
        cart.items = {};
        cart.save();
        cart.list();
    },
    
    checkout: () => {
        if (Object.keys(cart.items).length === 0) {
            alert("Your cart is empty!");
            return;
        }
        alert(`Congratulations on your purchase of ${cart.hTotal.textContent}! A representative will contact you shortly.`);
        cart.nuke();
        cart.toggleDisplay();
    }
};

window.addEventListener("DOMContentLoaded", () => {
    cart.load();
    cart.list();
});

