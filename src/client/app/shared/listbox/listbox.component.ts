import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { QlikService } from '../qlik/qlik.service';

@Component({
  moduleId: module.id,
  selector: 'listbox',
  templateUrl: 'listbox.component.html',
  styleUrls: ['listbox.component.css']
})
export class ListboxComponent implements OnInit {
  @Input() field: string;
  @Input() name?: string;

  obj$: any; // Qlik Sense Object
  source$: any; // Transformed qLayout
  objectPath: string = '/qListObjectDef';

  constructor(private qlikService: QlikService) { }

  ngOnInit() {
    // Grab a reference to the QVF that was opened in the QlikService Constructor
    this.obj$ = this.qlikService.getApp()
      // create a session object with the given prop
      .qCreateSessionObject({
        "qInfo": {
          "qType": "ListObject"
        },
        "qListObjectDef": {
          "qDef": {
            "qFieldDefs": [this.field],
            "qSortCriterias": [{
              "qSortByState": 1,
              "qSortByAsci": 1
            }]
          },
          "qInitialDataFetch": [{
            "qTop": 0,
            "qHeight": 10000,
            "qLeft": 0,
            "qWidth": 1
          }]
        }
      });

    // qLayouts will automatically update when the object is invalidated.
    // This method pulls the qMatrix and maps into a minimal array that
    // the view will use to render values/states.
    this.source$ = this.obj$.qLayouts()
      .pluck('qListObject', 'qDataPages', 0, 'qMatrix')
      .map(m => {
        return m.map(n => ({
          idx: n[0].qElemNumber,
          value: n[0].qText,
          s: n[0].qState === 'S', // s = Selected
          x: n[0].qState === 'X'  // x = Excluded
        }));
      });
  }

  // this method will select a listbox value by index using qElemNumber
  select(index: number) {
    return this.obj$
      .qSelectListObjectValues(this.objectPath, [index], true, false)
      .take(1)
      .subscribe();
  }
}