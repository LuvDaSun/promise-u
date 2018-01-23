export default [
    {
        input: "./obj/index.js",
        output: {
            file: "./obj/index.bundle.js",
            format: "cjs",
        },
        external: [
            "tslib",
        ],
    },
];

