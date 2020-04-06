import type {Dictionary} from "../../../share/types";
import type Lang from "../Lang";

import english from "./english";
import polish from "./english";

const Languages: Dictionary<Lang> = {
    default: english,
    polish
};

export default Languages;
