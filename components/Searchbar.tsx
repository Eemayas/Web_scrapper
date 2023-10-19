"use client";
import { scrapeAndStoreProduct } from "@/lib/action";
import React, { FormEvent, useState } from "react";

const Searchbar = () => {
  const [searchPrompt, setSetsearchPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isValidAamazonProductURL = (url: string) => {
    try {
      const parsedURL = new URL(url);
      const hostName = parsedURL.hostname;
      if (
        hostName.includes("amazon.com") ||
        hostName.includes("amazon.") ||
        hostName.endsWith("amazon")
      ) {
        return true;
      }
    } catch (error) {
      return false;
    }
    return false;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValidLink = isValidAamazonProductURL(searchPrompt);
    // alert(isValidLink ? "Valid Link" : "Invalid Link");

    if (!isValidLink) {
      return alert("Plaease Provide a Valid Amazon Product URL");
    }

    try {
      setIsLoading(true);
      const product = await scrapeAndStoreProduct(searchPrompt);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form className="flex flex-wrap gap-4 mt-12" onSubmit={handleSubmit}>
      <input
        type="text"
        value={searchPrompt}
        onChange={(e) => setSetsearchPrompt(e.target.value)}
        placeholder="Enter product Link"
        className="searchbar-input"
      ></input>
      <button
        disabled={searchPrompt === ""}
        type="submit"
        className="searchbar-btn"
      >
        {isLoading ? "Searching...." : "Search"}
      </button>
    </form>
  );
};

export default Searchbar;
