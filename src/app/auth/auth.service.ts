import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import  {map}  from 'rxjs/operators';
import { User } from './user.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { appState } from '../app.reducer';
import { activarLoadingAction, desactivarLoadingAction } from '../shared/ui.actions';
import { SetUserAction } from './auth.actions';
import { Subscription } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  subscription:Subscription = new Subscription();
  constructor(public afAuth: AngularFireAuth,private router:Router,public db:AngularFirestore,public store:Store<appState>) { }
  initAuthListener(){
    this.afAuth.authState.subscribe( fbUser => {
      if (fbUser) {
      this.subscription =  this.db.doc(`${ fbUser.uid}/usuario`).valueChanges().subscribe( (usuarioObj:any) => {
          console.log(usuarioObj);
         const newUser = new User(usuarioObj);
         this.store.dispatch(new SetUserAction(newUser));
        })
      }else {
        this.subscription.unsubscribe();
      }
    })
  }
  crearUsuario(nombre, email, password){
    this.store.dispatch(new activarLoadingAction());
    this.afAuth.auth.createUserWithEmailAndPassword(email,password)
                     .then( resp => {
                      console.log(resp);
                      const user:User = {
                        uid:resp.user.uid,
                        nombre:nombre,
                        email:resp.user.email
                      }
                      this.db.doc(`${user.uid}/usuario`).set(user).then( resp =>{
                        this.router.navigate(['/']);
                        this.store.dispatch(new desactivarLoadingAction());
                      })
                      .catch(err => {
                        console.log(err)
                      })
                     
                     })
                     .catch( err=> {
                       console.log(err);
                       this.store.dispatch(new desactivarLoadingAction());
                       Swal.fire('Ha ocurrido un error',err.message,'error');
                     })
  }
  login(email,password:string){
    this.store.dispatch(new activarLoadingAction());
    this.afAuth.auth.signInWithEmailAndPassword(email,password)
                     .then( resp => {
                      console.log(resp);
                      this.router.navigate(['/']);
                      this.store.dispatch(new desactivarLoadingAction());
                     })
                     .catch(err =>{
                      console.log(err)
                      Swal.fire('Ha ocurrido un error',err.message,'error');
                      this.store.dispatch(new desactivarLoadingAction());
                     })
  }

  logout(){
    this.router.navigate(['/login']);
    this.afAuth.auth.signOut();
  }
  isAuth(){
    return this.afAuth.authState.pipe( map(fbuser => {
      if (fbuser == null ) {
        this.router.navigate(['/login']);
      }
      console.log( fbuser != null );
     return fbuser != null
    }))
  }
}
