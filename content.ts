export { }

const removeSoldCards = () => {
    const soldBadges = document.querySelectorAll('.item-sold-badge');
    let amount = 0;

    // const test = [];

    soldBadges.forEach(badge => {
        const itemCard = badge.closest('.item-card');
        // const title = badge.parentElement.parentElement.previousSibling;


        // test.push(title.textContent);
        if (itemCard) {
            itemCard.remove();
            amount++;
        }
    });
    console.log(`Cancellati ${amount} elementi con classe .item-card contenenti un badge`);
};

// We inject an event listener only if we're on subito.it
if (window.location.hostname.endsWith('subito.it')) {
    window.addEventListener('load', () => {
        removeSoldCards();

        // By using a MutationObserver, we can process also ajax loaded elements 
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    removeSoldCards();
                }
            });
        });

        //We start the observer
        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });
    });
}