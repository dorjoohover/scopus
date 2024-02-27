"use client";
import Image from "next/image";
import { useState } from "react";
async function searchData(query: string) {
  try {
    ("use server");
    const res = await fetch(`/api/scopus`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: query,
      }),
    }).then((d) => d.json());

    return res;
  } catch (error) {
    throw new Error(`${error}`);
  }
}
export default function Home() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState<boolean>(false)
  const [search, setSearch] = useState<string | undefined>();
  const getData = async () => {
    setLoading(true)
    if (search != undefined) {
      await searchData(search).then((d) => {
        setData(d["search-results"]["entry"]);
      });
    }
    setLoading(false)
  };
  const findScopusUrl = (link: any): string => {
    if (!link) {
      return "";
    }

    let linkObject = link.find(
      (item: { [x: string]: string }) => item["@ref"] === "scopus"
    );

    return linkObject?.["@href"] || "";
  };

  return (
    <div>
      <input
        className="text-black"
        onChange={(e) => {
          console.log(e.target.value);
          setSearch(e.target.value);
        }}
        value={search}
      />
      <button onClick={() => getData()}>search</button>
      {!loading && data != undefined &&
        (data as Array<any>).map((d, i) => {
          return (
            <div className="py-4" key={i}>
              <h2>title: {d?.["dc:title"]}</h2>
              <h4>author: {d?.["dc:creator"]}</h4>
              <h5>publisher: {d?.["prism:publicationName"]}</h5>
              <a href={findScopusUrl(d?.["link"])} target="_blank">
                url
              </a>
            </div>
          );
        })}
        {loading && <p>loading...</p>}
    </div>
  );
}
