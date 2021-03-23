import {
    addDays,
    eachDayOfInterval,
    endOfMonth,
    startOfMonth,
} from "date-fns";
import {assign, createMachine} from "xstate";
import {useMachine} from "xstate-svelte";

export interface Habit {
    name: string;
}

export interface AppContext {
    currentDate: Date;
    currentMonth: Date[],
    habits: Habit[];
}

export type AppEvent =
    | { type: 'NAVIGATE'; direction: 'BACK' | 'HOME' | 'FORWARD' }
    | { type: 'EDIT' };

const buildContext = (date: Date, habits: Habit[]): AppContext => ({
    currentDate: date,
    currentMonth: eachDayOfInterval({
        start: startOfMonth(date),
        end: endOfMonth(date)
    }),
    habits
})

export const habitMachine = createMachine<AppContext, AppEvent>({
    initial: 'idle',
    context: buildContext(new Date(), []),
    states: {
        idle: {
            on: {
                NAVIGATE: {
                    actions: assign((ctx, evt) => {
                        switch (evt.direction) {
                            case 'BACK':
                                return buildContext(
                                    addDays(ctx.currentMonth[0], -1),
                                    ctx.habits
                                );
                            case 'HOME':
                                return buildContext(
                                    new Date(),
                                    ctx.habits
                                );
                            case 'FORWARD':
                                return buildContext(
                                    addDays(ctx.currentMonth[ctx.currentMonth.length - 1], 1),
                                    ctx.habits
                                );
                        }
                    })
                },
                EDIT: 'edit'
            }
        },
        edit: {}
    }
});

export const {state, send} = useMachine(habitMachine);

