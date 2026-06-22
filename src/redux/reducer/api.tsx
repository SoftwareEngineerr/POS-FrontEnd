
// const web = 'https://backend.qatehkandahar.com/';
const web = 'http://localhost:4000/'
//  const imagesServer = 'https://backend.qatehkandahar.com'
const imagesServer = 'http://localhost:4000/Public/'


const initialState = {
    // web : 'https://backend.qatehkandahar.com',
    Web : 'https://localhost:4000',
    //website api's
    Registration:`${web}registration`, 
    Login:`${web}login`,
    FirstTimeWebSrn: `${web}webSrn`,


    // Product
    RegisterProduct: `${web}dashboard/product/register`,    
    GetProducts : `${web}dashboard/Products/get`,

    // Sell product
    SellProduct: `${web}dashboard/sellProduct/add`,


    //  Customers
    AddCustomer: `${web}dashboard/customer/register`,
    GetCustomer: `${web}dashboard/customer/get`,
    ShowCustomerBill: `${web}dashboard/customer/bill`,
    Customerpayment: `${web}dashboard/customer/payment`,


    


    // Category 
    AddCategory: `${web}dashboard/category/add`,
    GetCategory: `${web}dashboard/category/get`,

    
    // Brand
    AddBrand: `${web}dashboard/brand/add`,
    GetBrand: `${web}dashboard/brand/get`,

    // Supplies
    AddSupplier: `${web}dashboard/supplier/register`,
    GetSupplier: `${web}dashboard/supplier/get`,
    SupplierBill: `${web}dashboard/supplier/bill`,
    SupplierPayment: `${web}dashboard/supplier/payment`,
    SupplierReturnProduct: `${web}dashboard/supplier/return`,


    // Supplier Return
    ShowAllBills: `${web}dashboard/supplier/bills`,
    ShowBillProducts: `${web}dashboard/supplier/`,


    // Customer Return
    CustomerBill: `${web}dashboard/customer/bills`,
    ShowCustomerBillId: `${web}dashboard/customer/billitems/`,
    ReturnProductsToCustomer: `${web}dashboard/customer/return`,

    // Expense
    AddExpense: `${web}dashboard/Expense/add`,
    GetExpense: `${web}dashboard/Expense/get`,


    // Invest
    AddInvest: `${web}dashboard/invest/add`,
    GetInvest: `${web}dashboard/invest/get`,
    
    // divest
    Adddivest: `${web}dashboard/divest/add`,
    Getdivest: `${web}dashboard/divest/get`,

    // Daily Transactions
    DailyTransactions: `${web}dashboard/dailytransctions/get`,

    

    


    // Employee
    RegisterEmployee: `${web}dashboard/employee/register`,
    GetEmployee: `${web}dashboard/employee/get`,
    UpdateEmployee: `${web}dashboard/employee/update`,
    EmployeePayment: `${web}dashboard/employee/salary`,
    ShowEmployee: `${web}dashboard/employee/show/salary/`,


    EditProducts : `${web}dashboard/product`,
    DeleteProducts : `${web}dashboard/product/delete`,
    // image
    Imagelink: `${web}dashboard/createFolder`,
    ImageServer: imagesServer,
        
};

const Api = (state = initialState) => {
        return state;
}
export default Api;
