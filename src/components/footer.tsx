"use client";
import { useState, useEffect } from "react";
import { SocialIcons } from "./IconMap.jsx";

export default function Footer() {
  const [date, setDate] = useState("");

  useEffect(() => {
    const now = new Date();
    setDate(now.getFullYear().toString());
  }, []);
  return (
    <footer
      className=" text-gray-200 border-t border-t-gray-200 p-4 text-center [@media(min-width:768px)_and_(max-width:1024px)]:p-6
"
    >
      <div className="footerContainer flex justify-between font-light text-xs max-sm:flex-col max-sm:gap-2 max-sm:items-center [@media(min-width:768px)_and_(max-width:1024px)]:flex-col [@media(min-width:768px)_and_(max-width:1024px)]:items-center [@media(min-width:768px)_and_(max-width:1024px)]:gap-4">
        {" "}
        <p>&copy;{`${date}`} Kenneth Kafunya, All rights reserved.</p>
        <p className="flex items-center gap-1">
          from Zambia, with{" "}
          <span className="text-red-700 ">{SocialIcons.heart}</span>
        </p>
      </div>
    </footer>
  );
}
