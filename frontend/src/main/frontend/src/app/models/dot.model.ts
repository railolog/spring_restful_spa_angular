
export class Dot {
  x: number;
  y: number;
  r: number;
  hit: boolean;
  creationDate: string;
  execTime: number;


  constructor(x: number, y: number, r: number, hit: boolean, dateTime: number, execTime: number) {
    this.x = Math.round(x * 100) / 100;
    this.y = Math.round(y * 100) / 100;
    this.r = Math.round(r * 100) / 100;
    this.hit = hit;
    this.creationDate = (new Date(dateTime * 1000 + new Date().getTimezoneOffset() * 60 * 1000)).toLocaleDateString(undefined, {dateStyle: "medium"});
    this.execTime = Math.round(execTime * 1000) / 1000;
  }
}
