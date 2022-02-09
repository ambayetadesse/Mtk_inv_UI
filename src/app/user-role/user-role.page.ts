import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import DataSource from 'devextreme/data/data_source';
import { functionality, Users } from 'src/Tabels/tabels-list';
import { FunctionalityService } from '../Service/Functionality.service';
import { UserService } from '../Service/User.service';
import { UserRoleService } from '../Service/userRole.service';
import ArrayStore from "devextreme/data/array_store";
import { AlertController, Platform } from '@ionic/angular';
@Component({
  selector: 'app-user-role',
  templateUrl: './user-role.page.html',
  styleUrls: ['./user-role.page.scss'],
})
export class UserRolePage implements OnInit {
  regform = this.fb.group({});
  listOfUser: Users[];
  selectedUser: string;
  listOfFunctinality: DataSource;
  selecteFu: string;
  isChecked: boolean = true;
  funwithuser: any[] = [];
  selectedCategory: any;
  isIndeterminate: boolean;
  masterCheck: boolean;
  checkedList: any[];
  masterSelected: boolean;
  CheckedProject: any[] = [];
  NewWithOldArray: any[] = [];
  selectAllModeVlaue: string = "page";
  selectionModeValue: string = "all";
  arr_names: string[] = new Array();
  listOfUserRole: { id: string; funId: string; userId: string; remark: string; }[];
  deleteRoleId: any[] = [];
  usePicker = false;
  listOfFun: functionality[];
  constructor(private fb: FormBuilder, private userRoleService: UserRoleService,
    private userService: UserService, private functionalityService: FunctionalityService,
    private platform: Platform, private alertController: AlertController) { }
  ngOnInit() {
    this.regform = this.fb.group({
      funId: [''],
      userId: ['', Validators.required],
      remark: [''],
    });
    if ((this.platform.is('mobile') && !this.platform.is('hybrid')) ||
      this.platform.is('desktop')) {
      this.usePicker = true;
    }
    this.getUser();
    this.getFunctionality();
  }
  selectedEv(ev) {
    let id = ev.target.value;
    //console.log(ev.target.value);
    this.userRoleService.getAllUserRole().subscribe(res => {
      this.listOfUserRole = res.filter(c=>c.userId == +id);
      this.CheckedProject = [];
      this.arr_names = [];
      this.deleteRoleId = [];
      this.listOfUserRole.forEach(element => {
        this.arr_names.push(element.funId);
        this.deleteRoleId.push(element);
        this.NewWithOldArray.push(element.funId);
        let listitems = {
          compName:this.listOfFun.find(c=>c.id==+element.funId).compName,
          description: this.listOfFun.find(c=>c.id==+element.funId).description,
          id: this.listOfFun.find(c=>c.id==+element.funId).id,
          remark:this.listOfFun.find(c=>c.id==+element.funId).remark
        }
       this.CheckedProject.push(listitems);
      });
      //console.log(this.CheckedProject)
    //  console.log(res)
    })
  }
  save() {
    if (this.regform.valid) {
      if (this.CheckedProject.length > 0) {
        this.deleteRoleId.forEach(element => {
         // console.log(element.id)
          this.userRoleService.deleteUserRole(element.id).subscribe(res => {
            console.log(res);
          });
        });
        let user = this.regform.get("userId").value;
        this.CheckedProject.forEach(el => {
          let fun = {
            funId: el.id,
            userId: +user,
            remark: ''
          }
          this.userRoleService.create(fun).subscribe(res => {
            console.log(res.toString())
          });
        });
      }
      this.presentAlert();
    }
    else {
      // notify('Please select Project and User');
    }
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Confirm! ',
      message: 'Successfully Inserted!!',
      buttons: ['OK']
    });
    await alert.present();
  }
  getUser() {
    this.userService.getAllUser().subscribe(async userList => {
      this.listOfUser = await userList;
      this.selectedUser = await userList[0].empId
      // console.log(this.selectedUser)
    })
  }
  getFunctionality() {
    this.functionalityService.getAllFunctionality().subscribe(async res => {
      this.listOfFun = await res;
      this.listOfFunctinality = new DataSource({
        store: new ArrayStore({
          key: "id",
          data: res
        })
      });
    })
  }

  onSelectionChanged(e) {
    let addedItems = e.addedItems;
    let removedItems = e.removedItems;
    addedItems.forEach(element => {
      let found = this.CheckedProject.find(c => c.id == element.id)
      if (found == undefined) {
        let listitems = {
          compName: element.compName,
          description: element.description,
          id: element.id,
          remark: element.remark
        }
        this.CheckedProject.push(listitems);
      }
    });
    if (removedItems.length > 0) {
      removedItems.forEach(ele => {
        let index = this.CheckedProject.findIndex(c => c.id == ele.id)
        this.CheckedProject.splice(index, 1)
      })
    }
    //console.log(this.CheckedProject)
    
  }
  onSelectAllValueChanged(e) {
    let newCheckBoxValue = e.value;
    // Handler of the "selectAllValueChanged" event
  }

}
