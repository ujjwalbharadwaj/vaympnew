// import React, { useState } from "react";
// import {
//   AiOutlineArrowRight,
//   AiOutlineCamera,
//   AiOutlineDelete
// } from "react-icons/ai";
// import { useDispatch, useSelector } from "react-redux";
// import { server } from "../../server";
// import styles from "../../styles/styles";
// import { DataGrid } from "@material-ui/data-grid";
// import { Button } from "@material-ui/core";
// import { Link } from "react-router-dom";
// import { MdTrackChanges } from "react-icons/md";
// import { RxCross1 } from "react-icons/rx";
// import {
//   deleteUserAddress,
//   loadUser,
//   updatUserAddress,
//   updateUserInformation
// } from "../../redux/actions/user";
// import AllOrdersComponent from '../Shop/AllOrders';
// import { Country, State } from "country-state-city";
// import { useEffect } from "react";
// import { toast } from "react-toastify";
// import axios from "axios";
// import { getAllOrdersOfUser } from "../../redux/actions/order";

// const ProfileContent = ({ active }) => {
//   const { user, error, successMessage } = useSelector((state) => state.user);
//   const [name, setName] = useState(user && user.name);
//   const [email, setEmail] = useState(user && user.email);
//   const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNumber);
//   const [password, setPassword] = useState("");
//   const [avatar, setAvatar] = useState(null);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (error) {
//       toast.error(error);
//       dispatch({ type: "clearErrors" });
//     }
//     if (successMessage) {
//       toast.success(successMessage);
//       dispatch({ type: "clearMessages" });
//     }
//   }, [error, successMessage]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(updateUserInformation(name, email, phoneNumber, password));
//   };

//   const handleImage = async (e) => {
//     const reader = new FileReader();

//     reader.onload = () => {
//       if (reader.readyState === 2) {
//         setAvatar(reader.result);
//         axios
//           .put(
//             `${server}/user/update-avatar`,
//             { avatar: reader.result },
//             {
//               withCredentials: true
//             }
//           )
//           .then((response) => {
//             dispatch(loadUser());
//             toast.success("avatar updated successfully!");
//           })
//           .catch((error) => {
//             toast.error(error);
//           });
//       }
//     };

//     reader.readAsDataURL(e.target.files[0]);
//   };

//   return (
//     <div className="w-full">
//       {/* profile */}
//       {active === 1 && (
//         <>
//           <div className="flex justify-center w-full">
//             <div className="relative">
//               <img
//                 src={`${user?.avatar?.url}`}
//                 className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad132]"
//                 alt=""
//               />
//               <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
//                 <input
//                   type="file"
//                   id="image"
//                   className="hidden"
//                   onChange={handleImage}
//                 />
//                 <label htmlFor="image">
//                   <AiOutlineCamera />
//                 </label>
//               </div>
//             </div>
//           </div>
//           <br />
//           <br />
//           <div className="w-full px-5">
//             <form onSubmit={handleSubmit} aria-required={true}>
//               <div className="w-full 800px:flex block pb-3">
//                 <div className=" w-[100%] 800px:w-[50%]">
//                   <label className="block pb-2">Full Name</label>
//                   <input
//                     type="text"
//                     className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
//                     required
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                   />
//                 </div>
//                 <div className=" w-[100%] 800px:w-[50%]">
//                   <label className="block pb-2">Email Address</label>
//                   <input
//                     type="text"
//                     className={`${styles.input} !w-[95%] mb-1 800px:mb-0`}
//                     required
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                   />
//                 </div>
//               </div>

//               <div className="w-full 800px:flex block pb-3">
//                 <div className=" w-[100%] 800px:w-[50%]">
//                   <label className="block pb-2">Phone Number</label>
//                   <input
//                     type="number"
//                     className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
//                     required
//                     value={phoneNumber}
//                     onChange={(e) => setPhoneNumber(e.target.value)}
//                   />
//                 </div>

//                 <div className=" w-[100%] 800px:w-[50%]">
//                   <label className="block pb-2">Enter your password</label>
//                   <input
//                     type="password"
//                     className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
//                     required
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                   />
//                 </div>
//               </div>
//               <input
//                 className={`w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
//                 required
//                 value="Update"
//                 type="submit"
//               />
//             </form>
//           </div>
//         </>
//       )}

//       {/* order */}
//       {active === 2 && (
//         <div>
//           <AllOrders />
//         </div>
//       )}

//       {/* Refund */}
//       {active === 3 && (
//         <div>
//           <AllRefundOrders />
//         </div>
//       )}

//       {/* Track order */}
//       {active === 5 && (
//         <div>
//           <TrackOrder />
//         </div>
//       )}

//       {/* Change Password */}
//       {active === 6 && (
//         <div>
//           <ChangePassword />
//         </div>
//       )}

//       {/*  user Address */}
//       {active === 7 && (
//         <div>
//           <Address />
//         </div>
//       )}
//     </div>
//   );
// };

// const AllOrders = () => {
//   const { user } = useSelector((state) => state.user);
//   const { orders } = useSelector((state) => state.order);
//   const { allProducts, isLoading } = useSelector((state) => state.products);
//   const [orderProduct, setorderProduct] = useState([]);
//   const dispatch = useDispatch();
//   console.log("order 97", orders);
//   useEffect(() => {
//     dispatch(getAllOrdersOfUser(user._id));
//   }, []);
 
//   async function updateStockCancel(item,size) {
//     const productId = item._id;
//     const newStock1 = JSON.stringify(item.stock); // Assuming item.stock contains the updated stock array
//     const newStock = JSON.parse(JSON.stringify(item.stock)); 
//     console.log("newStock", newStock);
  
//     try {
//       for (const stockItem of newStock) {
//         // Check if the item is selected and has quantity to update
//         if (stockItem.isSelected && stockItem.qty > 0 && stockItem.size==size ) {
//           if(stockItem.qty==1){
//             stockItem.isSelected = false;
//           }
//           stockItem.quantity += 1; // Update the quantity based on item.qty
//            // Set isSelected to false after updating stock
//           stockItem.qty -= 1; // Reset qty to 0
//           console.log("after update stock",newStock)
//           // Make HTTP PUT request to update stock using Axios
//           const response = await axios.patch(`http://localhost:8000/api/v2/product/update-stock/${productId}`, {
//             stock: newStock, // Update the stock value in the request body
//           });
  
//           if (response.status >= 200 && response.status < 300) {
//             // console.log("Stock updated successfully");
//           } else {
//             throw new Error(`Failed to update stock - Unexpected status code: ${response.status}`);
//           }
//         } else {
//           // If item is not selected or qty is 0, do nothing
//           console.log("Item is not selected for updating stock or qty is 0.");
//         }
//       }
//     } catch (error) {
//       // console.error("Error updating stock:", error.message);
//       throw new Error("Failed to update stock");
//     }
//   }
//   async function updateOrderCancel(orderid, size, productdata) {
//     try {
//       const productId = productdata._id;
      
//         orders.forEach(async (orderList) => {
//           if (orderList._id === orderid) {
//             let dummyList = JSON.parse(JSON.stringify(orderList));
//             // console.log("dummy before change", dummyList);
//             dummyList.cart.forEach(async (item) => {
//               // let itemList = JSON.parse(JSON.stringify(item));
//               if (item._id === productId) {
//                 let itemList = JSON.parse(JSON.stringify(item));
//                 console.log("itemList before change", itemList);
//                 itemList.stock.forEach((st1) => {
//                   if(st1.size==size){
//                     if (st1.qty === 1) {
//                       st1.isSelected = false;
//                     }
//                     if (st1.qty > 0) {
//                       st1.qty -= 1;
//                       st1.quantity += 1;
//                     }
//                   }
                 
//                 });
//                 console.log("itemList before change", itemList);
//                 const response = await axios.put(`${server}/order/order-del-qty/${orderid}`, {
//                   itemList: itemList, // Update the stock value in the request body
//                 },{ withCredentials: true });
//                 if (response.status >= 200 && response.status < 300) {
//                   // console.log("Stock updated successfully");
//                   return itemList; // Return the updated dummyList
//                 } else {
//                   throw new Error(`Failed to update stock - Unexpected status code: ${response.status}`);
//                 }
//               }
//             });
           
//           } else {
//             return orderList; // Return the unmodified orderList
//           }
//         })
      
  
//      // console.log("Updated orders:", updatedOrders);
//     } catch (error) {
//       console.error("Error updating orders:", error.message);
//       throw new Error("Failed to update orders");
//     }
//   }
//   // async function updateOrderCancel(orderid, size, productdata) {
//   //   try {
//   //     const productId = productdata._id;
//   //     const updatedOrders = await Promise.all(
//   //       orders.map(async (orderList) => {
//   //         if (orderList._id === orderid) {
//   //           let dummyList = JSON.parse(JSON.stringify(orderList));
//   //           // console.log("dummy before change", dummyList);
//   //           dummyList.cart.forEach(async (item) => {
//   //             // let itemList = JSON.parse(JSON.stringify(item));
//   //             if (item._id === productId) {
//   //               let itemList = JSON.parse(JSON.stringify(item));
//   //               console.log("itemList before change", itemList);
//   //               item.stock.forEach((st1) => {
//   //                 if(st1.size==size){
//   //                   if (st1.qty === 1) {
//   //                     st1.isSelected = false;
//   //                   }
//   //                   if (st1.qty > 0) {
//   //                     st1.qty -= 1;
//   //                     st1.quantity += 1;
//   //                   }
//   //                 }
                 
//   //               });
//   //               console.log("itemList before change", itemList);
//   //               const response = await axios.put(`${server}/order/order-del-qty/${orderid}`, {
//   //                 itemList: itemList, // Update the stock value in the request body
//   //               },{ withCredentials: true });
//   //               if (response.status >= 200 && response.status < 300) {
//   //                 // console.log("Stock updated successfully");
//   //                 return itemList; // Return the updated dummyList
//   //               } else {
//   //                 throw new Error(`Failed to update stock - Unexpected status code: ${response.status}`);
//   //               }
//   //             }
//   //           });
//   //          // console.log("dummy after change", dummyList);
//   //           // const response = await axios.put(`${server}/order/order-del-qty/${orderid}`, {
//   //           //   dummyList1: dummyList, // Update the stock value in the request body
//   //           // },{ withCredentials: true });
//   //           // if (response.status >= 200 && response.status < 300) {
//   //           //   // console.log("Stock updated successfully");
//   //           //   return dummyList; // Return the updated dummyList
//   //           // } else {
//   //           //   throw new Error(`Failed to update stock - Unexpected status code: ${response.status}`);
//   //           // }
//   //         } else {
//   //           return orderList; // Return the unmodified orderList
//   //         }
//   //       })
//   //     );
  
//   //     console.log("Updated orders:", updatedOrders);
//   //   } catch (error) {
//   //     console.error("Error updating orders:", error.message);
//   //     throw new Error("Failed to update orders");
//   //   }
//   // }
  
  
//   const columns = [
//     { field: "orderid", headerName: "Order ID", minWidth: 150, flex: 0.7 },
//     {
//       field: "image",
//       headerName: "Image",
//       minWidth: 100,
//       flex: 0.7,
//       // renderCell: (params) => <img src={params.row.image} alt="Product" />,

//       renderCell: (params) => (
//         <img
//           src={params.row.image}
//           alt="Product"
//           style={{ height: "40px", width: "40px" }}
//         />
//       )
//     },
//     {
//       field: "size",
//       headerName: "Size",
//       minWidth: 100,
//       flex: 0.7
//     },
//     {
//       field: "status",
//       headerName: "Status99",
//       minWidth: 130,
//       flex: 0.7,
//       cellClassName: (params) => {
//         return params.getValue(params.id, "status") === "Delivered"
//           ? "greenColor"
//           : "redColor";
//       }
//     },
//     {
//       field: "itemsQty",
//       headerName: "Items Qty",
//       type: "number",
//       minWidth: 130,
//       flex: 0.7
//     },

//     {
//       field: "total",
//       headerName: "Price",
//       type: "number",
//       minWidth: 130,
//       flex: 0.8
//     },

//     {
//       field: " ",
//       flex: 1,
//       minWidth: 150,
//       headerName: "",
//       type: "number",
//       sortable: false,
//       renderCell: (params) => {
//         return (
//           <>
//             <Link to={`/user/order/${params.row?.orderid}`}>
//               <Button>
//                 <AiOutlineArrowRight size={20} />
//               </Button>
//             </Link>
//           </>
//         );
//       }
//     },
//     {
//       field: "delete",
//       headerName: "Delete",
//       minWidth: 100,
//       flex: 0.7,
//       renderCell: (params) => (
        
//         <Button
//         variant="contained"
//         color="error"
//         onClick={async() =>{
//           await updateStockCancel(params.row.productdata,params.row.size)
//         await updateOrderCancel(params.row.orderid,params.row.size,params.row.productdata)
//           console.log("params.row",params)
//           window.location.reload();
//           //  console.log("params.row.productdata",params.row.productdata)
//           //  console.log("hparams.row.size",params.row.size)
          
//           }}
//       >
//         Cancel 
//       </Button>
       
//       ),
//     },
//   ];

//   const row = [];
//   console.log("orderProduct90", orders);
//   orders &&
//     orders.forEach((orderList) => {
//       orderList.cart.forEach((item) => {
//         //console.log("item",item)
//         item.stock.forEach((st1) => {
//           if (st1.isSelected) {
//             console.log("st1", st1);
//             let myqty=st1.qty;
//             while(myqty>0){
//               row.push({
//                 id: st1._id+myqty,
//                 orderid: orderList._id,
//                 productid: item._id,
//                 size:st1.size,
//                 image: item.images[0].url,
//                 itemsQty: 1,
//                 total: "US$ " + item.originalPrice ,
//                 status: orderList.status,
//                 productdata:item
//               });
//               myqty--;
//             }
//             // row.push({
//             //   id: st1._id,
//             //   orderid: orderList._id,
//             //   size:st1.size,
//             //   image: item.images[0].url,
//             //   itemsQty: st1.qty,
//             //   total: "US$ " + item.originalPrice *st1.qty,
//             //   status: orderList.status
//             // });
//           }
//         });
//       });
//     });
//   // orderProduct &&
//   //   orderProduct.forEach((item) => {
//   //     //console.log("item",item)
//   //     item.stock.forEach((st1) => {
//   //       if (st1.isSelected) {
//   //         console.log("st1", st1);
//   //         row.push({
//   //           id: st1._id,
//   //           orderid: item._id,
//   //           image: item.images[0].url,
//   //           itemsQty: st1.qty,
//   //           total: "US$ " + item.totalPrice,
//   //           status: item.status
//   //         });
//   //       }
//   //     });
//   //   });

//   // orders &&
//   //   orders.forEach((item) => {
//   //     row.push({
//   //       id: item._id,
//   //       itemsQty: item.cart.length,
//   //       total: "US$ " + item.totalPrice,
//   //       status: item.status,
//   //     });
//   //   });

//   return (
//     <div className="pl-8 pt-1">
//       <DataGrid
//         rows={row}
//         columns={columns}
//         pageSize={10}
//         disableSelectionOnClick
//         autoHeight
//       />
//     </div>
//   );
// };

// const AllRefundOrders = () => {
//   const { user } = useSelector((state) => state.user);
//   const { orders } = useSelector((state) => state.order);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(getAllOrdersOfUser(user._id));
//   }, []);
//   console.log("ordeers", orders);

//   const eligibleOrders =
//     orders && orders.filter((item) => item.status === "Processing refund");
//   console.log("eligibleOrders", eligibleOrders);
//   const columns = [
//     { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

//     {
//       field: "status10",
//       headerName: "Status",
//       minWidth: 130,
//       flex: 0.7,
//       cellClassName: (params) => {
//         return params.getValue(params.id, "status") === "Delivered"
//           ? "greenColor"
//           : "redColor";
//       }
//     },
//     {
//       field: "itemsQty",
//       headerName: "Items Qty",
//       type: "number",
//       minWidth: 130,
//       flex: 0.7
//     },

//     {
//       field: "total",
//       headerName: "Total",
//       type: "number",
//       minWidth: 130,
//       flex: 0.8
//     },

//     {
//       field: " ",
//       flex: 1,
//       minWidth: 150,
//       headerName: "",
//       type: "number",
//       sortable: false,
//       renderCell: (params) => {
//         return (
//           <>
//             <Link to={`/user/order/${params.id}`}>
//               <Button>
//                 <AiOutlineArrowRight size={20} />
//               </Button>
//             </Link>
//           </>
//         );
//       }
//     }
//   ];

//   const row = [];

//   eligibleOrders &&
//     eligibleOrders.forEach((item) => {
//       row.push({
//         id: item._id,
//         itemsQty: item.cart.length,
//         total: "US$ " + item.totalPrice,
//         status: item.status
//       });
//     });

//   return (
//     <div className="pl-8 pt-1">
//       <DataGrid
//         rows={row}
//         columns={columns}
//         pageSize={10}
//         autoHeight
//         disableSelectionOnClick
//       />
//     </div>
//   );
// };

// const TrackOrder = () => {
//   const { user } = useSelector((state) => state.user);
//   const { orders } = useSelector((state) => state.order);
//   const dispatch = useDispatch();
//   console.log("orders54", orders);
//   useEffect(() => {
//     dispatch(getAllOrdersOfUser(user._id));
//   }, []);

//   const columns = [
//     { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

//     {
//       field: "status",
//       headerName: "Status",
//       minWidth: 130,
//       flex: 0.7,
//       cellClassName: (params) => {
//         return params.getValue(params.id, "status") === "Delivered"
//           ? "greenColor"
//           : "redColor";
//       }
//     },
//     {
//       field: "itemsQty",
//       headerName: "Items Qty55",
//       type: "number",
//       minWidth: 130,
//       flex: 0.7
//     },

//     {
//       field: "total",
//       headerName: "Total",
//       type: "number",
//       minWidth: 130,
//       flex: 0.8
//     },

//     {
//       field: " ",
//       flex: 1,
//       minWidth: 150,
//       headerName: "",
//       type: "number",
//       sortable: false,
//       renderCell: (params) => {
//         return (
//           <>
//             <Link to={`/user/track/order/${params.id}`}>
//               <Button>
//                 <MdTrackChanges size={20} />
//               </Button>
//             </Link>
//           </>
//         );
//       }
//     }
//   ];

//   const row = [];

//   orders &&
//     orders.forEach((item) => {
//       row.push({
//         id: item._id,
//         itemsQty: item.cart.length,
//         total: "US$ " + item.totalPrice,
//         status: item.status
//       });
//     });

//   return (
//     <div className="pl-8 pt-1">
//       <DataGrid
//         rows={row}
//         columns={columns}
//         pageSize={10}
//         disableSelectionOnClick
//         autoHeight
//       />
//     </div>
//   );
// };

// const ChangePassword = () => {
//   const [oldPassword, setOldPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   const passwordChangeHandler = async (e) => {
//     e.preventDefault();

//     await axios
//       .put(
//         `${server}/user/update-user-password`,
//         { oldPassword, newPassword, confirmPassword },
//         { withCredentials: true }
//       )
//       .then((res) => {
//         toast.success(res.data.message);
//         setOldPassword("");
//         setNewPassword("");
//         setConfirmPassword("");
//       })
//       .catch((error) => {
//         toast.error(error.response.data.message);
//       });
//   };
//   return (
//     <div className="w-full px-5">
//       <h1 className="block text-[25px] text-center font-[600] text-[#000000ba] pb-2">
//         Change Password
//       </h1>
//       <div className="w-full">
//         <form
//           aria-required
//           onSubmit={passwordChangeHandler}
//           className="flex flex-col items-center"
//         >
//           <div className=" w-[100%] 800px:w-[50%] mt-5">
//             <label className="block pb-2">Enter your old password</label>
//             <input
//               type="password"
//               className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
//               required
//               value={oldPassword}
//               onChange={(e) => setOldPassword(e.target.value)}
//             />
//           </div>
//           <div className=" w-[100%] 800px:w-[50%] mt-2">
//             <label className="block pb-2">Enter your new password</label>
//             <input
//               type="password"
//               className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
//               required
//               value={newPassword}
//               onChange={(e) => setNewPassword(e.target.value)}
//             />
//           </div>
//           <div className=" w-[100%] 800px:w-[50%] mt-2">
//             <label className="block pb-2">Enter your confirm password</label>
//             <input
//               type="password"
//               className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
//               required
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//             />
//             <input
//               className={`w-[95%] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
//               required
//               value="Update"
//               type="submit"
//             />
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// const Address = () => {
//   const [open, setOpen] = useState(false);
//   const [country, setCountry] = useState("");
//   const [city, setCity] = useState("");
//   const [zipCode, setZipCode] = useState();
//   const [address1, setAddress1] = useState("");
//   const [address2, setAddress2] = useState("");
//   const [addressType, setAddressType] = useState("");
//   const { user } = useSelector((state) => state.user);
//   const dispatch = useDispatch();

//   const addressTypeData = [
//     {
//       name: "Default"
//     },
//     {
//       name: "Home"
//     },
//     {
//       name: "Office"
//     }
//   ];

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (addressType === "" || country === "" || city === "") {
//       toast.error("Please fill all the fields!");
//     } else {
//       dispatch(
//         updatUserAddress(
//           country,
//           city,
//           address1,
//           address2,
//           zipCode,
//           addressType
//         )
//       );
//       setOpen(false);
//       setCountry("");
//       setCity("");
//       setAddress1("");
//       setAddress2("");
//       setZipCode(null);
//       setAddressType("");
//     }
//   };

//   const handleDelete = (item) => {
//     const id = item._id;
//     dispatch(deleteUserAddress(id));
//   };

//   return (
//     <div className="w-full px-5">
//       {open && (
//         <div className="fixed w-full h-screen bg-[#0000004b] top-0 left-0 flex items-center justify-center ">
//           <div className="w-[35%] h-[80vh] bg-white rounded shadow relative overflow-y-scroll">
//             <div className="w-full flex justify-end p-3">
//               <RxCross1
//                 size={30}
//                 className="cursor-pointer"
//                 onClick={() => setOpen(false)}
//               />
//             </div>
//             <h1 className="text-center text-[25px] font-Poppins">
//               Add New Address
//             </h1>
//             <div className="w-full">
//               <form aria-required onSubmit={handleSubmit} className="w-full">
//                 <div className="w-full block p-4">
//                   <div className="w-full pb-2">
//                     <label className="block pb-2">Country</label>
//                     <select
//                       name=""
//                       id=""
//                       value={country}
//                       onChange={(e) => setCountry(e.target.value)}
//                       className="w-[95%] border h-[40px] rounded-[5px]"
//                     >
//                       <option value="" className="block border pb-2">
//                         choose your country
//                       </option>
//                       {Country &&
//                         Country.getAllCountries().map((item) => (
//                           <option
//                             className="block pb-2"
//                             key={item.isoCode}
//                             value={item.isoCode}
//                           >
//                             {item.name}
//                           </option>
//                         ))}
//                     </select>
//                   </div>

//                   <div className="w-full pb-2">
//                     <label className="block pb-2">Choose your City</label>
//                     <select
//                       name=""
//                       id=""
//                       value={city}
//                       onChange={(e) => setCity(e.target.value)}
//                       className="w-[95%] border h-[40px] rounded-[5px]"
//                     >
//                       <option value="" className="block border pb-2">
//                         choose your city
//                       </option>
//                       {State &&
//                         State.getStatesOfCountry(country).map((item) => (
//                           <option
//                             className="block pb-2"
//                             key={item.isoCode}
//                             value={item.isoCode}
//                           >
//                             {item.name}
//                           </option>
//                         ))}
//                     </select>
//                   </div>

//                   <div className="w-full pb-2">
//                     <label className="block pb-2">Address 1</label>
//                     <input
//                       type="address"
//                       className={`${styles.input}`}
//                       required
//                       value={address1}
//                       onChange={(e) => setAddress1(e.target.value)}
//                     />
//                   </div>
//                   <div className="w-full pb-2">
//                     <label className="block pb-2">Address 2</label>
//                     <input
//                       type="address"
//                       className={`${styles.input}`}
//                       required
//                       value={address2}
//                       onChange={(e) => setAddress2(e.target.value)}
//                     />
//                   </div>

//                   <div className="w-full pb-2">
//                     <label className="block pb-2">Zip Code</label>
//                     <input
//                       type="number"
//                       className={`${styles.input}`}
//                       required
//                       value={zipCode}
//                       onChange={(e) => setZipCode(e.target.value)}
//                     />
//                   </div>

//                   <div className="w-full pb-2">
//                     <label className="block pb-2">Address Type</label>
//                     <select
//                       name=""
//                       id=""
//                       value={addressType}
//                       onChange={(e) => setAddressType(e.target.value)}
//                       className="w-[95%] border h-[40px] rounded-[5px]"
//                     >
//                       <option value="" className="block border pb-2">
//                         Choose your Address Type
//                       </option>
//                       {addressTypeData &&
//                         addressTypeData.map((item) => (
//                           <option
//                             className="block pb-2"
//                             key={item.name}
//                             value={item.name}
//                           >
//                             {item.name}
//                           </option>
//                         ))}
//                     </select>
//                   </div>

//                   <div className=" w-full pb-2">
//                     <input
//                       type="submit"
//                       className={`${styles.input} mt-5 cursor-pointer`}
//                       required
//                       readOnly
//                     />
//                   </div>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}
//       <div className="flex w-full items-center justify-between">
//         <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2">
//           My Addresses
//         </h1>
//         <div
//           className={`${styles.button} !rounded-md`}
//           onClick={() => setOpen(true)}
//         >
//           <span className="text-[#fff]">Add New</span>
//         </div>
//       </div>
//       <br />
//       {user &&
//         user.addresses.map((item, index) => (
//           <div
//             className="w-full bg-white h-min 800px:h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10 mb-5"
//             key={index}
//           >
//             <div className="flex items-center">
//               <h5 className="pl-5 font-[600]">{item.addressType}</h5>
//             </div>
//             <div className="pl-8 flex items-center">
//               <h6 className="text-[12px] 800px:text-[unset]">
//                 {item.address1} {item.address2}
//               </h6>
//             </div>
//             <div className="pl-8 flex items-center">
//               <h6 className="text-[12px] 800px:text-[unset]">
//                 {user && user.phoneNumber}
//               </h6>
//             </div>
//             <div className="min-w-[10%] flex items-center justify-between pl-8">
//               <AiOutlineDelete
//                 size={25}
//                 className="cursor-pointer"
//                 onClick={() => handleDelete(item)}
//               />
//             </div>
//           </div>
//         ))}

//       {user && user.addresses.length === 0 && (
//         <h5 className="text-center pt-8 text-[18px]">
//           You not have any saved address!
//         </h5>
//       )}
//     </div>
//   );
// };
// export default ProfileContent;




import React, { useState } from "react";
import {
  AiOutlineArrowRight,
  AiOutlineCamera,
  AiOutlineDelete,
} from "react-icons/ai";
import OrderCard from "./OrderCard";

import { useDispatch, useSelector } from "react-redux";
import { server } from "../../server";
import styles from "../../styles/styles";
import { DataGrid } from "@material-ui/data-grid";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { MdTrackChanges } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import {
  deleteUserAddress,
  loadUser,
  updatUserAddress,
  updateUserInformation,
} from "../../redux/actions/user";
import { Country, State } from "country-state-city";
import { useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { getAllOrdersOfUser } from "../../redux/actions/order";
import AllOrdersComponent from '../Shop/AllOrders';


const ProfileContent = ({ active }) => {
  const { user, error, successMessage } = useSelector((state) => state.user);
  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNumber);
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch({ type: "clearMessages" });
    }
  }, [error, successMessage]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserInformation(name, email, phoneNumber, password));
  };

  const handleImage = async (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
        axios
          .put(
            `${server}/user/update-avatar`,
            { avatar: reader.result },
            {
              withCredentials: true,
            }
          )
          .then((response) => {
            dispatch(loadUser());
            toast.success("avatar updated successfully!");
          })
          .catch((error) => {
            toast.error(error);
          });
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <div className="w-full ml-5">
      {/* profile */}
      {active === 1 && (
        <>
          <div className="flex justify-center w-full">
            <div className="relative">
              <img
                src={`${user?.avatar?.url}`}
                className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad132]"
                alt=""
              />
              <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
                <input
                  type="file"
                  id="image"
                  className="hidden"
                  onChange={handleImage}
                />
                <label htmlFor="image">
                  <AiOutlineCamera />
                </label>
              </div>
            </div>
          </div>
          <br />
          <br />
          <div className="w-full px-5">
            <form onSubmit={handleSubmit} aria-required={true}>
              <div className="w-full 800px:flex block pb-3">
                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Full Name</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Email Address</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-1 800px:mb-0`}
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="w-full 800px:flex block pb-3">
                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Phone Number</label>
                  <input
                    type="number"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>

                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Enter your password</label>
                  <input
                    type="password"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <input
                className={`w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
                required
                value="Update"
                type="submit"
              />
            </form>
          </div>
        </>
      )}

      {/* order */}
      {active === 2 && (
        <div>
          <AllOrders />
        </div>
      )}

      {/* Refund */}
      {active === 3 && (
        <div>
          <AllRefundOrders />
        </div>
      )}

      {/* Track order */}
      {active === 5 && (
        <div>
          <TrackOrder />
        </div>
      )}

      {/* Change Password */}
      {active === 6 && (
        <div>
          <ChangePassword />
        </div>
      )}

      {/*  user Address */}
      {active === 7 && (
        <div>
          <Address />
        </div>
      )}
    </div>
  );
};

const AllOrders = () => {
  const { user } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.order);
  const {allProducts,isLoading} = useSelector((state) => state.products);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id));
  }, [dispatch, user._id]);

  const columns = [
    { 
      field: "image", 
      headerName: "Product Image", 
      minWidth: 180, 
      flex: 0.7,
      renderCell: (params) => {
        return (
          <Link to={`/product/${params.id}`}>
            <img src={params.value} alt="Product" style={{ width: 50, height: 50 }} />
          </Link>
        );
      }
    },
    { field: "name", headerName: "Name", minWidth: 180, flex: 1.4 ,
    renderCell: (params) => {
      return (
        <Link to={`/product/${params.id}`}>
          {params.value}
        </Link>
      );
    }
  },
    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item) => {
      // console.log(item.cart[0].images[0].url)
      console.log()
      row.push({
        id: item._id,
       image: item.cart[0].images[0].url,
       name: item.cart[0].name,
        itemsQty: item.cart.length,
        total: "Rs " + item.totalPrice,
        status: item.status,
      });
    });

  return (
    <div className="">
      {orders &&
        orders.map((order) => (
          <OrderCard key={order._id} order={order} />
        ))}
    </div>
  );
};

const AllRefundOrders = () => {
  const { user } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id));
  }, []);

  const eligibleOrders =
    orders && orders.filter((item) => item.status === "Processing refund");

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  eligibleOrders &&
    eligibleOrders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: "Rs " + item.totalPrice,
        status: item.status,
      });
    });

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        autoHeight
        disableSelectionOnClick
      />
    </div>
  );
};

const TrackOrder = () => {
  const { user } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id));
  }, []);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/track/order/${params.id}`}>
              <Button>
                <MdTrackChanges size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: "Rs " + item.totalPrice,
        status: item.status,
      });
    });

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordChangeHandler = async (e) => {
    e.preventDefault();

    await axios
      .put(
        `${server}/user/update-user-password`,
        { oldPassword, newPassword, confirmPassword },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res.data.message);
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  return (
    <div className="w-full px-5">
      <h1 className="block text-[25px] text-center font-[600] text-[#000000ba] pb-2">
        Change Password
      </h1>
      <div className="w-full">
        <form
          aria-required
          onSubmit={passwordChangeHandler}
          className="flex flex-col items-center"
        >
          <div className=" w-[100%] 800px:w-[50%] mt-5">
            <label className="block pb-2">Enter your old password</label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div className=" w-[100%] 800px:w-[50%] mt-2">
            <label className="block pb-2">Enter your new password</label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className=" w-[100%] 800px:w-[50%] mt-2">
            <label className="block pb-2">Enter your confirm password</label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <input
              className={`w-[95%] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
              required
              value="Update"
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

const Address = () => {
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState();
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [addressType, setAddressType] = useState("");
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const addressTypeData = [
    {
      name: "Default",
    },
    {
      name: "Home",
    },
    {
      name: "Office",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (addressType === "" || country === "" || city === "") {
      toast.error("Please fill all the fields!");
    } else {
      dispatch(
        updatUserAddress(
          country,
          city,
          address1,
          address2,
          zipCode,
          addressType
        )
      );
      setOpen(false);
      setCountry("");
      setCity("");
      setAddress1("");
      setAddress2("");
      setZipCode(null);
      setAddressType("");
    }
  };

  const handleDelete = (item) => {
    const id = item._id;
    dispatch(deleteUserAddress(id));
  };

  return (
    <div className="w-full px-5">
      {open && (
        <div className="fixed w-full h-screen bg-[#0000004b] top-0 left-0 flex items-center justify-center ">
          <div className="w-[35%] h-[80vh] bg-white rounded shadow relative overflow-y-scroll">
            <div className="w-full flex justify-end p-3">
              <RxCross1
                size={30}
                className="cursor-pointer"
                onClick={() => setOpen(false)}
              />
            </div>
            <h1 className="text-center text-[25px] font-Poppins">
              Add New Address
            </h1>
            <div className="w-full">
              <form aria-required onSubmit={handleSubmit} className="w-full">
                <div className="w-full block p-4">
                  <div className="w-full pb-2">
                    <label className="block pb-2">Country</label>
                    <select
                      name=""
                      id=""
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-[95%] border h-[40px] rounded-[5px]"
                    >
                      <option value="" className="block border pb-2">
                        choose your country
                      </option>
                      {Country &&
                        Country.getAllCountries().map((item) => (
                          <option
                            className="block pb-2"
                            key={item.isoCode}
                            value={item.isoCode}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="w-full pb-2">
                    <label className="block pb-2">Choose your City</label>
                    <select
                      name=""
                      id=""
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-[95%] border h-[40px] rounded-[5px]"
                    >
                      <option value="" className="block border pb-2">
                        choose your city
                      </option>
                      {State &&
                        State.getStatesOfCountry(country).map((item) => (
                          <option
                            className="block pb-2"
                            key={item.isoCode}
                            value={item.isoCode}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="w-full pb-2">
                    <label className="block pb-2">Address 1</label>
                    <input
                      type="address"
                      className={`${styles.input}`}
                      required
                      value={address1}
                      onChange={(e) => setAddress1(e.target.value)}
                    />
                  </div>
                  <div className="w-full pb-2">
                    <label className="block pb-2">Address 2</label>
                    <input
                      type="address"
                      className={`${styles.input}`}
                      required
                      value={address2}
                      onChange={(e) => setAddress2(e.target.value)}
                    />
                  </div>

                  <div className="w-full pb-2">
                    <label className="block pb-2">Zip Code</label>
                    <input
                      type="number"
                      className={`${styles.input}`}
                      required
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                    />
                  </div>

                  <div className="w-full pb-2">
                    <label className="block pb-2">Address Type</label>
                    <select
                      name=""
                      id=""
                      value={addressType}
                      onChange={(e) => setAddressType(e.target.value)}
                      className="w-[95%] border h-[40px] rounded-[5px]"
                    >
                      <option value="" className="block border pb-2">
                        Choose your Address Type
                      </option>
                      {addressTypeData &&
                        addressTypeData.map((item) => (
                          <option
                            className="block pb-2"
                            key={item.name}
                            value={item.name}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className=" w-full pb-2">
                    <input
                      type="submit"
                      className={`${styles.input} mt-5 cursor-pointer`}
                      required
                      readOnly
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      <div className="flex w-full items-center justify-between">
        <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2">
          My Addresses
        </h1>
        <div
          className={`${styles.button} !rounded-md`}
          onClick={() => setOpen(true)}
        >
          <span className="text-[#fff]">Add New</span>
        </div>
      </div>
      <br />
      {user &&
        user.addresses.map((item, index) => (
          <div
            className="w-full bg-white h-min 800px:h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10 mb-5"
            key={index}
          >
            <div className="flex items-center">
              <h5 className="pl-5 font-[600]">{item.addressType}</h5>
            </div>
            <div className="pl-8 flex items-center">
              <h6 className="text-[12px] 800px:text-[unset]">
                {item.address1} {item.address2}
              </h6>
            </div>
            <div className="pl-8 flex items-center">
              <h6 className="text-[12px] 800px:text-[unset]">
                {user && user.phoneNumber}
              </h6>
            </div>
            <div className="min-w-[10%] flex items-center justify-between pl-8">
              <AiOutlineDelete
                size={25}
                className="cursor-pointer"
                onClick={() => handleDelete(item)}
              />
            </div>
          </div>
        ))}

      {user && user.addresses.length === 0 && (
        <h5 className="text-center pt-8 text-[18px]">
          You not have any saved address!
        </h5>
      )}
    </div>
  );
};
export default ProfileContent;