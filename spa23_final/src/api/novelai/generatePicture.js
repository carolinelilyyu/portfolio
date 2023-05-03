import axios from "axios";
import React from "react";
import JSZip from "jszip";
import {NOVEL_AI_KEY} from "../../index.js"
import {useQuery} from "@tanstack/react-query";

export default function GeneratePicture() {
    const { data, isLoading, error } = useQuery({
        queryKey: ["login"],
        queryFn: () =>
        axios
            .post("https://api.novelai.net/user/login", {
            key: NOVEL_AI_KEY,
            })
            .then(({ data }) =>
            axios.post(
                "https://api.novelai.net/ai/generate-image",
                {
                input: "Castle, cottagecore, dragon",
                model: "nai-diffusion",
                action: "generate",
                parameters: {},
                },
                {
                headers: {
                    Authorization: `Bearer ${data.accessToken}`,
                },
                responseType: "arraybuffer",
                }
            )
            ),
    });

    const [url, setUrl] = React.useState("");

    React.useEffect(() => {
        async function getImage() {
        const zip = await JSZip.loadAsync(data?.data);
        const blob = await zip.file("image_0.png").async("blob");
        // Iterate over each file in the zip archive
        setUrl(window.URL.createObjectURL(blob));
        }
        getImage();
    }, [url, data]);

    if (url) {
        return <img src={url} />;
    }

    return <h3>Loading</h3>;
}
