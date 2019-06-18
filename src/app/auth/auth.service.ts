import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import  {map}  from 'rxjs/operators';
import { User } from './user.model';
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afAuth: AngularFireAuth,private router:Router,public db:AngularFirestore) { }
  initAuthListener(){
    this.afAuth.authState.subscribe( fbUser => {
      console.log(fbUser);
    })
  }
  crearUsuario(nombre, email, password){
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
                      })
                      .catch(err => {
                        console.log(err)
                      })
                     
                     })
                     .catch( err=> {
                       console.log(err)
                       Swal.fire('Ha ocurrido un error',err.message,'error');
                     })
  }
  login(email,password:string){

    this.afAuth.auth.signInWithEmailAndPassword(email,password)
                     .then( resp => {
                      console.log(resp);
                      this.router.navigate(['/']);
                     })
                     .catch(err =>{
                      console.log(err)
                      Swal.fire('Ha ocurrido un error',err.message,'error');
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
