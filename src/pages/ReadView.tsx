import { faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import Download from "../components/Download";

export default function ReadView(): JSX.Element {
  const id: string = window.location.href.split("chapter=")[1];
  const [title, setTitle] = useState("");
  const [images, setImages] = useState([]);
  const [details, setDetails] = useState("");
  const [product, setProductId] = useState("");
  const [nextId, setNextId] = useState("");
  const [prevId, setPrevId] = useState("");
  const [productType, setProductType] = useState("");

  useEffect(() => {
    fetch(
      "https://asia-southeast2-mynovel01.cloudfunctions.net/productEP/getProductEpById",
      {
        method: "POST",
        headers: {
          accept: "application/json, text/plain, */*",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          fontCustom: "Sarabun",
          id: id,
        }),
      }
    ).then((res) => {
      res.json().then((data) => {
        setProductType(data["ProductTypeSet"]);
        if (data["ProductId"]) setProductId(data["ProductId"]);
        if (data["ImageUrlLists"] && data.ProductTypeSet == "Cartoon")
          setImages(data["ImageUrlLists"]);
        else if (data["EpDetail"] && data.ProductTypeSet == "Novel")
          setDetails(data["EpDetail"]);
        if (data["EpName"]) setTitle(data["EpName"]);
        const numberCh: number = data["EpTopic"].length;
        data["EpTopic"].map((item: any, index: any) => {
          if (item["EpId"] === id) {
            index + 1 >= numberCh
              ? null
              : setNextId(data["EpTopic"][index + 1]["EpId"]);
            index - 1 < 0
              ? null
              : setPrevId(data["EpTopic"][index - 1]["EpId"]);
            return;
          }
        });
      });
    });
  }, []);

  return (
    <>
      {/* title chaptername */}
      <div className="container mx-auto my-8">
        <h1 className="text-center text-3xl font-bold">{title}</h1>
      </div>
      {/* Button next-prev */}
      <div className="container mx-auto my-8 flex justify-between">
        {prevId !== "" ? (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => (window.location.href = `/read?chapter=${prevId}`)}
          >
            Prev
          </button>
        ) : (
          <button className="text-transparent font-bold py-2 px-4 rounded cursor-default">
            Prev
          </button>
        )}
        {/* div button functions */}
        <div className="flex justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => (window.location.href = `/product?id=${product}`)}
          >
            <FontAwesomeIcon icon={faList} />
          </button>
          <Download title={title} images={images} />
        </div>
        {nextId !== "" ? (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => (window.location.href = `/read?chapter=${nextId}`)}
          >
            Next
          </button>
        ) : (
          <button className="text-transparent font-bold py-2 px-4 rounded cursor-default">
            Prev
          </button>
        )}
      </div>
      {/* images scroll */}
      {productType == "Cartoon" ? (
        <div className="container mx-auto my-8 flex justify-center">
          <div className="flex flex-wrap justify-center">
            {images.map((item, index) => (
              <img src={item} height={"auto"} className="w-full" key={index} />
            ))}
          </div>
        </div>
      ) : (
        // novel scroll reader text
        <div className="container mx-auto my-8 flex justify-center">
          <div className="flex flex-wrap justify-center">
            <div dangerouslySetInnerHTML={{ __html: details }} />
          </div>
        </div>
      )}
      {/* Button next-prev */}
      <div className="container mx-auto my-8 flex justify-between">
        {prevId !== "" ? (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => (window.location.href = `/read?chapter=${prevId}`)}
          >
            Prev
          </button>
        ) : (
          <button></button>
        )}
        {nextId !== "" ? (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => (window.location.href = `/read?chapter=${nextId}`)}
          >
            Next
          </button>
        ) : (
          <button></button>
        )}
      </div>
    </>
  );
}
