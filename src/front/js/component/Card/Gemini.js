import React, { useEffect, useState } from 'react'
import { GoogleGenerativeAI } from "@google/generative-ai";
const API_KEY = "AIzaSyC2t6dchfonJIa5bnGFkybMroerVElqKOo";

function Gemini({ dificultad, distancia, ubicacion }) {
    const [gemini, setGemini] = useState(null)

    useEffect(() => {

        async function IA() {
            const genAI = new GoogleGenerativeAI(API_KEY);
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            const prompt = `Escribe una recomendacion personalizada de 30 palabras en base a que vestuario usar para
                 hacer una ruta de senderismo, teniendo en cuenta los datos almacenados en variables de codigo, tambien recomienda 3 alimentos
                 que pueda consumir en base a la distancia que va a caminar, por ultimo siempre desea bun viaje
                 ${dificultad},  ${distancia},  ${ubicacion} y sustituye las palabras dificil por otra mas adecuada, por favor nunca repitas la misma frase
                  y no uses caracteres especiales`;
            const result = await model.generateContent(prompt);
            if (result) {
                setGemini(result);
            }
        }

        IA();

    }, []);

    gemini && console.log(gemini.response.candidates[0].content.parts[0].text);
    return (
        <div className="row p-3">
            <div className="fw-bolder">{gemini && gemini.response.candidates[0].content.parts[0].text}</div>
            <span>
                <svg class="icon icon-tabler icon-tabler-message-2" width="50" height="50" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M8 9h8" />
                    <path d="M8 13h6" />
                    <path d="M9 18h-3a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-3l-3 3l-3 -3z" />
                </svg>
            </span>
        </div>
    )
}


export default Gemini