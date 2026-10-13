"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
    title: string;
    body: string;
};

type PlayState = "idle" | "playing" | "paused";


function toPlainText(input: string): string {
    const doc = new DOMParser().parseFromString(input, "text/html");
    doc.querySelectorAll("script, style, iframe, figure").forEach((n) => n.remove());
    return (doc.body.textContent || "")
        .replace(/[ \t]+/g, " ")
        .replace(/\s*\n\s*/g, "\n")
        .trim();
}

// লেখাকে ছোট ছোট বাক্যে ভাগ করা (।, ?, ! এবং নতুন লাইন)
function splitSentences(text: string): string[] {
    const parts = text.match(/[^।!?\n]+[।!?]?/g) || [];
    const out: string[] = [];
    parts.forEach((raw) => {
        let p = raw.trim();
        if (!p) return;
        while (p.length > 180) {
            let cut = p.lastIndexOf(",", 180);
            if (cut < 60) cut = p.lastIndexOf(" ", 180);
            if (cut < 60) cut = 180;
            out.push(p.slice(0, cut + 1).trim());
            p = p.slice(cut + 1).trim();
        }
        if (p) out.push(p);
    });
    return out;
}

export default function NewsSpeaker({ title, body }: Props) {
    const [supported, setSupported] = useState<boolean | null>(null);
    const [hasBangla, setHasBangla] = useState(false);
    const [state, setState] = useState<PlayState>("idle");
    const [message, setMessage] = useState("");
    const [warn, setWarn] = useState(false);

    const voiceRef = useRef<SpeechSynthesisVoice | null>(null);
    const chunksRef = useRef<string[]>([]);
    const indexRef = useRef(0);
    const sessionRef = useRef(0);

    // ব্রাউজার সাপোর্ট ও বাংলা voice খোঁজা
    useEffect(() => {
        if (!("speechSynthesis" in window) || !("SpeechSynthesisUtterance" in window)) {
            setSupported(false);
            return;
        }
        setSupported(true);
        const synth = window.speechSynthesis;

        const pickVoice = () => {
            const voices = synth.getVoices();
            if (!voices.length) return;
            const v =
                voices.find((x) => /^bn[-_]BD/i.test(x.lang)) ||
                voices.find((x) => /^bn/i.test(x.lang)) ||
                voices.find((x) => /bangla|bengali|বাংলা/i.test(x.name)) ||
                null;
            voiceRef.current = v;
            setHasBangla(!!v);
        };

        pickVoice();
        synth.addEventListener("voiceschanged", pickVoice);
        const t1 = setTimeout(pickVoice, 500);
        const t2 = setTimeout(pickVoice, 1500);


        return () => {
            synth.removeEventListener("voiceschanged", pickVoice);
            clearTimeout(t1);
            clearTimeout(t2);
            sessionRef.current++;
            synth.cancel();
        };
    }, []);

    function speakFrom(i: number) {
        const synth = window.speechSynthesis;
        synth.cancel();
        const mySession = ++sessionRef.current;
        indexRef.current = i;
        setState("playing");

        const next = () => {
            if (mySession !== sessionRef.current) return;

            if (indexRef.current >= chunksRef.current.length) {
                indexRef.current = 0;
                setState("idle");
                setWarn(false);
                setMessage("খবর পড়া শেষ হয়েছে।");
                return;
            }

            const u = new SpeechSynthesisUtterance(chunksRef.current[indexRef.current]);
            const voice = voiceRef.current;
            u.lang = voice ? voice.lang : "bn-BD";
            if (voice) u.voice = voice;
            u.rate = 0.95;

            u.onend = () => {
                if (mySession !== sessionRef.current) return;
                indexRef.current++;
                next();
            };
            u.onerror = (e) => {
                if (mySession !== sessionRef.current) return;
                if (e.error === "interrupted" || e.error === "canceled") return;
                setState("idle");
                setWarn(true);
                setMessage("ভয়েস চালাতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
            };
            synth.speak(u);
        };


        setTimeout(next, 80);
    }

    function handlePlay() {
        const list: string[] = [];
        const cleanTitle = toPlainText(title).replace(/[।!?]*$/, "");
        if (cleanTitle) list.push(cleanTitle + "।");
        list.push(...splitSentences(toPlainText(body)));

        if (!list.length) {
            setWarn(true);
            setMessage("পড়ার মতো কোনো লেখা পাওয়া যায়নি।");
            return;
        }
        chunksRef.current = list;

        if (hasBangla) {
            setWarn(false);
            setMessage("বাংলা ভয়েসে খবর পড়া হচ্ছে...");
        } else {
            setWarn(true);
            setMessage(
                "আপনার ডিভাইসে বাংলা ভয়েস পাওয়া যায়নি। ডিফল্ট ভয়েসে উচ্চারণ ঠিক নাও হতে পারে। ডিভাইসের Text-to-speech সেটিংস থেকে বাংলা ভয়েস ইনস্টল করুন।"
            );
        }
        speakFrom(0);
    }

    function handlePause() {
        sessionRef.current++;
        window.speechSynthesis.cancel();
        setState("paused");
        setWarn(false);
        setMessage("পড়া থামানো হয়েছে।");
    }

    function handleResume() {
        setWarn(!hasBangla);
        setMessage(hasBangla ? "আবার পড়া হচ্ছে..." : message);
        speakFrom(indexRef.current);
    }

    function handleStop() {
        sessionRef.current++;
        window.speechSynthesis.cancel();
        indexRef.current = 0;
        setState("idle");
        setWarn(false);
        setMessage("পড়া বন্ধ করা হয়েছে।");
    }


    if (supported === null) return null;

    const btnClass =
        "px-3.5 py-2 text-[15px] border border-red-700 bg-white text-red-700 rounded-md cursor-pointer hover:bg-red-700 hover:text-white";

    if (!supported) {
        return (
            <div className="flex flex-wrap items-center gap-2 mt-3 mb-4">
                <p className="basis-full mt-1 text-sm text-amber-700">
                    দুঃখিত, আপনার ব্রাউজার ভয়েস সাপোর্ট করে না। Chrome, Edge বা Safari-র নতুন ভার্সন ব্যবহার করুন।
                </p>
            </div>
        );
    }

    return (
        <div className="my-5 rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4 shadow-sm sm:p-5">
            <div className="flex flex-wrap items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-xl shadow-md shadow-blue-200">
                    🎧
                </div>

                <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-bold text-gray-900 sm:text-base">
                        খবর শুনুন
                    </h3>

                    <p className="mt-0.5 text-xs text-gray-500 sm:text-sm">
                        শুনুন, বিরতি দিন অথবা আবার চালু করুন
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    {state === "idle" && (
                        <button
                            type="button"
                            onClick={handlePlay}
                            className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                        >
                            🔊 খবর শুনুন
                        </button>
                    )}

                    {state === "playing" && (
                        <button
                            type="button"
                            onClick={handlePause}
                            className="inline-flex items-center justify-center rounded-xl bg-pink-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
                        >
                            ⏸️ Pause
                        </button>
                    )}

                    {state === "paused" && (
                        <button
                            type="button"
                            onClick={handleResume}
                            className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                        >
                            ▶️ Resume
                        </button>
                    )}

                    {state !== "idle" && (
                        <button
                            type="button"
                            onClick={handleStop}
                            className="inline-flex items-center justify-center rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-red-50 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                        >
                            ⏹️ Stop
                        </button>
                    )}
                </div>
            </div>

            <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-gray-100 bg-white px-3.5 py-3">
                <span className="mt-0.5 text-base">
                    {warn
                        ? "⚠️"
                        : state === "playing"
                            ? "🔊"
                            : state === "paused"
                                ? "⏸️"
                                : "ℹ️"}
                </span>

                <p
                    className={`text - sm leading - 6 ${warn ? "text-amber-700" : "text-gray-600"
                        } `}
                    role="status"
                    aria-live="polite"
                >
                    {message}
                </p>
            </div>
        </div>

    );
}