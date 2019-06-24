import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import { appState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit,OnDestroy {
  loading:boolean;
  subscription:Subscription = new Subscription();
  constructor(private auth:AuthService,public store:Store<appState>) { }

  ngOnInit() {
   this.subscription =  this.store.select('ui').subscribe( data => this.loading = data.isLoading )
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
  onSubmit(data){
     this.auth.crearUsuario(data.nombre,data.email,data.password)
  }
}
