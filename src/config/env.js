const DEVELOPMENT = 'development'
const PRODUCTIION = 'production'

export const getMode = () => {
    const mode = process.env.NODE_ENV
    return mode && mode === DEVELOPMENT ? DEVELOPMENT : PRODUCTIION
}