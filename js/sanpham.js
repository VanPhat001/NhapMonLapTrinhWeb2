const productId = localStorage.getItem('productId');
const product = productList[productId];
console.log(product);

document.querySelector('#product-full main').id = productId;

// hiển thị ảnh
let min = 4;
if (product.imageList.length < 4) min = product.imageList.length;
document.querySelector('.product-full__image-main').style.backgroundImage = `url(${product.imageList[0]})`;
for (let i = 0; i < min; i++)
{
    let imagePath = product.imageList[i];
    // console.log(imagePath);
    let div = document.createElement('div');
    div.id = i.toString();
    div.classList.add('img-box', 'product-full__image-sub');
    div.style.backgroundImage = `url(${imagePath})`;
    document.querySelector('.product-full__image-sub-wrap').appendChild(div);
}



$(document).ready(function () {

    $('.product-full__exchange-name').text(product.name);
    $('.product-full__exchange-price').html(
        product.price + `<u>đ</u> <span class="btn--effect">0% giảm</span>`
    );


    let ratingStr = 'Đánh giá ';
    for (let i = 1; i <= 5; i++) {
        if (i <= product.rate)
            ratingStr += `<i class="fas fa-star star-fill"></i>`;
        else
            ratingStr += `<i class="far fa-star star-no-fill"></i>`
    }
    $('.product-full__rating').html(ratingStr);


    let color = product.like ? '#e30707' : '#000';
    $('.product-full__like .fas.fa-heart').css('color', color);


    $('.product-full__like').click(function (e) {
        product.like = !product.like;
        let color = product.like ? '#e30707' : '#000';
        $('.product-full__like .fas.fa-heart').css('color', color);
    });


    // tăng số lượng sản phẩm khi nhấn nút
    const maxCountProduct = 100;
    $('.btn-product-inc').click(function (e) {
        let countProductBuy = $('.product-full__exchange-input').val();
        countProductBuy++;
        if (countProductBuy > maxCountProduct) countProductBuy = maxCountProduct;
        $('.product-full__exchange-input').val(countProductBuy);
    });


    // giảm số lượng sản phẩm khi nhấn nút
    $('.btn-product-dec').click(function (e) {
        let countProductBuy = $('.product-full__exchange-input').val();

        countProductBuy--;
        if (countProductBuy < 1) countProductBuy = 1;
        $('.product-full__exchange-input').val(countProductBuy);
    });


    // không được nhập kí tự khác số
    // số lượng sản phẩm không được vượt quá giới hạn [1.. maxCountProduct]
    $('.product-full__exchange-input').keypress(function (e) {
        if (e.key < '0' || e.key > '9') return false;
        if (this.value * 10 + e.keyCode - 48 > maxCountProduct) {
            this.value = maxCountProduct;
            return false;
        }
        return true;
    });

    $('.product-full__image-sub').hover(function () {
            // over
            let imgIndex = this.id * 1;
            $('.product-full__image-main').css('background-image', `url(${product.imageList[imgIndex]})`);
            
        }, function () {
            // out
        }
    );

    $('.destination-list .destination-item').click(function (e) { 
        $('.product-destination-text').text($(this).text());
        
    });

    $('#product-full .btn-add-basket').click(function (e) { 
        let id = document.querySelector('#product-full .main').id;
        

        const productRemain = 100;
        if (typeof localStorage[id] === 'undefined')
        {
            localStorage.setItem(id, 0);
        }
        
        let productOdd = localStorage[id]*1;
        let productCurrent = document.querySelector('#product-full .product-full__exchange-input').value*1;
        let s = productOdd + productCurrent;
        if (s > productRemain)
        {
            alert(`còn ${productRemain} sản phẩm, chỉ được thêm tối đa ${productRemain - productOdd} sản phẩm vào giỏ hàng`);
            return;
        }

        localStorage[id] = s;
        alert(`Đã thêm ${productCurrent} sản phẩm vào giỏ hàng`)
    });

});