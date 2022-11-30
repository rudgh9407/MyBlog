

function homeScroll() {
  let card_item = $(`.card_item`);
  $(card_item).each(function () {
    let self = $(this);
    let index = self.index();
    let number = $(self).find(`.p_title`);
    switch(index){
      case 0:
        $(number).text(`ABOUT ME`);
        break;
      case 4:
        $(number).text(`ABOUT ME`);
        break;
      case 1:
        $(number).text(`TIME LINE`);
        break;
      case 5:
        $(number).text(`TIME LINE`);
        break;
      case 2:
        $(number).text(`SKILL`);
        break;
      case 6:
        $(number).text(`SKILL`);
        break;
      case 3:
        $(number).text(`PROJECT`);
        break;
      case 7:
        $(number).text(`PROJECT`);
        break;
    }
    // $(number).text(`0` + (index + 1));
  });

  document.addEventListener(`readystatechange`, function () {
    if (document.readyState === `complete`) {
      const main_el = document.querySelector(`main`);
      const card_list = document.querySelector(`.card_list`);
      const items_box = document.querySelectorAll(`.card_item`);
      let mainWidth = main_el.clientWidth;
      let itemWidth = items_box[0].clientWidth;
      let wrapWidth = items_box.length * itemWidth + (mainWidth*0.08);


      let scrollSpeed = 0;
      let oldScrollY = 0;
      let scrollY = 0;
      let y = 0;

      const lerp = (v0, v1, t) => {
        return v0 * (1 - t) + v1 * t;
      };

      const update = (scroll) => {
        gsap.set(items_box, {
          x: (i) => {
            return i * (itemWidth+(mainWidth*0.01)) + scroll + (mainWidth*0.005);
          },
          modifiers: {
            x: (x, target) => {
              const s = gsap.utils.wrap(-itemWidth, wrapWidth - itemWidth, parseInt(x));
              return `${s}px`;
            }
          }
        });
      };
      update(0);

      const handleMouseWheel = (e) => {
        scrollY -= e.deltaY * 0.8;
      };

      let touchStart = 0;
      let touchX = 0;
      let isDragging = false;
      const handleTouchStart = (e) => {
        touchStart = e.clientX || e.touches[0].clientX;
        isDragging = true;
        main_el.classList.add(`is-dragging`);
      };
      const handleTouchMove = (e) => {
        if (!isDragging) return;
        touchX = e.clientX || e.touches[0].clientX;
        scrollY += (touchX - touchStart) * 5;
        touchStart = touchX;
      };
      const handleTouchEnd = () => {
        isDragging = false;
        main_el.classList.remove(`is-dragging`);
      };

      main_el.addEventListener(`mousewheel`, handleMouseWheel);

      main_el.addEventListener(`touchstart`, handleTouchStart);
      main_el.addEventListener(`touchmove`, handleTouchMove);
      main_el.addEventListener(`touchend`, handleTouchEnd);

      main_el.addEventListener(`mousedown`, handleTouchStart);
      main_el.addEventListener(`mousemove`, handleTouchMove);
      main_el.addEventListener(`mouseleave`, handleTouchEnd);
      main_el.addEventListener(`mouseup`, handleTouchEnd);

      main_el.addEventListener(`selectstart`, () => {
        return false;
      });

      window.addEventListener(`resize`, () => {
        mainWidth = main_el.clientWidth;
        itemWidth = items_box[0].clientWidth;
        wrapWidth = items_box.length * itemWidth + (mainWidth*0.08);
      });

      const render = () => {                         // setTimeout 같은 역활
        requestAnimationFrame(render);
        y = lerp(y, scrollY, 0.1);
        update(y);
        // let progress = -y / wrapWidth;
        // let fract = progress - Math.floor(progress);
        // $log.innerText = Math.round(fract * 100) + `%`;

        scrollSpeed = y - oldScrollY;
        oldScrollY = y;

        gsap.to(card_list, {
          rotate: scrollSpeed * 0.05
        });
      };
      render();

    }
  });
}

// Home Loader
function homeLoader() {
/*
  $(`#home-loader`).each(function (index) {
    gsap.set(`body`, { autoAlpha: 1, backgroundColor: `#fff` });
    let loader = $(this);
    let dot = $(`.loader__dot`);
    let dotMenu = $(`.nav__burger, .transition__dot`);
    let logo = $(`.nav__logo`);
    let logoOut = $(logo).find(`.nav__logo--out`);
    let splitLogo = $(logoOut).find(`path`);
    let tile = $(`.home__projects--tile`);
    let verticalDivider = $(`.divider.vertical`);
    let number = $(`.loader__start`);
    let startText = $(`.loader__start`).find(`.p--18px`);
    let endText = $(`.loader__end`).find(`.p--18px`);
    let home = $(`#home`);
    let title = $(home).find(`.background_text`);
    let splitTitle = new SplitText(title, {
      type: `chars, words`,
      wordsClass: `words`
    });
    let dividers = $(`.home__line--parent`).find(`.divider`);
    let lineText = $(`.home__line`).find(`.p--18px`);
    let footerItems = $(`.bot`).find(`.footer__item`);
    let customEase =
      `M0,0,C0,0,0.126,0.005,0.2,0.02,0.273,0.035,0.377,0.072,0.45,0.09,0.537,0.111,0.484,0.191,0.52,0.244,0.548,0.286,0.808,0.27,0.84,0.302,0.892,0.354,0.905,0.381,0.946,0.442,0.987,0.505,0.966,0.731,0.98,0.801,0.994,0.874,1,1,1,1`;
    let counter = {
      value: 0
    };
    let loaderDuration = 3.5;

    // If not a first time visit in this tab
    if (sessionStorage.getItem(`visited`) !== null) {
      loaderDuration = 1.5;
    }
    sessionStorage.setItem(`visited`, `true`);

    function updateLoaderText() {
      let progress = Math.round(counter.value);
      $(`.loader__start`).find(`.p--18px`).text(progress);
    }

    let tl = gsap.timeline({
      defaults: { duration: 0.8, ease: `Power4.easeOut` }
    });

    ScrollTrigger.matchMedia({
      `(min-width:1200px)`: () => {
        tl.to(counter, {
          value: 100,
          onUpdate: updateLoaderText,
          duration: loaderDuration,
          ease: CustomEase.create(`custom`, customEase)
        })
          .to(dot, { width: `130vw`, height: `130vw`, duration: loaderDuration, ease: CustomEase.create(`custom`, customEase) }, 0)
          .to(number, { x: `93.46em`, ease: CustomEase.create(`custom`, customEase), duration: loaderDuration }, 0)
          .to([startText, endText], { yPercent: -100, onComplete: loaderHide }, loaderDuration + 0.2)
          .from(splitTitle.chars, { x: `-1vw`, opacity: 0, stagger: 0.02 }, loaderDuration + 1.11)
          .from(dividers, { transformOrigin: `left`, scaleX: 0, stagger: 0.04 }, loaderDuration + 1.4)
          .from(lineText, { yPercent: 100, opacity: 0, stagger: 0.04 }, loaderDuration + 1.6)
          .from(footerItems, { yPercent: 100, opacity: 0, stagger: 0.04 }, loaderDuration + 1.8)
          .fromTo(
            tile,
            { `clip-path`: `polygon(0 0, 0% 0%, 0% 100%, 0% 100%)` },
            { `clip-path`: `polygon(0 0, 100% 0%, 100% 100%, 0% 100%)`, stagger: 0.1 },
            loaderDuration + 2
          )
          .from(verticalDivider, { transformOrigin: `bottom`, scaleY: 0, stagger: 0.1 }, loaderDuration + 2)
          .fromTo(dotMenu, { scale: 0 }, { scale: 1 }, loaderDuration + 2)
          .fromTo(splitLogo, { opacity: 0 }, { opacity: 1, stagger: 0.1 }, loaderDuration + 2.1);
      },
      `(max-width:1200px)`: () => {
        tl.to(counter, {
          value: 100,
          onUpdate: updateLoaderText,
          duration: loaderDuration,
          ease: CustomEase.create(`custom`, customEase)
        })
          .to(dot, { width: `140vh`, height: `140vh`, duration: loaderDuration, ease: CustomEase.create(`custom`, customEase) }, 0)
          .to(number, { x: `80em`, ease: CustomEase.create(`custom`, customEase), duration: loaderDuration }, 0)
          .to([startText, endText], { yPercent: -100, onComplete: loaderHide }, loaderDuration + 0.2)
          .from(splitTitle.chars, { x: `-1vw`, opacity: 0, stagger: 0.02 }, loaderDuration + 1.11)
          .from(dividers, { transformOrigin: `left`, scaleX: 0, stagger: 0.04 }, loaderDuration + 1.4)
          .from(lineText, { yPercent: 100, opacity: 0, stagger: 0.04 }, loaderDuration + 1.6)
          .from(footerItems, { yPercent: 100, opacity: 0, stagger: 0.04 }, loaderDuration + 1.8)
          .fromTo(
            tile,
            { `clip-path`: `polygon(0 0, 0% 0%, 0% 100%, 0% 100%)` },
            { `clip-path`: `polygon(0 0, 100% 0%, 100% 100%, 0% 100%)`, stagger: 0.1 },
            loaderDuration + 2
          )
          .from(verticalDivider, { transformOrigin: `bottom`, scaleY: 0, stagger: 0.1 }, loaderDuration + 2)
          .fromTo(dotMenu, { scale: 0 }, { scale: 1 }, loaderDuration + 2)
          .from(splitLogo, { opacity: 0, stagger: 0.1 }, loaderDuration + 2.1);
      }
    });

    function loaderHide() {
      $(loader).css(`display`, `none`);
    }
  });

  */

  const home_page = document.querySelector(`.home_page`);
  const items = document.querySelectorAll(`.card_item`);
  const title = document.querySelector(`.background_text`);
  const bar = document.querySelectorAll(`.background_area_2>div`);
  const gnb_main = document.querySelector(`.gnb_main`);
  const load_page = document.querySelector(`.loading_page`);
  const load_box = document.querySelector(`.loading_box`);
  let gsap_ld = gsap.timeline({
    defaults: { duration: 2, ease: "expo.inOut" }
  });
  gsap.set(home_page, { display: 'block' })
  gsap.set('body', { backgroundColor: `#FFF` });
  
  function home_load(){
    let gsap_tl = gsap.timeline({
      defaults: { ease: `Power4.easeOut` }
    });
    gsap_tl.fromTo( title,
      { "clip-path": "polygon(0 0, 0% 0%, 0% 110%, 0% 110%)" },
      { "clip-path": "polygon(0 0, 110% 0%, 110% 110%, 0% 110%)", stagger: 0.1, duration: 1.5 }
    )
    .fromTo( bar,
      { "clip-path": "polygon(0 0, 0% 0%, 0% 110%, 0% 110%)" },
      { "clip-path": "polygon(0 0, 110% 0%, 110% 110%, 0% 110%)", stagger: 0.1, duration: 0.5 }
    )
    .fromTo( items,
      { "clip-path": "polygon(0 0, 0% 0%, 0% 110%, 0% 110%)" },
      { "clip-path": "polygon(0 0, 110% 0%, 110% 200%, 0% 110%)", stagger: 0.1, duration: 0.5 }
    );
    gsap.to( gnb_main,
      { delay: 2.5, opacity: '1', pointerEvents: 'all' }
    );
  }

  gsap_ld.fromTo(load_box, 
    { width: '0', height: '0', top: '50%', left: '50%' },
    { width: '300vh', height: '300vh', top: 'calc(50% - 150vh)', left: 'calc(50% - 150vh)', onComplete: home_load}
  );
  gsap.set(load_page, { display: 'none', delay: 2 });
  


}

// Antoher Event
function anotherEvent() {
  
  const body_el = document.querySelector(`body`);
  const main_el = document.querySelector(`main`);
  const gnb_text = document.querySelector(`.gnb_text`);
  const gnb_main = document.querySelector(`.gnb_main`);
  const gnb_close = document.querySelector(`.gnb_text>i`);
  const gnb_items = $(`.gnb_text>p`);
  const gnb_home = document.querySelector(`.gnb_text>p:nth-child(1)`);
  const gnb_about = document.querySelector(`.gnb_text>p:nth-child(2)`);
  const gnb_time = document.querySelector(`.gnb_text>p:nth-child(3)`);
  const gnb_skill = document.querySelector(`.gnb_text>p:nth-child(4)`);
  const gnb_project = document.querySelector(`.gnb_text>p:nth-child(5)`);

  const card_1 = document.querySelectorAll(`.inner_box_1`);
  const card_2 = document.querySelectorAll(`.inner_box_2`);
  const card_3 = document.querySelectorAll(`.inner_box_3`);
  const card_4 = document.querySelectorAll(`.inner_box_4`);
  const card_items = $(`.card_item>article:first-child`);
  const back_page = document.querySelector(`.background_page`);
  const home_page = document.querySelector(`.home_page`);
  const about_page = document.querySelector(`.about_page`);
  const time_page = document.querySelector(`.time_page`);
  const skill_page = document.querySelector(`.skill_page`);
  const project_page = document.querySelector(`.project_page`);

  const skill_items = $(`.left_skill>section>article`);
  const skill_right = document.querySelector(`.right_skill`);
  const skill_back = document.querySelector(`.skill_back`);
  const skill_arr = [
    "../img/html5-icon.png",
    "../img/css3-icon.png", 
    "../img/js-icon.png", 
    "../img/jquery-icon.png", 
    "../img/pug-icon.png", 
    "../img/sass-icon.png", 
    "../img/java-icon.png", 
    "../img/nodejs-icon.png", 
    "../img/mysql-icon.png", 
    "../img/kotlin-icon.png", 
    "../img/python-icon.png", 
    "../img/photoshop-icon.png"
  ];
  const skill_desc_arr = [
    "<p>html</p><p>htmlhtml</p><p>htmlhtmlhtml</p>",
    "<p>css</p><p>csscss</p><p>csscss</p>",
    "<p>js</p><p>jsjs</p><p>jsjsjs</p>",
    "<p>jq</p><p>jqjq</p><p>jqjqjq</p>",
    "<p>pug</p><p>pugpug</p><p>pugpugpug</p>",
    "<p>sass</p><p>sasssass</p><p>sasssasssass</p>",
    "<p>java</p><p>javajava</p><p>javajavajava</p>",
    "<p>node</p><p>nodenode</p><p>nodenodenode</p>",
    "<p>sql</p><p>sqlsql</p><p>sqlsqlsql</p>",
    "<p>kotlin</p><p>kotlinkotlin</p><p>kotlinkotlinkotlin</p>",
    "<p>python</p><p>pythonpython</p><p>pythonpythonpython</p>",
    "<p>ps</p><p>psps</p><p>pspsps</p>"
  ];

  let gsap_tl_1 = gsap.timeline({
    defaults: { duration: 0.5, ease: `Power4.easeOut` }
  });
  let gsap_tl_2 = gsap.timeline({
    defaults: { duration: 1, ease: `Power4.easeOut` }
  });

  let gnb_flag = 0;

  function gnb_click_open() {  
    if(gnb_flag == 0){
      $(gnb_main).css({cursor: `auto`, pointerEvents: `none`});
      $(gnb_text).css({pointerEvents: `all`});
      gsap_tl_1.fromTo(gnb_main, 
        { width: '5vh', height: '5vh', top: '3vh', right: '3vh' },
        { width: '60vh', height: '60vh', top: '-24.5vh', right: '-24.5vh' }
      )
      .fromTo(gnb_text,
        { display: 'none', right: '-20vh', top: '-10vh' },
        { display: 'flex', right: '2vh', top: '7vh' }
      )
      gnb_flag = 1;
    }
  }

  function gnb_click_close(){
    if(gnb_flag != 0){
      $(gnb_main).css({cursor: `pointer`, pointerEvents: `all`});
      gsap_tl_1.fromTo(gnb_text,
        { display: 'flex', right: '2vh', top: '7vh' },
        { display: 'none', right: '-20vh', top: '-10vh' }
      )
        .fromTo(gnb_main, 
          { width: '60vh', height: '60vh', top: '-24.5vh', right: '-24.5vh' },
          { width: '5vh', height: '5vh', top: '3vh', right: '3vh' }
        )
      gnb_flag = 0;
    }
  }

  function change_page(ta){
    if(gnb_flag != 0){
      $(gnb_main).css({cursor: `pointer`, pointerEvents: `all`});
      gsap_tl_1.fromTo(gnb_text,
        { display: 'flex', right: '2vh', top: '7vh' },
        { display: 'none', right: '-20vh', top: '-10vh' }
      );
      gsap_tl_2.fromTo(gnb_main,
        { width: '60vh', height: '60vh', top: '-24.5vh', right: '-24.5vh' },
        { width: '500vh', height: '500vh', top: '-244.5vh', right: '-244.5vh' }
      )
        .fromTo(gnb_main,
          { width: '500vh', height: '500vh', top: '-244.5vh', right: '-244.5vh' },
          { width: '5vh', height: '5vh', top: '3vh', right: '3vh' }
        );
      gnb_flag = 0;
    } else {
      gsap_tl_2.fromTo(gnb_main,
        { width: '5vh', height: '5vh', top: '3vh', right: '3vh' },
        { width: '500vh', height: '500vh', top: '-244.5vh', right: '-244.5vh' }
      )
        .fromTo(gnb_main,
          { width: '500vh', height: '500vh', top: '-244.5vh', right: '-244.5vh' },
          { width: '5vh', height: '5vh', top: '3vh', right: '3vh' }
        );
    }
    gsap.to(home_page, { delay: .5, display: 'none' });
    gsap.to(back_page, { delay: .5, display: 'none' });
    gsap.to(about_page, { delay: .5, display: 'none' });
    gsap.to(time_page, { delay: .5, display: 'none' });
    gsap.to(skill_page, { delay: .5, display: 'none' });
    gsap.to(project_page, { delay: .5, display: 'none' });
    switch(ta){
      case 0:
        gsap.to(home_page, { delay: 1, display: 'block' });
        gsap.to(back_page, { delay: 1, display: 'block' });
        break;
      case 1:
        gsap.to(about_page, { delay: 1, display: 'block' });
        break;
      case 2:
        gsap.to(time_page, { delay: 1, display: 'block' });
        break;
      case 3:
        gsap.to(skill_page, { delay: 1, display: 'block' });
        break;
      case 4:
        gsap.to(project_page, { delay: 1, display: 'block' });
        break;
    }
  }

  // function hover_card(ta){
  //   let img_item_1 = document.querySelector(`${ta}>.img_item_1`);
  //   let img_item_2 = document.querySelector(`${ta}>.img_item_2`);
  //   let img_item_3 = document.querySelector(`${ta}>.img_item_3`);
  //   let img_item_4 = document.querySelector(`${ta}>.img_item_4`);
  //   let img_item_5 = document.querySelector(`${ta}>.img_item_5`);
  //   let img_item_6 = document.querySelector(`${ta}>.img_item_6`);
  //   let img_item_7 = document.querySelector(`${ta}>.img_item_7`);
  //   let img_item_8 = document.querySelector(`${ta}>.img_item_8`);
  //   let img_item_9 = document.querySelector(`${ta}>.img_item_9`);
  //   let img_item_10 = document.querySelector(`${ta}>.img_item_10`);
  //   let card_text = document.querySelector(`${ta}+article`);
  //   let el_arr = $(`${ta}>article`);
  //   let gsap_img = gsap.timeline({
  //     defaults: { duration: 0.1, ease: Power4.easeOut }
  //   });
  //   $(el_arr).each(function(){
  //     gsap.set(this, {left: '100%'})
  //   })
  //   gsap_img.fromTo(img_item_1, { left: '100%' }, { left: '0%' })
  //     .fromTo(img_item_2, { left: '100%' }, { left: '0%' })
  //     .fromTo(img_item_3, { left: '100%' }, { left: '0%' })
  //     .fromTo(img_item_4, { left: '100%' }, { left: '0%' })
  //     .fromTo(img_item_5, { left: '100%' }, { left: '0%' })
  //     .fromTo(img_item_6, { left: '100%' }, { left: '0%' })
  //     .fromTo(img_item_7, { left: '100%' }, { left: '0%' })
  //     .fromTo(img_item_8, { left: '100%' }, { left: '0%' })
  //     .fromTo(img_item_9, { left: '100%' }, { left: '0%' })
  //     .fromTo(img_item_10, { left: '100%' }, { left: '0%' })
  //   gsap.to(card_text, {duration: 0.5, delay: 0.5, color: "#FFF", top: '50%'});
  // }






  gnb_main.addEventListener(`click`, gnb_click_open);

  gnb_close.addEventListener('click', gnb_click_close);

  $(gnb_items).each(function(){
    this.addEventListener(`click`, function(e){
      e.stopPropagation()
      switch(e.target){
        case gnb_home:
          change_page(0);
          break;
        case gnb_about:
          change_page(1);
          break;
        case gnb_time:
          change_page(2);
          break;
        case gnb_skill:
          change_page(3);
          break;
        case gnb_project:
          change_page(4);
          break;
      }
    });
  })  


  $(card_items).each(function(){
    this.addEventListener(`click`, function(e){
      switch(e.target.className){
        case "inner_box_1":
          change_page(1);
          break;
        case "inner_box_2":
          change_page(2);
          break;
        case "inner_box_3":
          change_page(3);
          break;
        case "inner_box_4":
          change_page(4);
          break;
      }
    });
  })
  
  $(skill_items).each(function(i){
    this.addEventListener("mouseenter", function(e){
      $(`.skill_detail`).html(skill_desc_arr[i]);
      gsap.set(skill_back, {backgroundImage: `url(${skill_arr[i]})`})
      gsap.fromTo(this, 
        {filter: 'grayscale(100%)'},
        {filter: 'grayscale(0%)', ease: 'Power4.easeOut'}
      )
      gsap.fromTo(skill_right, 
        {transform: 'scale(0)'},
        {transform: 'scale(1)', ease: 'Power4.easeOut'}
      )
    });
    this.addEventListener('mouseleave', function(e){
      gsap.set(skill_back, {backgroundImage: `url(${skill_arr[i]})`})
      gsap.fromTo(this, 
        {filter: 'grayscale(0%)'},
        {filter: 'grayscale(100%)', ease: 'Power4.easeOut'}
      )
      gsap.fromTo(skill_right, 
        {transform: 'scale(1)'},
        {transform: 'scale(0)', ease: 'Power4.easeOut'}
      )
    })
  })
  


}

function hover_card() {
  $(".card_item>article").each(function () {
    let parent = $(this);
    let img = $(parent).find(".img_item");
    let lastImg = $(parent).find(".img_item_1");
    let title = $(parent).find(".p_title");
    let overlay = $(parent).find(".img_over");
    
    let tl_img = gsap.timeline({
      paused: true,
      defaults: {
        ease: 'Power4.easeOut',
        stagger: { each: 0.1, from: "end" },
        duration: 0.8
      }
    });

    tl_img.to(overlay, { opacity: 0 })
      .to(img, { transformOrigin: "center", scale: 0 }, "-=75%")
      .from(lastImg, { transformOrigin: "center", scale: 1.5, duration: 1.6 }, "<")
      .to(title, { stagger: 0.02, yPercent: -110, opacity: 0, color: "#FFF" }, 0)

    $(this).on("mouseenter", function () {
      tl_img.timeScale(1).restart();
    });

    $(this).on("mouseleave", function () {
      tl_img.timeScale(1.2).reverse();
    });
  });
}


function action_project() {

  const img_arr = [
    "../img/matrix_img.jpg",
    "../img/tetris_img.jpg",
    "../img/cloud_img.jpg",
    "../img/hanoi_img.jpg",
    "../img/working-img.jpg",
    "../img/working-img.jpg"
  ];
  const url_arr = [
    "http://kkms4001.iptime.org/~c16st10/matrix_calculator/build/html/matrix_calculator.html",
    "http://kkms4001.iptime.org:30101/tetris",
    "http://kkms4001.iptime.org:30102/cloudhttps://www.naver.com",
    "http://kkms4001.iptime.org/~c16st10/hanoi_tower/build/html/hanoi.html",
    "https://www.naver.com",
    "https://www.naver.com"
  ];
  const pdf_arr = [];
  const desc_arr = [
    "<p>MATRIX CALCULATOR<p><p>설명 2222222<p><p>설명 333333333<p>",
    "<p>TETRIS GAME<p><p>설명 2222222<p><p>설명 333333333<p>",
    "<p>CLOUD SERVER<p><p>설명 2222222<p><p>설명 333333333<p>",
    "<p>TOWER OF HANOI<p><p>설명 2222222<p><p>설명 333333333<p>",
    "",
    ""
  ];
  const use_icon = [
    "../img/html5-icon.png",    // 0
    "../img/css3-icon.png",   // 1
    "../img/js-icon.png",     // 2
    "../img/jquery-icon.png",     // 3 
    "../img/pug-icon.png",    // 4
    "../img/sass-icon.png",     // 5
    "../img/java-icon.png",     // 6
    "../img/nodejs-icon.png",     // 7
    "../img/mysql-icon.png",    // 8
    "../img/kotlin-icon.png",     // 9
    "../img/python-icon.png",     // 10
    "../img/photoshop-icon.png"   // 11
  ];
  const desc_pro_1 = `
    <article><div style="background: url(${use_icon[0]}) no-repeat center center / contain"></div><p>HTML5</p></article>
    <article><div style="background: url(${use_icon[1]}) no-repeat center center / contain"></div><p>CSS3</p></article>
    <article><div style="background: url(${use_icon[2]}) no-repeat center center / contain"></div><p>JavaScript</p></article>
    <article><div style="background: url(${use_icon[3]}) no-repeat center center / contain"></div><p>jQuery</p></article>
    <article><div style="background: url(${use_icon[4]}) no-repeat center center / contain"></div><p>PUG</p></article>
    <article><div style="background: url(${use_icon[5]}) no-repeat center center / contain"></div><p>SASS</p></article>
  `;
  const desc_pro_2 = `
    <article><div style="background: url(${use_icon[0]}) no-repeat center center / contain"></div><p>HTML5</p></article>
    <article><div style="background: url(${use_icon[1]}) no-repeat center center / contain"></div><p>CSS3</p></article>
    <article><div style="background: url(${use_icon[2]}) no-repeat center center / contain"></div><p>JavaScript</p></article>
    <article><div style="background: url(${use_icon[3]}) no-repeat center center / contain"></div><p>jQuery</p></article>
    <article><div style="background: url(${use_icon[4]}) no-repeat center center / contain"></div><p>PUG</p></article>
    <article><div style="background: url(${use_icon[5]}) no-repeat center center / contain"></div><p>SASS</p></article>
    <article><div style="background: url(${use_icon[7]}) no-repeat center center / contain"></div><p>NodeJS</p></article>
    <article><div style="background: url(${use_icon[8]}) no-repeat center center / contain"></div><p>MySQL</p></article>
  `;
  const desc_pro_3 = `
    <article><div style="background: url(${use_icon[0]}) no-repeat center center / contain"></div><p>HTML5</p></article>
    <article><div style="background: url(${use_icon[1]}) no-repeat center center / contain"></div><p>CSS3</p></article>
    <article><div style="background: url(${use_icon[2]}) no-repeat center center / contain"></div><p>JavaScript</p></article>
    <article><div style="background: url(${use_icon[3]}) no-repeat center center / contain"></div><p>jQuery</p></article>
    <article><div style="background: url(${use_icon[4]}) no-repeat center center / contain"></div><p>PUG</p></article>
    <article><div style="background: url(${use_icon[5]}) no-repeat center center / contain"></div><p>SASS</p></article>
    <article><div style="background: url(${use_icon[7]}) no-repeat center center / contain"></div><p>NodeJS</p></article>
    <article><div style="background: url(${use_icon[8]}) no-repeat center center / contain"></div><p>MySQL</p></article>
  `;
  const desc_pro_4 = `
    <article><div style="background: url(${use_icon[0]}) no-repeat center center / contain"></div><p>HTML5</p></article>
    <article><div style="background: url(${use_icon[1]}) no-repeat center center / contain"></div><p>CSS3</p></article>
    <article><div style="background: url(${use_icon[2]}) no-repeat center center / contain"></div><p>JavaScript</p></article>
    <article><div style="background: url(${use_icon[3]}) no-repeat center center / contain"></div><p>jQuery</p></article>
    <article><div style="background: url(${use_icon[4]}) no-repeat center center / contain"></div><p>PUG</p></article>
    <article><div style="background: url(${use_icon[5]}) no-repeat center center / contain"></div><p>SASS</p></article>
  `;
  const use_desc = [desc_pro_1, desc_pro_2, desc_pro_3, desc_pro_4, '', ''];



  const project_items = $(`.main_project>section>article`);
  const detail_project = document.querySelector(`.detail_project`);
  const pop_main = document.querySelector(`.project_popup`);
  const btn_site = document.querySelector(`.go_site`);
  const btn_pdf = document.querySelector(`.go_pdf`);
  const left_line = document.querySelector(`.right_pop>div`);
  const left_text = document.querySelector(`.right_pop>p`);
  const rt_pop = document.querySelector(`.rt_pop`);
  const rb_pop = document.querySelector(`.rb_pop`);
  const close_pop = document.querySelector(`.right_pop>i`);


  let tl_pro = gsap.timeline({
    paused: true,
    defaults: {
      ease: 'Power4.easeOut',
      stagger: { each: 0.1, from: "end" },
      duration: 0.8
    }
  });

  tl_pro.fromTo(detail_project, 
    { transform: 'scale(0)', top: '100%' },
    { transform: 'scale(1)', top: '0%' }
  )
  
  $(project_items).each(function(i){
    this.addEventListener('click', function(e){
      if(i > 3){
        gsap.set([btn_site, btn_pdf, left_line, left_text], {opacity: '0', visibility: 'hidden'});
      } else {
        gsap.set([btn_site, btn_pdf, left_line, left_text], {opacity: '1', visibility: 'visible'});
      }
      gsap.set(pop_main, { background: `url(${img_arr[i]}) no-repeat center center #FFF` });
      $(rt_pop).html(`${desc_arr[i]}`)
      $(rb_pop).html(`${use_desc[i]}`)
      $(btn_site).one('click',function(e){
        window.open(url_arr[i]);
      })
      tl_pro.timeScale(1).restart();
    })
  })
  close_pop.addEventListener('click', function(e){
    $(btn_site).removeAttr("onclick");
    tl_pro.timeScale(1.5).reverse();
  })


}


homeScroll();
homeLoader();
anotherEvent();
hover_card();
action_project();