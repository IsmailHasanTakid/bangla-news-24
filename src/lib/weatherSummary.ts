type Hourly = {
    label: string;
    temp: number;
    feels: number;
    humidity: number;
    rainProb: number;
    wind: number;
};

type Daily = {
    label: string;
    max: number;
    min: number;
    rainProb: number;
    rainSum: number;
};

export type SummaryItem = { icon: string; title: string; text: string };

export type Summary = {
    intro: string;
    items: SummaryItem[];
    tips: string[];
};

const bn = (n: number, d = 0) =>
    n.toLocaleString("bn-BD", { maximumFractionDigits: d });

const tempFeel = (t: number) =>
    t < 15 ? "বেশ শীতল" : t < 25 ? "মনোরম" : t < 32 ? "উষ্ণ" : t < 36 ? "গরম" : "প্রচণ্ড গরম";

const humidityFeel = (h: number) =>
    h < 40 ? "বাতাস শুষ্ক" : h < 70 ? "আর্দ্রতা স্বাভাবিক" : "বাতাস বেশ ভ্যাপসা ও আর্দ্র";

const windFeel = (w: number) =>
    w < 10 ? "মৃদু বাতাস" : w < 25 ? "মাঝারি বাতাস" : w < 40 ? "জোরালো বাতাস" : "ঝোড়ো বাতাস";

export function buildSummary(
    districtName: string,
    hourly: Hourly[],
    daily: Daily[]
): Summary | null {
    if (hourly.length === 0 || daily.length === 0) return null;

    const items: SummaryItem[] = [];
    const tips: string[] = [];

    // ---------- তাপমাত্রা (আগামী ২৪ ঘণ্টা) ----------
    const temps = hourly.map((h) => h.temp);
    const maxT = Math.max(...temps);
    const minT = Math.min(...temps);
    const maxH = hourly[temps.indexOf(maxT)];
    const minH = hourly[temps.indexOf(minT)];
    const now = hourly[0];
    const feelsDiff = Math.round(now.feels - now.temp);

    let tempText = `এখন তাপমাত্রা প্রায় ${bn(Math.round(now.temp))}°সে. এবং আবহাওয়া ${tempFeel(now.temp)}। আগামী ২৪ ঘণ্টায় সবচেয়ে গরম থাকবে ${maxH.label} নাগাদ (প্রায় ${bn(Math.round(maxT))}°সে.), আর সবচেয়ে ঠান্ডা থাকবে ${minH.label} নাগাদ (প্রায় ${bn(Math.round(minT))}°সে.)।`;
    if (feelsDiff >= 3) {
        tempText += ` আর্দ্রতার কারণে বাস্তবে গরম লাগবে আরও প্রায় ${bn(feelsDiff)}° বেশি।`;
    } else if (feelsDiff <= -3) {
        tempText += ` বাতাসের কারণে বাস্তবে আরও ঠান্ডা লাগতে পারে।`;
    }
    items.push({ icon: "🌡️", title: "তাপমাত্রা", text: tempText });

    if (maxT >= 35) tips.push("দুপুরে বাইরে যেতে হলে ছাতা বা টুপি ব্যবহার করুন এবং প্রচুর পানি পান করুন।");
    if (minT <= 15) tips.push("সকাল ও রাতে ঠান্ডা থাকবে, হালকা গরম কাপড় সঙ্গে রাখুন।");

    // ---------- সপ্তাহের ধারা ----------
    const hottest = daily.reduce((a, b) => (b.max > a.max ? b : a));
    const coolest = daily.reduce((a, b) => (b.max < a.max ? b : a));
    const diff = daily[daily.length - 1].max - daily[0].max;
    const trend =
        diff >= 2
            ? "সপ্তাহের শেষের দিকে তাপমাত্রা একটু বাড়ার ইঙ্গিত আছে।"
            : diff <= -2
                ? "সপ্তাহের শেষের দিকে তাপমাত্রা একটু কমার ইঙ্গিত আছে।"
                : "পুরো সপ্তাহে তাপমাত্রা মোটামুটি একই রকম থাকবে।";
    items.push({
        icon: "📈",
        title: "সপ্তাহের ধারা",
        text: `আগামী ৭ দিনে সবচেয়ে গরম দিন হতে পারে ${hottest.label} (সর্বোচ্চ ${bn(Math.round(hottest.max))}°সে.) এবং তুলনামূলক কম গরম ${coolest.label} (সর্বোচ্চ ${bn(Math.round(coolest.max))}°সে.)। ${trend}`,
    });

    // ---------- বৃষ্টি ----------
    const next24Rain = Math.max(...hourly.map((h) => h.rainProb));
    const peakRain = daily.reduce((a, b) => (b.rainProb > a.rainProb ? b : a));
    const totalRain = daily.reduce((s, d) => s + d.rainSum, 0);
    const rainyDays = daily.filter((d) => d.rainProb >= 50).length;

    let rainText: string;
    if (peakRain.rainProb < 20 && totalRain < 1) {
        rainText = "আগামী ৭ দিনে বৃষ্টির সম্ভাবনা খুবই কম। আকাশ মূলত শুকনো থাকবে।";
    } else {
        rainText = `আগামী ২৪ ঘণ্টায় বৃষ্টির সর্বোচ্চ সম্ভাবনা ${bn(next24Rain)}%। সপ্তাহে বৃষ্টির সবচেয়ে বেশি সম্ভাবনা ${peakRain.label} (${bn(peakRain.rainProb)}%)। ${rainyDays > 0 ? `মোট ${bn(rainyDays)} দিনে বৃষ্টির সম্ভাবনা ৫০% বা তার বেশি।` : "তবে কোনো দিনই বৃষ্টির সম্ভাবনা খুব বেশি নয়।"
            } ৭ দিনে মোট প্রায় ${bn(totalRain, 1)} মিমি বৃষ্টি হতে পারে।`;
    }
    items.push({ icon: "🌧️", title: "বৃষ্টি", text: rainText });

    if (next24Rain >= 50) tips.push("আজ বৃষ্টির সম্ভাবনা বেশি, বের হলে ছাতা বা রেইনকোট সঙ্গে রাখুন।");
    else if (rainyDays > 0) tips.push(`${peakRain.label} বৃষ্টির সম্ভাবনা বেশি, ওই দিনের পরিকল্পনা আগে থেকে ভেবে রাখুন।`);

    // ---------- আর্দ্রতা ----------
    const avgHum = hourly.reduce((s, h) => s + h.humidity, 0) / hourly.length;
    items.push({
        icon: "💧",
        title: "আর্দ্রতা",
        text: `আগামী ২৪ ঘণ্টায় গড় আর্দ্রতা প্রায় ${bn(Math.round(avgHum))}%, অর্থাৎ ${humidityFeel(avgHum)}।${avgHum >= 75 ? " এ কারণে ঘাম বেশি হবে এবং গরম বেশি অনুভূত হতে পারে।" : ""
            }`,
    });

    // ---------- বাতাস ----------
    const avgWind = hourly.reduce((s, h) => s + h.wind, 0) / hourly.length;
    const maxWind = Math.max(...hourly.map((h) => h.wind));
    items.push({
        icon: "💨",
        title: "বাতাস",
        text: `গড় বাতাসের গতি প্রায় ${bn(Math.round(avgWind))} কিমি/ঘণ্টা (${windFeel(avgWind)})। সবচেয়ে জোরালো সময়ে গতি ${bn(Math.round(maxWind))} কিমি/ঘণ্টা পর্যন্ত হতে পারে।`,
    });

    if (maxWind >= 40) tips.push("বাতাস বেশ জোরালো হতে পারে, খোলা জায়গায় বা নদীপথে চলাচলে সতর্ক থাকুন।");
    if (avgHum >= 80 && maxT >= 32) tips.push("গরম ও আর্দ্রতা দুটোই বেশি, তাই শরীর যেন পানিশূন্য না হয় সেদিকে খেয়াল রাখুন।");

    const intro = `${districtName} জেলায় এখন আবহাওয়া ${tempFeel(now.temp)}। ${next24Rain >= 50 ? "আজ বৃষ্টির সম্ভাবনা বেশি।" : next24Rain >= 20 ? "আজ হালকা বৃষ্টির সম্ভাবনা আছে।" : "আজ বৃষ্টির সম্ভাবনা কম।"
        } নিচে চার্টের তথ্যগুলো সহজ ভাষায় লেখা হয়েছে।`;

    return { intro, items, tips };
}