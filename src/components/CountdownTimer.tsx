import { ChangeEvent, useEffect, useState } from 'react';

const CountdownTimer = () => {
    const [values, setValues] = useState({
        hours: '',
        minutes: '',
        seconds: '',
    });
    const [isActive, setIsActive] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [countdown, setCountdown] = useState('');
    const [convertedSeconds, setCnvertedSeconds] = useState(0);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.value.length || /\d+/.test(e.target.value))
            setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleStart = () => {
        if (+values.hours > 0 || +values.minutes > 0 || +values.seconds > 0) {
            let innitialSeconds = +values.hours * 3600 + +values.minutes * 60 + +values.seconds;
            setCnvertedSeconds(innitialSeconds);
            setCountdown(toHHMMSS(innitialSeconds));
            setIsActive(true);
        }
        setValues({
            hours: '',
            minutes: '',
            seconds: '',
        });
    };

    const handlePause = () => {
        setIsPaused(!isPaused);
    };

    const handleReset = () => {
        setIsActive(false);
        setValues({
            hours: '',
            minutes: '',
            seconds: '',
        });
        setIsPaused(false);
    };

    useEffect(() => {
        if (isActive && !isPaused) {
            if (convertedSeconds < 0) {
                alert('done');
                setIsActive(false);
                return;
            }
            let interval = setInterval(() => {
                let seconds = convertedSeconds - 1;
                setCnvertedSeconds(seconds);
                setCountdown(toHHMMSS(seconds));
            }, 1000);
            return () => {
                clearInterval(interval);
            };
        }
    }, [convertedSeconds, isPaused, isActive]);

    const toHHMMSS = (secs: number) => {
        if (secs < 0 || isNaN(secs)) return 'Error';
        const hours = Math.floor(secs / 3600);
        const minutes = Math.floor(secs / 60) % 60;
        const seconds = secs % 60;
        return [hours, minutes, seconds].map((num) => (num < 10 ? `0${num}` : num)).join(':');
    };

    return (
        <div>
            Countdown timer
            {isActive ? (
                <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
                    <p>{countdown}</p>
                    <button onClick={handlePause}>{isPaused ? 'Start' : 'Pause'}</button>
                    <button onClick={handleReset}>Reset</button>
                </div>
            ) : (
                <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
                    <input
                        value={values?.hours}
                        onChange={handleChange}
                        name='hours'
                        placeholder='HH'
                        style={{
                            width: `${values.hours.length > 2 ? values.hours.length + 1 : 3}ch`,
                            textAlign: 'center',
                        }}
                    />
                    <input
                        value={values?.minutes}
                        onChange={handleChange}
                        name='minutes'
                        placeholder='MM'
                        style={{
                            width: `${values.minutes.length > 2 ? values.minutes.length + 1 : 3}ch`,
                            textAlign: 'center',
                        }}
                    />
                    <input
                        value={values?.seconds}
                        onChange={handleChange}
                        name='seconds'
                        placeholder='SS'
                        style={{
                            width: `${values.seconds.length > 2 ? values.seconds.length + 1 : 3}ch`,
                            textAlign: 'center',
                        }}
                    />
                    <button onClick={handleStart}>Start</button>
                </div>
            )}
        </div>
    );
};

export default CountdownTimer;
