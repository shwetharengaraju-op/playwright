module.exports = {
    timeout: 60000,
    use: {
        headless: false,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure'
    }
};