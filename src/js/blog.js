//--- Scroll Event ---//
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

//--- Home Loading Event ---//
function homeLoader() {
  
  const home_page = document.querySelector(`.home_page`);
  const items = document.querySelectorAll(`.card_item`);
  const title = document.querySelector(`.background_text`);
  const bar = document.querySelectorAll(`.background_area_2>div`);
  const gnb_main = document.querySelector(`.gnb_main`);
  const load_page = document.querySelector(`.loading_page`);
  const load_box = document.querySelector(`.loading_box`);
  let gsap_ld = gsap.timeline({
    defaults: { duration: 2, ease: "Power4.easeIn" }
    // defaults: { duration: 2, ease: "expo.inOut" }
  });
  gsap.set(home_page, { display: 'block' })
  gsap.set('body', { backgroundColor: `#FFF` });
  
  function home_load(){
    gsap.fromTo( [title, bar],
      { "clip-path": "polygon(0 0, 0% 0%, 0% 110%, 0% 110%)" },
      { "clip-path": "polygon(0 0, 110% 0%, 110% 110%, 0% 110%)", stagger: 0.4, duration: 1.5, ease: `Power4.easeOut` }
    );
    gsap.fromTo( items,
      { "clip-path": "polygon(0 0, 0% 0%, 0% 110%, 0% 110%)" },
      { "clip-path": "polygon(0 0, 110% 0%, 110% 200%, 0% 110%)", stagger: 0.15, duration: 0.5, delay: 1.3, ease: `Power4.easeOut` }
    );
    gsap.to( gnb_main,
      { delay: 2, opacity: '1', pointerEvents: 'all' }
    );
  }

  gsap_ld.fromTo(load_box, 
    { width: '0', height: '0', top: '50%', left: '50%' },
    { width: '300vh', height: '300vh', top: 'calc(50% - 150vh)', left: 'calc(50% - 150vh)', onComplete: home_load}
  );
  gsap.set(load_page, { display: 'none', delay: 2 });
  
}

//--- Another Event ---//
function anotherEvent() {
  
  //--- BASE ELEMENT ---//
  let win_width = window.innerWidth;
  let view_page = 0;
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
  gnb_main.addEventListener(`click`, gnb_click_open);
  gnb_close.addEventListener('click', gnb_click_close);
  $(gnb_items).each(function(){
    this.addEventListener(`click`, function(e){
      e.stopPropagation()
      switch(e.target){
        case gnb_home:
          view_page = 0;
          change_page(0);
          break;
        case gnb_about:
          view_page = 1;
          change_page(1);
          break;
        case gnb_time:
          view_page = 2;
          change_page(2);
          break;
        case gnb_skill:
          view_page = 3;
          change_page(3);
          break;
        case gnb_project:
          view_page = 4;
          change_page(4);
          break;
      }
      gsap.set(gnb_items, { color: '#FFF', filter: 'none', x: 0 });
      switch(view_page){
        case 0:
          gsap.set(gnb_home, {color: '#444', filter: `drop-shadow(0.2vw 0.2vw 0 rgba(255,255,255,0.3))`, x: '-1vh'});
          break;
        case 1:
          gsap.set(gnb_about, {color: '#444', filter: `drop-shadow(0.2vw 0.2vw 0 rgba(255,255,255,0.3))`, x: '-1vh'});
          break;
        case 2:
          gsap.set(gnb_time, {color: '#444', filter: `drop-shadow(0.2vw 0.2vw 0 rgba(255,255,255,0.3))`, x: '-1vh'});
          break;
        case 3:
          gsap.set(gnb_skill, {color: '#444', filter: `drop-shadow(0.2vw 0.2vw 0 rgba(255,255,255,0.3))`, x: '-1vh'});
          break;
        case 4:
          gsap.set(gnb_project, {color: '#444', filter: `drop-shadow(0.2vw 0.2vw 0 rgba(255,255,255,0.3))`, x: '-1vh'});
          break;
      }
    });
  })  

  //--- HOME ELEMENT ---//
  const card_1 = document.querySelectorAll(`.inner_box_1`);
  const card_2 = document.querySelectorAll(`.inner_box_2`);
  const card_3 = document.querySelectorAll(`.inner_box_3`);
  const card_4 = document.querySelectorAll(`.inner_box_4`);
  const card_items = $(`.card_item>article:first-child`);
  const back_page = document.querySelector(`.background_page`);
  const home_page = document.querySelector(`.home_page`);
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

  //--- ABOUT ELEMENT ---//
  const about_page = document.querySelector(`.about_page`);
  const sub_about_items = $(`.sub_about>article`);
  const right_bar = document.querySelector(`.right_about>div`);
  const rt_text = $(`.rt_about>p`);
  const rb_text = $(`.rb_about>p`);
  let about_text_tl = gsap.timeline({
    paused: true,
    defaults: {
      ease: 'Power4.easeOut',
      stagger: { each: 0.1, from: "end" },
      duration: 0.8
    }
  });
  about_text_tl.to(right_bar, { transform: 'scaleX(1)', delay: 1.5 })
    .to([rt_text, rb_text], { transform: 'translateY(0)', stagger: 0.5, duration: 0.9 })
  function about_func(){
    const img_boxs = $(`.left_about>article>div`);
    let about_tl = gsap.timeline({ defaults: { duration: 3, ease: "Power4.easeOut", repeat: -1 } })
    gsap.set(img_boxs[0], { backgroundImage: "url('../img/photo.jpeg')" });
    gsap.set(img_boxs[4], { backgroundImage: "url('../img/photo.jpeg')" });
    gsap.set(img_boxs[3], { backgroundImage: "url('../img/photo2.jpeg')" });
    gsap.set(img_boxs[2], { backgroundImage: "url('../img/photo3.jpeg')" });
    gsap.set(img_boxs[1], { backgroundImage: "url('../img/photo4.jpeg')" });
    about_tl.to([img_boxs[4], img_boxs[3], img_boxs[2], img_boxs[1]], { opacity: '0' , stagger: 3})

    $(sub_about_items).each(function(_index){
      this.addEventListener('click', function(e){
        switch(_index){
          case 0:
            window.open("mailto: rudgh9407@gmail.com");
            break;
          case 1:
            window.open("https://open.kakao.com/o/sQ5tqPFe");
            break;
          case 2:
            window.open("tel: 010-3326-9750");
            break;
        }
      })
    })
  }


  //--- TIME ELEMENT ---//
  const time_page = document.querySelector(`.time_page`);
  const time_left_bar = document.querySelector(`.time_left>article:nth-child(1)`);
  const time_left_circle = document.querySelector(`.time_left>article:nth-child(2)`);
  const time_left_img = document.querySelector(`.time_left>article:nth-child(2)>div`);
  const time_bar = document.querySelector(`.center_line`);
  const time_bar_circles = $(`.line_dot>div`);
  const n1_dot_line = document.querySelector(`.time_box_1>article:nth-child(2)>div`);
  const n2_dot_line = document.querySelector(`.time_box_2>article:nth-child(1)>div`);
  const n3_dot_line = document.querySelector(`.time_box_3>article:nth-child(2)>div`);
  const n4_dot_line = document.querySelector(`.time_box_4>article:nth-child(1)>div`);
  const n1_text_top = document.querySelector(`.time_box_1>article:nth-child(2)>p:nth-child(1)`);
  const n1_text_bot = document.querySelector(`.time_box_1>article:nth-child(2)>p:nth-child(3)`);
  const n2_text_top = document.querySelector(`.time_box_2>article:nth-child(1)>p:nth-child(1)`);
  const n2_text_bot = document.querySelector(`.time_box_2>article:nth-child(1)>p:nth-child(3)`);
  const n3_text_top = document.querySelector(`.time_box_3>article:nth-child(2)>p:nth-child(1)`);
  const n3_text_bot = document.querySelector(`.time_box_3>article:nth-child(2)>p:nth-child(3)`);
  const n4_text_top = document.querySelector(`.time_box_4>article:nth-child(1)>p:nth-child(1)`);
  const n4_text_bot = document.querySelector(`.time_box_4>article:nth-child(1)>p:nth-child(3)`);
  const n1_circle = document.querySelector(`.time_box_1>article:nth-child(1)`);
  const n1_img = document.querySelector(`.time_box_1>article:nth-child(1)>i`);
  const n2_circle = document.querySelector(`.time_box_2>article:nth-child(2)`);
  const n2_img = document.querySelector(`.time_box_2>article:nth-child(2)>i`);
  const n3_circle = document.querySelector(`.time_box_3>article:nth-child(1)`);
  const n3_img = document.querySelector(`.time_box_3>article:nth-child(1)>i`);
  const n4_circle = document.querySelector(`.time_box_4>article:nth-child(2)`);
  const n4_img = document.querySelector(`.time_box_4>article:nth-child(2)>i`);
  const license_name = document.querySelector(`.license_area>article`);
  const license_bar = document.querySelector(`.license_area>div`);
  const license_desc = document.querySelector(`.license_area>ul`);

  const time_tl = gsap.timeline({
    paused: true,
    defaults: { duration: 0.3, ease: "Power4.easeOut" }
  })
  if(win_width < 768) {
    time_tl.to(time_left_bar, { width: '100vw', delay: 2 })
      .to(time_left_circle, { y: '0vw' })
      .to(time_left_img, { transform: 'scale(1)' })
      .to(time_bar, { height: '100%' }) // 0%
      .to(time_bar_circles[0], { transform: 'scale(1)' })  // scale(0)
      .to(n1_dot_line, { x: '0%' }) // 100%
      .to(n1_text_top, { y: '0%' }) // -100%
      .to(n1_text_bot, { y: '0%' }) // 100%
      .to([n1_circle, n1_img], { transform: 'scale(1)' })  // scale(0)
      .to(time_bar_circles[1], { transform: 'scale(1)' })  // scale(0)
      .to(n2_dot_line, { x: '0%' }) // -100%
      .to(n2_text_top, { y: '0%' }) // -100%
      .to(n2_text_bot, { y: '0%' }) // 100%
      .to([n2_circle, n2_img], { transform: 'scale(1)' })  // scale(0)
      .to(time_bar_circles[2], { transform: 'scale(1)' })  // scale(0)
      .to(n3_dot_line, { x: '0%' }) // 100%
      .to(n3_text_top, { y: '0%' }) // -100%
      .to(n3_text_bot, { y: '0%' }) // 100%
      .to([n3_circle, n3_img], { transform: 'scale(1)' })  // scale(0)
      .to(time_bar_circles[3], { transform: 'scale(1)' })  // scale(0)
      .to(n4_dot_line, { x: '0%' }) // -100%
      .to(n4_text_top, { y: '0%' }) // -100%
      .to(n4_text_bot, { y: '0%' }) // 100%
      .to([n4_circle, n4_img], { transform: 'scale(1)' })  // scale(0)
      .to(license_name, { transform: 'scale(1)' }) // scale(0)
      .to(license_bar, { transform: 'scale(1)' }) // scale(0)
      .to(license_desc, { transform: 'scale(1)' });  // scale(0)
  } else if(win_width < 1024) {
    time_tl.to(time_left_bar, { width: '100vw', delay: 2 })
      .to(time_left_circle, { y: '0vw' })
      .to(time_left_img, { transform: 'scale(1)' })
      .to(time_bar, { height: '100%' }) // 0%
      .to(time_bar_circles[0], { transform: 'scale(1)' })  // scale(0)
      .to(n1_dot_line, { x: '0%' }) // 100%
      .to(n1_text_top, { y: '0%' }) // -100%
      .to(n1_text_bot, { y: '0%' }) // 100%
      .to([n1_circle, n1_img], { transform: 'scale(1)' })  // scale(0)
      .to(time_bar_circles[1], { transform: 'scale(1)' })  // scale(0)
      .to(n2_dot_line, { x: '0%' }) // -100%
      .to(n2_text_top, { y: '0%' }) // -100%
      .to(n2_text_bot, { y: '0%' }) // 100%
      .to([n2_circle, n2_img], { transform: 'scale(1)' })  // scale(0)
      .to(time_bar_circles[2], { transform: 'scale(1)' })  // scale(0)
      .to(n3_dot_line, { x: '0%' }) // 100%
      .to(n3_text_top, { y: '0%' }) // -100%
      .to(n3_text_bot, { y: '0%' }) // 100%
      .to([n3_circle, n3_img], { transform: 'scale(1)' })  // scale(0)
      .to(time_bar_circles[3], { transform: 'scale(1)' })  // scale(0)
      .to(n4_dot_line, { x: '0%' }) // -100%
      .to(n4_text_top, { y: '0%' }) // -100%
      .to(n4_text_bot, { y: '0%' }) // 100%
      .to([n4_circle, n4_img], { transform: 'scale(1)' })  // scale(0)
      .to(license_name, { transform: 'scale(1)' }) // scale(0)
      .to(license_bar, { transform: 'scale(1)' }) // scale(0)
      .to(license_desc, { transform: 'scale(1)' });  // scale(0)
  } else {
    time_tl.to(time_left_bar, { height: '100%', delay: 2 })  // 0%
      .to(time_left_circle, { x: '0vw' })  // -20vw
      .to(time_left_img, { transform: 'scale(1)' })  // scale(0)
      .to(time_bar, { height: '100%' }) // 0%
      .to(time_bar_circles[0], { transform: 'scale(1)' })  // scale(0)
      .to(n1_dot_line, { x: '0%' }) // 100%
      .to(n1_text_top, { y: '0%' }) // -100%
      .to(n1_text_bot, { y: '0%' }) // 100%
      .to([n1_circle, n1_img], { transform: 'scale(1)' })  // scale(0)
      .to(time_bar_circles[1], { transform: 'scale(1)' })  // scale(0)
      .to(n2_dot_line, { x: '0%' }) // -100%
      .to(n2_text_top, { y: '0%' }) // -100%
      .to(n2_text_bot, { y: '0%' }) // 100%
      .to([n2_circle, n2_img], { transform: 'scale(1)' })  // scale(0)
      .to(time_bar_circles[2], { transform: 'scale(1)' })  // scale(0)
      .to(n3_dot_line, { x: '0%' }) // 100%
      .to(n3_text_top, { y: '0%' }) // -100%
      .to(n3_text_bot, { y: '0%' }) // 100%
      .to([n3_circle, n3_img], { transform: 'scale(1)' })  // scale(0)
      .to(time_bar_circles[3], { transform: 'scale(1)' })  // scale(0)
      .to(n4_dot_line, { x: '0%' }) // -100%
      .to(n4_text_top, { y: '0%' }) // -100%
      .to(n4_text_bot, { y: '0%' }) // 100%
      .to([n4_circle, n4_img], { transform: 'scale(1)' })  // scale(0)
      .to(license_name, { transform: 'scale(1)' }) // scale(0)
      .to(license_bar, { transform: 'scale(1)' }) // scale(0)
      .to(license_desc, { transform: 'scale(1)' });  // scale(0)
  }



  //--- SKILL ELEMENT ---//
  const skill_page = document.querySelector(`.skill_page`);
  const skill_areas = $(`.skill_page>section`);
  const skill_items = $(`.shelf article[class*='icon_']`);
  const skill_title_1 = document.querySelector(`.front_skill>p`);
  const skill_title_2 = document.querySelector(`.back_skill>p`);
  const skill_title_3 = document.querySelector(`.etc_skill>p`);
  const skill_view = document.querySelector(`.view_skill`);
  const skill_back = document.querySelector(`.skill_back`);
  let skill_text_items = $(`.skill_detail>p`);
  const skill_arr = [
    "../img/html5-icon.png",
    "../img/css3-icon.png", 
    "../img/js-icon.png", 
    "../img/pug-icon.png", 
    "../img/sass-icon.png", 
    "../img/jquery-icon.png", 
    "../img/ts_icon.png", 
    "../img/react-icon.png", 
    "../img/java-icon.png", 
    "../img/python-icon.png", 
    "../img/nodejs-icon.png", 
    "../img/mysql-icon.png", 
    "../img/json_icon.png", 
    "../img/ajax_icon.png", 
    "../img/kotlin-icon.png", 
    "../img/vscode_icon.png",
    "../img/git_icon.png",
    "../img/github_icon.png",
    "../img/vim_icon.png",
    "../img/photoshop-icon.png",
    "../img/ai_icon.png",
    "../img/figma-icon.png",
    "../img/eclipse_icon.png",
    "../img/android-icon.png",
    "../img/linux-icon.png",
  ];
  const skill_desc_arr = [
    "<p>HTML5</p><p>용도에 맞는 Semantic 활용</p><p>Form, Input Tag 활용하여 값 전달</p>",
    "<p>CSS3</p><p>Keyframes 활용으로 Animation 구현</p><p>Tag, Pseudo 등 Selector 활용 가능</p><p>Flex 활용으로 빠른 레이아웃 구성</p>",
    "<p>JavaScript</p><p>코드 Class 구조화 가능</p><p>여러 Event Control 가능</p><p>Canvas 속성 호출 및 작업 가능</p><p>Element 접근 및 활용 가능</p><p>GSAP을 활용한 Animation 구현 가능</p><p>ES6 기반 Code 활용 가능</p>",
    "<p>PUG</p><p>HTML5 Semantic 구성 가능</p><p>변수 및 반복문 활용 가능</p><p>NodeJS와 View Engine 연동 가능</p><p></p>",
    "<p>Sass</p><p>계단식 구조 구성 가능</p><p>변수 활용으로 빠른 보수 가능</p><p>Mixin - Include 함수 활용 가능</p><p>Tag, Psedo 등 Selector 활용 가능</p>",
    "<p>jQuery</p><p>Element CSS, Animation 적용 가능</p><p>jQuery - JS Element 중첩 활용 가능</p><p>여러 Event Control 가능</p>",
    "<p>TypeScript</p><p>TypeScript -> JavaScript Compile</p><p>변수 및 함수의 타입 명시 가능</p>",
    "<p>React</p><p>기본 함수형, 클래스 형 컴포넌트 작업 가능</p><p>EventHadling, Map, Filter 사용</p><p>함수형 컴포넌트의 Hooks 기본 사용</p>",
    "<p>JAVA</p><p>Getter, Setter 활용 가능</p><p>클래스, 인터페이스의 상속 및 중첩 사용</p><p>List, Map, Hash 활용 가능</p><p>Thread 및 입출력 스트림 활용 가능</p><p>Servlet과 JDBC을 통해 MySQL DB에 접근 가능</p><p>MVC 아키텍처 기반 SSH, 외부 DB에 접근</p><p>JSP, VO, DAO 활용 가능</p>",
    "<p>PYTHON</p><p>클래스, 제너레이터 함수 구성</p><p>튜플, 람다 응용 가능</p><p>Flask 기본 활용 가능</p>",
    "<p>NodeJS</p><p>Http, Fs 모듈 활용 가능</p><p>Express의 Static 폴더 활용 가능</p><p>PUG View Engine 설정 및 Render 가능</p><p>Body-Parser을 통한 입력값 접근</p><p>Cookie-Parser을 통한 쿠키 설정 가능</p><p>Multiparty을 통한 파일 업로드 가능</p><p>MySQL DB 연동으로 데이터 관리 가능</p>",
    "<p>MySQL</p><p>DB, TABLE의 CRUD 작업 가능</p><p>스토어드 프로시저 기본 형태 사용 가능</p><p>VIEW 생성 및 작업 가능</p>",
    "<p>JSON</p><p>JSON Stringify, Parse 가능</p><p>AJAX, NODE.JS으로 JSON 형태의 값 운용 가능</p>",
    "<p>AJAX</p><p>XMLHttp 요청 및 전송 가능</p><p>jQuery AJAX을 통한 활용 가능</p>",
    "<p>KOTLIN</p><p>레이아웃 구성 가능</p><p>Class, Interface, Dao 작업 가능</p><p>ANDROID APP 등록 가능</p><p>Firebase 기본 사용 가능</p>",
    "<p>Visual Studio Code</p><p>코드 작업 및 설정, JSON 수정 가능</p><p>VScode 내 터미널 활용 가능</p><p>SSH 서버 연결 작업 가능</p>",
    "<p>GIT</p><p>Tracking 및 Server 업로드 가능</p>",
    "<p>GitHub</p><p>Code 업로드 관리 가능</p>",
    "<p>VIM</p><p>기본 단축키 활용 가능</p><p>UBUNTU 사용으로 파일 관리 가능</p>",
    "<p>PhotoShop</p><p>Path 및 기본 Filter 응용 가능</p><p>GTQ 1급 취득</p>",
    "<p>Adobe Illustrator</p><p>간단한 펜 툴 작업 가능</p><p>기본 3D로 변형 및 Path 작업 가능</p>",
    "<p>FIGMA</p><p>기본 프레임, 텍스트 작업 가능</p><p>기본 Component 사용 가능</p>",
    "<p>ECLIPSE</p><p>JAVA 코드 작업 가능</p><p>Tomcat Program 적용 및 Server 작동 가능</p>",
    "<p>Android Studio</p><p>Fragment, Activity 작업 가능</p><p>Class, Object, Interface 활용</p><p>Device Manager 사용 가능</p><p>Google Map, Ads 사용 가능</p>",
    "<p>LINUX</p><p>Linux 운영체제에서 작업 파일 및 폴더 관리</p>",
  ];
  const skill_tl = gsap.timeline({
    paused: true,
    defaults: { duration: 0.3, ease: "Power4.easeOut" }
  })
  if(win_width < 768) {
    skill_tl.to(skill_areas, { transform: 'translateX(0)', delay: 2 })
      .to(skill_title_1, { transform: 'translateX(0)' })
      .to(skill_title_2, { transform: 'translateX(0)' })
      .to(skill_title_3, { transform: 'translateX(0)' })
      .to(skill_items, { transform: 'scale(1)', stagger: 0.1 });
  } else {
    skill_tl.to(skill_areas, { transform: 'translateY(0)', delay: 2 })
      .to(skill_title_1, { transform: 'translateX(0)' })
      .to(skill_title_2, { transform: 'translateX(0)' })
      .to(skill_title_3, { transform: 'translateX(0)' })
      .to(skill_items, { transform: 'scale(1)', stagger: 0.1 });
  }
  $(`.shelf>div>article>article[class*='icon_']`).each(function(i){
    this.addEventListener("mouseenter", function(e){
      if(win_width < 768) {
        gsap.set(skill_view, { height: '0%', scale: '0' });
      } else {
        gsap.set(skill_view, { width: '0%', scale: '0' });
      }
      if(i <= 7) {
        $(skill_view).css({order: 2});
      } else if(i <= 13){
        $(skill_view).css({order: 4});
      } else {
        $(skill_view).css({order: 6});
      }
      $(`.skill_detail`).html(skill_desc_arr[i]);
      gsap.set(skill_back, {backgroundImage: `url(${skill_arr[i]})`})
      gsap.fromTo(this, 
        {transform: 'scale(1)'},
        {transform: 'scale(1.3)', ease: 'Power4.easeOut'}
        );
      skill_text_items = $(`.skill_detail>p`);
      if(win_width < 768) {
        gsap.to(skill_view, {scale: 1, height: '40%', duration: 0.3, ease: "Power4.easeOut"})
        gsap.to(skill_text_items, {x: '10vw', stagger: 0.2, delay: 0.3, duration: 0.3, ease: "Power4.easeOut"});
      } else if(win_width < 1024) {
        gsap.to(skill_view, {scale: 1, width: '50%', duration: 0.3, ease: "Power4.easeOut"})
        gsap.to(skill_text_items, {x: 0, stagger: 0.2, delay: 0.3, duration: 0.3, ease: "Power4.easeOut"});
      } else {
        gsap.to(skill_view, {scale: 1, width: '35%', duration: 0.3, ease: "Power4.easeOut"})
        gsap.to(skill_text_items, {x: 0, stagger: 0.2, delay: 0.3, duration: 0.3, ease: "Power4.easeOut"});
      }
    });
    this.addEventListener('mouseleave', function(e){
      gsap.fromTo(this, 
        {transform: 'scale(1.3)'},
        {transform: 'scale(1)', ease: 'Power4.easeOut'}
      );
      skill_text_items = $(`.skill_detail>p`);
      if(win_width < 768) {
        gsap.to(skill_text_items, {x: '100vw', duration: 0.3, ease: "Power4.easeOut"})
        gsap.to(skill_view, {scale: 0, height: '0%', duration: 0.3, ease: "Power4.easeIn"});
      } else if(win_width < 1024) {
        gsap.to(skill_text_items, {x: '55vw', duration: 0.3, ease: "Power4.easeOut"})
        gsap.to(skill_view, {scale: 0, width: '0%', duration: 0.3, ease: "Power4.easeIn"});
      } else {
        gsap.to(skill_text_items, {x: '40vw', duration: 0.3, ease: "Power4.easeOut"})
        gsap.to(skill_view, {scale: 0, width: '0%', duration: 0.3, ease: "Power4.easeIn"});
      }
    })
  })

  //--- PROJECT ELEMENT ---//
  const main_el_p = document.querySelector(`main`);
  const project_page = document.querySelector(`.project_page`);
  const project_main = document.querySelector(`.main_project`);
  let main_deg = 0;
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
    main_deg += (touchX - touchStart) * 0.2;
    touchStart = touchX;
  };
  const handleTouchEnd = () => {
    isDragging = false;
    main_el_p.classList.remove(`is-dragging`);
  };


  main_el_p.addEventListener(`touchstart`, handleTouchStart);
  main_el_p.addEventListener(`touchmove`, handleTouchMove);
  main_el_p.addEventListener(`touchend`, handleTouchEnd);

  main_el_p.addEventListener(`mousedown`, handleTouchStart);
  main_el_p.addEventListener(`mousemove`, handleTouchMove);
  main_el_p.addEventListener(`mouseleave`, handleTouchEnd);
  main_el_p.addEventListener(`mouseup`, handleTouchEnd);

  window.addEventListener('wheel', function(e){
    main_deg -= e.deltaY * 0.1;
  })
  function rotate_pj(){
    requestAnimationFrame(rotate_pj)
    gsap.to(project_main, { rotate: main_deg, duration: 0.3, stagger: 0.1 })
  }

  // 화면 전환
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
    gsap.to(home_page, { delay: .5, transform: 'scale(0)' });
    gsap.to(back_page, { delay: .5, display: 'none' });
    gsap.to(about_page, { delay: .5, display: 'none' });
    gsap.to(time_page, { delay: .5, display: 'none' });
    gsap.to(skill_page, { delay: .5, display: 'none' });
    gsap.to(project_page, { delay: .5, display: 'none' });
    about_text_tl.timeScale(0).reverse();
    time_tl.timeScale(0).reverse();
    skill_tl.timeScale(0).reverse();
    main_deg = 0;
    cancelAnimationFrame(rotate_pj);
    switch(ta){
      case 0:
        gsap.to(home_page, { delay: 1, transform: 'scale(1)' });
        gsap.to(back_page, { delay: 1, display: 'block' });
        view_page = 0;
        break;
      case 1:
        gsap.to(about_page, { delay: 1, display: 'block' });
        about_func();
        about_text_tl.timeScale(1).restart();
        view_page = 1;
        break;
      case 2:
        gsap.to(time_page, { delay: 1, display: 'flex' });
        time_tl.timeScale(1).restart();
        view_page = 2;
        break;
      case 3:
        gsap.to(skill_page, { delay: 1, display: 'flex' });
        skill_tl.timeScale(1).restart();
        view_page = 3;
        break;
      case 4:
        gsap.to(project_page, { delay: 1, display: 'block' });
        rotate_pj();
        view_page = 4;
        break;
    }
    gsap.set(gnb_items, { color: '#FFF', filter: 'none', x: 0 });
    switch(view_page){
      case 0:
        gsap.set(gnb_home, {color: '#444', filter: `drop-shadow(0.2vw 0.2vw 0 rgba(255,255,255,0.3))`, x: '-1vh'});
        break;
      case 1:
        gsap.set(gnb_about, {color: '#444', filter: `drop-shadow(0.2vw 0.2vw 0 rgba(255,255,255,0.3))`, x: '-1vh'});
        break;
      case 2:
        gsap.set(gnb_time, {color: '#444', filter: `drop-shadow(0.2vw 0.2vw 0 rgba(255,255,255,0.3))`, x: '-1vh'});
        break;
      case 3:
        gsap.set(gnb_skill, {color: '#444', filter: `drop-shadow(0.2vw 0.2vw 0 rgba(255,255,255,0.3))`, x: '-1vh'});
        break;
      case 4:
        gsap.set(gnb_project, {color: '#444', filter: `drop-shadow(0.2vw 0.2vw 0 rgba(255,255,255,0.3))`, x: '-1vh'});
        break;
    }
  }
}

//--- Main Card Hover Event ---//
function hover_card() {
  const main_back = document.querySelector(`body`);
  let win_width = window.innerWidth;
  const title_color = [ "#BFA9E8", "#EFAFB8", "#B6D8CC", "#ECD78C", "#BFA9E8", "#EFAFB8", "#B6D8CC", "#ECD78C" ];
  $(".card_item>article").each(function (index) {
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

    if(win_width < 1024) {
      $(this).on("mouseenter", function () {
        tl_img.timeScale(1).restart();
      });
  
      $(this).on("mouseleave", function () {
        tl_img.timeScale(1.2).reverse();
      });
    } else {
      $(this).on("mouseenter", function () {
        tl_img.timeScale(1).restart();
        gsap.set(main_back, { background: `linear-gradient(to right top, transparent, transparent, transparent)`});
        gsap.to(main_back, { background: `linear-gradient(to right top, ${title_color[index]}, transparent, transparent)`, ease: 'Power4.easeOut', duration: 1})
      });
  
      $(this).on("mouseleave", function () {
        tl_img.timeScale(1.2).reverse();
        gsap.to(main_back, { background: `linear-gradient(to right top, transparent, transparent, transparent)`, ease: 'Power4.easeOut', duration: 1})
      });
    }
  });
}

//--- Project Event ---//
function action_project() {

  const img_arr = [
    "../img/matrix_img.gif",
    "../img/tetris_img.gif",
    "../img/hanoi_img.gif",
    "../img/change.gif",
    "../img/notepad.gif",
    "../img/marble-img.gif",
    "../img/kiosk_img.gif",
    "../img/kiosk_img.gif",
    "../img/hanwha_img.gif",
    "../img/lotto_img.gif"
  ];
  const url_arr = [
    "http://kkms4001.iptime.org/~c16st10/portfolio/matrix_calculator/build/html/matrix_calculator.html",
    "http://kkms4001.iptime.org:30101/tetris",
    "http://kkms4001.iptime.org/~c16st10/portfolio/hanoi_tower/build/html/hanoi.html",
    "http://kkms4001.iptime.org/~c16st10/portfolio/calculate_change/build/html/change.html",
    "http://kkms4001.iptime.org/~c16st10/portfolio/notepad/build/html/notepad.html",
    "http://kkms4001.iptime.org:30102/marble",
    "http://kkms4001.iptime.org:30100/kiosk",
    "http://rudgh9407.cafe24.com/",
    "http://kkms4001.iptime.org/~c16st10/portfolio/web_site/build/html/hanwha.html",
    "https://play.google.com/store/apps/details?id=com.hooh.lotto1st"
  ];
  const pdf_arr = [
    "../file/matrix.pdf",
    "../file/tetris.pdf",
    "../file/hanoi.pdf",
    "../file/change.pdf",
    "../file/notepad.pdf",
    "../file/marble.pdf",
    "../file/Baskin_Robbins_Kiosk.pdf",
    "../file/Kiosk_java.pdf",
    "",
    "../file/lotto.pdf"
  ];
  const desc_arr = [
    "<p>MATRIX CALCULATOR</p><p>2차원 배열과 클래스를 활용하여</p><p>행렬의 덧셈, 뺄셈, 곱셈 계산기를 구현</p>",
    "<p>TETRIS GAME</p><p>배열 값의 변화를 통한 테트리스 게임 및</p><p>ID를 통한 점수 순위 시스템 구현</p>",
    "<p>TOWER OF HANOI</p><p>하노이 타워의 패턴을 분석하여</p><p>해당 순서를 애니메이션화 작업</p><p>JS외 JAVA, PYTHON 코드 구현</p>",
    "<p>잔돈 계산기</p><p>Shopping Cart Class 구현</p><p>쇼핑 금액의 거스름돈을 화폐로 구분</p>",
    "<p>메모장</p><p>메모지와 메모판을 Class로 구현</p><p>메모 자세히 보기 및 삭제 기능 구현</p>",
    "<p>부루마블</p><p>2명이서 즐길수 있는 부루마블 게임 제작</p><p>승, 패 기록 시스템 구현</p>",
    "<p>키오스크_NODE.JS</p><p>팀별 작업으로 배스킨라빈스 키오스크 제작</p><p>구매 및 회원 포인트 사용, 매출 관리 구현</p>",
    "<p>키오스크_JAVA</p><p>Servlet으로 SSH, 외부 DB에 접근</p><p>MVC 구조 기반으로 DAO, VO, JSP<br>구분하여 기능 재구현</p><p>개인 호스트 서버로 도메인 Open</p>",
    "<p>한화이글스</p><p>한화이글스 팬으로서 기존 사이트를</p><p>참고하여 제작한 웹사이트입니다.</p>",
    "<p>로또1번가</p><p>Android Studio으로 Kotlin 사용</p><p>KakaoMap API, FireBase, ADMob, QR Scanner 연동</p>"
  ];
  const use_icon = [
    "../img/html5-icon.png",      // 0
    "../img/css3-icon.png",       // 1
    "../img/js-icon.png",       // 2
    "../img/pug-icon.png",       // 3
    "../img/sass-icon.png",       // 4
    "../img/jquery-icon.png",       // 5 
    "../img/ts_icon.png",       // 6
    "../img/java-icon.png",       // 7
    "../img/python-icon.png",       // 8
    "../img/nodejs-icon.png",       // 9
    "../img/mysql-icon.png",       // 10
    "../img/json_icon.png",       // 11
    "../img/ajax_icon.png",       // 12
    "../img/kotlin-icon.png",       // 13
    "../img/vscode_icon.png",      // 14
    "../img/git_icon.png",      // 15
    "../img/github_icon.png",      // 16
    "../img/vim_icon.png",      // 17
    "../img/photoshop-icon.png",      // 18
    "../img/ai_icon.png",      // 19
    "../img/figma-icon.png",      // 20
    "../img/eclipse_icon.png",     // 21
    "../img/android-icon.png"     // 22
  ];
  const desc_pro_1 = `
    <article><div style="background: url(${use_icon[0]}) no-repeat center center / contain"></div></article>
    <article><div style="background: url(${use_icon[1]}) no-repeat center center / contain"></div></article>
    <article><div style="background: url(${use_icon[2]}) no-repeat center center / contain"></div></article>
    <article><div style="background: url(${use_icon[3]}) no-repeat center center / contain"></div></article>
    <article><div style="background: url(${use_icon[4]}) no-repeat center center / contain"></div></article>
    <article><div style="background: url(${use_icon[5]}) no-repeat center center / contain"></div></article>
    <article><div style="background: url(${use_icon[14]}) no-repeat center center / contain"></div></article>
  `;
  const desc_pro_2 = `
    <article><div style="background: url(${use_icon[0]}) no-repeat center center / contain"></div></article>
    <article><div style="background: url(${use_icon[1]}) no-repeat center center / contain"></div></article>
    <article><div style="background: url(${use_icon[2]}) no-repeat center center / contain"></div></article>
    <article><div style="background: url(${use_icon[3]}) no-repeat center center / contain"></div></article>
    <article><div style="background: url(${use_icon[4]}) no-repeat center center / contain"></div></article>
    <article><div style="background: url(${use_icon[5]}) no-repeat center center / contain"></div></article>
    <article><div style="background: url(${use_icon[9]}) no-repeat center center / contain"></div></article>
    <article><div style="background: url(${use_icon[10]}) no-repeat center center / contain"></div></article>
    <article><div style="background: url(${use_icon[14]}) no-repeat center center / contain"></div></article>
  `;
  const desc_pro_3 = `
    <article><div style="background: url(${use_icon[0]}) no-repeat center center / contain"></div></article>
    <article><div style="background: url(${use_icon[1]}) no-repeat center center / contain"></div></article>
    <article><div style="background: url(${use_icon[2]}) no-repeat center center / contain"></div></article>
    <article><div style="background: url(${use_icon[3]}) no-repeat center center / contain"></div></article>
    <article><div style="background: url(${use_icon[4]}) no-repeat center center / contain"></div></article>
    <article><div style="background: url(${use_icon[5]}) no-repeat center center / contain"></div></article>
    <article><div style="background: url(${use_icon[7]}) no-repeat center center / contain"></div></article>
    <article><div style="background: url(${use_icon[8]}) no-repeat center center / contain"></div></article>
    <article><div style="background: url(${use_icon[14]}) no-repeat center center / contain"></div></article>
  `;
  const desc_pro_4 = `
    <article><div style="background: url(${use_icon[0]}) no-repeat center center / contain"></div></article>
    <article><div style="background: url(${use_icon[1]}) no-repeat center center / contain"></div></article>
    <article><div style="background: url(${use_icon[2]}) no-repeat center center / contain"></div></article>
    <article><div style="background: url(${use_icon[3]}) no-repeat center center / contain"></div></article>
    <article><div style="background: url(${use_icon[4]}) no-repeat center center / contain"></div></article>
    <article><div style="background: url(${use_icon[5]}) no-repeat center center / contain"></div></article>
    <article><div style="background: url(${use_icon[14]}) no-repeat center center / contain"></div></article>
    <article><div style="background: url(${use_icon[18]}) no-repeat center center / contain"></div></article>
    <article><div style="background: url(${use_icon[19]}) no-repeat center center / contain"></div></article>
  `;
  const desc_pro_5 = `
    <article><div style="background: url(${use_icon[0]}) no-repeat center center / contain"></div></article>
    <article><div style="background: url(${use_icon[1]}) no-repeat center center / contain"></div></article>
    <article><div style="background: url(${use_icon[2]}) no-repeat center center / contain"></div></article>
    <article><div style="background: url(${use_icon[3]}) no-repeat center center / contain"></div></article>
    <article><div style="background: url(${use_icon[4]}) no-repeat center center / contain"></div></article>
    <article><div style="background: url(${use_icon[5]}) no-repeat center center / contain"></div></article>
    <article><div style="background: url(${use_icon[14]}) no-repeat center center / contain"></div></article>
    <article><div style="background: url(${use_icon[20]}) no-repeat center center / contain"></div></article>
  `;
  const desc_pro_6 = `
    <article><div style="background: url(${use_icon[0]}) no-repeat center center / contain"></div></article>
    <article><div style="background: url(${use_icon[1]}) no-repeat center center / contain"></div></article>
    <article><div style="background: url(${use_icon[2]}) no-repeat center center / contain"></div></article>
    <article><div style="background: url(${use_icon[3]}) no-repeat center center / contain"></div></article>
    <article><div style="background: url(${use_icon[4]}) no-repeat center center / contain"></div></article>
    <article><div style="background: url(${use_icon[5]}) no-repeat center center / contain"></div></article>
    <article><div style="background: url(${use_icon[9]}) no-repeat center center / contain"></div></article>
    <article><div style="background: url(${use_icon[10]}) no-repeat center center / contain"></div></article>
    <article><div style="background: url(${use_icon[11]}) no-repeat center center / contain"></div></article>
    <article><div style="background: url(${use_icon[14]}) no-repeat center center / contain"></div></article>
    <article><div style="background: url(${use_icon[18]}) no-repeat center center / contain"></div></article>
    <article><div style="background: url(${use_icon[20]}) no-repeat center center / contain"></div></article>
  `;
  const desc_pro_7 = `
    <article><div style="background: url(${use_icon[0]}) no-repeat center center / contain"></div></article>
    <article><div style="background: url(${use_icon[1]}) no-repeat center center / contain"></div></article>
    <article><div style="background: url(${use_icon[2]}) no-repeat center center / contain"></div></article>
    <article><div style="background: url(${use_icon[3]}) no-repeat center center / contain"></div></article>
    <article><div style="background: url(${use_icon[4]}) no-repeat center center / contain"></div></article>
    <article><div style="background: url(${use_icon[5]}) no-repeat center center / contain"></div></article>
    <article><div style="background: url(${use_icon[9]}) no-repeat center center / contain"></div></article>
    <article><div style="background: url(${use_icon[10]}) no-repeat center center / contain"></div></article>
    <article><div style="background: url(${use_icon[11]}) no-repeat center center / contain"></div></article>
    <article><div style="background: url(${use_icon[12]}) no-repeat center center / contain"></div></article>
    <article><div style="background: url(${use_icon[14]}) no-repeat center center / contain"></div></article>
    <article><div style="background: url(${use_icon[18]}) no-repeat center center / contain"></div></article>
    <article><div style="background: url(${use_icon[20]}) no-repeat center center / contain"></div></article>
  `;
  const desc_pro_8 = `
    <article><div style="background: url(${use_icon[2]}) no-repeat center center / contain"></div></article>
    <article><div style="background: url(${use_icon[5]}) no-repeat center center / contain"></div></article>
    <article><div style="background: url(${use_icon[7]}) no-repeat center center / contain"></div></article>
    <article><div style="background: url(${use_icon[10]}) no-repeat center center / contain"></div></article>
    <article><div style="background: url(${use_icon[11]}) no-repeat center center / contain"></div></article>
    <article><div style="background: url(${use_icon[12]}) no-repeat center center / contain"></div></article>
    <article><div style="background: url(${use_icon[21]}) no-repeat center center / contain"></div></article>
  `;
  const desc_pro_9 = `
    <article><div style="background: url(${use_icon[0]}) no-repeat center center / contain"></div></article>
    <article><div style="background: url(${use_icon[1]}) no-repeat center center / contain"></div></article>
    <article><div style="background: url(${use_icon[2]}) no-repeat center center / contain"></div></article>
    <article><div style="background: url(${use_icon[3]}) no-repeat center center / contain"></div></article>
    <article><div style="background: url(${use_icon[4]}) no-repeat center center / contain"></div></article>
    <article><div style="background: url(${use_icon[5]}) no-repeat center center / contain"></div></article>
    <article><div style="background: url(${use_icon[14]}) no-repeat center center / contain"></div></article>
    <article><div style="background: url(${use_icon[18]}) no-repeat center center / contain"></div></article>
  `;
  const desc_pro_10 = `
    <article><div style="background: url(${use_icon[22]}) no-repeat center center / contain"></div></article>
    <article><div style="background: url(${use_icon[13]}) no-repeat center center / contain"></div></article>
    <article><div style="background: url(${use_icon[18]}) no-repeat center center / contain"></div></article>
  `;
  const use_desc = [desc_pro_1, desc_pro_2, desc_pro_3, desc_pro_4, desc_pro_5, desc_pro_6, desc_pro_7, desc_pro_8, desc_pro_9, desc_pro_10];

  const main_project = document.querySelector(`.main_project`);
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
      gsap.set(main_project, { pointerEvents: 'none' });
      if(i > 9){
        gsap.set([btn_site, btn_pdf, left_line, left_text], {opacity: '0', visibility: 'hidden'});
      } else {
        gsap.set([btn_site, btn_pdf, left_line, left_text], {opacity: '1', visibility: 'visible'});
      }
      gsap.set(pop_main, { background: `url(${img_arr[i]}) no-repeat left top/contain #FFF` });
      $(rt_pop).html(`${desc_arr[i]}`)
      $(rb_pop).html(`${use_desc[i]}`)
      $(btn_site).on('click',function(e){
        window.open(url_arr[i]);
      })
      $(btn_pdf).on('click',function(e){
        window.open(pdf_arr[i]);
      })
      tl_pro.timeScale(1).restart();
      $(`.possible_box>div`).css({'display': 'none'});
      switch(i){
        case 0:
          $(`.possible_box>div:nth-child(1)`).css({'display': 'block'});
          $(`.go_pdf`).css({'display': 'block'});
          break;
        case 1:
          $(`.possible_box>div:nth-child(1)`).css({'display': 'block'});
          $(`.go_pdf`).css({'display': 'block'});
          break;
        case 2:
          $(`.possible_box>div:nth-child(1)`).css({'display': 'block'});
          $(`.possible_box>div:nth-child(2)`).css({'display': 'block'});
          $(`.go_pdf`).css({'display': 'block'});
          break;
        case 3:
          $(`.possible_box>div:nth-child(1)`).css({'display': 'block'});
          $(`.possible_box>div:nth-child(2)`).css({'display': 'block'});
          $(`.go_pdf`).css({'display': 'block'});
          break;
        case 4:
          $(`.possible_box>div:nth-child(1)`).css({'display': 'block'});
          $(`.possible_box>div:nth-child(2)`).css({'display': 'block'});
          $(`.go_pdf`).css({'display': 'block'});
          break;
        case 5:
          $(`.possible_box>div:nth-child(1)`).css({'display': 'block'});
          $(`.go_pdf`).css({'display': 'block'});
          break;
        case 6:
          $(`.possible_box>div:nth-child(1)`).css({'display': 'block'});
          $(`.possible_box>div:nth-child(2)`).css({'display': 'block'});
          $(`.go_pdf`).css({'display': 'block'});
          break;
        case 7:
          $(`.possible_box>div:nth-child(1)`).css({'display': 'block'});
          $(`.possible_box>div:nth-child(2)`).css({'display': 'block'});
          $(`.go_pdf`).css({'display': 'block'});
          break;
        case 8:
          $(`.possible_box>div:nth-child(1)`).css({'display': 'block'});
          $(`.possible_box>div:nth-child(2)`).css({'display': 'block'});
          // $(`.possible_box>div`).css({'display': 'none'});
          $(`.go_pdf`).css({'display': 'none'});
          break;
        case 9:
          $(`.possible_box>div:nth-child(3)`).css({'display': 'block'});
          $(`.go_pdf`).css({'display': 'block'});
          // $(`.possible_box>div`).css({'display': 'none'});
          break;
      }
    })
  })
  close_pop.addEventListener('click', function(e){
    $(btn_site).removeAttr("onclick");
    $(btn_pdf).removeAttr("onclick");
    $(btn_site).off('click');
    $(btn_pdf).off('click');
    gsap.set(main_project, { pointerEvents: 'all' });
    tl_pro.timeScale(1.5).reverse();
  })


}


//--- Scroll Event ---//
homeScroll();
homeLoader();
anotherEvent();
hover_card();
action_project();

