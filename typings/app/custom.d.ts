interface ErrorConstructor {
    captureStackTrace(thisArg: any, func: any): void
}

interface Window {
    devToolsExtension: Function
}