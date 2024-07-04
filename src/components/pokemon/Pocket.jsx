import React from "react";
import { Trash2 } from "lucide-react"; // Make sure you have Lucide icons installed

const Pocket = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:space-x-4">
        {/* Product List */}
        <div className="flex-1 mb-8">
          <div className="border border-gray-200 rounded-md p-4">
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              Pocket list (2)
            </h3>
            <div className="w-full mb-4">
              {/* Column headers */}
              <div className="grid grid-cols-3 gap-4 mb-2">
                <div className="text-gray-600 font-bold">Product name</div>
                <div className="text-gray-600 font-bold">Quantity</div>
              </div>

              {/* Product items */}
              <div className="border-t border-gray-200 py-4">
                <div className="grid grid-cols-3 items-center gap-4">
                  <div className="flex items-center">
                    <img
                      src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
                      alt="Bulbasaur"
                      className="w-12 h-12 mr-4"
                    />
                    <div>
                      <div className="font-bold text-gray-800">Bulbasaur</div>
                      <div className="flex space-x-2 mt-1">
                        <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded">
                          Grass
                        </span>
                        <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded">
                          Poison
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center border border-gray-300 rounded px-3">
                    <div className="text-gray-800">1</div>
                  </div>
                  <div className="flex justify-end">
                    <button className="btn btn-ghost text-gray-500">
                      <Trash2 />
                    </button>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 py-4">
                <div className="grid grid-cols-3 items-center gap-4">
                  <div className="flex items-center">
                    <img
                      src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png"
                      alt="Ivysaur"
                      className="w-12 h-12 mr-4"
                    />
                    <div>
                      <div className="font-bold text-gray-800">Ivysaur</div>
                      <div className="flex space-x-2 mt-1">
                        <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded">
                          Grass
                        </span>
                        <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded">
                          Poison
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center border border-gray-300 rounded px-3">
                    <div className="text-gray-800">4</div>
                  </div>
                  <div className="flex justify-end">
                    <button className="btn btn-ghost text-gray-500">
                      <Trash2 />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="flex-1 mb-8">
          <div className="border border-gray-200 rounded-md">
            <div className="bg-yellow-100 px-4 py-2 rounded-t-md">
              <h3 className="text-lg font-medium text-gray-800">
                Order Summary
              </h3>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <p className="text-gray-600">Subtotal</p>
                <p className="text-gray-800 font-bold">2 Product</p>
              </div>
              <div className="flex justify-between items-center mb-4">
                <p className="text-gray-600">Quantity</p>
                <p className="text-gray-800 font-bold">6 Quantity</p>
              </div>
              <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded w-full">
                Proceed To Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pocket;
