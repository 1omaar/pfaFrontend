import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  private idSnapshot !:string;
  constructor(private activateRouter:ActivatedRoute) {
    this.idSnapshot=  activateRouter.snapshot.params["id"];

  }

  ngOnInit(): void {
    
  }

}
