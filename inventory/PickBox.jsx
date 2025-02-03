import React from "react";
import { FaBox } from 'react-icons/fa'; // React Icon for cart/cart add
import gigaBoxImage from '../assets/cartons/GIGA.png';
import megaBoxImage from '../assets/cartons/MEGA.png';
import midBoxImage from '../assets/cartons/MID.png';
import miniBoxImage from '../assets/cartons/MINI.png';
import nanoBoxImage from '../assets/cartons/NANO.png';
import tallBoxImage from '../assets/cartons/TALL[1].png';

const PickBox = () => {
  // Product data array
  const products = [
    {
      image: nanoBoxImage,
      label: 'NanoBox',
      size: '10x10x10',
      category: 'Small Size',
      id: 1
    },
    {
      image: midBoxImage,
      label: 'Macro Box',
      size: '20x20x20',
      category: 'Medium Size',
      id: 2
    },
    {
      image: megaBoxImage,
      label: 'Jumbo Box',
      size: '30x30x30',
      category: 'Large Size',
      id: 3
    },
    {
      image: gigaBoxImage,
      label: 'Super Jumbo Box',
      size: '40x40x40',
      category: 'Extra Large Size',
      id: 4
    },
    {
      image: miniBoxImage,
      label: 'Short Box',
      size: '20X10X10',
      category: 'Short Size',
      id: 5
    },
    {
      image: tallBoxImage,
      label: 'Tall Box',
      size: '20X10X70',
      category: 'Tall Size',
      id: 6
    },
  ];

  return (
    <div className="bg-gray-900 text-gray-100 py-10">

      {/* Header Section */}
      <div className="text-center px-6 md:px-12 mb-12">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-6">Box Sizes That Match Your Transport Needs</h1>
        <h2 className="text-2xl md:text-3xl text-gray-300 font-semibold max-w-3xl mx-auto">
          From compact cars to large trucks, we’ve got the perfect box size for every need.
        </h2>
      </div>

      {/* Grid Section */}
      <section
        id="Projects"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 mx-auto max-w-screen-xl"
      >
        {products.map((product) => (
          <div key={product.id} className="relative group w-full bg-gray-800 shadow-lg rounded-lg overflow-hidden duration-300 transform hover:scale-105 hover:shadow-xl hover:ring-4 hover:ring-cyan-400">
            <div className="block">
              <img
                src={product.image}
                alt={product.label}
                className="w-full h-64 object-cover transition-transform group-hover:scale-105"
              />
              <div className="px-6 py-4">
                <span className="text-gray-400 text-xs uppercase tracking-wide">{product.category}</span>
                <p className="text-xl font-semibold text-white capitalize mt-2">{product.label}</p>
                <p className="text-sm font-semibold text-gray-300">{product.size}</p>
                <div className="flex items-center mt-4">
                  <p className="text-lg font-semibold text-cyan-300">{product.size}</p>
                  <div className="ml-auto">
                    <FaBox className="w-6 h-6 text-cyan-400 group-hover:text-cyan-500 transition-colors" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default PickBox;
