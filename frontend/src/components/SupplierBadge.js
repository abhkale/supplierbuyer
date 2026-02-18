import React from 'react';

const SupplierBadge = ({ supplier, showRating = true }) => {
  return (
    <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-200 rounded-full px-3 py-1">
      <span className="text-sm font-medium text-blue-900">
        {supplier.companyName || supplier.name}
      </span>
      {showRating && supplier.rating > 0 && (
        <span className="text-xs text-blue-600">
          ⭐ {supplier.rating.toFixed(1)}
        </span>
      )}
    </div>
  );
};

export default SupplierBadge;
