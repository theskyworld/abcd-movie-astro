import Hls from "hls.js";

export function playM3u8(videoSrc: string, videoElem: HTMLVideoElement) {
  if (Hls.isSupported()) {
    const hls = new Hls();
    hls.loadSource(videoSrc);
    hls.attachMedia(videoElem);
    hls.on(Hls.Events.MANIFEST_PARSED, function () {
      videoElem.play();
    });
  }
}

// 播放暂停
export function playPause(videoElem: HTMLVideoElement) {
  videoElem.paused ? videoElem.play() : videoElem.pause();
}

// 音量+
export function volumeUp(videoElem: HTMLVideoElement) {
  if (videoElem.volume <= 0.9) videoElem.volume += 0.1;
}

// 音量-
export function volumeDown(videoElem: HTMLVideoElement) {
  if (videoElem.volume >= 0.1) videoElem.volume -= 0.1;
}

// 前进
export function seekRight(videoElem: HTMLVideoElement) {
  videoElem.currentTime += 5;
}

// 后退
export function seekLeft(videoElem: HTMLVideoElement) {
  videoElem.currentTime -= 5;
}

// 全屏
export function vidFullscreen(videoElem: HTMLVideoElement) {
  if (videoElem.requestFullscreen) {
    videoElem.requestFullscreen();
  }
}
