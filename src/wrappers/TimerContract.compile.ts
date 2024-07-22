import { CompilerConfig } from '@ton/blueprint';

export const compile: CompilerConfig = {
    lang: 'tact',
    target: 'contracts/timer_contract.tact',
    options: {
        debug: true,
    },
};
