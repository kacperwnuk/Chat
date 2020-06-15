import {v4 as uuid} from "uuid";
import back_env from "./back_env";

const package_json = require("./../../../package");

const About = {
    instance_id: uuid(),
    version: package_json.version,
    rso_server: back_env.RSO_SERVER
};

export default About;
