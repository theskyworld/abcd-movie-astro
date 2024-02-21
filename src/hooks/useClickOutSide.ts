import { onUnmounted } from "vue";
export default function useClickOutSide(
  targetElem: Element,
  callback: () => void,
) {
  if (targetElem && callback) {
    document.onclick = (e) => {
      // 同时剔除右上角的登录按钮，避免点击该按钮显示登录卡片时造成冲突
      if (
        !isMouseInElem(targetElem, { x: e.clientX, y: e.clientY }) &&
        !(e.clientX >= 1270 && e.clientY <= 50)
      ) {
        callback();
      }
    };
    onUnmounted(() => {
      document.onclick = null;
    });
  }
}

//  判断鼠标是否在指定的元素区域内
function isMouseInElem(elem: Element, mousePos: { x: number; y: number }) {
  // 判断鼠标鼠标是否在元素四个顶点坐标形成的区域内
  const elemBoundingClientRect = elem.getBoundingClientRect();
  const { x: mouseX, y: mouseY } = mousePos;
  if (
    mouseX <= elemBoundingClientRect.x + elemBoundingClientRect.width &&
    mouseX >= elemBoundingClientRect.x &&
    mouseY <= elemBoundingClientRect.y + elemBoundingClientRect.height &&
    mouseY >= elemBoundingClientRect.y
  ) {
    return true;
  }
  return false;
}
