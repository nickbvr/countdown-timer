import { useState, useEffect, ChangeEvent } from 'react';
import { notify, toHHMMSS } from '../utils';

const CountdownTimer = () => {
    const [values, setValues] = useState({
        hours: '',
        minutes: '',
        seconds: '',
    });
    const [isActive, setIsActive] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [countdownText, setCountdownText] = useState('');
    const [convertedSeconds, setConvertedSeconds] = useState(0);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.value.length || /^\d+$/.test(e.target.value))
            setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleStart = () => {
        if (+values.hours > 0 || +values.minutes > 0 || +values.seconds > 0) {
            let innitialSeconds = +values.hours * 3600 + +values.minutes * 60 + +values.seconds;
            setConvertedSeconds(innitialSeconds);
            setCountdownText(toHHMMSS(innitialSeconds));
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
        Notification.requestPermission();
    }, []);

    useEffect(() => {
        if (isActive && !isPaused) {
            if (convertedSeconds < 0) {
                notify('Completed');
                setIsActive(false);
            }
            let interval = setInterval(() => {
                let seconds = convertedSeconds - 1;
                setConvertedSeconds(seconds);
                setCountdownText(toHHMMSS(seconds));
            }, 1000);
            return () => {
                clearInterval(interval);
            };
        }
    }, [convertedSeconds, isPaused, isActive]);

    return (
        <div>
            <h1>Countdown timer</h1>
            {isActive ? (
                <div className='container'>
                    <p>{countdownText}</p>
                    <button onClick={handlePause}>{isPaused ? 'Start' : 'Pause'}</button>
                    <button onClick={handleReset}>Reset</button>
                </div>
            ) : (
                <div className='container'>
                    <input
                        name='hours'
                        placeholder='HH'
                        style={{
                            width: `${values.hours.length > 2 ? values.hours.length + 1 : 3}ch`,
                        }}
                        value={values?.hours}
                        onChange={handleChange}
                    />
                    <input
                        name='minutes'
                        placeholder='MM'
                        style={{
                            width: `${values.minutes.length > 2 ? values.minutes.length + 1 : 3}ch`,
                        }}
                        value={values?.minutes}
                        onChange={handleChange}
                    />
                    <input
                        name='seconds'
                        placeholder='SS'
                        style={{
                            width: `${values.seconds.length > 2 ? values.seconds.length + 1 : 3}ch`,
                        }}
                        value={values?.seconds}
                        onChange={handleChange}
                    />
                    <button onClick={handleStart}>Start</button>
                </div>
            )}
        </div>
    );
};

export default CountdownTimer;
