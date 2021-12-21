// 'use strict'

let loginForm = document.querySelector('.form.login-form');
loginForm.onreset = function () {
    return false;
}

// Load avatar
if (typeof localStorage['indexAccount'] !== "undefined") {
    let path = account[localStorage['indexAccount']].avatar;
    document.getElementsByClassName('header__avatar')[0].style.backgroundImage = `url(${path})`;
}

// Load dữ liệu cho form đăng nhập nếu có lưu
if (typeof localStorage['userAccountSave'] !== "undefined" 
    && typeof localStorage['userPasswordSave'] !== "undefined")
{
    loginForm.username.value = localStorage['userAccountSave'];
    loginForm.pass.value = localStorage['userPasswordSave'];
}

function changeAvatar(indexAccount) {  
    document.querySelector('.header__avatar').style.backgroundImage = `url(${account[indexAccount].avatar})`
}

// hiển thị danh sách sản phẩm trên trang chủ
// console.log(productList);
for (const key in productList) {
    if (Object.hasOwnProperty.call(productList, key)) {
        const product = productList[key];
        // console.log('product >> ', product);

        let div = document.createElement('div');
        div.className = 'product-box';
        div.innerHTML = `
            <a href="sanpham.html" id="${product.id}" class="product">
                <div class="product--img" style="background-image: url(${product.imageList[0]})"></div>
                    <p class="product--name">${product.name}</p>
                <div class="product--price">${product.price} <u>đ</u></div>
            </a>`;

        $('.product-list').append(div);
    }
}

// tìm kiếm tài khoản khi form đăng nhập submit
function findAccount(frm) { 
    let taikhoan = frm.username.value;
    let matkhau = frm.pass.value;
    let save = frm.save.checked;

    for (let i = 0; i < account.length; i++)
    {
        let element = account[i];
        if (element.taikhoan == taikhoan && element.matkhau == matkhau)
        {
            alert('Đăng nhập thành công');

            if (save) {
                localStorage.setItem('userAccountSave', taikhoan);
                localStorage.setItem('userPasswordSave', matkhau);
            }
            localStorage.setItem('indexAccount', i);
            changeAvatar(i);

            frm.pass.value = '';
            if (element.isAdmin)
            {
                window.open('../quantri.html', '_self');
            }

            return false;
        }
    }

    alert('tài khoản hoặc mật khẩu sai');
    frm.pass.value = '';
    frm.pass.focus();
    return false; 
}

function validate(frm) {

    if (typeof frm.pass2.value !== "undefined" && frm.pass2.value != frm.pass.value)
    {
        alert('Mật khẩu không khớp!');
        frm.pass2.focus();
        return false;
    }

    alert('đăng ký thành công');
    frm.pass.value = '';
    frm.pass2.value = '';
    return false; // không cho gửi dữ liệu :)
}


$(document).ready(function () {
    // lưu thông tin để mở trang sản phẩm
    $('.product-box a.product').click(function (e) {
        // console.log(productList[this.id]);        
        localStorage.setItem('productId', this.id);
    });

    // chuyển quảng cáo
    $('.btn-left-ads').click(function (e) {
        showAds();
    });

    $('.btn-right-ads').click(function (e) {
        showAds(-1, 'fadeOutToRight', 'fadeInToRight');
    });

    // hiển thị form đăng nhập
    $('.header__btn-wrap .btn-login').click(function (e) {
        $('.background-fixed-fullscreen').css('display', 'flex');
        $('.form-login-wrapper').css('display', 'block');
    });

    // hiển thị form đăng ký
    $('.header__btn-wrap .btn-register').click(function (e) {
        $('.background-fixed-fullscreen').css('display', 'flex');
        $('.form-register-wrapper').css('display', 'block');
    });

    // đổi form đăng nhập sang đăng ký
    $('.login-form .btn-form-switch-register ').click(function (e) {
        $('.form-login-wrapper').css('display', 'none');
        $('.form-register-wrapper').css('display', 'block');
    });

    // đổi form đăng ký sang đăng nhập
    $('.register-form .btn-form-switch-login ').click(function (e) {
        $('.form-login-wrapper').css('display', 'block');
        $('.form-register-wrapper').css('display', 'none');
    });

    // đóng form
    $('.form-wrapper .btn-form-close').click(function (e) {
        // console.log(this.parentNode);
        this.parentNode.style.display = 'none';
        $('.background-fixed-fullscreen').css('display', 'none');

    });

    $('.select-language .btn-language').click(function (e) {
        $('.select-language .btn--select').removeClass('btn--select');
        $(this).addClass('btn--select');
    });
});
