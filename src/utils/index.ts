export const notify = (message: string) => {
    if (!('Notification' in window) || Notification.permission !== 'granted') {
        alert(message);
    } else {
        let title = 'Countdown timer';
        const notification = new Notification(title, { body: message });
        notification.onclick = () => {
            notification.close();
            window.parent.focus();
        };
    }
};

export const toHHMMSS = (secs: number) => {
    if (secs < 0 || isNaN(secs)) return 'Error';
    const hours = Math.floor(secs / 3600);
    const minutes = Math.floor(secs / 60) % 60;
    const seconds = secs % 60;
    return [hours, minutes, seconds].map((num) => (num < 10 ? `0${num}` : num)).join(':');
};
