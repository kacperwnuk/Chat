import os from "os";

interface ExitType {
    msg: string
    code: number
}

interface ExitDictionary {
    [name: string]: ExitType
}

export const EXIT_TYPE = {
    NO_ENV_FILE: {
        code: 0,
        msg: 'Nie podano pliku konfiguracyjnego'
    }
};

export function exit(exit_type: ExitType) {
    process.stderr.write(exit_type.msg);
    process.stderr.write(os.EOL);
    process.exit(exit_type.code);
}