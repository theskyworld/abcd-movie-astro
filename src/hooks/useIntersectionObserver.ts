import { onUnmounted } from "vue";

export default function useIntersectionObserver(
  targetElem: HTMLElement,
  cb: () => void,
) {
  if (targetElem && cb) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        cb();
      }
    });
    observer.observe(targetElem);
    onUnmounted(() => {
      observer.unobserve(targetElem);
    });
  }
}
