
function HomePage() {
  return (
    <div className="context-page flex flex-col">
      <div className="p-5 text-white font-bold text-4xl sm:text-6xl md:text-6xl lg:text-8xl flex flex-col flex-end bg-gradient-to-r from-green-800 to-green-600">
        <div className="justify-self-start text-light flex-wrap grow">
          Your food.
        </div>
        <div className="justify-self-start text-light flex-wrap">
          Your Savings.
        </div>
      </div>
      <div className="text-xl text-dark bg-highlight text-center mb-2 p-4 w-3/4 rounded-xl mx-[12%] font-bold mt-2">
        Save the planet and your wallet!
      </div>
      <div className="flex items-center justify-center mt-2 mb-4 w-2/5 mx-auto">
        <input
          type="email"
          placeholder="Enter your email"
          className="mr-2 border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 flex-grow"
        />
        <button
          type="submit"
          className="bg-dark text-white px-4 py-2 rounded-md hover:bg-highlight focus:outline-none focus:ring-2 focus:ring-indigo-500 flex-shrink-0"
        >
          Join Us
        </button>
      </div>
    </div>
  );
}

export default HomePage;
