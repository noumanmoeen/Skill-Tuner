import React, { Component } from "react";

class FeatureVideos extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <section className="text-gray-700 bg-gray-100 body-font">
          <div className="text-center py-2">
            <h2 className="m-5 font-bold">Feature Videos</h2>
          </div>
          <div className="container py-4   mx-auto px-4 md:px-12">
            <div className="flex flex-wrap -mx-1 lg:-mx-4">
              <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
                <div className="flex relative">
                  <img
                    alt="gallery"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                    src="https://i.pinimg.com/564x/61/e3/d5/61e3d5ce3923b1a74eab3434df097990.jpg"
                  />
                  <div className="px-8 py-10 relative z-10 w-full border border-gray-200 bg-white transform transition duration-500 hover:scale-125 opacity-0 hover:opacity-100">
                    <iframe
                      className="absolute inset-0 w-full h-full object-cover object-center"
                      src="https://www.youtube.com/embed/4UZrsTqkcW4?autoplay=1"
                      frameBorder={0}
                      allow="autoplay"
                      allowFullScreen
                    />
                    <div className="h-40" />
                  </div>
                </div>
              </div>
              <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
                <div className="flex relative">
                  <img
                    alt="gallery"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                    src="https://miro.medium.com/max/700/1*OrjCKmou1jT4It5so5gvOA.jpeg"
                  />
                  <div className="px-8 py-10 relative z-10 w-full border border-gray-200 bg-white transform transition duration-500 hover:scale-125 opacity-0 hover:opacity-100">
                    <iframe
                      className="absolute inset-0 w-full h-full object-cover object-center"
                      src="https://www.youtube.com/embed/4deVCNJq3qc?autoplay=1"
                      frameBorder={0}
                      allow="autoplay"
                      allowFullScreen
                    />
                    <div className="h-40" />
                  </div>
                </div>
              </div>
              <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
                <div className="flex relative">
                  <img
                    alt="gallery"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                    src="https://www.techiexpert.com/wp-content/uploads/2019/07/AngularJS-1.png"
                  />
                  <div className="px-8 py-10 relative z-10 w-full border border-gray-200 bg-white transform transition duration-500 hover:scale-125 opacity-0 hover:opacity-100">
                    <iframe
                      className="absolute inset-0 w-full h-full object-cover object-center"
                      src="https://www.youtube.com/embed/2OHbjep_WjQ?autoplay=1"
                      frameBorder={0}
                      allow="autoplay"
                      allowFullScreen
                    />
                    <div className="h-40" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />
          <br />
        </section>
      </>
    );
  }
}

export default FeatureVideos;
