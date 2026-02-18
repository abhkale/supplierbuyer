import React from 'react';

const PriceComparisonTable = ({ prices }) => {
  if (!prices || prices.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No prices available from suppliers
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Supplier
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Stock Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Min. Order Qty
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Last Updated
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {prices.map((priceObj, index) => (
            <tr
              key={priceObj._id || index}
              className={index === 0 ? 'bg-green-50' : ''}
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    {priceObj.supplierInfo?.companyName || priceObj.supplierInfo?.name}
                  </div>
                  {priceObj.supplierInfo?.rating > 0 && (
                    <div className="text-sm text-gray-500">
                      ⭐ {priceObj.supplierInfo.rating.toFixed(1)}
                    </div>
                  )}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="text-lg font-semibold text-primary-600">
                  ${priceObj.price.toFixed(2)}
                </span>
                {index === 0 && (
                  <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                    Lowest
                  </span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 py-1 text-xs rounded ${
                    priceObj.stockStatus === 'in-stock'
                      ? 'bg-green-100 text-green-800'
                      : priceObj.stockStatus === 'limited'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {priceObj.stockStatus}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {priceObj.minimumOrderQuantity}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(priceObj.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PriceComparisonTable;
