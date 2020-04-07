import os from "os";

interface ExitType {
    msg: string
    code: number
}

interface ExitDictionary {
    [name: string]: ExitType
}

export const EXIT_TYPE = {
    ENV_FILE: {
        code: 1,
        msg: 'Brak lub uszkodzony plik konfiguracyjny.'
    }
};

export function exit(exit_type: ExitType) {
    process.stderr.write(exit_type.msg);
    process.stderr.write(os.EOL);
    process.exit(exit_type.code);
}