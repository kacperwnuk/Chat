import type {Dictionary} from "../../../share/types";
import type Lang from "../Lang";

export default {
    polish: require("./polish").default,
    english: require("./english").default
} as Dictionary<Lang>