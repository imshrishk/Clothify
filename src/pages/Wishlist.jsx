import React from "react";
import { SectionTitle, WishItem } from "../components";
import { useSelector } from "react-redux";

const Wishlist = () => {
  const { wishItems } = useSelector((state) => state.wishlist); 

  return (
    <>
      <SectionTitle title="Wishlist" path="Home | Wishlist" />
      <div className="max-w-7xl mx-auto">
        {wishItems.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th className="text-accent-content text-2xl">Image</th>
                  <th className="text-accent-content text-2xl">Name</th>
                  <th className="text-accent-content text-2xl">Size</th>
                  <th className="text-accent-content text-2xl">Action</th>
                </tr>
              </thead>
              <tbody>
                {wishItems.map((item, index) => (
                  <WishItem 
                    item={item} 
                    key={item.id} 
                    counter={index}
                  />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-3xl text-accent-content mt-10">
            Your wishlist is empty.
          </p>
        )}
      </div>
    </>
  );
};

export default Wishlist;
