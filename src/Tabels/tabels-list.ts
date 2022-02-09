export class TabelsList {

}
export class LookupCatagory {
    id: number;
    name: string;
    picture: string;
    remark: string;
}
export class Lookup {
    id: number;
    name: string;
    type: number;//foreign key from lookupCategory table
    value: string;
    remark: string;
}
export class Items {
    id: number;
    name: string;
    amaricName: string;
    discrption: string;
    catagoryId: number;//foreign key forcategory Table
    type: string;
    price: number;
    cost: number;
    quantity: number;
    picture: string;
    storeid: number;//foreign key from lookup Table
    brand: string;
    remark: string;
}
export class LoginUser {
    id: number;
    username: string;
    password: string;
    Active: Boolean;
}
export class Customer {
    id: number;
    fullname: string;
    phonenumber: number;
    location: string;
    balance: number;
    address: string;
}
export class Supplier {
    id: number;
    balance: string;
    location: string;
    country: string;
    agreement: string;
    commission: number;
}

export class ItemCategory {
    id: number
    categoryName: string
    description: string
    parentcategory: string
    picture: string
}
export class Vendors {
    id: number;
    vendorName: string;
    contact: string;
    address: string;
    phonenumber: number;
    email: string;
    website: string;
    balance: string;
}

export class LineItem {
    id: number;
    vocherId: number;//foreign key from vocher table
    ItemID: number;//string
    Quantity: number;
    taxAmount: number;
    cost: number;
    Price: number;
    subTotal: number;
}
export class Vocher {
    id: number
    vocherId: string
    subTotal: number
    taxAmount: number
    grandTotal: number
    date: string
    vocherTypeId: number//(lookup)
    vendorId: number
    userId: number//foreign key from customer table
    PaymentStatus: string
}
export class ItemStoreBalance {
    id: number
    itemId: number
    beginingQuantity: number
    currentQuantity: number
    storeId: number
}
export class vocherStoreTransation {
    id: number
    ItemID: number
    vocherId: string
    fromStoreId: number
    toStoreId: number
    amount: number
}

export class VoucherSetting {
    voucherTypeId: number;
    attribute: string;
    value: string;
    remark: string;
}
export class IdSetting {
    id: number
    voucherTypeId: string
    prefix: string
    length: number
    suffix: string
    currentId: string
}
export class SelectedVocher {
    id: string
    name: string
}
export class Users {
    id: number
    userId: string
    empId: string
    username: string
    password: string
}
export class functionality {
    id: number
    SN: number
    compName: string
    description: string
    remark: string
}
export class userRole {
    id: number
    funId: number
    userId: string
    remark: string
}
export class Menu {
    title: string
    url: string
    icon: string
}
export class reportType {
    id: string;
    name: string;

}
export class reportDetail {
    Id: number;
    reportTypeId: string;
    Name: string;
}
//class of add Stock 
export class AddStock {
    id: number
    itemId: number
    NewQuantity: number
    addStockNo: string
    date: string
    location: string
    OldQuantity: string
}
export class storeTransfer {
    id: number
    itemId: number
    storeTransferId: string
    date: string
    quantity: number
    toStoreId: number
    fromStoreId: number
    AssignTo: string
}
export class CountSheet {
    id: number
    itemId: number
    sheetNo: string
    startDate: string
    endDate: string
    storeId: number
    countQty: number
    systemQty: number
    differenceQty: number
}
export class ItemLocation {
    id: number;
    itemId: number
    location: number
    quantity: string
}
export class PhoneNumber {
    country: string;
    area: string;
    prefix: string;
    line: string;
}
export class StockAdjustment {
    id: number;
    transactionType: string
    transactionNumber: string
    itemId: number
    store: number
    QuantityBefore: number
    QuantityAfter: number
    Quantity: number
    date: string
}