"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ChevronDown, Copy } from "lucide-react"; 

const ITEMS_PER_PAGE = 20; // عدد الكلمات في كل صفحة

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

export default function WordList() {
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 1000); // إخفاء الرسالة بعد ثانية
  };


  const searchParams = useSearchParams();
  const router = useRouter();
  
  // استخراج رقم الصفحة الحالية، مع التأكد من أنها تبدأ من 1 كحد أدنى
  const page = parseInt(searchParams.get("page") || "1");

  // حساب الكلمات التي يجب عرضها في هذه الصفحة
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const selectedWords = words.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // دالة لتغيير الصفحة بدون إعادة تحميل الصفحة
  const changePage = (newPage: number) => {
    router.push(`?page=${newPage}`, { scroll: false });
  };

  return (
    <main>
      <h1 className="text-stone-50 rounded-full mb-5 bg-zinc-700 h-10 flex items-center justify-center">
        Results - Page {page}
      </h1>

      <ul className="inline-flex flex-wrap z-10 rounded-2xl  w-full bg-black p-5">
        {selectedWords.map((word, index) => (
          <li key={index} className="relative mb-5 bg-zinc-800 rounded-xl text-stone-50 mr-5 flex justify-center items-center p-2 gap-1 cursor-default group">
            <h1 className="group-hover:text-sky-300">{word.word}</h1>
            <ChevronDown size={16} className="translate-y-[1px]" />
            <div className="absolute top-full left-0 w-full h-1 pointer-events-auto bg-transparent"></div>
            <ul className="flex flex-col gap-2 absolute top-full left-0 cursor-default z-30 mt-1 bg-zinc-800 text-stone-50 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-700 w-40 p-2">
              {word.translate.map((t, tIndex) => (
                <li className="hover:bg-zinc-700 p-2 rounded cursor-default flex justify-between " key={tIndex}>
                  <p className="">{t}</p>
                  <button className=" relative cursor-pointer bg-transparent hover:bg-slate-400 rounded-md p-1" onClick={() => copyToClipboard(t)}  >
                    <Copy />
                    {copiedText && (
        <div className=" bg-green-600 text-white p-3 rounded-lg shadow-lg absolute z-50 t-full ">
          Copied: {copiedText}
        </div>
      )}
                    </button>
                
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      {/* أزرار التنقل بين الصفحات */}
      <div className="flex justify-center gap-4 mt-5">
        {page > 1 && (
          <button onClick={() => changePage(page - 1)} className="px-4 py-2 bg-gray-700 text-white rounded-lg">
            Previous
          </button>
        )}
        {startIndex + ITEMS_PER_PAGE < words.length && (
          <button onClick={() => changePage(page + 1)} className="px-4 py-2 bg-gray-700 text-white rounded-lg">
            Next
          </button>
        )}
      </div>


    
  
    </main>
  );
}