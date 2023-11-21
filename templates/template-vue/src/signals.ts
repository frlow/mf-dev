import {customRef, onScopeDispose, Ref} from "vue";

type S<T> = { get value(): T }
export const refSignal = <T>(trackedSignal: S<T>) => {
  let unsub: () => void
  onScopeDispose(()=>unsub && unsub())
  return customRef<T>((track, trigger) => {
    const temp = trackedSignal as any
    unsub = temp.subscribe(trigger)
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
}