
import WordList from "@/components/WordList";



import { useState, useEffect, useRef, use } from "react";
import { Copy, Search } from "lucide-react"; // تأكد من وجود مكتبة أيقونات مناسبة
import Searchy from "@/components/search";

export default function Home() {
  
  return (
    <main>  
<Searchy/>
<WordList/>
    </main>
  );
}

