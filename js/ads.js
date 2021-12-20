
var adsList = [
    { 'photo': 'image/quangcao/quangcao1.jpg' },
    { 'photo': 'image/quangcao/quangcao2.jpg' },
    { 'photo': 'image/quangcao/quangcao3.jpg' },
    { 'photo': 'image/quangcao/quangcao4.jpg' },
    { 'photo': 'image/quangcao/quangcao5.jpg' }
];
let adsCurrent = 0;
let adsWrap = document.querySelector('.ads__wrap');
adsWrap.querySelector('.ads__img').style.backgroundImage = `url(${adsList[0].photo})`;
adsWrap.querySelector('.ads__img').style.animation = 'fadeIn ease 1s';

let intervalId = setInterval(showAds, 6500);

function showAds(increment = 1, animation1 = 'fadeOutToLeft', animation2 = 'fadeInToLeft') {
    // xóa quảng cáo hiện tại 
    $('.ads__img').remove();

    let div = createAds(adsCurrent);
    div.style.animation = animation1 + ' ease 0.75s';
    adsWrap.appendChild(div);

    adsCurrent += increment;
    if (adsCurrent >= adsList.length) adsCurrent = 0;
    if (adsCurrent < 0) adsCurrent = adsList.length - 1;

    // hiển thị quảng cáo mới     
    div = createAds(adsCurrent);
    div.style.animation = animation2 + ' ease 0.75s';
    adsWrap.appendChild(div);
}

function createAds(adsCurrent) {
    let div = document.createElement('div');
    let path = adsList[adsCurrent].photo;
    div.className = 'ads__img';
    div.style.backgroundImage = `url(${path})`;
    // div.style.animation = 'fadeOut ease 1s';

    return div;
}