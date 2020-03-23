import os from "os";

export const EXIT_TYPE = {
    NO_ENV_FILE: {
        code: 0,
        msg: 'Nie podano pliku konfiguracyjnego'
    }
};

/**
 *
 * @param {ExitType} exit_type
 */
export function exit(exit_type) {
    process.stderr.write(exit_type.msg);
    process.stderr.write(os.EOL);
    process.exit(exit_type.code);
}