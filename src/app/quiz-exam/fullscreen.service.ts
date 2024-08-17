import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FullscreenService {
  private renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  enterFullscreen(element: HTMLElement) {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if ((<any>element).mozRequestFullScreen) { // Firefox
      (<any>element).mozRequestFullScreen();
    } else if ((<any>element).webkitRequestFullscreen) { // Chrome, Safari and Opera
      (<any>element).webkitRequestFullscreen();
    } else if ((<any>element).msRequestFullscreen) { // IE/Edge
      (<any>element).msRequestFullscreen();
    }
  }

  exitFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if ((<any>document).mozCancelFullScreen) { // Firefox
      (<any>document).mozCancelFullScreen();
    } else if ((<any>document).webkitExitFullscreen) { // Chrome, Safari and Opera
      (<any>document).webkitExitFullscreen();
    } else if ((<any>document).msExitFullscreen) { // IE/Edge
      (<any>document).msExitFullscreen();
    }
  }

  isFullscreen(): boolean {
    return document.fullscreenElement != null;
  }
}
