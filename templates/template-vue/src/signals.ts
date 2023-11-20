import {customRef} from "vue";

type S<T> = {get value(): T}
export const refSignal = <T>(trackedSignal: S<T>) =>
    customRef<T>((track, trigger) => {
        const temp = trackedSignal as any
        temp.subscribe(trigger)
        return {
            get() {
                track()
                return temp.value
            },
            set(newValue) {
                temp.value = newValue
            }
        }
    })
