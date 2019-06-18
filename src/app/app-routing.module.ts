import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";
import { DasboardComponent } from "./dasboard/dasboard.component";
import { DashboardRoutes } from "./dasboard/dashboard.routes";
import { AuthGuardService } from "./auth/auth-guard.service";
// 
const routes:Routes = [ 
     { path:'login',   component:LoginComponent },
    { path:'register',   component:RegisterComponent },
    { 
        path:'',  
        component:DasboardComponent ,
        children:DashboardRoutes,
        canActivate:[AuthGuardService]
    },
    { path:'**',   component:DasboardComponent }
]

@NgModule({
imports: [ 
    RouterModule.forRoot ( routes)
],
exports: [RouterModule]
})

export class AppRoutingModule {}
