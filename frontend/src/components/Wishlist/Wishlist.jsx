// import React, { useState, useRef } from "react";
// import { RxCross1 } from "react-icons/rx";
// import { BsCartPlus } from "react-icons/bs";
// import styles from "../../styles/styles";
// import { AiOutlineHeart } from "react-icons/ai";
// import { useDispatch, useSelector } from "react-redux";
// import { removeFromWishlist } from "../../redux/actions/wishlist";
// import { addTocart } from "../../redux/actions/cart";

// const Wishlist = ({ setOpenWishlist }) => {
//   const { wishlist } = useSelector((state) => state.wishlist);
//   console.log("data",wishlist)

//   const dispatch = useDispatch();
//   const wishlistRef = useRef(null);
//   const handleCloseClick = (event) => {
//     // Check if the click target is the overlay (wishlistRef) itself
//     if (wishlistRef.current === event.target) {
//       setOpenWishlist(false);
//     }
//   };

//   const removeFromWishlistHandler = (data) => {
//     dispatch(removeFromWishlist(data));
//   };
//   const addToCartHandler = async (data, selectedSize, count) => {
//     console.log("addToCartHandler", data._id, selectedSize, count);
//     // console.log("id23",id)
//  const isItemExists =
//       cart &&
//       cart.find((i) => {
//          return i._id === data._id;
//       });
//       console.log("item exist",isItemExists)
// if(isItemExists){
//   let newData = JSON.parse(JSON.stringify(isItemExists));
//   // console.log("newData1",newData)

//   newData.stock.forEach((val) => {
//     if (val.size === selectedSize) {
//       val.isSelected = true;
//       val.qty=count
//       val.quantity=val.quantity-count;
//     }
//   });
//   // newData.qty = count;
//   console.log("newData2updated", newData);
//   let newCart=JSON.parse(JSON.stringify(cart));
//    // Find the index of the item in newCart array
//    const itemIndex = newCart.findIndex((item) => item._id === isItemExists._id);

//    if (itemIndex !== -1) {
//      // Update the item at the found index with newData
//      newCart[itemIndex] = newData;
//      console.log("newCart updated", newCart);
//    } else {
//      console.log("Item not found in newCart array");
//    }

//   try {
//     dispatch(updateTocart(newCart));
//     toast.success("Item updated to cart successfully!");
//   } catch (error) {
//     console.error("Error updating stock:", error.message);
//     toast.error("Failed to add item to cart!");
//   }
// }else{
  
//   let newData = JSON.parse(JSON.stringify(data));

//   newData.stock.forEach((val) => {
//     if (val.size === selectedSize) {
//       val.isSelected = true;
//       val.qty=count;
//       val.quantity=val.quantity-count;
//     }else{
//       val.qty=0;
//     }
//   });
//   console.log("newData2", newData);
//   try {
//     dispatch(addTocart(newData));
//     dispatch(removeFromWishlist(data));
//     setOpenWishlist(false);
//     toast.success("Item added to cart successfully!");
//   } catch (error) {
//     console.error("Error updating stock:", error.message);
//     toast.error("Failed to add item to cart!");
//   }
// }

//   };
//   // const addToCartHandler = (data) => {
//   //   const newData = {...data, qty:1};
//   //   dispatch(addTocart(newData));
//   //   dispatch(removeFromWishlist(data));
//   //   setOpenWishlist(false);

//   // }

//   return (
// <div
//       ref={wishlistRef}
//       className="fixed top-0 left-0 w-full h-screen z-10 flex items-center justify-center bg-[#0000004b]"
//       onClick={handleCloseClick}
//     >
//       <div className="fixed top-0 right-0 h-full w-[80%] overflow-y-scroll 800px:w-[25%] bg-white flex flex-col justify-between shadow-sm" ref={wishlistRef}>
//           {wishlist && wishlist.length === 0 ? (
//           <div className="w-full h-screen flex items-center justify-center">
//             <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
//               <RxCross1
//                 size={25}
//                 className="cursor-pointer"
//                 onClick={() => setOpenWishlist(false)}
//               />
//             </div>
//             <h5>Wishlist Items is empty!</h5>
//           </div>
//         ) : (
//           <>
//             <div>
//               <div className="flex w-full justify-end pt-5 pr-5">
//                 <RxCross1
//                   size={25}
//                   className="cursor-pointer"
//                   onClick={() => setOpenWishlist(false)}
//                 />
//               </div>
//               {/* Item length */}
//               <div className={`${styles.noramlFlex} p-4`}>
//                 <AiOutlineHeart size={25} />
//                 <h5 className="pl-2 text-[20px] font-[500]">
//                   {wishlist && wishlist.length} items
//                 </h5>
//               </div>

//               {/* cart Single Items */}
//               <br />
//               <div className="w-full border-t">
//                 {wishlist &&
//                   wishlist.map((i, index) => (
//                     <CartSingle key={index} data={i} removeFromWishlistHandler={removeFromWishlistHandler} addToCartHandler={addToCartHandler} />
//                   ))}
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// const CartSingle = ({ data,removeFromWishlistHandler,addToCartHandler }) => {
//   const [value, setValue] = useState(1);
//   const totalPrice = data.discountPrice * value;

//   return (
//     <div className="border-b p-4">
//       <div className="w-full 800px:flex items-center">
//         <RxCross1 className="cursor-pointer 800px:mb-['unset'] 800px:ml-['unset'] mb-2 ml-2"
//         onClick={() => removeFromWishlistHandler(data)}
//         />
//         <img
//           src={`${data?.images[0]?.url}`}
//           alt=""
//           className="w-[130px] h-min ml-2 mr-2 rounded-[5px]"
//         />

//         <div className="pl-[5px]">
//           <h1>{data.name}</h1>
//           <h4 className="font-[600] pt-3 800px:pt-[3px] text-[17px] text-[#d02222] font-Roboto">
//             US${totalPrice}
//           </h4>
//         </div>
//         <div>
//           <BsCartPlus size={20} className="cursor-pointer" tile="Add to cart"
//            onClick={() => addToCartHandler(data, selectedSize, count)}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Wishlist;



import React, { useState, useRef } from "react";
import { RxCross1 } from "react-icons/rx";
import { BsCartPlus } from "react-icons/bs";
import styles from "../../styles/styles";
import { AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "../../redux/actions/wishlist";
import { addTocart } from "../../redux/actions/cart";

const Wishlist = ({ setOpenWishlist }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const wishlistRef = useRef(null);
  const handleCloseClick = (event) => {
    // Check if the click target is the overlay (wishlistRef) itself
    if (wishlistRef.current === event.target) {
      setOpenWishlist(false);
    }
  };

  const removeFromWishlistHandler = (data) => {
    dispatch(removeFromWishlist(data));
  };
  

  const addToCartHandler = (data) => {
    const newData = {...data, qty:1};
    dispatch(addTocart(newData));
    setOpenWishlist(false);
  }

  return (
<div
      ref={wishlistRef}
      className="fixed top-0 left-0 w-full h-screen z-10 flex items-center justify-center bg-[#0000004b]"
      onClick={handleCloseClick}
    >
      <div className="fixed top-0 right-0 h-full w-[80%] overflow-y-scroll 800px:w-[25%] bg-white flex flex-col justify-between shadow-sm" ref={wishlistRef}>
          {wishlist && wishlist.length === 0 ? (
          <div className="w-full h-screen flex items-center justify-center">
            <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
              <RxCross1
                size={25}
                className="cursor-pointer"
                onClick={() => setOpenWishlist(false)}
              />
            </div>
            <h5>Wishlist Items is empty!</h5>
          </div>
        ) : (
          <>
            <div>
              <div className="flex w-full justify-end pt-5 pr-5">
                <RxCross1
                  size={25}
                  className="cursor-pointer"
                  onClick={() => setOpenWishlist(false)}
                />
              </div>
              {/* Item length */}
              <div className={`${styles.noramlFlex} p-4`}>
                <AiOutlineHeart size={25} />
                <h5 className="pl-2 text-[20px] font-[500]">
                  {wishlist && wishlist.length} items
                </h5>
              </div>

              {/* cart Single Items */}
              <br />
              <div className="w-full border-t">
                {wishlist &&
                  wishlist.map((i, index) => (
                    <CartSingle key={index} data={i} removeFromWishlistHandler={removeFromWishlistHandler} addToCartHandler={addToCartHandler} />
                  ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const CartSingle = ({ data,removeFromWishlistHandler,addToCartHandler }) => {
  const [value, setValue] = useState(1);
  const totalPrice = data.discountPrice * value;

  return (
    <div className="border-b p-4">
      <div className="w-full 800px:flex items-center">
        <RxCross1 className="cursor-pointer 800px:mb-['unset'] 800px:ml-['unset'] mb-2 ml-2"
        onClick={() => removeFromWishlistHandler(data)}
        />
        <img
          src={`${data?.images[0]?.url}`}
          alt=""
          className="w-[130px] h-min ml-2 mr-2 rounded-[5px]"
        />

        <div className="pl-[5px]">
          <h1>{data.name}</h1>
          <h4 className="font-[600] pt-3 800px:pt-[3px] text-[17px] text-[#d02222] font-Roboto">
          ₹{totalPrice}
          </h4>
        </div>
        <div>
          <BsCartPlus size={20} className="cursor-pointer" tile="Add to cart"
           onClick={() => addToCartHandler(data)}
          />
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
