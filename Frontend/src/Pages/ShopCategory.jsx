


// import React, { useContext, useState } from 'react'
// import {ShopContext} from '../Context/ShopContext'
// import dropdown_icon from "../assets/Assets/dropdown_icon.png"
// import Item from '../assets/Item/Item'

// export default function ShopCategory(props) {

//     const {all_product}=useContext(ShopContext);
//     const [search,setSearch]=useState("");

//     console.log();
//     // console.log(all_product.filler(data=>data.name.toLowerCase().includes("ex")));
//   return (
//     <div className='shop-category'>
    
// <img src={props.banner} alt="" />

// <div className="shopcategory-indexSort">
//     <p>
//         <span>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit magni porro blanditiis doloremque at aliquam eaque facere repellendus
//              eveniet quo, earum dolorem doloribus numquam reprehenderit eos tempore saepe pariatur quis.</span>
//     </p>
//     <div className="shopcategory-sort">
//     sort by <img src={dropdown_icon} alt="" />
//     </div>
// <input type="text" onChange={e=>setSearch(e.target.value)} />
// </div>

// <div className="shopcatogory-products">
//     {
//        all_product.length>0 ? (
//       all_product.map((item,i)=>{
//             if (props.category==item.category) {
//                 return <Item key={i} id={item.id} name={item.name}  image={item.image} new_price={item.new_price} old_price={item.old_price} />
//             }
// else{
//     return null;
// }
//         })
//     ):(
//         <p>Not Found</p>
//     )
//     }
// </div>

//     </div>
//   )
// }





// // // src/components/ProductList.js

// // import React, { useContext, useState } from 'react';
// // import { ShopContext } from '../Context/ShopContext';

// // const ProductList = () => {
// //   const { all_product } = useContext(ShopContext);
// //   const [sortOption, setSortOption] = useState(''); // State for sorting option

// //   const handleSortChange = (event) => {
// //     setSortOption(event.target.value);
// //   };

// //   // Function to sort products based on the selected option
// //   const sortProducts = (products, option) => {
// //     switch (option) {
// //       case 'a-z':
// //         return [...products].sort((a, b) => a.name.localeCompare(b.name));
// //       case 'z-a':
// //         return [...products].sort((a, b) => b.name.localeCompare(a.name));
// //       case 'price_low-high':
// //         return [...products].sort((a, b) => a.price - b.price);
// //       case 'price_high-low':
// //         return [...products].sort((a, b) => b.price - a.price); // Corrected sorting
// //       default:
// //         return products;
// //     }
// //   };

// //   // Apply sorting when products or sortOption changes
// //   const sortedProducts = sortProducts(all_product, sortOption);

// //   return (
// //     <div>
// //       <div>
// //         <label>
// //           Sort by:
// //           <select value={sortOption} onChange={handleSortChange}>
// //             <option value="">Select an option</option>
// //             <option value="a-z">Name A-Z</option>
// //             <option value="z-a">Name Z-A</option>
// //             <option value="price_low-high">Price Low-High</option>
// //             <option value="price_high-low">Price High-Low</option>
// //           </select>
// //         </label>
// //       </div>
// //       <ul>
// //         {sortedProducts.length > 0 ? (
// //           sortedProducts.map(product => (
// //             <li key={product._id}>
// //               <h2>{product.name}</h2>
// //               <p>{product.description}</p>
// //               <img src={product.image} alt={product.name} height={200} width={200} />
// //               <p>${product.new_price}</p>
// //               <p><del>${product.old_price}</del></p>
// //             </li>
// //           ))
// //         ) : (
// //           <p>No products found</p>
// //         )}
// //       </ul>
// //     </div>
// //   );
// // };

// // export default ProductList;




import React, { useContext, useState } from 'react';
import { ShopContext } from '../Context/ShopContext';
import dropdown_icon from "../assets/Assets/dropdown_icon.png";
import Item from '../assets/Item/Item';

export default function ShopCategory(props) {
  const { all_product } = useContext(ShopContext);
  const [search, setSearch] = useState("");
  const [sortOption, setSortOption] = useState('');
// console.log(all_product);
  // Function to handle sorting
  const sortProducts = (products, option) => {
    switch (option) {
      case 'a-z':
        return [...products].sort((a, b) => a.name.localeCompare(b.name));
      case 'z-a':
        return [...products].sort((a, b) => b.name.localeCompare(a.name));
      case 'price_low-high':
        return [...products].sort((a, b) => a.new_price - b.new_price);
      case 'price_high-low':
        return [...products].sort((a, b) => b.new_price - a.new_price);
      default:
        return products;
    }
  };

  // Filter and sort products based on search and sortOption
  const filteredAndSortedProducts = sortProducts(
    all_product.filter(item => item.name.toLowerCase().includes(search.toLowerCase()) && item.category === props.category),
    sortOption
  );

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  return (
    <div className='shop-category'>
      <img src={props.banner} alt="" />

      <div className="shopcategory-indexSort">
        <p>
          <span>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit magni porro blanditiis doloremque at aliquam eaque facere repellendus
            eveniet quo, earum dolorem doloribus numquam reprehenderit eos tempore saepe pariatur quis.</span>
        </p>
        <div className="shopcategory-sort">
          <span>Sort by</span>
          <img src={dropdown_icon} alt="" />
          <select value={sortOption} onChange={handleSortChange}>
            <option value="">Select an option</option>
            <option value="a-z">Name A-Z</option>
            <option value="z-a">Name Z-A</option>
            <option value="price_low-high">Price Low-High</option>
            <option value="price_high-low">Price High-Low</option>
          </select>
        </div>
        <input 
          type="text" 
          placeholder="Search..." 
          onChange={e => setSearch(e.target.value)} 
          value={search} 
        />
      </div>

      <div className="shopcatogory-products">
        {filteredAndSortedProducts.length > 0 ? (
          filteredAndSortedProducts.map((item, i) => (
            <Item 
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
              stock={item.stock}
            />
          ))
        ) : (
          <p>Not Found</p>
        )}
      </div>
    </div>
  );
}
