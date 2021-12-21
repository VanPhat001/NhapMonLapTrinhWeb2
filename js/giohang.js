let basketTable = document.getElementById('basket-table');
let tbody = basketTable.getElementsByTagName('tbody')[0];
let totalPriceElement = basketTable.getElementsByClassName('total-price')[0];

showBasketTable();

window.onstorage = function () { 
    showBasketTable();
}

function showBasketTable() {
    tbody.innerHTML = '';
    let totalPrice = 0;

    for (const key in localStorage) {
        if (Object.hasOwnProperty.call(localStorage, key)) {
            const quantily = localStorage[key];

            if (typeof productList[key] !== "undefined") {
                let product = productList[key];

                let tr = document.createElement('tr');
                tr.id = product.id;
                tr.innerHTML = `
                    <td class="image">
                        <div class="img-box basket-table__img" style="background-image: url(${product.imageList[0]});"></div>
                    </td>
                    <td class="name">
                        <p class="basket-table__name">${product.name}</p>
                    </td>
                    <td class="quantily">
                        <p class="basket-table__quantily">${quantily}</p>
                    </td>
                    <td class="price">
                        <p class="basket-table__price">${product.price} <u>đ</u></p>
                    </td>
                `;

                let i = document.createElement('i');
                i.classList.add('fas', 'fa-window-close', 'btn', 'basket-table__btn-close');
                i.onclick = function (e) { 
                    let tr = this.parentNode.parentNode;
                    localStorage.removeItem(tr.id);
                    showBasketTable();
                }                
                let td = document.createElement('td');
                td.className = 'del';
                td.appendChild(i);

                tr.appendChild(td);
                tbody.appendChild(tr);
                totalPrice += product.price * quantily;
            }
        }
    }
    totalPriceElement.innerHTML = totalPrice + ' <u>đ</u>';
}
