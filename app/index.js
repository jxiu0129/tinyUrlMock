import server from "./app";

server.listen(process.env.PORT || 3000, () => {
    console.log("listening on port " + process.env.PORT);
});
