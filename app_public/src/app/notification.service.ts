import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(public sb: MatSnackBar ) { }

  config: MatSnackBarConfig = {
    duration: 3000,
    horizontalPosition: 'center',
    verticalPosition: 'top'
  }

  success(msg:string) {
    this.config['panelClass'] = ['success', 'notification']
    this.sb.open(msg,'', this.config)
  }

  error(msg:string) {
    this.config['panelClass'] = ['error', 'notification']
    this.sb.open(msg,'', this.config)
  }
}
