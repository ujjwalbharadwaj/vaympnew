
import React, { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import ProductCard from "../components/Route/ProductCard/ProductCard";
import Loader from "../components/Layout/Loader";
import styles from "../styles/styles";

const SearchResults = () => {
  
  const { query } = useParams();
  const { allProducts, isLoading } = useSelector((state) => state.products);
  const [filteredData, setFilteredData] = useState(allProducts);
  const words = query.toLowerCase().split(" ");
  const quer = query.toLowerCase();

  useEffect(() => {
    

    let filteredProducts = allProducts;

    if (quer.includes("female") || quer.includes("females")|| quer.includes("women")|| quer.includes("woman")|| quer.includes("womans")|| quer.includes("womens")|| quer.includes("ladies")|| quer.includes("lady")||quer.includes("girl")||quer.includes("gurl")||quer.includes("girls")||quer.includes("ladki")||quer.includes("ldki")||quer.includes("gurls")) {
      filteredProducts = filteredProducts.filter(val => val.gender.toLowerCase() === "women" || val.gender.toLowerCase() === "girls" ||val.gender.toLowerCase().includes('girl') ||val.gender.toLowerCase() === "Boys & Girls");
    } else if (quer.includes("male") || quer.includes("males")|| quer.includes("mans")|| quer.includes("boys")|| quer.includes("men")|| quer.includes("mens")|| quer.includes("guys")|| quer.includes("ladka")||quer.includes("boy")||quer.includes("man")) {
      filteredProducts = filteredProducts.filter(val => val.gender.toLowerCase() === "men" || val.gender.toLowerCase() == "Boys & Girls"||val.gender.toLowerCase().includes('boy')||val.gender.toLowerCase().includes('boys'));
    }
    console.log("kljlj",filteredProducts)
    // Category filter
    if (quer.includes("shoes") || quer.includes("shoe")|| quer.includes("joota")|| quer.includes("juta")|| quer.includes("jhoota")|| quer.includes("jutta")) {
      filteredProducts = filteredProducts.filter(val => val.category.toLowerCase() === "shoes");
    } else if (quer.includes("accessories")||quer.includes("sunglasses")||quer.includes("jhumka")||quer.includes("jumka")||quer.includes("caps")||quer.includes("earrings")||quer.includes("watches")||quer.includes("belts")||quer.includes("bracelets")||quer.includes("bags")||quer.includes("purse")||quer.includes("wallets")||quer.includes("trolley")||quer.includes("hat")||quer.includes("scarfs")||quer.includes("stoles")||quer.includes("leatherbelts")||quer.includes("smartwatches")||quer.includes("digitalwatches")||quer.includes("analogwatches")||quer.includes("hairbands")||quer.includes("gloves")||quer.includes("drivinggloves")) {
      filteredProducts = filteredProducts.filter(val => val.category.toLowerCase() === "accessories");
    } else if (quer.includes("clothes")||quer.includes("shirt")||quer.includes("dresses")) {
      filteredProducts = filteredProducts.filter(val => val.category.toLowerCase() !== "accessories" && val.category.toLowerCase() !== "shoes");
    }
   console.log("llllll",filteredProducts)
    setFilteredData(filteredProducts);
  }, [quer, allProducts]);
    // words.includes("Shoes")
  const filterByWord = (product, word) => {
    const productProperties = [
      //product.category,
      product?.subCategory,
      product?.size,
      product?.color,
      product?.fabric,
      product?.occasion,
      product?.fit,
     // product?.gender,
      product?.sleeveType,
      product?.neckType,
      product?.name,
      product?.tags,
      product?.brand,
    ];
      console.log(productProperties, "productProperties")
      console.log(productProperties.some(prop => prop && prop.toLowerCase().includes(word)), "prop.toLowerCase().includes(word)",word)
    return productProperties.some(prop => prop && prop.toLowerCase().includes(word));
  };

  let filteredProducts = filteredData
 
  let p=filteredData
words.forEach((word)=>{
 const a1= p.filter(product =>
    filterByWord(product, word)
 );
 console.log("a1",a1,"word",word)
 if(a1.length>0){
  filteredProducts=a1
  p=a1;
 }
})

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Header activeHeading={3} />
          {/* Render product cards based on filtered data */}
          <div className={`${styles.section}`}>
            <div className="pt-2 hidden md:block">
              <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
                {/* this is default for big screens */}
                {filteredProducts.map((i, index) => (
                  <ProductCard data={i} key={index} />
                ))}
              </div>
              {filteredProducts.length === 0 ? (
                <h1 className="text-center w-full pb-[100px] text-[20px]">
                  No products found!
                </h1>
              ) : null}
            </div>
            <div className="pt-2 md:hidden">
              <div className="grid grid-cols-2 gap-[25px] md:grid-cols-2 md:gap-[25px] mb-12">
                {/* this is for small screens */}
                {filteredProducts.map((i, index) => (
                  <ProductCard data={i} key={index} />
                ))}
              </div>
              {filteredProducts.length === 0 ? (
                <h1 className="text-center w-full pb-[100px] text-[20px]">
                  No products found!
                </h1>
              ) : null}
            </div>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default SearchResults;





