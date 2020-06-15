import os from "os";

interface ExitType {
    msg: string
    code: number
}

interface ExitDictionary {
    [name: string]: ExitType
}

export const EXIT_TYPE = {
    WRONG_ENV: {
        code: 1,
        msg: 'Złe zmienne środowiskowe.'
    }
};

export function exit(exit_type: ExitType) {
    process.stderr.write(exit_type.msg);
    process.stderr.write(os.EOL);
    process.exit(exit_type.code);
}