import NavBar from "./components/NavBar";


const Home = () => {
    return (
        <>
        <div className="App">
          <NavBar />
          <section className="hero h-3/4 bg-pink-200">
            <div className="hero-content text-center">
              <div className="max-w-md">
                <h1 className="text-5xl font-bold">Hello there</h1>
                <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                <button className="btn btn-primary">Get Started</button>
              </div>
            </div>
          </section>
          <section className="posts-section bg-purple-700 p-12">
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap justify-center">
                <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 px-4">
                  <div className="card bordered bg-white">
                    <figure>
                      <img src="https://placekitten.com/200/300" />
                    </figure>
                    <div className="card-body">
                      <h2 className="card-title">Post 1</h2>
                      <p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                  </div>
                </div>
                <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 px-4">
                  <div className="card bordered bg-white">
                    <figure>
                      <img src="https://placekitten.com/200/300" />
                    </figure>
                    <div className="card-body">
                      <h2 className="card-title">Post 2</h2>
                      <p>Some quick example text to build on the card title and make up the tail of the card's content.</p>
                    </div>
                  </div>
                </div>
                <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 px-4">
                  <div className="card bordered bg-white">
                    <figure>
                      <img src="https://placekitten.com/200/300" />
                    </figure>
                    <div className="card-body">
                      <h2 className="card-title">Post 3</h2>
                      <p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </>
    )
}

export default Home
