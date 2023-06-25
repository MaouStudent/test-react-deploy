import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import fa fas icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faList } from "@fortawesome/free-solid-svg-icons";
// type
interface TypeData {
  _id: string;
  id: string;
  ProductName: string;
  ProductIntro: string;
  CreateBy: string;
  CreateId: string;
  ProductView: number;
  ProductGroup: string;
  ProductTypeSet: string;
  isPublish: boolean;
  ImageUrl: string;
  EpCountPublised: number;
  ProductRate: string;
  ProductType: string;
  fanClubTranslate: string;
  ProductPublisher: string;
  isCopyright: boolean;
  ProductPrice: number;
  G;
  isFinished: boolean;
  EpLastUpdate: string;
  Discount: number;
  isAccept: boolean;
}

export default function Home(): JSX.Element {
  const [currentSlide, setCurrentSlide] = React.useState(0);

  const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
    <button
      {...props}
      className={
        "slick-prev slick-arrow" + (currentSlide === 0 ? " slick-disabled" : "")
      }
      aria-hidden="true"
      aria-disabled={currentSlide === 0 ? true : false}
      type="button"
    >
      Previous
    </button>
  );
  const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
    <button
      {...props}
      className={
        "slick-next slick-arrow" +
        (currentSlide === slideCount - 1 ? " slick-disabled" : "")
      }
      aria-hidden="true"
      aria-disabled={currentSlide === slideCount - 1 ? true : false}
      type="button"
    >
      Next
    </button>
  );
  const settings = {
    dots: false,
    infinite: true,
    speed: 200,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: (
      <SlickArrowLeft currentSlide={currentSlide} slideCount={undefined} />
    ),
    nextArrow: (
      <SlickArrowRight currentSlide={currentSlide} slideCount={undefined} />
    ),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    autoplay: true,
    autoplaySpeed: 2000,
    centerMode: true,
    centerPadding: "20%",
  };

  const images = [
    "https://images.mynovel.co/Banner/3.%20Banner_ท่านแม่ผู้นี้คืออดีตสุดยอดนักฆ่า-01.jpg",
    "https://images.mynovel.co/Banner/1.%207.%2013.%2019.%2025.%20Banner_150666-01.jpg",
    "https://images.mynovel.co/Banner/2.%20Banner_อาร์ติแฟกส์%20ออนไลน์%20(MMORPG%20-%20Artifact%20Online)-01.jpg",
    "https://images.mynovel.co/Banner/5.%20Banner_ชายาป่วนกวนวังหลัง-01.jpg",
  ];

  const [ndata, setNData] = React.useState<TypeData[]>([]);
  const [newcurrentSlide, setnewcurrentSlide] = React.useState(0); // move the useState call outside of the loop
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://asia-southeast2-mynovel01.cloudfunctions.net/product/FETCH-PRODUCTS-SEARCH",
      {
        headers: {
          "content-type": "application/json",
        },
        body: null,
        method: "POST",
      }
    )
      .then(async (response) => {
        setNData(await response.json());
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  // filter each data by types Dict
  const types = Array.from(new Set(ndata.map((item) => item.ProductTypeSet)));
  const typesDict = types.reduce((acc, type) => {
    acc[type] = ndata.filter((item) => item.ProductTypeSet === type);
    return acc;
  }, {});
  // typesDict sort by ProductView
  Object.keys(typesDict).forEach((key) => {
    typesDict[key].sort((a, b) => b.ProductView - a.ProductView);
  });
  return (
    <>
      <Slider {...settings} className="container mx-auto w-full">
        {images.map((image, index) => (
          <div key={index}>
            <img
              src={image}
              height="auto"
              width="auto"
              style={{
                maxWidth: "900px",
                maxHeight: "500px",
                borderRadius: "40px",
              }}
              className="focus:outline-none mx-auto my-5 py-3 px-0"
              alt={`Slide ${index}`}
            />
          </div>
        ))}
      </Slider>
      {(types as string[]).map((typeName: string, index: number) => {
        return (
          <div key={index} className="container mx-auto w-full">
            <h1 className="flex justify-between mx-1 text-2xl font-bold">
              {typeName}
              <span className=" text-blue-700 font-bold">more...</span>
            </h1>
            <div className="my-4">
              {/* show card for each item */}
              <Slider
                className="mx-10 px-10"
                leftMode={true}
                slidesToShow={8}
                slidesToScroll={8}
                infinite={false}
              >
                {typesDict[typeName].map((item: TypeData, index: number) => {
                  return !item.ImageUrl ? null : (
                    <div
                      key={item.id}
                      className="flex flex-col justify-center items-center"
                    >
                      <div
                        className="transition-3d-hover mx-center cursor-pointer"
                        data-toggle="tooltip"
                        data-placement="top"
                        title={item.ProductName}
                      >
                        <a
                          href={`/product?id=${item.id}`}
                          data-toggle="modal"
                          data-target=".bd-example-modal-xl"
                          data-backdrop="static"
                          data-keyboard="false"
                          draggable="false"
                        >
                          <div className="relative h-56 w-40 min-w-40 min-h-56 rounded-lg overflow-hidden">
                            <span
                              className="lazy-load-image-background lazy-load-image-loaded block"
                              style={{ color: "transparent" }}
                            >
                              <img
                                alt={item.ProductName}
                                draggable="false"
                                src={item.ImageUrl}
                                className="h-56 w-40 min-w-40 min-h-56 bg-contain bg-no-repeat bg-center-top rounded-lg bg-blue-200"
                              />
                            </span>
                            <span
                              className="absolute bottom-0 right-0 text-white font-bold text-right pr-1 pb-1 w-full"
                              style={{
                                background:
                                  "linear-gradient(0deg, rgba(45, 45, 45, 0.9), rgba(45, 45, 45, 0))",
                              }}
                            >
                              updated to {item.EpCountPublised}
                            </span>
                          </div>
                        </a>
                        <div className="mb-2">
                          <div className="overflow-hidden"></div>
                          <div
                            className="pt-2"
                            style={{ width: "160px", lineHeight: "1.2" }}
                          >
                            <h3
                              className="card-title text-dark inline-block truncate cursor-pointer font-bold text-truncate"
                              data-toggle="modal"
                              data-target=".bd-example-modal-xl"
                              data-backdrop="static"
                              data-keyboard="false"
                              style={{ width: "160px", fontSize: "16px" }}
                            >
                              {item.ProductName}
                            </h3>
                            {/* <span><small className="text-secondary inline-block truncate"><strong>โรแมนติก x ย้อนยุค</strong></small></span> */}
                            <div
                              className="flex justify-between text-xs"
                              style={{ fontSize: "0.8em" }}
                            >
                              <div className="col-1">
                                <strong>
                                  <FontAwesomeIcon
                                    icon={faEye}
                                    style={{ paddingRight: "5px" }}
                                  />
                                  {item.ProductView}
                                </strong>
                              </div>
                              <div className="col-2">
                                <strong>
                                  <FontAwesomeIcon
                                    icon={faList}
                                    style={{ paddingRight: "5px" }}
                                  />
                                  {item.EpCountPublised}
                                </strong>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </Slider>
            </div>
          </div>
        );
      })}
    </>
  );
}
