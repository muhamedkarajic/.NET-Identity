import { NavigationStart, Router } from "@angular/router";
import { GlobalVariables } from "src/shared/variables";
import { Component } from "@angular/core";

@Component({
  selector: "app-nav-menu",
  templateUrl: "./nav-menu.component.html",
  styleUrls: ["./nav-menu.component.css"],
})
export class NavMenuComponent {
  isExpanded = false;
  isLogged: boolean = localStorage.getItem(GlobalVariables.__TOKEN__) ? true : false;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.isLogged = localStorage.getItem(GlobalVariables.__TOKEN__) ? true : false;
      }
    });
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  logout() {
    this.isLogged = false;
    localStorage.removeItem(GlobalVariables.__TOKEN__);
  }
}
