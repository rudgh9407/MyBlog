const cont_2 = document.getElementById('cont_2');
const slider = document.getElementById('slider');
const s_wid = slider.offsetWidth;
const s_li = slider.children;
let win_wid = window.innerWidth;
let s_move_max = (s_wid - (win_wid/2)) * -1;
let s_pos = 0;
let li_pos = 0;

let page = 2;

// cont_2.addEventListener('wheel',function(e){
//   e.preventDefault;
//   move_slider(e.deltaY);
// 	console.log( (win_wid - s_pos) + " >= " + document.body.offsetWidth );
// 	if ((win_wid - s_pos) >= document.body.offsetWidth) {
//     // let copy = $(`#slider>li:nth-child(1)`).clone();
// 		// $(`#slider`).append(copy);
// 	}
//   console.log($(`#slider>li:first-child`).offset().left);
//   if($(`#slider>li:first-child`).offset().left < -$(`#slider>li`).width()){
//     let copy = $(`#slider>li:first-child`);
// 		$(`#slider`).append(copy);
//     // $(`#slider>li:first-child`).remove();
//   }
// });

let count = 0;
let cc = 0;
// window.onscroll = function(e) {
cont_2.addEventListener('wheel',function(e){
  move_slider(e.deltaY);
  console.log((win_wid - s_pos) + '>=' + (document.body.offsetWidth*count));
  if((win_wid - s_pos) >= (document.body.offsetWidth+((win_wid*0.8)*count))) {
    count++;
    cc = $(`#slider>li:first-child`).remove();
    $(`#slider`).append(cc);
  }
});


function move_slider(amount){
  s_pos -= amount;
  // if(s_pos < s_move_max){
  //   // s_pos = s_move_max;
  //   return;
  // }else if(s_pos > 0){
  //   s_pos = 0;
  //   return;
  // }
  slider.style.transform = `translateX(${s_pos}px)`;
}




