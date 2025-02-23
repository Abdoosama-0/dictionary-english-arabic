"use client";
import WordList from "@/components/WordList";



import { useState, useEffect, useRef, use } from "react";
import { Copy, Search } from "lucide-react"; // تأكد من وجود مكتبة أيقونات مناسبة

export default function Searchy() {
  

const words = [
  { word: "Hello", translate: ["اهلا", "مرحبا"] },
  { word: "World", translate: ["عالم"] },
  { word: "Computer", translate: ["حاسوب"] },
  { word: "Science", translate: ["علم"] },
  { word: "Language", translate: ["لغة"] },
  { word: "Book", translate: ["كتاب"] },
  { word: "Pen", translate: ["قلم"] },
  { word: "Paper", translate: ["ورقة"] },
  { word: "Table", translate: ["طاولة"] },
  { word: "Chair", translate: ["كرسي"] },
  { word: "Car", translate: ["سيارة"] },
  { word: "Bus", translate: ["حافلة"] },
  { word: "Train", translate: ["قطار"] },
  { word: "Airplane", translate: ["طائرة"] },
  { word: "Ship", translate: ["سفينة"] },
  { word: "Tree", translate: ["شجرة"] },
  { word: "Flower", translate: ["زهرة"] },
  { word: "Sun", translate: ["شمس"] },
  { word: "Moon", translate: ["قمر"] },
  { word: "Star", translate: ["نجمة"] },
  { word: "Sky", translate: ["سماء"] },
  { word: "Earth", translate: ["أرض"] },
  { word: "Water", translate: ["ماء"] },
  { word: "Fire", translate: ["نار"] },
  { word: "Wind", translate: ["رياح"] },
  { word: "Mountain", translate: ["جبل"] },
  { word: "River", translate: ["نهر"] },
  { word: "Ocean", translate: ["محيط"] },
  { word: "Fish", translate: ["سمكة"] },
  { word: "Bird", translate: ["طائر"] },
  { word: "Dog", translate: ["كلب"] },
  { word: "Cat", translate: ["قط"] },
  { word: "Horse", translate: ["حصان"] },
  { word: "Elephant", translate: ["فيل"] },
  { word: "Lion", translate: ["أسد"] },
  { word: "Tiger", translate: ["نمر"] },
  { word: "Bear", translate: ["دب"] },
  { word: "Snake", translate: ["ثعبان"] },
  { word: "Turtle", translate: ["سلحفاة"] },
  { word: "Frog", translate: ["ضفدع"] },
  { word: "House", translate: ["منزل"] },
  { word: "Door", translate: ["باب"] },
  { word: "Window", translate: ["نافذة"] },
  { word: "Roof", translate: ["سقف"] },
  { word: "Wall", translate: ["جدار"] },
  { word: "Floor", translate: ["أرضية"] },
  { word: "Kitchen", translate: ["مطبخ"] },
  { word: "Bathroom", translate: ["حمام"] },
  { word: "Garden", translate: ["حديقة"] }
];
  const [on,setOn]=useState<boolean>(false)

//=================================================
const [copiedText,setCopiedText]=useState<string>("")
const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
  setCopiedText(text);
  setTimeout(() => {
    setCopiedText("");
  }, 1000);
};
//=================================================

  const [onSearch, setOnSearch] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>(""); // تخزين النص المكتوب في البحث
  const searchRef = useRef<HTMLDivElement>(null);

  // ✅ إغلاق البحث عند النقر خارج مربع البحث
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setOnSearch(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // ✅ فلترة الكلمات بناءً على النص المدخل
  const filteredWords = words.filter((item) =>
    item.word.toLowerCase().includes(searchTerm.toLowerCase()) // البحث غير حساس لحالة الأحرف
  );

  return (
    <main className="flex flex-col items-center">
      {/* {onSearch && <h1 className="bg-green-500 p-2 text-white">onSearch = true</h1>} */}
{/* ======================================================================================================================== */}

      <div
        ref={searchRef}
        className={`z-[102] w-3/5 h-16 bg-zinc-700 m-3 rounded-full py-2 pr-3 pl-11 flex items-center justify-between border-4 border-transparent hover:bg-neutral-50 hover:border-slate-700
           ${onSearch && "bg-neutral-200 border-slate-800" }`
      }
      >
        <input
          className="border-none outline-none w-4/5 bg-transparent flex-grow mr-2 h-full text-black font-serif text-2xl "
          type="text"
          placeholder="ابحث هنا..."
          value={searchTerm} // ✅ ربط الإدخال بحالة البحث
          onChange={(e) => setSearchTerm(e.target.value)} // ✅ تحديث النص عند الكتابة
          onClick={() => {setOnSearch(true), setOn(true)}}
       
        />

        <Search color="white" size={60} className="bg-zinc-800 p-2 cursor-pointer rounded-full h-full" />
      </div>
{/* ======================================================================================================================== */}
      {/* ================================================*/}
      
      {/* ================================================*/}
      {on &&( <div onClick={()=>setOn(false)} className="fixed inset-0 z-[100] bg-black  bg-opacity-100"></div>)}
      {searchTerm && (
        <>
        {/* ================================================================================================================================================*/}   
        {on && (
  <div className="bg-white shadow-md rounded-md p-3 w-3/5 flex flex-wrap mb-2 z-[101]">
    {filteredWords.length > 0 ? (
      filteredWords.map((item, index) => (
        <div key={index} className="p-2 w-fit">
          {/* ✅ جعل الكلمة مجموعة خاصة بها */}
          <p className="text-white bg-black p-2 rounded-full mr-2 relative group">
            {item.word}
            {/* ✅ عرض الترجمة عند تمرير الماوس فقط على الكلمة */}
            <div className="absolute left-0 top-full mt-0 flex flex-col gap-2 bg-slate-800 z-20 p-2 w-28 rounded-xl opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-transform duration-300">
              {item.translate.map((t, tIndex) => (
                <div key={tIndex} className="">
                  <div className="text-white bg-gray-700 w-full p-2 rounded-xl mx-1 flex justify-between">
                    <span>{t}</span>
                    <div className="relative">
                      <Copy onClick={() => copyToClipboard(t)} className="bg-transparent cursor-pointer" />
                      {copiedText === t && (
                        <div className="bg-green-600 text-white p-1 rounded-lg shadow-lg absolute z-50 left-0">
                          Copied: {copiedText}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </p>
        </div>
      ))
    ) : (
      <p className="text-gray-500 p-2">لا توجد نتائج</p>
    )}
  </div>
)}


   {/* ================================================================================================================================================*/}   

</>
)}

    </main>
  );
}
