"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  PlayCircle,
  PauseCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Surah, Translation, Verse } from "@/types/quran";
import { qariOptions } from "@/types/qariOptions";
import { ModeToggle } from "@/components/ModeToggle";

export default function EnhancedQuranReader() {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [currentSurah, setCurrentSurah] = useState<Surah | null>(null);
  const [verses, setVerses] = useState<Verse | null>(null);
  const [translation, setTranslation] = useState<Translation | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [fontSize, setFontSize] = useState<number>(24);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(
    null
  );
  const [showSideNav, setShowSideNav] = useState<boolean>(true);
  const [qari, setQari] = useState<string>("ar.alafasy");

  const versesPerPage = 10;

  useEffect(() => {
    fetch("/api/surahs")
      .then((res) => res.json())
      .then((data) => {
        setSurahs(data);
        setCurrentSurah(data[0]);
      });
  }, []);

  useEffect(() => {
    if (currentSurah) {
      fetch(`/api/surah/${currentSurah.index}`)
        .then((res) => res.json())
        .then((data) => setVerses(data.verse));

      fetch(`/api/translation/ar/${currentSurah.index}`)
        .then((res) => res.json())
        .then((data) => setTranslation(data));

      setCurrentPage(1);
    }
  }, [currentSurah]);

  const handleSurahChange = (index: string) => {
    const surah = surahs.find((s) => s.index === index);
    if (surah) setCurrentSurah(surah);
  };

  const filteredVerses = verses
    ? Object.entries(verses).filter(
        ([key, verse]) =>
          verse.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (translation &&
            translation?.verse[key]
              ?.toLowerCase()
              .includes(searchTerm.toLowerCase()))
      )
    : [];

  const paginatedVerses = filteredVerses.slice(
    (currentPage - 1) * versesPerPage,
    currentPage * versesPerPage
  );

  const totalPages = Math.ceil(filteredVerses.length / versesPerPage);

  const playAudio = (src: string) => {
    if (currentAudio) {
      currentAudio.pause();
    }
  
    try {
      const audio = new Audio(src);
      audio.play();
      setCurrentAudio(audio);
      setIsPlaying(true);
      audio.onended = () => setIsPlaying(false);
    } catch (error) {
      throw new Error('s')
    }
  };

  const toggleAudio = (src: string) => {
    if (currentAudio && isPlaying) {
      currentAudio.pause();
      setIsPlaying(false);
    } else {
      playAudio(src);
    }
  };

  return (
    <div className="min-h-screen dark:bg-gray-900 dark:text-white bg-white text-gray-900">
      <div className="container mx-auto p-4 flex gap-x-4">
        {showSideNav && (
          <div className="w-1/4 pr-4">
            <ScrollArea className="h-[calc(100vh-2rem)]">
              <div className="space-y-2">
                {surahs.map((surah) => (
                  <Button
                    key={surah.index}
                    variant={
                      currentSurah?.index === surah.index
                        ? "secondary"
                        : "ghost"
                    }
                    className="w-full justify-start"
                    onClick={() => handleSurahChange(surah.index)}
                  >
                    {surah.index}. {surah.title} ({surah.titleAr})
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>
        )}
        <div className={`${showSideNav ? "w-3/4" : "w-full"}`}>
          <div className="flex justify-between items-center mb-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowSideNav(!showSideNav)}
            >
              {showSideNav ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </Button>
            <h1 className="text-3xl font-bold">قارئ القرآن الكريم</h1>
            <div className="flex gap-x-2">
              <ModeToggle />
            </div>
          </div>
          <div className="flex flex-nowrap gap-4 mb-4">
            <Input
              type="text"
              placeholder="بحث ايات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow"
            />

            <Select value={qari} onValueChange={setQari}>
              <SelectTrigger className="">
                <SelectValue placeholder="اختر القارئ" />
              </SelectTrigger>

              <SelectContent>
                {" "}
                {qariOptions.map((option) => (
                  <SelectItem key={option.identifier} value={option.identifier}>
                    {option.name} | {option.language}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-x-2 mb-4">
            <span>حجم الخط:</span>
            <Slider
              min={12}
              max={32}
              step={1}
              value={[fontSize]}
              onValueChange={(value) => setFontSize(value[0])}
              className="w-48 h-12"
            />
          </div>
          {currentSurah && verses && translation && (
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <h4 className="flex items-center gap-x-2">
                    <span>
                      {currentSurah.title} ({currentSurah.titleAr})
                    </span>
                    <Button
                      variant="default" 
                      size="default"
                      onClick={() =>
                        toggleAudio(
                          `https://cdn.islamic.network/quran/audio-surah/128/${qari}/${parseInt(
                            currentSurah.index,
                            10
                          )}.mp3`
                        )
                      }
                    >
                      {isPlaying &&
                      currentAudio?.src.includes(
                        `${parseInt(currentSurah.index, 10)}`
                      ) ? (
                        <PauseCircle className="h-5 w-5" />
                      ) : (
                        <PlayCircle className="h-5 w-5" />
                      )}
                    </Button>
                  </h4>
                  <span className="text-sm font-normal">
                    {currentSurah.type} • {currentSurah.count} الآيات • الصفحة
                    في القرآن {currentSurah.pages}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="verses">
                  <TabsList>
                    <TabsTrigger value="info">تفاصيل السورة</TabsTrigger>
                    <TabsTrigger value="verses">الآيات</TabsTrigger>
                  </TabsList>
                  <TabsContent className="mb-4" value="verses">
                    {paginatedVerses.map(([key, verse]) => (
                      <div key={key} className="mb-6 pb-4 border-b">
                      
                        <p
                          className="text-xl mb-2"
                          style={{ fontSize: `${fontSize}px` }}
                          dir="rtl"
                        >
                          <span className="font-bold inline-flex items-center text-sm mx-1 gap-x-2">
                            [{key.split("_")[1]}
                             ۞]
                          </span>
                          {verse}
                        </p>
                        <p
                          className="inline-flex p-2 text-xs italic bg-yellow-50 dark:bg-yellow-900/50 leading-relaxed"
                          style={{ fontSize: `${fontSize - 6}px` }}
                        >
                          {translation.verse[key]}
                        </p>
                      </div>
                    ))}
                    <div className="flex justify-between items-center mt-4">
                      <Button
                        onClick={() =>
                          setCurrentPage((prev) => Math.max(prev - 1, 1))
                        }
                        disabled={currentPage === 1}
                      >
                        السابق
                      </Button>
                      <span>
                        الصفحة {currentPage} من {totalPages}
                      </span>
                      <Button
                        onClick={() =>
                          setCurrentPage((prev) =>
                            Math.min(prev + 1, totalPages)
                          )
                        }
                        disabled={currentPage === totalPages}
                      >
                        التالي
                      </Button>
                    </div>
                  </TabsContent>
                  <TabsContent value="info">
                    <div className="space-y-2">
                      <p>
                        <strong>مكان النزول:</strong> {currentSurah.place}
                      </p>
                      <p>
                        <strong>النوع:</strong> {currentSurah.type}
                      </p>
                      <p>
                        <strong>عدد الآيات:</strong> {currentSurah.count}
                      </p>
                      <p>
                        <strong>الاجزاء:</strong>
                      </p>
                      <ul className="list-disc list-inside">
                        {currentSurah.juz.map((juz) => (
                          <li key={juz.index}>
                            جزء {juz.index}: الآيات{" "}
                            {juz.verse.start.split("_")[1]} -{" "}
                            {juz.verse.end.split("_")[1]}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
