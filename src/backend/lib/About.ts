import {v4 as uuid} from "uuid";

const package_json = require("./../../../package");

const About = {
    instance_id: uuid(),
    version: package_json.version,
    instance_type: ""
};

export default About;
