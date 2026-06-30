  import { Navigate } from "react-router";
  import Login from "../veiws/website/Login/login";
  // import Login from "../veiws/";
  import './routeAndHeader.css'
  import { AccountBalanceWalletSharp, AssignmentReturnSharp, CurrencyExchangeSharp, Dashboard, Groups2Sharp, Inventory2Sharp, LocalShippingRounded, PaidSharp, PaymentsSharp, ReceiptLongSharp, TrendingDownSharp, TrendingUpSharp} from "@mui/icons-material";
  import { Box, Typography } from "@mui/material";
  import ProductRegistration from "../veiws/dashbaord/products/products";
  import ProductEdit from "../veiws/dashbaord/productedit/productedit";
  import SellProducts from "../veiws/dashbaord/SellProducts";
import SupplierRegister from "../veiws/dashbaord/supplier/register";
import RegisterPage from "../veiws/dashbaord/employee/registration";
import EmployeeSalary from "../veiws/dashbaord/wmployeeSalary/employeeSalary";
import SupplierReturn from "../veiws/dashbaord/SupplierReturn/SupplierReturn";
import ExpensePage from "../veiws/dashbaord/expense/expense";
import CustomerRegister from "../veiws/dashbaord/customerbills/register";
import CustomerReturn from "../veiws/dashbaord/CustomerReturn";
import { Suspense } from "react";
import InvestmentPage from "../veiws/dashbaord/invest/invest";
import DivestmentPage from "../veiws/dashbaord/DivestPage/DivestPage";
import Roznamcha from "../veiws/dashbaord/roznamcha/roznamcha";
import Finance from "../veiws/dashbaord/Finance";
  // //console.log(SelectedData())
  export const RouteHeader = () => { 
  return {
      router:{
        
        SinglePage: [
          {path:'/login' , element: <div id="Login"><Login /></div>},
          {path:'/' , element: <Navigate to="/login" />},
                
        ],  
          Menu:{
            SALESMAN:[
                  {path:'/Private/' , element: <Navigate to="/Private/Order" /> },  
                    {
                      item: true,
                      navlabel: true,
                      subheader: <div className="mainMenuMain"><Typography variant="body1" component="span" sx={{display: (theme)=>(theme as any).palette?.sidemenutext?.display?.display || 'inline'}}> Home</Typography>
                      {/* <Typography variant="body1" component="span" sx={{fontSize: '14px',marginLeft: '1px',display: (theme)=>(theme as any).palette.sidemenutext.display.display || 'inline'}}> اوډر  </Typography> */}
                      </div>,
                      title: '',
                      icon: '',
                      href: '',
                      path: '',
                      element: ''
                    },
                    
                    {
                      item: true,
                      id: 1,
                      title: (
                        <Box className="menuItem" sx={{display: 'flex', justifyContent: 'space-between'}} >
                          <span>Dashboard </span>
                        </Box>
                      ),
                      icon: Dashboard,
                      href: '/Private/Order',
                      path: '/Private/Order',
                      element: <div id="Refund"><Suspense><SellProducts /></Suspense></div>
                    },


                    // {
                    //   item: true,
                    //   id: 3,
                    //   title: (
                    //     <Box className="menuItem" sx={{display: 'flex', justifyContent: 'space-between'}} >
                    //       <span>Products Edit </span>
                    //     </Box>
                    //   ),
                    //   icon: Dashboard,
                    //   href: '/Private/Product/Edit',
                    //   path: '/Private/Product/Edit',
                    //   element: <div id="Refund"><Suspense><ProductEdit /></Suspense></div>
                    // },

                    {
                      item: true,
                      id: 4,
                      title: (
                        <Box className="menuItem" sx={{display: 'flex', justifyContent: 'space-between'}} >
                          <span>Khata </span>
                        </Box>
                      ),
                      icon: AccountBalanceWalletSharp,
                      href: '/Private/Khata',
                      path: '/Private/Khata',
                      element: <div id="Refund"><Suspense><CustomerRegister /></Suspense></div>
                    },

                    {
                      item: true,
                      id: 5,
                      title: (
                        <Box className="menuItem" sx={{display: 'flex', justifyContent: 'space-between'}} >
                          <span>Return </span>
                        </Box>
                      ),
                      icon: AssignmentReturnSharp,
                      href: '/Private/return',
                      path: '/Private/return',
                      element: <div id="Refund"><Suspense><CustomerReturn /></Suspense></div>
                    },
              
            ],
            BUYER:[
                  {path:'/Private/' , element: <Navigate to="/Private/Product" /> },         
                    {
                      item: true,
                      navlabel: true,
                      subheader: <div className="mainMenuMain"><Typography variant="body1" component="span" sx={{display: (theme)=>(theme as any).palette?.sidemenutext?.display?.display || 'inline'}}> Supplier</Typography>
                      {/* <Typography variant="body1" component="span" sx={{fontSize: '14px',marginLeft: '1px',display: (theme)=>(theme as any).palette.sidemenutext.display.display || 'inline'}}> اوډر  </Typography> */}
                      </div>,
                      title: '',
                      icon: '',
                      href: '',
                      path: '',
                      element: ''
                    },

                    
                    {
                      item: true,
                      id: 2,
                      title: (
                        <Box className="menuItem" sx={{display: 'flex', justifyContent: 'space-between'}} >
                          <span>Buy Products </span>
                        </Box>
                      ),
                      icon: Inventory2Sharp,
                      href: '/Private/Product',
                      path: '/Private/Product',
                      element: <div id="Refund"><Suspense>
                        <ProductRegistration />
  </Suspense>                    </div>
                    },

                    
                    {
                      item: true,
                      id: 11,
                      title: (
                        <Box className="menuItem" sx={{display: 'flex', justifyContent: 'space-between'}} >
                          <span>Supplier Khata </span>
                        </Box>
                      ),
                      icon: LocalShippingRounded,
                      href: '/Private/supplier/register',
                      path: '/Private/supplier/register',
                      element: <div id="Refund"><Suspense>
                        <SupplierRegister />
  </Suspense>                    </div>
                    },
                    
                    {
                      item: true,
                      id: 11,
                      title: (
                        <Box className="menuItem" sx={{display: 'flex', justifyContent: 'space-between'}} >
                          <span>Supplier Return</span>
                        </Box>
                      ),
                      icon: AssignmentReturnSharp,
                      href: '/Private/supplier/return',
                      path: '/Private/supplier/return',
                      element: <div id="Refund"><Suspense>
                        <SupplierReturn />
  </Suspense>                    </div>
                    },
                    

            ],
            PARTNER:[
              {path:'/Private/' , element: <Navigate to="/Private/Order" /> },
                    
                    {
                      item: true,
                      navlabel: true,
                      subheader: <div className="mainMenuMain"><Typography variant="body1" component="span" sx={{display: (theme)=>(theme as any).palette?.sidemenutext?.display?.display || 'inline'}}> Home</Typography>
                      {/* <Typography variant="body1" component="span" sx={{fontSize: '14px',marginLeft: '1px',display: (theme)=>(theme as any).palette.sidemenutext.display.display || 'inline'}}> اوډر  </Typography> */}
                      </div>,
                      title: '',
                      icon: '',
                      href: '',
                      path: '',
                      element: ''
                    },
                    
                    {
                      item: true,
                      id: 1,
                      title: (
                        <Box className="menuItem" sx={{display: 'flex', justifyContent: 'space-between'}} >
                          <span>Dashboard </span>
                        </Box>
                      ),
                      icon: Dashboard,
                      href: '/Private/Order',
                      path: '/Private/Order',
                      element: <div id="Refund"><Suspense><SellProducts /></Suspense></div>
                    },


                    // {
                    //   item: true,
                    //   id: 3,
                    //   title: (
                    //     <Box className="menuItem" sx={{display: 'flex', justifyContent: 'space-between'}} >
                    //       <span>Products Edit </span>
                    //     </Box>
                    //   ),
                    //   icon: Dashboard,
                    //   href: '/Private/Product/Edit',
                    //   path: '/Private/Product/Edit',
                    //   element: <div id="Refund"><Suspense><ProductEdit /></Suspense></div>
                    // },

                    {
                      item: true,
                      id: 4,
                      title: (
                        <Box className="menuItem" sx={{display: 'flex', justifyContent: 'space-between'}} >
                          <span>Khata </span>
                        </Box>
                      ),
                      icon: AccountBalanceWalletSharp,
                      href: '/Private/Khata',
                      path: '/Private/Khata',
                      element: <div id="Refund"><Suspense><CustomerRegister /></Suspense></div>
                    },

                    {
                      item: true,
                      id: 5,
                      title: (
                        <Box className="menuItem" sx={{display: 'flex', justifyContent: 'space-between'}} >
                          <span>Return </span>
                        </Box>
                      ),
                      icon: AssignmentReturnSharp,
                      href: '/Private/return',
                      path: '/Private/return',
                      element: <div id="Refund"><Suspense><CustomerReturn /></Suspense></div>
                    },

                    
                    {
                      item: true,
                      navlabel: true,
                      subheader: <div className="mainMenuMain"><Typography variant="body1" component="span" sx={{display: (theme)=>(theme as any).palette?.sidemenutext?.display?.display || 'inline'}}> Supplier</Typography>
                      {/* <Typography variant="body1" component="span" sx={{fontSize: '14px',marginLeft: '1px',display: (theme)=>(theme as any).palette.sidemenutext.display.display || 'inline'}}> اوډر  </Typography> */}
                      </div>,
                      title: '',
                      icon: '',
                      href: '',
                      path: '',
                      element: ''
                    },

                    
                    {
                      item: true,
                      id: 2,
                      title: (
                        <Box className="menuItem" sx={{display: 'flex', justifyContent: 'space-between'}} >
                          <span>Buy Products </span>
                        </Box>
                      ),
                      icon: Inventory2Sharp,
                      href: '/Private/Product',
                      path: '/Private/Product',
                      element: <div id="Refund"><Suspense>
                        <ProductRegistration />
  </Suspense>                    </div>
                    },

                    
                    {
                      item: true,
                      id: 11,
                      title: (
                        <Box className="menuItem" sx={{display: 'flex', justifyContent: 'space-between'}} >
                          <span>Supplier Khata </span>
                        </Box>
                      ),
                      icon: LocalShippingRounded,
                      href: '/Private/supplier/register',
                      path: '/Private/supplier/register',
                      element: <div id="Refund"><Suspense>
                        <SupplierRegister />
  </Suspense>                    </div>
                    },
                    
                    {
                      item: true,
                      id: 11,
                      title: (
                        <Box className="menuItem" sx={{display: 'flex', justifyContent: 'space-between'}} >
                          <span>Supplier Return</span>
                        </Box>
                      ),
                      icon: AssignmentReturnSharp,
                      href: '/Private/supplier/return',
                      path: '/Private/supplier/return',
                      element: <div id="Refund"><Suspense>
                        <SupplierReturn />
  </Suspense>                    </div>
                    },
                    



                    
                    {
                      item: true,
                      navlabel: true,
                      subheader: <div className="mainMenuMain"><Typography variant="body1" component="span" sx={{display: (theme)=>(theme as any).palette?.sidemenutext?.display?.display || 'inline'}}> Users</Typography>
                      {/* <Typography variant="body1" component="span" sx={{fontSize: '14px',marginLeft: '1px',display: (theme)=>(theme as any).palette.sidemenutext.display.display || 'inline'}}> اوډر  </Typography> */}
                      </div>,
                      title: '',
                      icon: '',
                      href: '',
                      path: '',
                      element: ''
                    },

                    
                    {
                      item: true,
                      id: 6,
                      title: (
                        <Box className="menuItem" sx={{display: 'flex', justifyContent: 'space-between'}} >
                          <span>Users </span>
                        </Box>
                      ),
                      icon: Groups2Sharp,
                      href: '/Private/employee/RegisterPage',
                      path: '/Private/employee/RegisterPage',
                      element: <div id="Refund"><Suspense><RegisterPage /></Suspense></div>
                    },
                  
                    {
                      item: true,
                      id: 7,
                      title: (
                        <Box className="menuItem" sx={{display: 'flex', justifyContent: 'space-between'}} >
                          <span>Users Salary </span>
                        </Box>
                      ),
                      icon: PaidSharp,
                      href: '/Private/employee/salary',
                      path: '/Private/employee/salary',
                      element: <div id="Refund"><Suspense><EmployeeSalary /></Suspense></div>
                    },
              

                    {
                      item: true,
                      navlabel: true,
                      subheader: <div className="mainMenuMain"><Typography variant="body1" component="span" sx={{display: (theme)=>(theme as any).palette?.sidemenutext?.display?.display || 'inline'}}> Faiance</Typography>
                      {/* <Typography variant="body1" component="span" sx={{fontSize: '14px',marginLeft: '1px',display: (theme)=>(theme as any).palette.sidemenutext.display.display || 'inline'}}> اوډر  </Typography> */}
                      </div>,
                      title: '',
                      icon: '',
                      href: '',
                      path: '',
                      element: ''
                    },

                    
                    {
                      item: true,
                      id: 6,
                      title: (
                        <Box className="menuItem" sx={{display: 'flex', justifyContent: 'space-between'}} >
                          <span>Daily Transactions </span>
                        </Box>
                      ),
                      icon: ReceiptLongSharp,
                      href: '/Private/dailytransactions',
                      path: '/Private/dailytransactions',
                      element: <div id="Refund"><Suspense><Roznamcha /></Suspense></div>
                    },
                  
                    {
                      item: true,
                      id: 7,
                      title: (
                        <Box className="menuItem" sx={{display: 'flex', justifyContent: 'space-between'}} >
                          <span>Finance </span>
                        </Box>
                      ),
                      icon: CurrencyExchangeSharp,
                      href: '/Private/finance',
                      path: '/Private/finance',
                      element: <div id="Refund"><Suspense>
                          <Finance />
                        </Suspense></div>
                    },
                    {
                      item: true,
                      id: 7,
                      title: (
                        <Box className="menuItem" sx={{display: 'flex', justifyContent: 'space-between'}} >
                          <span>Expense </span>
                        </Box>
                      ),
                      icon: PaymentsSharp,
                      href: '/Private/expense',
                      path: '/Private/expense',
                      element: <div id="Refund"><Suspense><ExpensePage /></Suspense></div>
                    },


                    
                    {
                      item: true,
                      id: 7,
                      title: (
                        <Box className="menuItem" sx={{display: 'flex', justifyContent: 'space-between'}} >
                          <span>Invest </span>
                        </Box>
                      ),
                      icon: TrendingUpSharp,
                      href: '/Private/invest',
                      path: '/Private/invest',
                      element: <div id="Refund"><Suspense><InvestmentPage /></Suspense></div>
                    },
                    {
                      item: true,
                      id: 7,
                      title: (
                        <Box className="menuItem" sx={{display: 'flex', justifyContent: 'space-between'}} >
                          <span>divest </span>
                        </Box>
                      ),
                      icon: TrendingDownSharp,
                      href: '/Private/divest',
                      path: '/Private/divest',
                      element: <div id="Refund"><Suspense><DivestmentPage /></Suspense></div>
                    },
               
            ]
      }
      }
    }
  }