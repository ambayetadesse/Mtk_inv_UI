(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{AJFJ:function(t,e,r){"use strict";r.r(e),r.d(e,"ItemCategoryPageModule",function(){return I});var i=r("ofXK"),c=r("3Pt+"),o=r("TEn/"),n=r("tyNb"),a=r("mrSG"),s=r("gcOT"),l=r("fXoL"),u=r("rlNE"),g=["filePicker"];function f(t,e){1&t&&(l.dc(0,"small",19),l.Oc(1," This field is required! "),l.cc())}function d(t,e){1&t&&(l.dc(0,"small",19),l.Oc(1," This field is required! "),l.cc())}function m(t,e){if(1&t){var r=l.ec();l.dc(0,"ion-img",20),l.oc("click",function(){return l.Fc(r),l.qc().onPickImage()}),l.cc()}if(2&t){var i=l.qc();l.wc("src",i.base64textString)}}function h(t,e){if(1&t){var r=l.ec();l.dc(0,"ion-button",21),l.oc("click",function(){return l.Fc(r),l.qc().onPickImage()}),l.Zb(1,"ion-icon",22),l.dc(2,"ion-label"),l.Oc(3,"Take Picture"),l.cc(),l.cc()}}function p(t,e){if(1&t&&(l.dc(0,"ion-select-option",23),l.Oc(1),l.cc()),2&t){var r=e.$implicit;l.xc("value",null==r?null:r.id),l.Mb(1),l.Qc(" ",null==r?null:r.categoryName," ")}}function y(t,e){if(1&t){var r=l.ec();l.dc(0,"input",24,25),l.oc("change",function(t){return l.Fc(r),l.qc().onFileChosen(t)}),l.cc()}}function b(t,e){if(1&t){var r=l.ec();l.dc(0,"ion-item-sliding",null,26),l.dc(2,"ion-item",27),l.dc(3,"ion-thumbnail",2),l.Zb(4,"img",28),l.cc(),l.dc(5,"ion-label"),l.Oc(6),l.cc(),l.dc(7,"ion-label"),l.Oc(8),l.cc(),l.cc(),l.dc(9,"ion-item-options",29),l.dc(10,"ion-item-option",30),l.oc("click",function(){l.Fc(r);var t=e.$implicit,i=l.Ec(1);return l.qc().Edit(t,i)}),l.Zb(11,"ion-icon",31),l.cc(),l.dc(12,"ion-item-option",30),l.oc("click",function(){l.Fc(r);var t=e.$implicit,i=l.Ec(1);return l.qc().delete(t,i)}),l.Zb(13,"ion-icon",32),l.cc(),l.cc(),l.cc()}if(2&t){var i=e.$implicit;l.Mb(4),l.wc("src",i.picture,l.Hc),l.Mb(2),l.Qc(" ",i.categoryName,""),l.Mb(2),l.Qc(" ",i.description,"")}}var C=[{path:"",component:function(){function t(t,e,r,i,c){this.fb=t,this.platform=e,this.alertController=r,this.itemCategoryService=i,this.loadingController=c,this.regform=this.fb.group({}),this.usePicker=!1,this.editMode=!1}return t.prototype.ngOnInit=function(){return Object(a.a)(this,void 0,void 0,function(){return Object(a.c)(this,function(t){return this.regform=this.fb.group({categoryName:["",c.s.required],picture:[""],description:[""],parentcategory:["",c.s.required]}),this.getItemCategory(),(this.platform.is("mobile")&&!this.platform.is("hybrid")||this.platform.is("desktop"))&&(this.usePicker=!0),[2]})})},t.prototype.onPickImage=function(){var t=this;1!=this.usePicker?s.c.Camera.getPhoto({quality:50,source:s.b.Prompt,correctOrientation:!0,height:320,width:300,resultType:s.a.Base64}).then(function(e){t.base64textString="data:image/png;base64,"+e.base64String}).catch(function(e){return console.log(e),t.usePicker&&t.filePickerRef.nativeElement.click(),!1}):this.filePickerRef.nativeElement.click()},t.prototype.onFileChosen=function(t){var e=this,r=t.target.files[0];if(r){var i=new FileReader;i.onload=function(){var t=i.result.toString();e.base64textString=t},i.readAsDataURL(r)}},t.prototype.Save=function(){var t=this;if(this.regform.get("picture").setValue(this.base64textString),this.regform.valid){if(this.itemCatagoryId){var e={id:this.itemCatagoryId,categoryName:this.regform.get("categoryName").value,picture:this.base64textString,description:this.regform.get("description").value,parentcategory:this.regform.get("parentcategory").value};this.itemCategoryService.updateItemCategory(e).subscribe(function(){return t.getItemCategory()})}else this.itemCategoryService.create(this.regform.value).subscribe(function(){return t.getItemCategory()});this.presentAlert(),this.base64textString="",this.regform.reset(),this.itemCatagoryId=null,this.getItemCategory()}else this.ErrorAlert()},t.prototype.getItemCategory=function(){var t=this;try{this.itemCategoryService.getAllItemCategories().subscribe(function(e){return Object(a.a)(t,void 0,void 0,function(){var t,r;return Object(a.c)(this,function(i){switch(i.label){case 0:return e.length>0?(t=this,[4,e]):[3,3];case 1:return t.ListOfItemCategory=i.sent(),r=this,[4,e];case 2:return r.filteredCategory=i.sent(),this.selectedCatagory=this.ListOfItemCategory[1].id,[3,4];case 3:this.ErrorAlert(),i.label=4;case 4:return[2]}})})},function(e){return Object(a.a)(t,void 0,void 0,function(){return Object(a.c)(this,function(t){switch(t.label){case 0:return[4,this.loader.dismiss().then()];case 1:return t.sent(),console.log(e),[2]}})})})}catch(e){console.log(e)}},t.prototype.presentAlert=function(){return Object(a.a)(this,void 0,void 0,function(){return Object(a.c)(this,function(t){switch(t.label){case 0:return[4,this.alertController.create({cssClass:"my-custom-class",header:"Catagory",message:"Catagory Saved successfully.",buttons:["OK"]})];case 1:return[4,t.sent().present()];case 2:return t.sent(),[2]}})})},t.prototype.ErrorAlert=function(){return Object(a.a)(this,void 0,void 0,function(){return Object(a.c)(this,function(t){switch(t.label){case 0:return[4,this.alertController.create({cssClass:"my-custom-class",header:"Error",message:"Please Enter All field.",buttons:["OK"]})];case 1:return[4,t.sent().present()];case 2:return t.sent(),[2]}})})},t.prototype.Edit=function(t,e){this.editMode=!0,this.itemCatagoryId=t.id,this.regform.get("categoryName").setValue(t.categoryName),this.regform.get("description").setValue(t.description),this.regform.get("parentcategory").setValue(t.parentcategory),this.regform.get("picture").setValue(t.picture),this.base64textString=t.picture,e.close()},t.prototype.delete=function(t,e){this.presentAlertConfirm(t),e.close()},t.prototype.presentAlertConfirm=function(t){return Object(a.a)(this,void 0,void 0,function(){var e=this;return Object(a.c)(this,function(r){switch(r.label){case 0:return[4,this.alertController.create({header:"Confirm!",message:"<strong>Are you sure you want delete?</strong>",buttons:[{text:"Cancel",role:"cancel",cssClass:"secondary",handler:function(t){console.log("Confirm Cancel: blah")}},{text:"OK",handler:function(){e.itemCategoryService.removeCategory(t.id).subscribe(function(t){e.getItemCategory(),console.log(t)},function(t){console.log(t)}),e.regform.reset(),e.itemCatagoryId=null}}]})];case 1:return[4,r.sent().present()];case 2:return r.sent(),[2]}})})},t.prototype.filter=function(t){this.filteredCategory=t.target.value?this.ListOfItemCategory.filter(function(e){return e.categoryName.toLowerCase().includes(t.target.value.toLowerCase())}):this.ListOfItemCategory},t.prototype.doRefresh=function(t){var e=this;setTimeout(function(){e.getItemCategory(),t.target.complete()},2e3)},t.\u0275fac=function(e){return new(e||t)(l.Yb(c.c),l.Yb(o.cb),l.Yb(o.a),l.Yb(u.a),l.Yb(o.Y))},t.\u0275cmp=l.Sb({type:t,selectors:[["app-item-category"]],viewQuery:function(t,e){var r;1&t&&l.Tc(g,1),2&t&&l.Dc(r=l.pc())&&(e.filePickerRef=r.first)},decls:36,vars:11,consts:[[3,"translucent"],["color","primary"],["slot","start"],["slot","fixed","pullFactor","0.8","pullMin","60","pullMax","120",3,"ionRefresh"],[3,"formGroup"],["formControlName","categoryName","type","text"],["class","form-text text-muted",4,"ngIf"],["formControlName","description","type","text"],[1,"picker"],["role","button","class","image",3,"src","click",4,"ngIf"],["color","primary",3,"click",4,"ngIf"],["name","parentcategory","interface","popover","formControlName","parentcategory",3,"ngModel","ngModelChange"],[3,"value",4,"ngFor","ngForOf"],["hidden","","type","file","accept","image/jpeg",3,"change",4,"ngIf"],[2,"text-align","center","margin","auto"],["id","add items",3,"click"],["slot","start","name","add-circle-outline"],["showCancelButton","never",3,"keyup"],[4,"ngFor","ngForOf"],[1,"form-text","text-muted"],["role","button",1,"image",3,"src","click"],["color","primary",3,"click"],["name","picture","slot","start"],[3,"value"],["hidden","","type","file","accept","image/jpeg",3,"change"],["filePicker",""],["slidingItem",""],["detail",""],[3,"src"],["side","start"],["color","danger",3,"click"],["name","create","slot","icon-only"],["name","trash","slot","icon-only"]],template:function(t,e){1&t&&(l.dc(0,"ion-header",0),l.dc(1,"ion-toolbar",1),l.dc(2,"ion-buttons",2),l.Zb(3,"ion-menu-button"),l.cc(),l.dc(4,"ion-title"),l.Oc(5,"Item Catagory"),l.cc(),l.cc(),l.cc(),l.dc(6,"ion-content"),l.dc(7,"ion-refresher",3),l.oc("ionRefresh",function(t){return e.doRefresh(t)}),l.Zb(8,"ion-refresher-content"),l.cc(),l.dc(9,"form",4),l.dc(10,"ion-list"),l.dc(11,"ion-item"),l.dc(12,"ion-label"),l.Oc(13,"Category Name"),l.cc(),l.Zb(14,"ion-input",5),l.Mc(15,f,2,0,"small",6),l.cc(),l.dc(16,"ion-item"),l.dc(17,"ion-label"),l.Oc(18,"Description"),l.cc(),l.Zb(19,"ion-input",7),l.Mc(20,d,2,0,"small",6),l.cc(),l.dc(21,"div",8),l.Mc(22,m,1,1,"ion-img",9),l.Mc(23,h,4,0,"ion-button",10),l.cc(),l.dc(24,"ion-item"),l.dc(25,"ion-label"),l.Oc(26,"Parent Catagory"),l.cc(),l.dc(27,"ion-select",11),l.oc("ngModelChange",function(t){return e.selectedCatagory=t}),l.Mc(28,p,2,2,"ion-select-option",12),l.cc(),l.cc(),l.Mc(29,y,2,0,"input",13),l.dc(30,"div",14),l.dc(31,"ion-button",15),l.oc("click",function(){return e.Save()}),l.Zb(32,"ion-icon",16),l.Oc(33),l.cc(),l.cc(),l.cc(),l.cc(),l.dc(34,"ion-searchbar",17),l.oc("keyup",function(t){return e.filter(t)}),l.cc(),l.Mc(35,b,14,3,"ion-item-sliding",18),l.cc()),2&t&&(l.wc("translucent",!0),l.Mb(9),l.wc("formGroup",e.regform),l.Mb(6),l.wc("ngIf",!e.regform.get("categoryName").valid&&e.regform.get("categoryName").touched),l.Mb(5),l.wc("ngIf",!e.regform.get("description").valid&&e.regform.get("description").touched),l.Mb(2),l.wc("ngIf",e.base64textString),l.Mb(1),l.wc("ngIf",!e.base64textString),l.Mb(4),l.wc("ngModel",e.selectedCatagory),l.Mb(1),l.wc("ngForOf",e.ListOfItemCategory),l.Mb(1),l.wc("ngIf",e.usePicker),l.Mb(4),l.Qc(" ",e.editMode?"Update Item Catagory":"Add Item Catagory",""),l.Mb(2),l.wc("ngForOf",e.filteredCategory))},directives:[o.s,o.V,o.f,o.E,o.U,o.m,o.I,o.J,c.t,c.l,c.f,o.B,o.w,o.A,o.v,o.hb,c.k,c.d,i.l,o.P,o.gb,i.k,o.e,o.t,o.M,o.u,o.Q,o.z,o.T,o.y,o.x],styles:[".picker[_ngcontent-%COMP%]{width:30rem;max-width:80%;height:20rem;max-height:30vh;border:1px solid var(--ion-color-primary);margin:auto;display:flex;justify-content:center;align-items:center}.image[_ngcontent-%COMP%]{width:100%;height:100%;-o-object-fit:cover;object-fit:cover}.alert-custom[_ngcontent-%COMP%]{color:#99004d;background-color:#f169b4;border-color:#800040}ion-content[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]{padding:0;--border-radius:14px}ion-content[_ngcontent-%COMP%]   ion-searchbar[_ngcontent-%COMP%]{--border-radius:14px;--background:#f3f3f3;margin-top:-13px}.location-visible[_ngcontent-%COMP%]{opacity:1;transition:.5s}.location-hidden[_ngcontent-%COMP%]{opacity:0;transition:.5s}"]}),t}()}],v=function(){function t(){}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=l.Wb({type:t}),t.\u0275inj=l.Vb({imports:[[n.j.forChild(C)],n.j]}),t}(),I=function(){function t(){}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=l.Wb({type:t}),t.\u0275inj=l.Vb({imports:[[i.b,c.g,o.W,v,c.q]]}),t}()},rlNE:function(t,e,r){"use strict";r.d(e,"a",function(){return u});var i=r("HDdC"),c=r("cxbk"),o=r("/GcI"),n=r("XEKg"),a=r("5Jak"),s=r("fXoL"),l=r("tk/3"),u=function(){function t(t){this.http=t,this.APIURL=c.a.apiURL}return t.prototype.create=function(t){return this.http.post(this.APIURL+"/itemcategory",t).catch(this.handleError)},t.prototype.getAllItemCategories=function(){return this.http.get(this.APIURL+"/itemcategory")},t.prototype.getItemCategory=function(t){return this.http.get(this.APIURL+"/itemcategory",t)},t.prototype.updateItemCategory=function(t){return this.http.put(this.APIURL+"/itemcategory",t).catch(this.handleError)},t.prototype.removeCategory=function(t){return this.http.delete(this.APIURL+"/itemcategory/"+t).catch(this.handleError)},t.prototype.handleError=function(t){return i.a.throw(400===t.status?new n.a(t.json()):404===t.status?new a.a:new o.a(t))},t.\u0275fac=function(e){return new(e||t)(s.kc(l.a))},t.\u0275prov=s.Ub({token:t,factory:t.\u0275fac,providedIn:"root"}),t}()}}]);