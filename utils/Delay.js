export const SetupDelay = async (delay,moduleString,logger) => {
    try {
        const [mindelay, maxdelay] = delay
        const delaySeconds =  Math.floor(Math.random() * (maxdelay - mindelay + 1)) + mindelay
        logger.info(`${moduleString} - Delaying ${delaySeconds} seconds before next action`);
        await new Promise(resolve => setTimeout(resolve, delaySeconds * 1000));
    } catch (e) {
        console.log(e)
        throw new Error(e)
    }
}