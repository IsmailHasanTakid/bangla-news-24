export type District = {
    id: string;
    bn: string;
    division: string;
    lat: number;
    lon: number;
};

export const districts: District[] = [
    // ঢাকা বিভাগ
    { id: "dhaka", bn: "ঢাকা", division: "ঢাকা বিভাগ", lat: 23.8103, lon: 90.4125 },
    { id: "gazipur", bn: "গাজীপুর", division: "ঢাকা বিভাগ", lat: 23.9999, lon: 90.4203 },
    { id: "narayanganj", bn: "নারায়ণগঞ্জ", division: "ঢাকা বিভাগ", lat: 23.6238, lon: 90.5 },
    { id: "narsingdi", bn: "নরসিংদী", division: "ঢাকা বিভাগ", lat: 23.9322, lon: 90.7151 },
    { id: "manikganj", bn: "মানিকগঞ্জ", division: "ঢাকা বিভাগ", lat: 23.8617, lon: 90.0003 },
    { id: "munshiganj", bn: "মুন্সিগঞ্জ", division: "ঢাকা বিভাগ", lat: 23.5422, lon: 90.5305 },
    { id: "kishoreganj", bn: "কিশোরগঞ্জ", division: "ঢাকা বিভাগ", lat: 24.4449, lon: 90.7766 },
    { id: "tangail", bn: "টাঙ্গাইল", division: "ঢাকা বিভাগ", lat: 24.2513, lon: 89.9167 },
    { id: "faridpur", bn: "ফরিদপুর", division: "ঢাকা বিভাগ", lat: 23.607, lon: 89.8429 },
    { id: "gopalganj", bn: "গোপালগঞ্জ", division: "ঢাকা বিভাগ", lat: 23.0051, lon: 89.8266 },
    { id: "madaripur", bn: "মাদারীপুর", division: "ঢাকা বিভাগ", lat: 23.1641, lon: 90.1897 },
    { id: "rajbari", bn: "রাজবাড়ী", division: "ঢাকা বিভাগ", lat: 23.7574, lon: 89.6446 },
    { id: "shariatpur", bn: "শরীয়তপুর", division: "ঢাকা বিভাগ", lat: 23.2423, lon: 90.4348 },

    // চট্টগ্রাম বিভাগ
    { id: "chattogram", bn: "চট্টগ্রাম", division: "চট্টগ্রাম বিভাগ", lat: 22.3569, lon: 91.7832 },
    { id: "coxsbazar", bn: "কক্সবাজার", division: "চট্টগ্রাম বিভাগ", lat: 21.4272, lon: 92.0058 },
    { id: "cumilla", bn: "কুমিল্লা", division: "চট্টগ্রাম বিভাগ", lat: 23.4607, lon: 91.1809 },
    { id: "feni", bn: "ফেনী", division: "চট্টগ্রাম বিভাগ", lat: 23.0159, lon: 91.3976 },
    { id: "brahmanbaria", bn: "ব্রাহ্মণবাড়িয়া", division: "চট্টগ্রাম বিভাগ", lat: 23.9571, lon: 91.1119 },
    { id: "rangamati", bn: "রাঙ্গামাটি", division: "চট্টগ্রাম বিভাগ", lat: 22.6533, lon: 92.1753 },
    { id: "khagrachhari", bn: "খাগড়াছড়ি", division: "চট্টগ্রাম বিভাগ", lat: 23.1193, lon: 91.9847 },
    { id: "bandarban", bn: "বান্দরবান", division: "চট্টগ্রাম বিভাগ", lat: 22.1953, lon: 92.2184 },
    { id: "noakhali", bn: "নোয়াখালী", division: "চট্টগ্রাম বিভাগ", lat: 22.8696, lon: 91.0995 },
    { id: "lakshmipur", bn: "লক্ষ্মীপুর", division: "চট্টগ্রাম বিভাগ", lat: 22.9425, lon: 90.8412 },
    { id: "chandpur", bn: "চাঁদপুর", division: "চট্টগ্রাম বিভাগ", lat: 23.2333, lon: 90.6713 },

    // রাজশাহী বিভাগ
    { id: "rajshahi", bn: "রাজশাহী", division: "রাজশাহী বিভাগ", lat: 24.3745, lon: 88.6042 },
    { id: "bogura", bn: "বগুড়া", division: "রাজশাহী বিভাগ", lat: 24.8465, lon: 89.3773 },
    { id: "joypurhat", bn: "জয়পুরহাট", division: "রাজশাহী বিভাগ", lat: 25.0947, lon: 89.0945 },
    { id: "naogaon", bn: "নওগাঁ", division: "রাজশাহী বিভাগ", lat: 24.7936, lon: 88.9318 },
    { id: "natore", bn: "নাটোর", division: "রাজশাহী বিভাগ", lat: 24.4206, lon: 89.0 },
    { id: "chapainawabganj", bn: "চাঁপাইনবাবগঞ্জ", division: "রাজশাহী বিভাগ", lat: 24.5965, lon: 88.2775 },
    { id: "pabna", bn: "পাবনা", division: "রাজশাহী বিভাগ", lat: 24.0064, lon: 89.2372 },
    { id: "sirajganj", bn: "সিরাজগঞ্জ", division: "রাজশাহী বিভাগ", lat: 24.4534, lon: 89.7007 },

    // খুলনা বিভাগ
    { id: "khulna", bn: "খুলনা", division: "খুলনা বিভাগ", lat: 22.8456, lon: 89.5403 },
    { id: "bagerhat", bn: "বাগেরহাট", division: "খুলনা বিভাগ", lat: 22.6602, lon: 89.7895 },
    { id: "satkhira", bn: "সাতক্ষীরা", division: "খুলনা বিভাগ", lat: 22.7185, lon: 89.0705 },
    { id: "jashore", bn: "যশোর", division: "খুলনা বিভাগ", lat: 23.1667, lon: 89.2081 },
    { id: "jhenaidah", bn: "ঝিনাইদহ", division: "খুলনা বিভাগ", lat: 23.5448, lon: 89.1539 },
    { id: "magura", bn: "মাগুরা", division: "খুলনা বিভাগ", lat: 23.4873, lon: 89.4199 },
    { id: "narail", bn: "নড়াইল", division: "খুলনা বিভাগ", lat: 23.1725, lon: 89.5126 },
    { id: "kushtia", bn: "কুষ্টিয়া", division: "খুলনা বিভাগ", lat: 23.9013, lon: 89.1205 },
    { id: "chuadanga", bn: "চুয়াডাঙ্গা", division: "খুলনা বিভাগ", lat: 23.6402, lon: 88.8418 },
    { id: "meherpur", bn: "মেহেরপুর", division: "খুলনা বিভাগ", lat: 23.7622, lon: 88.6318 },

    // বরিশাল বিভাগ
    { id: "barishal", bn: "বরিশাল", division: "বরিশাল বিভাগ", lat: 22.701, lon: 90.3535 },
    { id: "bhola", bn: "ভোলা", division: "বরিশাল বিভাগ", lat: 22.6859, lon: 90.6482 },
    { id: "jhalokati", bn: "ঝালকাঠি", division: "বরিশাল বিভাগ", lat: 22.6406, lon: 90.1987 },
    { id: "patuakhali", bn: "পটুয়াখালী", division: "বরিশাল বিভাগ", lat: 22.3596, lon: 90.3299 },
    { id: "pirojpur", bn: "পিরোজপুর", division: "বরিশাল বিভাগ", lat: 22.5841, lon: 89.972 },
    { id: "barguna", bn: "বরগুনা", division: "বরিশাল বিভাগ", lat: 22.0953, lon: 90.1121 },

    // সিলেট বিভাগ
    { id: "sylhet", bn: "সিলেট", division: "সিলেট বিভাগ", lat: 24.8949, lon: 91.8687 },
    { id: "moulvibazar", bn: "মৌলভীবাজার", division: "সিলেট বিভাগ", lat: 24.4829, lon: 91.7774 },
    { id: "habiganj", bn: "হবিগঞ্জ", division: "সিলেট বিভাগ", lat: 24.3745, lon: 91.4156 },
    { id: "sunamganj", bn: "সুনামগঞ্জ", division: "সিলেট বিভাগ", lat: 25.0658, lon: 91.395 },

    // রংপুর বিভাগ
    { id: "rangpur", bn: "রংপুর", division: "রংপুর বিভাগ", lat: 25.7439, lon: 89.2752 },
    { id: "dinajpur", bn: "দিনাজপুর", division: "রংপুর বিভাগ", lat: 25.6279, lon: 88.6332 },
    { id: "gaibandha", bn: "গাইবান্ধা", division: "রংপুর বিভাগ", lat: 25.3288, lon: 89.543 },
    { id: "kurigram", bn: "কুড়িগ্রাম", division: "রংপুর বিভাগ", lat: 25.8054, lon: 89.6361 },
    { id: "lalmonirhat", bn: "লালমনিরহাট", division: "রংপুর বিভাগ", lat: 25.9923, lon: 89.2847 },
    { id: "nilphamari", bn: "নীলফামারী", division: "রংপুর বিভাগ", lat: 25.9318, lon: 88.856 },
    { id: "panchagarh", bn: "পঞ্চগড়", division: "রংপুর বিভাগ", lat: 26.3411, lon: 88.5542 },
    { id: "thakurgaon", bn: "ঠাকুরগাঁও", division: "রংপুর বিভাগ", lat: 26.0337, lon: 88.4616 },

    // ময়মনসিংহ বিভাগ
    { id: "mymensingh", bn: "ময়মনসিংহ", division: "ময়মনসিংহ বিভাগ", lat: 24.7471, lon: 90.4203 },
    { id: "jamalpur", bn: "জামালপুর", division: "ময়মনসিংহ বিভাগ", lat: 24.9375, lon: 89.9372 },
    { id: "netrokona", bn: "নেত্রকোণা", division: "ময়মনসিংহ বিভাগ", lat: 24.8709, lon: 90.7279 },
    { id: "sherpur", bn: "শেরপুর", division: "ময়মনসিংহ বিভাগ", lat: 25.0204, lon: 90.0153 },
];

export const defaultDistrict = districts[0];

export const findDistrict = (id?: string) =>
    districts.find((d) => d.id === id) ?? defaultDistrict;


// দুই স্থানাঙ্কের দূরত্ব (কিমি) - Haversine formula
function distanceKm(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371;
    const toRad = (x: number) => (x * Math.PI) / 180;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(a));
}

export function findNearestDistrict(lat: number, lon: number) {
    let best = districts[0];
    let bestKm = Infinity;
    for (const d of districts) {
        const km = distanceKm(lat, lon, d.lat, d.lon);
        if (km < bestKm) {
            best = d;
            bestKm = km;
        }
    }
    return { district: best, km: bestKm };
}