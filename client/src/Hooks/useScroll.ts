/**
 * @hook useScroll
 * The link component may cause the user to enter a route with the page scrolled down based on the position of the previous page. This ensures that the user is always scrolled to the top of the page when they enter a new route.
 * 
 * @returns {object} - An object containing the scroller function.
 */

export const useScroll = () => {

    const scroller = () => {
        const html = document.querySelector('html');
        html.style.scrollBehavior = "auto";
        window.scrollTo({
            top: 0,
            behavior: "auto"
        });
        html.style.scrollBehavior = '';
    }

    return { scroller }
}