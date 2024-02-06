import Header from "../components/MainContent/Header";

const Notfound = () => {
  return (
    <div className="w-full h-screen flex flex-col">
      <div className="flex flex-col p-2 mt-20 md:mt-28 lg:mt-32 mb-4 mx-2 md:mx-3 lg:mx-4">
        <div>
          <Header title="Error 404"/>
        </div>
        <div className="min-h-screen h-screen overflow-y-auto scroll-smooth p-2 mt-2 mb-60 md:mb-72 lg:mb-80">
          <div className="text-center mt-10">
            <p className="text-4xl font-bold text-red-600 mb-4">
              Oops! Error 404
            </p>
            <p className="text-lg">
              Sorry, the page you're looking for cannot be found.
            </p>
            <a href="/home" className="block mt-6 text-sky-500 hover:underline">
              Go back to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notfound;
