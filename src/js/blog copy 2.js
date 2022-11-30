
const cont_2 = document.querySelector('.home_page');
const slider = document.querySelector('.home_page>section');
let s_pos = 0;


let cc = 0;
cont_2.addEventListener('wheel',function(e){
  move_slider(e.deltaY/10);
  console.log(s_pos);
});
let win_wid = window.innerWidth;

let count_1 = win_wid * 0;
let count_2 = win_wid * 0.3;
let count_3 = win_wid * 0.6;
let count_4 = win_wid * 0.9;
let count_5 = win_wid * 1.2;

function move_slider(amount){
  s_pos -= amount;
  


  if($(`.card_1`).offset().left < -$(`.card_1`).width()){
    count_1 = (win_wid*1.25) - s_pos;
    $(`.card_1`).css({left: `${count_1}px`})
  // } else if ($(`.card_1`).offset().left > (win_wid-s_pos+($(`.card_1`).width()*1.2))) {
  //   console.log('ssssssss' + s_pos);
  //   console.log('offff' +$(`.card_1`).offset().left);
  //   $(`.card_1`).css({left: `${(s_pos - $(`.card_1`).width())}px`})
  } else {
    $(`.card_1`).css({left: `${count_1 + s_pos}px`})
  }

  if($(`.card_2`).offset().left < -$(`.card_1`).width()){
    count_2 = (win_wid*1.25) - s_pos;
    $(`.card_2`).css({left: `${count_2}px`})
  } else {
      $(`.card_2`).css({left: `${count_2 + s_pos}px`})
  }

  if($(`.card_3`).offset().left < -$(`.card_1`).width()){
    count_3 = (win_wid*1.25) - s_pos;
    $(`.card_3`).css({left: `${count_3}px`})
  } else {
      $(`.card_3`).css({left: `${count_3 + s_pos}px`})
  }

  if($(`.card_4`).offset().left < -$(`.card_1`).width()){
    count_4 = (win_wid*1.25) - s_pos;
    $(`.card_4`).css({left: `${count_4}px`})
  } else {
      $(`.card_4`).css({left: `${count_4 + s_pos}px`})
  }

  console.log('1 ----- ' + count_5);
  console.log('2 ----- ' + $(`.card_5`).offset().left);
  if($(`.card_5`).offset().left < -$(`.card_1`).width()){
    count_5 = (win_wid*1.25) - s_pos;
    $(`.card_5`).css({left: `${count_5}px`})
  } else if($(`.card_5`).offset().left > (count_5)) {
    $(`.card_5`).css({left: `${count_5 - s_pos}px`});
  } else {
    $(`.card_5`).css({left: `${count_5 + s_pos}px`})
  }


  // if($(`.card_2`).offset().left < -$(`.card_1`).width()){
  //   $(`.card_2`).css({left: `${(win_wid - s_pos) + s_pos}px`})
  // } else {
  //   $(`.card_2`).css({left: `${(win_wid*0.3) + s_pos}px`})
  // }
  // if($(`.card_3`).offset().left < -$(`.card_1`).width()){
  //   $(`.card_3`).css({left: `${(win_wid - s_pos) + s_pos}px`})
  // } else {
  //   $(`.card_3`).css({left: `${(win_wid*0.6) + s_pos}px`})
  // }
  // if($(`.card_4`).offset().left < -$(`.card_1`).width()){
  //   $(`.card_4`).css({left: `${(win_wid - s_pos) + s_pos}px`})
  // } else {
  //   $(`.card_4`).css({left: `${(win_wid*0.9) + s_pos}px`})
  // }
  // if($(`.card_5`).offset().left < -$(`.card_1`).width()){
  //   $(`.card_5`).css({left: `${(win_wid - s_pos) + s_pos}px`})
  // } else {
  //   $(`.card_5`).css({left: `${(win_wid*1.2) + s_pos}px`})
  //}

}





