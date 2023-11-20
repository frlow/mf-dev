import {useCallback, useEffect, useState} from "react";

export const useTrackSignals = <T extends Object>
(signals: T):
    T => {
    const [, setTracker] = useState(0)
    const [unSubs, setUnSubs] = useState<Record<string, () => void>>({})
    const handleTracker = useCallback(() => setTracker(t => (t + 1) % 100), [])
    useEffect(() => () => Object.values(unSubs).forEach(u => u()), [])
    return new Proxy(signals, {
        get(target, prop: string) {
            if (!unSubs[prop]) {
                console.log(`tracking ${prop}`)
                setUnSubs(us => ({...us, [prop]: signals[prop].subscribe(handleTracker)}))
            }
            return target[prop]
        }
    })
}