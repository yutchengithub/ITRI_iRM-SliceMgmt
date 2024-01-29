import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private commonService: CommonService) { }

  canActivate() {
    const sessionId = this.commonService.getSessionId();
    console.log('AuthGuard sessionId = ' + sessionId);
    if (sessionId) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
