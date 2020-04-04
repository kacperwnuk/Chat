import type {Dictionary} from "../../../share/types";
import type Lang from "../Lang";

export default {
    default: require("./english").default,
    polish: require("./polish").default,
    // english: require("./english").default
} as Dictionary<Lang>