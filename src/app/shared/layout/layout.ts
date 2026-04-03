import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Header } from "../header/header";
import { Footer } from "../footer/footer";
import { RouterOutlet } from "@angular/router";
import { Loader } from "../loader/loader";
import { LoaderService } from '../../core/loader';
import { Api } from '../../core/api';
import { Shared } from '../shared';
import { ToastrService } from 'ngx-toastr';
import { Card } from '../../models/models';

@Component({
  selector: 'app-layout',
  imports: [Header, Footer, RouterOutlet, Loader],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {
  isLoading = false;
  toastr: any = inject(ToastrService);
  cards: Card[] = []
  card: Card | any
  constructor(private loaderService: LoaderService, private cd: ChangeDetectorRef, private api: Api, private _shared: Shared) { }

  ngOnInit() {
    //  this.toastr.success('Hello world!', 'Toastr fun!');
    this.loaderService.loading$.subscribe(state => {

      this.isLoading = state;
      this.cd.detectChanges();
    });
    this.TenantData()
  }


  TenantData() {

    // this.loaderService.show();
    this.api.TenantApi().subscribe({
      next: (val: any) => {

        debugger
        let leveldata: any[] = val.data.levels;
        const subjects: any[] = val.data.subjects;
        const category: any[] = val.data.categories;

        leveldata.forEach((ls: any) => {
          subjects.forEach((ss) => {
            if ((ss.catname == 'Tech' && ls.levelName != 'non') || (ss.catname != 'Tech' && ls.levelName == 'non')) {
              const cardData: Card = {
                heading: `${ss.subject_Name} ${ls.levelName=='non'?'':ls.levelName}`,
                levelName: ls.levelName,
                subject: ss.subject_Name,
                catName: ls.levelName == 'non' ? 'Non Tech' : 'Tech'
              }
              this.cards.push(cardData)
            }
          })
        })

        val.data.card = this.cards;
        this._shared.TenantData.set(val.data)
        this._shared.CardData.set(val.data.card)
        this.cd.detectChanges()

      },
      error: (err: any) => {
        console.log(err)
      }
    }

    )

  }

}
