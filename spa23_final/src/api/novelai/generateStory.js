import axios from "axios";
import React from "react";
import {NOVEL_AI_KEY} from "../../index.js"
import {useQuery} from "@tanstack/react-query";

export default function GenerateStory(props) {

    const { data, isLoading, error } = useQuery({
        // once a button clicks, this becomes true
        enabled: false,
        queryKey: ["login"],
        queryFn: () =>
        axios
            .post("https://api.novelai.net/user/login", {
            key: NOVEL_AI_KEY,
            })
            .then(({ data }) =>
            axios.post(
                "https://api.novelai.net/ai/generate",
                {
                    "input": "Toff took the pen",
                    "model": "euterpe-v2",
                    "parameters": {
                        "use_string": true,
                        "temperature": 1,
                        "min_length": 10,
                        "max_length": 100
                    }
                },
                {
                headers: {
                    Authorization: `Bearer ${data.accessToken}`,
                },
                }
            )
            ),
    });
    const [url, setUrl] = React.useState("");


    React.useEffect(() => {
        async function getData() {
        const result = data?.data.output;
        setUrl(result);
        }
        getData();
    }, [url, data]);

    if (url) {
        return <div>
            {url}
        </div>;
    }

    return <h3>Loading</h3>;
}
