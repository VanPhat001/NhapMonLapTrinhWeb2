let quanTriBackgroundWrapper = document.querySelector('.background-fixed-fullscreen.quantri-background-wrapper');
let quanTriTable = document.getElementById('quantri-table');
let tbody = quanTriTable.getElementsByTagName('tbody')[0];
let imagePath = '';
tbody.innerHTML = '';

for (const key in productList) {
    if (Object.hasOwnProperty.call(productList, key)) {
        const product = productList[key];        
        // console.log(product);
        addRowForQuanTriTable(product.id, product.imageList[0], product.name, product.price);
    }
}

if (typeof localStorage['indexAccount'] !== "undefined") {
    let path = account[localStorage['indexAccount']].avatar;
    document.getElementsByClassName('quantri-header__avatar')[0].style.backgroundImage = `url(${path})`;
}

$(document).ready(function () {

    $("#add-product-table__product-image").change(function (e) {
        imagePath = URL.createObjectURL(e.target.files[0]);        
    });

    $("#modify-table__product-image").change(function (e) {
        imagePath = URL.createObjectURL(e.target.files[0]);
        $('#modify-table__image').attr('src', imagePath);
    });

    $('.quantri-background-wrapper .btn-close-table').click(function (e) { 
        this.parentNode.parentNode.style.display = 'none';
    });

});


function submitInfo(e) {  
    if (e.keyCode == 13) {
        addProduct();
    }
}


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
                    </td>`

                    
    // <td class="modify">
    //     <i class="fas fa-edit btn quantri-table__modify"></i>
    // </td>
    let td = document.createElement('td');
    td.className = 'modify';
    let i = document.createElement('i');
    i.classList.add('fas', 'fa-edit', 'btn', 'quantri-table__modify');
    
    td.appendChild(i);
    tr.appendChild(td);

    i.onclick = function (e) {
        showModifyTable(tr.id);
    }
    tbody.appendChild(tr);
}


function checkData(nameInput, priceInput, quantilyInput, imageInput = null) {  
    if ( nameInput.value.trim().length == 0)
    {
        alert('Tên sản phẩm không hợp lệ!');
        nameInput.focus();
        return false;
    }

    if( isNaN(parseInt(priceInput.value)) ) {
        alert('Giá sản phẩm không hợp lệ!');
        priceInput.focus();
        return false;
    }

    if( isNaN(1 * (quantilyInput.value)) ) {
        alert('Số lượng sản phẩm không hợp lệ!');
        quantilyInput.focus();
        return false;
    }

    if( imageInput != null && imageInput.value.trim().length == 0 ) {
        alert('Hình ảnh không được bỏ trống!');
         imageInput.focus();
        return false;
    }

    return true;
}


function showModifyTable(trId) { 
    quanTriBackgroundWrapper.style.display = 'flex';
    let imagePathLocal = document.querySelector(`#${trId} .quantri-table__img`).style.backgroundImage;
    let modifyName = document.getElementById("modify-table__product-name");
    let modifyPrice = document.getElementById('modify-table__product-price');
    let modifyQuantily = document.getElementById('modify-table__product-quantily');
    let modifyImage = document.getElementById('modify-table__image');
    
    if (imagePathLocal.indexOf('url(') != -1) {
        imagePathLocal = imagePathLocal.replace('url(', '').replace(')', '');

        if (imagePathLocal[0] == `'` || imagePathLocal[imagePathLocal.length - 1] == `"`) {
            imagePathLocal = imagePathLocal.substr(1, imagePathLocal.length - 2);
        }
    }
    console.log([imagePathLocal]);

    modifyName.value = document.querySelector(`#${trId} .quantri-table__name`).textContent;
    modifyPrice.value = document.querySelector(`#${trId} .quantri-table__price`).textContent;
    modifyQuantily.value = document.querySelector(`#${trId} .quantri-table__quantily`).textContent;
    modifyImage.src = imagePathLocal;

    document.getElementsByClassName('modify-table__btn-remove')[0].onclick = function (e) {
        let tr = document.getElementById(trId);
        tr.remove();
        quanTriBackgroundWrapper.style.display = 'none';
    }

    document.getElementsByClassName('modify-table__btn-modify')[0].onclick = function (e) {
        if (!checkData(modifyName, modifyPrice, modifyQuantily)) return;

        document.querySelector(`#${trId} .quantri-table__name`).textContent = modifyName.value;
        document.querySelector(`#${trId} .quantri-table__price`).textContent = modifyPrice.value;
        document.querySelector(`#${trId} .quantri-table__quantily`).textContent = modifyQuantily.value;
        document.querySelector(`#${trId} .quantri-table__img`).style.backgroundImage = `url(${modifyImage.src})`;
        quanTriBackgroundWrapper.style.display = 'none';
    }
}


// thêm sản phẩm vào #quantri-table
let d = 0;
function addProduct() {
    let name = document.getElementById('add-product-table__product-name');    
    let price = document.getElementById('add-product-table__product-price');    
    let quantily = document.getElementById('add-product-table__product-quantily');    
    let image = document.getElementById('add-product-table__product-image');

    if (!checkData(name, price, quantily, image)) return;

    addRowForQuanTriTable('id'+d, imagePath, name.value, price.value*1);
    d++;
    name.value = price.value = quantily.value = image.value = '';
    name.focus();
}