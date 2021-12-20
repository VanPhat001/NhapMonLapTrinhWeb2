let quanTriTable = document.getElementById('quantri-table');
let tbody = quanTriTable.getElementsByTagName('tbody')[0];
let imagePath = '';
tbody.innerHTML = '';

for (const key in productList) {
    if (Object.hasOwnProperty.call(productList, key)) {
        const product = productList[key];
        
        console.log(product);
        addRowForQuanTriTable(product.id, product.imageList[0], product.name, product.price);
    }
}

$(document).ready(function () {

    $("#add-product-table__product-image").change(function (e) {
        imagePath = URL.createObjectURL(e.target.files[0]);        
    });

});


function addRowForQuanTriTable(id, productImage, productName, productPrice) {
    let tr = document.createElement('tr');
    tr.id = id;
    tr.innerHTML = `<td class="image">
                        <div class="img-box quantri-table__img" style="background-image: url(${productImage});"></div>
                    </td>
                    <td class="name">
                        <p class="quantri-table__name">${productName}</p>
                    </td>
                    <td class="price">
                        <p class="quantri-table__price">${productPrice} <u>đ</u></p>
                    </td>
                    <td class="quantily">
                        <p class="quantri-table__quantily">100</p>
                    </td>
                    <td class="status">
                        <p class="quantri-table__status">Bật</p>
                    </td>
                    <td class="modify">
                        <i class="fas fa-edit btn quantri-table__modify"></i>
                    </td>`
    tbody.appendChild(tr);
}

// thêm sản phẩm vào #quantri-table
function addProduct() {  
    // check tên sản phẩm
    let name = document.getElementById('add-product-table__product-name');
    if (name.value.trim().length == 0)
    {
        alert('Tên sản phẩm không hợp lệ!');
        name.focus();
        return;
    }

    // check giá
    let price = document.getElementById('add-product-table__product-price');
    if( isNaN(parseInt(price.value)) ) {
        alert('Giá sản phẩm không hợp lệ!');
        price.focus();
        return;
    }

    // Số lượng
    let quantily = document.getElementById('add-product-table__product-quantily');
    if( isNaN(parseInt(quantily.value)) ) {
        alert('Số lượng sản phẩm không hợp lệ!');
        quantily.focus();
        return;
    }

    // Check hình ảnh
    let image = document.getElementById('add-product-table__product-image');
    if( image.value.trim().length == 0 ) {
        alert('Hình ảnh không được bỏ trống!');
        image.focus();
        return;
    }

    addRowForQuanTriTable('', imagePath, name.value, price.value*1);
}