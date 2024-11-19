import { NextResponse } from "next/server";

// Tipos para las matrices de cifrado
const cipherMatrix1: Record<string, string> = {
  A: "42", B: "37", C: "29", D: "15", E: "89", F: "73", G: "68",
  H: "94", I: "51", J: "26", K: "35", L: "12", M: "49", N: "76",
  O: "87", P: "93", Q: "14", R: "62", S: "58", T: "84", U: "31",
  V: "22", W: "53", X: "18", Y: "40", Z: "66", a: "11", b: "33",
  c: "20", d: "50", e: "24", f: "81", g: "96", h: "64", i: "39",
  j: "19", k: "30", l: "25", m: "77", n: "45", o: "63", p: "21",
  q: "85", r: "71", s: "32", t: "16", u: "56", v: "95", w: "23",
  x: "67", y: "38", z: "92", "0": "28", "1": "17", "2": "43",
  "3": "36", "4": "44", "5": "52", "6": "60", "7": "78", "8": "88", "9": "99"
};

const cipherMatrix2: Record<string, string> = {
  "42": "2", "37": "W", "29": "1", "15": "8", "89": "4", "73": "5",
  "68": "r", "94": "6", "51": "u", "26": "x", "35": "w", "12": "0",
  "49": "X", "76": "M", "87": "R", "93": "F", "14": "v", "62": "N",
  "58": "C", "84": "f", "31": "k", "22": "a", "53": "d", "18": "A",
  "40": "t", "66": "G", "11": "j", "33": "l", "20": "S", "50": "T",
  "24": "p", "81": "I", "96": "o", "64": "s", "39": "c", "19": "b",
  "30": "E", "25": "9", "77": "V", "45": "7", "63": "D", "21": "e",
  "85": "H", "71": "U", "32": "3", "16": "y", "56": "Z", "95": "z",
  "23": "L", "67": "m", "38": "Y", "92": "B", "28": "J", "17": "K",
  "43": "q", "36": "O", "44": "n", "52": "g", "60": "Q", "78": "h",
  "88": "P", "99": "i"
};


// Función de encriptar
const encrypt = (text: string): string => {
  const firstLevel = Array.from(text) // Changed `let` to `const`
    .filter((char) => /[a-zA-Z0-9]/.test(char))
    .map((char) => cipherMatrix1[char] || char)
    .join("");

  return Array.from({ length: firstLevel.length / 2 }, (_, i) => {
    const pair = firstLevel.slice(i * 2, i * 2 + 2);
    return cipherMatrix2[pair] || pair;
  }).join("");
};

// Función de desencriptar
const decrypt = (encryptedText: string): string => {
  const firstLevel = Array.from(encryptedText) // Changed `let` to `const`
    .map((char) => Object.keys(cipherMatrix2).find((key) => cipherMatrix2[key] === char) || char)
    .join("");

  return Array.from({ length: firstLevel.length / 2 }, (_, i) => {
    const pair = firstLevel.slice(i * 2, i * 2 + 2);
    return Object.keys(cipherMatrix1).find((key) => cipherMatrix1[key] === pair) || pair;
  }).join("");
};


// Método GET
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const text = searchParams.get("text");
  const mode = searchParams.get("mode");

  if (!text || !mode) {
    return NextResponse.json(
      { error: "Se requiere texto y modo (encrypt o decrypt)" },
      { status: 400 }
    );
  }

  if (mode === "encrypt") {
    return NextResponse.json({ result: encrypt(text) });
  } else if (mode === "decrypt") {
    return NextResponse.json({ result: decrypt(text) });
  } else {
    return NextResponse.json(
      { error: "Modo inválido. Usa 'encrypt' o 'decrypt'." },
      { status: 400 }
    );
  }
}
