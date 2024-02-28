class MenuItem {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
}

class Menu {
    constructor() {
        this.items = [];
    }

    addItem(item) {
        this.items.push(item);
    }

    displayMenu() {
        const menuDisplay = document.getElementById("menu-display");
        menuDisplay.innerHTML = "<h3>Menú:</h3><table><tr><th>Producto</th><th>Precio</th><th>Acción</th></tr>";

        this.items.forEach(item => {
            const row = document.createElement("tr");
            row.innerHTML = `<td>${item.name}</td><td>$${item.price}</td><td><button onclick="addToOrder('${item.name}', ${item.price})">Agregar</button></td>`;
            menuDisplay.appendChild(row);
        });

        menuDisplay.innerHTML += "</table>";
    }
}

class Order {
    constructor(customerName) {
        this.customerName = customerName;
        this.itemsOrdered = [];
        this.state = "En cocina";
    }

    addItem(item, quantity) {
        const existingItem = this.itemsOrdered.find(i => i.item.name === item.name);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.itemsOrdered.push({ item, quantity });
        }
    }

    calculateTotal() {
        return this.itemsOrdered.reduce((total, { item, quantity }) => total + item.price * quantity, 0);
    }

    markAsReady() {
        this.state = "Listo";
    }

    displayOrder() {
        const orderDisplay = document.getElementById("order-display");
        orderDisplay.innerHTML = `<h3>Tu Pedido (${this.customerName}):</h3><table><tr><th>Producto</th><th>Cantidad</th><th>Total</th></tr>`;

        this.itemsOrdered.forEach(({ item, quantity }) => {
            orderDisplay.innerHTML += `<tr><td>${item.name}</td><td>${quantity}</td><td>$${item.price * quantity}</td></tr>`;
        });

        orderDisplay.innerHTML += `<tr><td colspan="2">Total:</td><td>$${this.calculateTotal()}</td></tr></table>`;
    }
}

class Kitchen {
    constructor() {
        this.ordersInCooking = [];
    }

    receiveOrder(order) {
        this.ordersInCooking.push(order);
        this.displayOrdersInCooking();
    }

    displayOrdersInCooking() {
        const kitchenDisplay = document.getElementById("kitchen-display");
        kitchenDisplay.innerHTML = "<h3>Pedidos en Cocina:</h3><table><tr><th>Cliente</th><th>Estado</th></tr>";

        this.ordersInCooking.forEach(order => {
            kitchenDisplay.innerHTML += `<tr><td>${order.customerName}</td><td>${order.state}</td></tr>`;
        });

        kitchenDisplay.innerHTML += "</table>";
    }
}

const menu = new Menu();
menu.addItem(new MenuItem("Hamburguesas con papas", 10));
menu.addItem(new MenuItem("Tacos de Birria", 8));
menu.addItem(new MenuItem("Nachos", 5));
menu.addItem(new MenuItem("Bebidas de industria la constancia", 2));

menu.displayMenu();

let customerOrder;
const kitchen = new Kitchen();

function realizarPedido() {
    const nombreCliente = prompt("Ingrese su nombre:");

    if (nombreCliente && !customerOrder) {

        customerOrder = new Order(nombreCliente);

        customerOrder.displayOrder();

        kitchen.receiveOrder(customerOrder);

        simulateOrderProcessing();
    } else if (customerOrder) {
        alert("Ya tienes un pedido en curso. No puedes agregar más.");
    }
}

function addToOrder(name, price) {
    const quantity = prompt(`Ingrese la cantidad de ${name}:`);
    const menuItem = new MenuItem(name, price);

    if (customerOrder && quantity !== null && !isNaN(quantity) && parseInt(quantity) > 0) {
        customerOrder.addItem(menuItem, parseInt(quantity));
        customerOrder.displayOrder();
    } else {
        alert("Error: Cantidad inválida o no se ha seleccionado un pedido.");
    }
}

function simulateOrderProcessing() {
    setTimeout(() => {
        customerOrder.markAsReady();
        customerOrder.displayOrder();
        kitchen.displayOrdersInCooking();
    }, 5000);
}
