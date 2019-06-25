import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IngresoEgreso } from './ingreso-egreso.model';
import { IngresoEgresoService } from './ingreso-egreso.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { appState } from '../app.reducer';
import { Subscription } from 'rxjs';
import { activarLoadingAction, desactivarLoadingAction } from '../shared/ui.actions';
@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styleUrls: ['./ingreso-egreso.component.css']
})
export class IngresoEgresoComponent implements OnInit,OnDestroy {
forma:FormGroup;
tipo='ingreso';
loadingSubs:Subscription = new Subscription();
loading:boolean;
  constructor(public ingresoEgreso:IngresoEgresoService,private store:Store<appState>) { }

  ngOnInit() {
    this.loadingSubs = this.store.select('ui').subscribe( ui => { this.loading = ui.isLoading})
    this.forma = new FormGroup( {
      'descripcion':new FormControl('',Validators.required),
      'monto':new FormControl(0,Validators.min(0))
    })

  }
  ngOnDestroy(){
    this.loadingSubs.unsubscribe();
  }
  crearIngresoEgreso() {
    this.store.dispatch( new activarLoadingAction());

    const nuevoEgresoIngreso = new IngresoEgreso({ ...this.forma.value, tipo: this.tipo });
    this.ingresoEgreso.crearIngresoEgreso(nuevoEgresoIngreso).then(data => {
      this.store.dispatch( new desactivarLoadingAction());
      Swal.fire('Creado ! ',nuevoEgresoIngreso.descripcion,'success');
      this.forma.reset({ monto: 0 })

    }).catch(err => { console.log(err);this.store.dispatch( new desactivarLoadingAction); })


    console.log(nuevoEgresoIngreso);
  }

}
