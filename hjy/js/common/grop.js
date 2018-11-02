//swiper slider
new Swiper('.swiper-container', {
    direction: 'horizontal', 
    slidesPerView : 3, 
    spaceBetween :130,
    autoplay : {
        delay : 2000
    },
    loopFillGroupWithBlank : true,
    pager: true,
    speed : 1000,
    loop : true,
    effect : 'slide',
    centeredSlides: true,
    navigation : { // 좌우버튼
        nextEl : '.swiper-button-next', // 다음 버튼 클래스명
        prevEl : '.swiper-button-prev', // 이번 버튼 클래스명
    },
    pagination : { // 페이징
        el : '.swiper-pagination',
        clickable : true, // 페이징을 클릭하면 해당 영역으로 이동, 필요시 지정해 줘야 기능 작동
        type: 'bullets', // 'bullets' or 'progressbar' or 'fraction' or 'custom'
    },
});