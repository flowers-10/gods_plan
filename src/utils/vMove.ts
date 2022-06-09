/* 封装自定义拖动指令 */

import type { Directive } from 'vue'

export const vMove: Directive = {
  mounted(el: HTMLElement) {
    let moveEl = el.firstElementChild as HTMLElement;
    const mouseDown = (e: MouseEvent) => {
      //鼠标点击物体那一刻
      //相对于物体左侧边框的距离=点击时的位置相对于浏览器最左边的距离-物体左边框相对于浏览器最左边的距离
      let X = e.clientX - el.offsetLeft;
      let Y = e.clientY - el.offsetTop;
      // console.log(e.clientX,e.clientY ,'鼠标坐标');
      // console.log(el.offsetLeft,el.offsetTop ,'物体边框离浏览器的距离');
      
      const move = (e: MouseEvent) => {
        // 当前div左上角点的(x,y)的坐标
        let XSide = e.clientX - X
        let YSide = e.clientY - Y
        // console.log('当前的XY坐标：',XSide,YSide);
        
        // 获取浏览器的宽高
        let clientWidth = document.body.clientWidth
        let clientHeight = document.body.clientHeight
        
        // 如果当前div坐标(x,y)在浏览器内可以自由移动
        if (XSide > 0 && XSide < clientWidth - el.offsetWidth && YSide > 0 && YSide < clientHeight - el.offsetHeight) {
          el.style.left = XSide + "px";
          el.style.top = YSide + "px";
        }  
      };
      // 拖动时无法选中文字
      document.body.onselectstart = function () {
        return false;
      }
      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", () => {
        document.removeEventListener("mousemove", move);
        document.body.onselectstart = function(){
          　　return true;
          }
      });
    };
    moveEl.addEventListener("mousedown", mouseDown);
  },
};