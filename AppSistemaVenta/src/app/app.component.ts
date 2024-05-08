import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { LayoutComponent } from './Components/layout/layout.component';
import { SharedModule } from './Reutilizable/shared/shared.module';
import { LayoutModule } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
 /*  standalone: true,
  imports: [
    RouterOutlet,
    LoginComponent,
    LayoutComponent,
    SharedModule
  ], */
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AppSistemaVenta';
}
