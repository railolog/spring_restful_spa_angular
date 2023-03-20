import {ElementRef} from "@angular/core";
import {Dot} from "../models/dot.model";


export class CanvasService {
  canvas: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  maxX: number;
  maxY: number;


  constructor(canvas: ElementRef<HTMLCanvasElement>) {
    this.canvas = canvas;
    // @ts-ignore
    this.ctx = this.canvas.nativeElement.getContext('2d');

    this.width = this.ctx.canvas.width;
    this.height = this.ctx.canvas.height;

    this.maxX = 10.5;
    this.maxY = 10.5;
  }

  XC(x: number): number {
    return (x + this.maxX) / (this.maxX * 2) * this.width;
  }

  YC(y: number): number {
    return this.height - (y + this.maxY) / (this.maxY * 2) * this.height;
  }

  XR(x: number, r: number): number {
    return (x + 1.5 * r) / (3 * r) * this.width;
  }

  YR(y: number, r: number): number {
    return this.height - (y + 1.5 * r) / (3 * r) * this.height;
  }

  MX(x: number, r: number): number {
    return (3 * r * x) / this.width - 1.5 * r;
  }

  MY(y: number, r: number): number {
    return 3 * r * (this.height - y) / this.height - 1.5 * r;
  }

  draw_dec_lines(w: number, h: number){
    this.ctx.beginPath();
    this.ctx.moveTo(4, h/2);
    this.ctx.lineTo(w - 4, h/2);
    this.ctx.lineTo(w - 12, h/2 - 4)
    this.ctx.moveTo(w - 4, h/2)
    this.ctx.lineTo(w - 12, h/2 + 4)

    this.ctx.moveTo(w/2, h - 4);
    this.ctx.lineTo(w/2, 4);
    this.ctx.lineTo(w/2 - 4, 12)
    this.ctx.moveTo(w/2, 4)
    this.ctx.lineTo(w/2 + 4, 12)

    for (let i = 1; i < 6; i++){
      let x = w/6 * i;
      this.ctx.moveTo(x, h/2 - 4)
      this.ctx.lineTo(x, h/2 + 4)
    }

    for (let i = 1; i < 6; i++){
      let y = h/6 * i;
      this.ctx.moveTo(w/2 - 4, y)
      this.ctx.lineTo(w/2 + 4, y)
    }

    this.ctx.stroke();
  }

  draw_text(w: number, h: number, r: number | string){
    this.ctx.fillStyle = 'black';
    this.ctx.font = '12px sans-serif';

    let x = w / 6
    let y = h / 6
    if (r == null){
      r = 'R'
    } else {
      r = r.toString();
    }

    if (r[0] == '-') {
      this.ctx.fillText(r + '/2', x * 4 - 6, h / 2 - 7)
      this.ctx.fillText(r, x * 5 - 4, h / 2 - 7)
      this.ctx.fillText(r + '/2', w / 2 + 7, y * 2 + 4)
      this.ctx.fillText(r, w / 2 + 7, y + 4)

      r = r.replace('-', '');
      this.ctx.fillText(r, x - 6, h / 2 - 7)
      this.ctx.fillText(r + '/2', x * 2 - 6, h / 2 - 7)
      this.ctx.fillText(r, w / 2 + 7, y * 5 + 4)
      this.ctx.fillText(r + '/2', w / 2 + 7, y * 4 + 4)
    } else {
      this.ctx.fillText('-' + r, x - 6, h / 2 - 7)
      this.ctx.fillText('-' + r + '/2', x * 2 - 6, h / 2 - 7)
      this.ctx.fillText(r + '/2', x * 4 - 6, h / 2 - 7)
      this.ctx.fillText(r, x * 5 - 4, h / 2 - 7)

      this.ctx.fillText('-' + r, w / 2 + 7, y * 5 + 4)
      this.ctx.fillText('-' + r + '/2', w / 2 + 7, y * 4 + 4)
      this.ctx.fillText(r + '/2', w / 2 + 7, y * 2 + 4)
      this.ctx.fillText(r, w / 2 + 7, y + 4)
    }
    this.ctx.fillText('x', x * 6 - 6, h / 2 - 7)
    this.ctx.fillText('y', w / 2 + 7, 8)
  }

  batman_upper(x: number): number {
    x = Math.abs(x);

    if (x < 0.5) {
      return 2.25;
    } else if (x < 0.75) {
      return 3 * x + 0.75;
    } else if (x < 1) {
      return 9 - 8 * x;
    } else if (x < 3) {
      return 1.5 - 0.5 * x - 3 * Math.sqrt(10)/7 * (Math.sqrt(3 - x*x + 2*x) - 2);
    } else if (x <= 7) {
      return 3 * Math.sqrt(1 - x * x / 7 / 7);
    }
    return 0;
  }

  batman_lower(x: number): number {
    //console.log(x);
    x = Math.abs(x);

    if (x < 4) {
      return (Math.abs(x / 2) - (3*Math.sqrt(33) - 7) / 112 * x**2 +
        Math.sqrt(1 - (Math.abs(x - 2) - 1)**2) - 3);
    } else if (x <= 7) {
      return -3 * Math.sqrt(-((x / 7)**2) + 1);
    }
    return 0;
  }

  render_function(f: (x: number) => number, k = 1, flag = true) {
    let first = flag;
    let step = (this.maxX * 2 / this.width);

    if (flag) {
      this.ctx.beginPath();
    }
    for (let x = -7; x <= 7; x += step) {
      x *= k;
      let y = f(x);

      if (first) {
        this.ctx.moveTo(this.XC(x), this.YC(y));
        first = false;
      } else {
        //console.log(this.XC(x), this.YC(y))
        this.ctx.lineTo(this.XC(x), this.YC(y));
      }
      x *= k;
    }
    if (k == -1) {
      let grad = this.ctx.createLinearGradient(this.XC(-7), 0, this.XC(7), 0);
      grad.addColorStop(0, "red")
      grad.addColorStop(1 / 5, "orange")
      grad.addColorStop(2 / 5, "yellow")
      grad.addColorStop(3 / 5, "green")
      grad.addColorStop(4 / 5, "blue")
      grad.addColorStop(1, "purple")

      this.ctx.fillStyle = grad;
      this.ctx.globalAlpha = 0.5;
      this.ctx.fill();

      this.ctx.globalAlpha = 1;
      this.ctx.fillStyle = "black";
    }
  }

  cumulativeOffset(element: ElementRef<HTMLCanvasElement>){
    let cop = element.nativeElement;
    let top = 0, left = 0;
    do {
      top += cop.offsetTop  || 0;
      left += cop.offsetLeft || 0;
      cop = <HTMLCanvasElement>cop.offsetParent;
    } while(cop);

    return {
      top: top,
      left: left
    };
  }

  draw_dot(x: number, y: number, hit: boolean) {
    let scaleX = this.width / this.canvas.nativeElement.getBoundingClientRect().width;
    let scaleY = this.height / this.canvas.nativeElement.getBoundingClientRect().height;

    this.ctx.beginPath();

    if (hit) {
      this.ctx.fillStyle = 'green';
    } else {
      this.ctx.fillStyle = 'red';
    }
    this.ctx.arc(x * scaleX, y * scaleY, 2, 0, 2 * Math.PI);
    this.ctx.fill();
  }

  draw(dots: Dot[], r: number | null) {
    this.width = this.canvas.nativeElement.getBoundingClientRect().width;
    this.height = this.width;
    this.canvas.nativeElement.setAttribute('width', String(this.width));
    this.canvas.nativeElement.setAttribute('height', String(this.height));

    this.render_function(this.batman_upper);
    this.render_function(this.batman_lower, -1, false);

    this.draw_dec_lines(this.width, this.height);

    for (let dot of dots) {
      if (r == null) {
        this.draw_dot(this.XR(dot.x, dot.r), this.YR(dot.y, dot.r), dot.hit);
      } else {
        if (dot.r == r) {
          this.draw_dot(this.XR(dot.x, dot.r), this.YR(dot.y, dot.r), dot.hit);
        }
      }
    }

    if (r == null) {
      this.draw_text(this.width, this.height, 'R');
    } else {
      this.draw_text(this.width, this.height, r);
    }
  }


}
