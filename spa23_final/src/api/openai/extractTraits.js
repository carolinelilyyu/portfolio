import React from "react";
import axios from "axios";
import {useQuery} from "@tanstack/react-query";
import {OPENAI_API_KEY} from "../../index.js"

export default function ExtractTraits(props) {
    const { data, isLoading, error } = useQuery({
        queryKey: ["traits"],
        queryFn: () =>
            axios.post(
                "https://api.openai.com/v1/completions",
                {
                    model: "text-davinci-003",
                    prompt: "Can you extract traits from \n\n" + props.sentence,
                    temperature: 0,
                    max_tokens: 60,
                    top_p: 1.0,
                    frequency_penalty: 0.0,
                    presence_penalty: 0.0,
                },
                {
                    headers: {
                        Authorization: `Bearer ${OPENAI_API_KEY}`,
                    },
                }
                )
        });
    console.log(data)
    // console.log(data.data.choices[0].text);   

    return (
        <div>

            <h3>Loading...</h3>
        </div>
    );
}
