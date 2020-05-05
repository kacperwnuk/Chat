type ClassName = string | undefined | null;

function isClassName(str: ClassName): str is string {
    return !!str;
}

export default function (...cns: ClassName[]) {
    return cns.filter(isClassName).join(" ")
}