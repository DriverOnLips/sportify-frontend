module.exports = {
    bracketSameLine: false,
    bracketSpacing: true,
    endOfLine: 'auto',
    printWidth: 80,
    jsxSingleQuote: true,
    singleQuote: true,
    tabWidth: 2,
    useTabs: true,
    semi: true,
    singleAttributePerLine: true,
    overrides: [
        {
            files: ['**.*.scss', '*.scss'],
            options: {
                singleQuote: false,
            },
        },
    ],
};