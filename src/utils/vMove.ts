/* 封装自定义拖动指令 */

import type { Directive } from 'vue'

export const vMove: Directive = {
  mounted(el: HTMLElement) {
    let moveEl = el.firstElementChild as HTMLElement;
    const mouseDown = (e: MouseEvent) => {
      //鼠标点击物体那一刻相对于物体左侧边框的距离=点击时的位置相对于浏览器最左边的距离-物体左边框相对于浏览器最左边的距离
      // console.log(e.clientX, e.clientY, "-----起始", el.offsetLeft);
      let X = e.clientX - el.offsetLeft;
      let Y = e.clientY - el.offsetTop;
      // console.log(X,Y);
      const move = (e: MouseEvent) => {
        // 当前的坐标
        let XSide = e.clientX - X
        let YSide = e.clientY - Y
        // 获取浏览器的宽高
        let clientWidth = document.body.clientWidth
        let clientHeight = document.body.clientHeight
        // 如果当前坐标x,y在浏览器内可以自由移动
        if (XSide> 50 && XSide < clientWidth-50 && YSide > 50 && YSide < clientHeight-50) {
          el.style.left = XSide + "px";
          el.style.top = YSide + "px";
        }
        // console.log(XSide, YSide, "---改变");
      };
      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", () => {
        document.removeEventListener("mousemove", move);
      });
    };
    moveEl.addEventListener("mousedown", mouseDown);
  },
};