
enum Events {
    CarSelected = 'CarSelected',
}

export {State as default};

export class State {
    private eventsHandlers = new Map<string, ((data: unknown) => void)[]>();

    static readonly Events = Events;

    private static createdInstance: State;

    public static instance(): State {

        if (!State.createdInstance) {
            State.createdInstance = new State();
        }
        return State.createdInstance;

    }

    subscribeOn(eventName: Events, callback: (data: unknown) => void): void {
        if (!this.eventsHandlers.has(eventName)) {
            this.eventsHandlers.set(eventName, []);
        }
        this.eventsHandlers.get(eventName).push(callback);
    }

    publish(eventName: Events, data: unknown): void {
        if (this.eventsHandlers.has(eventName)) {
            this.eventsHandlers.get(eventName).forEach(handler => handler(data));
        }
    }

}
