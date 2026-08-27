"use client";
import { useState, useEffect, useRef, createContext, useContext, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Menu, X, ChevronLeft, ChevronRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.defaults({ toggleActions: "play none none none" });

// ─── PALETTE ──────────────────────────────────────────────────────────────────
const C = {
  ivory: "#F5F0E8", ivoryDeep: "#F0EAE0",
  champagne: "#C9A84C", champagneDim: "rgba(201,168,76,0.18)",
  burgundy: "#5C1A2A", green: "#2C4A3E",
  stone: "#B8AD9E", stoneDim: "rgba(184,173,158,0.22)",
  charcoal: "#3A3A3A", dark: "#1A1714", deeper: "#0F0D0B",
  ruby: "#8B1A1A", rubyBright: "#C94040",
};

const IMG = {
  hero: "https://images.unsplash.com/photo-1696583536539-a37eb2e93080?w=2400&h=1400&fit=crop&auto=format",
  aerial: "https://images.unsplash.com/photo-1596695346787-be03f89b1cdd?w=2400&h=1300&fit=crop&auto=format",
  barrels: "https://images.unsplash.com/photo-1534655882117-f9eff36a1574?w=1400&h=900&fit=crop&auto=format",
  wineBarrels: "https://images.unsplash.com/photo-1608232385022-8ba61bec6c59?w=1400&h=900&fit=crop&auto=format",
  harvest: "https://images.unsplash.com/photo-1666014044085-0eada5d2c750?w=1400&h=900&fit=crop&auto=format",
  wineBottle: "https://images.unsplash.com/photo-1697115355209-46e7bce340fb?w=900&h=1400&fit=crop&auto=format",
  vineyardMist: "https://images.unsplash.com/photo-1760140014362-8f522354ae54?w=2400&h=1000&fit=crop&auto=format",
  vineyardRows: "https://images.unsplash.com/photo-1758315454860-f4696f8fc0a4?w=900&h=1400&fit=crop&auto=format",
  farmer: "https://images.unsplash.com/photo-1713593673489-3abf4784345a?w=900&h=1400&fit=crop&auto=format",
  pomegranateOpen: "https://images.unsplash.com/photo-1574709755254-fcd942d09d5a?w=900&h=1100&fit=crop&auto=format",
};

const serif = '"Playfair Display", Georgia, serif';
const sans = '"Inter", system-ui, sans-serif';

// ─── TRANSLATIONS ─────────────────────────────────────────────────────────────
export type Lang = "az" | "en" | "ru";

const LANG_DATA = {
  az: {
    nav: ["Torpaq", "Ev", "Brendlər", "Dünya", "Jurnal", "Gələcək"],
    coords: "41°24'ŞE · 49°51'SŞ — Şirvan Vadisi, Azərbaycan",
    heroH: ["Bir Torpaq.", "Çox Hekayə."],
    heroCta: "Dünyamızı Kəşf Edin",
    ch02Label: "Əsasımız",
    pillarNames: ["Təbiət", "Ustalıq", "İnnovasiya"],
    pillarDesc: [
      "Kür və Araz çaylarının suladığı münbit vadilərə bağlı — minilliklərlər boyu çiçəklənmiş qədim bağlar və üzümlüklər.",
      "Hər şüşə, hər pres, hər vintage — əsrlər boyu bu torpaqlara qulluq göstərmiş ailələrin nəsildən-nəslə ötürülmüş bilik yekunu.",
      "Ənənəyə hörmət göstərərək gələcəyi qucaqlayırıq — əsrlik üsulları müasir dəqiqliklə birləşdiririk.",
    ],
    pillarQuote: "\"Torpaq bizə səbr öyrədir. Elm bizə dəqiqlik verir. Birlikdə heç birinin tək edə bilməyəcəyini yaradırlar.\"",
    ch03Label: "AZGRANATA Evi",
    ch03H: ["Üç Dünya.", "Bir Baxış."],
    ch03Sub: "Hər kateqoriya üzərə sürün — AZGRANATA ailəsinin brendlərini kəşf edin.",
    ch04Label: "Brendlərimiz",
    ch04H: ["Məqsədlə", "Yaradılmış"],
    ch04Sub: "AZGRANATA ailəsinin hər brendi öz kimliyini, tarixini və dünyasını daşıyır — keyfiyyətə sarsılmaz bağlılıqla birləşmiş.",
    ch05Label: "Qlobal Varlıq",
    ch05H: ["Bir Torpaqdan", "Dünyaya"],
    ch05Sub: "AZGRANATA altı qitədə 40-dan çox ölkəyə çatır. Hər nar toxumu dünyada yeni bir yurdunu tapıb.",
    ch06Label: "Jurnal",
    jCats: ["Hamısı", "Məhsul Yığımı", "İnnovasiya", "Mükafatlar", "İnsanlar", "Tədbirlər", "İxrac"],
    jFeatCat: "Məhsul Yığımı — 12 dəq",
    jFeatTitle: ["Oktyabrın", "Son Günləri"],
    jFeatExcerpt: "Azərbaycanın ən məşhur üzüm bağçılığı mövsümünün son məhsul yığımı — ənənənin gözləntilərin ağırlığı ilə qarşılaşdığı yer.",
    jFeatDate: "Oktyabr 2024",
    jQuote: "Məhsul yığımı bir hadisə deyil. O, bütün ilin cəmidir.",
    jQuoteBy: "— Rauf Əliyev",
    ch07Label: "Davamlılıq",
    ch07H: ["Torpağa Qulluq", "Gələcək Nəsillər Üçün"],
    sustainLabels: ["Bərpa Enerjisi", "Su Qənaəti", "Üzvi Sertifikat", "Süni Qatqı"],
    sustainProse: [
      "istehsal müəssisələrimiz Qafqaz yaylasından alınan günəş və külək enerjisi ilə tam işləyir.",
      "Dəqiq damcılatma suvarma sistemi vasitəsilə su istehlakını azaltdıq — Kür çayı hövzəsini gələcək nəsillər üçün qoruyuruq.",
      "bağlarımız tam üzvi sertifikata malikdir. Sintetik pestisid yoxdur. Süni gübrə yoxdur. Yalnız təbiət və bilik.",
      "məhsul çeşidimiz boyunca süni qatqı yoxdur. Burada yetişən hər şey sap-safdır.",
    ],
    sustainPillars: ["Üzvi Əkinçilik", "Bərpa Enerjisi", "Su Qənaəti"],
    sustainPillarDesc: [
      "100% sertifikatlaşdırılmış. Sintetik daxiletmə yoxdur. Yalnız bilik, qulluq və torpağa hörmət.",
      "Qafqaz yaylasında qurduğumuz sahələrdən alınan günəş və külək enerjisi ilə müəssisələrimizin 94%-i işləyir.",
      "Dəqiq suvarma su istehlakını 40% azaldıb, Kür çayı hövzəsini gələcək nəsillər üçün qoruyur.",
    ],
    ch08Label: "İnsanlarımız",
    ch08H: ["Etiketin Arxasındakı", "Əllər"],
    personRoles: ["Baş Şərabçı", "Baş Aqronom", "İxrac Direktoru", "Baş Damıtma Ustası"],
    personQuotes: [
      "Şərab hər şeydən əvvəl səbr öyrədir.",
      "Torpaq hər qərarımızı xatırlayır.",
      "Seçdiyimiz hər tərəfdaş kim olduğumuzu göstərir.",
      "Distillasiya hər lazımsız şeyi çıxarma sənətidir.",
    ],
    finalH: [["Gəlin", "Gələcəyi", "Birlikdə"], ["Formalaşdıraq"]],
    finalSub: "Mənalı bir şey inşa edirik. Sizin bu işin bir parçası olmağınızı istərdik.",
    cta: "Mağazaları Tapın",
    tourLabel: "Şərabxana Turu",
    tourH: ["Şərabxanaya", "Tur Sifariş Edin"],
    tourSub: "AZGRANATA-nı içəridən kəşf edin — üzümlüklər, istehsal sahələri boyunca gəzin və mütəxəssislərimizin rəhbərliyi ilə ən gözəl şərablarımızı dequstasiya edin.",
    tourBook: "Tur Sifariş Et",
    tourFilters: ["Hamısı", "Turlar", "Dequstasiya", "Qastronomiya", "Ailə"],
    contactLabels: ["Baş Ofis", "İxrac Sorğuları", "Media və Mətbuat"],
    fTagline: "Azərbaycanın qədim torpaqlarında kök salmış mükəmməllik ənənəsi.",
    fCols: ["Şirkət", "Məhsullar", "Əlaqə"],
    fLinks: [
      ["Haqqımızda", "Tariximiz", "Rəhbərlik", "Karyera"],
      ["Şərab", "Spirt İçkiləri", "Üzvi", "Nar"],
      ["İxrac", "Mətbuat", "İnvestorlar", "Davamlılıq"],
    ],
    fCopy: "© 2024 AZGRANATA Holding. Bütün hüquqlar qorunur.",
    fLoc: "Azərbaycan · Bakı · 2004-cü ildən",
  },
  en: {
    nav: ["The Land", "The House", "The Brands", "The World", "The Journal", "The Future"],
    coords: "41°24'N · 49°51'E — Shirvan Valley, Azerbaijan",
    heroH: ["One Land.", "Many Stories."],
    heroCta: "Discover Our World",
    ch02Label: "Our Foundation",
    pillarNames: ["Nature", "Craftsmanship", "Innovation"],
    pillarDesc: [
      "Rooted in the fertile valleys where the Kura and Aras rivers nurture ancient orchards and vineyards that have flourished for millennia.",
      "Every bottle, every press, every vintage is the result of generations of knowledge passed through families who have tended these lands since antiquity.",
      "We honor tradition while embracing the future — combining centuries-old techniques with modern precision to create products of exceptional quality.",
    ],
    pillarQuote: "\"The land teaches us patience. Science gives us precision. Together, they make something neither could alone.\"",
    ch03Label: "The House of AZGRANATA",
    ch03H: ["Three Worlds.", "One Vision."],
    ch03Sub: "Hover any category to explore the full portfolio of brands within the AZGRANATA family.",
    ch04Label: "Our Brands",
    ch04H: ["Crafted", "with purpose"],
    ch04Sub: "Each brand within the AZGRANATA family carries its own identity, story, and world — united by an unwavering commitment to quality.",
    ch05Label: "Global Presence",
    ch05H: ["From One Land", "To the World"],
    ch05Sub: "AZGRANATA reaches over 40 countries across six continents. Each seed of our pomegranate has found its home in a new territory.",
    ch06Label: "Journal",
    jCats: ["All", "Harvest", "Innovation", "Awards", "People", "Events", "Export"],
    jFeatCat: "Harvest — 12 min read",
    jFeatTitle: ["The Last", "Days of October"],
    jFeatExcerpt: "Inside the final harvest of Azerbaijan's most celebrated vineyard season — where tradition meets the weight of expectation.",
    jFeatDate: "October 2024",
    jQuote: "The harvest is not an event. It is the sum of an entire year.",
    jQuoteBy: "— Rauf Aliyev",
    ch07Label: "Sustainability",
    ch07H: ["Tending the Earth", "for generations to come"],
    sustainLabels: ["Renewable Energy", "Water Conservation", "Certified Organic", "Artificial Additives"],
    sustainProse: [
      "of our production facilities now run entirely on solar and wind energy, sourced from fields across the Caucasus plateau.",
      "reduction in water consumption through precision drip irrigation — protecting the Kura River basin for generations to come.",
      "of our orchards carry full organic certification. No synthetic pesticides. No artificial fertilizers. Only nature and knowledge.",
      "artificial additives across the entire product range. What grows here stays pure from vine to vessel.",
    ],
    sustainPillars: ["Organic Farming", "Renewable Energy", "Water Conservation"],
    sustainPillarDesc: [
      "100% certified. No synthetic inputs. Only knowledge, care, and respect for the soil that feeds us.",
      "94% of our facilities powered by solar and wind energy from fields we built across the Caucasus plateau.",
      "Precision drip irrigation has reduced consumption by 40%, protecting the Kura River basin for future generations.",
    ],
    ch08Label: "Our People",
    ch08H: ["The Hands", "Behind the Label"],
    personRoles: ["Head Winemaker", "Chief Agronomist", "Export Director", "Master Distiller"],
    personQuotes: [
      "Wine teaches patience above everything else.",
      "The soil remembers every decision we make.",
      "Every partner we choose reflects who we are.",
      "Distillation is the art of removing everything unnecessary.",
    ],
    finalH: [["Let's", "Shape", "the"], ["Future Together"]],
    finalSub: "We are building something meaningful. We would like you to be part of it.",
    cta: "Find Shops",
    tourLabel: "Winery Experience",
    tourH: ["Book a Tour", "to the Winery"],
    tourSub: "Experience AZGRANATA from the inside — explore the vineyards, production facilities and taste our finest wines guided by our experts.",
    tourBook: "Book Tour",
    tourFilters: ["All", "Tours", "Tastings", "Gastronomy", "Family"],
    contactLabels: ["Headquarters", "Export Inquiries", "Media & Press"],
    fTagline: "A heritage of excellence rooted in the ancient lands of Azerbaijan.",
    fCols: ["Company", "Products", "Connect"],
    fLinks: [
      ["About", "Our Story", "Leadership", "Careers"],
      ["Wine", "Spirits", "Organic", "Pomegranate"],
      ["Export", "Press", "Investors", "Sustainability"],
    ],
    fCopy: "© 2024 AZGRANATA Holding. All rights reserved.",
    fLoc: "Azerbaijan · Baku · Est. 2004",
  },
  ru: {
    nav: ["Земля", "Дом", "Бренды", "Мир", "Журнал", "Будущее"],
    coords: "41°24'с.ш. · 49°51'в.д. — Ширванская долина, Азербайджан",
    heroH: ["Одна Земля.", "Много Историй."],
    heroCta: "Откройте Наш Мир",
    ch02Label: "Наш Фундамент",
    pillarNames: ["Природа", "Мастерство", "Инновации"],
    pillarDesc: [
      "Уходящие корнями в плодородные долины, где реки Кура и Аракс питают древние сады и виноградники, процветающие тысячелетиями.",
      "Каждая бутылка, каждый пресс, каждый урожай — результат многовековых знаний семей, хранящих эти земли с античных времён.",
      "Чтя традиции, мы смотрим в будущее — объединяя вековые техники с современной точностью для создания продуктов исключительного качества.",
    ],
    pillarQuote: "\"Земля учит нас терпению. Наука даёт точность. Вместе они создают то, что невозможно поодиночке.\"",
    ch03Label: "Дом AZGRANATA",
    ch03H: ["Три Мира.", "Одно Видение."],
    ch03Sub: "Наведите курсор на любую категорию, чтобы изучить полный портфель брендов семьи AZGRANATA.",
    ch04Label: "Наши Бренды",
    ch04H: ["Создано", "с умыслом"],
    ch04Sub: "Каждый бренд семьи AZGRANATA несёт свою идентичность, историю и мир — объединённый неизменной приверженностью качеству.",
    ch05Label: "Глобальное Присутствие",
    ch05H: ["Из Одной Земли", "— В Мир"],
    ch05Sub: "AZGRANATA присутствует в более чем 40 странах на шести континентах. Каждое зерно нашего граната нашло свой дом в новой территории.",
    ch06Label: "Журнал",
    jCats: ["Все", "Урожай", "Инновации", "Награды", "Люди", "События", "Экспорт"],
    jFeatCat: "Урожай — 12 мин",
    jFeatTitle: ["Последние", "Дни Октября"],
    jFeatExcerpt: "Внутри финального сбора урожая самого знаменитого виноградарского сезона Азербайджана — там, где традиции встречают груз ожиданий.",
    jFeatDate: "Октябрь 2024",
    jQuote: "Урожай — не событие. Это итог целого года.",
    jQuoteBy: "— Рауф Алиев",
    ch07Label: "Устойчивость",
    ch07H: ["Забота о земле", "для будущих поколений"],
    sustainLabels: ["Возобновляемая Энергия", "Экономия Воды", "Органическая Сертификация", "Искусственные Добавки"],
    sustainProse: [
      "наших производственных объектов работают полностью на солнечной и ветровой энергии с Кавказского плато.",
      "сокращение потребления воды через систему капельного орошения — защита бассейна реки Кура для будущих поколений.",
      "наших садов имеют полную органическую сертификацию. Без синтетических пестицидов. Без удобрений. Только природа и знания.",
      "искусственных добавок во всём ассортименте продукции. Всё, что здесь растёт, остаётся чистым.",
    ],
    sustainPillars: ["Органическое Земледелие", "Возобновляемая Энергия", "Экономия Воды"],
    sustainPillarDesc: [
      "100% сертифицировано. Никаких синтетических компонентов. Только знания, забота и уважение к земле.",
      "94% наших объектов работают на солнечной и ветровой энергии с плантаций на Кавказском плато.",
      "Точное капельное орошение снизило потребление воды на 40%, защищая бассейн реки Кура.",
    ],
    ch08Label: "Наши Люди",
    ch08H: ["Руки", "За Этикеткой"],
    personRoles: ["Главный Винодел", "Главный Агроном", "Директор по Экспорту", "Главный Дистиллятор"],
    personQuotes: [
      "Вино учит терпению прежде всего.",
      "Почва помнит каждое наше решение.",
      "Каждый партнёр, которого мы выбираем, отражает то, кто мы есть.",
      "Дистилляция — это искусство удаления всего лишнего.",
    ],
    finalH: [["Давайте", "Вместе", "Формировать"], ["Будущее"]],
    finalSub: "Мы создаём нечто значимое. Мы хотели бы, чтобы вы стали частью этого.",
    cta: "Найти Магазины",
    tourLabel: "Опыт Винодельни",
    tourH: ["Забронировать", "Тур на Винодельню"],
    tourSub: "Откройте для себя AZGRANATA изнутри — прогуляйтесь по виноградникам, производственным объектам и продегустируйте лучшие вина под руководством наших экспертов.",
    tourBook: "Забронировать",
    tourFilters: ["Все", "Туры", "Дегустации", "Гастрономия", "Семейные"],
    contactLabels: ["Штаб-квартира", "Экспортные Запросы", "Медиа и Пресса"],
    fTagline: "Наследие совершенства, уходящее корнями в древние земли Азербайджана.",
    fCols: ["Компания", "Продукты", "Связаться"],
    fLinks: [
      ["О нас", "История", "Руководство", "Карьера"],
      ["Вино", "Крепкие напитки", "Органика", "Гранат"],
      ["Экспорт", "Пресса", "Инвесторам", "Устойчивость"],
    ],
    fCopy: "© 2024 AZGRANATA Holding. Все права защищены.",
    fLoc: "Азербайджан · Баку · Осн. 2004",
  },
} as const;

type LangKey = keyof typeof LANG_DATA;
type LangData = typeof LANG_DATA.en;

// ─── LANGUAGE CONTEXT ─────────────────────────────────────────────────────────
const LangCtx = createContext<{ lang: LangKey; setLang: (l: LangKey) => void; d: LangData }>({
  lang: "az", setLang: () => {}, d: LANG_DATA.az as unknown as LangData,
});

function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangRaw] = useState<LangKey>("az");
  const setLang = useCallback((l: LangKey) => setLangRaw(l), []);
  return <LangCtx.Provider value={{ lang, setLang, d: LANG_DATA[lang] as unknown as LangData }}>{children}</LangCtx.Provider>;
}
function useLang() { return useContext(LangCtx); }

// Animated text swap — fades out old, fades in new text on language change
function Tx({ v, tag = "span", style, className }: { v: string; tag?: "span" | "div" | "p"; style?: React.CSSProperties; className?: string }) {
  const [cur, setCur] = useState(v);
  const [vis, setVis] = useState(true);
  useEffect(() => {
    if (v === cur) return;
    setVis(false);
    const t = setTimeout(() => { setCur(v); setVis(true); }, 190);
    return () => clearTimeout(t);
  }, [v, cur]);
  const Tag = tag as "span";
  return (
    <Tag className={className} style={{ ...style, opacity: vis ? 1 : 0, transition: "opacity 0.19s ease", display: style?.display ?? (tag === "span" ? "inline-block" : "block") }}>
      {cur}
    </Tag>
  );
}

// ─── RESPONSIVE HOOKS ─────────────────────────────────────────────────────────
function useBreakpoint() {
  const [w, setW] = useState(() => typeof window !== "undefined" ? window.innerWidth : 1440);
  useEffect(() => {
    const fn = () => setW(window.innerWidth);
    window.addEventListener("resize", fn, { passive: true });
    return () => window.removeEventListener("resize", fn);
  }, []);
  return { w, isMobile: w < 640, isTablet: w >= 640 && w < 1024, isDesktop: w >= 1024 };
}

function useReducedMotion() {
  const [rm, setRm] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setRm(mq.matches);
    const fn = () => setRm(mq.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);
  return rm;
}

// ─── GSAP HOOKS ───────────────────────────────────────────────────────────────
function useClipReveal(ref: React.RefObject<HTMLElement | null>, { delay = 0, start = "top 88%", duration = 1.4 } = {}) {
  const rm = useReducedMotion();
  const { isMobile } = useBreakpoint();
  useEffect(() => {
    const el = ref.current; if (!el) return;
    if (rm) { gsap.set(el, { clipPath: "inset(0% 0% 0% 0%)" }); return; }
    const d = isMobile ? duration * 0.7 : duration;
    const ctx = gsap.context(() => {
      gsap.fromTo(el, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: d, delay, ease: "expo.out", scrollTrigger: { trigger: el, start } });
    });
    return () => ctx.revert();
  }, [isMobile, rm]); // eslint-disable-line react-hooks/exhaustive-deps
}

function useParallax(ref: React.RefObject<HTMLElement | null>, { yPercent = 18 } = {}) {
  const { isMobile, isTablet } = useBreakpoint();
  useEffect(() => {
    const el = ref.current; if (!el) return;
    if (isMobile) return; // skip parallax on mobile for performance
    const y = isTablet ? yPercent * 0.5 : yPercent;
    const ctx = gsap.context(() => {
      gsap.to(el, { yPercent: y, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 1.8 } });
    });
    return () => ctx.revert();
  }, [isMobile, isTablet]); // eslint-disable-line react-hooks/exhaustive-deps
}

function useCounter(ref: React.RefObject<HTMLElement | null>, end: number, { suffix = "", duration = 2.4, start = "top 82%" } = {}) {
  const rm = useReducedMotion();
  useEffect(() => {
    const el = ref.current; if (!el) return;
    if (rm) { el.textContent = `${end}${suffix}`; return; }
    const ctx = gsap.context(() => {
      const p = { val: 0 };
      gsap.to(p, { val: end, duration, ease: "expo.out", scrollTrigger: { trigger: el, start }, onUpdate() { if (el) el.textContent = `${Math.round(p.val)}${suffix}`; } });
    });
    return () => ctx.revert();
  }, [end]); // eslint-disable-line react-hooks/exhaustive-deps
}

function useWordReveal(containerRef: React.RefObject<HTMLElement | null>, { start = "top 90%", stagger = 0.09, delay = 0 } = {}) {
  const rm = useReducedMotion();
  useEffect(() => {
    const container = containerRef.current; if (!container) return;
    if (rm) { container.querySelectorAll(".gw").forEach((el) => gsap.set(el, { opacity: 1, yPercent: 0 })); return; }
    const ctx = gsap.context(() => {
      const words = container.querySelectorAll(".gw"); if (!words.length) return;
      gsap.fromTo(words, { yPercent: 108, opacity: 0 }, { yPercent: 0, opacity: 1, stagger, delay, duration: 1.15, ease: "expo.out", scrollTrigger: { trigger: container, start } });
    }, container);
    return () => ctx.revert();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
}

function useLineDraw(ref: React.RefObject<HTMLElement | null>, { start = "top 90%", delay = 0 } = {}) {
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(el, { scaleX: 0 }, { scaleX: 1, duration: 0.9, delay, ease: "expo.out", transformOrigin: "left", scrollTrigger: { trigger: el, start } });
    });
    return () => ctx.revert();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
}

function useLabelReveal(sectionRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const section = sectionRef.current; if (!section) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(section.querySelectorAll(".cn, .ct"), { opacity: 0, y: 6 }, { opacity: 1, y: 0, stagger: 0.15, duration: 0.9, ease: "expo.out", scrollTrigger: { trigger: section, start: "top 88%" } });
    }, section);
    return () => ctx.revert();
  }, []);
}

function Reveal({ children, delay = 0, y = 32 }: { children: React.ReactNode; delay?: number; y?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const rm = useReducedMotion();
  useEffect(() => {
    const el = ref.current; if (!el) return;
    if (rm) { gsap.set(el, { opacity: 1, y: 0 }); return; }
    const ctx = gsap.context(() => {
      gsap.fromTo(el, { opacity: 0, y }, { opacity: 1, y: 0, duration: 1.3, delay, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 90%" } });
    });
    return () => ctx.revert();
  }, [delay, y, rm]);
  return <div ref={ref} style={{ opacity: 0 }}>{children}</div>;
}

// ─── UTILITY COMPONENTS ───────────────────────────────────────────────────────
function Grain({ opacity = 0.04 }: { opacity?: number }) {
  return (
    <div aria-hidden style={{
      position: "absolute", inset: 0, pointerEvents: "none", zIndex: 2,
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      backgroundSize: "180px", opacity, mixBlendMode: "overlay" as React.CSSProperties["mixBlendMode"],
    }} />
  );
}

function Caption({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "16px", fontFamily: sans, fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase" as const, color: light ? "rgba(245,240,232,0.4)" : "rgba(184,173,158,0.6)", fontWeight: 300 }}>
      <span style={{ width: "18px", height: "1px", backgroundColor: "currentColor", display: "inline-block", opacity: 0.7, flexShrink: 0 }} />
      {children}
    </div>
  );
}

function Hairline({ margin = "0 52px" }: { margin?: string }) {
  return <div style={{ margin, height: "1px", backgroundColor: C.stoneDim }} />;
}

function ChapterLabel({ number, title, light = false }: { number: string; title: string; light?: boolean }) {
  const lineRef = useRef<HTMLSpanElement>(null);
  useLineDraw(lineRef, { delay: 0.2 });
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "clamp(56px, 6vw, 88px)" }}>
      <span className="cn" style={{ fontFamily: sans, fontSize: "10px", letterSpacing: "0.32em", color: C.champagne, fontWeight: 300, opacity: 0 }}>{number}</span>
      <span ref={lineRef} style={{ width: "48px", height: "1px", backgroundColor: C.champagne, display: "inline-block", transform: "scaleX(0)", transformOrigin: "left", opacity: 0.45 }} />
      <span className="ct" style={{ fontFamily: sans, fontSize: "9px", letterSpacing: "0.28em", color: light ? "rgba(245,240,232,0.4)" : C.stone, fontWeight: 300, textTransform: "uppercase" as const, opacity: 0 }}>{title}</span>
    </div>
  );
}

// ─── GLOBAL RESPONSIVE STYLES ─────────────────────────────────────────────────
const GLOBAL_CSS = `
  *, *::before, *::after { box-sizing: border-box; }
  html { -webkit-font-smoothing: antialiased; text-rendering: optimizeLegibility; }
  body { overflow-x: hidden; }
  img { display: block; max-width: 100%; }

  /* Breakpoint utility classes */
  .hide-mobile { }
  .hide-tablet { }
  .show-mobile { display: none !important; }

  @media (max-width: 639px) {
    .hide-mobile { display: none !important; }
    .show-mobile { display: block !important; }
  }
  @media (min-width: 640px) and (max-width: 1023px) {
    .hide-tablet { display: none !important; }
  }

  /* Foundation grid responsive */
  .foundation-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 2px; }
  @media (max-width: 1023px) { .foundation-grid { grid-template-columns: 1fr 1fr; } }
  @media (max-width: 639px) { .foundation-grid { grid-template-columns: 1fr; } .foundation-grid > div { border-left: none !important; padding-left: 0 !important; padding-top: 56px !important; border-top: 1px solid rgba(184,173,158,0.22); } .foundation-grid > div:first-child { border-top: none; padding-top: 0 !important; } }

  /* House header responsive */
  .house-header { display: grid; grid-template-columns: 72px 1fr 1fr auto; }
  @media (max-width: 1023px) { .house-header { grid-template-columns: 56px 1fr auto; } .house-header > div:nth-child(3) { display: none; } }
  @media (max-width: 639px) { .house-header { grid-template-columns: 40px 1fr auto; gap: 16px !important; padding: 28px 20px !important; } }

  /* Brand card responsive */
  @media (max-width: 767px) { .brand-card-inner { grid-template-columns: 1fr !important; height: auto !important; } .brand-card-inner > div:first-child { height: 300px; } }

  /* Global header responsive */
  .global-header { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; }
  @media (max-width: 767px) { .global-header { grid-template-columns: 1fr; gap: 32px; } }
  .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); }
  @media (max-width: 767px) { .stats-grid { grid-template-columns: repeat(2, 1fr); } }

  /* Journal responsive */
  .j-top { display: grid; grid-template-columns: 62% 38%; gap: 2px; }
  .j-bottom { display: grid; grid-template-columns: 42% 16% 42%; gap: 2px; }
  @media (max-width: 1023px) { .j-top { grid-template-columns: 1fr; } .j-bottom { grid-template-columns: 1fr; } .j-bottom .j-card { opacity: 1 !important; } }
  @media (max-width: 639px) { .j-top { grid-template-columns: 1fr; } }

  /* Sustainability responsive */
  .s-row { display: grid; grid-template-columns: 240px 1fr; }
  @media (max-width: 639px) { .s-row { grid-template-columns: 1fr; padding: 40px 0 !important; } }
  .s-cols { display: grid; grid-template-columns: repeat(3, 1fr); gap: 56px; }
  @media (max-width: 1023px) { .s-cols { grid-template-columns: 1fr 1fr; gap: 40px; } }
  @media (max-width: 639px) { .s-cols { grid-template-columns: 1fr; gap: 36px; } }

  /* People responsive */
  .p-row { display: flex; gap: 24px; align-items: flex-start; }
  @media (max-width: 767px) { .p-row { flex-direction: column; } .p-row > div { flex: none !important; width: 100% !important; margin-top: 0 !important; } }

  /* Contact responsive */
  .c-grid { display: grid; grid-template-columns: repeat(3, 1fr); }
  @media (max-width: 767px) { .c-grid { grid-template-columns: 1fr; gap: 40px; } .c-col { border-right: none !important; padding-left: 0 !important; } }

  /* Footer responsive */
  .f-top { display: flex; justify-content: space-between; align-items: flex-start; gap: 64px; flex-wrap: wrap; }
  .f-cols-grid { display: grid; grid-template-columns: repeat(3, 148px); gap: 56px; }
  @media (max-width: 767px) { .f-cols-grid { grid-template-columns: repeat(2, 1fr); gap: 36px; } }
  @media (max-width: 479px) { .f-cols-grid { grid-template-columns: 1fr 1fr; } }

  /* Smooth scrollbar hide */
  .house-scroll::-webkit-scrollbar, .brand-scroll::-webkit-scrollbar { display: none; }
  .house-scroll, .brand-scroll { -ms-overflow-style: none; scrollbar-width: none; }

  /* Nav padding responsive */
  .nav-inner { padding: 0 52px; }
  @media (max-width: 1023px) { .nav-inner { padding: 0 32px; } }
  @media (max-width: 639px) { .nav-inner { padding: 0 20px; } }

  /* Section padding responsive */
  .sec-pad { padding: 200px 52px; }
  @media (max-width: 1023px) { .sec-pad { padding: 120px 32px; } }
  @media (max-width: 639px) { .sec-pad { padding: 80px 20px; } }

  .sec-pad-v { padding-top: 200px; padding-bottom: 200px; }
  @media (max-width: 1023px) { .sec-pad-v { padding-top: 120px; padding-bottom: 120px; } }
  @media (max-width: 639px) { .sec-pad-v { padding-top: 80px; padding-bottom: 80px; } }

  .sec-px { padding-left: 52px; padding-right: 52px; }
  @media (max-width: 1023px) { .sec-px { padding-left: 32px; padding-right: 32px; } }
  @media (max-width: 639px) { .sec-px { padding-left: 20px; padding-right: 20px; } }

  /* Hero text responsive */
  .hero-pad { padding: 0 52px 100px; }
  @media (max-width: 1023px) { .hero-pad { padding: 0 32px 80px; } }
  @media (max-width: 639px) { .hero-pad { padding: 0 20px 64px; } }

  /* Images */
  @media (max-width: 639px) {
    .foundation-img-1 { height: 300px !important; }
    .foundation-img-2 { height: 260px !important; }
  }

  /* People grid */
  @media (max-width: 639px) { .people-grid-row { gap: 16px !important; margin-bottom: 16px !important; } }

  /* Tour grid responsive */
  .tour-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
  @media (max-width: 1199px) { .tour-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 639px) { .tour-grid { grid-template-columns: 1fr; gap: 20px; } }
`;

// ─── PRELOADER ────────────────────────────────────────────────────────────────
function Preloader({ onComplete }: { onComplete: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    document.body.style.overflow = "hidden";
    const ctx = gsap.context(() => {
      gsap.timeline({
        defaults: { ease: "expo.out" },
        onComplete: () => { document.body.style.overflow = ""; ScrollTrigger.refresh(); onComplete(); },
      })
        .fromTo(".pre-char", { yPercent: 120, opacity: 0 }, { yPercent: 0, opacity: 1, stagger: 0.034, duration: 0.9 }, 0.15)
        .fromTo(".pre-rule", { scaleX: 0 }, { scaleX: 1, duration: 0.7, transformOrigin: "left" }, 0.88)
        .fromTo(".pre-sub", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.55 }, 1.1)
        .to({}, { duration: 0.9 })
        .to(".pre-curtain", { yPercent: -100, duration: 1.15, ease: "expo.inOut" });
    }, el);
    return () => { ctx.revert(); document.body.style.overflow = ""; };
  }, [onComplete]);

  return (
    <div ref={ref} style={{ position: "fixed", inset: 0, zIndex: 9999, pointerEvents: "none" }}>
      <div className="pre-curtain" style={{ position: "absolute", inset: 0, backgroundColor: C.deeper, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <div style={{ overflow: "hidden" }}>
          <div style={{ display: "flex", alignItems: "baseline" }}>
            {"AZGRANATA".split("").map((ch, i) => (
              <span key={i} className="pre-char" style={{ fontFamily: serif, fontWeight: 400, fontSize: "clamp(20px, 3.5vw, 40px)", letterSpacing: "0.2em", color: C.ivory, display: "inline-block", opacity: 0 }}>{ch}</span>
            ))}
          </div>
        </div>
        <div className="pre-rule" style={{ width: "52px", height: "1px", backgroundColor: C.champagne, margin: "22px 0 18px", transform: "scaleX(0)" }} />
        <div className="pre-sub" style={{ fontFamily: sans, fontSize: "9px", letterSpacing: "0.34em", color: C.stone, textTransform: "uppercase", opacity: 0, fontWeight: 300 }}>Azerbaijan · Est. 2004</div>
      </div>
    </div>
  );
}

// ─── LANGUAGE SWITCHER ────────────────────────────────────────────────────────
function LangSwitcher({ light = false }: { light?: boolean }) {
  const { lang, setLang } = useLang();
  const langs: LangKey[] = ["az", "en", "ru"];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0" }}>
      {langs.map((l, i) => (
        <span key={l} style={{ display: "flex", alignItems: "center" }}>
          <button
            onClick={() => setLang(l)}
            style={{
              fontFamily: sans, fontSize: "9px", letterSpacing: "0.18em", fontWeight: 300,
              color: l === lang
                ? (light ? C.champagne : C.champagne)
                : (light ? "rgba(255,255,255,0.38)" : C.stone),
              background: "none", border: "none", cursor: "pointer", padding: "2px 0",
              textTransform: "uppercase",
              transition: "color 0.3s ease",
              position: "relative",
            }}
            onMouseEnter={(e) => { if (l !== lang) gsap.to(e.currentTarget, { color: light ? "rgba(255,255,255,0.65)" : C.charcoal, duration: 0.25 }); }}
            onMouseLeave={(e) => { if (l !== lang) gsap.to(e.currentTarget, { color: light ? "rgba(255,255,255,0.38)" : C.stone, duration: 0.3 }); }}
          >
            {l.toUpperCase()}
          </button>
          {i < langs.length - 1 && (
            <span style={{ fontFamily: sans, fontSize: "9px", color: light ? "rgba(255,255,255,0.2)" : "rgba(184,173,158,0.3)", margin: "0 6px", userSelect: "none" }}>·</span>
          )}
        </span>
      ))}
    </div>
  );
}

// ─── NAV ──────────────────────────────────────────────────────────────────────
const NAV_SECTION_IDS = ["hero", "house", "brands", "global", "journal", "final"];

function Nav() {
  const { d, lang, setLang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const { isMobile } = useBreakpoint();

  const scrollToSection = (idx: number) => {
    const id = NAV_SECTION_IDS[idx];
    const el = document.getElementById(id);
    if (!el) return;
    const navH = isMobile ? 56 : 68;
    const top = el.getBoundingClientRect().top + window.scrollY - navH;
    window.scrollTo({ top, behavior: "smooth" });
  };

  useEffect(() => {
    if (navRef.current) gsap.fromTo(navRef.current, { opacity: 0 }, { opacity: 1, duration: 0.9, delay: 0.3, ease: "expo.out" });
    let lastY = 0;
    const fn = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      if (isMobile && navRef.current) {
        navRef.current.style.transform = y > lastY && y > 100 ? "translateY(-100%)" : "translateY(0)";
      }
      // Track active section
      let cur = 0;
      NAV_SECTION_IDS.forEach((id, i) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) cur = i;
      });
      setActiveIdx(cur);
      lastY = y;
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, [isMobile]);

  // Animate mobile menu open/close
  useEffect(() => {
    const el = menuRef.current; if (!el) return;
    if (menuOpen) {
      gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "expo.out" });
      gsap.fromTo(el.querySelectorAll(".menu-item"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.06, duration: 0.65, delay: 0.1, ease: "expo.out" });
    }
  }, [menuOpen]);

  const bgColor = scrolled ? "rgba(245,240,232,0.96)" : "transparent";
  const blur = scrolled ? "blur(24px)" : "none";
  const textColor = scrolled ? C.dark : "#fff";

  return (
    <>
      <nav ref={navRef} style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        height: isMobile ? "56px" : "68px",
        backgroundColor: bgColor, backdropFilter: blur,
        borderBottom: scrolled ? `1px solid ${C.stoneDim}` : "none",
        transition: "background-color 0.7s, backdrop-filter 0.7s, border-color 0.7s, transform 0.4s ease",
        opacity: 0,
      }}>
        <div className="nav-inner" style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Logo */}
          <div style={{ fontFamily: serif, fontSize: isMobile ? "13px" : "15px", fontWeight: 400, letterSpacing: "0.22em", color: textColor, transition: "color 0.6s" }}>
            AZGRANATA
          </div>

          {/* Desktop nav links + lang */}
          <div className="hide-mobile" style={{ display: "flex", alignItems: "center", gap: "40px" }}>
            {d.nav.map((link, i) => {
              const isActive = i === activeIdx;
              const colorNormal = scrolled ? (isActive ? "#7A1E2C" : C.charcoal) : (isActive ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.78)");
              return (
                <button key={link}
                  onClick={() => scrollToSection(i)}
                  style={{ fontFamily: sans, fontSize: "9px", letterSpacing: "0.18em", fontWeight: isActive ? 400 : 300, color: colorNormal, textTransform: "uppercase", background: "none", border: "none", cursor: "pointer", padding: "4px 0", transition: "color 0.3s" }}
                  onMouseEnter={(e) => gsap.to(e.currentTarget, { color: scrolled ? "#7A1E2C" : "#fff", duration: 0.25, ease: "power2.inOut" })}
                  onMouseLeave={(e) => gsap.to(e.currentTarget, { color: colorNormal, duration: 0.3, ease: "power2.inOut" })}>
                  {link}
                </button>
              );
            })}
            {/* Language switcher — desktop */}
            <div style={{ width: "1px", height: "14px", backgroundColor: scrolled ? C.stoneDim : "rgba(255,255,255,0.18)" }} />
            <LangSwitcher light={!scrolled} />
          </div>

          {/* Mobile: lang + hamburger */}
          <div className="show-mobile" style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <LangSwitcher light={!scrolled} />
            <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", cursor: "pointer", color: textColor, padding: 0, display: "flex", alignItems: "center" }}>
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>

          {/* Tablet hamburger */}
          <button className="hide-mobile show-tablet-menu" onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", cursor: "pointer", color: textColor, padding: 0, display: "none" }}>
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile / tablet fullscreen menu overlay */}
      {menuOpen && (
        <div ref={menuRef} style={{ position: "fixed", inset: 0, zIndex: 99, backgroundColor: C.dark, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 32px 48px" }}>
          <button onClick={() => setMenuOpen(false)} style={{ position: "absolute", top: isMobile ? "16px" : "20px", right: isMobile ? "20px" : "32px", background: "none", border: "none", cursor: "pointer", color: C.stone, padding: "8px" }}>
            <X size={20} />
          </button>
          <div style={{ position: "absolute", top: isMobile ? "16px" : "20px", left: isMobile ? "20px" : "32px", fontFamily: serif, fontSize: "13px", fontWeight: 400, letterSpacing: "0.2em", color: "rgba(245,240,232,0.25)" }}>
            AZGRANATA
          </div>

          {/* Nav links */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", width: "100%", maxWidth: "400px" }}>
            {d.nav.map((link, i) => (
              <button key={`${link}-${i}`} className="menu-item" onClick={() => { setMenuOpen(false); setTimeout(() => scrollToSection(i), 120); }}
                style={{ fontFamily: serif, fontSize: "clamp(24px, 5vw, 36px)", fontWeight: 400, color: C.ivory, background: "none", border: "none", cursor: "pointer", padding: "10px 0", letterSpacing: "-0.01em", opacity: 0, textAlign: "center", width: "100%" }}>
                {link}
              </button>
            ))}
          </div>

          {/* Language switcher in menu */}
          <div className="menu-item" style={{ position: "absolute", bottom: "48px", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", opacity: 0 }}>
            <div style={{ display: "flex", gap: "24px" }}>
              {(["az", "en", "ru"] as LangKey[]).map((l) => {
                return (
                  <button key={l} onClick={() => setLang(l)}
                    style={{ fontFamily: sans, fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: l === lang ? C.champagne : "rgba(184,173,158,0.4)", background: "none", border: "none", cursor: "pointer", fontWeight: 300, padding: "4px 0", borderBottom: l === lang ? `1px solid ${C.champagne}` : "1px solid transparent", transition: "color 0.3s, border-color 0.3s" }}>
                    {l.toUpperCase()}
                  </button>
                );
              })}
            </div>
            <div style={{ fontFamily: sans, fontSize: "9px", letterSpacing: "0.24em", color: "rgba(184,173,158,0.3)", textTransform: "uppercase" }}>41°24'N · 49°51'E</div>
          </div>
        </div>
      )}

      <style>{`.show-tablet-menu { display: none !important; } @media (max-width: 1023px) and (min-width: 640px) { .hide-mobile { display: none !important; } .show-tablet-menu { display: flex !important; } }`}</style>
    </>
  );
}

// ─── CHAPTER 01: THE LAND ─────────────────────────────────────────────────────
function HeroSection() {
  const { d } = useLang();
  const { scrollY } = useScroll();
  const { isMobile } = useBreakpoint();
  const imgY = useTransform(scrollY, [0, 900], ["0%", isMobile ? "12%" : "28%"]);
  const textOpacity = useTransform(scrollY, [0, 480], [1, 0]);
  const textY = useTransform(scrollY, [0, 480], ["0%", isMobile ? "-6%" : "-14%"]);
  const sectionRef = useRef<HTMLElement>(null);
  const rm = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current; if (!section) return;
    if (rm) {
      section.querySelectorAll(".hero-coords,.hero-cta-text,.hero-scroll-wrap,.hero-word .gw").forEach((el) => gsap.set(el, { opacity: 1, yPercent: 0, y: 0, width: "auto" }));
      return;
    }
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.fromTo(".hero-coords", { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 1.2 }, 0.3)
        .fromTo(".hero-word .gw", { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, stagger: 0.11, duration: 1.5 }, 0.5)
        .fromTo(".hero-cta-text", { opacity: 0 }, { opacity: 1, duration: 0.9 }, 1.5)
        .fromTo(".hero-cta-line", { width: "0px" }, { width: "52px", duration: 0.85 }, 1.75)
        .fromTo(".hero-scroll-wrap", { opacity: 0 }, { opacity: 1, duration: 1 }, 2.4);
      gsap.to(".hero-scroll-pulse", { scaleY: 0.2, yoyo: true, repeat: -1, duration: 1.25, ease: "sine.inOut", transformOrigin: "top" });
    }, section);
    return () => ctx.revert();
  }, [rm]);

  return (
    <section ref={sectionRef} id="hero" style={{ position: "relative", height: "100svh", overflow: "hidden" }}>
      <motion.div style={{ position: "absolute", inset: 0, y: imgY, scale: 1.1 }}>
        <img src={IMG.hero} alt="AZGRANATA estate vineyards at golden hour, Shirvan Valley, Azerbaijan"
          loading="eager" decoding="async"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 35%" }} />
        <Grain opacity={0.03} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.22)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0.10) 40%, rgba(10,8,6,0.75) 100%)" }} />
      </motion.div>

      <motion.div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end", opacity: textOpacity, y: textY }} className="hero-pad">
        <Tx v={d.coords} style={{ fontFamily: sans, fontSize: "9px", letterSpacing: "0.3em", color: "rgba(201,168,76,0.7)", textTransform: "uppercase", marginBottom: "28px", fontWeight: 300 }} className="hero-coords" />

        <h1 aria-label={d.heroH.join(" ")} style={{ fontFamily: serif, fontSize: "clamp(52px, 13vw, 168px)", fontWeight: 400, lineHeight: 0.88, color: "#fff", letterSpacing: "-0.03em", marginBottom: "clamp(32px, 4vw, 52px)", maxWidth: "1000px" }}>
          {d.heroH.map((line, li) => (
            <span key={`${line}-${li}`} style={{ display: "block" }}>
              {line.split(" ").map((word, wi, arr) => (
                <span key={wi} className="hero-word" style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom", paddingBottom: "0.04em", marginRight: wi < arr.length - 1 ? "0.35em" : 0 }}>
                  <span className="gw" style={{ display: "inline-block" }}>{word}</span>
                </span>
              ))}
            </span>
          ))}
        </h1>

        <div style={{ display: "flex", alignItems: "center" }}>
          <Tx v={d.heroCta} style={{ fontFamily: sans, fontSize: "9px", letterSpacing: "0.28em", color: "rgba(255,255,255,0.7)", textTransform: "uppercase", fontWeight: 300, marginRight: "20px" }} className="hero-cta-text" />
          <span className="hero-cta-line" style={{ height: "1px", backgroundColor: C.champagne, display: "inline-block", width: "0px" }} />
        </div>
      </motion.div>

      {!isMobile && (
        <div className="hero-scroll-wrap" style={{ position: "absolute", bottom: "40px", right: "52px", display: "flex", flexDirection: "column", alignItems: "center", gap: "14px", opacity: 0 }}>
          <span style={{ fontFamily: sans, fontSize: "8px", letterSpacing: "0.32em", color: "rgba(255,255,255,0.32)", textTransform: "uppercase", writingMode: "vertical-rl" as const, fontWeight: 300 }}>Scroll</span>
          <span className="hero-scroll-pulse" style={{ width: "1px", height: "52px", backgroundColor: "rgba(255,255,255,0.2)", display: "block" }} />
        </div>
      )}
    </section>
  );
}

// ─── CHAPTER 02: OUR FOUNDATION ──────────────────────────────────────────────
function FoundationSection() {
  const { d } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const imgNRef = useRef<HTMLDivElement>(null);
  const imgCRef = useRef<HTMLDivElement>(null);
  const imgIRef = useRef<HTMLDivElement>(null);
  const imgNImg = useRef<HTMLImageElement>(null);
  const imgCImg = useRef<HTMLImageElement>(null);
  const imgIImg = useRef<HTMLImageElement>(null);
  useClipReveal(imgNRef, { start: "top 85%" });
  useClipReveal(imgCRef, { delay: 0.15, start: "top 85%" });
  useClipReveal(imgIRef, { delay: 0.3, start: "top 85%" });
  useParallax(imgNImg, { yPercent: 12 });
  useParallax(imgCImg, { yPercent: 10 });
  useParallax(imgIImg, { yPercent: 10 });
  useLabelReveal(sectionRef);
  useEffect(() => {
    const s = sectionRef.current; if (!s) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(s.querySelectorAll(".f-t"), { opacity: 0, y: 24 }, { opacity: 1, y: 0, stagger: 0.18, duration: 1.1, ease: "expo.out", scrollTrigger: { trigger: s, start: "top 72%" } });
      gsap.fromTo(s.querySelectorAll(".f-b"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, stagger: 0.18, duration: 1.0, delay: 0.2, ease: "expo.out", scrollTrigger: { trigger: s, start: "top 68%" } });
    }, s);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="foundation" className="sec-pad" style={{ backgroundColor: C.ivory }}>
      <ChapterLabel number="02" title={d.ch02Label} />
      <div className="foundation-grid">
        {/* Nature */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div ref={imgNRef} className="foundation-img-1" style={{ position: "relative", overflow: "hidden", height: "640px", backgroundColor: C.stone }}>
            <img ref={imgNImg} src="https://images.unsplash.com/photo-1761489179799-c8ecad6ec719?w=2400&h=1400&fit=crop&auto=format" alt="Vineyard rows at golden hour, Shirvan Valley" loading="lazy" decoding="async" style={{ width: "100%", height: "115%", objectFit: "cover", objectPosition: "center 40%" }} />
            <Grain opacity={0.035} />
          </div>
          <Caption>Kura River Valley · Shirvan, Azerbaijan</Caption>
          <div style={{ marginTop: "40px" }}>
            <Tx v={d.pillarNames[0]} tag="div" className="f-t" style={{ fontFamily: serif, fontSize: "clamp(32px, 4vw, 56px)", fontWeight: 400, color: C.dark, lineHeight: 1.0, letterSpacing: "-0.02em", marginBottom: "24px" }} />
            <Tx v={d.pillarDesc[0]} tag="p" className="f-b" style={{ fontFamily: sans, fontSize: "14px", lineHeight: 2.0, color: C.charcoal, maxWidth: "360px", fontWeight: 300 }} />
          </div>
        </div>

        {/* Craftsmanship */}
        <div style={{ display: "flex", flexDirection: "column", paddingTop: "clamp(0px, 6vw, 80px)", borderLeft: `1px solid ${C.stoneDim}`, paddingLeft: "clamp(20px, 3vw, 40px)" }}>
          <div ref={imgCRef} className="foundation-img-2" style={{ position: "relative", overflow: "hidden", height: "400px", backgroundColor: C.stone, marginBottom: "40px" }}>
            <img ref={imgCImg} src="https://images.unsplash.com/photo-1561906814-23da9a8bfee0?w=1400&h=900&fit=crop&auto=format" alt="Oak barrels aging in AZGRANATA estate cellar" loading="lazy" decoding="async" style={{ width: "100%", height: "115%", objectFit: "cover", objectPosition: "center 40%" }} />
            <Grain opacity={0.04} />
          </div>
          <Caption>Estate cellar · Ganja, Azerbaijan</Caption>
          <div style={{ marginTop: "40px" }}>
            <Tx v={d.pillarNames[1]} tag="div" className="f-t" style={{ fontFamily: serif, fontSize: "clamp(32px, 4vw, 56px)", fontWeight: 400, color: C.dark, lineHeight: 1.0, letterSpacing: "-0.02em", marginBottom: "24px" }} />
            <Tx v={d.pillarDesc[1]} tag="p" className="f-b" style={{ fontFamily: sans, fontSize: "14px", lineHeight: 2.0, color: C.charcoal, fontWeight: 300 }} />
          </div>
        </div>

        {/* Innovation */}
        <div style={{ display: "flex", flexDirection: "column", paddingTop: "clamp(0px, 10vw, 200px)", borderLeft: `1px solid ${C.stoneDim}`, paddingLeft: "clamp(20px, 3vw, 40px)" }}>
          <div ref={imgIRef} className="foundation-img-2" style={{ position: "relative", overflow: "hidden", height: "400px", backgroundColor: C.stone, marginBottom: "40px" }}>
            <img ref={imgIImg} src="https://images.unsplash.com/photo-1605718314131-4cc50cedd02f?w=1400&h=900&fit=crop&auto=format" alt="Modern AZGRANATA bottling and production facility" loading="lazy" decoding="async" style={{ width: "100%", height: "115%", objectFit: "cover", objectPosition: "center 40%" }} />
            <Grain opacity={0.04} />
          </div>
          <Caption>Production facility · Ganja, Azerbaijan</Caption>
          <div style={{ marginTop: "40px" }}>
            <Tx v={d.pillarNames[2]} tag="div" className="f-t" style={{ fontFamily: serif, fontSize: "clamp(32px, 4vw, 56px)", fontWeight: 400, color: C.dark, lineHeight: 1.0, letterSpacing: "-0.02em", marginBottom: "24px" }} />
            <Tx v={d.pillarDesc[2]} tag="p" className="f-b" style={{ fontFamily: sans, fontSize: "14px", lineHeight: 2.0, color: C.charcoal, fontWeight: 300 }} />
          </div>
          <Reveal delay={0.3} y={12}>
            <p style={{ fontFamily: serif, fontStyle: "italic", fontSize: "17px", color: C.stone, lineHeight: 1.7, marginTop: "56px" }}>{d.pillarQuote}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── CHAPTER 03: THE HOUSE ────────────────────────────────────────────────────
interface HouseBrand { name: string; category: string; tagline: string; accent: string; img: string; dark: boolean; }

const HOUSE_PANELS = [
  { id: "wine", index: "01", label: "Wine", tagline: "The Ancient Art of Azerbaijani Wine", desc: "From our estate vineyards in Shirvan and Ganja — wines that carry the unique terroir of Azerbaijan with uncompromising craft.", accent: "#8B1A1A", brands: [{ name: "Heritage", category: "Premium Red Wine", tagline: "Rooted in centuries of tradition", accent: "#8B1A1A", img: "https://images.unsplash.com/photo-1608232385022-8ba61bec6c59?w=600&h=700&fit=crop&auto=format", dark: true }, { name: "Icewin", category: "Ice Wine", tagline: "Harvested in the cold, perfected in the glass", accent: "#4A7A9A", img: "https://images.unsplash.com/photo-1697115355209-46e7bce340fb?w=600&h=700&fit=crop&auto=format", dark: false }, { name: "Rübai", category: "Reserve Blend", tagline: "Four varieties. One masterpiece.", accent: "#C9A84C", img: "https://images.unsplash.com/photo-1697115355152-e0a3a380f387?w=600&h=700&fit=crop&auto=format", dark: true }, { name: "Qaragöz", category: "Single Varietal", tagline: "The rare black grape of the Caucasus", accent: "#6B1A3A", img: "https://images.unsplash.com/photo-1697115355240-50215d74a987?w=600&h=700&fit=crop&auto=format", dark: true }] },
  { id: "spirits", index: "02", label: "Spirits", tagline: "Distilled to Absolute Perfection", desc: "Premium vodkas, brandies, and rare artisan spirits — each crafted from the finest Azerbaijani grains and aged in silence until ready.", accent: "#C9A84C", brands: [{ name: "Tamada", category: "Premium Vodka", tagline: "For life's finest moments", accent: "#C9A84C", img: "https://images.unsplash.com/photo-1534655882117-f9eff36a1574?w=600&h=700&fit=crop&auto=format", dark: true }, { name: "White Water", category: "Mountain Vodka", tagline: "Pure. Clear. Uncompromising.", accent: "#8AAAB8", img: "https://images.unsplash.com/photo-1626364700645-13f3cebdadc4?w=600&h=700&fit=crop&auto=format", dark: true }, { name: "Belïy Volk", category: "Premium Spirits", tagline: "Bold. Character-driven. Unyielding.", accent: "#A8A8A8", img: "https://images.unsplash.com/photo-1642603436366-c72d8a48a22d?w=600&h=700&fit=crop&auto=format", dark: true }] },
  { id: "softdrinks", index: "03", label: "Soft Drinks", tagline: "Nature, Bottled with Precision", desc: "A premium range of non-alcoholic beverages crafted from Azerbaijani pomegranates, mountain spring water, and seasonal botanicals.", accent: "#2C4A3E", brands: [{ name: "+MORE", category: "Enhanced Beverages", tagline: "Beyond refreshment", accent: "#2A5A7A", img: "https://images.unsplash.com/photo-1654648742474-7f22ca616d0b?w=600&h=700&fit=crop&auto=format", dark: false }, { name: "VITA1000", category: "Vitamin Drink", tagline: "1,000 reasons to feel extraordinary", accent: "#8B1A1A", img: "https://images.unsplash.com/photo-1574709755254-fcd942d09d5a?w=600&h=700&fit=crop&auto=format", dark: false }, { name: "Bahar", category: "Naturally Sparkling", tagline: "Spring captured in every sip", accent: "#2C4A3E", img: "https://images.unsplash.com/photo-1666014044085-0eada5d2c750?w=600&h=700&fit=crop&auto=format", dark: false }, { name: "Frumba", category: "Fruit Sparkling", tagline: "A celebration of natural flavors", accent: "#C95A20", img: "https://images.unsplash.com/photo-1574709755755-1699988a9c82?w=600&h=700&fit=crop&auto=format", dark: false }, { name: "Vivi", category: "Sparkling Water", tagline: "Life, pure and effervescent", accent: "#4A8A7A", img: "https://images.unsplash.com/photo-1760681554175-6b3920cad591?w=600&h=700&fit=crop&auto=format", dark: false }] },
];

function HouseBrandCard({ brand, visible, delay }: { brand: HouseBrand; visible: boolean; delay: number }) {
  const [hov, setHov] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const { isMobile } = useBreakpoint();
  const enter = () => { setHov(true); if (!isMobile && imgRef.current) gsap.to(imgRef.current, { scale: 1.05, duration: 2, ease: "expo.out" }); if (!isMobile && cardRef.current) gsap.to(cardRef.current, { boxShadow: "0 16px 48px rgba(58,58,58,0.11)", duration: 0.5 }); };
  const leave = () => { setHov(false); if (imgRef.current) gsap.to(imgRef.current, { scale: 1, duration: 1.8, ease: "expo.out" }); if (cardRef.current) gsap.to(cardRef.current, { boxShadow: "0 2px 8px rgba(58,58,58,0.04)", duration: 0.5 }); };
  return (
    <div style={{ flex: `0 0 ${isMobile ? "180px" : "228px"}`, opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(16px)", transition: `opacity 0.6s ease ${delay}s, transform 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}s`, cursor: "pointer" }} onMouseEnter={enter} onMouseLeave={leave}>
      <div ref={cardRef} style={{ height: isMobile ? "200px" : "260px", overflow: "hidden", backgroundColor: "#EDE8DF", marginBottom: "16px", position: "relative", boxShadow: "0 2px 8px rgba(58,58,58,0.04)" }}>
        <img ref={imgRef} src={brand.img} alt={brand.name} loading="lazy" decoding="async" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <Grain opacity={0.04} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(237,232,223,0.5) 0%, transparent 55%)", pointerEvents: "none" }} />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "7px" }}>
        <span style={{ width: "5px", height: "5px", borderRadius: "50%", backgroundColor: brand.accent, display: "inline-block" }} />
        <span style={{ fontFamily: sans, fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: brand.accent, opacity: 0.85, fontWeight: 300 }}>{brand.category}</span>
      </div>
      <div style={{ fontFamily: serif, fontSize: isMobile ? "17px" : "21px", fontWeight: 400, color: C.dark, letterSpacing: "-0.01em", lineHeight: 1.1, marginBottom: "4px" }}>{brand.name}</div>
      <div style={{ fontFamily: serif, fontStyle: "italic", fontSize: "12px", color: C.stone, lineHeight: 1.5 }}>{brand.tagline}</div>
      <div style={{ fontFamily: sans, fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: hov ? C.dark : "transparent", display: "flex", alignItems: "center", gap: "10px", marginTop: "12px", transition: "color 0.35s ease" }}>
        Discover <span style={{ display: "inline-block", width: hov ? "24px" : "0px", height: "1px", backgroundColor: C.champagne, transition: "width 0.45s cubic-bezier(0.16,1,0.3,1)" }} />
      </div>
    </div>
  );
}

function HouseSection() {
  const { d } = useLang();
  const [activeId, setActiveId] = useState<string | null>(null);
  const carouselRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const drag = useRef({ dragging: false, startX: 0, scrollLeft: 0 });
  const sectionRef = useRef<HTMLElement>(null);
  const { isMobile } = useBreakpoint();
  useLabelReveal(sectionRef);

  const startDrag = (id: string, x: number) => { const el = carouselRefs.current[id]; if (!el) return; drag.current = { dragging: true, startX: x, scrollLeft: el.scrollLeft }; };
  const moveDrag = (id: string, x: number) => { if (!drag.current.dragging) return; const el = carouselRefs.current[id]; if (el) el.scrollLeft = drag.current.scrollLeft - (x - drag.current.startX); };
  const endDrag = () => { drag.current.dragging = false; };

  return (
    <section ref={sectionRef} id="house" style={{ backgroundColor: "#F8F4EE" }} className="sec-pad-v">
      <div className="sec-px" style={{ marginBottom: "clamp(48px, 6vw, 96px)" }}>
        <ChapterLabel number="03" title={d.ch03Label} />
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "32px" }}>
          <Reveal>
            <h2 style={{ fontFamily: serif, fontSize: "clamp(36px, 6.5vw, 88px)", fontWeight: 400, color: C.dark, lineHeight: 0.94, letterSpacing: "-0.025em", maxWidth: "560px" }}>
              <Tx v={d.ch03H[0]} /><br /><em style={{ fontStyle: "italic", color: C.stone }}><Tx v={d.ch03H[1]} /></em>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p style={{ fontFamily: sans, fontSize: "14px", lineHeight: 1.95, color: C.charcoal, maxWidth: "320px", opacity: 0.65, fontWeight: 300, paddingBottom: "8px" }}>
              <Tx v={d.ch03Sub} tag="span" />
            </p>
          </Reveal>
        </div>
      </div>
      <div>
        {HOUSE_PANELS.map((panel, pi) => {
          const isOpen = activeId === panel.id || isMobile; // always open on mobile
          const isLast = pi === HOUSE_PANELS.length - 1;
          return (
            <Reveal key={panel.id} delay={pi * 0.08} y={20}>
              <div style={{ borderTop: `1px solid ${C.stoneDim}`, borderBottom: isLast ? `1px solid ${C.stoneDim}` : "none", backgroundColor: isOpen && !isMobile ? "#FDFCF9" : "transparent", transition: "background-color 0.55s ease" }}
                onMouseEnter={() => !isMobile && setActiveId(panel.id)} onMouseLeave={() => !isMobile && setActiveId(null)}>
                <div className="house-header" style={{ alignItems: "center", padding: "clamp(20px, 3vw, 40px) clamp(20px, 3vw, 52px)", gap: "clamp(16px, 3vw, 48px)" }}>
                  <div style={{ fontFamily: sans, fontSize: "10px", letterSpacing: "0.24em", color: isOpen ? C.champagne : "rgba(184,173,158,0.4)", transition: "color 0.45s ease", fontWeight: 300 }}>{panel.index}</div>
                  <div>
                    <div style={{ fontFamily: serif, fontSize: "clamp(22px, 3.8vw, 54px)", fontWeight: 400, color: C.dark, lineHeight: 1.0, letterSpacing: "-0.02em" }}>{panel.label}</div>
                    {!isMobile && <div style={{ fontFamily: serif, fontStyle: "italic", fontSize: "15px", color: C.stone, maxHeight: isOpen ? "36px" : "0", opacity: isOpen ? 1 : 0, overflow: "hidden", transition: "max-height 0.5s ease, opacity 0.4s ease" }}>{panel.tagline}</div>}
                  </div>
                  {!isMobile && <div style={{ fontFamily: sans, fontSize: "13px", lineHeight: 1.85, color: C.charcoal, maxWidth: "340px", opacity: isOpen ? 0.65 : 0, transform: isOpen ? "translateY(0)" : "translateY(6px)", transition: "opacity 0.45s ease 0.1s, transform 0.45s ease 0.1s", fontWeight: 300 }}>{panel.desc}</div>}
                  <div style={{ textAlign: "right", minWidth: "auto" }}>
                    <div style={{ fontFamily: sans, fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: isOpen ? C.champagne : C.stone, transition: "color 0.4s ease", fontWeight: 300 }}>{panel.brands.length}{isMobile ? "" : " Brands"}</div>
                    {!isMobile && <div style={{ fontFamily: sans, fontSize: "10px", color: "rgba(184,173,158,0.45)", opacity: isOpen ? 0 : 1, transition: "opacity 0.25s ease", whiteSpace: "nowrap" }}>{panel.brands.map((b) => b.name).join(" · ")}</div>}
                    {!isMobile && <div style={{ fontFamily: sans, fontSize: "18px", color: isOpen ? C.champagne : "rgba(184,173,158,0.25)", transform: isOpen ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1), color 0.4s ease", display: "inline-block", lineHeight: 1, marginTop: "6px" }}>→</div>}
                  </div>
                </div>
                <div style={{ maxHeight: isOpen ? "520px" : "0", overflow: "hidden", transition: isMobile ? "none" : "max-height 0.65s cubic-bezier(0.4,0,0.2,1)" }}>
                  {!isMobile && <div style={{ height: "1px", margin: "0 52px 40px", backgroundColor: C.champagneDim, transform: isOpen ? "scaleX(1)" : "scaleX(0.2)", transformOrigin: "left", transition: "transform 0.55s cubic-bezier(0.16,1,0.3,1) 0.1s" }} />}
                  <div ref={(el) => { carouselRefs.current[panel.id] = el; }}
                    style={{ display: "flex", gap: "16px", overflowX: "auto", paddingLeft: "clamp(20px, 3vw, 52px)", paddingRight: "clamp(20px, 3vw, 52px)", paddingBottom: "clamp(24px, 3vw, 36px)", paddingTop: isMobile ? "24px" : "0", scrollBehavior: "smooth", cursor: "grab", userSelect: "none", WebkitUserSelect: "none" as React.CSSProperties["WebkitUserSelect"] }}
                    className="house-scroll"
                    onMouseDown={(e) => startDrag(panel.id, e.clientX)} onMouseMove={(e) => moveDrag(panel.id, e.clientX)} onMouseUp={endDrag} onMouseLeave={endDrag}
                    onTouchStart={(e) => startDrag(panel.id, e.touches[0].clientX)} onTouchMove={(e) => moveDrag(panel.id, e.touches[0].clientX)} onTouchEnd={endDrag}>
                    {panel.brands.map((brand, bi) => <HouseBrandCard key={brand.name} brand={brand} visible={isOpen} delay={isMobile ? 0 : 0.15 + bi * 0.055} />)}
                  </div>
                  {/* See All button */}
                  <div style={{ paddingLeft: "clamp(20px, 3vw, 52px)", paddingRight: "clamp(20px, 3vw, 52px)", paddingBottom: "clamp(24px, 3vw, 40px)", display: "flex", justifyContent: "flex-end", opacity: isOpen ? 1 : 0, transition: "opacity 0.4s ease 0.2s" }}>
                    <button
                      style={{ fontFamily: sans, fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase" as const, color: C.dark, background: "none", border: `1px solid ${C.stoneDim}`, cursor: "pointer", padding: "11px 24px", display: "inline-flex", alignItems: "center", gap: "12px", fontWeight: 300, transition: "color 0.25s ease, border-color 0.25s ease" }}
                      onMouseEnter={(e) => gsap.to(e.currentTarget, { color: "#7A1E2C", borderColor: "#7A1E2C", duration: 0.25 })}
                      onMouseLeave={(e) => gsap.to(e.currentTarget, { color: C.dark, borderColor: C.stoneDim, duration: 0.25 })}>
                      See All <ArrowRight size={9} />
                    </button>
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

// ─── CHAPTER 04: OUR BRANDS ───────────────────────────────────────────────────

interface BrandItem { name: string; tagline: string; desc: string; category: string; img: string; accent: string; dark: boolean; }
interface BrandCat { id: string; label: string; year: string; headline: string; brands: BrandItem[]; }

const BRAND_CATEGORIES: BrandCat[] = [
  { id: "wine", label: "Wine", year: "Est. 2004", headline: "The Ancient Art of Azerbaijani Wine", brands: [{ name: "Heritage", tagline: "Rooted in centuries of tradition", desc: "Our oldest label — a benchmark Azerbaijani red that has stood the test of time. Aged in French and Caucasian oak, Heritage captures the soul of our vineyards in their purest form.", category: "Premium Red Wine", img: "https://images.unsplash.com/photo-1608232385022-8ba61bec6c59?w=900&h=700&fit=crop&auto=format", accent: "#8B1A1A", dark: true }, { name: "Icewin", tagline: "Harvested in the cold, perfected in the glass", desc: "Azerbaijan's answer to the world's finest ice wines. Grapes frozen by November frost, hand-harvested at night, yielding extraordinary sweetness and crystalline clarity.", category: "Ice Wine", img: "https://images.unsplash.com/photo-1697115355209-46e7bce340fb?w=900&h=700&fit=crop&auto=format", accent: "#4A7A9A", dark: false }, { name: "Rübai", tagline: "Four varieties. One masterpiece.", desc: "Named for the classical Azerbaijani quatrain — four stanzas, four voices, one vision. A masterful blend assembled at peak maturity.", category: "Reserve Blend", img: "https://images.unsplash.com/photo-1697115355152-e0a3a380f387?w=900&h=700&fit=crop&auto=format", accent: "#C9A84C", dark: true }, { name: "Qaragöz", tagline: "The rare black grape of the Caucasus", desc: "Qaragöz — meaning 'black eye' — is our most exclusive label. A native Azerbaijani variety found only in our highland estates, producing wines of uncommon depth and longevity.", category: "Single Varietal", img: "https://images.unsplash.com/photo-1697115355240-50215d74a987?w=900&h=700&fit=crop&auto=format", accent: "#6B1A3A", dark: true }] },
  { id: "spirits", label: "Spirits", year: "Est. 2006", headline: "Distilled to Perfection", brands: [{ name: "Tamada", tagline: "For life's finest moments", desc: "The Tamada — the toastmaster of Caucasian tradition — is the keeper of celebration. Triple-distilled from Azerbaijani winter wheat. Silky smooth. Unequivocally premium.", category: "Premium Vodka", img: "https://images.unsplash.com/photo-1534655882117-f9eff36a1574?w=900&h=700&fit=crop&auto=format", accent: "#C9A84C", dark: true }, { name: "White Water", tagline: "Pure. Clear. Uncompromising.", desc: "Distilled three times from mountain spring water sourced in the Caucasus highlands at 2,400 metres above sea level.", category: "Mountain Vodka", img: "https://images.unsplash.com/photo-1626364700645-13f3cebdadc4?w=900&h=700&fit=crop&auto=format", accent: "#8AAAB8", dark: true }, { name: "Belïy Volk", tagline: "Bold. Character-driven. Unyielding.", desc: "The White Wolf. A spirit that commands attention — bold in character, precise in finish, uncompromising in quality.", category: "Premium Spirits", img: "https://images.unsplash.com/photo-1642603436366-c72d8a48a22d?w=900&h=700&fit=crop&auto=format", accent: "#A8A8A8", dark: true }] },
  { id: "softdrinks", label: "Soft Drinks", year: "Est. 2010", headline: "Nature, Bottled", brands: [{ name: "+MORE", tagline: "Beyond refreshment", desc: "A range engineered for those who demand more. Enhanced with vitamins, minerals, and natural extracts.", category: "Enhanced Beverages", img: "https://images.unsplash.com/photo-1654648742474-7f22ca616d0b?w=900&h=700&fit=crop&auto=format", accent: "#2A5A7A", dark: false }, { name: "VITA1000", tagline: "1,000 reasons to feel extraordinary", desc: "1,000mg of vitamin C, cold-extracted from the finest Azerbaijani pomegranates and citrus orchards.", category: "Vitamin Drink", img: "https://images.unsplash.com/photo-1574709755254-fcd942d09d5a?w=900&h=700&fit=crop&auto=format", accent: "#8B1A1A", dark: false }, { name: "Bahar", tagline: "Spring captured in every sip", desc: "Bahar — spring in Azerbaijani. Elderflower, white peach, and Caucasian mint, sourced directly from our orchards.", category: "Naturally Sparkling", img: "https://images.unsplash.com/photo-1666014044085-0eada5d2c750?w=900&h=700&fit=crop&auto=format", accent: "#2C4A3E", dark: false }, { name: "Frumba", tagline: "A celebration of natural flavors", desc: "Fruit + Rumba. Zero artificial flavoring, zero added sugar. Made from real fruit extracts.", category: "Fruit Sparkling", img: "https://images.unsplash.com/photo-1574709755755-1699988a9c82?w=900&h=700&fit=crop&auto=format", accent: "#C95A20", dark: false }, { name: "Vivi", tagline: "Life, pure and effervescent", desc: "A clean, lightly sparkling mineral water enriched with natural electrolytes from our Caucasian spring at 2,100 metres altitude.", category: "Sparkling Water", img: "https://images.unsplash.com/photo-1760681554175-6b3920cad591?w=900&h=700&fit=crop&auto=format", accent: "#4A8A7A", dark: false }] },
];

function BrandCard({ brand, isActive }: { brand: BrandItem; isActive: boolean }) {
  const imgRef = useRef<HTMLImageElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const { isMobile } = useBreakpoint();
  const enter = () => { if (!isActive || isMobile) return; if (imgRef.current) gsap.to(imgRef.current, { scale: 1.05, duration: 2.5, ease: "expo.out" }); if (cardRef.current) gsap.to(cardRef.current, { boxShadow: brand.dark ? "0 40px 96px rgba(0,0,0,0.45)" : "0 40px 96px rgba(58,58,58,0.12)", duration: 0.6 }); };
  const leave = () => { if (imgRef.current) gsap.to(imgRef.current, { scale: 1, duration: 2, ease: "expo.out" }); if (cardRef.current) gsap.to(cardRef.current, { boxShadow: "none", duration: 0.6 }); };
  return (
    <div ref={cardRef} style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "54% 46%", height: isMobile ? "auto" : "580px", backgroundColor: brand.dark ? C.dark : C.ivory, overflow: "hidden" }}
      onMouseEnter={enter} onMouseLeave={leave} className="brand-card-inner">
      <div style={{ position: "relative", overflow: "hidden", backgroundColor: brand.dark ? "#0F0D0B" : C.stone, minHeight: isMobile ? "260px" : "auto" }}>
        <img ref={imgRef} src={brand.img} alt={brand.name} loading="lazy" decoding="async" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <Grain opacity={0.04} />
        <div style={{ position: "absolute", inset: 0, background: brand.dark ? "linear-gradient(to right, rgba(0,0,0,0.08) 0%, rgba(26,23,20,0.52) 100%)" : "linear-gradient(to right, rgba(245,240,232,0.04) 0%, rgba(245,240,232,0.48) 100%)" }} />
        <div style={{ position: "absolute", top: "24px", left: "24px", width: "7px", height: "7px", borderRadius: "50%", backgroundColor: brand.accent, boxShadow: `0 0 14px ${brand.accent}70` }} />
      </div>
      <div style={{ padding: "clamp(28px, 4vw, 56px) clamp(24px, 4vw, 52px)", display: "flex", flexDirection: "column", justifyContent: "center", backgroundColor: brand.dark ? C.dark : C.ivory }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", marginBottom: "28px" }}>
          <span style={{ width: "5px", height: "5px", borderRadius: "50%", backgroundColor: brand.accent, display: "inline-block" }} />
          <span style={{ fontFamily: sans, fontSize: "9px", letterSpacing: "0.26em", textTransform: "uppercase", color: brand.dark ? C.stone : C.charcoal, opacity: 0.75, fontWeight: 300 }}>{brand.category}</span>
        </div>
        <h3 style={{ fontFamily: serif, fontSize: "clamp(26px, 3vw, 48px)", fontWeight: 400, color: brand.dark ? C.ivory : C.dark, lineHeight: 1.05, letterSpacing: "-0.02em", marginBottom: "12px" }}>{brand.name}</h3>
        <p style={{ fontFamily: serif, fontStyle: "italic", fontSize: "16px", color: brand.dark ? C.stone : C.charcoal, lineHeight: 1.5, marginBottom: "18px" }}>{brand.tagline}</p>
        <div style={{ width: "28px", height: "1px", backgroundColor: brand.accent, opacity: 0.65, marginBottom: "18px" }} />
        <p style={{ fontFamily: sans, fontSize: "13px", lineHeight: 1.95, color: brand.dark ? "rgba(184,173,158,0.6)" : C.charcoal, marginBottom: "36px", fontWeight: 300 }}>{brand.desc}</p>
        <button style={{ fontFamily: sans, fontSize: "9px", letterSpacing: "0.24em", fontWeight: 300, color: brand.dark ? C.champagne : C.dark, background: "none", border: "none", cursor: "pointer", textTransform: "uppercase", display: "flex", alignItems: "center", gap: "18px", padding: 0 }}
          onMouseEnter={(e) => { const s = e.currentTarget.querySelector("span"); if (s) gsap.to(s, { width: "60px", duration: 0.4, ease: "expo.out" }); }}
          onMouseLeave={(e) => { const s = e.currentTarget.querySelector("span"); if (s) gsap.to(s, { width: "40px", duration: 0.4, ease: "expo.out" }); }}>
          Discover <span style={{ width: "40px", height: "1px", backgroundColor: C.champagne, display: "inline-block" }} />
        </button>
      </div>
    </div>
  );
}

function BrandSlider({ brands }: { brands: BrandItem[] }) {
  const [active, setActive] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragDelta, setDragDelta] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [cw, setCw] = useState(0);
  const { isMobile } = useBreakpoint();

  useEffect(() => {
    const measure = () => { if (containerRef.current) setCw(containerRef.current.offsetWidth); };
    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);
  useEffect(() => { setActive(0); setDragDelta(0); }, [brands]);

  const PEEK = isMobile ? 32 : Math.max(48, Math.min(96, cw * 0.07));
  const cardWidth = cw > 0 ? cw - PEEK * 2 : 0;
  const trackX = cw > 0 ? PEEK - active * cardWidth + dragDelta : 0;
  const goTo = (idx: number) => { setActive(Math.max(0, Math.min(idx, brands.length - 1))); setDragDelta(0); };

  const onMD = (e: React.MouseEvent) => { setIsDragging(true); setDragStart(e.clientX); };
  const onMM = (e: React.MouseEvent) => { if (!isDragging) return; setDragDelta(e.clientX - dragStart); };
  const onMU = () => { if (!isDragging) return; setIsDragging(false); if (dragDelta < -60 && active < brands.length - 1) goTo(active + 1); else if (dragDelta > 60 && active > 0) goTo(active - 1); else setDragDelta(0); };
  const onTS = (e: React.TouchEvent) => { setIsDragging(true); setDragStart(e.touches[0].clientX); };
  const onTM = (e: React.TouchEvent) => { if (!isDragging) return; setDragDelta(e.touches[0].clientX - dragStart); };
  const onTE = () => { if (!isDragging) return; setIsDragging(false); if (dragDelta < -50) goTo(active + 1); else if (dragDelta > 50) goTo(active - 1); else setDragDelta(0); };

  useEffect(() => {
    const el = containerRef.current; if (!el) return;
    let acc = 0; let t: ReturnType<typeof setTimeout> | null = null;
    const h = (e: WheelEvent) => { if (Math.abs(e.deltaX) < Math.abs(e.deltaY) * 0.6) return; e.preventDefault(); acc += e.deltaX; if (t) clearTimeout(t); t = setTimeout(() => { if (acc > 40) setActive((a) => Math.min(a + 1, brands.length - 1)); else if (acc < -40) setActive((a) => Math.max(a - 1, 0)); acc = 0; }, 55); };
    el.addEventListener("wheel", h, { passive: false });
    return () => { el.removeEventListener("wheel", h); if (t) clearTimeout(t); };
  }, [brands.length]);

  return (
    <div>
      <div ref={containerRef} style={{ overflow: "hidden", cursor: isDragging ? "grabbing" : "grab", userSelect: "none", WebkitUserSelect: "none" as React.CSSProperties["WebkitUserSelect"], touchAction: "pan-y" }}
        onMouseDown={onMD} onMouseMove={onMM} onMouseUp={onMU} onMouseLeave={onMU} onTouchStart={onTS} onTouchMove={onTM} onTouchEnd={onTE}>
        <div style={{ display: "flex", transform: `translateX(${trackX}px)`, transition: isDragging ? "none" : "transform 0.72s cubic-bezier(0.16,1,0.3,1)", willChange: "transform" }}>
          {brands.map((brand, i) => (
            <div key={brand.name} style={{ flex: `0 0 ${cardWidth}px`, minWidth: `${cardWidth}px`, opacity: i === active ? 1 : isMobile ? 0.15 : 0.28, transform: i === active ? "scale(1)" : "scale(0.962)", transition: "opacity 0.6s ease, transform 0.7s cubic-bezier(0.16,1,0.3,1)", cursor: i !== active ? "pointer" : isDragging ? "grabbing" : "grab" }}
              onClick={() => { if (i !== active) goTo(i); }}>
              <BrandCard brand={brand} isActive={i === active} />
            </div>
          ))}
        </div>
      </div>
      <div className="sec-px" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "28px" }}>
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          {brands.map((b, i) => <button key={b.name} onClick={() => goTo(i)} aria-label={b.name} style={{ width: i === active ? "28px" : "6px", height: "1px", backgroundColor: i === active ? C.champagne : C.stone, border: "none", cursor: "pointer", padding: 0, opacity: i === active ? 1 : 0.3, transition: "all 0.45s cubic-bezier(0.16,1,0.3,1)" }} />)}
          <span style={{ fontFamily: sans, fontSize: "9px", letterSpacing: "0.14em", color: C.stone, marginLeft: "12px", opacity: 0.55, fontWeight: 300 }}>{active + 1} / {brands.length}</span>
        </div>
        {!isMobile && (
          <div style={{ display: "flex", gap: "8px" }}>
            {[{ icon: <ChevronLeft size={15} />, dir: -1, dis: active === 0 }, { icon: <ChevronRight size={15} />, dir: 1, dis: active === brands.length - 1 }].map(({ icon, dir, dis }) => (
              <button key={dir} onClick={() => goTo(active + dir)} disabled={dis}
                style={{ width: "44px", height: "44px", border: `1px solid ${dis ? "rgba(184,173,158,0.12)" : "rgba(184,173,158,0.35)"}`, backgroundColor: "transparent", cursor: dis ? "not-allowed" : "pointer", opacity: dis ? 0.18 : 1, display: "flex", alignItems: "center", justifyContent: "center", color: C.charcoal, transition: "all 0.3s ease" }}
                onMouseEnter={(e) => { if (!dis) gsap.to(e.currentTarget, { borderColor: C.champagne, backgroundColor: C.champagneDim, duration: 0.3 }); }}
                onMouseLeave={(e) => { if (!dis) gsap.to(e.currentTarget, { borderColor: "rgba(184,173,158,0.35)", backgroundColor: "transparent", duration: 0.3 }); }}>
                {icon}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function BrandsSection() {
  const { d } = useLang();
  const [activeCatIdx, setActiveCatIdx] = useState(0);
  const [visible, setVisible] = useState(true);
  const sliderKey = useRef(0);
  const sectionRef = useRef<HTMLElement>(null);
  useLabelReveal(sectionRef);
  const switchCat = (idx: number) => { if (idx === activeCatIdx) return; setVisible(false); setTimeout(() => { sliderKey.current += 1; setActiveCatIdx(idx); setVisible(true); }, 360); };
  const cat = BRAND_CATEGORIES[activeCatIdx];

  return (
    <section ref={sectionRef} id="brands" style={{ backgroundColor: C.ivory }} className="sec-pad-v">
      <div className="sec-px" style={{ marginBottom: "clamp(48px, 6vw, 80px)" }}>
        <ChapterLabel number="04" title={d.ch04Label} />
        <Reveal>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "32px" }}>
            <h2 style={{ fontFamily: serif, fontSize: "clamp(40px, 7.5vw, 100px)", fontWeight: 400, color: C.dark, lineHeight: 0.93, letterSpacing: "-0.025em" }}>
              <Tx v={d.ch04H[0]} /><br /><em style={{ fontStyle: "italic", color: C.stone }}><Tx v={d.ch04H[1]} /></em>
            </h2>
            <p style={{ fontFamily: sans, fontSize: "14px", lineHeight: 1.95, color: C.charcoal, maxWidth: "340px", paddingBottom: "8px", opacity: 0.65, fontWeight: 300 }}>
              <Tx v={d.ch04Sub} tag="span" />
            </p>
          </div>
        </Reveal>
      </div>
      <Reveal delay={0.15}>
        <div className="sec-px" style={{ marginBottom: "48px", borderBottom: `1px solid ${C.stoneDim}` }}>
          <div style={{ display: "flex", gap: "0", overflowX: "auto", scrollbarWidth: "none" }}>
            {BRAND_CATEGORIES.map((c, i) => (
              <button key={c.id} onClick={() => switchCat(i)}
                style={{ fontFamily: sans, fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: i === activeCatIdx ? C.burgundy : C.stone, background: "none", border: "none", cursor: "pointer", padding: "0 0 20px", marginRight: "clamp(28px, 4vw, 56px)", position: "relative", transition: "color 0.4s ease", fontWeight: 300, whiteSpace: "nowrap", flexShrink: 0 }}>
                {c.label}
                <span style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "1px", backgroundColor: C.burgundy, transform: i === activeCatIdx ? "scaleX(1)" : "scaleX(0)", transformOrigin: "left center", transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)" }} />
              </button>
            ))}
          </div>
        </div>
      </Reveal>
      <div className="sec-px" style={{ marginBottom: "36px", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(10px)", transition: "opacity 0.5s ease, transform 0.5s ease" }}>
        <div style={{ fontFamily: sans, fontSize: "9px", letterSpacing: "0.28em", color: C.champagne, textTransform: "uppercase", marginBottom: "6px", fontWeight: 300 }}>{cat.year}</div>
        <div style={{ fontFamily: serif, fontStyle: "italic", fontSize: "19px", color: C.stone }}>{cat.headline}</div>
      </div>
      <div style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(18px)", transition: "opacity 0.55s ease 0.06s, transform 0.6s ease 0.06s" }}>
        <BrandSlider key={`${activeCatIdx}-${sliderKey.current}`} brands={cat.brands} />
      </div>
    </section>
  );
}

// ─── CHAPTER 05: GLOBAL PRESENCE ─────────────────────────────────────────────
const DESTINATIONS = [
  { country: "Germany", products: "Premium Wine & Spirits", partners: "24 partners", angle: -70, dist: 0.82 },
  { country: "Russia", products: "Pomegranate Juice & Wine", partners: "31 partners", angle: -20, dist: 0.78 },
  { country: "UAE", products: "Organic & Premium Range", partners: "18 partners", angle: 20, dist: 0.76 },
  { country: "China", products: "Wine & Soft Drinks", partners: "12 partners", angle: 55, dist: 0.88 },
  { country: "USA", products: "Premium Wine", partners: "8 partners", angle: 110, dist: 0.92 },
  { country: "UK", products: "Spirits & Wine", partners: "15 partners", angle: 145, dist: 0.86 },
  { country: "France", products: "Spirits", partners: "6 partners", angle: 170, dist: 0.80 },
  { country: "Turkey", products: "Full Range", partners: "22 partners", angle: -160, dist: 0.72 },
  { country: "Georgia", products: "Wine & Spirits", partners: "19 partners", angle: -130, dist: 0.65 },
  { country: "Kazakhstan", products: "FMCG Products", partners: "27 partners", angle: -100, dist: 0.75 },
  { country: "Poland", products: "Wine & Pomegranate", partners: "11 partners", angle: -45, dist: 0.88 },
  { country: "Italy", products: "Premium Wine", partners: "9 partners", angle: 200, dist: 0.78 },
];

function GlobalSection() {
  const { d } = useLang();
  const ref = useRef<HTMLElement>(null);
  const [opened, setOpened] = useState(false);
  const [hoveredSeed, setHoveredSeed] = useState<number | null>(null);
  const { isMobile } = useBreakpoint();
  useLabelReveal(ref);

  useEffect(() => {
    const s = ref.current; if (!s) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({ trigger: s, start: "top 60%", once: true, onEnter: () => setTimeout(() => setOpened(true), 300) });
    }, s);
    return () => ctx.revert();
  }, []);

  const pomSize = isMobile ? 180 : 300;
  const xSpread = isMobile ? 28 : 36;
  const ySpread = isMobile ? 26 : 34;

  return (
    <section ref={ref} id="global" style={{ position: "relative", backgroundColor: C.dark, overflow: "hidden" }} className="sec-pad">
      <ChapterLabel number="05" title={d.ch05Label} light />
      <div className="global-header" style={{ marginBottom: "clamp(60px, 8vw, 100px)" }}>
        <Reveal y={24}>
          <h2 style={{ fontFamily: serif, fontSize: "clamp(32px, 5.5vw, 80px)", fontWeight: 400, color: C.ivory, lineHeight: 0.93, letterSpacing: "-0.025em" }}>
            <Tx v={d.ch05H[0]} /><br /><em style={{ fontStyle: "italic", color: C.stone }}><Tx v={d.ch05H[1]} /></em>
          </h2>
        </Reveal>
        <Reveal delay={0.2} y={24}>
          <p style={{ fontFamily: sans, fontSize: "14px", lineHeight: 1.95, color: "rgba(184,173,158,0.72)", maxWidth: "420px", paddingTop: "12px", fontWeight: 300 }}>
            <Tx v={d.ch05Sub} tag="span" />
          </p>
        </Reveal>
      </div>

      <div style={{ position: "relative", height: isMobile ? "360px" : "680px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", opacity: opened ? 0.18 : 0, transition: "opacity 2.5s ease 2s" }}>
          {DESTINATIONS.map((dest, i) => { const r = (dest.angle * Math.PI) / 180; return <line key={i} x1="50%" y1="50%" x2={`${50 + dest.dist * xSpread * Math.cos(r)}%`} y2={`${50 + dest.dist * ySpread * Math.sin(r)}%`} stroke={C.champagne} strokeWidth="0.5" strokeDasharray="3 10" />; })}
        </svg>
        <div style={{ position: "absolute", width: `${pomSize}px`, height: `${pomSize * 1.1}px`, zIndex: 2 }}>
          <svg viewBox="0 0 200 220" fill="none" style={{ width: "100%", height: "100%" }}>
            <path d="M100 8 C102 18 100 30 100 38" stroke={C.champagne} strokeWidth="1.5" strokeLinecap="round" fill="none" />
            <path d="M78 36 L82 26 L86 36 L90 24 L94 36 L98 26 L102 36" stroke={C.champagne} strokeWidth="1.2" strokeLinejoin="round" fill="none" strokeLinecap="round" />
            <ellipse cx="100" cy="118" rx="56" ry="64" fill="#6B1A1A" /><ellipse cx="100" cy="118" rx="56" ry="64" fill="url(#pG)" />
            {[0, 40, 80, 120, 160, 200, 240, 280, 320].map((deg, si) => { const r = (deg * Math.PI) / 180; return <motion.ellipse key={si} cx={100 + 24 * Math.cos(r)} cy={118 + 20 * Math.sin(r)} rx="7" ry="9" fill={C.rubyBright} opacity="0" animate={opened ? { opacity: [0, 0.85, 0.65], scale: [0.3, 1.1, 1] } : {}} transition={{ duration: 0.8, delay: 0.4 + si * 0.06, ease: "backOut" }} style={{ originX: "100px", originY: "118px" }} />; })}
            <ellipse cx="80" cy="96" rx="16" ry="20" fill="rgba(255,255,255,0.05)" />
            <defs><radialGradient id="pG" cx="35%" cy="28%" r="70%"><stop offset="0%" stopColor="#A02020" stopOpacity="0.55" /><stop offset="100%" stopColor="#3A0808" stopOpacity="0.85" /></radialGradient></defs>
          </svg>
        </div>
        {DESTINATIONS.map((dest, i) => {
          const r = (dest.angle * Math.PI) / 180;
          const xP = 50 + dest.dist * xSpread * Math.cos(r);
          const yP = 50 + dest.dist * ySpread * Math.sin(r);
          const isH = hoveredSeed === i;
          return (
            <motion.div key={dest.country} style={{ position: "absolute", left: `${xP}%`, top: `${yP}%`, transform: "translate(-50%, -50%)", zIndex: 3, cursor: "pointer" }}
              initial={{ opacity: 0, scale: 0 }} animate={opened ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
              transition={{ duration: 0.55, delay: 1.1 + i * 0.07, ease: [0.34, 1.56, 0.64, 1] }}
              onMouseEnter={() => !isMobile && setHoveredSeed(i)} onMouseLeave={() => setHoveredSeed(null)}
              onTouchStart={() => setHoveredSeed(isH ? null : i)}>
              <div style={{ width: isH ? "13px" : isMobile ? "6px" : "8px", height: isH ? "13px" : isMobile ? "6px" : "8px", borderRadius: "50%", backgroundColor: C.rubyBright, boxShadow: isH ? `0 0 0 3px rgba(201,64,64,0.12), 0 0 20px rgba(201,64,64,0.5)` : "0 0 6px rgba(201,64,64,0.3)", margin: "0 auto", transition: "all 0.35s ease" }} />
              {!isMobile && <div style={{ fontFamily: sans, fontSize: "8px", letterSpacing: "0.14em", color: isH ? C.champagne : "rgba(184,173,158,0.45)", textTransform: "uppercase", marginTop: "8px", textAlign: "center", transition: "color 0.3s", whiteSpace: "nowrap", fontWeight: 300 }}>{dest.country}</div>}
              {isH && (
                <motion.div initial={{ opacity: 0, y: 6, scale: 0.94 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.2 }}
                  style={{ position: "absolute", bottom: "38px", left: "50%", transform: "translateX(-50%)", backgroundColor: "rgba(15,13,11,0.97)", backdropFilter: "blur(20px)", border: `1px solid ${C.champagneDim}`, padding: "14px 18px", minWidth: "160px", whiteSpace: "nowrap", zIndex: 20 }}>
                  <div style={{ fontFamily: sans, fontSize: "9px", letterSpacing: "0.2em", color: C.champagne, marginBottom: "6px", textTransform: "uppercase", fontWeight: 300 }}>{dest.country}</div>
                  <div style={{ fontFamily: sans, fontSize: "11px", color: "rgba(245,240,232,0.65)", marginBottom: "3px", lineHeight: 1.5, fontWeight: 300 }}>{dest.products}</div>
                  <div style={{ fontFamily: sans, fontSize: "10px", color: C.stone, opacity: 0.55, fontWeight: 300 }}>{dest.partners}</div>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      <div className="stats-grid" style={{ gap: "1px", backgroundColor: C.champagneDim, marginTop: "clamp(40px, 6vw, 80px)" }}>
        {[{ n: "40+", l: "Countries" }, { n: "6", l: "Continents" }, { n: "200+", l: "Partners" }, { n: "20+", l: "Years" }].map((s) => (
          <Reveal key={s.l}><div style={{ textAlign: "center", padding: "clamp(32px, 5vw, 60px) 16px", backgroundColor: C.dark }}>
            <div style={{ fontFamily: serif, fontSize: "clamp(36px, 5vw, 72px)", fontWeight: 400, color: C.ivory, lineHeight: 1, marginBottom: "12px", letterSpacing: "-0.02em" }}>{s.n}</div>
            <div style={{ fontFamily: sans, fontSize: "9px", letterSpacing: "0.2em", color: C.stone, textTransform: "uppercase", fontWeight: 300 }}>{s.l}</div>
          </div></Reveal>
        ))}
      </div>
    </section>
  );
}

// ─── CHAPTER 06: JOURNAL ─────────────────────────────────────────────────────
const JOURNAL_SECONDARY = [
  { category: "Innovation", title: "How We Reinvented Pomegranate Processing", date: "September 2024", img: IMG.barrels, readTime: "8 min" },
  { category: "Awards", title: "Reserve Wins International Gold at Decanter", date: "August 2024", img: IMG.wineBottle, readTime: "5 min" },
  { category: "People", title: "Portrait: The Winemaker Behind Our Finest Vintage", date: "July 2024", img: IMG.farmer, readTime: "10 min" },
];

function JournalSection() {
  const { d, lang } = useLang();
  const [active, setActive] = useState<string>(d.jCats[0]);
  const sectionRef = useRef<HTMLElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const { isMobile } = useBreakpoint();

  // sync active tab key when lang changes
  useEffect(() => { setActive(d.jCats[0]); }, [d]);

  useLabelReveal(sectionRef);
  useClipReveal(featuredRef, { start: "top 82%" });
  useWordReveal(titleRef as React.RefObject<HTMLElement>, { start: "top 76%", stagger: 0.07 });

  useEffect(() => {
    const s = sectionRef.current; if (!s) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".j-card", { opacity: 0, x: isMobile ? 0 : 24, y: isMobile ? 16 : 0 }, { opacity: 1, x: 0, y: 0, stagger: 0.12, duration: 1.1, ease: "expo.out", scrollTrigger: { trigger: ".j-bottom", start: "top 88%" } });
    }, s);
    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section ref={sectionRef} id="journal" className="sec-pad" style={{ backgroundColor: C.ivory }}>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "32px", marginBottom: "clamp(48px, 6vw, 80px)" }}>
        <div>
          <ChapterLabel number="06" title={d.ch06Label} />
          <Reveal y={24}>
            <h2 style={{ fontFamily: serif, fontSize: "clamp(52px, 10vw, 128px)", fontWeight: 400, color: C.dark, lineHeight: 0.88, letterSpacing: "-0.035em" }}>
              <Tx v={lang === "az" ? "Jurnal" : lang === "ru" ? "Журнал" : "The"} />
              {lang === "en" && <><br /><em style={{ fontStyle: "italic", color: C.burgundy }}>Journal</em></>}
              {lang !== "en" && <><br /><em style={{ fontStyle: "italic", color: C.burgundy }}><Tx v={d.ch06Label} /></em></>}
            </h2>
          </Reveal>
        </div>
        <Reveal delay={0.2}>
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", paddingBottom: "8px", overflowX: "auto", scrollbarWidth: "none" }}>
            {d.jCats.map((cat) => (
              <button key={cat} onClick={() => setActive(cat)}
                style={{ fontFamily: sans, fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: active === cat ? C.dark : C.stone, background: "none", border: "none", borderBottom: active === cat ? `1px solid ${C.champagne}` : "1px solid transparent", paddingBottom: "4px", cursor: "pointer", transition: "color 0.3s, border-color 0.3s", fontWeight: 300, whiteSpace: "nowrap", flexShrink: 0 }}>
                {cat}
              </button>
            ))}
          </div>
        </Reveal>
      </div>

      <div className="j-top" style={{ marginBottom: "2px" }}>
        <div ref={featuredRef} style={{ position: "relative", overflow: "hidden", cursor: "pointer", backgroundColor: C.stone, height: isMobile ? "420px" : "640px" }} className="group">
          <img src={IMG.aerial} alt="Aerial view of AZGRANATA vineyards during October harvest" loading="lazy" decoding="async" style={{ width: "100%", height: "115%", objectFit: "cover", objectPosition: "center 40%", transition: "transform 3.5s ease" }} className="group-hover:scale-[1.03]" />
          <Grain opacity={0.04} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(15,13,11,0.88) 0%, rgba(15,13,11,0.28) 52%, transparent 100%)" }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: isMobile ? "28px 24px" : "52px 56px", zIndex: 3 }}>
            <Tx v={d.jFeatCat} style={{ fontFamily: sans, fontSize: "9px", letterSpacing: "0.28em", color: C.champagne, textTransform: "uppercase", marginBottom: "16px", fontWeight: 300, display: "block" }} />
            <h3 ref={titleRef} aria-label={d.jFeatTitle.join(" ")} style={{ fontFamily: serif, fontSize: "clamp(28px, 4.5vw, 60px)", fontWeight: 400, color: "#fff", lineHeight: 1.04, marginBottom: "14px", maxWidth: "560px", letterSpacing: "-0.02em" }}>
              {d.jFeatTitle.map((w, i, a) => (
                <span key={`${w}-${i}`} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom", paddingBottom: "0.04em" }}>
                  <span className="gw" style={{ display: "inline-block" }}>{w}{i < a.length - 1 ? " " : ""}</span>
                </span>
              ))}
            </h3>
            {!isMobile && <p style={{ fontFamily: sans, fontSize: "13px", color: "rgba(255,255,255,0.52)", maxWidth: "460px", lineHeight: 1.88, marginBottom: "24px", fontWeight: 300 }}>{d.jFeatExcerpt}</p>}
            <Tx v={d.jFeatDate} style={{ fontFamily: sans, fontSize: "9px", letterSpacing: "0.2em", color: "rgba(184,173,158,0.45)", textTransform: "uppercase", fontWeight: 300, display: "block" }} />
          </div>
        </div>

        <div style={{ position: "relative", overflow: "hidden", cursor: "pointer", backgroundColor: C.ivoryDeep, display: "flex", flexDirection: "column" }} className="group">
          <div style={{ position: "relative", overflow: "hidden", flex: "1", minHeight: isMobile ? "200px" : "auto" }}>
            <img src={JOURNAL_SECONDARY[0].img} alt={JOURNAL_SECONDARY[0].title} loading="lazy" decoding="async" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 3s ease" }} className="group-hover:scale-[1.03]" />
            <Grain opacity={0.04} />
          </div>
          <div style={{ padding: "clamp(20px, 3vw, 36px) clamp(20px, 3vw, 40px)", backgroundColor: C.ivoryDeep }}>
            <div style={{ fontFamily: sans, fontSize: "9px", letterSpacing: "0.24em", color: C.champagne, textTransform: "uppercase", marginBottom: "12px", fontWeight: 300 }}>{JOURNAL_SECONDARY[0].category} — {JOURNAL_SECONDARY[0].readTime}</div>
            <h4 style={{ fontFamily: serif, fontSize: "20px", fontWeight: 400, color: C.dark, lineHeight: 1.25, marginBottom: "12px", letterSpacing: "-0.01em" }}>{JOURNAL_SECONDARY[0].title}</h4>
            <div style={{ fontFamily: sans, fontSize: "10px", color: C.stone, letterSpacing: "0.08em", fontWeight: 300 }}>{JOURNAL_SECONDARY[0].date}</div>
          </div>
        </div>
      </div>

      <div className="j-bottom">
        <div className="j-card" style={{ cursor: "pointer", backgroundColor: C.ivoryDeep, opacity: 0 }}>
          <div style={{ position: "relative", overflow: "hidden", height: isMobile ? "220px" : "320px", backgroundColor: C.stone }} className="group">
            <img src={JOURNAL_SECONDARY[1].img} alt={JOURNAL_SECONDARY[1].title} loading="lazy" decoding="async" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 2.5s ease" }} className="group-hover:scale-[1.03]" />
            <Grain opacity={0.04} />
          </div>
          <div style={{ padding: "clamp(20px, 3vw, 32px) clamp(20px, 3vw, 36px)" }}>
            <div style={{ fontFamily: sans, fontSize: "9px", letterSpacing: "0.24em", color: C.champagne, textTransform: "uppercase", marginBottom: "12px", fontWeight: 300 }}>{JOURNAL_SECONDARY[1].category} — {JOURNAL_SECONDARY[1].readTime}</div>
            <h4 style={{ fontFamily: serif, fontSize: "19px", fontWeight: 400, color: C.dark, lineHeight: 1.3, marginBottom: "10px", letterSpacing: "-0.01em" }}>{JOURNAL_SECONDARY[1].title}</h4>
            <div style={{ fontFamily: sans, fontSize: "10px", color: C.stone, letterSpacing: "0.08em", fontWeight: 300 }}>{JOURNAL_SECONDARY[1].date}</div>
          </div>
        </div>

        <div className="j-card hide-mobile" style={{ backgroundColor: C.dark, display: "flex", flexDirection: "column", justifyContent: "center", padding: "48px 28px", opacity: 0 }}>
          <div style={{ fontFamily: serif, fontSize: "56px", fontWeight: 400, color: C.champagne, opacity: 0.22, lineHeight: 0.8, marginBottom: "18px" }}>"</div>
          <p style={{ fontFamily: serif, fontStyle: "italic", fontSize: "15px", color: C.stone, lineHeight: 1.7, marginBottom: "20px" }}><Tx v={d.jQuote} tag="span" /></p>
          <div style={{ fontFamily: sans, fontSize: "9px", letterSpacing: "0.2em", color: "rgba(184,173,158,0.35)", textTransform: "uppercase", fontWeight: 300 }}><Tx v={d.jQuoteBy} tag="span" /></div>
        </div>

        <div className="j-card" style={{ cursor: "pointer", backgroundColor: C.ivoryDeep, opacity: 0 }}>
          <div style={{ position: "relative", overflow: "hidden", height: isMobile ? "200px" : "260px", backgroundColor: C.stone }} className="group">
            <img src={JOURNAL_SECONDARY[2].img} alt={JOURNAL_SECONDARY[2].title} loading="lazy" decoding="async" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 20%", transition: "transform 2.5s ease" }} className="group-hover:scale-[1.03]" />
            <Grain opacity={0.04} />
          </div>
          <div style={{ padding: "clamp(20px, 3vw, 32px) clamp(20px, 3vw, 36px)" }}>
            <div style={{ fontFamily: sans, fontSize: "9px", letterSpacing: "0.24em", color: C.champagne, textTransform: "uppercase", marginBottom: "12px", fontWeight: 300 }}>{JOURNAL_SECONDARY[2].category} — {JOURNAL_SECONDARY[2].readTime}</div>
            <h4 style={{ fontFamily: serif, fontSize: "19px", fontWeight: 400, color: C.dark, lineHeight: 1.3, marginBottom: "10px", letterSpacing: "-0.01em" }}>{JOURNAL_SECONDARY[2].title}</h4>
            <div style={{ fontFamily: sans, fontSize: "10px", color: C.stone, letterSpacing: "0.08em", fontWeight: 300 }}>{JOURNAL_SECONDARY[2].date}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CHAPTER 07: SUSTAINABILITY ───────────────────────────────────────────────
const SUSTAIN_VALUES = [94, 40, 100, 0];
const SUSTAIN_UNITS = ["%", "%", "%", ""];

function StatRow({ value, unit, label, prose, index }: { value: number; unit: string; label: string; prose: string; index: number }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  useCounter(numRef, value, { suffix: unit, start: "top 82%" });
  useEffect(() => {
    const row = rowRef.current; if (!row) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(row, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 1.1, ease: "expo.out", scrollTrigger: { trigger: row, start: "top 88%" } });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rowRef} className="s-row" style={{ alignItems: "start", borderTop: index === 0 ? `1px solid rgba(201,168,76,0.15)` : "none", borderBottom: `1px solid rgba(201,168,76,0.12)`, padding: "clamp(32px, 4vw, 56px) 0", opacity: 0 }}>
      <div style={{ paddingRight: "clamp(24px, 4vw, 48px)", marginBottom: "16px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", lineHeight: 0.85 }}>
          <span ref={numRef} style={{ fontFamily: serif, fontSize: "clamp(64px, 10vw, 128px)", fontWeight: 400, color: C.champagne, letterSpacing: "-0.04em", lineHeight: 0.85 }}>0</span>
          {unit && <span style={{ fontFamily: sans, fontSize: "clamp(16px, 2vw, 24px)", fontWeight: 300, color: C.champagne, opacity: 0.55, marginTop: "8px" }}>{unit}</span>}
        </div>
      </div>
      <div style={{ paddingTop: "8px" }}>
        <div style={{ fontFamily: sans, fontSize: "9px", letterSpacing: "0.28em", color: "rgba(201,168,76,0.6)", textTransform: "uppercase", marginBottom: "16px", fontWeight: 300 }}>{label}</div>
        <p style={{ fontFamily: sans, fontSize: "clamp(13px, 1.5vw, 15px)", lineHeight: 1.95, color: "rgba(245,240,232,0.6)", maxWidth: "520px", fontWeight: 300 }}>{prose}</p>
      </div>
    </div>
  );
}

function SustainabilitySection() {
  const { d } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const heroImgRef = useRef<HTMLImageElement>(null);
  useLabelReveal(sectionRef);
  useParallax(heroImgRef, { yPercent: 14 });

  return (
    <section ref={sectionRef} style={{ backgroundColor: C.green, overflow: "hidden" }}>
      <div style={{ position: "relative", height: "clamp(300px, 72vh, 600px)", overflow: "hidden" }}>
        <img ref={heroImgRef} src={IMG.vineyardMist} alt="AZGRANATA sustainable vineyard at dawn" loading="lazy" decoding="async" style={{ width: "100%", height: "115%", objectFit: "cover", objectPosition: "center 35%" }} />
        <Grain opacity={0.04} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(44,74,62,0.25) 0%, rgba(44,74,62,0.85) 100%)" }} />
        <div className="sec-px" style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end", paddingBottom: "clamp(40px, 5vw, 72px)" }}>
          <ChapterLabel number="07" title={d.ch07Label} light />
          <Reveal y={24}>
            <h2 style={{ fontFamily: serif, fontSize: "clamp(32px, 6.5vw, 88px)", fontWeight: 400, color: "#fff", lineHeight: 0.95, letterSpacing: "-0.025em" }}>
              <Tx v={d.ch07H[0]} /><br /><em style={{ fontStyle: "italic", color: "rgba(255,255,255,0.5)" }}><Tx v={d.ch07H[1]} /></em>
            </h2>
          </Reveal>
        </div>
      </div>
      <div className="sec-px" style={{ paddingTop: "clamp(60px, 8vw, 120px)", paddingBottom: "clamp(60px, 8vw, 120px)" }}>
        {SUSTAIN_VALUES.map((value, i) => (
          <StatRow key={i} value={value} unit={SUSTAIN_UNITS[i]} label={d.sustainLabels[i]} prose={`${value}${SUSTAIN_UNITS[i]} ${d.sustainProse[i]}`} index={i} />
        ))}
      </div>
      <div className="sec-px" style={{ paddingBottom: "clamp(60px, 8vw, 120px)" }}>
        <div className="s-cols">
          {d.sustainPillars.map((title, i) => (
            <Reveal key={title} delay={i * 0.16} y={20}>
              <div style={{ borderTop: `1px solid rgba(201,168,76,0.2)`, paddingTop: "28px" }}>
                <h4 style={{ fontFamily: serif, fontSize: "20px", fontWeight: 400, color: C.ivory, marginBottom: "16px", letterSpacing: "-0.01em" }}>{title}</h4>
                <p style={{ fontFamily: sans, fontSize: "13px", lineHeight: 1.95, color: "rgba(245,240,232,0.52)", fontWeight: 300 }}>{d.sustainPillarDesc[i]}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CHAPTER 08: PEOPLE ──────────────────────────────────────────────────────
const PEOPLE_DATA = [
  { name: "Rauf Aliyev", img: IMG.farmer },
  { name: "Aynur Hasanova", img: IMG.harvest },
  { name: "Elchin Mammadov", img: IMG.barrels },
  { name: "Leyla Guliyeva", img: IMG.wineBarrels },
];

function PersonCard({ person, index, delay, offsetTop = 0, flex }: { person: typeof PEOPLE_DATA[0]; index: number; delay: number; offsetTop?: number; flex: string }) {
  const { d } = useLang();
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const { isMobile } = useBreakpoint();
  useClipReveal(containerRef, { delay, start: "top 90%" });
  useParallax(imgRef, { yPercent: 10 });

  return (
    <div className="group" style={{ cursor: "pointer", marginTop: isMobile ? 0 : offsetTop, flex, minWidth: 0 }}>
      <div ref={containerRef} style={{ position: "relative", overflow: "hidden", aspectRatio: "3/4", backgroundColor: C.stone }}>
        <img ref={imgRef} src={person.img} alt={`${person.name}, ${d.personRoles[index]} at AZGRANATA`} loading="lazy" decoding="async"
          style={{ width: "100%", height: "115%", objectFit: "cover", objectPosition: "center 20%", filter: "grayscale(100%) brightness(0.9)", transition: "filter 1.1s ease" }}
          className="group-hover:[filter:grayscale(0%)_brightness(1)]" />
        <Grain opacity={0.05} />
      </div>
      <Reveal delay={delay + 0.25} y={14}>
        <div style={{ marginTop: "20px" }}>
          <div style={{ fontFamily: serif, fontSize: "clamp(17px, 2vw, 22px)", fontWeight: 400, color: C.dark, marginBottom: "5px" }}>{person.name}</div>
          <div style={{ fontFamily: sans, fontSize: "9px", letterSpacing: "0.2em", color: C.stone, textTransform: "uppercase", marginBottom: "4px", fontWeight: 300 }}><Tx v={d.personRoles[index]} tag="span" /></div>
          <div style={{ fontFamily: sans, fontSize: "10px", color: C.champagne, marginBottom: "14px" }}>{["23 years", "17 years", "12 years", "19 years"][index]}</div>
          <div style={{ fontFamily: serif, fontStyle: "italic", fontSize: "13px", color: C.stone, opacity: 0.72, lineHeight: 1.6 }}>
            "<Tx v={d.personQuotes[index]} tag="span" />"
          </div>
        </div>
      </Reveal>
    </div>
  );
}

function PeopleSection() {
  const { d } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  useLabelReveal(sectionRef);

  return (
    <section ref={sectionRef} id="people" className="sec-pad" style={{ backgroundColor: C.ivory }}>
      <ChapterLabel number="08" title={d.ch08Label} />
      <Reveal y={24}>
        <h2 style={{ fontFamily: serif, fontSize: "clamp(36px, 6.5vw, 88px)", fontWeight: 400, color: C.dark, lineHeight: 0.94, marginBottom: "clamp(56px, 7vw, 96px)", letterSpacing: "-0.025em" }}>
          <Tx v={d.ch08H[0]} /><br /><em style={{ fontStyle: "italic", color: C.stone }}><Tx v={d.ch08H[1]} /></em>
        </h2>
      </Reveal>
      <div className="p-row people-grid-row" style={{ marginBottom: "24px" }}>
        <PersonCard person={PEOPLE_DATA[0]} index={0} delay={0} flex="0 0 58%" />
        <PersonCard person={PEOPLE_DATA[1]} index={1} delay={0.18} offsetTop={96} flex="0 0 calc(42% - 24px)" />
      </div>
      <div className="p-row people-grid-row">
        <PersonCard person={PEOPLE_DATA[2]} index={2} delay={0.1} offsetTop={48} flex="0 0 calc(42% - 24px)" />
        <PersonCard person={PEOPLE_DATA[3]} index={3} delay={0.22} flex="0 0 58%" />
      </div>
    </section>
  );
}

// ─── TOUR DATA ────────────────────────────────────────────────────────────────
const TOURS = [
  {
    id: "classic",
    filter: "Tours",
    badge: null as string | null,
    title: "Classic Winery Tour",
    desc: "Join our expert guide and discover the complete journey of our wines — from the vineyard to cellar, production facilities and tasting rooms.",
    includes: ["Guided winery tour", "Vineyard walk", "Wine tasting (3 varieties)", "Cheese platter"],
    duration: "1.5 Hours",
    price: "From 20 ₼",
    priceNote: "per person",
    img: "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800&h=560&fit=crop&auto=format",
  },
  {
    id: "discovery",
    filter: "Tastings",
    badge: "Most Popular" as string | null,
    title: "Wine Discovery",
    desc: "An immersive tasting journey through our finest estate wines, guided by our Head Winemaker with paired Azerbaijani delicacies.",
    includes: ["Tasting of 6 premium wines", "Guided cellar tour", "Local cheese & charcuterie", "Wine education seminar"],
    duration: "2 Hours",
    price: "From 35 ₼",
    priceNote: "per person",
    img: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&h=560&fit=crop&auto=format",
  },
  {
    id: "premium",
    filter: "Tastings",
    badge: "Seasonal" as string | null,
    title: "Premium Tasting",
    desc: "An exclusive tasting of our reserve and vintage wines in a private setting — a deeply personal encounter with our finest bottles.",
    includes: ["8 reserve & vintage wines", "Private tasting room", "Distillery tour", "Curated cheese board", "Sommelier notes"],
    duration: "2.5 Hours",
    price: "From 55 ₼",
    priceNote: "per person",
    img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=560&fit=crop&auto=format",
  },
  {
    id: "family",
    filter: "Family",
    badge: null as string | null,
    title: "Family Vineyard Tour",
    desc: "A leisurely stroll through our vineyard estate for all ages — with non-alcoholic tastings, harvest activities and a garden picnic.",
    includes: ["Vineyard walk", "Harvest experience (seasonal)", "Non-alcoholic tasting", "Garden picnic", "Children's activities"],
    duration: "3 Hours",
    price: "Group: 60 ₼",
    priceNote: "up to 6 persons",
    img: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&h=560&fit=crop&auto=format",
  },
  {
    id: "gastronomy",
    filter: "Gastronomy",
    badge: null as string | null,
    title: "Wine & Gastronomy",
    desc: "A five-course Azerbaijani tasting menu paired wine-by-wine with our estate collection — hosted in our private dining pavilion.",
    includes: ["5-course tasting menu", "Wine pairing (5 pours)", "Private dining room", "Museum visit", "Personalized cellar tour"],
    duration: "3.5 Hours",
    price: "From 90 ₼",
    priceNote: "per person",
    img: "https://images.unsplash.com/photo-1544148103-0773bf10d330?w=800&h=560&fit=crop&auto=format",
  },
];

type TourItem = typeof TOURS[0];

// ─── TOUR CARD ────────────────────────────────────────────────────────────────
function TourCard({ tour, delay, bookLabel }: { tour: TourItem; delay: number; bookLabel: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [hov, setHov] = useState(false);
  const rm = useReducedMotion();

  useEffect(() => {
    const el = wrapRef.current; if (!el) return;
    if (rm) { gsap.set(el, { opacity: 1, y: 0 }); return; }
    const ctx = gsap.context(() => {
      gsap.fromTo(el, { opacity: 0, y: 28 }, {
        opacity: 1, y: 0, duration: 1.2, delay,
        ease: "expo.out",
        scrollTrigger: { trigger: el, start: "top 92%" },
      });
    });
    return () => ctx.revert();
  }, []); // eslint-disable-line

  const enter = () => {
    setHov(true);
    if (imgRef.current) gsap.to(imgRef.current, { scale: 1.06, duration: 2.2, ease: "expo.out" });
    if (cardRef.current) gsap.to(cardRef.current, { y: -5, boxShadow: "0 28px 72px rgba(58,58,58,0.11)", duration: 0.65, ease: "expo.out" });
  };
  const leave = () => {
    setHov(false);
    if (imgRef.current) gsap.to(imgRef.current, { scale: 1, duration: 2.0, ease: "expo.out" });
    if (cardRef.current) gsap.to(cardRef.current, { y: 0, boxShadow: "0 2px 16px rgba(58,58,58,0.05)", duration: 0.65, ease: "expo.out" });
  };

  return (
    <div ref={wrapRef} style={{ opacity: 0, height: "100%" }}>
      <div ref={cardRef} onMouseEnter={enter} onMouseLeave={leave}
        style={{ backgroundColor: "#FEFCF9", border: `1px solid ${C.stoneDim}`, overflow: "hidden", cursor: "pointer", boxShadow: "0 2px 16px rgba(58,58,58,0.05)", height: "100%", display: "flex", flexDirection: "column", transition: "border-color 0.45s ease" }}>

        {/* Image */}
        <div style={{ position: "relative", height: "240px", overflow: "hidden", backgroundColor: C.stone, flexShrink: 0 }}>
          <img ref={imgRef} src={tour.img} alt={tour.title} loading="lazy" decoding="async"
            style={{ width: "100%", height: "100%", objectFit: "cover", transformOrigin: "center" }} />
          <Grain opacity={0.04} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(26,23,20,0.38) 0%, transparent 55%)", pointerEvents: "none" }} />

          {/* Seasonal badge */}
          {tour.badge === "Seasonal" && (
            <div style={{ position: "absolute", top: "14px", left: "16px", backgroundColor: C.green, fontFamily: sans, fontSize: "8px", letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "#fff", fontWeight: 300, padding: "5px 12px", zIndex: 4 }}>
              Seasonal
            </div>
          )}

          {/* Most Popular ribbon */}
          {tour.badge === "Most Popular" && (
            <div style={{ position: "absolute", top: 0, right: 0, width: "88px", height: "88px", overflow: "hidden", pointerEvents: "none", zIndex: 4 }}>
              <div style={{ position: "absolute", top: "18px", right: "-24px", width: "110px", transform: "rotate(45deg)", backgroundColor: C.champagne, fontFamily: sans, fontSize: "7px", letterSpacing: "0.14em", textTransform: "uppercase" as const, color: C.dark, fontWeight: 500, textAlign: "center" as const, padding: "6px 0" }}>
                Popular
              </div>
            </div>
          )}
        </div>

        {/* Card body */}
        <div style={{ padding: "28px 28px 32px", display: "flex", flexDirection: "column", flex: 1 }}>
          {/* Category */}
          <div style={{ fontFamily: sans, fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase" as const, color: C.champagne, marginBottom: "10px", fontWeight: 300 }}>
            {tour.filter}
          </div>

          {/* Title */}
          <div style={{ fontFamily: serif, fontSize: "clamp(20px, 2.2vw, 24px)", fontWeight: 400, color: C.dark, lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: "12px" }}>
            {tour.title}
          </div>

          {/* Description */}
          <p style={{ fontFamily: serif, fontStyle: "italic", fontSize: "13px", color: C.stone, lineHeight: 1.8, marginBottom: "22px", fontWeight: 400 }}>
            {tour.desc}
          </p>

          <div style={{ height: "1px", backgroundColor: C.stoneDim, marginBottom: "18px" }} />

          {/* Includes */}
          <div style={{ marginBottom: "22px", flex: 1 }}>
            {tour.includes.map((item) => (
              <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "8px" }}>
                <span style={{ width: "4px", height: "4px", borderRadius: "50%", backgroundColor: C.champagne, flexShrink: 0, marginTop: "6px" }} />
                <span style={{ fontFamily: sans, fontSize: "12px", color: C.charcoal, fontWeight: 300, lineHeight: 1.5 }}>{item}</span>
              </div>
            ))}
          </div>

          <div style={{ height: "1px", backgroundColor: C.stoneDim, marginBottom: "20px" }} />

          {/* Duration + Price */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "24px" }}>
            <div>
              <div style={{ fontFamily: sans, fontSize: "9px", letterSpacing: "0.18em", textTransform: "uppercase" as const, color: C.stone, marginBottom: "5px", fontWeight: 300 }}>Duration</div>
              <div style={{ fontFamily: serif, fontSize: "17px", color: C.dark, letterSpacing: "-0.01em", fontWeight: 400 }}>{tour.duration}</div>
            </div>
            <div style={{ textAlign: "right" as const }}>
              <div style={{ fontFamily: sans, fontSize: "9px", letterSpacing: "0.18em", textTransform: "uppercase" as const, color: C.stone, marginBottom: "5px", fontWeight: 300 }}>Price</div>
              <div style={{ fontFamily: serif, fontSize: "20px", fontWeight: 400, color: C.burgundy, letterSpacing: "-0.02em" }}>{tour.price}</div>
              <div style={{ fontFamily: sans, fontSize: "10px", color: C.stone, fontWeight: 300, marginTop: "2px" }}>{tour.priceNote}</div>
            </div>
          </div>

          {/* Book Tour CTA */}
          <button
            style={{ width: "100%", fontFamily: sans, fontSize: "9px", letterSpacing: "0.22em", fontWeight: 300, color: hov ? C.ivory : C.dark, backgroundColor: hov ? C.dark : "transparent", border: `1px solid ${hov ? C.dark : C.stoneDim}`, cursor: "pointer", textTransform: "uppercase" as const, padding: "15px 20px", display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", transition: "color 0.35s ease, background-color 0.35s ease, border-color 0.35s ease" }}>
            {bookLabel} <ArrowRight size={10} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── CHAPTER 09: WINERY TOUR ──────────────────────────────────────────────────
function WineryTourSection() {
  const { d } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const h2Ref = useRef<HTMLHeadingElement>(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const { isDesktop } = useBreakpoint();
  const FILTER_KEYS = ["All", "Tours", "Tastings", "Gastronomy", "Family"];

  useLabelReveal(sectionRef);
  useWordReveal(h2Ref as React.RefObject<HTMLElement>, { start: "top 83%", stagger: 0.09 });

  const tourFilters = d.tourFilters as readonly string[];
  const visibleTours = activeFilter === "All" ? TOURS : TOURS.filter((t) => t.filter === activeFilter);

  return (
    <section ref={sectionRef} className="sec-pad" style={{ backgroundColor: C.ivoryDeep, position: "relative" }}>
      <Grain opacity={0.025} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <ChapterLabel number="09" title={d.tourLabel} />

        {/* Section header */}
        <div style={{ display: "grid", gridTemplateColumns: isDesktop ? "1fr 1fr" : "1fr", gap: "clamp(28px, 4vw, 72px)", alignItems: "flex-end", marginBottom: "clamp(48px, 5vw, 72px)" }}>
          <h2 ref={h2Ref} aria-label={`${d.tourH[0]} ${d.tourH[1]}`}
            style={{ fontFamily: serif, fontSize: "clamp(38px, 7vw, 100px)", fontWeight: 400, color: C.dark, lineHeight: 0.93, letterSpacing: "-0.025em" }}>
            {(d.tourH[0] as string).split(" ").map((w, i, a) => (
              <span key={`th0-${i}`} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom", paddingBottom: "0.04em", marginRight: i < a.length - 1 ? "0.25em" : 0 }}>
                <span className="gw" style={{ display: "inline-block" }}>{w}</span>
              </span>
            ))}
            <br />
            {(d.tourH[1] as string).split(" ").map((w, i, a) => (
              <span key={`th1-${i}`} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom", paddingBottom: "0.04em", marginRight: i < a.length - 1 ? "0.25em" : 0 }}>
                <em className="gw" style={{ display: "inline-block", fontStyle: "italic", color: C.champagne }}>{w}</em>
              </span>
            ))}
          </h2>

          <Reveal delay={0.3} y={16}>
            <p style={{ fontFamily: serif, fontStyle: "italic", fontSize: "clamp(14px, 1.6vw, 18px)", color: C.stone, lineHeight: 1.85, maxWidth: "480px" }}>
              {d.tourSub}
            </p>
          </Reveal>
        </div>

        {/* Hairline + Filters */}
        <div style={{ borderTop: `1px solid ${C.stoneDim}`, paddingTop: "32px", marginBottom: "48px", display: "flex", alignItems: "center", gap: "clamp(16px, 3vw, 40px)", flexWrap: "wrap" as const }}>
          {tourFilters.map((label, i) => {
            const key = FILTER_KEYS[i] ?? "All";
            const isActive = activeFilter === key;
            return (
              <button key={label}
                onClick={() => setActiveFilter(key)}
                style={{ fontFamily: sans, fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase" as const, color: isActive ? C.dark : C.stone, background: "none", border: "none", borderBottom: isActive ? `1px solid ${C.champagne}` : "1px solid transparent", cursor: "pointer", padding: "6px 0 8px", fontWeight: isActive ? 400 : 300, transition: "color 0.3s ease, border-color 0.3s ease" }}
                onMouseEnter={(e) => { if (!isActive) gsap.to(e.currentTarget, { color: C.charcoal, duration: 0.25 }); }}
                onMouseLeave={(e) => { if (!isActive) gsap.to(e.currentTarget, { color: C.stone, duration: 0.3 }); }}>
                {label}
              </button>
            );
          })}
          <div style={{ marginLeft: "auto", fontFamily: sans, fontSize: "9px", letterSpacing: "0.18em", color: "rgba(184,173,158,0.5)", fontWeight: 300 }}>
            AZ · EN · RU
          </div>
        </div>

        {/* Tour Grid */}
        <div className="tour-grid" style={{ alignItems: "start" }}>
          {visibleTours.map((tour, i) => (
            <TourCard
              key={`${tour.id}-${activeFilter}`}
              tour={tour}
              delay={i * 0.07}
              bookLabel={d.tourBook as string}
            />
          ))}
        </div>

        {/* Editorial footer note */}
        <Reveal delay={0.2} y={12}>
          <div style={{ borderTop: `1px solid ${C.stoneDim}`, marginTop: "clamp(48px, 5vw, 80px)", paddingTop: "28px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" as const, gap: "16px" }}>
            <p style={{ fontFamily: sans, fontSize: "11px", color: C.stone, fontWeight: 300, letterSpacing: "0.04em", lineHeight: 1.7, maxWidth: "480px" }}>
              Tours depart from the AZGRANATA Estate, Shirvan Valley. Advance booking recommended. Group rates available upon request.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <span style={{ fontFamily: sans, fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase" as const, color: C.stone, fontWeight: 300 }}>Shirvan Valley · Azerbaijan</span>
              <span style={{ width: "20px", height: "1px", backgroundColor: C.champagne, display: "inline-block", opacity: 0.5 }} />
              <span style={{ fontFamily: sans, fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase" as const, color: C.champagne, fontWeight: 300 }}>tours@azgranata.az</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── FINAL ────────────────────────────────────────────────────────────────────
function FinalSection() {
  const { d } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const h2Ref = useRef<HTMLHeadingElement>(null);
  const { isMobile } = useBreakpoint();
  useWordReveal(h2Ref as React.RefObject<HTMLElement>, { start: "top 80%", stagger: 0.08 });

  useEffect(() => {
    const s = sectionRef.current; if (!s) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".c-col", { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.14, duration: 1.0, ease: "expo.out", scrollTrigger: { trigger: ".c-grid", start: "top 88%" } });
    }, s);
    return () => ctx.revert();
  }, []);

  const contactContent = [
    { lines: ["AZGRANATA Holding", "Nizami District, Baku", "AZ1000, Azerbaijan"] },
    { lines: ["export@azgranata.az", "+994 12 000 0000"] },
    { lines: ["media@azgranata.az", "+994 12 000 0001"] },
  ];

  return (
    <section ref={sectionRef} id="final" className="sec-pad" style={{ position: "relative", overflow: "hidden", backgroundColor: C.dark }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${IMG.vineyardRows})`, backgroundSize: "cover", backgroundPosition: "center", opacity: 0.08, mixBlendMode: "luminosity" as React.CSSProperties["mixBlendMode"] }} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <h2 ref={h2Ref} aria-label={d.finalH.flat().join(" ")}
          style={{ fontFamily: serif, fontSize: "clamp(40px, 10vw, 136px)", fontWeight: 400, color: "#fff", lineHeight: 0.92, marginBottom: "clamp(24px, 3vw, 40px)", letterSpacing: "-0.025em", maxWidth: "1000px" }}>
          {d.finalH[0].map((w, i, a) => (
            <span key={`${w}-${i}`} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom", paddingBottom: "0.04em" }}>
              <span className="gw" style={{ display: "inline-block" }}>{w}{i < a.length - 1 ? " " : ""}</span>
            </span>
          ))}
          <br />
          {d.finalH[1].map((w, i) => (
            <span key={`${w}-f-${i}`} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom", paddingBottom: "0.04em", marginRight: "0.2em" }}>
              <em className="gw" style={{ display: "inline-block", fontStyle: "italic", color: C.champagne }}>{w}</em>
            </span>
          ))}
        </h2>

        <Reveal delay={0.2} y={16}>
          <Tx v={d.finalSub} tag="p" style={{ fontFamily: serif, fontStyle: "italic", fontSize: "clamp(15px, 2vw, 18px)", color: "rgba(184,173,158,0.5)", marginBottom: "clamp(56px, 7vw, 96px)", lineHeight: 1.7, maxWidth: "480px" }} />
        </Reveal>

        <div className="c-grid" style={{ borderTop: `1px solid rgba(201,168,76,0.12)`, paddingTop: "clamp(40px, 5vw, 72px)", marginBottom: "clamp(48px, 6vw, 80px)", gap: "clamp(28px, 4vw, 0px)" }}>
          {contactContent.map((col, i) => (
            <div key={i} className="c-col" style={{ paddingRight: isMobile ? 0 : "52px", borderRight: !isMobile && i < 2 ? `1px solid rgba(201,168,76,0.08)` : "none", paddingLeft: !isMobile && i > 0 ? "52px" : 0, opacity: 0 }}>
              <Tx v={d.contactLabels[i]} style={{ fontFamily: sans, fontSize: "9px", letterSpacing: "0.28em", color: C.champagne, textTransform: "uppercase", marginBottom: "20px", fontWeight: 300, display: "block" }} />
              {col.lines.map((line) => <div key={line} style={{ fontFamily: sans, fontSize: "13px", color: "rgba(184,173,158,0.62)", lineHeight: 2.0, fontWeight: 300 }}>{line}</div>)}
            </div>
          ))}
        </div>

        <Reveal delay={0.35} y={16}>
          <button style={{ fontFamily: sans, fontSize: "9px", letterSpacing: "0.28em", fontWeight: 300, color: C.dark, backgroundColor: C.champagne, border: "none", cursor: "pointer", textTransform: "uppercase", padding: isMobile ? "18px 36px" : "22px 56px", display: "inline-flex", alignItems: "center", gap: "16px" }}
            onMouseEnter={(e) => gsap.to(e.currentTarget, { backgroundColor: C.ivory, duration: 0.4, ease: "expo.out" })}
            onMouseLeave={(e) => gsap.to(e.currentTarget, { backgroundColor: C.champagne, duration: 0.4, ease: "expo.out" })}>
            <Tx v={d.cta} tag="span" /> <ArrowRight size={12} />
          </button>
        </Reveal>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  const { d } = useLang();
  return (
    <footer style={{ backgroundColor: C.deeper, paddingTop: "clamp(56px, 7vw, 96px)", paddingBottom: "clamp(32px, 4vw, 48px)", borderTop: `1px solid rgba(201,168,76,0.07)` }} className="sec-px">
      <div className="f-top" style={{ marginBottom: "clamp(48px, 6vw, 80px)" }}>
        <div style={{ maxWidth: "280px" }}>
          <div style={{ fontFamily: serif, fontSize: "17px", fontWeight: 400, letterSpacing: "0.2em", color: C.ivory, marginBottom: "18px" }}>AZGRANATA</div>
          <Tx v={d.fTagline} tag="p" style={{ fontFamily: sans, fontSize: "13px", color: "rgba(184,173,158,0.45)", lineHeight: 1.95, fontWeight: 300 }} />
          <div style={{ marginTop: "24px", fontFamily: sans, fontSize: "9px", letterSpacing: "0.22em", color: "rgba(201,168,76,0.28)", textTransform: "uppercase", fontWeight: 300 }}>41°24'N · 49°51'E</div>
        </div>
        <div className="f-cols-grid">
          {d.fCols.map((head, ci) => (
            <div key={head}>
              <Tx v={head} tag="div" style={{ fontFamily: sans, fontSize: "9px", letterSpacing: "0.26em", color: C.champagne, textTransform: "uppercase", marginBottom: "20px", fontWeight: 300 }} />
              {d.fLinks[ci].map((link, li) => (
                <Tx key={li} v={link} tag="div"
                  style={{ fontFamily: sans, fontSize: "12px", color: "rgba(184,173,158,0.4)", marginBottom: "10px", cursor: "pointer", fontWeight: 300 }}
                  className="footer-link"
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <Hairline margin="0" />
      <div style={{ paddingTop: "28px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
        <Tx v={d.fCopy} tag="div" style={{ fontFamily: sans, fontSize: "10px", color: "rgba(184,173,158,0.35)", letterSpacing: "0.06em", fontWeight: 300 }} />
        <Tx v={d.fLoc} tag="div" style={{ fontFamily: sans, fontSize: "10px", color: "rgba(184,173,158,0.35)", letterSpacing: "0.06em", fontWeight: 300 }} />
      </div>
      <style>{`.footer-link:hover { color: rgba(184,173,158,0.72) !important; }`}</style>
    </footer>
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
export default function FigmaHome() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    document.body.style.overflowX = "hidden";
    return () => { document.body.style.overflowX = ""; };
  }, []);

  return (
    <LangProvider>
      <style>{GLOBAL_CSS}</style>
      <div style={{ backgroundColor: C.ivory, fontFamily: sans, position: "relative" }}>
        <Preloader onComplete={() => setLoaded(true)} />
        {loaded && (
          <>
            <Nav />
            <HeroSection />
            <FoundationSection />
            <HouseSection />
            <BrandsSection />
            <GlobalSection />
            <JournalSection />
            <SustainabilitySection />
            <PeopleSection />
            <WineryTourSection />
            <FinalSection />
            <Footer />
          </>
        )}
      </div>
    </LangProvider>
  );
}
