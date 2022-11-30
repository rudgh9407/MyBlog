
const cont_2 = document.querySelector('.home_page');
const slider = document.querySelector('.home_page>section');
let s_pos = 0;


let cc = 0;
cont_2.addEventListener('wheel',function(e){
  e.preventDefault;
  move_slider(e.deltaY/5);
});
let win_wid = window.innerWidth;

let count_1 = win_wid * (-1 * 0.2);
let check_1 = 0;
let count_2 = win_wid * 0.04;
let check_2 = 0;
let count_3 = win_wid * 0.28;
let check_3 = 0;
let count_4 = win_wid * 0.52;
let check_4 = 0;
let count_5 = win_wid * 0.76;
let check_5 = 0;
let count_6 = win_wid * 1;
let check_6 = 0;
let count_7 = win_wid * 1.24;
let check_7 = 0;
let count_8 = win_wid * 1.48;
let check_8 = 0;

  const card_ani = [
    { transform: `rotate(0deg)` },
    { transform: `rotate(-2deg)` },
    { transform: `rotate(0deg)` },
  ];
  const card_time = {
    duration: 400,
    iterations: 1
  }
  let ani_key = 0;

  let count_arr = [count_1, count_2, count_3, count_4, count_5, count_6, count_7, count_8];
  let check_arr = [check_1, check_2, check_3, check_4, check_5, check_6, check_7, check_8];
  let card_arr = [$(`.card_1`), $(`.card_2`), $(`.card_3`), $(`.card_4`), $(`.card_5`), $(`.card_6`), $(`.card_7`), $(`.card_8`)];

function move_slider(amount){
  s_pos -= amount;
  if(ani_key == 0){
    ani_key = 1;
    $(`.home_page>section`)[0].animate(card_ani, card_time);
    setTimeout(()=>{ani_key = 0}, 400);
  }
  
  for(let i=0; i<8; i++){
    if(card_arr[i].offset().left < -(win_wid*0.41)){
      count_arr[i] = (win_wid*1.48) - s_pos;
      card_arr[i].css({left: `${(win_wid*1.48)}px`});
      check_arr[i] = 1;
    } else if (card_arr[i].offset().left > (win_wid*1.49) && check_arr[i] != 1) {
      count_arr[i] = -(win_wid*0.4) - s_pos;
      card_arr[i].css({left: `${-(win_wid*0.4)}px`});
      check_arr[i] = 0;
    } else {
      card_arr[i].css({left: `${count_arr[i] + s_pos}px`});
      check_arr[i] = 0;
    }
  }

/*
    if($(`.card_2`).offset().left < -(win_wid*0.41)){
      count_2 = (win_wid*1.48) - s_pos;
      $(`.card_2`).css({left: `${(win_wid*1.48)}px`});
      check_2 = 1;
    } else if ($(`.card_2`).offset().left > (win_wid*1.49) && check_2 != 1) {
      count_2 = -(win_wid*0.4) - s_pos;
      $(`.card_2`).css({left: `${-(win_wid*0.4)}px`});
      check_2 = 0;
    } else {
      $(`.card_2`).css({left: `${count_2 + s_pos}px`});
      check_2 = 0;
    }

    if($(`.card_3`).offset().left < -(win_wid*0.41)){
      count_3 = (win_wid*1.48) - s_pos;
      $(`.card_3`).css({left: `${(win_wid*1.48)}px`});
      check_3 = 1;
    } else if ($(`.card_3`).offset().left > (win_wid*1.49) && check_3 != 1) {
      count_3 = -(win_wid*0.4) - s_pos;
      $(`.card_3`).css({left: `${-(win_wid*0.4)}px`});
      check_3 = 0;
    } else {
      $(`.card_3`).css({left: `${count_3 + s_pos}px`});
      check_3 = 0;
    }

    if($(`.card_4`).offset().left < -(win_wid*0.41)){
      count_4 = (win_wid*1.48) - s_pos;
      $(`.card_4`).css({left: `${(win_wid*1.48)}px`});
      check_4 = 1;
    } else if ($(`.card_4`).offset().left > (win_wid*1.49) && check_4 != 1) {
      count_4 = -(win_wid*0.4) - s_pos;
      $(`.card_4`).css({left: `${-(win_wid*0.4)}px`});
      check_4 = 0;
    } else {
      $(`.card_4`).css({left: `${count_4 + s_pos}px`});
      check_4 = 0;
    }

    if($(`.card_5`).offset().left < -(win_wid*0.41)){
      count_5 = (win_wid*1.48) - s_pos;
      $(`.card_5`).css({left: `${(win_wid*1.48)}px`});
      check_5 = 1;
    } else if ($(`.card_5`).offset().left > (win_wid*1.49) && check_5 != 1) {
      count_5 = -(win_wid*0.4) - s_pos;
      $(`.card_5`).css({left: `${-(win_wid*0.4)}px`});
      check_5 = 0;
    } else {
      $(`.card_5`).css({left: `${count_5 + s_pos}px`});
      check_5 = 0;
    }

    if($(`.card_6`).offset().left < -(win_wid*0.41)){
      count_6 = (win_wid*1.48) - s_pos;
      $(`.card_6`).css({left: `${(win_wid*1.48)}px`});
      check_6 = 1;
    } else if ($(`.card_6`).offset().left > (win_wid*1.49) && check_6 != 1) {
      count_6 = -(win_wid*0.4) - s_pos;
      $(`.card_6`).css({left: `${-(win_wid*0.4)}px`});
      check_6 = 0;
    } else {
      $(`.card_6`).css({left: `${count_6 + s_pos}px`});
      check_6 = 0;
    }

    if($(`.card_7`).offset().left < -(win_wid*0.41)){
      count_7 = (win_wid*1.48) - s_pos;
      $(`.card_7`).css({left: `${(win_wid*1.48)}px`});
      check_7 = 1;
    } else if ($(`.card_7`).offset().left > (win_wid*1.49) && check_7 != 1) {
      count_7 = -(win_wid*0.4) - s_pos;
      $(`.card_7`).css({left: `${-(win_wid*0.4)}px`});
      check_7 = 0;
    } else {
      $(`.card_7`).css({left: `${count_7 + s_pos}px`});
      check_7 = 0;
    }

    if($(`.card_8`).offset().left < -(win_wid*0.41)){
      count_8 = (win_wid*1.48) - s_pos;
      $(`.card_8`).css({left: `${(win_wid*1.48)}px`});
      check_8 = 1;
    } else if ($(`.card_8`).offset().left > (win_wid*1.49) && check_8 != 1) {
      count_8 = -(win_wid*0.4) - s_pos;
      $(`.card_8`).css({left: `${-(win_wid*0.4)}px`});
      check_8 = 0;
    } else {
      $(`.card_8`).css({left: `${count_8 + s_pos}px`});
      check_8 = 0;
    }
*/

}





