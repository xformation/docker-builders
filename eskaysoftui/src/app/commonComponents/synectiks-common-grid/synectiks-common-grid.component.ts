import { Component, OnInit, Input, ViewChild, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-synectiks-common-grid',
  templateUrl: './synectiks-common-grid.component.html'
})
export class SynectiksCommonGridComponent implements OnInit {

  @Input() rowSelection;
  @Input() gridDataList: any = [];
  @Input() gridColumnList: any = [];
  @Output() valueChange = new EventEmitter();

  private gridApi = null;
  private gridColumnApi = null;

  public componentProvider = {
    deltaIndicator: this.deltaIndicator
  }

  constructor() { }

  ngOnInit() {
    this.rowSelection = "single";
    this.gridColumnList = null;
    this.gridDataList = null;
  }

  deltaIndicator(params) {
    var element = document.createElement("span");
    var imageElement = document.createElement("img");
    if (params.value) {
      imageElement.src = "assets/images/right.jpg"
    } else {
      imageElement.src = "assets/images/cancel.jpg"
    }
    element.appendChild(imageElement);
    return element;
  }

  onSelectionChanged() {
    this.valueChange.emit(this.gridApi.getSelectedRows()[0]);
  }

  navigateToNextCell(params) {
    let previousCell = params.previousCellDef;
    const suggestedNextCell = params.nextCellDef;
    const KEY_UP = 38;
    const KEY_DOWN = 40;
    if (suggestedNextCell != null) {
      const nxt = suggestedNextCell.column.gridApi;
      localStorage.setItem('ag-curCell', '0');
      switch (params.key) {
        case KEY_DOWN:
          const nextRowIndex = suggestedNextCell.rowIndex;
          localStorage.setItem('ag-nxtCell', JSON.stringify(nextRowIndex));

          nxt.forEachNode((node) => {
            let curCell = parseInt(localStorage.getItem('ag-curCell'), 10);

            if ('' + curCell === localStorage.getItem('ag-nxtCell')) {
              //  localStorage.setItem('ag-activeRow', JSON.stringify(node.data));
              node.setSelected(true);

            }
            curCell = curCell + 1;
            localStorage.setItem('ag-curCell', curCell.toString());
          });

          if (nextRowIndex <= 0) {
            return null;
          } else {
            return suggestedNextCell;
          }

        case KEY_UP:
          // const nextRowIndex = suggestedNextCell.rowIndex;
          localStorage.setItem('ag-nxtCell', JSON.stringify(suggestedNextCell.rowIndex));

          nxt.forEachNode((node) => {
            let curCell = parseInt(localStorage.getItem('ag-curCell'), 10);

            if ('' + curCell === localStorage.getItem('ag-nxtCell')) {
              //localStorage.setItem('ag-activeRow', JSON.stringify(node.data));
              node.setSelected(true);

            }
            curCell = curCell + 1;
            localStorage.setItem('ag-curCell', curCell.toString());
          });

          previousCell = params.previousCellDef;
          // set selected cell on current cell -1

          const prevRowIndex = previousCell.rowIndex - 1;
          const renderedRowCount = parseInt(localStorage.getItem('rowDataLength'), 10);
          if (prevRowIndex >= renderedRowCount) {
            return null
          } else {
            return suggestedNextCell;
          }
        default:
          throw 'ag-grid has gone away';
      }
    }
  }

loadGridColumns(params){
  const columns = params.columnApi.getAllDisplayedVirtualColumns();
  /*columns.forEach((column) => {
    const ele = document.querySelector('div.ag-body-container');

    ele.addEventListener('keydown', (e) => {
      if (e['key'] === 'Tab') {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    });
  });*/
}

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
    // if your data is set on the gridOptions,
    //below code for settimeout gridReady get's called before data is bound.
    // so waiting time out for 5 sec
    setTimeout(this.loadGridColumns(params), 5000);
  }

}
