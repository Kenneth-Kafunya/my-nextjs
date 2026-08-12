"use client";
import { useState, useEffect } from "react";
import { SocialIcons } from "./IconMap.jsx";
import EmailLink from "../components/EmailLink";

export default function Footer() {
  const [date, setDate] = useState("");

  useEffect(() => {
    const now = new Date();
    setDate(now.getFullYear().toString());
  }, []);
  return (
    <footer
      className=" text-gray-200 border-t border-t-gray-200 py-4 px-6 text-center [@media(min-width:768px)_and_(max-width:1024px)]:p-6
"
    >
      <div className="footerContainer flex justify-between font-light text-xs max-sm:flex-col max-sm:gap-2 max-sm:items-center [@media(min-width:768px)_and_(max-width:1024px)]:flex-col [@media(min-width:768px)_and_(max-width:1024px)]:items-center [@media(min-width:768px)_and_(max-width:1024px)]:gap-4">
        {" "}
        {/* <p>&copy;{`${date}`} Kenneth Kafunya</p> */}
        <EmailLink
          email="kennethkafunya@gmail.com"
          className=" transition-colors py-2 px-3 border border-border rounded-full hover:text-foreground"
        >
          Contact me
        </EmailLink>
        <p className="flex items-center gap-1">
          &copy;{`${date}`} Kenneth Kafunya. With{" "}
          <span className="text-red-700 ">{SocialIcons.heart}</span>
        </p>
      </div>
    </footer>
  );
}
