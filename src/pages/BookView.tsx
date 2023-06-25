import React, { useEffect, useState } from "react";
import Header from "../components/Header";
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

export default function BookView(): JSX.Element {
  const bookId: string = window.location.href.split("id=")[1];

  const [ndata, setNData] = useState<TypeData[]>([]);
  const [currentChapter, setCurrentChapter] = useState({ id: "", name: "" });
  useEffect(() => {
    fetch(
      `https://asia-southeast2-mynovel01.cloudfunctions.net/product/${bookId}`
    )
      .then((res) => res.json())
      .then((data) => {
        setNData(data);
      });
  }, []);

  return (
    <>
      {/* Title */}
      <div className="container mx-auto my-8">
        <h1 className="text-center text-3xl font-bold">
          {ndata["ProductName"]}
        </h1>
      </div>
      {/* create button chapters name and link */}
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-center">
          {ndata["EpTopic"]?.map((chapter) => (
            <button
              onClick={() =>
                (window.location.href = `/read?chapter=${chapter["EpId"]}`)
              }
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded m-2"
              key={chapter["EpId"]}
            >
              {chapter["EpName"]}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
