import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from '../navbr/navbar';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-nav-footer-container',
  imports: [RouterOutlet,Navbar,Footer],
  templateUrl: './nav-footer-container.html',
  styleUrl: './nav-footer-container.css',
})
export class NavFooterContainer {

}
