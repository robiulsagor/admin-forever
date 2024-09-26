const Orders = () => {
  return (
    <div className="w-full pt-4 pb-10">
      <h2 className="text-xl font-medium text-gray-700 mb-3">All Orders</h2>

      <div>
        {Array.from({ length: 2 }).map((_, index) => (
          <div key={index} className="border border-gray-300 rounded p-2 mb-2 grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr]">
            <img src="https://raw.githubusercontent.com/avinashdm/gs-images/main/forever/p_img47.png" className="w-12 h-12 object-cover rounded" alt="" />

            <div>
              <h3 className="text-lg font-medium text-gray-700">Product Name</h3>
            </div>
          </div>

        ))}
      </div>
    </div>
  )
}

export default Orders