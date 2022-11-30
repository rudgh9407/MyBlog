
// const cont_2 = document.querySelector('.home_page');
// const slider = document.querySelector('.home_page>section');
// let s_pos = 0;


// let cc = 0;
// cont_2.addEventListener('wheel',function(e){
//   e.preventDefault;
//   move_slider(e.deltaY*0.9);
// });
// let win_wid = window.innerWidth;

// let count_1 = win_wid * (-1 * 0.44);
// let count_2 = win_wid * (-1 * 0.2);
// let count_3 = win_wid * 0.04;
// let count_4 = win_wid * 0.28;
// let count_5 = win_wid * 0.52;
// let count_6 = win_wid * 0.76;
// let count_7 = win_wid * 1;
// let count_8 = win_wid * 1.24;
// let check_1 = 0;
// let check_2 = 0;
// let check_3 = 0;
// let check_4 = 0;
// let check_5 = 0;
// let check_6 = 0;
// let check_7 = 0;
// let check_8 = 0;

// let cc_main = 0;

// const card_ani = [
//   { transform: `rotate(0deg)` },
//   { transform: `rotate(-1deg)` },
//   { transform: `rotate(0deg)` },
// ];
// const card_time = {
//   duration: 400,
//   iterations: 1
// }
// let ani_key = 0;

// let count_arr = [count_1, count_2, count_3, count_4, count_5, count_6, count_7, count_8];
// let check_arr = [check_1, check_2, check_3, check_4, check_5, check_6, check_7, check_8];
// let card_arr = [$(`.card_1`), $(`.card_2`), $(`.card_3`), $(`.card_4`), $(`.card_5`), $(`.card_6`), $(`.card_7`), $(`.card_8`)];

// let card_arr_1 = [".card_1", ".card_2", ".card_3", ".card_4", ".card_5", ".card_6", ".card_7", ".card_8"];


// function move_slider(amount){
//   s_pos -= amount;

//   // if(ani_key == 0){
//   //   ani_key =
//   //   $(`.home_page>section`)[0].animate(card_ani, card_time);
//   //   setTimeout(()=>{ani_key = 0}, 400);
//   // }



//   for(let i=0; i<8; i++){
//     if(card_arr[i].offset().left < -(win_wid*0.68)){
//       count_arr[i] = (win_wid*1.24) - s_pos;
//       gsap.set(card_arr_1[i], { x: (win_wid*1.24) });
//       check_arr[i] = 1;
//     } else if (card_arr[i].offset().left > (win_wid*1.68) && check_arr[i] != 1) {
//       count_arr[i] = -(win_wid*0.2) - s_pos;
//       gsap.set(card_arr_1[i], { x: -(win_wid*0.2) });
//       check_arr[i] = 0;
//     } else {
//       gsap.to(card_arr_1[i], { x: (count_arr[i] + s_pos) });
//       check_arr[i] = 0;
//     }
//   }


// }





function homeScroll() {
  let quantity = $(".card_item");
  $(quantity).each(function () {
    let self = $(this);
    let index = self.index();
    let number = $(self).find(".p_number");
    $(number).text("0" + (index + 1));
  });

  document.addEventListener("readystatechange", function () {
    if (document.readyState === "complete") {
      const $body = document.querySelector("main");
      const $menu = document.querySelector(".card_list");
      const $items = document.querySelectorAll(".card_item");
      let menuWidth = $body.clientWidth;
      let itemWidth = $items[0].clientWidth;
      let wrapWidth = $items.length * itemWidth;

      let scrollSpeed = 0;
      let oldScrollY = 0;
      let scrollY = 0;
      let y = 0;

      const lerp = (v0, v1, t) => {
        return v0 * (1 - t) + v1 * t;
      };

      const update = (scroll) => {
        gsap.set($items, {
          x: (i) => {
            return i * itemWidth + scroll;
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
        scrollY -= e.deltaY * 0.9;
      };

      let touchStart = 0;
      let touchX = 0;
      let isDragging = false;
      const handleTouchStart = (e) => {
        touchStart = e.clientX || e.touches[0].clientX;
        isDragging = true;
        $body.classList.add("is-dragging");
      };
      const handleTouchMove = (e) => {
        if (!isDragging) return;
        touchX = e.clientX || e.touches[0].clientX;
        scrollY += (touchX - touchStart) * 12;
        touchStart = touchX;
      };
      const handleTouchEnd = () => {
        isDragging = false;
        $body.classList.remove("is-dragging");
      };

      $body.addEventListener("mousewheel", handleMouseWheel);

      $body.addEventListener("touchstart", handleTouchStart);
      $body.addEventListener("touchmove", handleTouchMove);
      $body.addEventListener("touchend", handleTouchEnd);

      $body.addEventListener("mousedown", handleTouchStart);
      $body.addEventListener("mousemove", handleTouchMove);
      $body.addEventListener("mouseleave", handleTouchEnd);
      $body.addEventListener("mouseup", handleTouchEnd);

      $body.addEventListener("selectstart", () => {
        return false;
      });

      window.addEventListener("resize", () => {
        menuWidth = $body.clientWidth;
        itemWidth = $items[0].clientWidth;
        wrapWidth = $items.length * itemWidth;
      });

      const render = () => {
        requestAnimationFrame(render);
        y = lerp(y, scrollY, 0.1);
        update(y);
        let progress = -y / wrapWidth;
        let fract = progress - Math.floor(progress);
        $log.innerText = Math.round(fract * 100) + "%";

        scrollSpeed = y - oldScrollY;
        oldScrollY = y;

        gsap.to($menu, {
          rotate: scrollSpeed * 0.05
        });
      };
      render();
    }
  });
}
homeScroll();





