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

// Home Loader
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
  const sub_about_items = $(`.sub_about>article`);
  const time_page = document.querySelector(`.time_page`);
  const skill_page = document.querySelector(`.skill_page`);
  const project_page = document.querySelector(`.project_page`);

  const skill_items = $(`.skill_page>section>section>article`);
  const skill_view = document.querySelector(`.view_skill`);
  const skill_back = document.querySelector(`.skill_back`);
  const skill_arr = [
    "../img/html5-icon.png",
    "../img/css3-icon.png", 
    "../img/js-icon.png", 
    "../img/pug-icon.png", 
    "../img/sass-icon.png", 
    "../img/jquery-icon.png", 
    "../img/ts_icon.png", 
    "../img/java-icon.png", 
    "../img/python-icon.png", 
    "../img/nodejs-icon.png", 
    "../img/mysql-icon.png", 
    "../img/json_icon.png", 
    "../img/ajax_icon.png", 
    "../img/kotlin-icon.png", 
    "../img/photoshop-icon.png",
    "../img/git_icon.png",
    "../img/github_icon.png",
    "../img/vim_icon.png",
    "../img/vscode_icon.png"
  ];
  const skill_desc_arr = [
    "<p>HTML5</p><p>용도에 맞는 Semantic 활용</p><p>form, input Tag 활용하여 값 전달</p>",
    "<p>CSS3</p><p>Keyframes 활용으로 Animation 구현</p><p>Tag, Pseudo 등 Selector 활용 가능</p><p>Flex 활용으로 빠른 레이아웃 구성</p>",
    "<p>JavaScript</p><p>코드 Class 구성</p><p>여러 Event Controll 가능</p><p>canvas 속성 호출 및 작업 가능</p><p>Element 접근 및 활용 가능</p><p>GSAP을 활용한 Animation 구현 가능</p>",
    "<p>PUG</p><p>HTML5 Sematic 구성 가능</p><p>변수 및 반복문 활용 가능</p><p>NodeJS와 View Engine 연동 가능</p><p></p>",
    "<p>Sass</p><p>계단식 구조 구성 가능</p><p>변수 활용으로 빠른 보수 가능</p><p>Mixin - Include 함수 활용 가능</p><p>Tag, Psedo 등 Selector 활용 가능</p>",
    "<p>jQuery</p><p>Element CSS, Animation 적용 가능</p><p>jQuery - JS Element 중첩 활용 가능</p><p>여러 Event Controll 가능</p>",
    "<p>TypeScript</p><p>TypeScript -> JavaScript Compile</p><p>변수 및 함수의 타입 명시 가능</p>",
    "<p>JAVA</p><p>Getter, Setter 활용 가능</p><p>클래스, 인터페이스의 상속 및 중첩 사용</p><p>List, Map, Hash 활용 가능</p><p>Thread 활용 가능</p><p>입출력 스트림 활용 가능</p>",
    "<p>PYTHON</p><p>클래스, 제너레이터 함수 구성</p><p>튜플, 람다 응용 가능</p><p>Flask 기본 활용 가능</p>",
    "<p>NodeJS</p><p>http, fs 모듈 활용 가능</p><p>express의 static 폴더 활용 가능</p><p>pug view engine 설정 및 Render 가능</p><p>body-parser을 통한 입력값 접근</p><p>cookie-parser을 통한 쿠키 설정 가능</p><p>multiparty을 통한 파일 업로드 가능</p><p>MySQL DB 연동으로 데이터 관리 가능</p>",
    "<p>MySQL</p><p>DB, TABLE 생성 및 관리 작업</p><p>필요에 따른 값 접근 가능</p>",
    "<p>JSON</p><p>JSON strigify, parse 가능</p>",
    "<p>AJAX</p><p>XMLHttp 요청 및 전송 가능</p>",
    "<p>KOTLIN</p><p>레이아웃 구성 가능</p><p>Class, Interface, Dao 작업 가능</p><p>ANDROID APP 등록 가능</p><p>Firebase 기본 사용 가능</p>",
    "<p>PhotoShop</p><p>path 및 기본 Filter 응용 가능</p><p>GTQ 1급 취득</p>",
    "<p>GIT</p><p>tracking 및 Server 업로드 가능</p>",
    "<p>GitHub</p><p>Code 업로드 관리 가능</p>",
    "<p>VIM</p><p>기본 단축키 활용 가능</p><p>wsl 사용으로 파일 관리 가능</p>",
    "<p>Visual Studio Code</p><p>코드 작업 및 설정, JSON 수정 가능</p><p>vscode 내 터미널 활용 가능</p><p>SSH 서버 연결 작업 가능</p>"
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
            // window.location.href = "mailto: rudgh9407@gmail.com";
            break;
          case 1:
            window.open("https://open.kakao.com/o/sQ5tqPFe");
            // window.location.href = "https://open.kakao.com/o/sQ5tqPFe";
            break;
          case 2:
            window.open("tel: 010-3326-9750");
            // window.location.href = "tel: 010-3326-9750";
            break;
        }
      })
    })
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
    gsap.to(home_page, { delay: .5, transform: 'scale(0)' });
    gsap.to(back_page, { delay: .5, display: 'none' });
    gsap.to(about_page, { delay: .5, display: 'none' });
    gsap.to(time_page, { delay: .5, display: 'none' });
    gsap.to(skill_page, { delay: .5, display: 'none' });
    gsap.to(project_page, { delay: .5, display: 'none' });
    about_text_tl.timeScale(0).reverse();
    switch(ta){
      case 0:
        gsap.to(home_page, { delay: 1, transform: 'scale(1)' });
        gsap.to(back_page, { delay: 1, display: 'block' });
        break;
      case 1:
        gsap.to(about_page, { delay: 1, display: 'block' });
        about_func();
        about_text_tl.timeScale(1).restart();
        break;
      case 2:
        gsap.to(time_page, { delay: 1, display: 'block' });
        break;
      case 3:
        gsap.to(skill_page, { delay: 1, display: 'flex' });
        break;
      case 4:
        gsap.to(project_page, { delay: 1, display: 'block' });
        break;
    }
  }

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
      if(i <= 6) {
        $(skill_view).css({order: 2});
      } else if(i <= 12){
        $(skill_view).css({order: 4});
      } else {
        $(skill_view).css({order: 6});
      }
      gsap.set(skill_back, {backgroundImage: `url(${skill_arr[i]})`})
      gsap.fromTo(this, 
        {filter: 'grayscale(100%)'},
        {filter: 'grayscale(0%)', ease: 'Power4.easeOut'}
      )
      gsap.fromTo(skill_view, 
        {transform: 'scale(0)', width: '0%'},
        {transform: 'scale(1)', width: '35%',  ease: 'Power4.easeOut'}
      )
    });
    this.addEventListener('mouseleave', function(e){
      gsap.set(skill_back, {backgroundImage: `url(${skill_arr[i]})`})
      gsap.fromTo(this, 
        {filter: 'grayscale(0%)'},
        {filter: 'grayscale(100%)', ease: 'Power4.easeOut'}
      )
      gsap.fromTo(skill_view, 
        {transform: 'scale(1)', width: '35%'},
        {transform: 'scale(0)', width: '0%', ease: 'Power4.easeOut'}
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
    "../img/matrix_img.gif",
    "../img/tetris_img.gif",
    "../img/cloud_img.gif",
    "../img/hanoi_img.gif",
    "../img/working-img.jpg",
    "../img/working-img.jpg",
    "../img/working-img.jpg",
    "../img/working-img.jpg"
  ];
  const url_arr = [
    "http://kkms4001.iptime.org/~c16st10/portfolio/matrix_calculator/build/html/matrix_calculator.html",
    "http://kkms4001.iptime.org:30101/tetris",
    "http://kkms4001.iptime.org:30102/cloud",
    "http://kkms4001.iptime.org/~c16st10/portfolio/hanoi_tower/build/html/hanoi.html",
    "https://www.naver.com",
    "https://www.naver.com",
    "https://www.naver.com",
    "https://www.naver.com"
  ];
  const pdf_arr = [];
  const desc_arr = [
    "<p>MATRIX CALCULATOR<p><p>2차원 배열과 클래스를 활용하여<p><p>행렬의 덧셈, 뺄셈, 곱셈 계산기를 구현<p>",
    "<p>TETRIS GAME<p><p>배열 값의 변화를 통한 테트리스 게임 및<p><p>ID를 통한 점수 순위 시스템 구현<p>",
    "<p>CLOUD SERVER<p><p>회원가입, 로그인 기능 구현 및<p><p>게시물 업로드 및 사진 다운로드 구현<p>",
    "<p>TOWER OF HANOI<p><p>하노이 타워의 패턴을 분석하여<p><p>해당 순서를 애니메이션화 작업<p><p>JS외 JAVA, PYTHON 코드 구현</p>",
    "",
    "",
    "",
    ""
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
    "../img/photoshop-icon.png",      // 14
    "../img/git_icon.png",      // 15
    "../img/github_icon.png",      // 16
    "../img/vim_icon.png",      // 17
    "../img/vscode_icon.png"      // 18
  ];
  const desc_pro_1 = `
    <article><div style="background: url(${use_icon[0]}) no-repeat center center / contain"></div><p>HTML5</p></article>
    <article><div style="background: url(${use_icon[1]}) no-repeat center center / contain"></div><p>CSS3</p></article>
    <article><div style="background: url(${use_icon[2]}) no-repeat center center / contain"></div><p>JavaScript</p></article>
    <article><div style="background: url(${use_icon[3]}) no-repeat center center / contain"></div><p>PUG</p></article>
    <article><div style="background: url(${use_icon[4]}) no-repeat center center / contain"></div><p>SASS</p></article>
    <article><div style="background: url(${use_icon[5]}) no-repeat center center / contain"></div><p>jQuery</p></article>
    <article><div style="background: url(${use_icon[18]}) no-repeat center center / contain"></div><p>VSCODE</p></article>
  `;
  const desc_pro_2 = `
    <article><div style="background: url(${use_icon[0]}) no-repeat center center / contain"></div><p>HTML5</p></article>
    <article><div style="background: url(${use_icon[1]}) no-repeat center center / contain"></div><p>CSS3</p></article>
    <article><div style="background: url(${use_icon[2]}) no-repeat center center / contain"></div><p>JavaScript</p></article>
    <article><div style="background: url(${use_icon[3]}) no-repeat center center / contain"></div><p>PUG</p></article>
    <article><div style="background: url(${use_icon[4]}) no-repeat center center / contain"></div><p>SASS</p></article>
    <article><div style="background: url(${use_icon[5]}) no-repeat center center / contain"></div><p>jQuery</p></article>
    <article><div style="background: url(${use_icon[9]}) no-repeat center center / contain"></div><p>NodeJS</p></article>
    <article><div style="background: url(${use_icon[10]}) no-repeat center center / contain"></div><p>MySQL</p></article>
    <article><div style="background: url(${use_icon[18]}) no-repeat center center / contain"></div><p>VSCODE</p></article>
  `;
  const desc_pro_3 = `
    <article><div style="background: url(${use_icon[0]}) no-repeat center center / contain"></div><p>HTML5</p></article>
    <article><div style="background: url(${use_icon[1]}) no-repeat center center / contain"></div><p>CSS3</p></article>
    <article><div style="background: url(${use_icon[2]}) no-repeat center center / contain"></div><p>JavaScript</p></article>
    <article><div style="background: url(${use_icon[3]}) no-repeat center center / contain"></div><p>PUG</p></article>
    <article><div style="background: url(${use_icon[4]}) no-repeat center center / contain"></div><p>SASS</p></article>
    <article><div style="background: url(${use_icon[5]}) no-repeat center center / contain"></div><p>jQuery</p></article>
    <article><div style="background: url(${use_icon[9]}) no-repeat center center / contain"></div><p>NodeJS</p></article>
    <article><div style="background: url(${use_icon[10]}) no-repeat center center / contain"></div><p>MySQL</p></article>
    <article><div style="background: url(${use_icon[18]}) no-repeat center center / contain"></div><p>VSCODE</p></article>
  `;
  const desc_pro_4 = `
    <article><div style="background: url(${use_icon[0]}) no-repeat center center / contain"></div><p>HTML5</p></article>
    <article><div style="background: url(${use_icon[1]}) no-repeat center center / contain"></div><p>CSS3</p></article>
    <article><div style="background: url(${use_icon[2]}) no-repeat center center / contain"></div><p>JavaScript</p></article>
    <article><div style="background: url(${use_icon[3]}) no-repeat center center / contain"></div><p>PUG</p></article>
    <article><div style="background: url(${use_icon[4]}) no-repeat center center / contain"></div><p>SASS</p></article>
    <article><div style="background: url(${use_icon[5]}) no-repeat center center / contain"></div><p>jQuery</p></article>
    <article><div style="background: url(${use_icon[7]}) no-repeat center center / contain"></div><p>JAVA</p></article>
    <article><div style="background: url(${use_icon[8]}) no-repeat center center / contain"></div><p>PYTHON</p></article>
    <article><div style="background: url(${use_icon[18]}) no-repeat center center / contain"></div><p>VSCODE</p></article>
  `;
  const use_desc = [desc_pro_1, desc_pro_2, desc_pro_3, desc_pro_4, '', '', '', ''];



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
      gsap.set(pop_main, { background: `url(${img_arr[i]}) no-repeat left top/contain #FFF` });
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

