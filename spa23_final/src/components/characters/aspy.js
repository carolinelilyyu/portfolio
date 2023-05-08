    import "./styles.css";
    import {
    QueryClient,
    QueryClientProvider,
    useMutation,
    useQuery
    } from "@tanstack/react-query";
    import axios from "axios";
    import React from "react";

    const API_URL = "https://jsonplaceholder.typicode.com";

    const queryClient = new QueryClient();

    export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
        <Page />
        </QueryClientProvider>
    );
    }

    function Page() {
    return (
        <>
        <AddPost />
        <Posts />
        </>
    );
    }

    function AddPost() {
    const mutation = useMutation({
        mutationFn: (newPost) => {
        return axios.post(`${API_URL}/posts`, JSON.stringify(newPost), {
            headers: {
            "Content-type": "application/json; charset=UTF-8"
            }
        });
        }
    });

    const [title, setTitle] = React.useState("");
    const [body, setBody] = React.useState("");

    const createPost = (e) => {
        e.preventDefault();
        mutation.mutate(
        {
            title: title,
            body: body,
            userId: 1
        },
        {
            onSuccess: ({ data }) => {
            queryClient.setQueryData(["posts"], (old) => [...old, data]);
            }
        }
        );
    };

    return (
        <div className="add-todo">
        <input onChange={(e) => setTitle(e.target.value)} />
        <textarea onChange={(e) => setBody(e.target.value)} />
        <button onClick={createPost}>Create Post</button>
        </div>
    );
    }

    function Posts() {
    const { isLoading, error, data } = useQuery({
        queryKey: ["posts"],
        queryFn: () => axios.get(`${API_URL}/posts`).then(({ data }) => data)
    });

    if (isLoading) {
        return <h3>Loading</h3>;
    }

    if (error) {
        console.error(error);
        return <h3>Error. Check console.</h3>;
    }

    data.sort((p0, p1) => p1.id - p0.id);

    return (
        <div className="posts">
        <h2>Posts</h2>
        {data.map((post) => (
            <div className="post" key={`post-${post.id}`}>
            <b>{post.title}</b>
            <p>{post.body}</p>
            </div>
        ))}
        </div>
    );
    }
