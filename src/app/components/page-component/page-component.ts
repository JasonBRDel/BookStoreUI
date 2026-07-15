import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar-component/navbar-component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'page-component',
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './page-component.html',
  styleUrl: './page-component.scss',
})
export class PageComponent { }
