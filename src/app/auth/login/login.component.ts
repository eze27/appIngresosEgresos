import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { auth } from 'firebase';
import { Store } from '@ngrx/store';
import { appState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,OnDestroy {
  loading:boolean;
  subscription:Subscription = new Subscription();
  constructor(private auht:AuthService,public store:Store<appState>) { }

  ngOnInit() {
   this.subscription =  this.store.select('ui').subscribe( data => this.loading = data.isLoading )
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
  login(data){
    this.auht.login(data.email,data.password);
  }
}
