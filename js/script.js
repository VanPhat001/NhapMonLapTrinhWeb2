// 'use strict'
var productList = {
    sp001: {
        id: 'sp001',
        name: 'Máy Chiếu Phim Mini Beecube X1 Độ Phân Giải HD',
        imageList: [
            'image/sanpham/sp1_0.jpg',
            'image/sanpham/sp1_1.jpg',
            'image/sanpham/sp1_2.jpg',
            'image/sanpham/sp1_3.jpg'
        ],
        price: 999999,
        rate: 4,
        like: true
    },
    sp002: {
        id: 'sp002',
        name: '[Mới 100%] Laptop Dell Inspiron 14 5415 (Ryzen R5-5500U, RAM 8G, SSD 256G, AMD Radeon™ Graphics, màn 14.0 Full HD, IPS)',
        imageList: [
            'image/sanpham/sp2_0.jpg',
            'image/sanpham/sp2_1.jpg',
            'image/sanpham/sp2_2.jpg',
            'image/sanpham/sp2_3.jpg'
        ],
        price: 17990000,
        rate: 5,
        like: false
    },
    sp003: {
        id: 'sp003',
        name: 'Đồng Hồ Thông Minh HUAWEI WATCH GT 3 46mm |Theo Dõi Spo2 Cả Ngày | Huấn Luyện Viên Chạy Bộ AI',
        imageList: [
            'image/sanpham/sp3_0.jpg',
            'image/sanpham/sp3_1.jpg',
            'image/sanpham/sp3_2.jpg',
            'image/sanpham/sp3_3.jpg'
        ],
        price: 6490000,
        rate: 5,
        like: false
    },
    sp004: {
        id: 'sp004',
        name: 'Máy Chiếu Phim Mini Beecube X1 Độ Phân Giải HD',
        imageList: [
            'image/sanpham/sp1_0.jpg',
            'image/sanpham/sp1_1.jpg',
            'image/sanpham/sp1_2.jpg',
            'image/sanpham/sp1_3.jpg'
        ],
        price: 999999,
        rate: 4,
        like: false
    },
    sp005: {
        id: 'sp005',
        name: 'Máy Chiếu Phim Mini Beecube X1 Độ Phân Giải HD',
        imageList: [
            'image/sanpham/sp1_0.jpg',
            'image/sanpham/sp1_1.jpg',
            'image/sanpham/sp1_2.jpg',
            'image/sanpham/sp1_3.jpg'
        ],
        price: 999999,
        rate: 2,
        like: false
    },
    sp006: {
        id: 'sp006',
        name: 'Máy Chiếu Phim Mini Beecube X1 Độ Phân Giải HD',
        imageList: [
            'image/sanpham/sp1_0.jpg',
            'image/sanpham/sp1_1.jpg',
            'image/sanpham/sp1_2.jpg',
            'image/sanpham/sp1_3.jpg'
        ],
        price: 999999,
        rate: 1,
        like: false
    },
    sp007: {
        id: 'sp007',
        name: 'Máy Chiếu Phim Mini Beecube X1 Độ Phân Giải HD',
        imageList: [
            'image/sanpham/sp1_0.jpg',
            'image/sanpham/sp1_1.jpg',
            'image/sanpham/sp1_2.jpg',
            'image/sanpham/sp1_3.jpg'
        ],
        price: 999999,
        rate: 4,
        like: false
    },
    sp008: {
        id: 'sp008',
        name: 'Máy Chiếu Phim Mini Beecube X1 Độ Phân Giải HD',
        imageList: [
            'image/sanpham/sp1_0.jpg',
            'image/sanpham/sp1_1.jpg',
            'image/sanpham/sp1_2.jpg',
            'image/sanpham/sp1_3.jpg'
        ],
        price: 999999,
        rate: 4,
        like: false
    },
    sp009: {
        id: 'sp009',
        name: 'Máy Chiếu Phim Mini Beecube X1 Độ Phân Giải HD',
        imageList: [
            'image/sanpham/sp1_0.jpg',
            'image/sanpham/sp1_1.jpg',
            'image/sanpham/sp1_2.jpg',
            'image/sanpham/sp1_3.jpg'
        ],
        price: 999999,
        rate: 4,
        like: false
    }
};

var account = [
    {taikhoan: 'user1@gmail.com', matkhau: '12345678', avatar: 'image/avatar1.jpg'},
    {taikhoan: 'user2@gmail.com', matkhau: '12345678', avatar: 'image/avatar2.jpg'},
    {taikhoan: 'user3@gmail.com', matkhau: '12345678', avatar: 'image/avatar3.jpg'},
    {taikhoan: 'user4@gmail.com', matkhau: '12345678', avatar: 'image/avatar2.png'}
];

let loginForm = document.querySelector('.form.login-form');
loginForm.onreset = function () {
    return false;
}

// Load dữ liệu cho form đăng nhập và ảnh đại diện
if (typeof localStorage['indexAccount'] !== "undefined")
{
    let indexAccount = localStorage['indexAccount'];
    if (0 <= indexAccount && indexAccount < account.length)
    {
        loginForm.username.value = account[indexAccount].taikhoan;
        loginForm.pass.value = account[indexAccount].matkhau;
        changeAvatar(indexAccount);
    }
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
            <a href="sanpham.html" id="${product.id}" class="product" target='_blank'>
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
                localStorage.setItem('indexAccount', i);
            }
            changeAvatar(i);

            frm.pass.value = '';
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


// function min(a, b) {
//     return (a < b ? a : b);
// }

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
