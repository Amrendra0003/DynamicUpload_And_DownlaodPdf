import { Component, ViewChild, TemplateRef } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild('editPopup') templateRef1!: TemplateRef<any>;
  @ViewChild('deletePopup') templateRef2!: TemplateRef<any>;
  title:any = "title";
  gridApi: any;
  gridColumnApi: any;
  rowData: any;
  editedRowData: any;
  addEdit: any;
  gridOptions: GridOptions = {
    columnDefs: [
      {
        headerCheckboxSelection: true,
        checkboxSelection: true,
        width: 50,
      },
      { field: 'id', hide: true },
      { field: 'name', editable: true },
      { field: 'age', editable: true },
      { field: 'country', editable: true },
      { field: 'gender', editable: true},
      { field: 'city', editable: true},
      { field: 'zipcode', editable: true},
      {
        headerName: 'Edit',
        cellRenderer: this.editButtonRenderer,
        width: 100,
        suppressMenu: true,
        cellRendererParams: {
          onEdit: this.onEdit.bind(this)
        }
      }
    ],
    rowData: [
      { id:1 ,name: 'John Doe', age: 25, country: 'USA', gender: 'Male', city: 'ZIOPP', zipcode: 20801},
      { id:2 ,name: 'Jane Smith', age: 30, country: 'Canada', gender: 'Male', city: 'KTOPM', zipcode: 21021},
      { id:3 ,name: 'Mark Johnson', age: 35, country: 'Australia', gender: 'Female', city: 'KMOPLI', zipcode: 21421}
    ],
    rowSelection: 'multiple',
    onRowSelected: this.onRowSelected.bind(this),
    onGridReady: (params : any) => {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
    },
    components: {}
    
  };
  
  constructor(private modalService: BsModalService, private modalRef: BsModalRef) { }
  onEdit(rowData: any) {
    debugger;
    this.editedRowData = {rowData};
    this.addEdit = "Edit";
    this.modalRef = this.modalService.show(this.templateRef1, {animated: true,
      keyboard: false,
      backdrop : 'static',
      class: 'modal-lg'});
    console.log('Edit button clicked for row:', rowData);
  }

  editButtonRenderer(params: any) {
    const button = document.createElement('button');
    button.innerHTML = 'Edit';
    button.classList.add('btn', 'btn-primary'); // Add Bootstrap classes
    button.addEventListener('click', () => {
      params.onEdit(params.data);
    });
    return button;
  }
  onRowSelected(event: any) {
    const selectedRows = this.gridApi.getSelectedRows();
    const selectedRowIds = selectedRows.map((row:any) => row.id);
    console.log('Selected Row IDs:', selectedRowIds);
    // Perform your desired action with the selected rows
  }
  onCellValueChanged(event: any) {
    // Access the modified cell value
    const newValue = event.newValue;
    console.log('New value:', newValue);
  
    // Access the row data for the modified cell
    const rowData = event.data;
    console.log('Row data:', rowData);
  }
  saveEdit(updatedData: any) {
    // Implement the logic to save the edited data
    // Here, we'll simply log the updated data to the console
    console.log('Updated data:', updatedData);
    
    // Close the popup or perform any other necessary actions
    this.modalRef.hide();
  }
  onClose(){
    this.modalRef.hide();
  }
  addPersonalDetail(){
    const rowData:any =  
      { id:0 ,name: '', age: '', country: '', gender: '', city: '', zipcode: ''}
    
    this.editedRowData = {rowData};
    this.addEdit = "Add";
    this.modalRef = this.modalService.show(this.templateRef1, {animated: true,
      keyboard: false,
      backdrop : 'static',
      class: 'modal-lg'});
  }
  deletePersonalDetail(){
    this.modalRef = this.modalService.show(this.templateRef2, {animated: true,
      keyboard: false,
      backdrop : 'static',
      class: 'modal-lg'});
  }
  hideDeletePopup(){
    this.modalRef.hide();
  }
  deleteRow(){

  }
}