import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {UserService} from "../_services/user.service";
import {Dot} from "../models/dot.model";
import {NgForm} from "@angular/forms";
import {StorageService} from "../_services/storage.service";
import {DotsService} from "../_services/dots.service";
import {CanvasService} from "../_helpers/canvas.service";
import {MessageService} from "primeng/api";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  @ViewChild('canvas', {static: true}) canvas!: ElementRef<HTMLCanvasElement>;

  sleep = async (waitTime: number) =>
    new Promise(resolve =>
      setTimeout(resolve, waitTime));

  content?: string;
  canvasService?: CanvasService;
  xyVals: number[];
  dots: Dot[];
  canvasSize = '211px';

  X?: number;
  Y?: number;
  R?: number;

  form = {
    X: '',
    Y: '',
    R: null,
  };

  constructor(private userService: UserService, private storageService: StorageService, private dotsService: DotsService, private messageService: MessageService) {
    this.xyVals = Array.from(Array(9).keys()).map(x => x - 3);
    this.dots = [];
  }

  ngOnInit() {
    this.canvasService = new CanvasService(this.canvas);
    this.canvasService.draw(this.dots, this.form.R);
    this.dotsService.loadAllDots().subscribe({
      next: value => {
        this.dots = this.dotsService.fromArray(value);
        // @ts-ignore
        this.canvasService.draw(this.dots, this.form.R);
      },
      error: err => {
        if (err.status == 401) {
          (async () => {
            this.messageService.add({severity: 'error', summary: 'Авторизуйтесь', detail: 'Для выполнения данного запроса необходима авторизация'});
            await this.sleep(2000);
            this.storageService.clean();
            window.location.reload();
          })();
        } else {
          console.log(err);
        }
      }
    });
    this.delayedUpdate();
  }

  async delayedUpdate() {
    while (true) {
      await this.sleep(5000);
      this.dotsService.loadAllDots().subscribe({
        next: value => {
          this.dots = this.dotsService.fromArray(value);
          // @ts-ignore
          this.canvasService.draw(this.dots, this.form.R);
        },
        error: err => {
          if (err.status == 401) {
            (async () => {
              this.messageService.add({severity: 'error', summary: 'Авторизуйтесь', detail: 'Для выполнения данного запроса необходима авторизация'});
              await this.sleep(2000);
              this.storageService.clean();
              window.location.reload();
            })();
          } else {
            console.log(err);
          }
        }
      })
    }
  }

  onSubmit() {
    this.addDot(+this.form.X, +(this.form.Y.replace(',', '.')), Number(this.form.R));
  }

  addDot(x: number, y: number, r: number) {
    this.dotsService.addDot(x, y, r).subscribe({
      next: data => {
        this.dotsService.pushDot(this.dots, data);
        // @ts-ignore
        this.canvasService.draw(this.dots, this.form.R);
      },
      error: err => {
        if (err.status == 401) {
          (async () => {
            this.messageService.add({severity: 'error', summary: 'Авторизуйтесь', detail: 'Для выполнения данного запроса необходима авторизация'});
            await this.sleep(2000);

            this.storageService.clean();
            window.location.reload();
          })();
        } else {
          console.log(err);
        }
      }
    })
  }

  deleteDots() {
    this.dotsService.removeDots().subscribe({
      next: () => {
        this.dots = [];
        // @ts-ignore
        this.canvasService.draw(this.dots, this.form.R);
      },
      error: err => {
        if (err.status == 401) {
          (async () => {
            this.messageService.add({severity: 'error', summary: 'Авторизуйтесь', detail: 'Для выполнения данного запроса необходима авторизация'});
            await this.sleep(2000);
            this.storageService.clean();
            window.location.reload();
          })();
        } else {
          console.log(err);
        }
      }
    })
  }

  onReset(form: NgForm) {
    form.reset();
    this.rChanged();
  }

  rChanged() {
    // @ts-ignore
    this.canvasService.draw(this.dots, this.form.R);
  }

  canvasClick(event: MouseEvent) {
    if (this.form.R != null) {
      this.messageService.clear();

      // @ts-ignore
      this.canvasService.draw(this.dots, this.form.R);

      // @ts-ignore
      let mx = this.canvasService.MX(event.offsetX, this.form.R);
      // @ts-ignore
      let my = this.canvasService.MY(event.offsetY, this.form.R);

      this.addDot(mx, my, this.form.R);
    } else {
      this.messageService.add({severity: 'error', summary: 'R не выбрано', detail: 'Выберите R перед проверкой точки на попадание в область'});
    }
  }
}
